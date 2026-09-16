# Fundação do Site de Casamento — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ter um projeto Next.js + TypeScript + Tailwind rodando localmente, conectado ao projeto Supabase existente, versionado num repositório GitHub privado e publicado na Vercel — a base sobre a qual as próximas etapas (conteúdo, RSVP, admin, pagamentos) serão construídas.

**Architecture:** App Next.js (App Router) com um diretório `src/lib/supabase/` contendo dois factories de cliente Supabase — um para o browser (Client Components) e um para o servidor (Server Components/Route Handlers), seguindo o padrão oficial `@supabase/ssr`. Nenhuma tabela ou tela de produto é criada nesta etapa; o objetivo é só a fundação técnica.

**Tech Stack:** Next.js (App Router) + TypeScript, Tailwind CSS, Vitest (testes unitários), `@supabase/supabase-js` + `@supabase/ssr`, Git/GitHub, Vercel.

**Spec:** [docs/superpowers/specs/2026-09-16-site-casamento-design.md](../specs/2026-09-16-site-casamento-design.md)

## Global Constraints

- Framework: Next.js com App Router + TypeScript (spec seção 8)
- Estilo: Tailwind CSS (spec seção 8)
- Dados: Supabase (Postgres, Storage, Auth) — projeto já existente, id `voscxazyageelsonfdvl` (spec seção 8)
- Deploy: Vercel (spec seção 8)
- Repositório: Git + GitHub, **privado**, por conter dados pessoais de convidados em etapas futuras (spec seções 8 e 9)
- Segredos (chaves, tokens): sempre em variáveis de ambiente (`.env.local` local, variáveis de ambiente na Vercel em produção), nunca commitados nem expostos no bundle do frontend (spec seção 9)

---

## Task 1: Scaffold do projeto Next.js + TypeScript + Tailwind

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`, `eslint.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Modify: `.gitignore` (gerado pelo create-next-app)

**Interfaces:**
- Produces: projeto Next.js executável via `npm run dev` e `npm run build`, com alias de import `@/*` apontando para `src/*`.

- [ ] **Step 1: Rodar o scaffold oficial do Next.js**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Se aparecer um aviso sobre a pasta não estar vazia (por causa de `.git/` e `docs/`), confirme para continuar — esses arquivos não conflitam com o scaffold.

- [ ] **Step 2: Verificar que o build funciona**

Run: `npm run build`
Expected: build conclui com sucesso, sem erros de TypeScript/ESLint.

- [ ] **Step 3: Verificar que o servidor de desenvolvimento sobe**

Run: `npm run dev` (em background ou em outro terminal), depois `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
Expected: `200`. Encerre o servidor depois de confirmar.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + TypeScript + Tailwind project"
```

---

## Task 2: Configurar Vitest para testes unitários

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces: comando `npm test` que roda todos os arquivos `src/**/*.test.ts`.

- [ ] **Step 1: Instalar o Vitest**

Run: `npm install -D vitest`

- [ ] **Step 2: Criar a configuração do Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: Adicionar o script de teste**

Modify `package.json`, dentro de `"scripts"`, adicionar:
```json
"test": "vitest run"
```

- [ ] **Step 4: Verificar que o comando roda (sem testes ainda)**

Run: `npm test`
Expected: Vitest executa e reporta "No test files found" (ainda não há nenhum arquivo `.test.ts`) — isso confirma que a configuração está correta.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add Vitest for unit testing"
```

---

## Task 3: Clientes Supabase (browser e servidor)

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Test: `src/lib/supabase/client.test.ts`

**Interfaces:**
- Produces:
  - `createClient(): SupabaseClient` em `src/lib/supabase/client.ts` — usado em Client Components.
  - `createClient(): Promise<SupabaseClient>` em `src/lib/supabase/server.ts` — usado em Server Components e Route Handlers.
- Consumes: `process.env.NEXT_PUBLIC_SUPABASE_URL`, `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY` (definidas na Task 4).

- [ ] **Step 1: Instalar as bibliotecas do Supabase**

Run: `npm install @supabase/supabase-js @supabase/ssr`

- [ ] **Step 2: Escrever o teste do cliente de browser (falhando)**

Create `src/lib/supabase/client.test.ts`:
```ts
import { describe, it, expect, beforeAll } from 'vitest'
import { createClient } from './client'

describe('createClient (browser)', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
  })

  it('creates a Supabase client without throwing', () => {
    expect(() => createClient()).not.toThrow()
  })

  it('returns a client with an auth property', () => {
    const client = createClient()
    expect(client.auth).toBeDefined()
  })
})
```

- [ ] **Step 3: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './client'` (o arquivo ainda não existe).

- [ ] **Step 4: Implementar o cliente de browser**

Create `src/lib/supabase/client.ts`:
```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS (2 testes).

- [ ] **Step 6: Implementar o cliente de servidor**

Create `src/lib/supabase/server.ts`:
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Chamado a partir de um Server Component — ignorado porque
            // o middleware é responsável por atualizar a sessão nesse caso.
          }
        },
      },
    }
  )
}
```

Não é possível testar `server.ts` de forma unitária sem um contexto de request do Next.js real (depende de `next/headers`); ele será exercitado indiretamente quando o middleware de auth for implementado na etapa do painel admin.

- [ ] **Step 7: Rodar o build para garantir que tudo compila**

Run: `npm run build`
Expected: build conclui com sucesso.

- [ ] **Step 8: Commit**

```bash
git add src/lib/supabase package.json package-lock.json
git commit -m "feat: add Supabase browser and server client factories"
```

---

## Task 4: Conectar ao projeto Supabase existente

**Files:**
- Create: `.env.example`
- Create: `.env.local` (não commitado — já coberto pelo `.gitignore` gerado na Task 1)

**Interfaces:**
- Produces: variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` disponíveis em `process.env` para os clientes da Task 3.

- [ ] **Step 1: Obter a URL e a chave pública (anon/publishable) do projeto**

Use a ferramenta MCP do Supabase (`get_project_url` e `get_publishable_keys`) para o projeto `voscxazyageelsonfdvl`, ou copie os valores em: Supabase Dashboard → seu projeto → Project Settings → API. A chave "anon/public" é segura para uso no frontend — **não** use a `service_role` key aqui.

- [ ] **Step 2: Criar o arquivo de exemplo (commitado, sem valores reais)**

Create `.env.example`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] **Step 3: Criar o arquivo local com os valores reais (não commitado)**

Create `.env.local` com os valores obtidos no Step 1:
```
NEXT_PUBLIC_SUPABASE_URL=https://voscxazyageelsonfdvl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<valor real da anon key>
```

- [ ] **Step 4: Confirmar que `.env.local` não será commitado**

Run: `git status`
Expected: `.env.local` não aparece na lista (deve estar coberto pelo `.gitignore` do create-next-app, que já ignora `.env*.local`). Se aparecer, adicione manualmente `.env.local` ao `.gitignore` antes de prosseguir.

- [ ] **Step 5: Verificar a conexão em runtime**

Run: `npm run dev`, depois abra `http://localhost:3000` no navegador (ou via `mcp__Claude_Browser__preview_start`) e confira no console do navegador que não há erros relacionados a `NEXT_PUBLIC_SUPABASE_URL is not defined` ou similar. Encerre o servidor depois.

- [ ] **Step 6: Commit (só o exemplo, nunca o `.env.local`)**

```bash
git add .env.example
git commit -m "chore: add environment variable example for Supabase config"
```

---

## Task 5: Página inicial placeholder e verificação responsiva

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: página `/` renderizando um placeholder identificável ("Matheus & Bruna") para servir de smoke test visual nas próximas etapas.

- [ ] **Step 1: Atualizar o metadata do layout**

Modify `src/app/layout.tsx`, ajustando o objeto `metadata`:
```ts
export const metadata: Metadata = {
  title: "Matheus & Bruna",
  description: "Site do casamento de Matheus e Bruna",
};
```

- [ ] **Step 2: Substituir o conteúdo da home pelo placeholder**

Modify `src/app/page.tsx` para conter apenas:
```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-semibold">Matheus & Bruna</h1>
      <p className="mt-2 text-muted-foreground">Em construção 💍</p>
    </main>
  );
}
```

- [ ] **Step 3: Verificar visualmente no navegador em viewport mobile**

Run: `npm run dev`, abra a pré-visualização com `mcp__Claude_Browser__preview_start` apontando para `http://localhost:3000`, use `mcp__Claude_Browser__resize_window` com preset `mobile`, e confirme que o texto aparece centralizado e legível sem scroll horizontal. Encerre o servidor depois.

- [ ] **Step 4: Rodar build e commit**

```bash
npm run build
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: add placeholder home page"
```

---

## Task 6: Publicar o repositório no GitHub (privado) — executado por você

Esta tarefa depende de autenticação sua no GitHub, que o assistente não pode fazer por você.

- [ ] **Step 1: Autenticar o GitHub CLI (se ainda não tiver `gh` instalado, instale primeiro: https://cli.github.com)**

Run: `gh auth login` e siga as instruções (escolha GitHub.com, HTTPS, login via navegador).

- [ ] **Step 2: Criar o repositório privado e configurar o remote**

Run (dentro da pasta do projeto):
```bash
gh repo create matheus-e-bruna-casamento --private --source=. --remote=origin
```

- [ ] **Step 3: Enviar os commits existentes**

Run:
```bash
git push -u origin master
```

- [ ] **Step 4: Confirmar**

Run: `gh repo view --web` para abrir o repositório no navegador e confirmar que está marcado como "Private".

---

## Task 7: Deploy inicial na Vercel — executado por você

Esta tarefa depende de uma conta sua na Vercel, que o assistente não pode criar por você.

- [ ] **Step 1: Autenticar o CLI da Vercel**

Run: `npx vercel login` e siga as instruções (login via e-mail ou GitHub).

- [ ] **Step 2: Linkar e fazer o primeiro deploy**

Run: `npx vercel` dentro da pasta do projeto, aceitando as opções padrão (isso cria o projeto na Vercel e faz um deploy de preview).

- [ ] **Step 3: Configurar as variáveis de ambiente na Vercel**

No dashboard da Vercel (Project Settings → Environment Variables), adicione `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os mesmos valores do seu `.env.local`, para os ambientes Production e Preview.

- [ ] **Step 4: Deploy de produção**

Run: `npx vercel --prod`

- [ ] **Step 5: Confirmar**

Abra a URL `*.vercel.app` retornada pelo comando e confirme que a página placeholder "Matheus & Bruna" aparece corretamente no celular.

---

## Self-Review Notes

- **Cobertura da spec:** esta etapa cobre integralmente a "Etapa 0 — Fundação" da spec (seção 7): repositório Git privado, scaffold Next.js+TS+Tailwind, projeto Supabase conectado, primeiro deploy na Vercel. As etapas 1–8 da spec (conteúdo, RSVP, admin, galeria, pagamentos, recados, polimento, publicação final) ficam para planos futuros, escritos quando esta fundação estiver implementada.
- **Segurança:** nenhuma chave secreta (service_role do Supabase, tokens do Mercado Pago) é usada nesta etapa — só a chave anon/publishable, que é segura para o frontend.
- **Tasks 6 e 7** são intencionalmente não-automatizáveis pelo assistente (exigem login em contas de terceiros); estão documentadas com comandos exatos para você executar.
