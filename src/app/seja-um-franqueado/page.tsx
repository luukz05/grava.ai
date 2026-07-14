import type { Metadata } from "next"
import Link from "next/link"
import {
  FaArrowDown,
  FaArrowLeftLong,
  FaCheck,
  FaDownload,
} from "react-icons/fa6"
import {
  FEATURE_ICONS,
  InstagramIcon,
  WhatsAppIcon,
  type FeatureIconName,
} from "@/components/icons"
import {
  ArrowIcon,
  BTN_OUTLINE_BRAND,
  BTN_PRIMARY,
  Hexagon,
  Photo,
  SectionTag,
  Shell,
} from "@/components/wireframe"
import { HexMesh, Reveal, FloatingHex } from "@/components/motion"
import { AIOrchestrator } from "@/components/ia-orchestrator"
import { ProductModels } from "@/components/product-models"
import { LeadForm } from "@/components/lead-form"
import { Faq } from "@/components/faq"
import {
  COMO_SER_FRANQUEADO,
  DEPOIMENTOS,
  DESTAQUES,
  DISTRIBUICAO,
  IA_CLIENTE,
  INCLUSO,
  INSTAGRAM_HANDLE,
  INVESTIMENTO,
  INVESTIMENTO_VALOR,
  LOCAIS,
  MERCADO,
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
    <a href="#formulario" className={BTN_PRIMARY}>
      {children} <ArrowIcon />
    </a>
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
              <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Tenha um negócio inovador de{" "}
                <span className="text-brand">personalização com IA.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-pretty text-lg text-muted">
                Totens automatizados que criam{" "}
                <strong className="font-semibold text-foreground">produtos exclusivos na hora</strong>.
                Uma <strong className="font-semibold text-foreground">operação enxuta</strong>,
                movida por Inteligência Artificial — pronta para a sua região.
              </p>
            </Reveal>

            <ul className="mt-7 space-y-2.5">
              {[
                "Um mercado em alta, que valoriza o exclusivo",
                "Operação simples, com estoque e treinamento inclusos",
                "Suporte total da matriz, do estoque à operação",
              ].map((b, i) => (
                <li
                  key={b}
                  style={{ animationDelay: `${240 + i * 80}ms` }}
                  className="flex items-center gap-3 text-foreground animate-fade-in-up opacity-0 [animation-fill-mode:forwards] motion-reduce:animate-none motion-reduce:opacity-100"
                >
                  <FaCheck className="size-3.5 shrink-0 text-brand" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <Reveal delay={320}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 ${BTN_OUTLINE_BRAND}`}
              >
                <WhatsAppIcon className="size-4" aria-hidden /> Receba a
                apresentação no WhatsApp
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
      <section>
        <Shell className="grid grid-cols-1 gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {DESTAQUES.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-surface-2/70 p-6 ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-brand/10 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <h3 className="relative font-semibold text-brand">{s.t}</h3>
                <p className="relative mt-1 text-pretty text-sm text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </Shell>
      </section>

      {/* ── 3. POR QUE SER FRANQUEADO ──────────────────────────────────── */}
      <section id="por-que">
        <Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionTag>Por que ser um franqueado</SectionTag>
              <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Um negócio inovador, com retorno rápido.
              </h2>
              <p className="mt-6 max-w-md text-pretty text-muted">
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

          {/* Pilares: ícone em destaque + título + texto (sem numeração) */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
            {PILARES.map((p, i) => {
              const Icon = FEATURE_ICONS[p.icon as FeatureIconName]
              return (
                <Reveal key={p.t} delay={i * 100}>
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand/15 text-2xl text-brand">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{p.t}</h3>
                  <p className="mt-1.5 max-w-sm text-pretty text-muted">{p.d}</p>
                </Reveal>
              )
            })}
          </div>
        </Shell>
      </section>

      {/* ── 3b. MODELOS DE LOJA (acordeão full-bleed) ──────────────────── */}
      <section id="modelos" className="py-24">
        <Shell>
          <Reveal className="text-center">
            <SectionTag>
              <span className="mx-auto">Modelos de franquia</span>
            </SectionTag>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Escolha o modelo ideal para a sua região.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted">
              Três formatos pensados para diferentes pontos e perfis de investimento.
            </p>
          </Reveal>
        </Shell>

        {/* Sai do Shell: ocupa a largura toda até as laterais da página */}
        <Reveal delay={100} className="mt-12 px-4 md:px-6">
          <ProductModels />
        </Reveal>
      </section>

      {/* ── 4. COMO SE TORNAR FRANQUEADO ───────────────────────────────── */}
      <section
        id="como-funciona"
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
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Como se tornar um franqueado.
              </h2>
            </Reveal>
            {/* Timeline vertical: linha conectora + marcos com ícone */}
            <Reveal delay={80}>
              <ol className="relative mt-8 space-y-6 before:absolute before:bottom-3 before:left-[1.375rem] before:top-3 before:w-px before:bg-wire-line/70">
                {COMO_SER_FRANQUEADO.map((p) => {
                  const Icon = FEATURE_ICONS[p.icon as FeatureIconName]
                  return (
                    <li key={p.t} className="relative flex gap-5">
                      <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand ring-4 ring-background">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <div className="pt-1.5">
                        <h3 className="text-lg font-semibold">{p.t}</h3>
                        <p className="mt-1 text-pretty text-muted">{p.d}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. O QUE VOCÊ RECEBE ───────────────────────────────────────── */}
      <section>
        <Shell className="py-24">
          <Reveal className="max-w-2xl">
            <SectionTag>Modelo de franquia</SectionTag>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Você começa com tudo pronto para vender.
            </h2>
            <p className="mt-4 text-pretty text-muted">
              Um <strong className="font-semibold text-foreground">pacote completo</strong>,
              pensado para você operar com segurança desde o primeiro dia —{" "}
              <strong className="font-semibold text-foreground">mesmo sem experiência</strong>.
            </p>
          </Reveal>

          {/* Grid de cards com ícone (sem numeração) */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSO.map((item, i) => {
              const Icon = FEATURE_ICONS[item.icon as FeatureIconName]
              return (
                <Reveal
                  key={item.t}
                  delay={i * 70}
                  className="rounded-2xl bg-surface-2/50 p-6 ring-1 ring-white/5"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-brand/15 text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.t}</h3>
                  <p className="mt-1 text-pretty text-muted">{item.d}</p>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={400} className="mt-10">
            <a
              href="#investimento"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Ver o investimento completo <FaArrowDown className="size-3" aria-hidden />
            </a>
          </Reveal>
        </Shell>
      </section>

      {/* ── 5b. LEAD MAGNET ────────────────────────────────────────────── */}
      <section>
        <Shell className="flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
              <FaDownload className="size-5" aria-hidden />
            </span>
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-brand">
                Material gratuito
              </span>
              <h2 className="mt-1 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Baixe o guia gratuito: Como funciona a franquia de personalização
                com IA da GRAVA.AI
              </h2>
              <p className="mt-2 text-pretty text-muted">
                Entenda o modelo, a operação e a oportunidade — enviamos no seu
                WhatsApp, sem compromisso.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <a href="#formulario" className={BTN_PRIMARY}>
              Baixar guia gratuito <ArrowIcon />
            </a>
          </Reveal>
        </Shell>
      </section>

      {/* ── 6. DISTRIBUIÇÃO PRÓPRIA ────────────────────────────────────── */}
      <section className="brand-glow-left relative overflow-hidden">
        <Hexagon className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 text-brand/10" />
        <FloatingHex
          size={280}
          delay={1}
          className="pointer-events-none absolute -right-14 top-12 text-brand opacity-20"
        />

        <Shell className="relative py-24">
          <Reveal>
            <SectionTag>Suporte da matriz</SectionTag>
            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Distribuição própria. Você não fica sozinho.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-muted">
              <span className="text-brand">Gestão inteligente</span>, do estoque à
              operação.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {DISTRIBUICAO.map((d, i) => (
              <Reveal key={d.t} delay={i * 100} className="border-l-2 border-brand/40 pl-5">
                <h3 className="text-xl font-semibold text-brand">{d.t}</h3>
                <p className="mt-1.5 text-pretty text-muted">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 7. IA NA OPERAÇÃO — diagrama de orquestração ───────────────── */}
      <section className="relative overflow-hidden">
        {/* Hex mesh sutil de fundo */}
        <HexMesh className="opacity-40" gradientPos="50% 50%" />

        <Shell className="relative py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <SectionTag>
                <span className="mx-auto">Diferencial</span>
              </SectionTag>
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                A <span className="text-brand">IA</span> no centro de tudo.
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted">
                Do totem ao relatório, do estoque ao CRM — a inteligência artificial
                da GRAVA.AI integra e automatiza toda a operação da sua franquia em
                tempo real.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Diagrama radial: 6 pilares da operação nas pontas do hexágono */}
            <div className="overflow-x-auto">
              <div className="min-w-[640px] px-2 pb-2">
                <AIOrchestrator />
              </div>
            </div>

            {/* O que cada pilar significa para o cliente da unidade */}
            <Reveal from="right" delay={150}>
              <SectionTag>Na prática</SectionTag>
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                O que isso significa para o{" "}
                <span className="text-brand">cliente da sua unidade.</span>
              </h3>
              <ul className="mt-7 divide-y divide-wire-line/60">
                {IA_CLIENTE.map((item) => (
                  <li key={item.t} className="flex items-start gap-4 py-3.5">
                    <Hexagon className="mt-1 h-4 w-4 shrink-0 text-brand/70" />
                    <div>
                      <h4 className="font-semibold">{item.t}</h4>
                      <p className="mt-0.5 text-pretty text-sm text-muted">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── 7b. INVESTIMENTO ───────────────────────────────────────────── */}
      <section
        id="investimento"
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
              <p className="bg-gradient-to-br from-brand-300 to-brand-600 bg-clip-text text-5xl font-bold tabular-nums text-transparent sm:text-6xl">
                {INVESTIMENTO_VALOR.replace(",00", "")}
                <span className="text-2xl">,00</span>
              </p>
            </Reveal>
          </div>

          <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {INVESTIMENTO.map((item, i) => (
              <Reveal key={item.t} delay={i * 70} className="border-b border-wire-line/60 py-6">
                <h3 className="text-lg font-semibold">{item.t}</h3>
                <p className="mt-1 text-pretty text-muted">{item.d}</p>
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
      <section>
        <Shell className="py-24">
          <Reveal>
            <SectionTag>Prova social</SectionTag>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
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
                  <blockquote className="flex-1 text-pretty text-lg leading-relaxed text-foreground">
                    &ldquo;{d.texto}&rdquo;
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
      <section>
        <Shell className="py-24 text-center">
          <Reveal>
            <SectionTag>
              <span className="mx-auto">Oportunidade de mercado</span>
            </SectionTag>
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              A personalização é uma das maiores tendências do varejo.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-wire-line/60">
            {MERCADO.map((m, i) => (
              <Reveal key={m.t} delay={i * 100} className="px-6">
                <h3 className="text-xl font-semibold text-brand">{m.t}</h3>
                <p className="mt-2 text-pretty text-sm text-muted">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 10. FAQ ────────────────────────────────────────────────────── */}
      <section id="duvidas">
        <Shell className="py-24">
          <Reveal>
            <SectionTag>Dúvidas</SectionTag>
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Perguntas frequentes
            </h2>
          </Reveal>
          <Faq />
        </Shell>
      </section>

      {/* ── 11. URGÊNCIA ───────────────────────────────────────────────── */}
      <section>
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
      <section id="formulario" className="brand-glow relative overflow-hidden">
        <HexMesh gradientPos="60% 50%" className="opacity-60" />
        <Hexagon className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 text-brand/10" />

        <Shell className="relative grid gap-12 py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-balance text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Agende uma conversa sem compromisso.
            </h2>
            <p className="mt-6 max-w-sm text-pretty text-lg text-muted">
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
                  <WhatsAppIcon className="size-4" aria-hidden />
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
                  <InstagramIcon className="size-4" aria-hidden />
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

      <Reveal>
        <p className="py-6 text-center text-xs text-muted">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-brand">
            <FaArrowLeftLong className="size-3" aria-hidden /> Voltar ao site
            institucional
          </Link>
        </p>
      </Reveal>
    </main>
  )
}
