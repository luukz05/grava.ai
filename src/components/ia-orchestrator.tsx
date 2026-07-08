"use client"

// Diagrama radial de orquestração: a IA GRAVA.AI no centro (hexágono com a
// logo) e, em 5 pontas do hexágono, os pontos da operação onde ela atua.
// Pulsos em forma de mini-hexágono saem do centro em direção aos badges
// (SMIL <animateMotion>, dur 2.4s, stagger 0.18s — docs/auditoria-ui-ux-fsk-tax.md §2.4).

import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import {
  FaBell,
  FaBagShopping,
  FaChartColumn,
  FaHeadset,
  FaUsers,
  FaWandMagicSparkles,
} from "react-icons/fa6"
import { useInView } from "./motion"

// ── Canvas ────────────────────────────────────────────────────────────────
const VW = 840
const VH = 620
const CX = 420
const CY = 310
const HEX_R = 100 // circunraio do hexágono central
const BADGE_R = 245 // raio onde ficam os badges (pontas)

// As 6 pontas do hexágono (pointy-top), uma por pilar:
// -150° sup. esq. · -90° topo · -30° sup. dir. · 30° inf. dir. · 90° baixo · 150° inf. esq.
const ANGLES = [-150, -90, -30, 30, 90, 150]

const ICON_CLS = "size-3.5"

type Node = { label: string; sub: string; icon: ReactNode }

// Um ponto de atuação da IA por ponta, na ordem de ANGLES
const NODES: Node[] = [
  {
    label: "Arte Gerada por IA",
    sub: "Em segundos, no totem",
    icon: <FaWandMagicSparkles className={ICON_CLS} aria-hidden />,
  },
  {
    label: "Vendas Online",
    sub: "Pedidos além do ponto físico",
    icon: <FaBagShopping className={ICON_CLS} aria-hidden />,
  },
  {
    label: "Relatório de Desempenho",
    sub: "KPIs sempre atualizados",
    icon: <FaChartColumn className={ICON_CLS} aria-hidden />,
  },
  {
    label: "CRM da Franquia",
    sub: "Matriz em tempo real",
    icon: <FaUsers className={ICON_CLS} aria-hidden />,
  },
  {
    label: "Suporte Automatizado",
    sub: "Da matriz ao franqueado",
    icon: <FaHeadset className={ICON_CLS} aria-hidden />,
  },
  {
    label: "Alerta de Reposição",
    sub: "Estoque nunca zerado",
    icon: <FaBell className={ICON_CLS} aria-hidden />,
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
    // Fase espiral: delay negativo de 1/6 do período por raio — o brilho
    // percorre as seis pontas em rotação contínua (sentido horário)
    animationDelay: `${(-i * 0.4).toFixed(1)}s`,
  })

  return (
    <div ref={ref} className="relative mx-auto aspect-[840/620] w-full max-w-3xl">
      {/* Linhas radiais respirando em espiral ao redor do hexágono */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        aria-hidden
        className="absolute inset-0 size-full text-brand/60"
      >
        {ANGLES.map((angle, i) => (
          <path
            key={`l-${angle}`}
            d={radialPath(angle)}
            className="line-breath"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
            style={lineStyle(i)}
          />
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
