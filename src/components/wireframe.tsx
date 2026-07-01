/**
 * Primitivos reutilizados pelas páginas.
 */
import Image from "next/image";

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

export function BrandMark({ className = "" }: { className?: string }) {
  // Logo real: símbolo hexagonal (extraído do PDF) + wordmark.
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-mark.png"
        alt="GRAVA.AI"
        width={271}
        height={321}
        className="h-7 w-auto"
        priority
      />
      <span className="text-lg font-bold tracking-tight text-brand">GRAVA.AI</span>
    </span>
  );
}
