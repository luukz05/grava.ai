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
import { FEATURE_ICONS, type FeatureIconName } from "@/components/icons"
import { FORCAS, LOCAIS, PASSOS } from "@/lib/site"

// Ícones dos locais de atuação (mapeados por índice de LOCAIS)
const LOCAL_ICONS: FeatureIconName[] = ["bag", "cart", "plane"]

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

      {/* ── QUEM SOMOS + O PRODUTO (faixas horizontais) ──────────────────── */}
      {/* Equação de mercado (3 forças = GRAVA.AI) que, logo abaixo, deriva a
          ideia em produto nos mesmos 3 passos. Duas faixas sob um header. */}
      <section id="sobre">
        <Shell className="flex flex-col gap-16 py-24">
          {/* Quem somos — a equação de mercado: 3 forças que, somadas, dão a GRAVA.AI */}
          <div>
            <Reveal className="max-w-3xl">
              <SectionTag>Quem somos</SectionTag>
              <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                O varejo mudou. A <span className="text-brand">GRAVA.AI</span> nasceu
                para liderar essa nova forma de comprar.
              </h2>
              <p className="mt-6 text-pretty text-base/7 text-muted">
                Hoje as pessoas querem{" "}
                <strong className="font-semibold text-foreground">produtos únicos</strong>,
                feitos na hora e do jeito delas — e três forças tornaram isso possível
                ao mesmo tempo.
              </p>
            </Reveal>

            {/* As 3 forças somadas: o "+" mora no gap, como a seta entre os passos */}
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {FORCAS.map((f, i) => {
                const Icon = FEATURE_ICONS[f.icon as FeatureIconName]
                return (
                  <Reveal key={f.t} delay={i * 120} className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{f.t}</h3>
                    <p className="mt-2 text-pretty text-muted">{f.d}</p>
                    {i < FORCAS.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -right-1 top-3 hidden text-xl font-medium leading-none text-brand/40 md:block"
                      >
                        +
                      </span>
                    )}
                  </Reveal>
                )
              })}
            </div>

            {/* O resultado da soma — nasce por escala (a marca "acende" no lugar) */}
            <Reveal delay={360} from="scale" className="mt-12">
              <div className="flex items-start gap-4 border-t border-white/10 pt-8">
                <span aria-hidden className="text-xl font-medium leading-7 text-brand/50">
                  =
                </span>
                <p className="max-w-3xl text-pretty text-base/7 text-muted">
                  A <strong className="font-semibold text-foreground">GRAVA.AI</strong> une
                  essas três forças num só lugar: personalização com IA, gravada na hora,
                  onde o cliente já está — e cada peça carrega uma história.
                </p>
              </div>
            </Reveal>
          </div>

          {/* O produto — a GRAVA.AI transforma a ideia em produto nos 3 passos */}
          <div id="como-funciona" className="scroll-mt-24">
            <Reveal className="max-w-2xl">
              <SectionTag>O produto</SectionTag>
              <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                E é assim que ela transforma a ideia em produto — em 3 passos.
              </h3>
            </Reveal>

            {/* Passos: ícone + rótulo de etapa (cards com seta de fluxo entre eles) */}
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {PASSOS.map((p, i) => {
                const Icon = FEATURE_ICONS[p.icon as FeatureIconName]
                return (
                  <Reveal key={p.t} delay={i * 120} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                        Passo {i + 1}
                      </span>
                    </div>
                    <h4 className="mt-5 text-xl font-semibold">{p.t}</h4>
                    <p className="mt-2 text-pretty text-muted">{p.d}</p>
                    {i < PASSOS.length - 1 && (
                      <ArrowIcon className="absolute -right-1 top-3 hidden text-brand/40 md:block" />
                    )}
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Shell>
      </section>

      {/* ── ONDE ATUAMOS ─────────────────────────────────────────────────── */}
      <section
        id="onde-atuamos"
      >
        <div className="grid items-stretch gap-y-10 lg:grid-cols-2">
          <Photo
            src="/shopping.jpg"
            alt="Quiosque GRAVA.AI em um shopping"
            className="order-2 h-72 lg:order-1 lg:h-auto lg:min-h-[26rem] lg:rounded-none lg:rounded-r-3xl"
          />
          <div className="order-1 flex flex-col justify-center px-6 py-16 lg:order-2 lg:px-16">
            <Reveal>
              <SectionTag>Onde atuamos</SectionTag>
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Onde a <span className="text-brand">GRAVA.AI</span> pode estar?
              </h2>
            </Reveal>
            {/* Chips com ícone do tipo de ponto (sem numeração) */}
            <Reveal delay={100}>
              <div className="mt-8 flex flex-wrap gap-3">
                {LOCAIS.map((l, i) => {
                  const Icon = FEATURE_ICONS[LOCAL_ICONS[i]]
                  return (
                    <span
                      key={l}
                      className="inline-flex items-center gap-2.5 rounded-full bg-surface-2/70 px-4 py-2.5 text-sm ring-1 ring-white/10"
                    >
                      <Icon className="size-4 shrink-0 text-brand" aria-hidden />
                      {l}
                    </span>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
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
