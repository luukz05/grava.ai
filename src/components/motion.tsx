"use client"

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react"

// ── prefers-reduced-motion ───────────────────────────────────────────────────
// Movimento é acabamento, nunca barreira. SSR assume "com movimento" (false).
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  )
}

// ── Reveal ───────────────────────────────────────────────────────────────────
// Scroll-triggered reveal. Fires once, stays visible.
// Distâncias curtas de propósito (16/12px) — o movimento sugere, não desloca.
// A direção carrega significado: "left"/"right" = de onde o conteúdo vem;
// "scale" = nasce no lugar (nós centrais, destaques).
export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode
  className?: string
  delay?: number
  from?: "bottom" | "left" | "right" | "scale"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const reduced = usePrefersReducedMotion()
  const visible = inView || reduced

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  const base: CSSProperties = reduced
    ? {}
    : {
        transition: `opacity 0.6s var(--ease-brand), transform 0.6s var(--ease-brand)`,
        transitionDelay: `${delay}ms`,
      }

  const hidden: CSSProperties = {
    ...base,
    opacity: 0,
    transform:
      from === "bottom" ? "translateY(16px)"
      : from === "left"  ? "translateX(-12px)"
      : from === "right" ? "translateX(12px)"
      : "scale(0.95)",
  }

  const shown: CSSProperties = { ...base, opacity: 1, transform: "none" }

  return (
    <div ref={ref} className={className} style={visible ? shown : hidden}>
      {children}
    </div>
  )
}

// ── useInView ────────────────────────────────────────────────────────────────
// Observa um container e devolve visibilidade (uma vez). Para componentes que
// coreografam a própria entrada (ex.: AIOrchestrator).
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, reduced])

  return { ref, visible: inView || reduced }
}

// ── HexMesh ──────────────────────────────────────────────────────────────────
// Animated hex-grid background overlay.
// Uses SVG <pattern> for tiling + a few pulsing accent hexes.
// IDs are scoped via useId() so multiple instances don't collide.

function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(" ")
}

// Glow hex positions in a 1400×700 viewport
const GLOW: Array<{ cx: number; cy: number; d: number }> = [
  { cx: 140, cy: 155, d: 0 },
  { cx: 420, cy: 85,  d: 1.4 },
  { cx: 255, cy: 300, d: 2.8 },
  { cx: 570, cy: 210, d: 0.7 },
  { cx: 75,  cy: 370, d: 2.1 },
  { cx: 700, cy: 135, d: 3.5 },
  { cx: 345, cy: 430, d: 1.8 },
]

export function HexMesh({
  className = "",
  gradientPos = "40% 35%",
}: {
  className?: string
  gradientPos?: string
}) {
  const uid = useId().replace(/:/g, "")
  const pId = `hg-${uid}`   // pattern
  const gId = `hf-${uid}`   // gradient
  const mId = `hm-${uid}`   // mask

  // Pattern math (verified):
  // Pointy-top hex, circumradius R=46.8 (= 26×1.8)
  // Width W = 2·R·sin(60°) = 81,  Half-height = R = 46.8
  // Tile: 81 × 140.4  (W × 3R)
  //   Hex-1 center (40.5, 46.8): top at y=0, bottom at y=93.6
  //   Hex-2 center (0, 117):  offset row, clips on left & bottom → tiles in from adjacent copies
  //   Hex-3 center (81, 117): offset row, clips on right & bottom → tiles in from adjacent copies
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden text-brand ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1400 700"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={pId} x="0" y="0" width="81" height="140.4" patternUnits="userSpaceOnUse">
            <polygon
              points="40.5,0 81,23.4 81,70.2 40.5,93.6 0,70.2 0,23.4"
              fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.14"
            />
            <polygon
              points="0,70.2 40.5,93.6 40.5,140.4 0,163.8 -40.5,140.4 -40.5,93.6"
              fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.14"
            />
            <polygon
              points="81,70.2 121.5,93.6 121.5,140.4 81,163.8 40.5,140.4 40.5,93.6"
              fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.14"
            />
          </pattern>

          <radialGradient id={gId} cx={gradientPos.split(" ")[0]} cy={gradientPos.split(" ")[1]} r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="80%"  stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={mId}>
            <rect width="100%" height="100%" fill={`url(#${gId})`} />
          </mask>
        </defs>

        {/* Static tiling mesh */}
        <rect width="100%" height="100%" fill={`url(#${pId})`} mask={`url(#${mId})`} />

        {/* Pulsing accent hexagons */}
        {GLOW.map((h, i) => (
          <polygon
            key={i}
            points={hexPts(h.cx, h.cy, 46)}
            fill="currentColor"
            fillOpacity={0}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity={0}
            style={{ animation: `hexGlow 5s ease-in-out infinite ${h.d}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

// ── FloatingHex ───────────────────────────────────────────────────────────────
// A single large decorative hex that bobs up/down continuously.
export function FloatingHex({
  size = 320,
  className = "",
  delay = 0,
}: {
  size?: number
  className?: string
  delay?: number
}) {
  const r = size / 2
  const pts = hexPts(r, r, r - 2)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none ${className}`}
      aria-hidden
      style={{ animation: `floatY 6s ease-in-out infinite ${delay}s` }}
    >
      <polygon
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.18"
      />
      <polygon
        points={hexPts(r, r, r - 14)}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.08"
      />
    </svg>
  )
}
