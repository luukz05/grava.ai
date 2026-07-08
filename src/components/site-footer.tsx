import Link from "next/link";
import { BrandMark, BTN_PRIMARY_SM } from "./wireframe";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./icons";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  SOCIALS,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from "@/lib/site";

const ICONS = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

function SocialRow() {
  return (
    <div className="mt-4 flex gap-2.5">
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="grid h-10 w-10 place-items-center rounded-full text-muted ring-1 ring-wire-line transition-colors hover:bg-brand hover:text-black hover:ring-brand"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-wire-line">
      <div className="shell grid gap-8 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Transformando ideias em produtos personalizados com Inteligência
            Artificial.
          </p>
          <Link href="/seja-um-franqueado" className={`${BTN_PRIMARY_SM} mt-5`}>
            Seja um franqueado
          </Link>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted">Navegação</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-foreground hover:text-brand">
                Início
              </Link>
            </li>
            <li>
              <Link href="/#sobre" className="text-foreground hover:text-brand">
                Quem somos
              </Link>
            </li>
            <li>
              <Link
                href="/seja-um-franqueado"
                className="text-foreground hover:text-brand"
              >
                Seja um franqueado
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted">
            Redes sociais
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground">
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                {WHATSAPP_NUMBER}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
          <SocialRow />
        </div>
      </div>

      <div className="border-t border-wire-line">
        <div className="shell flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-muted">
          <span>© GRAVA.AI 2026</span>
          <div className="flex gap-4">
            {/* [PLACEHOLDER] páginas legais */}
            <span className="hover:text-foreground">Política de Privacidade</span>
            <span className="hover:text-foreground">Termos de Uso</span>
            <span>Wireframe • protótipo interno</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
