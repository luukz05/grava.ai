/**
 * GRAVA.AI — Landing de franquias (wireframe de baixa-média fidelidade)
 * Estrutura baseada em docs/brand-and-content.md (extraído da apresentação PDF).
 * Foco: layout, hierarquia e blocos. Imagens são placeholders (.wire-box).
 */

// ---- Placeholders / primitivos de wireframe -------------------------------

function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`wire-box flex items-center justify-center rounded-2xl text-xs uppercase tracking-wider text-muted ${className}`}
    >
      <span className="px-4 text-center">⊞ {label}</span>
    </div>
  );
}

function Hexagon({ className = "" }: { className?: string }) {
  // Motivo gráfico da marca (favo de mel), desenhado leve em outline.
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

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-wire-line px-3 py-1 text-[11px] uppercase tracking-widest text-muted">
      {children}
    </span>
  );
}

// ---- Conteúdo (do PDF) -----------------------------------------------------

const PILARES = [
  { t: "Inovação", d: "Uma ideia nova de personalizados, criada para facilitar." },
  { t: "Experiência", d: "Traz o cliente para participar da criação do produto." },
  { t: "Rentabilidade", d: "Retornos superiores ao investido em 6 a 12 meses." },
];

const LOCAIS = [
  "Shopping centers",
  "Supermercados e hipermercados de grande porte",
  "Aeroportos",
];

const INVESTIMENTO = [
  { t: "Taxa do franqueado", d: "R$ 35.000,00 já inclusa no valor." },
  { t: "Taxa de royalties", d: "2,5% sobre o faturamento bruto." },
  { t: "Taxa de marketing", d: "1% sobre o faturamento bruto." },
  { t: "Payback estimado", d: "De 6 a 12 meses para retorno." },
  { t: "Ticket médio", d: "Aprox. R$ 60,00 a R$ 100,00." },
  { t: "Estoque e equipamentos", d: "~R$ 15.000,00 (estoque inicial incluso)." },
];

const DISTRIBUICAO = [
  { t: "Distribuição centralizada", d: "Produtos e matéria-prima pela matriz." },
  { t: "Estoque inteligente", d: "Plataforma monitora consumo e alerta reposição." },
  { t: "Controle de qualidade", d: "Padronização em todas as unidades." },
  { t: "Gestão integrada", d: "Unidade sempre abastecida e eficiente." },
];

const IA = [
  "No totem: primeiro atendimento e criação da arte para gravação.",
  "No sistema de Vendas Online.",
  "CRM inteligente: acompanhamento em tempo real da matriz.",
  "Estoque: aponta o que mais vende e o que precisa de reposição.",
];

// ---- Página ----------------------------------------------------------------

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-10">
      {/* Aviso de wireframe */}
      <p className="mb-10 rounded-lg border border-dashed border-wire-line bg-surface px-4 py-2 text-center text-xs text-muted">
        🧩 Protótipo de baixa-média fidelidade — estrutura e hierarquia. Imagens
        e polish visual virão depois.
      </p>

      {/* 1. HERO ------------------------------------------------------------ */}
      <section className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-wire-line bg-surface px-8 py-16 md:grid-cols-2">
        <Hexagon className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 text-brand/15" />
        <div className="relative">
          {/* Logo (placeholder do símbolo hexagonal + wordmark) */}
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg border border-brand text-brand">
              <Hexagon className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand">
              GRAVA.AI
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Transformando ideias em produtos personalizados.
          </h1>
          <p className="mt-5 max-w-md text-muted">
            Personalização com Inteligência Artificial em totens automatizados.
            Seja um franqueado e leve essa experiência para sua região.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-black"
            >
              Seja um franqueado
            </a>
            <a
              href="#investimento"
              className="rounded-full border border-wire-line px-6 py-3 text-sm font-medium text-foreground"
            >
              Ver investimento
            </a>
          </div>
        </div>
        <ImagePlaceholder label="Totem / quiosque GRAVA.AI" className="h-64 md:h-80" />
      </section>

      {/* 2. O MERCADO MUDOU + PILARES -------------------------------------- */}
      <section className="mt-20 grid gap-10 md:grid-cols-2">
        <div>
          <SectionTag>O contexto</SectionTag>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            O mercado mudou.
            <br />E nossa marca acompanhou.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Hoje as pessoas buscam produtos exclusivos, experiências
            personalizadas e soluções rápidas. A IA está transformando como
            criamos, compramos e nos conectamos com as marcas.{" "}
            <span className="text-brand">É nesse cenário que nasce a GRAVA.AI.</span>
          </p>
        </div>
        <div className="grid gap-4">
          {PILARES.map((p, i) => (
            <div
              key={p.t}
              className="flex gap-4 rounded-2xl border border-wire-line bg-surface-2 p-5"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand/50 text-brand">
                ↘
              </div>
              <div>
                <h3 className="font-semibold">
                  <span className="mr-2 text-muted">{i + 1}.</span>
                  {p.t}
                </h3>
                <p className="mt-1 text-sm text-muted">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ONDE ATUAR ----------------------------------------------------- */}
      <section className="mt-20 grid gap-10 md:grid-cols-2">
        <ImagePlaceholder
          label="Foto do quiosque no shopping"
          className="order-2 h-64 md:order-1 md:h-full"
        />
        <div className="order-1 md:order-2">
          <SectionTag>Pontos de atuação</SectionTag>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Onde a <span className="text-brand">GRAVA.AI</span> pode atuar?
          </h2>
          <ul className="mt-6 space-y-3">
            {LOCAIS.map((l, i) => (
              <li
                key={l}
                className="flex items-center gap-4 rounded-2xl border border-wire-line bg-surface p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-wire-line text-brand">
                  {i + 1}
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            A lógica é a mesma: gente em movimento, em busca de algo especial — e
            a grava.ai pronta para transformar o momento em um produto com
            história.
          </p>
        </div>
      </section>

      {/* 4. INVESTIMENTO --------------------------------------------------- */}
      <section
        id="investimento"
        className="mt-20 rounded-3xl border border-wire-line bg-surface p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-wire-line pb-6">
          <div>
            <SectionTag>Modelo de franquia</SectionTag>
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Investimento inicial
            </h2>
          </div>
          <p className="text-4xl font-bold text-foreground sm:text-5xl">
            R$ 99.900<span className="text-2xl text-muted">,00</span>
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTIMENTO.map((item) => (
            <div
              key={item.t}
              className="rounded-2xl border border-wire-line bg-surface-2 p-5"
            >
              <h3 className="font-semibold">{item.t}</h3>
              <p className="mt-1 text-sm text-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DISTRIBUIÇÃO PRÓPRIA ------------------------------------------- */}
      <section className="relative mt-20 overflow-hidden rounded-3xl border border-wire-line bg-surface p-8">
        <Hexagon className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 text-brand/10" />
        <SectionTag>Operação</SectionTag>
        <h2 className="text-3xl font-semibold sm:text-4xl">Distribuição própria</h2>
        <p className="mt-2 text-muted">
          <span className="text-brand">Gestão inteligente</span>, do estoque à
          operação.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {DISTRIBUICAO.map((d) => (
            <div key={d.t} className="border-l-2 border-brand/40 pl-4">
              <h3 className="font-semibold text-brand">{d.t}</h3>
              <p className="mt-1 text-sm text-muted">{d.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ATÉ ONDE A IA AUXILIA ------------------------------------------ */}
      <section className="mt-20">
        <SectionTag>Tecnologia</SectionTag>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Até onde nossa <span className="text-brand">IA</span> nos auxilia?
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {IA.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-2xl border border-wire-line bg-surface p-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-wire-line text-lg text-muted">
                {i + 1}
              </span>
              <p className="text-sm text-foreground">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. CTA FINAL ------------------------------------------------------ */}
      <section
        id="cta"
        className="mt-20 grid gap-10 rounded-3xl border border-wire-line bg-surface p-10 md:grid-cols-2"
      >
        <div>
          <h2 className="text-4xl font-bold uppercase leading-tight">
            Seja um franqueado.
          </h2>
          <p className="mt-5 max-w-sm text-muted">
            Leve esta experiência para sua região e participe da próxima{" "}
            <span className="text-brand">evolução da personalização.</span>
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <p className="text-sm uppercase tracking-widest text-muted">
            Fale com um especialista:
          </p>
          <div className="flex items-center gap-3 border-b border-wire-line pb-4">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-brand text-brand">
              ✆
            </span>
            <span className="text-lg">(15) 99661-0916</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-brand text-brand">
              ◎
            </span>
            <span className="text-lg">@gravaaioficial</span>
          </div>
        </div>
      </section>

      <footer className="mt-16 flex items-center justify-between border-t border-wire-line pt-6 text-sm text-muted">
        <span className="font-bold text-brand">GRAVA.AI</span>
        <span>Wireframe • protótipo interno</span>
      </footer>
    </main>
  );
}
