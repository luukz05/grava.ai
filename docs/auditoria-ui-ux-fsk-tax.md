# Auditoria UI/UX — fsk.tax (produção, julho/2026)

> Auditoria completa do site público `fsk.tax` feita sobre o **código de produção**
> (HTML SSR + bundles CSS/JS reais), seção a seção. Objetivo: extrair a base
> visual, conceitual e — principalmente — o **sistema de movimento e coesão**
> para refatorar o site do GRAVA.AI neste repositório.
>
> **Atenção:** o `fsk-design-system.md` deste repo documenta a **v1** do estilo
> FSK (dark-only, azul `#3ba5e8`, Geist, hexágonos). O site em produção é uma
> **v2 rebrandeada**: indigo `#5c5bee`, AkagiPro/Obliqua, tema claro+escuro,
> Motion (framer-motion). Este documento é a fonte da verdade do que está no ar.
> Para o GRAVA.AI: **a marca continua a do grava (dark + azul + hexágonos); o que
> se importa daqui é o SISTEMA** — movimento, ritmo, receitas e convenções.

---

## 0. Sumário executivo — por que a página parece premium

1. **Movimento onipresente, mas curto e discreto.** Nada "voa" pela tela:
   reveals deslocam 4–20px, micro-interações duram 150ms, easing assinatura
   `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint — começa rápido, assenta suave).
2. **Mockups de produto reconstruídos em HTML**, nunca screenshots. Ficam nítidos
   em qualquer DPI, tematizam com o dark mode e podem ser animados por partes.
3. **Um diagrama vivo** (orquestrador) com linhas SVG que se desenham e pulsos de
   dados viajando pelas curvas — o produto "respira" na página.
4. **Ritmo editorial**: capítulos numerados com números-fantasma gigantes,
   títulos sentence-case terminados em ponto final, eyebrows consistentes.
5. **Profundidade sem sombra pesada**: `ring-1` hairline + glows desfocados de
   baixíssima opacidade + atmosfera fixa de fundo (dot grid + orbes).
6. **Coesão por repetição de receitas**: o mesmo icon-chip, o mesmo card, o mesmo
   header de seção em todas as páginas. Nada é "quase igual".
7. **Acessibilidade como acabamento**: `motion-reduce:` em tudo, `aria-label` nos
   dots, `tabular-nums` em números, hit-area expandida em botões pequenos,
   `scroll-padding-top` para âncoras.
8. **Honestidade como estética**: todo mockup diz "Exemplo ilustrativo", os
   contadores "vêm do catálogo, não do marketing".

---

## 1. Fundações

### 1.1 Stack observado

| Camada | Escolha |
|---|---|
| Framework | Next.js App Router (deploy Vercel, Turbopack) |
| CSS | Tailwind CSS **v4** (tokens via CSS custom properties, sintaxe `text-5xl/12`, `size-*`, `bg-linear-to-br`) |
| Animação | **Motion (framer-motion)** para reveals/presença + CSS keyframes para ambiente + SMIL (`animateMotion`) para pulsos em SVG |
| Componentes interativos | Headless UI (dropdown "Módulos" na navbar) |
| Ícones | Heroicons outline, `stroke-width` 1.5–1.6 |
| Fontes | `next/font` local: **AkagiPro** (300–900, sans + display) e **Obliqua** (só o wordmark do logo) |

### 1.2 Tema duplo (light-first)

- `html.bg-white dark:bg-black` — claro é **branco puro**, escuro é **preto puro**
  (não cinza-chumbo). O contraste dos cards é feito por `ring` hairline, não por
  diferença de fundo.
- Toggle na navbar (ícone sol/lua). Preferência salva em `localStorage`
  (`fsk-theme`) com **chave de versão** (`fsk-theme-v: 2`) que invalida
  preferências antigas ao rebrandear — detalhe raro e inteligente.
- Script inline pré-hidratação aplica a classe `dark` antes do primeiro paint
  (zero FOUC).
- **Toda** classe de cor tem par `dark:`. O par padrão de texto:
  `text-zinc-900 dark:text-white` (títulos), `text-zinc-600 dark:text-zinc-300`
  (corpo), `text-zinc-500 dark:text-zinc-400` (suporte), `text-zinc-400
  dark:text-zinc-500` (metadados — note a **inversão**: no dark o metadado fica
  mais escuro que o suporte, não mais claro).

### 1.3 Cor

- **Um acento só** (mantido da v1): escala completa `brand-50 → brand-950`
  (v2 = indigo, 500 `#5c5bee`, 600 `#483fd0`). No grava.ai: gerar a mesma escala
  a partir do azul do grava.
- **Cinza customizado "mauve"** (cinza com temperatura da marca — leve tom
  violeta) usado em superfícies e no CTA neutro; zinc para texto.
- Cores funcionais só dentro de mockups de dados: emerald (ok), amber
  (processando), sky (aguardando), red (erro).
- Usos canônicos do brand: `bg-brand-600` (CTA hero), `text-brand-600
  dark:text-brand-400` (links/acentos), `bg-brand-50 dark:bg-brand-500/10`
  (fundo de icon-chip), `bg-brand-500/10 blur-2xl/3xl` (glows), `text-brand-400/50
  dark:text-brand-500/40` (linhas do diagrama).
- Gradiente da marca: `from-[#483fd0] to-[#5c5bee]` (600→500) em painéis hero;
  em texto: `bg-clip-text from-brand-500 to-brand-700` (`dark: from-brand-300
  to-brand-500`).

### 1.4 Tipografia

| Elemento | Receita |
|---|---|
| H1 (hero) | `font-display text-5xl/12 font-medium tracking-tight text-balance sm:text-[3.5rem]/14` |
| H2 (seção) | `font-display text-3xl/9 font-medium tracking-tight text-pretty sm:text-[2rem]/10` |
| Eyebrow | `text-sm/7 font-semibold text-zinc-700 dark:text-zinc-400` (+ `text-brand-600 dark:text-brand-400` **só em heros**) |
| Lead do hero | `text-lg/8 text-zinc-600 dark:text-zinc-300` |
| Corpo de seção | `text-base/7 text-zinc-600 dark:text-zinc-300 text-pretty` |
| Destaque no corpo | `<strong class="font-semibold text-zinc-700 dark:text-zinc-200">` |
| Número-fantasma | `font-display text-7xl/none sm:text-8xl/none font-bold text-zinc-100 dark:text-zinc-900/40` |
| Número de stat | `text-5xl sm:text-6xl font-bold tracking-tight tabular-nums` + gradient text |

Decisões:
- **`font-medium` (500) nos headings**, não semibold — com fonte display própria,
  peso menor lê mais caro. Bold fica reservado a números.
- `text-balance` no H1, `text-pretty` em H2/corpo — sem viúvas.
- Line-height sempre explícito na sintaxe `tamanho/linha` (`text-3xl/9`).
- `tabular-nums` em **todo** número que muda ou se alinha (41 usos na home).
- Sem uppercase nos eyebrows da v2 (diferente da v1) — sentence case
  `font-semibold` basta.

### 1.5 Container e ritmo vertical

```
Container universal (TODAS as seções, navbar e footer):
mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10
```

- O max-width **escala por breakpoint** (não é um valor único): mobile lê como
  coluna de texto, desktop abre para 80rem.
- Seção: `py-16` fixo + conteúdo interno `flex flex-col gap-10 sm:gap-16`.
  Espaçamento entre blocos por **gap**, não por margens soltas.
- Full-bleed dentro da seção: `!py-0` na section e o bloco filho controla tudo.
- Âncoras: `html.scroll-smooth` + `:root { --scroll-padding-top: 5.25rem }`
  (altura da navbar, definida por ela própria) + `scroll-padding-top` no html.
- Header de seção padrão (receita única em todo o site):

```html
<div class="flex max-w-3xl flex-col gap-6">
  <div class="flex flex-col gap-2">
    <div class="text-sm/7 font-semibold text-zinc-700 dark:text-zinc-400">Eyebrow</div>
    <h2 class="font-display text-3xl/9 font-medium tracking-tight text-pretty text-zinc-900 sm:text-[2rem]/10 dark:text-white">Título em sentence case, com ponto final.</h2>
  </div>
  <div class="text-base/7 text-zinc-600 dark:text-zinc-300 text-pretty">Lead com <strong>destaques</strong> em semibold.</div>
</div>
```

### 1.6 Atmosfera de página (subpáginas de módulo)

Camada decorativa fixa atrás de todo o conteúdo:

```html
<div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
  <!-- dot grid: pontos de 1px a cada 26px -->
  <div class="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,#d4d4d8_1px,transparent_1px)] [background-size:26px_26px] dark:opacity-[0.1] dark:[background-image:radial-gradient(circle,#3f3f46_1px,transparent_1px)]"></div>
  <!-- 3 orbes de marca, blur-3xl, opacidade 8–12% -->
  <div class="absolute -top-32 -left-24 size-[34rem] rounded-full bg-brand-400/12 blur-3xl dark:bg-brand-500/10"></div>
  <div class="absolute top-1/3 -right-32 size-[40rem] rounded-full bg-brand-300/10 blur-3xl dark:bg-brand-600/10"></div>
  <div class="absolute bottom-0 left-1/4 size-[28rem] rounded-full bg-brand-500/8 blur-3xl dark:bg-brand-500/8"></div>
</div>
```

É a evolução do `.brand-glow` da v1: em vez de um radial-gradient por seção, uma
atmosfera **fixa** (não scrolla) para a página inteira. `main` usa
`isolate overflow-clip` para conter os efeitos.

---

## 2. Sistema de movimento (o coração da qualidade percebida)

### 2.1 Princípios

1. **Distâncias curtas.** Reveals deslocam 4px (linhas de chat), 8px (legendas),
   12px (bolhas/nós), 16px (cards), 20px (headers). Nunca mais que isso.
2. **Durações por papel:** 150ms micro-interação (press, hover de link) ·
   300ms transição de estado (dots, glow, lift, tema) · 500–600ms reveal de
   entrada · 2.4s+ loops de ambiente.
3. **Easing assinatura:** `cubic-bezier(0.22, 1, 0.36, 1)` para tudo que entra
   ou expande; `ease-out` simples em keyframes CSS.
4. **`motion-reduce:transition-none` / `motion-reduce:active:scale-100` em todo
   elemento animado** — via utilitário, não media query manual.
5. **Camadas de movimento:** (a) micro-interações CSS instantâneas, (b) reveals
   on-scroll via Motion (uma vez só), (c) loops de ambiente (SMIL/CSS) que rodam
   sozinhos e não dependem de JS de scroll.
6. **SSR honesto:** os estados iniciais (`opacity:0; transform:...`) vêm
   serializados no HTML — nada pisca antes de animar.

### 2.2 Micro-interações (catálogo)

| Alvo | Efeito | Receita |
|---|---|---|
| Todo botão/CTA | Press física | `transition-transform duration-150 ease-out active:scale-[0.97]` |
| Card de stat | Lift | `transition-transform duration-300 hover:-translate-y-1` |
| Glow de canto do card | Intensifica | `opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100` |
| Logo FSK | Preenchimento | retângulo `w-0 → group-hover:w-[32px]` com `clip-path` do contorno, `duration-300 ease-in-out` (outline vira sólido, da esquerda pra direita) |
| Link de navbar | Cor | `transition-colors duration-150 text-zinc-500 hover:text-zinc-900` |
| Dots de carrossel | Alarga o ativo | `h-1.5 rounded-full transition-all duration-300` — ativo `w-5 bg-white`, inativo `w-1.5 bg-white/40 hover:bg-white/70` |
| Botão de ícone pequeno | Hit-area invisível | `<span class="absolute -inset-1.5"></span>` dentro do botão `relative` |
| Link com seta | Seta fina custom | SVG 13×7 `stroke-width="1"` inline após o texto (não Heroicon) |

### 2.3 Reveals on scroll (Motion)

Estados iniciais observados no SSR (animam para `opacity:1; transform:none`
quando entram no viewport, uma única vez):

| Elemento | Estado inicial |
|---|---|
| Header de seção | `opacity:0; translateY(20px)` |
| Card de grid | `opacity:0; translateY(16px)` (stagger pela ordem) |
| Nó esquerdo/direito do diagrama | `opacity:0; translateX(∓12px)` (entra "de fora pra dentro") |
| Nó central do diagrama | `opacity:0; scale(0.9)` |
| Legenda/label sob o nó | `opacity:0; translateY(8px)` |
| Bolha de chat do usuário | `opacity:0; translateX(12px)` (vem da direita, como enviada) |
| Resposta do assistente | `opacity:0; translateY(4px)` (linha a linha) |
| Linhas SVG | `pathLength="1" stroke-dasharray="0 1"` → anima dasharray (draw-in) |

**A direção do reveal carrega significado**: mensagens do usuário vêm da direita,
nós de entrada vêm da esquerda, o centro nasce por escala. Não é decoração — é
narrativa.

Stagger CSS puro (listagem do blog, sem Motion):

```html
<div class="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
     style="animation-delay:150ms">…</div>
<!-- passos de 50–100ms por item; keyframe: 0.6s ease-out, translateY(20px)→0 -->
```

### 2.4 Animações de ambiente (loops)

- **Pulsos do diagrama:** `circle r="3.5" fill-brand-500` + SMIL
  `<animateMotion dur="2.4s" begin="0.80s|0.98s|…" repeatCount="indefinite">`
  ao longo do mesmo path da linha. Delays escalonados a cada **0.18s** na
  entrada e **0.16s** na saída, com a saída começando quando os primeiros pulsos
  chegam ao centro — leitura de fluxo contínuo entrada→centro→saída.
- **FAB do Arnold:** respira por box-shadow (`arnoldFabBreathe`: anel de 6px em
  `#5c5bee24` que pulsa), dá um "wiggle" ocasional de ±7° pra chamar atenção
  (`arnoldFabWiggle`), e o balão de fala entra com `translateY(4px) scale(.96)`
  (`arnoldSpeechIn`).
- **Mascote Arnold:** avatar SVG (círculo com dois "olhos" derivados do logo) com
  máquina de estados via `data-state` + classes `chatbot-eyes-*` — idle pisca,
  thinking, speaking, happy, error (shake + ring), wink, yawn, party. O mesmo
  mascote aparece no diagrama (escalado 2.6×), nos mockups de chat e no FAB —
  **um personagem, não um ícone**.
- **Catálogo de keyframes utilitários** (disponíveis no CSS): `fade-in-up`
  (0.6s), `scale-in` (0.5s, scale .95), `float` (±10px vertical), `marquee` /
  `marquee-reverse` (translate −50%, conteúdo duplicado), `carousel`, `shimmer`
  (background-position −200%→200%), `pulse-slow`, `aurora-shift`, `magicGlow`
  (drop-shadow pulsante brand).

### 2.5 Contadores (seção catálogo)

SSR renderiza `0`; no viewport, JS conta até o valor real. Número em
gradient-text + `tabular-nums` (não "dança" ao contar). A copy reforça: "números
que vêm do catálogo, não do marketing".

---

## 3. A home, seção a seção

Ordem: navbar → hero → infraestrutura → arnold → módulos → catálogo →
serviços-ia (+cards full-bleed) → para-quem → segurança → cta-final → footer.

### 3.0 Navbar

- **Logo centralizada**: `flex` com dois clusters `flex-1` (esq.: Arnold,
  Módulos ▾, Serviços de IA, Segurança · dir.: Sobre, Blog, Login, tema, CTA).
  Layout raro que sinaliza "produto", não "landing page".
- `sticky top-0 z-10 bg-transparent transition-colors duration-300` — ganha
  fundo ao scrollar (JS), altura `5.25rem` amarrada ao `--scroll-padding-top`.
- Dois CTAs com hierarquia térmica: "Login" ghost; **"Solicitar parceria" em
  `bg-mauve-950` (preto neutro), não brand** — o botão colorido da página é um
  só, o do hero. No dark inverte: `bg-mauve-300 text-mauve-950`.
- Dropdown "Módulos" via Headless UI. Menu mobile: overlay com links
  `text-3xl/10 text-white` + chevron que aparece no hover.

### 3.1 Hero

- Grid assimétrico: texto à esquerda (`max-w-lg`), **painel de produto absoluto**
  à direita (`lg:absolute lg:left-[56%] lg:right-0` — sangra até a borda da
  viewport, `rounded-l-3xl rounded-r-none`).
- Painel: gradiente brand 600→500 + **textura de ruído SVG** (feTurbulence em
  data-URI, `mix-blend-overlay opacity-30 dark:opacity-50`) — mata o "gradiente
  chapado de template".
- Dentro: **carrossel de 9 mockups** (um por módulo), card branco
  `rounded-2xl shadow-xl ring-1 ring-black/5`, dots com `aria-label`
  ("Ver mock de Painel") e `aria-current`.
- Eyebrow do hero é o posicionamento em 3 palavras: "Service as Software".
- CTAs: primário brand ("Conheça o Arnold →") + ghost ("Veja um dossiê →")
  apontando para âncoras internas — o hero não pede compra, pede exploração.

### 3.2 Infraestrutura (o orquestrador)

- Diagrama de fluxo: 7 fontes de dados → nó central Arnold → 7 módulos.
- Um único SVG `viewBox="0 0 1000 560" preserveAspectRatio="none"` com 14
  Béziers `M 235 40 C 385 40, 350 280, 500 280`; nós são divs HTML absolutas
  posicionadas por porcentagem (`top:7.14%` = i/14) — **linhas em SVG, conteúdo
  em HTML** (acessível, tematiza, trunca).
- Nó: `rounded-xl bg-white px-3 py-2 ring-1 ring-zinc-950/5 dark:bg-zinc-900
  dark:ring-white/10` + icon-chip + título `text-sm font-semibold` + caption
  `text-xs text-zinc-500`.
- Centro: mascote Arnold em estado "thinking" com halo `bg-brand-500/15
  blur-3xl`, rótulo e link "Veja o que ele faz →" para a âncora seguinte.
- Colunas tituladas em microcopy uppercase (`text-xs font-semibold tracking-wide
  uppercase text-zinc-400`): "O que o alimenta" / "O que ele articula".
- Versão mobile: mesmo conteúdo re-renderizado como duas listas empilhadas
  (DOM duplicado — ver §7).
- **Já existe port em andamento no grava.ai** (componente `AIOrchestrator`) —
  usar esta espec como referência de timing/anatomia.

### 3.3 Arnold (capítulo 01) — demos de chat em timeline

- Primeira seção "capítulo": número-fantasma `01` gigante atrás do header.
- Layout **timeline vertical**: linha central (`absolute left-5 lg:left-1/2`),
  features alternando lado via `order` no grid de 2 colunas.
- Cada feature = par texto (icon-chip + título + parágrafo) × **mockup de chat
  funcional**: bolha do usuário `rounded-2xl rounded-br-sm bg-zinc-100
  max-w-[82%]` alinhada à direita (canto "apontando" pro remetente); resposta do
  Arnold como texto plano com gráficos reais em HTML (donut de participação,
  série temporal, tabela de due diligence com badges de status).
- Todos os dados fake têm **easter eggs** (Aperture Science, Arasaka Corp,
  Speedwagon Foundation) e todo mockup fecha com "Exemplo ilustrativo".
- A demo de consultas mostra o botão "Autorizar 12 consultas" — a UX de
  segurança ("nunca gasta sozinho") **demonstrada**, não declarada.

### 3.4 Módulos (capítulo 02)

Browser de módulos em tabs (Relatórios, Insights, Consultas, Soluções, Captura,
eSocial, Determinação, Empresas): mockup à esquerda, descrição + specs + link
"Conhecer →" à direita. Cada módulo tem página própria (`/modulos/*`) — a home
mostra o resumo, a subpágina aprofunda.

### 3.5 Catálogo (stats)

- 4 cards `rounded-2xl bg-white p-6 ring-1 ring-zinc-950/5` com: icon-chip
  `size-11 rounded-xl`, número count-up em gradient-text 5xl/6xl, descrição
  `text-sm text-balance`.
- Glow de canto: `absolute -top-10 -right-10 size-28 rounded-full
  bg-brand-500/10 blur-2xl` intensificando no hover.
- Grid `grid-cols-2 lg:grid-cols-4` — nunca quebra pra 1 coluna nem no mobile.

### 3.6 Serviços de IA (capítulo 03) + cards full-bleed

- Header + CTA "Solicitar um dossiê"; depois, fora do `py-16` (section com
  `!py-0`), a lista de serviços em **cards-moldura**:

```html
<div class="group grid grid-cols-1 gap-2 rounded-lg bg-mauve-950/2.5 p-2 lg:grid-cols-2 dark:bg-white/5">
  <div class="flex flex-col justify-between gap-6 p-6 sm:p-10 lg:group-even:col-start-2">
    <!-- texto: h3 text-xl/8 sm:text-2xl/9 + parágrafo + rodapé de condições -->
  </div>
  <div class="relative overflow-hidden rounded-sm lg:group-even:col-start-1
              dark:after:absolute dark:after:inset-0 dark:after:outline-1 dark:after:-outline-offset-1 dark:after:outline-white/10">
    <!-- mockup "Dossiê": badge + h4 + <dl> com divide-y + rodapé de confiança -->
  </div>
</div>
```

- **Moldura de 2,5% de tinta** (`bg-mauve-950/2.5 p-2`) em volta do conteúdo
  branco — profundidade quase subliminar, zero sombra.
- **Alternância de lados sem JS e sem classes manuais**: `lg:group-even:col-start-*`.
- Hairline no dark via `after:outline` (não border — não afeta layout).
- Mockup "Dossiê" usa `<dl>` semântico com `divide-y` e `tabular-nums`.

### 3.7 Para quem (capítulo 04)

4 personas (CFOs, escritórios contábeis, consultorias, advocacia) em grid
simples `h3 font-semibold` + parágrafo. Sem cards — só tipografia. Nem toda
seção precisa de chrome.

### 3.8 Segurança (capítulo 05)

6 itens técnicos com nomes própros ("Tenancy estrutural", "RLS fail-closed",
"O modelo nunca gasta"). Eyebrow-título-corpo, grid de 2–3 colunas. A linguagem
técnica específica É o argumento de venda — sem selos genéricos.

### 3.9 CTA final + footer

- CTA: uma frase de ação ("Veja o Arnold trabalhar nos seus dados.") + subtítulo
  + 2 botões (primário "Fale com a FSK", ghost "Conheça o Arnold").
- Footer curto: logo + 3 colunas (Plataforma / Empresa / Legal) + copyright.
  Links `text-zinc-600 hover:text-zinc-900 transition-colors`. Sem redes
  sociais, sem newsletter — B2B enxuto.

---

## 4. Receitas de componente (copiar/adaptar)

### Botões (pill sempre, base compartilhada)

```
base:      inline-flex shrink-0 items-center justify-center gap-1 rounded-full
           text-sm/7 font-medium transition-transform duration-150 ease-out
           active:scale-[0.97] motion-reduce:transition-none px-4 py-2
primário:  bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600
neutro:    bg-mauve-950 text-white hover:bg-mauve-800 dark:bg-mauve-300 dark:text-mauve-950
ghost:     text-mauve-950 hover:bg-mauve-950/10 dark:text-white dark:hover:bg-white/10
```

Regra: **um botão brand por viewport**; o resto é neutro ou ghost. Setas são o
SVG fino 13×7, não →.

### Icon-chip (a assinatura visual mais repetida)

```html
<span class="flex size-8 shrink-0 items-center justify-center rounded-lg
             bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
  <svg class="size-4" stroke-width="1.6" …/>  <!-- Heroicon outline -->
</span>
<!-- variantes: size-7/rounded-lg (compacto), size-11/rounded-xl (stat card) -->
```

### Card branco padrão

```html
<div class="rounded-2xl bg-white p-6 ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
<!-- mockups flutuantes adicionam shadow-xl ring-black/5; cards de grade não têm sombra -->
```

### Número-fantasma de capítulo

```html
<div class="relative isolate">
  <span aria-hidden="true" class="pointer-events-none absolute -top-12 -left-1 -z-10 select-none
        font-display text-7xl/none font-bold text-zinc-100 sm:-top-16 sm:text-8xl/none dark:text-zinc-900/40">01</span>
  <!-- header da seção por cima -->
</div>
```

### Bolhas de chat

```
usuário:    max-w-[82%] rounded-2xl rounded-br-sm bg-zinc-100 px-3.5 py-2
            text-sm/6 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200
            (container flex justify-end; reveal translateX(12px))
assistente: texto plano text-sm/6, sem bolha, com gráficos/tabelas inline
            (reveal translateY(4px) por bloco)
```

### Mockup de produto (regras)

1. Sempre HTML/CSS real, nunca imagem.
2. Header do mockup: icon-chip + nome do módulo + contexto `text-xs
   text-zinc-400` à direita (`ml-auto`).
3. Gráficos com as 4 cores funcionais; valores `tabular-nums`; rótulos
   `text-[0.6rem]`–`text-[0.65rem]`.
4. Rodapé obrigatório: `Exemplo ilustrativo` em `text-[0.65rem] text-zinc-400`.
5. Dados fake plausíveis + easter eggs discretos.

---

## 5. Subpáginas e templates

### Template de página de módulo (`/modulos/*`)

1. Atmosfera fixa (dot grid + orbes — §1.6).
2. Hero: eyebrow "Módulo · fsk.tax" (brand) → **H1 de uma palavra com ponto**
   ("Relatórios.") → lead → CTAs "Solicitar acesso" + "Conhecer o módulo".
3. Mockup grande do módulo (o mesmo do carrossel da home).
4. "Em resumo." — lista de specs curtas.
5. Capítulos numerados com número-fantasma: **01 Por que existe · 02 Como
   funciona · 03 Para que serve** (+ seções específicas do módulo).
6. CTA final padrão.

Estrutura pedagógica fixa: problema → mecânica → uso. Vale copiar como template
das páginas de plano/módulo do grava.ai.

### `/sobre`

Hero de missão → texto institucional → 3 stat-tiles ("100% infra no Brasil",
"LGPD", "24/7") → depoimento com nome/empresa → CTA. Página curta de confiança.

### `/solicitar-acesso`

Modelo de **acesso por convite**: campo de código (formato explicado embaixo:
"FSK-XXXXXXXXXXXX-XXXX") + caminho alternativo em 3 passos numerados (Fale →
Receba → Crie). Escassez como posicionamento premium.

### `/blog`

Filtros por tipo (Todos 13 / Posts 3 / Artigos 10 — contagens visíveis) + por
assunto; destaques no topo; cards com tags, data absoluta e tempo de leitura;
paginação "Mostrando 1–9 de 10"; entrada com stagger CSS (§2.3).

---

## 6. Convenções implícitas (a "voz" do site)

1. **Títulos em sentence case com ponto final.** ("Um analista fiscal que cabe
   num chat.") — afirmações, não slogans. H1 de subpágina: uma palavra + ponto.
2. **Eyebrow = classificação; título = tese; lead = mecânica.** Sempre nessa
   ordem, sempre com a mesma receita visual.
3. **Honestidade ostensiva**: "Exemplo ilustrativo" em todo mockup; "números que
   vêm do catálogo, não do marketing"; "a IA prioriza e redige, nunca inventa o
   cálculo"; "você autoriza num clique — nunca gasta sozinho".
4. **Especificidade técnica como prova**: "registro E110", "NT 2025.002",
   "14 de 48 eventos" — número exato > adjetivo.
5. **Mascote com personalidade** costurando tudo (diagrama → chat → FAB), com
   estados emocionais. O produto tem rosto.
6. **Um personagem também no texto**: o produto é "o Arnold" (sujeito das
   frases), não "a plataforma".
7. **Semântica caprichada onde importa**: `<dl>` para pares chave-valor,
   `role="list"`, `aria-current` nos dots, `aria-hidden` em tudo decorativo.
8. **Datas absolutas** no blog ("23 de janeiro de 2026"), nunca "há 3 dias".

---

## 7. Pontos fracos observados (não copiar)

1. **DOM duplicado** desktop/mobile (diagrama e navbar renderizam o conteúdo
   duas vezes) — home com 266KB de HTML. No grava.ai preferir reordenação por
   CSS; duplicar só quando a topologia realmente muda.
2. **`!py-0`** (important) para full-bleed — funciona, mas é gambiarra; melhor
   uma variante `padded={false}` no componente de seção.
3. **Eyebrows e alguns títulos são `<div>`** — sem custo visual, mas perde
   semântica/outline; usar `<p>`/`<hN>` no grava.
4. Botões transicionam só `transform` — a troca de cor no hover "estala" (pode
   ser deliberado; no grava usar `transition-[transform,background-color]`).
5. Hero com `text-brand-600` sobrescrevendo `text-zinc-700` na mesma lista de
   classes (resquício de composição) — no grava, resolver a variante no
   componente, não por ordem de classe.
6. Contadores SSR em "0": sem JS a seção mostra zeros. Fallback melhor: SSR com
   o valor real e animar só quando o JS montar.

---

## 8. Guia de aplicação no grava.ai

**Separar marca de sistema.** A marca do grava (dark + azul + hexágonos + Geist,
conforme `fsk-design-system.md`) continua sendo a identidade. O que se importa do
fsk.tax v2 é o sistema de qualidade:

### Adotar 1:1 (independente de marca)

- Sistema de movimento completo (§2): easing assinatura, durações, distâncias,
  `active:scale-[0.97]`, `motion-reduce`, reveals direcionais com Motion,
  stagger CSS no que for lista estática.
- Container universal com max-width escalonado + ritmo por `gap`.
- Receita única de header de seção + capítulos com número-fantasma (o grava já
  usa números ornamentais — evoluir para o fantasma gigante).
- `ring-1` hairline em vez de borda/sombra; moldura de 2,5% (`p-2` + tinta).
- `tabular-nums`, `text-balance`/`text-pretty`, hit-area expandida,
  `scroll-padding-top` amarrado à navbar.
- Mockups de produto em HTML com "Exemplo ilustrativo" (para o grava: mockup do
  dashboard de leads/CPL do Plano B, do relatório mensal, do totem em operação).
- Alternância de lados via `group-even`.

### Adaptar à marca grava

- Escala `brand-50→950` gerada a partir do azul grava (`#3ba5e8`) substituindo o
  acento único atual; gradiente 600→500 + ruído SVG no painel do hero.
- Atmosfera fixa: dot grid + orbes azuis (ou malha de hexágonos ultra-sutil no
  lugar do dot grid — hexágono é da marca grava).
- Orquestrador (`AIOrchestrator` já iniciado): fontes de leads (Meta, Google,
  WhatsApp, site) → nó central IA/GRAVA → ações (CRM, relatório, franqueado) —
  com pulsos `animateMotion` de 2.4s e stagger 0.18s conforme §2.4.
- Mascote/FAB: o grava não tem personagem; o equivalente é o hexágono vivo ou o
  totem — se criar FAB de WhatsApp, aplicar `breathe` + `wiggle` do §2.4.

### Decidir antes de refatorar (não são automáticos)

- **Tema claro+escuro**: fsk.tax é light-first com dark; o grava hoje é
  dark-only por identidade. Adotar o mecanismo (localStorage versionado +
  script anti-FOUC) **se** a decisão de marca permitir light mode; senão manter
  dark-only e pular o toggle.
- **Navbar de logo centralizada**: sinaliza "produto/plataforma". Para LP de
  captação de franqueados (conversão), manter o modo campanha sem fuga da v1 —
  logo à esquerda + CTA. A navbar centralizada faz sentido só no site
  institucional.
- **Fonte**: AkagiPro é licenciada da FSK v2; o grava segue com Geist (ou outra
  display própria) — o que importa é o padrão `font-medium` + display nos
  headings e line-heights explícitos.

### Ordem de refatoração sugerida

1. Fundações: tokens (escala brand, cinza de marca), container universal,
   receita de header de seção, botões com press física.
2. Sistema de movimento: Motion + reveals direcionais + `motion-reduce`.
3. Hero: painel gradiente com ruído + mockup HTML (carrossel se houver 2+ telas).
4. Orquestrador (terminar `AIOrchestrator` com timings desta espec).
5. Seções restantes na receita de capítulos numerados.
6. Atmosfera fixa + micro-interações de acabamento (glows, lifts, dots).
