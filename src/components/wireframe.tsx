/**
 * Primitivos reutilizados pelas páginas.
 */
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

/** Foto real (next/image com fill). fit="contain" para PNG transparente. */
export function Photo({
  src,
  alt,
  className = "",
  fit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`wire-box flex items-center justify-center rounded-2xl text-xs uppercase tracking-wider text-muted ${className}`}
    >
      <span className="px-4 text-center">⊞ {label}</span>
    </div>
  );
}

export function Hexagon({ className = "" }: { className?: string }) {
  // Motivo gráfico da marca (favo de mel), desenhado leve em outline.
  return (
    <svg viewBox="0 0 100 115" className={className} aria-hidden>
      <polygon
        points="50,2 98,29 98,86 50,113 2,86 2,29"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  // Eyebrow sem borda: linha curta + rótulo. Composição integrada, sem caixa.
  return (
    <span className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brand">
      <span className="h-px w-8 bg-brand/50" />
      {children}
    </span>
  );
}

/**
 * Número-fantasma de capítulo: gigante, quase invisível, atrás do header.
 * Envolver o header em `relative isolate` (o número usa -z-10).
 */
export function GhostNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -left-1 -top-10 -z-10 select-none text-7xl font-bold leading-none tracking-tight text-white/[0.05] sm:-top-14 sm:text-8xl"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** Seta longa de CTA — assinatura dos links de ação (FA6). */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return <FaArrowRightLong aria-hidden className={`inline-block size-3.5 ${className}`} />;
}

/*
  Botões — pill sempre, com "press física" (active:scale) e transição de cor.
  Um botão brand por viewport; o resto é ghost/outline.
*/
export const BTN_BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm transition-[transform,background-color,box-shadow] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

export const BTN_PRIMARY = `${BTN_BASE} bg-brand px-7 py-3.5 font-semibold text-black hover:bg-brand-400`;

export const BTN_PRIMARY_SM = `${BTN_BASE} bg-brand px-5 py-2.5 font-medium text-black hover:bg-brand-400`;

export const BTN_GHOST = `${BTN_BASE} px-7 py-3.5 font-medium text-foreground ring-1 ring-wire-line hover:bg-white/5 hover:ring-brand`;

export const BTN_OUTLINE_BRAND = `${BTN_BASE} px-6 py-3 font-medium text-brand ring-1 ring-brand hover:bg-brand/10`;

/** Container largo para conteúdo dentro de faixas full-bleed. */
export function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`shell ${className}`}>{children}</div>;
}

export function BrandMark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  // Logo real: símbolo hexagonal (extraído do PDF) + wordmark.
  return (
    <span className={`flex items-center ${size === "sm" ? "gap-2" : "gap-2.5"} ${className}`}>
      <Image
        src="/logo-mark.png"
        alt="GRAVA.AI"
        width={271}
        height={321}
        className={size === "sm" ? "h-5.5 w-auto" : "h-7 w-auto"}
        priority
      />
      <span
        className={`font-bold tracking-tight text-brand ${size === "sm" ? "text-sm" : "text-lg"}`}
      >
        GRAVA.AI
      </span>
    </span>
  );
}
