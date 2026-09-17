# Etapa 1 — Conteúdo Público e Identidade Visual

Data: 2026-09-17
Status: Aprovado para planejamento de implementação
Spec anterior (fundação): [2026-09-16-site-casamento-design.md](2026-09-16-site-casamento-design.md)

## 1. Visão geral

Primeira etapa de conteúdo real do site de casamento de Bruna e Matheus,
construída sobre a fundação técnica já publicada (Next.js + TypeScript +
Tailwind + Supabase + Vercel). Cobre a Home, a página de História e a
página de Evento, além de definir a identidade visual que vai orientar
todas as páginas futuras (RSVP, admin, galeria, presentes).

A direção visual foi validada por mockups interativos revisados pelos
noivos (ver seção 3), a partir de duas referências fornecidas: um site de
casamento "hub de detalhes" com monograma em brasão sobre fita, e um
convite de papelaria fina com relevo esculpido e medalhão dourado — adaptado
aqui para uma paleta inteiramente monocromática.

## 2. Escopo desta etapa

**Incluído:**
- Sistema de design (paleta, tipografia, componentes visuais reutilizáveis:
  medalhão/monograma, fita de data, cartão de detalhes, contagem regressiva)
- Página Home (`/`): hero com medalhão, nomes, contagem regressiva; faixa
  "Nossa Essência" com fotografia simbólica; seção de boas-vindas
- Página História (`/historia`): linha do tempo dos marcos do relacionamento
- Página Evento (`/evento`): data, horário, local, botão para abrir no mapa,
  roteiro do dia
- Navegação (cabeçalho simples: Início · História · Evento · RSVP)
- Todo o conteúdo textual (história, endereço, data) como **placeholder
  editável**, já que os noivos ainda não forneceram o texto final

**Fora desta etapa:**
- RSVP funcional, cadastro de convidados, admin, pagamentos, galeria real —
  etapas futuras, conforme o plano de etapas da spec de fundação
- Upload real de fotos do casal (a estrutura já nasce pronta para receber
  fotos reais via admin, mas nenhuma tela de upload é construída agora)

## 3. Identidade visual

### 3.1 Paleta de cores

Substitui a paleta "Clássico Absoluto" (com acento champanhe) definida na
etapa de fundação. **A partir de agora, o site é inteiramente
preto/branco/cinza — sem cor de destaque.**

| Nome | Valor | Uso |
|---|---|---|
| Preto | `#050505` | Fundos escuros (hero, seções de detalhes) |
| Carvão | `#1a1a1a` | Gradientes/transições sobre fundo preto |
| Grafite | `#333333` | Texto secundário sobre fundo claro |
| Cinza-médio | `#8f8f8f` | Rótulos, texto terciário, ícones |
| Cinza-claro | `#d9d9d9` | Divisórias finas |
| Neve | `#f2f2f0` | Fundos claros (seções de boas-vindas, cartões) |
| Branco | `#ffffff` | Texto sobre fundo escuro, realces |

Efeitos "metálicos" (o medalhão) são simulados com gradientes lineares
entre esses tons de cinza/branco, nunca com uma cor de destaque separada.

### 3.2 Tipografia

- **Nomes / assinatura (script fluido):** Pinyon Script (Google Fonts) —
  usado para "Bruna & Matheus" em destaque, tanto no hero quanto na seção
  de boas-vindas.
- **Títulos e números (serifada clássica):** Cormorant Garamond — usado em
  caixa alta rastreada para rótulos curtos ("OS", "DETALHES") e nos
  números da contagem regressiva.
- **Corpo de texto e navegação (sans-serif limpa):** Jost — usado em
  parágrafos, rótulos em caixa alta com tracking largo, e menu de
  navegação.
- Todas carregadas via `next/font/google` (não `<link>` manual), para
  evitar layout shift e permitir self-hosting automático pelo Next.js.

### 3.3 Motivo do medalhão/monograma

Elemento central do hero: um selo circular com efeito de relevo metálico
(gradiente linear cinza/branco + `box-shadow` interno simulando luz e
sombra gravadas), miolo preto contendo as iniciais "B · M", ladeado por um
flourish ornamental (SVG vetorial, não fotográfico) acima e abaixo,
inspirado no motivo de scrollwork da referência de papelaria. Abaixo do
medalhão, uma fita com pontas recortadas (`clip-path`) exibe a data do
evento.

**Limitação assumida:** o relevo esculpido em gesso/estuque da referência
de papelaria (bordas ornamentadas fotográficas) não é replicado com
fidelidade fotográfica — exigiria uma textura licenciada que não temos.
O flourish é uma interpretação vetorial do mesmo espírito decorativo.

### 3.4 Fotografia simbólica ("Nossa Essência")

Como o casal ainda não forneceu fotos, a Home usa uma faixa de três fotos
reais e de alta qualidade (banco de imagens de uso livre, ex. Unsplash)
representando os noivos simbolicamente — gravata-borboleta (Matheus),
alianças (união), buquê de flores brancas (Bruna) — todas convertidas para
preto e branco (`filter: grayscale`) com borda em fade radial
(`mask-image`), nunca em retângulo com canto reto.

Essas três imagens, a foto principal do hero e qualquer foto futura da
galeria são tratadas como **conteúdo editável pelo admin** (Etapa 3): a
implementação desta etapa já estrutura essas imagens como dados
(URLs/config), nunca como referências hardcoded que exijam alterar código
para trocar.

## 4. Página Home (`/`)

1. **Cabeçalho de navegação** — fundo preto, links em caixa alta
   espaçados: Início · História · Evento · RSVP.
2. **Hero** — fundo preto com gradiente radial e vinheta; rótulo "Vamos
   nos casar"; flourish + medalhão "B · M"; flourish espelhado; nomes em
   script "Bruna & Matheus"; data por extenso; fita com a data numérica.
3. **Faixa "Nossa Essência"** — as três fotos simbólicas descritas acima,
   sobre fundo preto.
4. **Seção de boas-vindas** — fundo Neve com textura de papel sutil;
   rótulo "Bem-vindos"; nomes em script (tamanho menor); citação em
   itálico serifado; contagem regressiva com 4 unidades (dias/horas/min/seg)
   separadas por divisórias finas.

## 5. Página História (`/historia`)

Mesma linguagem visual da Home. Estrutura: título "Nossa história" em
script, seguido de uma linha do tempo vertical (ponto + linha fina
conectando marcos), cada marco com um ícone de linha simples (não foto) e
um parágrafo curto placeholder (ex.: "Como nos conhecemos", "O primeiro
encontro", "O pedido"). Fundo alternando entre Neve e Preto por marco, para
dar ritmo à rolagem.

## 6. Página Evento (`/evento`)

Reaproveita o componente "cartão de detalhes" já validado no mockup: selo
circular + rótulo "Os Detalhes" de um lado, informações do outro (ícones de
linha para cerimônia e recepção). Abaixo do cartão: botão "Ver no mapa"
(link direto para Google Maps com o endereço, conforme decidido na etapa de
fundação) e um roteiro do dia (cerimônia → recepção → festa) usando os
mesmos ícones de linha.

## 7. Convenção de conteúdo

**O nome da Bruna vem sempre primeiro** em qualquer texto do site,
metadado, título de página ou mensagem: "Bruna & Matheus", nunca "Matheus &
Bruna". Já aplicado retroativamente ao placeholder da Etapa 0
(`src/app/page.tsx`, `src/app/layout.tsx`, commit `d9eb2a8`).

## 8. Considerações técnicas

- Fontes via `next/font/google` (`Pinyon_Script`, `Cormorant_Garamond`,
  `Jost`) — sem `<link>` manual, sem CDN externo no HTML.
- Medalhão, flourish e ícones de linha implementados como SVG inline ou
  componentes React, não como imagens rasterizadas.
- Fotos "Nossa Essência" e foto principal do hero: URLs armazenadas como
  dados (ex. em `site_content` ou constantes de configuração nesta etapa,
  antes de existir o schema completo do banco), nunca hardcoded dentro do
  JSX de forma que trocar a foto exija editar múltiplos arquivos.
- Nenhuma dependência nova além das fontes do Google (já cobertas pelo
  `next/font/google`, que não adiciona pacote npm).
- Textura de papel (grão sutil) implementada via SVG `feTurbulence` inline
  em CSS `background-image`, sem arquivo de imagem externo.

## 9. Itens pendentes (não bloqueiam esta etapa)

- Texto final da História, endereço e data reais do evento — continuam
  como placeholder, preenchidos depois pelo admin (Etapa 3).
- Fotos reais do casal — quando existirem, substituem as fotos simbólicas
  via admin, sem mudança de código.
- Se o casal decidir manter uma versão com relevo fotográfico fiel à
  referência de papelaria, isso exigiria licenciar uma textura de imagem
  específica — fora do escopo atual.
