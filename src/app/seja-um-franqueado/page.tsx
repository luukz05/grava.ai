/**
 * /seja-um-franqueado — Landing Page de conversão (funil AIDA numa página).
 * Layout moderno/integrado: faixas full-bleed, sem compartimentar em caixas.
 * Hierarquia em docs/ia-spec.md. [REAL] / [PLACEHOLDER] a substituir.
 */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Hexagon,
  ImagePlaceholder,
  Photo,
  SectionTag,
  Shell,
} from "@/components/wireframe";
import { LeadForm } from "@/components/lead-form";
import { Faq } from "@/components/faq";
import {
  COMO_SER_FRANQUEADO,
  DEPOIMENTOS,
  DESTAQUES,
  DISTRIBUICAO,
  IA_OPERACAO,
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
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Seja um Franqueado GRAVA.AI — Franquia de personalização com IA",
  description:
    "Tenha uma franquia de personalização de produtos com Inteligência Artificial. Operação enxuta, alta demanda e suporte total. Fale com um consultor.",
};

function AnchorCta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#formulario"
      className="inline-block rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black"
    >
      {children}
    </a>
  );
}

// Seção de CTA horizontal para um modelo de loja (imagem alterna de lado).
function ModeloSection({
  m,
  i,
}: {
  m: (typeof MODELOS)[number];
  i: number;
}) {
  const reverse = i % 2 === 1;
  return (
    <section
      className={`border-t border-wire-line/50 ${i % 2 === 1 ? "bg-surface/40" : ""}`}
    >
      <Shell className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
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
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
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
        </div>
      </Shell>
    </section>
  );
}

export default function SejaUmFranqueado() {
  return (
    <main className="w-full">
      {/* 1. HERO — hook forte + form curto above-the-fold ---------------- */}
      <section className="brand-glow relative overflow-hidden">
        <Hexagon className="pointer-events-none absolute -right-24 -top-20 h-[34rem] w-[34rem] text-brand/10" />
        <Shell className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <SectionTag>Franquia GRAVA.AI</SectionTag>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Tenha um negócio inovador de{" "}
              <span className="text-brand">personalização com IA.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Totens automatizados que criam produtos exclusivos na hora. Uma
              operação enxuta, movida por Inteligência Artificial — pronta para a
              sua região.
            </p>
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
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brand ring-1 ring-brand"
            >
              ✆ Falar no WhatsApp agora
            </a>
          </div>
          <LeadForm variant="short" />
        </Shell>
      </section>

      {/* 2. FAIXA DE DESTAQUES (sem números) ----------------------------- */}
      <section className="border-y border-wire-line/50 bg-surface">
        <Shell className="grid grid-cols-1 gap-y-6 divide-wire-line/60 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {DESTAQUES.map((s) => (
            <div key={s.t} className="lg:px-6">
              <h3 className="font-semibold text-brand">{s.t}</h3>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </div>
          ))}
        </Shell>
      </section>

      {/* 3. O MERCADO MUDOU + PILARES ------------------------------------- */}
      <section className="border-b border-wire-line/50">
        <Shell className="grid gap-y-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
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
              <AnchorCta>Quero ser franqueado</AnchorCta>
            </div>
          </div>
          <div className="divide-y divide-wire-line/60">
            {PILARES.map((p, i) => (
              <div key={p.t} className="flex gap-6 py-6 first:pt-0">
                <span className="text-3xl font-semibold text-brand/70">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{p.t}</h3>
                  <p className="mt-1.5 text-muted">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* 3b. MODELOS DE LOJA — 3 tipos, cada um em CTA horizontal --------- */}
      <section className="border-b border-wire-line/50">
        <Shell className="pt-20 pb-4 text-center">
          <SectionTag>
            <span className="mx-auto">Modelos de franquia</span>
          </SectionTag>
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Escolha o modelo ideal para a sua região.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Três formatos pensados para diferentes pontos e perfis de
            investimento. Encontre o seu.
          </p>
        </Shell>
      </section>
      {MODELOS.map((m, i) => (
        <ModeloSection key={m.nome} m={m} i={i} />
      ))}

      {/* 4. COMO SE TORNAR FRANQUEADO — imagem sangra à esquerda ---------- */}
      <section id="como-funciona" className="scroll-mt-24 border-b border-wire-line/50 bg-surface/40">
        <div className="grid items-stretch gap-y-10 lg:grid-cols-2">
          <Photo
            src="/shopping.jpg"
            alt="Quiosque GRAVA.AI em operação em um shopping"
            className="order-2 h-72 lg:order-1 lg:h-auto lg:min-h-[30rem] lg:rounded-none lg:rounded-r-3xl"
          />
          <div className="order-1 flex flex-col justify-center px-6 py-16 lg:order-2 lg:px-16">
            <SectionTag>Passo a passo</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Como se tornar um franqueado.
            </h2>
            <ol className="mt-8 divide-y divide-wire-line/60">
              {COMO_SER_FRANQUEADO.map((p, i) => (
                <li key={p.t} className="flex gap-5 py-5">
                  <span className="text-2xl font-semibold text-brand/70">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.t}</h3>
                    <p className="mt-1 text-muted">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5. O QUE VOCÊ RECEBE + gancho para os valores ------------------- */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24">
          <div className="max-w-2xl">
            <SectionTag>Modelo de franquia</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Você começa com tudo pronto para vender.
            </h2>
            <p className="mt-4 text-muted">
              Um pacote completo, pensado para você operar com segurança desde o
              primeiro dia — mesmo sem experiência.
            </p>
          </div>
          <div className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSO.map((item) => (
              <div key={item.t} className="border-b border-wire-line/60 py-6">
                <h3 className="text-lg font-semibold">{item.t}</h3>
                <p className="mt-1 text-muted">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#investimento"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Ver o investimento completo ↓
            </a>
          </div>
        </Shell>
      </section>

      {/* 6. DISTRIBUIÇÃO PRÓPRIA — faixa com brilho ----------------------- */}
      <section className="brand-glow-left relative overflow-hidden border-b border-wire-line/50 bg-surface">
        <Hexagon className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 text-brand/10" />
        <Shell className="relative py-24">
          <SectionTag>Suporte da matriz</SectionTag>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Distribuição própria. Você não fica sozinho.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            <span className="text-brand">Gestão inteligente</span>, do estoque à
            operação.
          </p>
          <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {DISTRIBUICAO.map((d) => (
              <div key={d.t} className="border-l-2 border-brand/40 pl-5">
                <h3 className="text-xl font-semibold text-brand">{d.t}</h3>
                <p className="mt-1.5 text-muted">{d.d}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* 7. ATÉ ONDE A IA AUXILIA ----------------------------------------- */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24">
          <SectionTag>Diferencial</SectionTag>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            A <span className="text-brand">IA</span> trabalha em toda a operação.
          </h2>
          <div className="mt-12 grid gap-x-16 sm:grid-cols-2">
            {IA_OPERACAO.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 border-t border-wire-line/60 py-6 sm:[&:nth-child(-n+2)]:border-t-0"
              >
                <span className="text-2xl font-semibold text-brand/70">
                  0{i + 1}
                </span>
                <p className="text-lg text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* 7b. INVESTIMENTO DETALHADO (valores da apresentação) ------------ */}
      <section
        id="investimento"
        className="scroll-mt-20 border-b border-wire-line/50 bg-surface"
      >
        <Shell className="py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-wire-line/60 pb-8">
            <div>
              <SectionTag>Detalhamento da franquia</SectionTag>
              <h2 className="text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                Investimento inicial
              </h2>
            </div>
            <p className="text-5xl font-bold text-foreground sm:text-6xl">
              {INVESTIMENTO_VALOR.replace(",00", "")}
              <span className="text-2xl text-muted">,00</span>
            </p>
          </div>
          <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {INVESTIMENTO.map((item) => (
              <div key={item.t} className="border-b border-wire-line/60 py-6">
                <h3 className="text-lg font-semibold">{item.t}</h3>
                <p className="mt-1 text-muted">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-brand">
              Sem surpresas: estoque inicial e taxa de franqueado já inclusos.
            </p>
            <AnchorCta>Quero ser franqueado</AnchorCta>
          </div>
        </Shell>
      </section>

      {/* 8. DEPOIMENTOS [PLACEHOLDER] ------------------------------------- */}
      <section className="border-b border-wire-line/50 bg-surface/40">
        <Shell className="py-24">
          <SectionTag>Prova social</SectionTag>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Quem já é GRAVA.AI.
          </h2>
          <p className="mt-2 text-xs text-muted">
            * Depoimentos ilustrativos — substituir por franqueados reais.
          </p>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {DEPOIMENTOS.map((d) => (
              <figure key={d.nome} className="flex h-full flex-col">
                <blockquote className="flex-1 text-lg leading-relaxed text-foreground">
                  “{d.texto}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-wire-line/60 pt-5">
                  <span className="h-10 w-10 rounded-full border border-dashed border-wire-line" />
                  <span>
                    <span className="block font-semibold">{d.nome}</span>
                    <span className="block text-xs text-muted">{d.cidade}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Shell>
      </section>

      {/* 9. OPORTUNIDADE DE MERCADO -------------------------------------- */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24 text-center">
          <SectionTag>
            <span className="mx-auto">Oportunidade de mercado</span>
          </SectionTag>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            A personalização é uma das maiores tendências do varejo.
          </h2>
          <div className="mt-12 grid gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-wire-line/60">
            {MERCADO.map((m) => (
              <div key={m.t} className="px-6">
                <h3 className="text-xl font-semibold text-brand">{m.t}</h3>
                <p className="mt-2 text-sm text-muted">{m.d}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* 10. FAQ ---------------------------------------------------------- */}
      <section className="border-b border-wire-line/50">
        <Shell className="py-24">
          <SectionTag>Dúvidas</SectionTag>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Perguntas frequentes
          </h2>
          <Faq />
        </Shell>
      </section>

      {/* 11. URGÊNCIA [PLACEHOLDER] --------------------------------------- */}
      <section className="border-b border-wire-line/50 bg-surface">
        <Shell className="py-6 text-center">
          <p className="text-foreground">
            <span className="font-semibold text-brand">
              Vagas limitadas por região.
            </span>{" "}
            Garanta a exclusividade da sua cidade.{" "}
            <span className="text-sm text-muted">
              * Claim ilustrativo — substituir por escassez real.
            </span>
          </p>
        </Shell>
      </section>

      {/* 12. FORMULÁRIO FINAL --------------------------------------------- */}
      <section id="formulario" className="brand-glow scroll-mt-24">
        <Shell className="grid gap-12 py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Seja um franqueado.
            </h2>
            <p className="mt-6 max-w-sm text-lg text-muted">
              Leve esta experiência para sua região e participe da próxima{" "}
              <span className="text-brand">evolução da personalização.</span>
            </p>
            <div className="mt-10 space-y-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-b border-wire-line/60 pb-4 hover:text-brand"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-brand text-brand">
                  ✆
                </span>
                <span className="text-lg">{WHATSAPP_NUMBER}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-brand text-brand">
                  ◎
                </span>
                <span className="text-lg">{INSTAGRAM_HANDLE}</span>
              </div>
            </div>
          </div>
          <LeadForm variant="full" />
        </Shell>
      </section>

      <p className="border-t border-wire-line/50 py-6 text-center text-xs text-muted">
        <Link href="/" className="hover:text-brand">
          ← Voltar ao site institucional
        </Link>
      </p>
    </main>
  );
}
