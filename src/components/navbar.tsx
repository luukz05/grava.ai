"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./wireframe";
import { WHATSAPP_LINK } from "@/lib/site";

// Navegação da página institucional (âncoras da Home).
const LINKS = [
  { href: "/#sobre", label: "Quem somos" },
  { href: "/#como-funciona", label: "O produto" },
  { href: "/#onde-atuamos", label: "Onde atuamos" },
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.13c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.35c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.24-8.05 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

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
