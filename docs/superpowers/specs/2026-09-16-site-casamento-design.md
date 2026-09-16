# Site de Casamento — Matheus e Bruna

Data: 2026-09-16
Status: Aprovado para planejamento de implementação

## 1. Visão geral

Site responsivo, compartilhável por link e otimizado para celular, para o casamento
de Matheus e Bruna. Cobre apresentação do casal, informações do evento, RSVP,
galeria de fotos, contribuições financeiras e um painel administrativo privado
para os noivos gerenciarem tudo sem depender de programação.

## 2. Escopo do MVP

**Incluído:**
- Home com nomes, foto principal e contagem regressiva
- História do casal
- Data, horário e local do evento, com botão para abrir no mapa
- RSVP sem login, via link único por convite/família (`/rsvp/[slug]`)
- Acompanhantes cadastrados pelos noivos (não pelo convidado)
- Restrição/preferência alimentar por convidado
- Galeria de fotos (upload feito só pelo admin)
- Contribuição financeira livre via Mercado Pago (Pix/cartão), sem lista de
  produtos vinculada
- Recados dos convidados para os noivos — formulário público, visível **só**
  no painel admin (sem mural público)
- Painel administrativo (login restrito a Matheus e Bruna):
  - Gestão de convites/convidados/acompanhantes
  - Visualização de confirmações e restrições alimentares
  - Visualização de contribuições recebidas
  - Edição de textos, foto principal e dados do evento
  - Gestão da galeria de fotos
  - Visualização dos recados

**Fora do MVP (fase 2, não bloqueia o lançamento):**
- Lista de presentes com produtos reais
- Mural público de recados com moderação
- Múltiplos níveis de permissão de admin (ex.: cerimonialista)
- Domínio próprio (usar subdomínio Vercel no MVP)
- Upload de fotos pelos próprios convidados

## 3. Páginas do site

**Públicas:**
| Rota | Conteúdo |
|---|---|
| `/` | Home: nomes, foto principal, contagem regressiva |
| `/historia` | História do casal |
| `/evento` | Data, horário, local, botão "abrir no mapa" |
| `/rsvp/[slug]` | Confirmação de presença, link único por família |
| `/galeria` | Fotos do casal |
| `/presentes` | Contribuição financeira via Mercado Pago |
| `/recados` | Formulário de recado para os noivos |

**Administrativas** (protegidas por Supabase Auth):
| Rota | Conteúdo |
|---|---|
| `/admin/login` | Autenticação dos noivos |
| `/admin` | Dashboard: resumo de confirmados e contribuições |
| `/admin/convidados` | CRUD de convites, famílias e acompanhantes |
| `/admin/confirmacoes` | Lista de confirmados + restrições alimentares |
| `/admin/contribuicoes` | Contribuições recebidas via Mercado Pago |
| `/admin/conteudo` | Edição de textos, foto principal, data/hora/local |
| `/admin/galeria` | Upload e gestão de fotos |
| `/admin/recados` | Visualização dos recados recebidos |

## 4. Jornada dos convidados

1. Convidado recebe um link único por WhatsApp (ex.: `seusite.com/rsvp/abc123`).
2. Ao abrir, vê os nomes do seu grupo/família já pré-carregados (sem precisar
   buscar ou logar).
3. Para cada pessoa do grupo, confirma presença (sim/não) e informa restrição
   alimentar, se houver.
4. Envia a confirmação.
5. Pode navegar livremente pelas demais páginas públicas: história, evento
   (com mapa), galeria, contribuição financeira e recados.

## 5. Estrutura do banco de dados (Supabase / Postgres)

- **site_content** — linha única (singleton) com nomes dos noivos, data/hora/
  local do evento, texto da história, URL da foto principal e demais textos
  editáveis do site.
- **invites** — `id`, `family_label` (nome da família/grupo), `slug` (único,
  usado na URL de RSVP), `created_at`.
- **guests** — `id`, `invite_id` (FK), `name`, `is_primary` (bool),
  `rsvp_status` (`pending` | `yes` | `no`), `dietary_restriction` (texto,
  opcional), `confirmed_at`.
- **contributions** — `id`, `invite_id` (FK, nullable), `donor_name`,
  `amount`, `mp_payment_id` (referência do Mercado Pago), `status`
  (`pending` | `paid` | `failed`), `created_at`.
- **messages** — `id`, `invite_id` (FK, nullable), `guest_name`, `message`
  (texto), `created_at`. Sem exposição pública de leitura.
- **gallery_photos** — `id`, `url`, `storage_path`, `caption` (opcional),
  `display_order`, `created_at`.

**Políticas de acesso (RLS):**
- `site_content` e `gallery_photos`: leitura pública (somente leitura), sem
  necessidade de autenticação.
- `invites` / `guests`: sem leitura pública direta da tabela inteira. Acesso
  só através de uma função Postgres `SECURITY DEFINER` que recebe o `slug` e
  retorna apenas os dados daquele grupo, evitando enumeração de outras
  famílias.
- `contributions` / `messages`: sem leitura pública. Inserção pública
  permitida apenas através de função/endpoint validado; leitura completa
  restrita a usuários autenticados como admin.
- Todas as tabelas com `service_role` reservado ao backend (nunca exposto ao
  cliente).

## 6. Estratégia de pagamentos

- Provedor: **Mercado Pago**, via Checkout Pro / Payment Bricks (fluxo
  hospedado pela Mercado Pago). O site nunca recebe nem armazena dados de
  cartão — evita necessidade de conformidade PCI própria.
- Fluxo:
  1. Convidado escolhe um valor na página `/presentes`.
  2. O backend (API route do Next.js) cria uma "preference" de pagamento
     usando o access token secreto do Mercado Pago (nunca exposto no
     frontend).
  3. Convidado é redirecionado/embutido no checkout do Mercado Pago para
     pagar via Pix ou cartão.
  4. Mercado Pago notifica nosso backend via webhook.
  5. O backend atualiza o status em `contributions` (`pending` → `paid` /
     `failed`).
  6. O status atualizado aparece no painel `/admin/contribuicoes`.
- Segredos (access token, client secret) ficam apenas em variáveis de
  ambiente no Vercel / secrets do Supabase, nunca no código-fonte ou no
  bundle enviado ao navegador.

## 7. Plano de desenvolvimento por etapas

0. **Fundação** — repositório Git (privado), scaffold Next.js + TypeScript +
   Tailwind, projeto Supabase conectado, primeiro deploy na Vercel.
1. **Conteúdo público estático** — Home, História, Evento + mapa, design
   responsivo (paleta de cores e estilo visual definidos nesta etapa).
2. **Banco de dados + RSVP** — schema no Supabase, RLS, página
   `/rsvp/[slug]`, CRUD básico de convidados no admin.
3. **Painel admin** — autenticação (Supabase Auth), dashboard, gestão de
   confirmações, edição de conteúdo e fotos.
4. **Galeria de fotos** — Supabase Storage, upload pelo admin, exibição
   pública.
5. **Pagamentos** — integração Mercado Pago, página de contribuição,
   webhook, painel de contribuições.
6. **Recados** — formulário público + visualização no admin.
7. **Polimento** — revisão de responsividade, aviso de privacidade/LGPD,
   revisão de segurança (RLS, Supabase advisors).
8. **Publicação** — variáveis de ambiente em produção, teste ponta a ponta.

Sem prazo apertado definido; etapas seguem essa ordem sequencialmente.

## 8. Arquivos e tecnologias

- Next.js (App Router) + TypeScript
- Tailwind CSS (+ shadcn/ui, opcional, para tabelas e formulários do admin)
- `@supabase/supabase-js` + `@supabase/ssr`
- Supabase: Postgres (dados), Storage (fotos), Auth (login do admin)
- Mercado Pago SDK, usado apenas no lado do servidor (API routes)
- Deploy: Vercel
- Controle de versão: Git + GitHub (repositório **privado**, por conter dados
  pessoais de convidados)
- `.env.local` para variáveis sensíveis, nunca commitado (`.gitignore`)

## 9. Segurança e LGPD

- Painel admin protegido por Supabase Auth, restrito às contas de Matheus e
  Bruna.
- RLS aplicado em todas as tabelas com dados pessoais (ver seção 5).
- Nenhuma chave secreta (Mercado Pago, Supabase service role) exposta no
  frontend.
- Nenhum dado de cartão é armazenado — todo processamento de pagamento
  ocorre no Mercado Pago.
- Coleta de dados limitada ao necessário: nome, confirmação de presença,
  restrição alimentar e, opcionalmente, mensagem de recado. Sem coleta de
  documentos, endereço ou dados sensíveis.
- Checkbox de consentimento (LGPD) no formulário de RSVP, informando o uso
  dos dados apenas para organização do evento.

## 10. Informações pendentes (não bloqueiam o início)

- Confirmação de que o repositório GitHub será privado.
- Criação da conta Mercado Pago (developer/produção) e fornecimento seguro
  do access token quando chegarmos à etapa 5 (não deve ser colado no chat).
- Paleta de cores e referências visuais — definidas na etapa 1.
- Nomes completos, texto da história e foto principal — podem ser
  preenchidos como placeholder e completados depois pelo admin.
