import Link from "next/link"
import { FaRegClock, FaWandMagicSparkles } from "react-icons/fa6"
import {
  ArrowIcon,
  BTN_PRIMARY,
  Hexagon,
  Photo,
  SectionTag,
  Shell,
} from "@/components/wireframe"
import { HexMesh, Reveal, FloatingHex } from "@/components/motion"
import { ProductShowcase } from "@/components/product-showcase"
import { TOTEM_MOCKS } from "@/components/totem-mockups"
import { ShelfContrast } from "@/components/shelf-contrast"
import { FEATURE_ICONS, type FeatureIconName } from "@/components/icons"
import { FORCAS, PASSOS, PONTOS } from "@/lib/site"

/**
 * Célula do quadro de pontos. No desktop as colunas já são rotuladas no
 * cabeçalho; no mobile a linha vira ficha e cada célula carrega o próprio rótulo.
 */
function Campo({
  label,
  className = "",
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted lg:hidden">
        {label}
      </span>
      <span className="mt-1.5 block lg:mt-0">{children}</span>
    </div>
  )
}

export default function Home() {
  return (
    <main className="w-full">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      {/* Minimalista, centrado (estilo Apple): tipografia faz o anúncio, o
          produto entra num palco de vidro logo abaixo. O favo respira atrás. */}
      <section className="relative overflow-hidden">
        {/* Hex mesh background pulsing in brand color */}
        <HexMesh className="opacity-90" gradientPos="50% 25%" />

        {/* Hexágonos decorativos flutuando nas bordas */}
        <FloatingHex
          size={420}
          delay={0.5}
          className="absolute -right-24 -top-24 text-brand opacity-70"
        />
        <FloatingHex
          size={280}
          delay={2.2}
          className="absolute -left-20 top-1/3 text-brand opacity-40"
        />

        <Shell className="relative flex flex-col items-center pb-24 pt-20 text-center sm:pt-24">
          <Reveal>
            <p className="text-sm font-medium text-brand">Personalização com IA</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Transformando ideias em{" "}
              <span className="text-brand">produtos personalizados.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted">
              A GRAVA.AI une Inteligência Artificial e personalização para criar{" "}
              <strong className="font-semibold text-foreground">produtos exclusivos na hora</strong>{" "}
              — onde tem gente em movimento em busca de algo especial.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link href="#como-funciona" className={BTN_PRIMARY}>
                Conheça a GRAVA.AI
              </Link>
              <Link
                href="/seja-um-franqueado"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-300"
              >
                Seja um franqueado <ArrowIcon />
              </Link>
            </div>
          </Reveal>

          {/* Palco do produto — nasce por escala (o produto "acende" no lugar) */}
          <Reveal delay={320} from="scale" className="relative mt-16 w-full max-w-4xl sm:mt-20">
            {/* Glow que "acende" os produtos por baixo */}
            <div
              aria-hidden
              className="absolute inset-x-16 bottom-24 h-40 rounded-full bg-brand/15 blur-3xl"
            />

            {/* Lineup de produtos gravados ciclando (estilo vitrine Apple) */}
            <div className="relative">
              <ProductShowcase />
            </div>

            {/* Chips de vidro flutuando ao redor do produto */}
            <div
              className="float-gentle glass absolute -left-4 top-14 hidden items-center gap-2.5 rounded-full py-2.5 pl-2.5 pr-5 ring-1 ring-white/10 backdrop-blur-xl md:flex lg:-left-16"
              style={{ animationDelay: "0.8s" }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-brand/15 text-brand">
                <FaWandMagicSparkles className="size-3.5" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold">Arte com IA</span>
                <span className="block text-xs text-muted">criada em segundos</span>
              </span>
            </div>

            <div
              className="float-gentle glass absolute -right-4 top-1/3 hidden items-center gap-2.5 rounded-full py-2.5 pl-2.5 pr-5 ring-1 ring-white/10 backdrop-blur-xl md:flex lg:-right-16"
              style={{ animationDelay: "2.4s" }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-brand/15 text-brand">
                <FaRegClock className="size-3.5" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold">Gravação na hora</span>
                <span className="block text-xs text-muted">do toque à entrega</span>
              </span>
            </div>

            <div
              className="float-gentle glass absolute -left-2 bottom-36 hidden items-center gap-2.5 rounded-full py-2.5 pl-2.5 pr-5 ring-1 ring-white/10 backdrop-blur-xl md:flex lg:-left-10"
              style={{ animationDelay: "4s" }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-brand/15 text-brand">
                <Hexagon className="size-4" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold">Cada peça, única</span>
                <span className="block text-xs text-muted">exclusiva de quem cria</span>
              </span>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── QUEM SOMOS (por que existe) ───────────────────────────────────── */}
      {/* Tese + as 3 forças de mercado que, somadas, originam a GRAVA.AI.
          Cards com glow de canto que intensifica no hover + lift (auditoria §3.5):
          profundidade por hairline e brilho desfocado, nunca por sombra pesada. */}
      <section id="sobre">
        <Shell className="flex flex-col gap-12 py-24">
          <Reveal className="max-w-3xl">
            <SectionTag>Quem somos</SectionTag>
            <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              O varejo mudou. A <span className="text-brand">GRAVA.AI</span> nasceu
              para liderar essa nova forma de comprar.
            </h2>
            <p className="mt-6 text-pretty text-base/7 text-muted">
              Hoje as pessoas querem{" "}
              <strong className="font-semibold text-foreground">produtos únicos</strong>,
              feitos na hora e do jeito delas — e três forças tornaram isso possível ao
              mesmo tempo.
            </p>
          </Reveal>

          {/* A tese MOSTRADA: a prateleira antiga ao lado da prateleira GRAVA.AI */}
          <ShelfContrast />

          {/* As três forças — banda de réguas hairline (o gap-px vira a linha) */}
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
            {FORCAS.map((f, i) => {
              const Icon = FEATURE_ICONS[f.icon as FeatureIconName]
              return (
                <Reveal
                  key={f.t}
                  delay={i * 90}
                  className="flex gap-4 bg-background p-6"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{f.t}</span>
                    <span className="mt-1 block text-pretty text-xs/5 text-muted">
                      {f.d}
                    </span>
                  </span>
                </Reveal>
              )
            })}
          </div>

          {/* A soma das três — a conclusão, em contraste alto */}
          <Reveal from="scale">
            <p className="max-w-3xl text-pretty text-lg leading-8">
              A <span className="font-semibold text-brand">GRAVA.AI</span> une essas três
              forças num só lugar: personalização com IA, gravada na hora, onde o cliente
              já está — e cada peça carrega uma história.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── O PRODUTO (como funciona) ─────────────────────────────────────── */}
      {/* Cada passo é um card-moldura (tinta de 2,5% + p-2) com o texto de um lado
          e a TELA DO TOTEM do outro — mockup em HTML/SVG, nunca screenshot
          (auditoria §3.6 e §4). Os lados alternam via `group-even`, sem JS. */}
      <section id="como-funciona" className="scroll-mt-24">
        <Shell className="flex flex-col gap-12 pb-24">
          <Reveal className="max-w-2xl">
            <SectionTag>O produto</SectionTag>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              E é assim que ela transforma a ideia em produto — em 3 passos.
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {PASSOS.map((p, i) => {
              const Icon = FEATURE_ICONS[p.icon as FeatureIconName]
              const Mock = TOTEM_MOCKS[i]
              return (
                <Reveal key={p.t} delay={i * 80} className="group">
                  <article className="grid gap-2 rounded-3xl bg-white/[0.025] p-2 ring-1 ring-white/5 lg:grid-cols-2">
                    <div className="flex flex-col justify-center gap-4 p-6 sm:p-10 lg:col-start-1 lg:row-start-1 lg:group-even:col-start-2">
                      <div className="flex items-center gap-3">
                        <span className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                          Passo {i + 1}
                        </span>
                      </div>
                      <h3 className="text-balance text-2xl font-semibold">{p.t}</h3>
                      <p className="text-pretty text-muted">{p.d}</p>
                    </div>

                    {/* Painel de marca com ruído; a tela do totem flutua nele.
                        Coluna E linha explícitas nos dois lados: item com linha
                        definida é posicionado antes dos automáticos, e sem isso o
                        mockup roubava a coluna 1 em todas as faixas. */}
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-700/45 to-brand-500/15 p-5 sm:p-8 lg:col-start-2 lg:row-start-1 lg:group-even:col-start-1">
                      <span
                        aria-hidden
                        className="noise-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                      />
                      <div className="relative">
                        <Mock />
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Shell>
      </section>

      {/* ── ONDE ATUAMOS ─────────────────────────────────────────────────── */}
      {/* Antes eram três chips com o NOME do lugar — e nada mais. Agora cada
          ponto diz o que interessa a quem vai operar: o formato de unidade que
          cabe ali, quem circula e por que essa pessoa compra. */}
      <section id="onde-atuamos" className="relative">
        {/* A unidade real em operação, com a pergunta por cima */}
        <div className="relative">
          <Photo
            src="/shopping.jpg"
            alt="Quiosque GRAVA.AI em operação num shopping"
            className="h-80 w-full lg:h-[26rem]"
            priority
          />
          {/* Escurece a foto o bastante para o texto ler, e a dissolve no preto.
              No mobile o texto ocupa a largura toda e invade a parte clara da
              foto — daí o véu extra, que some no desktop. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-background/55 lg:hidden"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/20"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-background to-transparent"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-background"
          />

          <Shell className="absolute inset-0 flex flex-col justify-center">
            <Reveal className="max-w-xl">
              <SectionTag>Onde atuamos</SectionTag>
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Onde a <span className="text-brand">GRAVA.AI</span> pode estar?
              </h2>
              <p className="mt-4 text-pretty text-base/7 text-muted">
                Onde tem gente em movimento. Cada ponto tem um público, um momento de
                compra — e um{" "}
                <strong className="font-semibold text-foreground">
                  formato de unidade
                </strong>{" "}
                que cabe nele.
              </p>
            </Reveal>
          </Shell>
        </div>

        {/* O quadro de pontos — colunas rotuladas no desktop, fichas no mobile */}
        <Shell className="pb-24 pt-10">
          <div className="hidden grid-cols-12 gap-6 border-b border-white/10 pb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted lg:grid">
            <span className="col-span-4">O ponto</span>
            <span className="col-span-2">Formato</span>
            <span className="col-span-3">Quem passa por ali</span>
            <span className="col-span-3">A compra é</span>
          </div>

          <div className="divide-y divide-white/10">
            {PONTOS.map((p, i) => {
              const Icon = FEATURE_ICONS[p.icon as FeatureIconName]
              return (
                <Reveal
                  key={p.local}
                  delay={i * 90}
                  className="grid gap-4 py-6 lg:grid-cols-12 lg:items-center lg:gap-6"
                >
                  <div className="flex items-center gap-3 lg:col-span-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="font-semibold">{p.local}</span>
                  </div>

                  <Campo label="Formato" className="lg:col-span-2">
                    <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-sm text-brand ring-1 ring-brand/25">
                      {p.formato}
                    </span>
                  </Campo>

                  <Campo label="Quem passa por ali" className="lg:col-span-3">
                    <span className="text-pretty text-sm/6 text-muted">{p.publico}</span>
                  </Campo>

                  <Campo label="A compra é" className="lg:col-span-3">
                    <span className="text-pretty text-sm/6 text-muted">{p.compra}</span>
                  </Campo>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={280}>
            <Link
              href="/seja-um-franqueado"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-300"
            >
              Veja os formatos de unidade por dentro <ArrowIcon />
            </Link>
          </Reveal>
        </Shell>
      </section>

      {/* ── CTA FRANQUIA ─────────────────────────────────────────────────── */}
      <section className="brand-glow-left relative overflow-hidden">
        {/* Hex decorativo — canto direito */}
        <Hexagon className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 text-brand/15" />

        <Shell className="relative flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl">
            <SectionTag>Faça parte</SectionTag>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Leve a GRAVA.AI para a sua região.
            </h2>
            <p className="mt-4 text-pretty text-muted">
              Conheça o{" "}
              <strong className="font-semibold text-foreground">modelo de franquia</strong>,
              o investimento e a operação completa.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <Link href="/seja-um-franqueado" className={BTN_PRIMARY}>
              Seja um franqueado <ArrowIcon />
            </Link>
          </Reveal>
        </Shell>
      </section>
    </main>
  )
}
