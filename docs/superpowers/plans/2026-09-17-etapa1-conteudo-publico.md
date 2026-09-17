# Etapa 1 — Conteúdo Público e Identidade Visual — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a identidade visual monocromática do site e as três páginas públicas de conteúdo (Home, História, Evento) sobre a fundação já publicada, com todo o conteúdo textual como placeholder editável.

**Architecture:** Componentes visuais pequenos e reutilizáveis (`src/components/`) compostos nas três páginas do App Router (`src/app/page.tsx`, `src/app/historia/page.tsx`, `src/app/evento/page.tsx`). Conteúdo textual/dados isolado em `src/lib/content/site-content.ts`, para que trocar textos ou fotos nunca exija tocar em componentes visuais — prepara o terreno para a Etapa 3 (admin) substituir esse módulo por dados vindos do Supabase sem mudar a árvore de componentes.

**Tech Stack:** Next.js (App Router) + TypeScript, Tailwind CSS v4, Vitest + Testing Library (React) + jsdom para testes de componente, fontes via `next/font/google` (Pinyon Script, Cormorant Garamond, Jost).

**Spec:** [docs/superpowers/specs/2026-09-17-etapa1-conteudo-publico-design.md](../specs/2026-09-17-etapa1-conteudo-publico-design.md)

## Global Constraints

- Paleta monocromática exata (sem cor de destaque): Preto `#050505`, Carvão `#1a1a1a`, Grafite `#333333`, Cinza-médio `#8f8f8f`, Cinza-claro `#d9d9d9`, Neve `#f2f2f0`, Branco `#ffffff`.
- Tipografia: Pinyon Script (script/assinatura), Cormorant Garamond (serifada/títulos), Jost (sans/corpo) — todas via `next/font/google`, nunca `<link>` manual.
- Convenção de nome: sempre "Bruna & Matheus" (Bruna primeiro), nunca a ordem inversa.
- Medalhão, flourish e ícones são SVG inline/componentes React — nunca imagens rasterizadas.
- Fotos e textos placeholder ficam em `src/lib/content/site-content.ts` como dados, nunca hardcoded dentro do JSX de forma que trocar exija editar múltiplos arquivos.
- Toda nova dependência deve instalar com sucesso usando `npm install ... --ignore-scripts` **sem** `--legacy-peer-deps` nem `--force` — a Vercel roda `npm install` limpo e um ERESOLVE não detectado localmente já quebrou um deploy de produção na Etapa 0. Se `--ignore-scripts` sozinho não resolver um conflito de peer dependency, **não** adicione `--legacy-peer-deps`: pare e reporte BLOCKED com os detalhes do conflito.
- Nenhuma chave secreta ou variável de ambiente nova é necessária nesta etapa.

---

## Task 1: Tokens de design — paleta e tipografia

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: variáveis CSS `--preto`, `--carvao`, `--grafite`, `--cinza-medio`, `--cinza-claro`, `--neve`, `--branco`, mapeadas em utilitários Tailwind `bg-preto`, `text-neve`, etc. (via `@theme inline`). Utilitários de fonte `font-serif` (Cormorant Garamond), `font-sans` (Jost, padrão do body), `font-script` (Pinyon Script). Classe utilitária `.bg-grain` para textura de papel sutil.
- Consumes: nenhuma (task de fundação para todas as seguintes).

- [ ] **Step 1: Substituir a paleta e tipografia em `globals.css`**

Replace o conteúdo de `src/app/globals.css` por:

```css
@import "tailwindcss";

:root {
  --preto: #050505;
  --carvao: #1a1a1a;
  --grafite: #333333;
  --cinza-medio: #8f8f8f;
  --cinza-claro: #d9d9d9;
  --neve: #f2f2f0;
  --branco: #ffffff;
}

@theme inline {
  --color-preto: var(--preto);
  --color-carvao: var(--carvao);
  --color-grafite: var(--grafite);
  --color-cinza-medio: var(--cinza-medio);
  --color-cinza-claro: var(--cinza-claro);
  --color-neve: var(--neve);
  --color-branco: var(--branco);
  --font-serif: var(--font-cormorant);
  --font-sans: var(--font-jost);
  --font-script: var(--font-pinyon);
}

body {
  background: var(--neve);
  color: var(--preto);
}

.bg-grain {
  position: relative;
}

.bg-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.45;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.025 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Isso remove por completo os tokens antigos `--background`/`--foreground`, o bloco `@media (prefers-color-scheme: dark)` (o site não segue o tema do sistema operacional — o contraste claro/escuro é uma decisão de design por seção, não um modo escuro) e o `font-family: Arial, Helvetica, sans-serif` que hoje anula as fontes carregadas.

- [ ] **Step 2: Trocar as fontes em `layout.tsx`**

Replace o conteúdo de `src/app/layout.tsx` por:

```tsx
import type { Metadata } from "next";
import { Pinyon_Script, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bruna & Matheus",
  description: "Site do casamento de Bruna e Matheus",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${pinyon.variable} ${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verificar o build**

Run: `npm run build`
Expected: build conclui com sucesso, sem erros de TypeScript.

- [ ] **Step 4: Verificar visualmente no navegador**

Run: `npm run dev`. Use `mcp__Claude_Browser__preview_start` com `name: "wedding-site-dev"` (config já existe em `.claude/launch.json`), depois `mcp__Claude_Browser__computer` `screenshot`.
Expected: fundo da página em tom Neve (`#f2f2f0`, um branco levemente acinzentado, não branco puro), texto "Bruna & Matheus" já renderizando em uma fonte sans-serif diferente da anterior (Jost, não Arial). Pare o servidor dev depois.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: apply monochrome design tokens and typography"
```

---

## Task 2: Infraestrutura de testes para componentes React

**Files:**
- Modify: `vitest.config.mts`
- Create: `vitest.setup.ts`
- Create: `src/components/Eyebrow.tsx`
- Test: `src/components/Eyebrow.test.tsx`

**Interfaces:**
- Consumes: utilitários `text-cinza-medio` (Task 1).
- Produces: `Eyebrow({ children: React.ReactNode; tone?: "light" | "dark" })` em `src/components/Eyebrow.tsx` — rótulo pequeno em caixa alta, usado por várias tasks seguintes (Home, Evento, EssenceRow).

- [ ] **Step 1: Instalar as dependências de teste**

Run:
```bash
npm install -D jsdom @testing-library/react @testing-library/jest-dom @vitejs/plugin-react vite-tsconfig-paths --ignore-scripts
```

**Risco nomeado:** o projeto já usa `vite@^8.3.0` (instalado na Etapa 0 como dependência do Vitest). Se o `npm install` acima falhar com `ERESOLVE` porque `@vitejs/plugin-react` ainda não declara suporte a Vite 8 como peer dependency, **não adicione `--legacy-peer-deps`**. Primeiro tente `npm install -D @vitejs/plugin-react@latest --ignore-scripts` sozinho para ver se uma versão mais nova já resolve. Se mesmo assim não resolver, pare e reporte **BLOCKED** com a mensagem de erro completa do ERESOLVE — não force a resolução.

- [ ] **Step 2: Atualizar a configuração do Vitest**

Replace o conteúdo de `vitest.config.mts` por:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

- [ ] **Step 3: Criar o setup do Testing Library**

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Confirmar que a suíte existente ainda passa (prova que a mudança de config não quebrou nada)**

Run: `npm test`
Expected: os testes já existentes de `src/lib/supabase/client.test.ts` continuam passando (2/2).

- [ ] **Step 5: Escrever o teste do componente Eyebrow (falhando)**

Create `src/components/Eyebrow.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Eyebrow } from './Eyebrow'

describe('Eyebrow', () => {
  it('renders its label text', () => {
    render(<Eyebrow>Vamos nos casar</Eyebrow>)
    expect(screen.getByText('Vamos nos casar')).toBeInTheDocument()
  })

  it('uses the light tone class when tone="light"', () => {
    render(<Eyebrow tone="light">Bem-vindos</Eyebrow>)
    expect(screen.getByText('Bem-vindos')).toHaveClass('text-white/40')
  })

  it('uses the dark tone class by default', () => {
    render(<Eyebrow>Onde e quando</Eyebrow>)
    expect(screen.getByText('Onde e quando')).toHaveClass('text-cinza-medio')
  })
})
```

- [ ] **Step 6: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './Eyebrow'` (o componente ainda não existe). Isso confirma que o novo padrão `**/*.test.tsx` está realmente sendo coletado pelo Vitest (não um "0 tests" silencioso).

- [ ] **Step 7: Implementar o componente Eyebrow**

Create `src/components/Eyebrow.tsx`:

```tsx
type EyebrowProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
};

export function Eyebrow({ children, tone = "dark" }: EyebrowProps) {
  return (
    <p
      className={`text-[10px] uppercase tracking-[0.4em] ${
        tone === "light" ? "text-white/40" : "text-cinza-medio"
      }`}
    >
      {children}
    </p>
  );
}
```

- [ ] **Step 8: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS (3 testes novos + 2 existentes = 5/5).

- [ ] **Step 9: Commit**

```bash
git add vitest.config.mts vitest.setup.ts package.json package-lock.json src/components/Eyebrow.tsx src/components/Eyebrow.test.tsx
git commit -m "test: add React/jsdom test infrastructure and Eyebrow component"
```

---

## Task 3: Dados de conteúdo do site

**Files:**
- Create: `src/lib/content/site-content.ts`
- Test: `src/lib/content/site-content.test.ts`

**Interfaces:**
- Produces:
  - `coupleNames: { first: string; second: string; display: string; initials: string }`
  - `eventInfo: { dateISO: string; dateLabel: string; ceremonyTime: string; venueName: string; addressForMaps: string }`
  - `essencePhotos: EssencePhoto[]` onde `EssencePhoto = { src: string; alt: string; caption: string }`
  - `timelineMilestones: TimelineMilestone[]` onde `TimelineMilestone = { title: string; description: string }`
  - `eventSchedule: EventScheduleItem[]` onde `EventScheduleItem = { title: string; time: string; description: string }`
- Consumes: nenhuma.

- [ ] **Step 1: Escrever o teste (falhando)**

Create `src/lib/content/site-content.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { coupleNames, essencePhotos, timelineMilestones, eventSchedule } from './site-content'

describe('site-content', () => {
  it('puts Bruna before Matheus in the display name', () => {
    expect(coupleNames.display).toBe('Bruna & Matheus')
  })

  it('has exactly three essence photos', () => {
    expect(essencePhotos).toHaveLength(3)
  })

  it('has at least one timeline milestone', () => {
    expect(timelineMilestones.length).toBeGreaterThan(0)
  })

  it('has both ceremony and reception in the event schedule, in that order', () => {
    const titles = eventSchedule.map((item) => item.title)
    expect(titles).toEqual(['Cerimônia', 'Recepção'])
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './site-content'`.

- [ ] **Step 3: Implementar o módulo de conteúdo**

Create `src/lib/content/site-content.ts`:

```ts
export type EssencePhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type TimelineMilestone = {
  title: string;
  description: string;
};

export type EventScheduleItem = {
  title: string;
  time: string;
  description: string;
};

export const coupleNames = {
  first: "Bruna",
  second: "Matheus",
  display: "Bruna & Matheus",
  initials: "B · M",
} as const;

export const eventInfo = {
  dateISO: "2026-04-04",
  dateLabel: "04 de Abril de 2026",
  ceremonyTime: "16h",
  venueName: "Espaço [Local a definir]",
  addressForMaps: "Espaço [Local a definir], [Endereço a definir]",
};

export const essencePhotos: EssencePhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1610599905000-a8093ff22a55?w=500&q=80&auto=format&fit=crop",
    alt: "Gravata borboleta",
    caption: "Ele",
  },
  {
    src: "https://images.unsplash.com/photo-1727808103644-9fe53796560d?w=500&q=80&auto=format&fit=crop",
    alt: "Alianças de casamento",
    caption: "Nós",
  },
  {
    src: "https://images.unsplash.com/photo-1613341689162-376a6c2f7b64?w=500&q=80&auto=format&fit=crop",
    alt: "Buquê de tulipas",
    caption: "Ela",
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    title: "Como nos conhecemos",
    description: "Texto a ser preenchido pelos noivos.",
  },
  {
    title: "O primeiro encontro",
    description: "Texto a ser preenchido pelos noivos.",
  },
  {
    title: "O pedido",
    description: "Texto a ser preenchido pelos noivos.",
  },
];

export const eventSchedule: EventScheduleItem[] = [
  {
    title: "Cerimônia",
    time: "16h",
    description: `${eventInfo.ceremonyTime} · ${eventInfo.venueName}`,
  },
  {
    title: "Recepção",
    time: "18h",
    description: "Jantar, discursos e festa",
  },
];
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/site-content.ts src/lib/content/site-content.test.ts
git commit -m "feat: add placeholder site content data module"
```

---

## Task 4: Contagem regressiva

**Files:**
- Create: `src/lib/countdown.ts`
- Test: `src/lib/countdown.test.ts`
- Create: `src/components/Countdown.tsx`
- Test: `src/components/Countdown.test.tsx`

**Interfaces:**
- Consumes: nenhuma (Task 4 não depende de outras tasks de componente, só da infra de testes da Task 2).
- Produces:
  - `getCountdownParts(target: Date, now: Date): { days: number; hours: number; minutes: number; seconds: number }` em `src/lib/countdown.ts`.
  - `Countdown({ targetDateISO: string })` em `src/components/Countdown.tsx` — usado pela Home (Task 9).

- [ ] **Step 1: Escrever o teste da função pura (falhando)**

Create `src/lib/countdown.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getCountdownParts } from './countdown'

describe('getCountdownParts', () => {
  it('computes days, hours, minutes and seconds remaining', () => {
    const now = new Date('2026-01-01T00:00:00Z')
    const target = new Date('2026-01-03T02:03:04Z')
    expect(getCountdownParts(target, now)).toEqual({
      days: 2,
      hours: 2,
      minutes: 3,
      seconds: 4,
    })
  })

  it('never returns negative values once the target has passed', () => {
    const now = new Date('2026-01-05T00:00:00Z')
    const target = new Date('2026-01-01T00:00:00Z')
    expect(getCountdownParts(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './countdown'`.

- [ ] **Step 3: Implementar a função pura**

Create `src/lib/countdown.ts`:

```ts
export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdownParts(target: Date, now: Date): CountdownParts {
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Escrever o teste do componente (falhando)**

Create `src/components/Countdown.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Countdown } from './Countdown'

describe('Countdown', () => {
  it('renders all four unit labels', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString()
    render(<Countdown targetDateISO={future} />)
    expect(screen.getByText('Dias')).toBeInTheDocument()
    expect(screen.getByText('Horas')).toBeInTheDocument()
    expect(screen.getByText('Min')).toBeInTheDocument()
    expect(screen.getByText('Seg')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './Countdown'`.

- [ ] **Step 7: Implementar o componente**

Create `src/components/Countdown.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { getCountdownParts, type CountdownParts } from '@/lib/countdown';

type CountdownProps = { targetDateISO: string };

const UNITS: { key: keyof CountdownParts; label: string }[] = [
  { key: 'days', label: 'Dias' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
];

export function Countdown({ targetDateISO }: CountdownProps) {
  const target = new Date(targetDateISO);
  const [parts, setParts] = useState<CountdownParts>(() =>
    getCountdownParts(target, new Date())
  );

  useEffect(() => {
    const id = setInterval(() => {
      setParts(getCountdownParts(new Date(targetDateISO), new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDateISO]);

  return (
    <div className="mt-9 flex justify-center">
      {UNITS.map(({ key, label }, index) => (
        <div
          key={key}
          className={`px-5 text-center ${
            index < UNITS.length - 1 ? 'border-r border-cinza-claro' : ''
          }`}
        >
          <span className="block font-serif text-[29px] font-semibold text-preto">
            {String(parts[key]).padStart(2, '0')}
          </span>
          <span className="text-[8.5px] uppercase tracking-[0.2em] text-cinza-medio">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 8: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/lib/countdown.ts src/lib/countdown.test.ts src/components/Countdown.tsx src/components/Countdown.test.tsx
git commit -m "feat: add countdown logic and component"
```

---

## Task 5: Medalhão (Medallion)

**Files:**
- Create: `src/components/Medallion.tsx`
- Test: `src/components/Medallion.test.tsx`

**Interfaces:**
- Consumes: nenhuma.
- Produces: `Medallion({ initials?: string })` em `src/components/Medallion.tsx`, com default `initials = "B · M"` — usado pela Home (Task 9).

- [ ] **Step 1: Escrever o teste (falhando)**

Create `src/components/Medallion.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Medallion } from './Medallion'

describe('Medallion', () => {
  it('renders the couple initials by default', () => {
    render(<Medallion />)
    expect(screen.getByText('B · M')).toBeInTheDocument()
  })

  it('accepts custom initials', () => {
    render(<Medallion initials="X · Y" />)
    expect(screen.getByText('X · Y')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './Medallion'`.

- [ ] **Step 3: Implementar o componente**

Create `src/components/Medallion.tsx`:

```tsx
import { useId } from "react";

type MedallionProps = { initials?: string };

export function Medallion({ initials = "B · M" }: MedallionProps) {
  return (
    <div className="flex flex-col items-center">
      <Flourish />
      <div
        className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #eee 0%, #9a9a9a 22%, #fff 42%, #6e6e6e 58%, #f5f5f5 78%, #8a8a8a 100%)",
          boxShadow:
            "0 2px 4px rgba(255,255,255,0.5) inset, 0 -3px 6px rgba(0,0,0,0.6) inset, 0 10px 26px rgba(0,0,0,0.55)",
        }}
      >
        <div className="absolute inset-[10px] rounded-full border border-black/35 shadow-[0_1px_2px_rgba(255,255,255,0.6)_inset]" />
        <div
          className="flex h-[82px] w-[82px] items-center justify-center rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 32%, #2b2b2b, #050505 72%)",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.4), 0 3px 10px rgba(0,0,0,0.6) inset",
          }}
        >
          <span className="font-serif text-2xl tracking-[0.08em] text-neve">
            {initials}
          </span>
        </div>
      </div>
      <Flourish flip />
    </div>
  );
}

function Flourish({ flip = false }: { flip?: boolean }) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 100 70"
      className={`block h-[38px] w-[54px] ${flip ? "-mt-1.5 scale-y-[-1]" : "-mb-1.5"}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eeeeee" />
          <stop offset="25%" stopColor="#8f8f8f" />
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#6a6a6a" />
          <stop offset="100%" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      <path
        d="M50 70 C 50 45, 30 40, 20 20 C 14 8, 22 2, 32 6 C 40 9, 40 20, 34 24 C 46 18, 54 18, 66 24 C 60 20, 60 9, 68 6 C 78 2, 86 8, 80 20 C 70 40, 50 45, 50 70 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Medallion.tsx src/components/Medallion.test.tsx
git commit -m "feat: add Medallion component with relief effect"
```

---

## Task 6: Primitivas compartilhadas — Ribbon, DetailsCard, LineIcons

**Files:**
- Create: `src/components/Ribbon.tsx`
- Test: `src/components/Ribbon.test.tsx`
- Create: `src/components/DetailsCard.tsx`
- Test: `src/components/DetailsCard.test.tsx`
- Create: `src/components/icons/LineIcons.tsx`
- Test: `src/components/icons/LineIcons.test.tsx`

**Interfaces:**
- Consumes: nenhuma.
- Produces:
  - `Ribbon({ children: React.ReactNode })` em `src/components/Ribbon.tsx` — usado pela Home (Task 9).
  - `DetailsCard({ seal?: string; children: React.ReactNode })` em `src/components/DetailsCard.tsx`, default `seal = "B · M"` — usado pelo Evento (Task 11).
  - `LocationIcon({ className?: string })` e `ReceptionIcon({ className?: string })` em `src/components/icons/LineIcons.tsx` — usados pelo Evento (Task 11).

- [ ] **Step 1: Escrever o teste do Ribbon (falhando)**

Create `src/components/Ribbon.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Ribbon } from './Ribbon'

describe('Ribbon', () => {
  it('renders its content', () => {
    render(<Ribbon>04 · 04 · 2026</Ribbon>)
    expect(screen.getByText('04 · 04 · 2026')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './Ribbon'`.

- [ ] **Step 3: Implementar o Ribbon**

Create `src/components/Ribbon.tsx`:

```tsx
type RibbonProps = { children: React.ReactNode };

export function Ribbon({ children }: RibbonProps) {
  const face = "border-y border-white/25 bg-[linear-gradient(180deg,#262626,#101010)]";
  return (
    <div className="relative inline-block">
      <div className={`${face} px-8 py-2.5 text-xs tracking-[0.3em] text-cinza-claro`}>
        {children}
      </div>
      <span
        className={`absolute inset-y-0 -left-3 w-3 ${face}`}
        style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
      />
      <span
        className={`absolute inset-y-0 -right-3 w-3 ${face}`}
        style={{ clipPath: "polygon(100% 50%, 0 0, 0 100%)" }}
      />
    </div>
  );
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Escrever o teste do DetailsCard (falhando)**

Create `src/components/DetailsCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DetailsCard } from './DetailsCard'

describe('DetailsCard', () => {
  it('renders the seal initials and children content', () => {
    render(
      <DetailsCard seal="B · M">
        <p>Cerimônia às 16h</p>
      </DetailsCard>
    )
    expect(screen.getByText('B · M')).toBeInTheDocument()
    expect(screen.getByText('Cerimônia às 16h')).toBeInTheDocument()
  })

  it('defaults the seal to the couple initials', () => {
    render(
      <DetailsCard>
        <p>Conteúdo</p>
      </DetailsCard>
    )
    expect(screen.getByText('B · M')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './DetailsCard'`.

- [ ] **Step 7: Implementar o DetailsCard**

Create `src/components/DetailsCard.tsx`:

```tsx
import type { ReactNode } from "react";

type DetailsCardProps = {
  seal?: string;
  children: ReactNode;
};

export function DetailsCard({ seal = "B · M", children }: DetailsCardProps) {
  return (
    <div className="grid w-full max-w-[400px] grid-cols-2 bg-neve shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center justify-center border-r border-dashed border-black/20 px-5 py-8 text-center">
        <span className="font-serif text-sm uppercase tracking-[0.2em] text-preto">
          Os
        </span>
        <span className="font-script mb-3.5 text-[32px] text-preto">Detalhes</span>
        <span
          className="flex h-[54px] w-[54px] items-center justify-center rounded-full font-serif text-[15px] tracking-[0.05em] text-neve"
          style={{
            background: "radial-gradient(circle at 35% 30%, #2b2b2b, #050505 72%)",
            boxShadow:
              "0 0 0 2px var(--neve), 0 0 0 3px rgba(0,0,0,0.3), 0 6px 14px rgba(0,0,0,0.4)",
          }}
        >
          {seal}
        </span>
      </div>
      <div className="flex flex-col justify-center gap-4 px-5 py-6">{children}</div>
    </div>
  );
}
```

- [ ] **Step 8: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 9: Escrever o teste dos ícones (falhando)**

Create `src/components/icons/LineIcons.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LocationIcon, ReceptionIcon } from './LineIcons'

describe('LineIcons', () => {
  it('renders the location icon as an svg', () => {
    const { container } = render(<LocationIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders the reception icon as an svg', () => {
    const { container } = render(<ReceptionIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
```

- [ ] **Step 10: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './LineIcons'`.

- [ ] **Step 11: Implementar os ícones**

Create `src/components/icons/LineIcons.tsx`:

```tsx
type IconProps = { className?: string };

export function LocationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ReceptionIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10h16M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 10v8a1 1 0 0 0 1 1h1v-3M20 10v8a1 1 0 0 1-1 1h-1v-3" />
    </svg>
  );
}
```

- [ ] **Step 12: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 13: Commit**

```bash
git add src/components/Ribbon.tsx src/components/Ribbon.test.tsx src/components/DetailsCard.tsx src/components/DetailsCard.test.tsx src/components/icons/LineIcons.tsx src/components/icons/LineIcons.test.tsx
git commit -m "feat: add Ribbon, DetailsCard and line icon primitives"
```

---

## Task 7: Navegação (Nav)

**Files:**
- Create: `src/components/Nav.tsx`
- Test: `src/components/Nav.test.tsx`

**Interfaces:**
- Consumes: nenhuma.
- Produces: `Nav()` em `src/components/Nav.tsx` (sem props) — usado pelas três páginas (Tasks 9, 10, 11).

- [ ] **Step 1: Escrever o teste (falhando)**

Create `src/components/Nav.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from './Nav'

describe('Nav', () => {
  it('renders links to all four pages', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'História' })).toHaveAttribute(
      'href',
      '/historia'
    )
    expect(screen.getByRole('link', { name: 'Evento' })).toHaveAttribute(
      'href',
      '/evento'
    )
    expect(screen.getByRole('link', { name: 'RSVP' })).toHaveAttribute('href', '/rsvp')
  })
})
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './Nav'`.

- [ ] **Step 3: Implementar o Nav**

Create `src/components/Nav.tsx`:

```tsx
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/historia", label: "História" },
  { href: "/evento", label: "Evento" },
  { href: "/rsvp", label: "RSVP" },
];

export function Nav() {
  return (
    <nav className="flex items-center justify-center gap-5 bg-preto px-2.5 py-3.5 text-[9px] uppercase tracking-[0.2em] text-white/55">
      <span className="mr-1 text-[11px] tracking-[0.25em] text-neve">B &amp; M</span>
      {LINKS.map((link, index) => (
        <span key={link.href} className="flex items-center gap-5">
          {index > 0 ? <span className="text-white/20">·</span> : null}
          <Link href={link.href} className="hover:text-neve">
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
```

Nota: o link "RSVP" aponta para `/rsvp`, que ainda não existe (será construído numa etapa futura) — resulta em 404 temporário até lá, o que é esperado para um site em construção por fases.

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "feat: add site navigation"
```

---

## Task 8: Faixa "Nossa Essência" (EssenceRow)

**Files:**
- Create: `src/components/EssenceRow.tsx`
- Test: `src/components/EssenceRow.test.tsx`

**Interfaces:**
- Consumes: `essencePhotos` (Task 3), `Eyebrow` (Task 2).
- Produces: `EssenceRow()` em `src/components/EssenceRow.tsx` (sem props) — usado pela Home (Task 9).

- [ ] **Step 1: Escrever o teste (falhando)**

Create `src/components/EssenceRow.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EssenceRow } from './EssenceRow'

describe('EssenceRow', () => {
  it('renders all three essence photos with their captions', () => {
    render(<EssenceRow />)
    expect(screen.getByAltText('Gravata borboleta')).toBeInTheDocument()
    expect(screen.getByAltText('Alianças de casamento')).toBeInTheDocument()
    expect(screen.getByAltText('Buquê de tulipas')).toBeInTheDocument()
    expect(screen.getByText('Ele')).toBeInTheDocument()
    expect(screen.getByText('Nós')).toBeInTheDocument()
    expect(screen.getByText('Ela')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './EssenceRow'`.

- [ ] **Step 3: Implementar o EssenceRow**

Create `src/components/EssenceRow.tsx`:

```tsx
import { essencePhotos } from "@/lib/content/site-content";
import { Eyebrow } from "./Eyebrow";

export function EssenceRow() {
  return (
    <div className="bg-preto pb-[54px] pt-2 text-center">
      <Eyebrow tone="light">Nossa essência</Eyebrow>
      <div className="mt-6 flex gap-3 px-5">
        {essencePhotos.map((photo) => (
          <div key={photo.src} className="relative aspect-[3/4] flex-1 overflow-hidden">
            {/* Fotos placeholder de banco de imagens livre — serão editáveis
                pelo admin na Etapa 3. next/image não é usado aqui de propósito
                para não exigir configurar remotePatterns para um domínio
                temporário que vai mudar. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover grayscale contrast-[1.08] brightness-[0.95]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 50%, #000 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 50%, #000 55%, transparent 100%)",
              }}
            />
            <span className="absolute inset-x-0 -bottom-0.5 text-center text-[8.5px] uppercase tracking-[0.2em] text-white/45">
              {photo.caption}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/EssenceRow.tsx src/components/EssenceRow.test.tsx
git commit -m "feat: add symbolic photography row"
```

---

## Task 9: Página Home (`/`)

**Files:**
- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 7), `Medallion` (Task 5), `Ribbon` (Task 6), `Eyebrow` (Task 2), `EssenceRow` (Task 8), `Countdown` (Task 4), `coupleNames`/`eventInfo` (Task 3).
- Produces: página `/` completa — nada consome esta task.

- [ ] **Step 1: Escrever o teste (falhando)**

Create `src/app/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home page', () => {
  it('renders the couple name, essence photos and countdown labels', () => {
    render(<Home />)
    expect(screen.getAllByText('Bruna & Matheus').length).toBeGreaterThan(0)
    expect(screen.getByAltText('Alianças de casamento')).toBeInTheDocument()
    expect(screen.getByText('Dias')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — o placeholder atual de `page.tsx` não renderiza "Alianças de casamento" nem "Dias".

- [ ] **Step 3: Implementar a página Home**

Replace o conteúdo de `src/app/page.tsx` por:

```tsx
import { Nav } from "@/components/Nav";
import { Medallion } from "@/components/Medallion";
import { Ribbon } from "@/components/Ribbon";
import { Eyebrow } from "@/components/Eyebrow";
import { EssenceRow } from "@/components/EssenceRow";
import { Countdown } from "@/components/Countdown";
import { coupleNames, eventInfo } from "@/lib/content/site-content";

export default function Home() {
  return (
    <main>
      <Nav />

      <section className="relative flex flex-col items-center overflow-hidden bg-preto px-6 pb-[50px] pt-[46px]">
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_40px_rgba(0,0,0,0.7)]" />
        <Eyebrow tone="light">Vamos nos casar</Eyebrow>
        <Medallion initials={coupleNames.initials} />
        <h1 className="font-script mt-6 text-center text-[44px] text-neve md:text-[58px]">
          {coupleNames.display}
        </h1>
        <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-white/55">
          {eventInfo.dateLabel}
        </p>
        <Ribbon>SAVE&nbsp;&nbsp;THE&nbsp;&nbsp;DATE</Ribbon>
      </section>

      <EssenceRow />

      <section className="bg-grain bg-neve px-8 pb-[46px] pt-[54px] text-center">
        <Eyebrow>Bem-vindos</Eyebrow>
        <h2 className="font-script mt-4 text-[46px] text-preto">
          {coupleNames.display}
        </h2>
        <p className="mx-auto mt-4 max-w-[350px] font-serif text-[17px] italic leading-[1.75] text-grafite">
          &ldquo;Estamos muito felizes em ter vocês conosco para celebrar o início da
          nossa história juntos.&rdquo;
        </p>
        <p className="mt-3.5 text-[11px] text-cinza-medio">
          Role para conhecer nossa história e todos os detalhes do grande dia
        </p>
        <Countdown targetDateISO={eventInfo.dateISO} />
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Rodar o build e verificar visualmente**

Run: `npm run build`. Depois `npm run dev`, `mcp__Claude_Browser__preview_start` (`name: "wedding-site-dev"`), screenshot em desktop e em `mcp__Claude_Browser__resize_window` `preset: mobile`.
Expected: build sem erros; hero preto com medalhão e fita, faixa de 3 fotos em preto e branco com fade, seção clara com contagem regressiva — sem overflow horizontal no mobile. Pare o servidor depois.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: build the Home page"
```

---

## Task 10: Página História (`/historia`)

**Files:**
- Create: `src/components/Timeline.tsx`
- Test: `src/components/Timeline.test.tsx`
- Create: `src/app/historia/page.tsx`
- Test: `src/app/historia/page.test.tsx`

**Interfaces:**
- Consumes: `timelineMilestones` (Task 3), `Nav` (Task 7), `Eyebrow` (Task 2), `coupleNames` (Task 3).
- Produces: `Timeline()` em `src/components/Timeline.tsx` (sem props) e a página `/historia`.

- [ ] **Step 1: Escrever o teste do Timeline (falhando)**

Create `src/components/Timeline.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'
import { timelineMilestones } from '@/lib/content/site-content'

describe('Timeline', () => {
  it('renders every milestone title', () => {
    render(<Timeline />)
    timelineMilestones.forEach((milestone) => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './Timeline'`.

- [ ] **Step 3: Implementar o Timeline**

Create `src/components/Timeline.tsx`:

```tsx
import { timelineMilestones } from "@/lib/content/site-content";

export function Timeline() {
  return (
    <ol className="mx-auto max-w-[360px] px-6 py-14">
      {timelineMilestones.map((milestone, index) => (
        <li key={milestone.title} className="relative pb-10 pl-8 last:pb-0">
          {index < timelineMilestones.length - 1 && (
            <span
              className="absolute left-[5px] top-3 h-full w-px bg-cinza-claro"
              aria-hidden="true"
            />
          )}
          <span
            className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-preto bg-neve"
            aria-hidden="true"
          />
          <h3 className="font-serif text-lg font-semibold text-preto">
            {milestone.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-grafite">
            {milestone.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Escrever o teste da página (falhando)**

Create `src/app/historia/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HistoriaPage from './page'

describe('História page', () => {
  it('renders the page title and at least one milestone', () => {
    render(<HistoriaPage />)
    expect(screen.getByText('Nossa história')).toBeInTheDocument()
    expect(screen.getByText('Como nos conhecemos')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './page'` (o arquivo `src/app/historia/page.tsx` ainda não existe).

- [ ] **Step 7: Implementar a página**

Create `src/app/historia/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Eyebrow } from "@/components/Eyebrow";
import { Timeline } from "@/components/Timeline";
import { coupleNames } from "@/lib/content/site-content";

export default function HistoriaPage() {
  return (
    <main>
      <Nav />
      <section className="bg-neve px-6 pb-4 pt-14 text-center">
        <Eyebrow>Nossa história</Eyebrow>
        <h1 className="font-script mt-4 text-[42px] text-preto">
          {coupleNames.display}
        </h1>
      </section>
      <Timeline />
    </main>
  );
}
```

- [ ] **Step 8: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/Timeline.tsx src/components/Timeline.test.tsx src/app/historia/page.tsx src/app/historia/page.test.tsx
git commit -m "feat: build the História page"
```

---

## Task 11: Página Evento (`/evento`)

**Files:**
- Create: `src/lib/maps.ts`
- Test: `src/lib/maps.test.ts`
- Create: `src/app/evento/page.tsx`
- Test: `src/app/evento/page.test.tsx`

**Interfaces:**
- Consumes: `DetailsCard`/`LocationIcon`/`ReceptionIcon` (Task 6), `Nav` (Task 7), `Eyebrow` (Task 2), `eventInfo`/`eventSchedule`/`coupleNames` (Task 3).
- Produces: `buildGoogleMapsUrl(address: string): string` em `src/lib/maps.ts`, e a página `/evento`.

- [ ] **Step 1: Escrever o teste do helper de mapa (falhando)**

Create `src/lib/maps.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildGoogleMapsUrl } from './maps'

describe('buildGoogleMapsUrl', () => {
  it('encodes the address into a Google Maps search URL', () => {
    expect(buildGoogleMapsUrl('Espaco Ficticio, Rua A, 123')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Espaco%20Ficticio%2C%20Rua%20A%2C%20123'
    )
  })
})
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './maps'`.

- [ ] **Step 3: Implementar o helper**

Create `src/lib/maps.ts`:

```ts
export function buildGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Escrever o teste da página (falhando)**

Create `src/app/evento/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventoPage from './page'
import { eventInfo } from '@/lib/content/site-content'
import { buildGoogleMapsUrl } from '@/lib/maps'

describe('Evento page', () => {
  it('renders the schedule and a working map link', () => {
    render(<EventoPage />)
    expect(screen.getByText('Cerimônia')).toBeInTheDocument()
    expect(screen.getByText('Recepção')).toBeInTheDocument()
    const mapLink = screen.getByRole('link', { name: 'Ver no mapa' })
    expect(mapLink).toHaveAttribute('href', buildGoogleMapsUrl(eventInfo.addressForMaps))
  })
})
```

- [ ] **Step 6: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — `Cannot find module './page'` (o arquivo `src/app/evento/page.tsx` ainda não existe).

- [ ] **Step 7: Implementar a página**

Create `src/app/evento/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Eyebrow } from "@/components/Eyebrow";
import { DetailsCard } from "@/components/DetailsCard";
import { LocationIcon, ReceptionIcon } from "@/components/icons/LineIcons";
import { eventInfo, eventSchedule, coupleNames } from "@/lib/content/site-content";
import { buildGoogleMapsUrl } from "@/lib/maps";

export default function EventoPage() {
  const mapsUrl = buildGoogleMapsUrl(eventInfo.addressForMaps);

  return (
    <main>
      <Nav />
      <section className="flex flex-col items-center bg-preto px-6 pb-14 pt-14">
        <Eyebrow tone="light">Onde &amp; quando</Eyebrow>
        <div className="mt-6">
          <DetailsCard seal={coupleNames.initials}>
            {eventSchedule.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5">
                {item.title === "Cerimônia" ? (
                  <LocationIcon className="mt-0.5 h-4 w-4 flex-none text-cinza-medio" />
                ) : (
                  <ReceptionIcon className="mt-0.5 h-4 w-4 flex-none text-cinza-medio" />
                )}
                <p className="text-[11px] font-light leading-relaxed text-grafite">
                  <span className="mb-0.5 block text-[9.5px] font-medium uppercase tracking-[0.08em] text-preto">
                    {item.title}
                  </span>
                  {item.description}
                </p>
              </div>
            ))}
          </DetailsCard>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 border border-white/50 px-7 py-3 text-[10px] uppercase tracking-[0.25em] text-neve"
        >
          Ver no mapa
        </a>
      </section>
    </main>
  );
}
```

- [ ] **Step 8: Rodar e confirmar que passa**

Run: `npm test`
Expected: PASS (suíte completa).

- [ ] **Step 9: Rodar build e verificar visualmente as três páginas**

Run: `npm run build`. Depois `npm run dev`, e com o navegador visite `/`, `/historia` e `/evento` (via `mcp__Claude_Browser__navigate`), conferindo em viewport mobile (`resize_window` `preset: mobile`) que nenhuma delas tem scroll horizontal e que o link "Ver no mapa" abre uma URL válida do Google Maps. Pare o servidor depois.

- [ ] **Step 10: Commit**

```bash
git add src/lib/maps.ts src/lib/maps.test.ts src/app/evento/page.tsx src/app/evento/page.test.tsx
git commit -m "feat: build the Evento page"
```

---

## Self-Review Notes

- **Cobertura da spec:** Task 1 cobre a seção 3 (identidade visual); Tasks 2–8 cobrem os componentes reutilizáveis descritos nas seções 3–4; Task 9 cobre a seção 4 (Home); Task 10 cobre a seção 5 (História); Task 11 cobre a seção 6 (Evento) e a decisão de mapa por link direto (herdada da spec de fundação). A seção 7 (convenção "Bruna & Matheus") está embutida em `coupleNames.display` (Task 3) e já foi aplicada retroativamente ao placeholder da Etapa 0 antes deste plano existir. A seção 8 (considerações técnicas) é respeitada em todas as tasks: fontes via `next/font/google` (Task 1), SVG inline para medalhão/ícones (Tasks 5–6), fotos como dados em vez de hardcoded (Task 3 + Task 8), textura de papel via CSS (Task 1).
- **Risco de dependências carregado da Etapa 0:** Task 2 documenta explicitamente o risco de ERESOLVE entre `@vitejs/plugin-react` e `vite@^8` e instrui a nunca usar `--legacy-peer-deps` como saída fácil — a mesma causa raiz que quebrou o deploy de produção na etapa anterior.
- **Consistência de tipos:** `CountdownParts`, `EssencePhoto`, `TimelineMilestone`, `EventScheduleItem` são definidos uma única vez (Tasks 3 e 4) e reimportados nas tasks seguintes sem redefinição duplicada.
