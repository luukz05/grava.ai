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
import { IA_PRODUTO, LOCAIS, PASSOS } from "@/lib/site"

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
              A GRAVA.AI une Inteligência Artificial e personalização para criar
              produtos exclusivos na hora — onde tem gente em movimento em busca
              de algo especial.
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

          {/* Palco do produto — lineup direto sobre o fundo, estilo Apple */}
          <Reveal delay={320} className="relative mt-16 w-full max-w-4xl sm:mt-20">
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

      {/* ── SOBRE ────────────────────────────────────────────────────────── */}
      <section id="sobre">
        <Shell className="grid gap-y-10 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTag>Quem somos</SectionTag>
              <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                O mercado mudou. E nossa marca acompanhou.
              </h2>
            </Reveal>
          </div>

          <div className="space-y-5 text-lg text-muted">
            <Reveal delay={0}>
              <p className="text-pretty">
                Hoje as pessoas buscam produtos exclusivos, experiências
                personalizadas e soluções rápidas. A Inteligência Artificial está
                transformando como criamos, compramos e nos conectamos com as marcas.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-pretty">
                <span className="text-brand">É nesse cenário que nasce a GRAVA.AI:</span>{" "}
                uma marca que coloca o cliente no centro da criação e usa tecnologia
                para transformar cada momento em um produto que carrega uma história.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-pretty text-base text-muted/70">
                Uma empresa construída sobre três pilares: inovação no processo de
                personalização, experiência imersiva para o cliente e rentabilidade
                real para quem opera a franquia.
              </p>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── COMO FUNCIONA ────────────────────────────────────────────────── */}
      <section
        id="como-funciona"
      >
        <Shell className="py-24">
          <Reveal>
            <SectionTag>O produto</SectionTag>
            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Da ideia ao produto, em 3 passos.
            </h2>
          </Reveal>

          {/* Passos: ícone + rótulo de etapa (cards com seta de fluxo entre eles) */}
          <div className="mt-14 grid gap-8 md:grid-cols-3">
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
                  <h3 className="mt-5 text-xl font-semibold">{p.t}</h3>
                  <p className="mt-2 text-pretty text-muted">{p.d}</p>
                  {i < PASSOS.length - 1 && (
                    <ArrowIcon className="absolute -right-1 top-3 hidden text-brand/40 md:block" />
                  )}
                </Reveal>
              )
            })}
          </div>
        </Shell>
      </section>

      {/* ── IA ───────────────────────────────────────────────────────────── */}
      <section>
        <Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTag>Tecnologia</SectionTag>
              <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Movidos por{" "}
                <span className="text-brand">Inteligência Artificial.</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-muted">
                A IA é o coração da GRAVA.AI — da criação da arte à experiência do
                cliente no totem.
              </p>
            </Reveal>
          </div>

          {/* Lista com ícone em hexágono (sem numeração) */}
          <div className="space-y-4">
            {IA_PRODUTO.map((item, i) => {
              const Icon = FEATURE_ICONS[item.icon as FeatureIconName]
              return (
                <Reveal
                  key={item.t}
                  delay={i * 100}
                  className="flex items-start gap-5 rounded-2xl bg-surface-2/50 p-5 ring-1 ring-white/5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{item.t}</h3>
                    <p className="mt-1 text-pretty text-muted">{item.d}</p>
                  </div>
                </Reveal>
              )
            })}
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
              Conheça o modelo de franquia, o investimento e a operação completa.
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
