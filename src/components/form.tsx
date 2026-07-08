"use client"

// Primitivos de formulário 100% custom — nada nativo do browser/OS aparece.
// Field: input de texto estilizado. Select: listbox em JS (não usa <select>,
// então não há chevron nem lista do sistema). Checkbox: input real (semântica
// e acessibilidade) com visual desenhado pela marca.

import {
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react"
import { FaCheck, FaChevronDown } from "react-icons/fa6"

// Anel + fundo compartilhados por todos os controles
const CONTROL =
  "w-full rounded-lg bg-background px-4 py-2.5 text-sm text-foreground ring-1 ring-wire-line transition-[box-shadow,color] duration-150 outline-none focus:ring-2 focus:ring-brand"

// ── Field (input de texto) ────────────────────────────────────────────────
export function Field({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`${CONTROL} placeholder:text-muted/70 ${className}`}
      {...props}
    />
  )
}

// ── Select (listbox custom) ───────────────────────────────────────────────
export function Select({
  options,
  placeholder,
  name,
  required = false,
  className = "",
}: {
  options: readonly string[]
  placeholder: string
  name?: string
  required?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const uid = useId().replace(/:/g, "")

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [open])

  // Mantém a opção ativa visível na rolagem do painel
  useEffect(() => {
    if (open && active >= 0) {
      listRef.current?.children[active]?.scrollIntoView({ block: "nearest" })
    }
  }, [open, active])

  function choose(i: number) {
    setValue(options[i])
    setActive(i)
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        setActive((a) => (a < 0 ? 0 : a))
        return
      }
      setActive((a) => {
        const next = e.key === "ArrowDown" ? a + 1 : a - 1
        return Math.max(0, Math.min(options.length - 1, next))
      })
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (!open) setOpen(true)
      else if (active >= 0) choose(active)
    } else if (e.key === "Escape") {
      setOpen(false)
    } else if (e.key === "Tab") {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${uid}-list`}
        aria-activedescendant={active >= 0 ? `${uid}-opt-${active}` : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`${CONTROL} flex items-center justify-between gap-2 text-left ${
          open ? "ring-2 ring-brand" : ""
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted/70"}>
          {value || placeholder}
        </span>
        <FaChevronDown
          aria-hidden
          className={`size-3 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${uid}-list`}
          role="listbox"
          className="glass absolute left-0 right-0 top-full z-20 mt-2 max-h-56 overflow-auto rounded-lg p-1 ring-1 ring-wire-line backdrop-blur-xl"
        >
          {options.map((opt, i) => {
            const selected = opt === value
            return (
              <li
                key={opt}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active === i ? "bg-brand/15 text-foreground" : "text-muted"
                }`}
              >
                {opt}
                {selected && <FaCheck className="size-3 text-brand" aria-hidden />}
              </li>
            )
          })}
        </ul>
      )}

      {/* Valor real submetido no form */}
      <input type="hidden" name={name} value={value} required={required} />
    </div>
  )
}

// ── Checkbox (input real, visual da marca) ────────────────────────────────
export function Checkbox({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-xs text-muted">
      <span className="relative mt-0.5 grid size-4 shrink-0 place-items-center">
        <input
          type="checkbox"
          className="peer size-4 cursor-pointer appearance-none rounded-[5px] bg-background ring-1 ring-wire-line outline-none transition-[background-color,box-shadow] duration-150 checked:bg-brand checked:ring-brand focus-visible:ring-2 focus-visible:ring-brand/60"
          {...props}
        />
        <FaCheck
          aria-hidden
          className="pointer-events-none absolute size-2.5 scale-0 text-black opacity-0 transition duration-150 peer-checked:scale-100 peer-checked:opacity-100"
        />
      </span>
      <span>{children}</span>
    </label>
  )
}
