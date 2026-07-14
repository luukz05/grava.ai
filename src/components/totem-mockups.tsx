/**
 * Mockups do totem em operação — as três telas que o cliente vê, reconstruídas
 * em HTML/SVG (nunca screenshot): nítidas em qualquer DPI, tematizam com o dark
 * e podem ser animadas por partes.
 *
 * Regras seguidas (docs/auditoria-ui-ux-fsk-tax.md §4):
 *  - header do mockup: icon-chip + nome da tela + contexto à direita;
 *  - rodapé obrigatório "Exemplo ilustrativo" — a honestidade é parte da estética;
 *  - dados falsos, porém plausíveis (o "Theo" é o mesmo nome gravado no hero);
 *  - números em `tabular-nums` (não dançam ao mudar);
 *  - cores funcionais (âmbar = processando, esmeralda = pronto) vivem SÓ aqui
 *    dentro — fora dos mockups a paleta é só a da marca.
 */
import type { ReactNode } from "react"
import { FEATURE_ICONS, type FeatureIconName } from "./icons"
import { EngraveName, KeychainHex, Tumbler } from "./product-showcase"

/** Moldura comum das três telas — a repetição é o que dá coesão. */
function Screen({
  icon,
  title,
  context,
  children,
}: {
  icon: FeatureIconName
  title: string
  context: string
  children: ReactNode
}) {
  const Icon = FEATURE_ICONS[icon]
  return (
    <div className="glass-deep flex h-full flex-col rounded-2xl p-4 ring-1 ring-white/10 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
          <Icon className="size-3.5" aria-hidden />
        </span>
        <span className="truncate text-sm font-semibold">{title}</span>
        <span className="ml-auto shrink-0 text-xs text-muted">{context}</span>
      </div>

      <div className="flex-1 py-4">{children}</div>

      <p className="text-[0.65rem] text-muted/70">Exemplo ilustrativo</p>
    </div>
  )
}

/** Linha de <dl> — chave à esquerda, valor à direita (semântica de par). */
function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <dt className="shrink-0 text-muted">{k}</dt>
      <dd className="truncate text-right text-foreground">{v}</dd>
    </div>
  )
}

// ── Passo 1 — a arte nasce no totem ─────────────────────────────────────────

/** Miniatura de arte gerada: hexágonos da marca em arranjos diferentes. */
function ArtTile({ variant }: { variant: 0 | 1 | 2 | 3 }) {
  const pts = "18,2 32,10 32,26 18,34 4,26 4,10"
  return (
    <svg viewBox="0 0 36 36" className="size-full text-brand" aria-hidden>
      {variant === 0 && (
        <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      )}
      {variant === 1 && (
        <>
          <polygon points={pts} fill="currentColor" opacity="0.16" />
          <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text
            x="18"
            y="21"
            textAnchor="middle"
            fill="currentColor"
            fontSize="8"
            fontWeight="700"
          >
            T
          </text>
        </>
      )}
      {variant === 2 && (
        <>
          <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <polygon
            points="18,8 27,13 27,23 18,28 9,23 9,13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.8"
          />
        </>
      )}
      {variant === 3 && (
        <>
          <polygon points="12,6 20,10 20,20 12,24 4,20 4,10" fill="currentColor" opacity="0.2" />
          <polygon
            points="24,12 32,16 32,26 24,30 16,26 16,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </>
      )}
    </svg>
  )
}

export function MockCriar() {
  const estilos = ["Minimalista", "Geométrico", "Divertido"]
  return (
    <Screen icon="sparkles" title="Criação com IA" context="Totem · em uso">
      {/* O pedido do cliente, como ele digita/fala */}
      <div className="rounded-xl bg-white/5 px-3.5 py-2.5 ring-1 ring-white/10">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          O que você quer gravar?
        </p>
        <p className="mt-1.5 text-sm">
          um favo de mel com o nome{" "}
          <span className="font-semibold text-brand">Theo</span>
        </p>
      </div>

      {/* Estilo escolhido (o do meio) */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {estilos.map((e, i) => (
          <span
            key={e}
            className={`rounded-full px-2.5 py-1 text-[0.7rem] ring-1 ${
              i === 1
                ? "bg-brand/15 text-brand ring-brand/40"
                : "text-muted ring-white/10"
            }`}
          >
            {e}
          </span>
        ))}
      </div>

      {/* As artes que a IA devolveu — a 2ª está selecionada */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {([0, 1, 2, 3] as const).map((v) => (
          <div
            key={v}
            className={`grid aspect-square place-items-center rounded-lg bg-white/[0.03] p-2 ring-1 ${
              v === 1 ? "ring-brand" : "ring-white/10"
            }`}
          >
            <ArtTile variant={v} />
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">
        4 artes em <span className="tabular-nums text-foreground">3,2 s</span> — sem
        designer, sem espera.
      </p>
    </Screen>
  )
}

// ── Passo 2 — a gravação acontece na frente do cliente ──────────────────────

export function MockGravar() {
  return (
    <Screen icon="bolt" title="Gravação" context="Totem · em andamento">
      <div className="flex items-center gap-4">
        <Tumbler
          base="#2b6f9e"
          engraving={<EngraveName name="Theo" color="#d5eaf7" />}
          className="h-32 w-auto shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="dot-pulse size-1.5 shrink-0 rounded-full bg-amber-400" />
            <span className="text-xs text-amber-300">Gravando</span>
            <span className="ml-auto text-xs tabular-nums text-muted">00:42</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-brand" style={{ width: "68%" }} />
          </div>

          <dl className="mt-3 divide-y divide-white/10 text-xs">
            <Spec k="Produto" v="Copo 500 ml" />
            <Spec k="Gravação" v="Laser · 0,3 mm" />
            <Spec k="Arte" v="Favo · nome Theo" />
          </dl>
        </div>
      </div>
    </Screen>
  )
}

// ── Passo 3 — o cliente leva a peça (e a história) ──────────────────────────

export function MockPronto() {
  return (
    <Screen icon="gift" title="Pedido pronto" context="#1042">
      <div className="flex items-center gap-4">
        <KeychainHex
          base="#b9bec4"
          engraving={<EngraveName name="Theo" color="#565b62" />}
          className="h-32 w-auto shrink-0"
        />

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.7rem] text-emerald-300 ring-1 ring-emerald-400/30">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Pronto para retirada
          </span>

          <dl className="mt-3 divide-y divide-white/10 text-xs">
            <Spec k="Peça" v="Chaveiro hexagonal" />
            <Spec k="Exemplares" v="1 (único)" />
            <Spec k="Do toque à entrega" v="4 min" />
          </dl>
        </div>
      </div>
    </Screen>
  )
}

/** Na ordem dos PASSOS de `lib/site.ts`. */
export const TOTEM_MOCKS = [MockCriar, MockGravar, MockPronto]
