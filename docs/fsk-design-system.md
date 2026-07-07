# FSK — Design System de Sites Premium

> Referência técnica para replicar o estilo FSK em novos projetos. Agnóstica
> de cliente — os tokens de marca (cor, nome, logo) mudam; a arquitetura não.
> Auditada a partir de `fsk.tax` e `grava.ai` (julho/2026).

---

## 1. Stack tecnológico

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js App Router (última versão) | SSR + file-based routing + `next/image` + `next/font` |
| UI | React + TypeScript | Tipagem no sistema de design; sem runtime extra |
| CSS | Tailwind CSS v4 (`@theme inline`) | Utilitários + tokens via CSS custom properties nativas |
| Fonte | Geist Sans + Geist Mono via `next/font` | Zero CLS; subsets `latin` |
| Imagens | `next/image` com `fill` | LCP otimizado; responsivo por padrão |
| Linter | ESLint config-next | Padrão; sem regras extras |

**Nota Tailwind v4**: não usa `tailwind.config.js`. Os tokens entram via `@theme inline`
dentro do CSS global. Qualquer agente que gere configuração v3 está errado.

---

## 2. CSS Global e Tokens

### Estrutura do `globals.css`

```css
@import "tailwindcss";

:root {
  /* SUBSTITUIR pelos valores do cliente */
  --background: #0e0e0e;
  --foreground: #ededed;
  --brand:      #3ba5e8;   /* único acento cromático */
  --brand-cyan: #66cdff;
  --brand-accent: #388cc6;
  --surface:    #1a1a1a;   /* elevação +1 */
  --surface-2:  #1f1f1f;   /* elevação +2 (cards, forms) */
  --muted:      #a8a8a8;   /* texto secundário */
  --wire-line:  #3a3a3a;   /* bordas e divisores */
}

@theme inline {
  --color-background:    var(--background);
  --color-foreground:    var(--foreground);
  --color-brand:         var(--brand);
  --color-brand-cyan:    var(--brand-cyan);
  --color-brand-accent:  var(--brand-accent);
  --color-surface:       var(--surface);
  --color-surface-2:     var(--surface-2);
  --color-muted:         var(--muted);
  --color-wire-line:     var(--wire-line);
  --font-sans:           var(--font-geist-sans);
  --font-mono:           var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

/* Container do site */
.shell {
  width: 100%;
  max-width: 88rem;   /* 1408px — deliberadamente mais largo que o padrão */
  margin-inline: auto;
  padding-inline: 1.5rem;
}
@media (min-width: 1024px) {
  .shell { padding-inline: 4rem; }
}

/* Glows de fundo (adaptáveis por posição) */
.brand-glow {
  background-image: radial-gradient(
    55% 75% at 78% 18%,
    rgba(59, 165, 232, 0.14),
    transparent 70%
  );
}
.brand-glow-left {
  background-image: radial-gradient(
    50% 70% at 12% 30%,
    rgba(59, 165, 232, 0.10),
    transparent 70%
  );
}

/* Placeholder wireframe (imagem ausente) */
.wire-box {
  border: 1px dashed var(--wire-line);
  background-color: var(--surface);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 11px,
    rgba(255, 255, 255, 0.025) 11px,
    rgba(255, 255, 255, 0.025) 12px
  );
}
```

### Regras da paleta

- **Um único acento cromático** por projeto. Nunca dois acentos concorrentes.
- Saturação zero fora do brand — todo o resto é escala de cinza.
- O `--brand` entra em opacidades: `/10` (decorativo), `/15` (bg de badge), `/40–70` (números ornamentais), `100%` (CTA, eyebrow).
- `--surface` e `--surface-2` criam profundidade sem sombra — só luminosidade.

---

## 3. Componentes Primitivos (`wireframe.tsx`)

Toda página usa esses primitivos. São a linguagem compartilhada.

### `Shell` — Container centralizado

```tsx
export function Shell({ children, className = "" }) {
  return <div className={`shell ${className}`}>{children}</div>;
}
```

Nunca inline `max-w-*` no JSX. Centralização sempre via `Shell`.

### `SectionTag` — Eyebrow de seção

```tsx
export function SectionTag({ children }) {
  return (
    <span className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brand">
      <span className="h-px w-8 bg-brand/50" />
      {children}
    </span>
  );
}
```

Assinatura visual mais reconhecível do estilo: **linha curta + rótulo uppercase, sem caixa**.
O tracking `0.2em` faz contraste deliberado com o `tracking-tight` dos headings.

### `Hexagon` — Motivo gráfico decorativo

```tsx
export function Hexagon({ className = "" }) {
  return (
    <svg viewBox="0 0 100 115" className={className} aria-hidden>
      <polygon
        points="50,2 98,29 98,86 50,113 2,86 2,29"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
```

Sempre usado como decoração absoluta: `pointer-events-none absolute text-brand/10`.
Nunca em primeiro plano. Substitua por outro motivo geométrico se o cliente não for
"tech" (triângulo, losango, círculo outline).

### `Photo` — Imagem responsiva com `next/image fill`

```tsx
export function Photo({ src, alt, className = "", fit = "cover", priority = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src} alt={alt} fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
```

O wrapper controla dimensões via className. A imagem preenche com `fill`.

### `BrandMark` — Logo + wordmark

```tsx
export function BrandMark({ className = "" }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo-mark.png" alt="MARCA" width={271} height={321} className="h-7 w-auto" priority />
      <span className="text-lg font-bold tracking-tight text-brand">NOME</span>
    </span>
  );
}
```

---

## 4. Sistema de Layout

### 4.1 Full-bleed + Shell interior

**Padrão base de toda seção:**

```tsx
<section className="border-t border-wire-line/50">
  <Shell className="py-24">
    {/* conteúdo */}
  </Shell>
</section>
```

A `section` é `w-full` — fundo/borda sangra até as extremidades da viewport.
O `Shell` restringe apenas o conteúdo interno. Nunca colocar `max-w-*` na section.

### 4.2 Grids assimétricos

Nunca 50/50. Use frações quebradas para criar dinamismo:

```tsx
/* Texto dominante (hero, LP hero) */
lg:grid-cols-[1.1fr_0.9fr]

/* Visual dominante (sobre, features com imagem) */
lg:grid-cols-[0.9fr_1.1fr]

/* Leve assimetria (texto levemente maior) */
lg:grid-cols-[1.05fr_0.95fr]

/* Dois terços / um terço */
lg:grid-cols-[2fr_1fr]
```

### 4.3 Sticky left + scroll right

Para seções de lista longa:

```tsx
<Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
  <div className="lg:sticky lg:top-28 lg:self-start">
    {/* SectionTag + H2 + parágrafo + CTA opcional */}
  </div>
  <div className="divide-y divide-wire-line/60">
    {/* lista de items que scrollam */}
  </div>
</Shell>
```

O header fica fixo enquanto o usuário explora os items à direita.

### 4.4 Image bleeding (imagem sem container)

```tsx
<div className="grid items-stretch gap-y-10 lg:grid-cols-2">
  <Photo
    src="/imagem.jpg"
    alt="..."
    className="order-2 h-72 lg:order-1 lg:h-auto lg:min-h-[24rem] lg:rounded-none lg:rounded-r-3xl"
  />
  <div className="order-1 flex flex-col justify-center px-6 py-16 lg:order-2 lg:px-16">
    {/* conteúdo */}
  </div>
</div>
```

Sem `Shell` wrapping — a imagem vai de borda a borda verticalmente.
`lg:rounded-r-3xl` arredonda só o lado que enfrenta o texto.

### 4.5 Alternância de fundo para ritmo visual

Seções alternadas recebem `bg-surface/40` (mudança de ~4% de luminosidade).
Não use bordas pesadas para separar — deixe o fundo fazer o trabalho.

```
Section A → bg padrão (#0e0e0e)
Section B → bg-surface/40 (#1a1a1a com 40% opacidade)
Section C → bg padrão
...
```

---

## 5. Tipografia

### Escala

| Elemento | Classes |
|---|---|
| H1 | `text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]` |
| H2 | `text-4xl sm:text-5xl font-semibold tracking-tight` |
| H2 compacto | `text-3xl sm:text-4xl font-semibold tracking-tight` |
| H3 | `text-xl font-semibold` |
| Lead / intro | `text-lg text-muted` |
| Body | `text-base text-muted` |
| Caption | `text-sm text-muted` |
| Eyebrow | `text-[11px] uppercase tracking-[0.2em] text-brand` |
| Número ornamental grande | `text-5xl font-semibold text-brand/40` |
| Número ornamental médio | `text-3xl font-semibold text-brand/70` |
| Número ornamental pequeno | `text-2xl font-semibold text-brand/70` |
| Valor financeiro display | `text-5xl sm:text-6xl font-bold` |

### Regras

- `tracking-tight` em **todos** os headings — cria densidade editorial.
- `leading-[1.05]` só no H1 — mínimo absoluto para títulos display.
- Nunca `font-bold` em H1/H2 a menos que seja um título de impacto isolado.
- `font-semibold` é o peso padrão de heading.
- `text-muted` (`#a8a8a8`) para todo texto secundário — nunca `text-gray-*`.

---

## 6. Botões

| Tipo | Classes |
|---|---|
| Primary (CTA principal) | `rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black` |
| Primary pequeno | `rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-black` |
| Secondary outline | `rounded-full ring-1 ring-wire-line px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:ring-brand` |
| Ghost brand | `rounded-full ring-1 ring-brand text-brand px-6 py-3 text-sm font-medium inline-flex items-center gap-2` |
| Icon button | `grid h-9 w-9 place-items-center rounded-full ring-1 ring-brand/60 text-brand transition-colors hover:bg-brand/10` |
| Inline link | `text-sm font-medium text-brand hover:underline` |
| Inline link com seta | `inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline` |

**Regras imutáveis:**

1. Sempre `rounded-full` — pill é assinatura do estilo.
2. Primary usa `text-black` sobre `bg-brand`, nunca `text-white`.
3. Outline usa `ring-1` (não `border`) — evita deslocamento de layout no hover.
4. `transition-colors` em todo elemento interativo.

---

## 7. Elementos de UI Recorrentes

### Badge inline

```tsx
<span className="inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand">
  rótulo
</span>
```

### Divisor com número ornamental (listas)

```tsx
<div className="flex gap-6 py-6 first:pt-0 border-b border-wire-line/60">
  <span className="text-3xl font-semibold text-brand/70">0{i + 1}</span>
  <div>
    <h3 className="text-xl font-semibold">{título}</h3>
    <p className="mt-1.5 text-muted">{descrição}</p>
  </div>
</div>
```

### Card de feature com borda esquerda brand

```tsx
<div className="border-l-2 border-brand/40 pl-5">
  <h3 className="text-xl font-semibold text-brand">{título}</h3>
  <p className="mt-1.5 text-muted">{descrição}</p>
</div>
```

### Card de grid simples (incluso/features)

```tsx
<div className="border-b border-wire-line/60 py-6">
  <h3 className="text-lg font-semibold">{título}</h3>
  <p className="mt-1 text-muted">{descrição}</p>
</div>
```

### Ícone quadrado com glow

```tsx
<span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-2xl text-brand">
  {ícone}
</span>
```

### Ícone social (hover flip para brand)

```tsx
<a className="grid h-10 w-10 place-items-center rounded-full text-muted ring-1 ring-wire-line transition-colors hover:bg-brand hover:text-black hover:ring-brand">
  <Icon className="h-5 w-5" />
</a>
```

### Form container

```tsx
<form className="rounded-2xl border border-wire-line bg-surface-2 p-6">
  {/* campos */}
</form>
```

### Input field

```tsx
className="w-full rounded-lg border border-wire-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-brand focus:outline-none"
```

---

## 8. Navbar

### Estrutura

```tsx
<header className="sticky top-0 z-50 border-b border-wire-line/60 bg-background/80 backdrop-blur-md">
  <nav className="shell relative flex h-16 items-center justify-between gap-4">
    {/* Logo */}
    {/* Links centrais — absolute + translate para centralização perfeita */}
    <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
      {/* ... */}
    </ul>
    {/* Ações direita: ícone WhatsApp + CTA pill */}
  </nav>
</header>
```

### Modo campanha (LP sem fuga)

```tsx
const campaign = pathname.startsWith("/seja-um-franqueado");
// Em modo campanha: sem links de navegação, CTA ancora no form local.
```

**Regra**: landing pages de conversão não têm links de fuga. A navbar simplifica para
logo + CTA + contato (WhatsApp/email).

---

## 9. Padrões de Seção (receitas prontas)

### Hero padrão (2 colunas assimétrico)

```tsx
<section className="brand-glow relative overflow-hidden">
  <Hexagon className="pointer-events-none absolute -right-24 -top-24 h-[36rem] w-[36rem] text-brand/10" />
  <Shell className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
    <div>
      <SectionTag>eyebrow</SectionTag>
      <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
        Título principal com <span className="text-brand">destaque inline.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">Subtítulo.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        {/* botão primary + botão secondary */}
      </div>
    </div>
    <Photo src="..." alt="..." fit="contain" priority className="h-80 w-full lg:h-[34rem]" />
  </Shell>
</section>
```

### Seção de features numeradas (sticky left)

```tsx
<section className="border-t border-wire-line/50">
  <Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
    <div className="lg:sticky lg:top-28 lg:self-start">
      <SectionTag>eyebrow</SectionTag>
      <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Título</h2>
      <p className="mt-6 max-w-md text-muted">Subtítulo opcional.</p>
    </div>
    <div className="divide-y divide-wire-line/60">
      {items.map((item, i) => (
        <div key={item.t} className="flex gap-6 py-6 first:pt-0">
          <span className="text-3xl font-semibold text-brand/70">0{i + 1}</span>
          <div>
            <h3 className="text-xl font-semibold">{item.t}</h3>
            <p className="mt-1.5 text-muted">{item.d}</p>
          </div>
        </div>
      ))}
    </div>
  </Shell>
</section>
```

### Seção de grid (3 colunas, divisores verticais)

```tsx
<section className="border-t border-wire-line/50">
  <Shell className="py-24">
    <SectionTag>eyebrow</SectionTag>
    <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Título</h2>
    <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3 md:divide-x md:divide-wire-line/60">
      {items.map((item, i) => (
        <div key={item.t} className="md:px-8 md:first:pl-0">
          <span className="text-5xl font-semibold text-brand/40">0{i + 1}</span>
          <h3 className="mt-5 text-xl font-semibold">{item.t}</h3>
          <p className="mt-2 text-muted">{item.d}</p>
        </div>
      ))}
    </div>
  </Shell>
</section>
```

### CTA horizontal (lead magnet / ponte)

```tsx
<section className="brand-glow-left relative overflow-hidden border-y border-wire-line/50 bg-surface">
  <Shell className="relative flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between">
    <div className="max-w-xl">
      <SectionTag>eyebrow</SectionTag>
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Título CTA.</h2>
      <p className="mt-4 text-muted">Subtítulo.</p>
    </div>
    <Link href="..." className="shrink-0 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-black">
      Ação
    </Link>
  </Shell>
</section>
```

### Image bleeding + lista (sem Shell)

```tsx
<section className="border-t border-wire-line/50">
  <div className="grid items-stretch gap-y-10 lg:grid-cols-2">
    <Photo
      src="..."
      alt="..."
      className="order-2 h-72 lg:order-1 lg:h-auto lg:min-h-[24rem] lg:rounded-none lg:rounded-r-3xl"
    />
    <div className="order-1 flex flex-col justify-center px-6 py-16 lg:order-2 lg:px-16">
      <SectionTag>eyebrow</SectionTag>
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Título</h2>
      <ul className="mt-8 divide-y divide-wire-line/60">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-5 py-4">
            <span className="text-2xl font-semibold text-brand/70">0{i + 1}</span>
            <span className="text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

---

## 10. Arquitetura de Arquivos

```
src/
  app/
    globals.css          ← tokens + .shell + .brand-glow + .wire-box
    layout.tsx           ← Navbar + SiteFooter + fonte + metadata global
    page.tsx             ← Home institucional
    [rota]/
      page.tsx           ← página específica (ex: LP de conversão)
  components/
    wireframe.tsx        ← Shell, Photo, Hexagon, SectionTag, BrandMark, ImagePlaceholder
    navbar.tsx           ← Navbar (sticky, modo campanha por pathname)
    site-footer.tsx      ← Footer (4 colunas: marca/nav/redes/legal)
    whatsapp-float.tsx   ← Botão flutuante WhatsApp (mobile)
    lead-form.tsx        ← LeadForm (short/full com campos UTM ocultos)
    faq.tsx              ← Accordion FAQ
    icons.tsx            ← SVGs de redes sociais (WhatsApp, Instagram, etc.)
  lib/
    site.ts              ← Todas as constantes e conteúdo (nunca inline nas páginas)
```

**Regra de separação**: conteúdo vai em `lib/site.ts` como constantes exportadas.
Páginas importam e mapeiam. Nunca JSX com texto hard-coded dentro de `.map()`.

---

## 11. Separação de Conteúdo (`lib/site.ts`)

Toda string de conteúdo que pode mudar vai como constante:

```ts
// Contatos
export const WHATSAPP_NUMBER = "(XX) XXXXX-XXXX";
export const WHATSAPP_LINK = `https://wa.me/55XXXXXXXXXXX?text=${encodeURIComponent("Mensagem pré-preenchida")}`;

// Arrays de conteúdo
export const FEATURES = [
  { t: "Título", d: "Descrição." },
];

// Valores financeiros
export const VALOR_DISPLAY = "R$ XX.XXX";
```

**Marcadores de placeholder**: `// [REAL]` para dados confirmados do cliente,
`// [PLACEHOLDER]` para dados a substituir.

---

## 12. Lead Form (captura de conversão)

Sempre duas instâncias por LP:

1. **`variant="short"`** no hero (acima da dobra): Nome + WhatsApp + Cidade/UF.
   Baixa fricção — converte o usuário quente.
2. **`variant="full"`** na seção `#formulario` (rodapé): + Email + Capital + Timing.
   Qualifica o lead para o time de vendas.

Campos UTM ocultos (`utm_source/medium/campaign/term/content`) sempre presentes
desde o wireframe — sem esforço extra de integração no futuro.

Consentimento LGPD sempre no form (checkbox obrigatório).

---

## 13. Princípios de Design

1. **Restraint é premium.** Um acento só. Sem segundas cores. Quanto menos cor, mais sofisticado.
2. **Full-bleed, não caixas.** Seções sangram. Divisores são bordas de 1px, não cards encaixotados.
3. **Assimetria deliberada.** Grids nunca 50/50. A tensão visual substitui recursos gráficos.
4. **Tipografia faz o trabalho pesado.** Tracking tight nos headings, números ornamentais grandes — a tipografia é o design.
5. **Glows, não sombras.** Profundidade com radial-gradient sutil, não box-shadow.
6. **Hexágono como alma.** O motivo geométrico da marca aparece sempre em outline, sempre decorativo, nunca chamando atenção pra si.
7. **Conteúdo separado do layout.** `lib/site.ts` é a fonte da verdade. Páginas são só estrutura.
8. **LP sem fuga.** Modo campanha desativa links de navegação — o usuário converte ou sai.
9. **Zero-padded numbers.** `01`, `02`, `03` — não `1`, `2`, `3`. Detalhe editorial que eleva.
10. **Inline brand text.** Destaque de palavra-chave com `<span className="text-brand">` dentro do parágrafo, não em elemento separado.
