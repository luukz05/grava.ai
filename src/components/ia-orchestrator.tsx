"use client"

// Diagrama radial de orquestração: a IA GRAVA.AI no centro (hexágono com a
// logo) e, em 5 pontas do hexágono, os pontos da operação onde ela atua.
// Pulsos em forma de mini-hexágono saem do centro em direção aos badges
// (SMIL <animateMotion>, dur 2.4s, stagger 0.18s — docs/auditoria-ui-ux-fsk-tax.md §2.4).

import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { useInView } from "./motion"

// ── Canvas ────────────────────────────────────────────────────────────────
const VW = 800
const VH = 540
const CX = 400
const CY = 255
const HEX_R = 100 // circunraio do hexágono central
const BADGE_R = 210 // raio onde ficam os badges (pontas)

// Pontas usadas (pointy-top, sem a de cima — o header da seção respira ali):
// -30° sup. direita · 30° inf. direita · 90° baixo · 150° inf. esquerda · -150° sup. esquerda
const ANGLES = [-150, -30, 30, 90, 150]

const ICON_CLS = "size-4"

type Node = { label: string; sub: string; icon: ReactNode }

// Um ponto de atuação da IA por ponta, na ordem de ANGLES
const NODES: Node[] = [
  {
    label: "Arte Gerada por IA",
    sub: "Em segundos, no totem",
    icon: (
      // sparkles
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLS} aria-hidden>
        <path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4Z" />
        <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
      </svg>
    ),
  },
  {
    label: "Relatório de Desempenho",
    sub: "KPIs sempre atualizados",
    icon: (
      // documento
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLS} aria-hidden>
        <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z" />
        <path d="M14 3v4.5h4.5M9.5 13.5h5M9.5 17h5" />
      </svg>
    ),
  },
  {
    label: "CRM da Franquia",
    sub: "Visão da matriz em tempo real",
    icon: (
      // pessoas
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLS} aria-hidden>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 20c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5M16 5.3a3.2 3.2 0 0 1 0 5.4M17.7 15.2c1.6.7 2.6 2.3 2.9 4.8" />
      </svg>
    ),
  },
  {
    label: "Suporte Automatizado",
    sub: "Da matriz ao franqueado",
    icon: (
      // headset
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLS} aria-hidden>
        <path d="M4.5 13v-2a7.5 7.5 0 0 1 15 0v2" />
        <rect x="3.5" y="13" width="4" height="6" rx="1.5" />
        <rect x="16.5" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19v1a2 2 0 0 1-2 2h-3.5" />
      </svg>
    ),
  },
  {
    label: "Alerta de Reposição",
    sub: "Estoque nunca zerado",
    icon: (
      // sino
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLS} aria-hidden>
        <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
        <path d="M10.5 19a1.9 1.9 0 0 0 3 0" />
      </svg>
    ),
  },
]

// ── Geometria ────────────────────────────────────────────────────────────
function rad(deg: number): number {
  return (deg * Math.PI) / 180
}

function at(angle: number, r: number): [number, number] {
  return [CX + r * Math.cos(rad(angle)), CY + r * Math.sin(rad(angle))]
}

function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = rad(i * 60 - 90)
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(" ")
}

// Linha radial: da borda do hexágono central até a chegada no badge
function radialPath(angle: number): string {
  const [x1, y1] = at(angle, HEX_R + 12)
  const [x2, y2] = at(angle, BADGE_R - 52)
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

// ── Badge (HTML, ancorado na ponta) ───────────────────────────────────────
function Badge({
  node,
  angle,
  visible,
  delay,
}: {
  node: Node
  angle: number
  visible: boolean
  delay: number
}) {
  const [x, y] = at(angle, BADGE_R)
  const style: CSSProperties = {
    left: `${(x / VW) * 100}%`,
    top: `${(y / VH) * 100}%`,
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(0.92)",
    transition: "opacity 0.6s var(--ease-brand), transform 0.6s var(--ease-brand)",
    transitionDelay: `${delay}ms`,
  }
  return (
    <div className="absolute" style={style}>
      <div className="glass flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 ring-1 ring-white/10 backdrop-blur-xl">
        {/* Ícone dentro de um pequeno hexágono */}
        <span className="relative grid size-9 shrink-0 place-items-center text-brand">
          <svg viewBox="0 0 100 115" className="absolute inset-0 size-full" aria-hidden>
            <polygon
              points="50,4 96,30 96,85 50,111 4,85 4,30"
              fill="rgba(59,165,232,0.12)"
              stroke="rgba(59,165,232,0.55)"
              strokeWidth="4"
            />
          </svg>
          <span className="relative">{node.icon}</span>
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm font-semibold text-foreground">
            {node.label}
          </span>
          <span className="block truncate text-xs text-muted">{node.sub}</span>
        </span>
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────
export function AIOrchestrator() {
  const { ref, visible } = useInView<HTMLDivElement>(0.25)

  const lineStyle = (i: number): CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: visible ? 0 : 1,
    transition: "stroke-dashoffset 0.9s var(--ease-brand)",
    transitionDelay: `${250 + i * 80}ms`,
  })

  return (
    <div ref={ref} className="relative mx-auto aspect-[800/540] w-full max-w-3xl">
      {/* Linhas radiais + pulsos hexagonais (saem do centro para as pontas) */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        aria-hidden
        className="absolute inset-0 size-full text-brand/40"
      >
        {ANGLES.map((angle, i) => (
          <path
            key={`l-${angle}`}
            d={radialPath(angle)}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
            style={lineStyle(i)}
          />
        ))}

        {/* Mini-hexágonos viajando do centro aos badges */}
        {ANGLES.map((angle, i) => (
          <polygon
            key={`p-${angle}`}
            points={hexPts(0, 0, 6)}
            className="fill-brand"
          >
            <animateMotion
              path={radialPath(angle)}
              dur="2.4s"
              begin={`${(0.8 + i * 0.18).toFixed(2)}s`}
              repeatCount="indefinite"
            />
          </polygon>
        ))}
      </svg>

      {/* Centro: hexágono da marca com a logo (nasce por escala) */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          left: `${(CX / VW) * 100}%`,
          top: `${(CY / VH) * 100}%`,
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.9)",
          transition: "opacity 0.6s var(--ease-brand), transform 0.6s var(--ease-brand)",
          transitionDelay: "150ms",
        }}
      >
        <div className="relative flex size-52 items-center justify-center sm:size-56">
          <div className="absolute size-44 rounded-full bg-brand/15 blur-3xl" aria-hidden />
          <svg viewBox="0 0 220 220" className="absolute inset-0 size-full" aria-hidden>
            <polygon
              points={hexPts(110, 110, 104)}
              fill="none"
              stroke="rgba(59,165,232,0.12)"
              strokeWidth="1"
              strokeDasharray="3 8"
              style={{ animation: "glowPulse 6s ease-in-out infinite" }}
            />
            <polygon
              points={hexPts(110, 110, 88)}
              fill="rgba(59,165,232,0.09)"
              stroke="rgba(59,165,232,0.65)"
              strokeWidth="1.75"
            />
            <polygon
              points={hexPts(110, 110, 72)}
              fill="none"
              stroke="rgba(59,165,232,0.22)"
              strokeWidth="0.75"
              strokeDasharray="3 6"
            />
          </svg>
          <div className="relative flex flex-col items-center gap-1.5 text-center">
            <Image
              src="/logo-mark.png"
              alt=""
              width={271}
              height={321}
              className="h-11 w-auto"
            />
            <span className="text-base font-bold tracking-[0.12em] text-brand">
              GRAVA.AI
            </span>
            <span className="text-[7px] uppercase tracking-[0.32em] text-brand-cyan/60">
              Inteligência Artificial
            </span>
          </div>
        </div>
      </div>

      {/* Badges nas pontas do hexágono */}
      {NODES.map((node, i) => (
        <Badge
          key={node.label}
          node={node}
          angle={ANGLES[i]}
          visible={visible}
          delay={400 + i * 90}
        />
      ))}
    </div>
  )
}
