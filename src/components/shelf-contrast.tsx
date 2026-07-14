"use client"

/**
 * A prateleira, antes e agora — a tese "o varejo mudou" MOSTRADA, não afirmada.
 *
 * À esquerda, o varejo de prateleira: a mesma peça repetida cinco vezes, sem
 * gravação, dessaturada — todo mundo leva o mesmo. À direita, a GRAVA.AI: cinco
 * peças diferentes, cada uma com uma gravação diferente, acesas na cor da marca.
 * O contraste é o argumento; o texto só confirma o que o olho já viu.
 *
 * Princípios (docs/auditoria-ui-ux-fsk-tax.md):
 *  - produto reconstruído em HTML/SVG, nunca screenshot (§0.2) — reusa as mesmas
 *    peças gravadas do hero, então a linguagem visual é uma só;
 *  - profundidade por hairline + glow desfocado, jamais sombra pesada (§0.5);
 *  - movimento curto e discreto: as peças únicas nascem por escala, em stagger
 *    de 90ms; as repetidas não animam — paradas é o que elas são (§2.1);
 *  - honestidade ostensiva: "Exemplos ilustrativos de gravação" (§0.8).
 */

import type { CSSProperties, ReactNode } from "react"
import {
  Bottle,
  EngraveHeart,
  EngraveHexes,
  EngraveMonogram,
  EngraveName,
  EngravePaw,
  KeychainHex,
  Mug,
  Tumbler,
} from "./product-showcase"
import { useInView, usePrefersReducedMotion } from "./motion"

/** Cinza morto da prateleira antiga — sem cor, sem gravação, sem história. */
const CINZA = "#6f7176"

/** As cinco peças únicas: nenhuma repete peça, cor ou gravação. */
const UNICAS: ReactNode[] = [
  <Tumbler
    key="t"
    base="#2b6f9e"
    engraving={<EngraveHexes color="#cfe6f5" />}
    className="h-[86%] w-auto"
  />,
  <KeychainHex
    key="k"
    base="#b9bec4"
    engraving={<EngraveMonogram letter="G" color="#565b62" />}
    className="h-[72%] w-auto"
  />,
  <Bottle
    key="b"
    base="#8fa48b"
    engraving={<EngraveName name="Bia" color="#eef3ec" />}
    className="h-full w-auto"
  />,
  <Mug
    key="m"
    base="#e3ddd0"
    engraving={<EngraveHeart initials="J + P" color="#6b6353" />}
    className="h-[78%] w-auto"
  />,
  <Tumbler
    key="t2"
    base="#c98ba6"
    engraving={<EngravePaw color="#f7e3ec" />}
    className="h-[92%] w-auto"
  />,
]

/** Rótulo da prateleira (chip discreto no topo).
 *  `self-start` é obrigatório: sem ele o chip vira filho esticado do flex-col. */
function Tag({ tone, children }: { tone: "mudo" | "marca"; children: ReactNode }) {
  return (
    <span
      className={`relative inline-flex self-start items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] ring-1 ${
        tone === "marca"
          ? "bg-brand/10 text-brand ring-brand/30"
          : "text-muted ring-white/10"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${tone === "marca" ? "bg-brand" : "bg-muted/60"}`}
      />
      {children}
    </span>
  )
}

/** Linha da prateleira — hairline sob as peças. */
function Prateleira({ tone }: { tone: "mudo" | "marca" }) {
  return (
    <span
      aria-hidden
      className={`relative mt-1 block h-px w-full ${
        tone === "marca"
          ? "bg-linear-to-r from-brand/0 via-brand/60 to-brand/0"
          : "bg-white/10"
      }`}
    />
  )
}

export function ShelfContrast() {
  const { ref, visible } = useInView<HTMLDivElement>(0.2)
  const reduced = usePrefersReducedMotion()

  // Com movimento reduzido a peça já nasce pronta: nenhum estilo, nenhuma
  // transição. Movimento é acabamento, nunca barreira.
  const nasce = (i: number): CSSProperties =>
    reduced
      ? {}
      : {
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "scale(0.92) translateY(8px)",
          transition:
            "opacity 0.6s var(--ease-brand), transform 0.6s var(--ease-brand)",
          transitionDelay: `${200 + i * 90}ms`,
        }

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-2">
      {/* ── Antes: a prateleira ────────────────────────────────────────── */}
      <figure className="flex flex-col overflow-hidden rounded-3xl bg-white/[0.02] p-6 ring-1 ring-white/5 sm:p-8">
        <Tag tone="mudo">Antes · a prateleira</Tag>

        {/* A mesma peça, cinco vezes. Sem cor, sem gravação, sem movimento.
            A largura do SVG deriva da altura, então ele não encolhe: no mobile a
            fileira é mais baixa e a 5ª peça sai — senão a linha estoura o painel. */}
        <div className="mt-8 flex h-24 items-end justify-center gap-2 grayscale sm:h-44 sm:gap-5">
          {Array.from({ length: 5 }, (_, i) => (
            <Tumbler
              key={i}
              base={CINZA}
              engraving={null}
              className={`h-[88%] w-auto opacity-70 ${i === 4 ? "hidden sm:block" : ""}`}
            />
          ))}
        </div>

        <Prateleira tone="mudo" />

        <figcaption className="mt-4 text-pretty text-sm/6 text-muted">
          Produção em massa: <strong className="font-semibold text-foreground">todo
          mundo leva o mesmo</strong>. A peça não sabe quem é você.
        </figcaption>
      </figure>

      {/* ── Agora: a GRAVA.AI ──────────────────────────────────────────── */}
      <figure className="relative flex flex-col overflow-hidden rounded-3xl bg-linear-to-br from-brand-700/25 to-brand-500/[0.06] p-6 ring-1 ring-brand/20 sm:p-8">
        <span
          aria-hidden
          className="noise-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        />

        <Tag tone="marca">Agora · a GRAVA.AI</Tag>

        {/* Cinco peças, cinco gravações. Cada uma nasce no seu tempo. */}
        <div className="relative mt-8 flex h-24 items-end justify-center gap-2 sm:h-44 sm:gap-5">
          {UNICAS.map((peca, i) => (
            <span
              key={i}
              className={`relative flex h-full items-end ${i === 4 ? "hidden sm:flex" : ""}`}
              style={nasce(i)}
            >
              {/* Glow que "acende" a peça por baixo */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-10 rounded-full bg-brand/25 blur-xl"
              />
              <span className="relative flex h-full items-end">{peca}</span>
            </span>
          ))}
        </div>

        <Prateleira tone="marca" />

        <figcaption className="relative mt-4 text-pretty text-sm/6 text-muted">
          Personalização com IA:{" "}
          <strong className="font-semibold text-foreground">
            cada peça sai diferente da anterior
          </strong>
          . <span className="text-muted/60">Exemplos ilustrativos de gravação.</span>
        </figcaption>
      </figure>
    </div>
  )
}
