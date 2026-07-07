import type { Metadata } from "next"
import Link from "next/link"
import {
  Hexagon,
  ImagePlaceholder,
  Photo,
  SectionTag,
  Shell,
} from "@/components/wireframe"
import { HexMesh, Reveal, FloatingHex } from "@/components/motion"
import { AIOrchestrator } from "@/components/ia-orchestrator"
import { LeadForm } from "@/components/lead-form"
import { Faq } from "@/components/faq"
import {
  COMO_SER_FRANQUEADO,
  DEPOIMENTOS,
  DESTAQUES,
  DISTRIBUICAO,
  INCLUSO,
  INSTAGRAM_HANDLE,
  INVESTIMENTO,
  INVESTIMENTO_VALOR,
  LOCAIS,
  MERCADO,
  MODELOS,
  PILARES,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "Seja um Franqueado GRAVA.AI — Franquia de personalização com IA",
  description:
    "Tenha uma franquia de personalização de produtos com Inteligência Artificial. Operação enxuta, alta demanda e suporte total. Fale com um consultor.",
}

function AnchorCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#formulario"
      className="inline-block rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
    >
      {children}
    </a>
  )
}

function ModeloSection({
  m,
  i,
}: {
  m: (typeof MODELOS)[number]
  i: number
}) {
  const reverse = i % 2 === 1
  return (
    <section
      className={`border-t border-wire-line/50 ${i % 2 === 1 ? "bg-surface/40" : ""}`}
    >
      <Shell className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2" : ""} from={reverse ? "right" : "left"}>
          {m.img ? (
            <Photo
              src={m.img}
              alt={m.nome}
              fit={m.fit === "contain" ? "contain" : "cover"}
              className="h-64 w-full rounded-3xl lg:h-80"
            />
          ) : (
            <ImagePlaceholder label={m.placeholder} className="h-64 lg:h-80" />
          )}
        </Reveal>

        <Reveal delay={100} className={reverse ? "lg:order-1" : ""}>
          <span className="inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand">
            {m.tag}
          </span>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {m.nome}
          </h3>
          <p className="mt-4 max-w-md text-muted">{m.desc}</p>
          <ul className="mt-6 space-y-2">
            {m.destaques.map((d) => (
              <li key={d} className="flex items-center gap-3 text-sm text-foreground">
                <span className="text-brand">✓</span>
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AnchorCta>Quero este modelo</AnchorCta>
          </div>
        </Reveal>
      </Shell>
    </section>
  )
}

export default function SejaUmFranqueado() {
  return (
    <main className="w-full">

      {/* ── 1. HERO ────────────────────────────────────────────────────── */}
      <section className="brand-glow relative overflow-hidden">
        <HexMesh gradientPos="35% 30%" />

        {/* Hex decorativo — canto superior direito */}
        <FloatingHex
          size={420}
          delay={0.8}
          className="absolute -right-20 -top-20 text-brand"
        />

        <Shell className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <Reveal>
              <SectionTag>Franquia GRAVA.AI</SectionTag>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Tenha um negócio inovador de{" "}
                <span className="text-brand">personalização com IA.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-lg text-muted">
                Totens automatizados que criam produtos exclusivos na hora. Uma
                operação enxuta, movida por Inteligência Artificial — pronta para
                a sua região.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-7 space-y-2.5">
                {[
                  "Um mercado em alta, que valoriza o exclusivo",
                  "Operação simples, com estoque e treinamento inclusos",
                  "Suporte total da matriz, do estoque à operação",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-foreground">
                    <span className="text-brand">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brand ring-1 ring-brand transition-colors hover:bg-brand/10"
              >
                ✆ Receba a apresentação no WhatsApp
              </a>
            </Reveal>
          </div>

          <Reveal delay={150} from="right">
            <LeadForm
              variant="short"
              title="Fale com um especialista"
              subtitle="Descubra se o seu perfil combina com a franquia da GRAVA.AI."
              cta="Quero falar com um especialista"
            />
          </Reveal>
        </Shell>
      </section>

      {/* ── 2. DESTAQUES ───────────────────────────────────────────────── */}
      <section className="border-y border-wire-line/50 bg-surface">
        <Shell className="grid grid-cols-1 gap-y-6 divide-wire-line/60 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {DESTAQUES.map((s, i) => (
            <Reveal key={s.t} delay={i * 80} className="lg:px-6">
              <h3 className="font-semibold text-brand">{s.t}</h3>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </Reveal>
          ))}
        </Shell>
      </section>

      {/* ── 3. POR QUE SER FRANQUEADO ──────────────────────────────────── */}
      <section className="border-b border-wire-line/50">
        <Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTag>Por que ser um franqueado</SectionTag>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Um negócio inovador, com retorno rápido.
              </h2>
              <p className="mt-6 max-w-md text-muted">
                A GRAVA.AI une uma tendência de mercado em alta a uma operação
                enxuta e movida por IA. Três motivos para investir:
              </p>
              <p className="mt-6 text-sm text-muted">
                Onde você pode montar sua unidade:{" "}
                <span className="text-foreground">{LOCAIS.join(" · ")}.</span>
              </p>
              <div className="mt-8">
                <AnchorCta>Agende uma conversa sem compromisso</AnchorCta>
              </div>
            </Reveal>
          </div>

          <div className="divide-y divide-wire-line/60">
            {PILARES.map((p, i) => (
              <Reveal key={p.t} delay={i * 100} className="flex gap-6 py-6 first:pt-0">
                <span className="text-3xl font-semibold text-brand/70 tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{p.t}</h3>
                  <p className="mt-1.5 text-muted">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 3b. MODELOS DE LOJA ────────────────────────────────────────── */}
      <section className="border-b border-wire-line/50">
        <Shell className="pb-4 pt-20 text-center">
          <Reveal>
            <SectionTag>
              <span className="mx-auto">Modelos de franquia</span>
            </SectionTag>
            <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Escolha o modelo ideal para a sua região.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Três formatos pensados para diferentes pontos e perfis de investimento.
            </p>
          </Reveal>
        </Shell>
      </section>
      {MODELOS.map((m, i) => (
        <ModeloSection key={m.nome} m={m} i={i} />
      ))}

      {/* ── 4. COMO SE TORNAR FRANQUEADO ───────────────────────────────── */}
      <section
        id="como-funciona"
        className="scroll-mt-24 border-b border-wire-line/50 bg-surface/40"
      >
        <div className="grid items-stretch gap-y-10 lg:grid-cols-2">
          <Photo
            src="/shopping.jpg"
            alt="Quiosque GRAVA.AI em operação em um shopping"
            className="order-2 h-72 lg:order-1 lg:h-auto lg:min-h-[30rem] lg:rounded-none lg:rounded-r-3xl"
          />
          <div className="order-1 flex flex-col justify-center px-6 py-16 lg:order-2 lg:px-16">
            <Reveal>
              <SectionTag>Passo a passo</SectionTag>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Como se tornar um franqueado.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <ol className="mt-8 divide-y divide-wire-line/60">
                {COMO_SER_FRANQUEADO.map((p, i) => (
                  <li key={p.t} className="flex gap-5 py-5">
                    <span className="text-2xl font-semibold text-brand/70 tabular-nums">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{p.t}</h3>
                      <p className="mt-1 text-muted">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. O QUE VOCÊ RECEBE ───────────────────────────────────────── */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24">
          <Reveal className="max-w-2xl">
            <SectionTag>Modelo de franquia</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Você começa com tudo pronto para vender.
            </h2>
            <p className="mt-4 text-muted">
              Um pacote completo, pensado para você operar com segurança desde o
              primeiro dia — mesmo sem experiência.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSO.map((item, i) => (
              <Reveal key={item.t} delay={i * 70} className="border-b border-wire-line/60 py-6">
                <h3 className="text-lg font-semibold">{item.t}</h3>
                <p className="mt-1 text-muted">{item.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-10">
            <a
              href="#investimento"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Ver o investimento completo ↓
            </a>
          </Reveal>
        </Shell>
      </section>

      {/* ── 5b. LEAD MAGNET ────────────────────────────────────────────── */}
      <section className="border-b border-wire-line/50 bg-surface">
        <Shell className="flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-2xl text-brand">
              ⬇
            </span>
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-brand">
                Material gratuito
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Baixe o guia gratuito: Como funciona a franquia de personalização
                com IA da GRAVA.AI
              </h2>
              <p className="mt-2 text-muted">
                Entenda o modelo, a operação e a oportunidade — enviamos no seu
                WhatsApp, sem compromisso.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <a
              href="#formulario"
              className="shrink-0 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Baixar guia gratuito
            </a>
          </Reveal>
        </Shell>
      </section>

      {/* ── 6. DISTRIBUIÇÃO PRÓPRIA ────────────────────────────────────── */}
      <section className="brand-glow-left relative overflow-hidden border-b border-wire-line/50 bg-surface">
        <Hexagon className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 text-brand/10" />
        <FloatingHex
          size={280}
          delay={1}
          className="pointer-events-none absolute -right-14 top-12 text-brand opacity-20"
        />

        <Shell className="relative py-24">
          <Reveal>
            <SectionTag>Suporte da matriz</SectionTag>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Distribuição própria. Você não fica sozinho.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              <span className="text-brand">Gestão inteligente</span>, do estoque à
              operação.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {DISTRIBUICAO.map((d, i) => (
              <Reveal key={d.t} delay={i * 100} className="border-l-2 border-brand/40 pl-5">
                <h3 className="text-xl font-semibold text-brand">{d.t}</h3>
                <p className="mt-1.5 text-muted">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 7. IA NA OPERAÇÃO — diagrama de orquestração ───────────────── */}
      <section className="relative overflow-hidden border-b border-wire-line/50">
        {/* Hex mesh sutil de fundo */}
        <HexMesh className="opacity-40" gradientPos="50% 50%" />

        <Shell className="relative py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <SectionTag>
                <span className="mx-auto">Diferencial</span>
              </SectionTag>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                A <span className="text-brand">IA</span> no centro de tudo.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Do totem ao relatório, do estoque ao CRM — a inteligência artificial
                da GRAVA.AI integra e automatiza toda a operação da sua franquia em
                tempo real.
              </p>
            </Reveal>
          </div>

          {/* Diagrama */}
          <Reveal delay={120} className="mt-16 overflow-x-auto">
            <div className="min-w-[560px]">
              <AIOrchestrator />
            </div>
          </Reveal>

          {/* Legenda abaixo do diagrama */}
          <Reveal delay={240} className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <span className="flex items-center gap-2 text-xs text-muted">
              <span className="inline-block h-px w-6 border-t border-dashed border-white/25" />
              Dados que entram na IA
            </span>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span className="inline-block h-px w-6 border-t border-dashed border-brand/50" />
              Gestão automatizada pela IA
            </span>
          </Reveal>
        </Shell>
      </section>

      {/* ── 7b. INVESTIMENTO ───────────────────────────────────────────── */}
      <section
        id="investimento"
        className="scroll-mt-20 border-b border-wire-line/50 bg-surface"
      >
        <Shell className="py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-wire-line/60 pb-8">
            <Reveal>
              <SectionTag>Detalhamento da franquia</SectionTag>
              <h2 className="text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                Investimento inicial
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-5xl font-bold text-foreground sm:text-6xl">
                {INVESTIMENTO_VALOR.replace(",00", "")}
                <span className="text-2xl text-muted">,00</span>
              </p>
            </Reveal>
          </div>

          <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {INVESTIMENTO.map((item, i) => (
              <Reveal key={item.t} delay={i * 70} className="border-b border-wire-line/60 py-6">
                <h3 className="text-lg font-semibold">{item.t}</h3>
                <p className="mt-1 text-muted">{item.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-brand">
              Sem surpresas: estoque inicial e taxa de franqueado já inclusos.
            </p>
            <AnchorCta>Receba a apresentação completa</AnchorCta>
          </Reveal>
        </Shell>
      </section>

      {/* ── 8. DEPOIMENTOS ─────────────────────────────────────────────── */}
      <section className="border-b border-wire-line/50 bg-surface/40">
        <Shell className="py-24">
          <Reveal>
            <SectionTag>Prova social</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Quem já é GRAVA.AI.
            </h2>
            <p className="mt-2 text-xs text-muted">
              * Depoimentos ilustrativos — substituir por franqueados reais.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {DEPOIMENTOS.map((d, i) => (
              <Reveal key={d.nome} delay={i * 100}>
                <figure className="flex h-full flex-col">
                  <blockquote className="flex-1 text-lg leading-relaxed text-foreground">
                    "{d.texto}"
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-wire-line/60 pt-5">
                    <span className="h-10 w-10 rounded-full border border-dashed border-wire-line" />
                    <span>
                      <span className="block font-semibold">{d.nome}</span>
                      <span className="block text-xs text-muted">{d.cidade}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 9. OPORTUNIDADE DE MERCADO ─────────────────────────────────── */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24 text-center">
          <Reveal>
            <SectionTag>
              <span className="mx-auto">Oportunidade de mercado</span>
            </SectionTag>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              A personalização é uma das maiores tendências do varejo.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-wire-line/60">
            {MERCADO.map((m, i) => (
              <Reveal key={m.t} delay={i * 100} className="px-6">
                <h3 className="text-xl font-semibold text-brand">{m.t}</h3>
                <p className="mt-2 text-sm text-muted">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 10. FAQ ────────────────────────────────────────────────────── */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24">
          <Reveal>
            <SectionTag>Dúvidas</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Perguntas frequentes
            </h2>
          </Reveal>
          <Faq />
        </Shell>
      </section>

      {/* ── 11. URGÊNCIA ───────────────────────────────────────────────── */}
      <section className="border-b border-wire-line/50 bg-surface">
        <Shell className="py-6 text-center">
          <Reveal>
            <p className="text-foreground">
              <span className="font-semibold text-brand">
                Vagas limitadas por região.
              </span>{" "}
              Garanta a exclusividade da sua cidade.{" "}
              <span className="text-sm text-muted">
                * Claim ilustrativo — substituir por escassez real.
              </span>
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── 12. FORMULÁRIO FINAL ───────────────────────────────────────── */}
      <section id="formulario" className="brand-glow scroll-mt-24 relative overflow-hidden">
        <HexMesh gradientPos="60% 50%" className="opacity-60" />
        <Hexagon className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 text-brand/10" />

        <Shell className="relative grid gap-12 py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Agende uma conversa sem compromisso.
            </h2>
            <p className="mt-6 max-w-sm text-lg text-muted">
              Tire todas as suas dúvidas com um especialista e descubra se seu
              perfil combina com a franquia.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-b border-wire-line/60 pb-4 transition-colors hover:text-brand"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full text-brand ring-1 ring-brand">
                  ✆
                </span>
                <span>
                  <span className="block text-lg">{WHATSAPP_NUMBER}</span>
                  <span className="block text-xs text-muted">
                    Receba a apresentação completa no seu WhatsApp
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full text-brand ring-1 ring-brand">
                  ◎
                </span>
                <span className="text-lg">{INSTAGRAM_HANDLE}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm
              variant="full"
              title="Agende uma conversa sem compromisso"
              subtitle="Tire todas as suas dúvidas com um especialista."
              cta="Quero conversar sem compromisso"
            />
          </Reveal>
        </Shell>
      </section>

      <p className="border-t border-wire-line/50 py-6 text-center text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          ← Voltar ao site institucional
        </Link>
      </p>
    </main>
  )
}
