"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark, BTN_BASE } from "./wireframe";
import { WhatsAppIcon } from "./icons";
import { WHATSAPP_LINK } from "@/lib/site";

type NavLink = { href: string; id: string; label: string };

// Âncoras internas de cada página (sem fuga para fora do site).
const HOME_LINKS: NavLink[] = [
  { href: "/#sobre", id: "sobre", label: "Quem somos" },
  { href: "/#como-funciona", id: "como-funciona", label: "O produto" },
  { href: "/#onde-atuamos", id: "onde-atuamos", label: "Onde atuamos" },
];

const FRANQUIA_LINKS: NavLink[] = [
  { href: "#por-que", id: "por-que", label: "Por que" },
  { href: "#modelos", id: "modelos", label: "Modelos" },
  { href: "#como-funciona", id: "como-funciona", label: "Como funciona" },
  { href: "#investimento", id: "investimento", label: "Investimento" },
  { href: "#duvidas", id: "duvidas", label: "Dúvidas" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const franquia = pathname.startsWith("/seja-um-franqueado");
  const links = franquia ? FRANQUIA_LINKS : HOME_LINKS;
  const cta = franquia
    ? { href: "#formulario", label: "Quero ser franqueado" }
    : { href: "/seja-um-franqueado", label: "Seja um franqueado" };

  const [activeId, setActiveId] = useState("");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });

  // Scroll-spy contínuo: a seção ativa é a última cujo topo já passou a linha
  // de leitura (~35% da viewport). Assim cada seção fica ativa o trecho todo e
  // a barra desliza de um link para o outro na transição — nunca some no meio.
  useEffect(() => {
    const current = pathname.startsWith("/seja-um-franqueado")
      ? FRANQUIA_LINKS
      : HOME_LINKS;
    const ids = current.map((l) => l.id);
    let raf = 0;

    function compute() {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let idx = 0; // no topo (antes da 1ª seção) fica no primeiro link
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      }
      setActiveId(ids[idx] ?? "");
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(compute);
    }

    raf = requestAnimationFrame(compute); // medição inicial (fora do corpo do efeito)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Posiciona a linha sob o link ativo (desliza entre eles a cada troca).
  useEffect(() => {
    function place() {
      const el = activeId ? linkRefs.current[activeId] : null;
      if (el) {
        setUnderline({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
      } else {
        setUnderline((u) => ({ ...u, opacity: 0 }));
      }
    }
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeId, pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="shell relative flex h-12 items-center justify-between gap-4">
        <Link href="/" aria-label="GRAVA.AI — página inicial" onClick={() => setOpen(false)}>
          <BrandMark size="sm" />
        </Link>

        {/* Links centrais (desktop) com indicador de seção ativa */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {links.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.id] = el;
                  }}
                  onClick={() => setActiveId(link.id)}
                  aria-current={active ? "true" : undefined}
                  className={`text-[13px] transition-colors duration-150 ${
                    active ? "text-brand" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          {/* Linha da marca deslizando sob a seção ativa */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-2 h-0.5 rounded-full bg-brand transition-[left,width,opacity] duration-300"
            style={{
              left: underline.left,
              width: underline.width,
              opacity: underline.opacity,
              transitionTimingFunction: "var(--ease-brand)",
            }}
          />
        </ul>

        {/* Ações (direita) */}
        <div className="flex items-center gap-1.5">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="relative grid h-8 w-8 place-items-center rounded-full text-muted transition-[transform,background-color,color] duration-150 ease-out hover:bg-white/10 hover:text-foreground active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <span className="absolute -inset-1.5" aria-hidden />
            <WhatsAppIcon className="h-4 w-4" />
          </a>
          <Link
            href={cta.href}
            className={`${BTN_BASE} hidden bg-brand px-4 py-1.5 text-xs font-medium text-black hover:bg-brand-400 sm:inline-flex`}
          >
            {cta.label}
          </Link>

          {/* Hambúrguer (mobile) */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full transition-colors duration-150 hover:bg-white/10 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-foreground transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] h-0.5 w-4 bg-foreground transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-4 bg-foreground transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Painel mobile — vidro sobre o fundo */}
      {open && (
        <div className="glass border-t border-white/5 backdrop-blur-xl md:hidden">
          <ul className="shell flex flex-col py-2">
            {links.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveId(link.id);
                      setOpen(false);
                    }}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center gap-2.5 py-3 transition-colors ${
                      active ? "text-brand" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-4 w-0.5 rounded-full bg-brand transition-opacity ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pb-2 pt-1">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className={`${BTN_BASE} w-full bg-brand px-5 py-2.5 text-sm font-medium text-black hover:bg-brand-400`}
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
