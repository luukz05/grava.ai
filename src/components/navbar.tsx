"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./wireframe";
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
    <header className="sticky top-0 z-50 border-b border-wire-line/60 bg-background/80 backdrop-blur-md">
      <nav className="shell relative flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="GRAVA.AI — página inicial" onClick={() => setOpen(false)}>
          <BrandMark />
        </Link>

        {/* Links centrais (desktop) */}
        {!campaign && (
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Ações (direita) */}
        <div className="flex items-center gap-2.5">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-full text-brand ring-1 ring-brand/60 transition-colors hover:bg-brand/10"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
          <Link
            href={campaign ? "#formulario" : "/seja-um-franqueado"}
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-black sm:inline-block"
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
              className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-wire-line md:hidden"
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

      {/* Painel mobile */}
      {!campaign && open && (
        <div className="border-t border-wire-line/60 bg-background md:hidden">
          <ul className="shell flex flex-col py-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pb-2 pt-1">
              <Link
                href="/seja-um-franqueado"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-medium text-black"
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
