import Image from "next/image"
import Link from "next/link"
import { FaCheck, FaPlus } from "react-icons/fa6"
import { ArrowIcon, Hexagon } from "./wireframe"
import { MODELOS } from "@/lib/site"

/**
 * Modelos de franquia em acordeão horizontal full-bleed (ver .card-accordion
 * no CSS). Desktop: 3 cards dividem a linha de ponta a ponta; hover expande o
 * alvo, colapsa os vizinhos e desliza um painel de detalhes pela direita.
 * Mobile: cards empilhados, tudo visível. Interação 100% CSS — sem JS.
 */
export function ProductModels() {
  return (
    <>
      <div className="card-accordion grid grid-cols-1 gap-3 md:flex md:h-[34rem] md:gap-1.5">
        {MODELOS.map((m) => (
          <article
            key={m.nome}
            className="card-accordion__item group/card relative min-h-[24rem] overflow-hidden rounded-2xl ring-1 ring-white/10 md:min-h-0 md:rounded-3xl"
          >
            {/* Fundo do card: imagem ou gradiente de marca */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-background" />
            {m.img ? (
              <Image
                src={m.img}
                alt={m.nome}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className={
                  m.fit === "contain"
                    ? "object-contain p-8"
                    : "object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
                }
              />
            ) : (
              <>
                <div className="noise-overlay absolute inset-0 opacity-25 mix-blend-overlay" />
                <Hexagon className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-brand/15" />
                <Hexagon className="pointer-events-none absolute -left-8 bottom-24 h-32 w-32 text-brand/10" />
              </>
            )}

            {/* Scrim para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent" />

            {/* Dica de expansão (só desktop, some no hover) */}
            <span className="absolute right-5 top-5 hidden size-8 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-opacity duration-300 group-hover/card:opacity-0 md:grid">
              <FaPlus className="size-3" aria-hidden />
            </span>

            {/* Camada de conteúdo: mobile empilha embaixo; desktop posiciona
                título (canto) e detalhes (painel à direita) em absoluto. */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:block md:p-0">
              {/* Tag */}
              <span className="inline-flex w-fit rounded-full bg-brand/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-100 ring-1 ring-brand/30 backdrop-blur-sm md:absolute md:left-8 md:top-8">
                {m.tag}
              </span>

              {/* Nome */}
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:absolute md:bottom-8 md:left-8 md:mt-0 md:max-w-[8rem] md:text-3xl">
                {m.nome}
              </h3>

              {/* Detalhes — painel que desliza pela direita no hover (desktop);
                  bloco estático visível no mobile. */}
              <div className="mt-4 md:absolute md:inset-y-0 md:right-0 md:mt-0 md:flex md:w-[27rem] md:max-w-[78%] md:translate-x-6 md:flex-col md:justify-center md:gap-1 md:bg-gradient-to-l md:from-black/90 md:via-black/70 md:to-transparent md:p-10 md:pl-20 md:opacity-0 md:transition-[transform,opacity] md:duration-500 md:ease-[var(--ease-brand)] group-hover/card:md:translate-x-0 group-hover/card:md:opacity-100">
                <p className="max-w-md text-pretty text-sm text-zinc-200">{m.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {m.destaques.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-zinc-100">
                      <FaCheck className="size-3 shrink-0 text-brand" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#formulario"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-[transform,background-color] duration-150 ease-out hover:bg-brand-400 active:scale-[0.97] motion-reduce:transition-none"
                >
                  Quero este modelo <ArrowIcon />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 hidden text-center text-xs text-muted md:block">
        Passe o mouse sobre um modelo para explorar os detalhes.
      </p>
    </>
  )
}
