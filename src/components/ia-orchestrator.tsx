"use client"

// Diagrama de orquestração: dados entram pela esquerda, a IA GRAVA.AI
// processa no centro (hexágono), e as ações/gestões saem pela direita.

import { useId } from "react"

// ── Dimensões do canvas ───────────────────────────────────────────────────
const VW  = 860
const VH  = 500
const HCX = 430   // centro do hexágono X
const HCY = 250   // centro do hexágono Y
const HR  = 76    // circunraio do hexágono
const CONN_R = HR + 14  // raio do ponto de conexão (fora do hex)

// ── Dados ────────────────────────────────────────────────────────────────
const INPUTS = [
  { label: "Atendimento no Totem",  sub: "Cliente e arte criada com IA"  },
  { label: "Volume de Vendas",       sub: "Pedidos e ticket médio"        },
  { label: "Estoque em Tempo Real",  sub: "Matéria-prima e produtos"      },
]

const OUTPUTS = [
  { label: "Arte Gerada por IA",       sub: "Em segundos, no totem"           },
  { label: "Alerta de Reposição",      sub: "Estoque nunca zerado"            },
  { label: "Relatório de Desempenho",  sub: "KPIs sempre atualizados"         },
  { label: "CRM da Franquia",          sub: "Visão da matriz em tempo real"   },
  { label: "Suporte Automatizado",     sub: "Da matriz ao franqueado"         },
]

// ── Helpers ──────────────────────────────────────────────────────────────
function spread(count: number, cy: number, gap: number): number[] {
  const start = cy - ((count - 1) * gap) / 2
  return Array.from({ length: count }, (_, i) => start + i * gap)
}

// Ponto no limite do hex na direção de (tx, ty)
function hexEdge(tx: number, ty: number): [number, number] {
  const dx = tx - HCX
  const dy = ty - HCY
  const d  = Math.sqrt(dx * dx + dy * dy)
  return [HCX + (dx / d) * CONN_R, HCY + (dy / d) * CONN_R]
}

function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(" ")
}

// ── Posições dos nós ──────────────────────────────────────────────────────
const BW = 168   // largura da caixa
const BH = 54    // altura da caixa (inputs)
const BOH = 50   // altura da caixa (outputs)

const INP_CX = 84
const INP_YS = spread(3, HCY, 108)  // 3 inputs com gap de 108px

const OUT_CX = 776
const OUT_YS = spread(5, HCY, 80)   // 5 outputs com gap de 80px

// ── Sub-componente: caixa de nó ───────────────────────────────────────────
function NodeBox({
  cx, cy, w, h, label, sub, isOutput, delay,
}: {
  cx: number; cy: number; w: number; h: number
  label: string; sub: string; isOutput: boolean; delay: number
}) {
  const x   = cx - w / 2
  const y   = cy - h / 2
  const dot = isOutput ? x : x + w  // lado voltado ao centro

  return (
    <g>
      {/* Caixa */}
      <rect
        x={x} y={y} width={w} height={h} rx="9"
        fill={isOutput ? "rgba(59,165,232,0.07)" : "rgba(237,237,237,0.04)"}
        stroke={isOutput ? "rgba(59,165,232,0.32)" : "rgba(237,237,237,0.12)"}
        strokeWidth="0.8"
      />
      {/* Ponto de conexão */}
      <circle
        cx={dot} cy={cy} r={3.8}
        fill={isOutput ? "rgba(59,165,232,0.75)" : "rgba(237,237,237,0.4)"}
        style={{ animation: `dotPulse ${2.2 + delay * 0.4}s ease-in-out infinite ${delay}s` }}
      />
      {/* Textos */}
      <text
        x={isOutput ? x + 14 : x + w - 14}
        y={cy - 7}
        textAnchor={isOutput ? "start" : "end"}
        fill={isOutput ? "rgb(102,205,255)" : "rgb(210,210,210)"}
        fontSize="9.5"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={isOutput ? x + 14 : x + w - 14}
        y={cy + 9}
        textAnchor={isOutput ? "start" : "end"}
        fill="rgba(168,168,168,0.75)"
        fontSize="8"
      >
        {sub}
      </text>
    </g>
  )
}

// ── Componente principal ──────────────────────────────────────────────────
export function AIOrchestrator() {
  const uid = useId().replace(/:/g, "")
  const gradId  = `aiGlow-${uid}`
  const maskId  = `aiMask-${uid}`
  const inCls   = `ai-inp-${uid}`
  const outCls  = `ai-out-${uid}`

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagrama: a IA GRAVA.AI no centro de toda a operação da franquia"
    >
      <defs>
        {/* Brilho radial no centro */}
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgb(59,165,232)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(59,165,232)" stopOpacity="0"    />
        </radialGradient>
        {/* Máscara de fade para as linhas (some perto dos extremos) */}
        <linearGradient id={`${maskId}-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="18%"  stopColor="white" stopOpacity="1" />
          <stop offset="82%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Animações com scope por uid */}
        <style>{`
          .${inCls}  { stroke-dasharray: 5 12; animation: dashFlow 2.2s linear infinite; }
          .${outCls} { stroke-dasharray: 5 12; animation: dashFlow 2.2s linear infinite; }
        `}</style>
      </defs>

      {/* ── Fundo: brilho no centro ─────────────────────────────────── */}
      <circle
        cx={HCX} cy={HCY} r={170}
        fill={`url(#${gradId})`}
        style={{ animation: "glowPulse 4s ease-in-out infinite" }}
      />

      {/* ── Linhas estáticas de base ────────────────────────────────── */}
      {INPUTS.map((inp, i) => {
        const [ex, ey] = hexEdge(INP_CX, INP_YS[i])
        return (
          <line
            key={`s-in-${i}`}
            x1={INP_CX} y1={INP_YS[i]}
            x2={ex}     y2={ey}
            stroke="rgba(237,237,237,0.06)" strokeWidth="1"
          />
        )
      })}
      {OUTPUTS.map((out, i) => {
        const [ex, ey] = hexEdge(OUT_CX, OUT_YS[i])
        return (
          <line
            key={`s-out-${i}`}
            x1={ex}     y1={ey}
            x2={OUT_CX} y2={OUT_YS[i]}
            stroke="rgba(59,165,232,0.07)" strokeWidth="1"
          />
        )
      })}

      {/* ── Linhas tracejadas animadas (inputs → centro) ────────────── */}
      {INPUTS.map((inp, i) => {
        const [ex, ey] = hexEdge(INP_CX, INP_YS[i])
        return (
          <line
            key={`d-in-${i}`}
            x1={INP_CX} y1={INP_YS[i]}
            x2={ex}     y2={ey}
            stroke="rgba(200,200,200,0.28)"
            strokeWidth="1"
            className={inCls}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        )
      })}

      {/* ── Linhas tracejadas animadas (centro → outputs) ───────────── */}
      {OUTPUTS.map((out, i) => {
        const [ex, ey] = hexEdge(OUT_CX, OUT_YS[i])
        return (
          <line
            key={`d-out-${i}`}
            x1={ex}     y1={ey}
            x2={OUT_CX} y2={OUT_YS[i]}
            stroke="rgba(59,165,232,0.5)"
            strokeWidth="1"
            className={outCls}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        )
      })}

      {/* ── Hexágono central ────────────────────────────────────────── */}
      {/* Anel externo decorativo */}
      <polygon
        points={hexPts(HCX, HCY, HR + 22)}
        fill="none"
        stroke="rgba(59,165,232,0.1)"
        strokeWidth="1"
        strokeDasharray="3 8"
        style={{ animation: "glowPulse 6s ease-in-out infinite" }}
      />
      {/* Hexágono principal */}
      <polygon
        points={hexPts(HCX, HCY, HR)}
        fill="rgba(59,165,232,0.09)"
        stroke="rgba(59,165,232,0.65)"
        strokeWidth="1.75"
      />
      {/* Hexágono interno (double border effect) */}
      <polygon
        points={hexPts(HCX, HCY, HR - 18)}
        fill="none"
        stroke="rgba(59,165,232,0.22)"
        strokeWidth="0.75"
        strokeDasharray="3 6"
      />

      {/* Wordmark */}
      <text
        x={HCX} y={HCY - 18}
        textAnchor="middle"
        fill="rgb(59,165,232)"
        fontSize="16" fontWeight="700" letterSpacing="2.5"
      >
        GRAVA
      </text>
      <text
        x={HCX} y={HCY + 4}
        textAnchor="middle"
        fill="rgb(59,165,232)"
        fontSize="16" fontWeight="700" letterSpacing="2.5"
      >
        .AI
      </text>
      <text
        x={HCX} y={HCY + 24}
        textAnchor="middle"
        fill="rgba(102,205,255,0.5)"
        fontSize="6.5" letterSpacing="3.5"
      >
        INTELIGÊNCIA ARTIFICIAL
      </text>

      {/* ── Rótulos das colunas ─────────────────────────────────────── */}
      <text x={INP_CX} y={40} textAnchor="middle" fill="rgba(237,237,237,0.25)" fontSize="7.5" letterSpacing="3">
        DADOS DE ENTRADA
      </text>
      <line x1={INP_CX - 68} y1={47} x2={INP_CX + 68} y2={47} stroke="rgba(237,237,237,0.08)" strokeWidth="0.5" />

      <text x={OUT_CX} y={40} textAnchor="middle" fill="rgba(59,165,232,0.45)" fontSize="7.5" letterSpacing="3">
        GESTÃO E SAÍDA
      </text>
      <line x1={OUT_CX - 68} y1={47} x2={OUT_CX + 68} y2={47} stroke="rgba(59,165,232,0.15)" strokeWidth="0.5" />

      {/* ── Caixas de nó ────────────────────────────────────────────── */}
      {INPUTS.map((inp, i) => (
        <NodeBox
          key={inp.label}
          cx={INP_CX} cy={INP_YS[i]}
          w={BW} h={BH}
          label={inp.label} sub={inp.sub}
          isOutput={false}
          delay={i * 0.45}
        />
      ))}
      {OUTPUTS.map((out, i) => (
        <NodeBox
          key={out.label}
          cx={OUT_CX} cy={OUT_YS[i]}
          w={BW} h={BOH}
          label={out.label} sub={out.sub}
          isOutput={true}
          delay={i * 0.3}
        />
      ))}
    </svg>
  )
}
