import Image from "next/image"
import Link from "next/link"
import { Hexagon, Photo, SectionTag, Shell } from "@/components/wireframe"
import { HexMesh, Reveal, FloatingHex } from "@/components/motion"
import { IA_PRODUTO, LOCAIS, PASSOS } from "@/lib/site"

export default function Home() {
  return (
    <main className="w-full">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="brand-glow relative min-h-[88vh] overflow-hidden">
        {/* Hex mesh background pulsing in brand color */}
        <HexMesh className="opacity-90" />

        {/* Large decorative hex — canto superior direito */}
        <FloatingHex
          size={480}
          delay={0.5}
          className="absolute -right-28 -top-28 text-brand"
        />

        <Shell className="relative grid min-h-[88vh] items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
          <div>
            <Reveal>
              <SectionTag>Personalização com IA</SectionTag>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-1 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Transformando ideias em{" "}
                <span className="text-brand">produtos personalizados.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-lg text-lg text-muted">
                A GRAVA.AI une Inteligência Artificial e personalização para criar
                produtos exclusivos na hora — onde tem gente em movimento em busca
                de algo especial.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#como-funciona"
                  className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                >
                  Conheça a GRAVA.AI
                </Link>
                <Link
                  href="/seja-um-franqueado"
                  className="rounded-full px-7 py-3.5 text-sm font-medium text-foreground ring-1 ring-wire-line transition-colors hover:ring-brand"
                >
                  Seja um franqueado
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} from="right" className="relative">
            <Photo
              src="/kiosk.png"
              alt="Quiosque de personalização GRAVA.AI"
              fit="contain"
              priority
              className="h-80 w-full lg:h-[40rem]"
            />
            {/* Hex decoration behind image */}
            <Hexagon className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 text-brand/20" />
          </Reveal>
        </Shell>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────────────────── */}
      <section id="sobre" className="scroll-mt-16 border-t border-wire-line/50">
        <Shell className="grid gap-y-10 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTag>Quem somos</SectionTag>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                O mercado mudou. E nossa marca acompanhou.
              </h2>
            </Reveal>
          </div>

          <div className="space-y-5 text-lg text-muted">
            <Reveal delay={0}>
              <p>
                Hoje as pessoas buscam produtos exclusivos, experiências
                personalizadas e soluções rápidas. A Inteligência Artificial está
                transformando como criamos, compramos e nos conectamos com as marcas.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                <span className="text-brand">É nesse cenário que nasce a GRAVA.AI:</span>{" "}
                uma marca que coloca o cliente no centro da criação e usa tecnologia
                para transformar cada momento em um produto que carrega uma história.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-base text-muted/70">
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
        className="scroll-mt-24 border-t border-wire-line/50 bg-surface/40"
      >
        <Shell className="py-24">
          <Reveal>
            <SectionTag>O produto</SectionTag>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Da ideia ao produto, em 3 passos.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3 md:divide-x md:divide-wire-line/60">
            {PASSOS.map((p, i) => (
              <Reveal key={p.t} delay={i * 120} className="md:px-8 md:first:pl-0">
                <span className="text-5xl font-semibold text-brand/40">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── IA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-wire-line/50">
        <Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTag>Tecnologia</SectionTag>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Movidos por{" "}
                <span className="text-brand">Inteligência Artificial.</span>
              </h2>
              <p className="mt-6 max-w-md text-muted">
                A IA é o coração da GRAVA.AI — da criação da arte à experiência do
                cliente no totem.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-wire-line/60">
            {IA_PRODUTO.map((item, i) => (
              <Reveal key={item.t} delay={i * 100} className="flex gap-6 py-6 first:pt-0">
                <span className="text-3xl font-semibold text-brand/70 tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{item.t}</h3>
                  <p className="mt-1.5 text-muted">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── ONDE ATUAMOS ─────────────────────────────────────────────────── */}
      <section
        id="onde-atuamos"
        className="scroll-mt-16 border-t border-wire-line/50 bg-surface/40"
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
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Onde a <span className="text-brand">GRAVA.AI</span> pode estar?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 divide-y divide-wire-line/60">
                {LOCAIS.map((l, i) => (
                  <li key={l} className="flex items-center gap-5 py-4">
                    <span className="text-2xl font-semibold text-brand/70 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-lg">{l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA FRANQUIA ─────────────────────────────────────────────────── */}
      <section className="brand-glow-left relative overflow-hidden border-y border-wire-line/50 bg-surface">
        {/* Hex decorativo — canto direito */}
        <Hexagon className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 text-brand/15" />
        <Image
          src="/arrow.png"
          alt=""
          width={1000}
          height={749}
          aria-hidden
          className="pointer-events-none absolute -right-10 top-1/2 hidden w-[24rem] -translate-y-1/2 opacity-10 lg:block"
        />

        <Shell className="relative flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl">
            <SectionTag>Faça parte</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Leve a GRAVA.AI para a sua região.
            </h2>
            <p className="mt-4 text-muted">
              Conheça o modelo de franquia, o investimento e a operação completa.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <Link
              href="/seja-um-franqueado"
              className="shrink-0 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Seja um franqueado
            </Link>
          </Reveal>
        </Shell>
      </section>
    </main>
  )
}
