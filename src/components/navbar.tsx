"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark, BTN_BASE } from "./wireframe";
import { WhatsAppIcon } from "./icons";
import { WHATSAPP_LINK } from "@/lib/site";

// Navegação da página institucional (âncoras da Home).
const LINKS = [
  { href: "/#sobre", label: "Quem somos" },
  { href: "/#como-funciona", label: "O produto" },
  { href: "/#onde-atuamos", label: "Onde atuamos" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Modo campanha na LP: sem links de fuga, só logo + CTA + WhatsApp.
  const campaign = pathname.startsWith("/seja-um-franqueado");

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="shell relative flex h-12 items-center justify-between gap-4">
        <Link href="/" aria-label="GRAVA.AI — página inicial" onClick={() => setOpen(false)}>
          <BrandMark size="sm" />
        </Link>

        {/* Links centrais (desktop) — pequenos e discretos, estilo Apple */}
        {!campaign && (
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-muted transition-colors duration-150 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

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
            href={campaign ? "#formulario" : "/seja-um-franqueado"}
            className={`${BTN_BASE} hidden bg-brand px-4 py-1.5 text-xs font-medium text-black hover:bg-brand-400 sm:inline-flex`}
          >
            {campaign ? "Quero ser franqueado" : "Seja um franqueado"}
          </Link>

          {/* Hambúrguer (mobile, oculto em campanha) */}
          {!campaign && (
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
          )}
        </div>
      </nav>

      {/* Painel mobile — vidro sobre o fundo */}
      {!campaign && open && (
        <div className="glass border-t border-white/5 backdrop-blur-xl md:hidden">
          <ul className="shell flex flex-col py-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pb-2 pt-1">
              <Link
                href="/seja-um-franqueado"
                onClick={() => setOpen(false)}
                className={`${BTN_BASE} w-full bg-brand px-5 py-2.5 text-sm font-medium text-black hover:bg-brand-400`}
              >
                Seja um franqueado
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
