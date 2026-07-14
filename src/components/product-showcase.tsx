"use client"

// Vitrine de produtos do hero — lineup estilo Apple dentro do palco de vidro.
// Cenas de produtos gravados a laser (copos térmicos, chaveiros, garrafas)
// ciclando com crossfade. Ilustrações 100% SVG: nítidas em qualquer DPI,
// tematizam com o dark e são fáceis de trocar por fotos reais depois.

import { useEffect, useId, useState, type ReactNode } from "react"
import { usePrefersReducedMotion } from "./motion"

// ── Cor: clareia (amt > 0) ou escurece (amt < 0) um hex ──────────────────
function mix(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) =>
    Math.round(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))
  const r = ch((n >> 16) & 255)
  const g = ch((n >> 8) & 255)
  const b = ch(n & 255)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
}

// Gradiente horizontal que dá volume de cilindro (borda escura, centro claro)
function BodyGradient({ id, base }: { id: string; base: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={mix(base, -0.3)} />
      <stop offset="22%" stopColor={base} />
      <stop offset="46%" stopColor={mix(base, 0.16)} />
      <stop offset="64%" stopColor={base} />
      <stop offset="100%" stopColor={mix(base, -0.32)} />
    </linearGradient>
  )
}

function GroundShadow() {
  return <ellipse cx="70" cy="231" rx="42" ry="6" fill="rgba(0,0,0,0.35)" />
}

// ── Gravações (motivos a laser) ───────────────────────────────────────────
export function EngraveName({ name, color }: { name: string; color: string }) {
  return (
    <text
      textAnchor="middle"
      fontSize="20"
      fontWeight="500"
      letterSpacing="1"
      fill={color}
      opacity="0.9"
    >
      {name}
    </text>
  )
}

export function EngraveMonogram({ letter, color }: { letter: string; color: string }) {
  return (
    <g opacity="0.9">
      <circle r="26" fill="none" stroke={color} strokeWidth="1.5" />
      <text textAnchor="middle" dy="10" fontSize="30" fontWeight="600" fill={color}>
        {letter}
      </text>
    </g>
  )
}

export function EngraveHeart({ initials, color }: { initials: string; color: string }) {
  return (
    <g opacity="0.9">
      <path
        d="M0 -8 C -3 -16 -16 -16 -16 -6 C -16 2 -6 8 0 14 C 6 8 16 2 16 -6 C 16 -16 3 -16 0 -8 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text textAnchor="middle" dy="34" fontSize="14" fontWeight="500" letterSpacing="1.5" fill={color}>
        {initials}
      </text>
    </g>
  )
}

function hexOutline(r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`
  }).join(" ")
}

export function EngraveHexes({ color }: { color: string }) {
  return (
    <g opacity="0.9" fill="none" stroke={color} strokeWidth="1.5">
      <polygon points={hexOutline(16)} />
      <polygon points={hexOutline(16)} transform="translate(-22 14)" opacity="0.55" />
      <polygon points={hexOutline(16)} transform="translate(22 14)" opacity="0.55" />
    </g>
  )
}

export function EngravePaw({ color }: { color: string }) {
  return (
    <g fill={color} opacity="0.9">
      <ellipse rx="11" ry="9" cy="8" />
      <circle r="4.5" cx="-13" cy="-4" />
      <circle r="4.5" cx="-4.5" cy="-10" />
      <circle r="4.5" cx="4.5" cy="-10" />
      <circle r="4.5" cx="13" cy="-4" />
    </g>
  )
}

// ── Produtos ──────────────────────────────────────────────────────────────
export function Tumbler({
  base,
  engraving,
  className = "",
}: {
  base: string
  engraving: ReactNode
  className?: string
}) {
  const uid = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 140 240" className={className} aria-hidden>
      <defs>
        <BodyGradient id={`tb-${uid}`} base={base} />
        <linearGradient id={`tl-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2e2e33" />
          <stop offset="45%" stopColor="#56565e" />
          <stop offset="100%" stopColor="#2b2b30" />
        </linearGradient>
      </defs>
      <GroundShadow />
      {/* Tampa */}
      <rect x="36" y="10" width="68" height="16" rx="8" fill={`url(#tl-${uid})`} />
      <rect x="28" y="24" width="84" height="22" rx="6" fill={`url(#tl-${uid})`} />
      {/* Corpo (leve afunilamento) */}
      <path
        d="M 31 48 C 31 46 33 44 35 44 L 105 44 C 107 44 109 46 109 48 L 102 212 C 102 222 95 228 87 228 L 53 228 C 45 228 38 222 38 212 Z"
        fill={`url(#tb-${uid})`}
      />
      {/* Brilho lateral */}
      <rect x="42" y="54" width="5" height="158" rx="2.5" fill="rgba(255,255,255,0.14)" />
      {/* Gravação */}
      <g transform="translate(70 142)">{engraving}</g>
    </svg>
  )
}

export function Bottle({
  base,
  engraving,
  className = "",
}: {
  base: string
  engraving: ReactNode
  className?: string
}) {
  const uid = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 140 240" className={className} aria-hidden>
      <defs>
        <BodyGradient id={`bb-${uid}`} base={base} />
      </defs>
      <GroundShadow />
      {/* Tampa */}
      <rect x="54" y="8" width="32" height="20" rx="7" fill="#3a3a40" />
      <rect x="54" y="22" width="32" height="6" fill="#2c2c31" />
      {/* Ombro + corpo */}
      <path
        d="M 56 28 L 47 62 C 45 68 44 72 44 78 L 44 210 C 44 222 52 228 60 228 L 80 228 C 88 228 96 222 96 210 L 96 78 C 96 72 95 68 93 62 L 84 28 Z"
        fill={`url(#bb-${uid})`}
      />
      <rect x="49" y="84" width="4.5" height="126" rx="2.25" fill="rgba(255,255,255,0.13)" />
      <g transform="translate(70 150)">{engraving}</g>
    </svg>
  )
}

export function Mug({
  base,
  engraving,
  className = "",
}: {
  base: string
  engraving: ReactNode
  className?: string
}) {
  const uid = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 150 240" className={className} aria-hidden>
      <defs>
        <BodyGradient id={`mb-${uid}`} base={base} />
      </defs>
      <ellipse cx="72" cy="231" rx="44" ry="6" fill="rgba(0,0,0,0.35)" />
      {/* Alça */}
      <path
        d="M 108 138 C 132 138 132 196 108 196"
        fill="none"
        stroke={mix(base, -0.18)}
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* Corpo */}
      <path
        d="M 32 110 C 32 107 34 105 37 105 L 107 105 C 110 105 112 107 112 110 L 112 212 C 112 222 104 228 96 228 L 48 228 C 40 228 32 222 32 212 Z"
        fill={`url(#mb-${uid})`}
      />
      {/* Borda superior */}
      <rect x="32" y="105" width="80" height="6" rx="3" fill={mix(base, 0.22)} />
      <rect x="38" y="118" width="4.5" height="96" rx="2.25" fill="rgba(255,255,255,0.13)" />
      <g transform="translate(72 172)">{engraving}</g>
    </svg>
  )
}

export function KeychainHex({
  base,
  engraving,
  className = "",
}: {
  base: string
  engraving: ReactNode
  className?: string
}) {
  const uid = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 140 240" className={className} aria-hidden>
      <defs>
        <BodyGradient id={`kb-${uid}`} base={base} />
      </defs>
      <ellipse cx="70" cy="231" rx="38" ry="5.5" fill="rgba(0,0,0,0.35)" />
      {/* Argola + elo */}
      <circle cx="70" cy="52" r="15" fill="none" stroke="#9aa0a8" strokeWidth="6" />
      <circle cx="70" cy="52" r="15" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <rect x="65" y="66" width="10" height="14" rx="4" fill="#83888f" />
      {/* Placa hexagonal (o motivo da marca) */}
      <polygon
        points={Array.from({ length: 6 }, (_, i) => {
          const a = ((i * 60 - 90) * Math.PI) / 180
          return `${(70 + 74 * Math.cos(a)).toFixed(1)},${(152 + 74 * Math.sin(a)).toFixed(1)}`
        }).join(" ")}
        fill={`url(#kb-${uid})`}
        stroke={mix(base, -0.25)}
        strokeWidth="2"
      />
      <g transform="translate(70 152)">{engraving}</g>
    </svg>
  )
}

export function KeychainTag({
  base,
  engraving,
  className = "",
}: {
  base: string
  engraving: ReactNode
  className?: string
}) {
  const uid = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 140 240" className={className} aria-hidden>
      <defs>
        <BodyGradient id={`kt-${uid}`} base={base} />
      </defs>
      <ellipse cx="70" cy="231" rx="34" ry="5.5" fill="rgba(0,0,0,0.35)" />
      <circle cx="70" cy="58" r="14" fill="none" stroke="#9aa0a8" strokeWidth="6" />
      <circle cx="70" cy="58" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <rect x="65" y="70" width="10" height="12" rx="4" fill="#83888f" />
      {/* Medalhão redondo */}
      <circle cx="70" cy="156" r="70" fill={`url(#kt-${uid})`} stroke={mix(base, -0.25)} strokeWidth="2" />
      <circle cx="70" cy="156" r="60" fill="none" stroke={mix(base, 0.2)} strokeWidth="1" opacity="0.6" />
      <g transform="translate(70 156)">{engraving}</g>
    </svg>
  )
}

// ── Cenas ─────────────────────────────────────────────────────────────────
type Scene = { label: string; items: ReactNode }

const SCENES: Scene[] = [
  {
    label: "Copos térmicos",
    items: (
      <>
        <Tumbler base="#2b6f9e" engraving={<EngraveHexes color="#cfe6f5" />} className="h-[88%] w-auto" />
        <Tumbler base="#2c2c30" engraving={<EngraveMonogram letter="M" color="#c9c9cf" />} className="h-full w-auto" />
        <Tumbler base="#e3ddd0" engraving={<EngraveHeart initials="L + G" color="#6b6353" />} className="h-[94%] w-auto" />
        <Tumbler base="#c98ba6" engraving={<EngraveName name="Ana" color="#f7e3ec" />} className="h-[84%] w-auto" />
      </>
    ),
  },
  {
    label: "Chaveiros",
    items: (
      <>
        <KeychainHex base="#b9bec4" engraving={<EngraveMonogram letter="G" color="#565b62" />} className="h-[88%] w-auto" />
        <KeychainTag base="#2b6f9e" engraving={<EngraveName name="Theo" color="#d5eaf7" />} className="h-full w-auto" />
        <KeychainHex base="#2c2c30" engraving={<EngravePaw color="#c9c9cf" />} className="h-[82%] w-auto" />
      </>
    ),
  },
  {
    label: "Garrafas e canecas",
    items: (
      <>
        <Bottle base="#8fa48b" engraving={<EngraveName name="Bia" color="#eef3ec" />} className="h-full w-auto" />
        <Mug base="#e3ddd0" engraving={<EngraveHeart initials="J + P" color="#6b6353" />} className="h-[86%] w-auto" />
        <Bottle base="#2b6f9e" engraving={<EngraveHexes color="#cfe6f5" />} className="h-[94%] w-auto" />
      </>
    ),
  },
]

const CYCLE_MS = 4500

// ── Componente principal ──────────────────────────────────────────────────
export function ProductShowcase() {
  const [idx, setIdx] = useState(0)
  const reduced = usePrefersReducedMotion()

  // Auto-avança; um clique nos dots reinicia o relógio (dep. em idx)
  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SCENES.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [reduced, idx])

  return (
    <div role="region" aria-label="Exemplos de produtos personalizados">
      <div className="relative h-64 sm:h-80 lg:h-96">
        {SCENES.map((scene, i) => (
          <div
            key={scene.label}
            aria-hidden={i !== idx}
            className="absolute inset-0 flex items-end justify-center gap-5 transition-[opacity,transform] duration-700 motion-reduce:transition-none sm:gap-9"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "none" : "translateY(8px)",
              transitionTimingFunction: "var(--ease-brand)",
              pointerEvents: i === idx ? "auto" : "none",
            }}
          >
            {scene.items}
          </div>
        ))}
      </div>

      {/* Legenda + dots (dot ativo alarga) */}
      <div className="flex flex-col items-center gap-3 pb-7 pt-6">
        <p className="text-xs text-muted" aria-live="polite">
          {SCENES[idx].label} —{" "}
          <span className="text-muted/60">exemplos ilustrativos de gravação</span>
        </p>
        <div className="flex items-center gap-1.5">
          {SCENES.map((scene, i) => (
            <button
              key={scene.label}
              type="button"
              aria-label={`Ver ${scene.label}`}
              aria-current={i === idx}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                i === idx ? "w-5 bg-brand" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
