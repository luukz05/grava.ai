import { WHATSAPP_LINK } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Balão flutuante de WhatsApp no canto inferior direito.
 * Instiga o contato em todas as páginas (colocado no layout global).
 */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      {/* Balãozinho de texto (aparece no hover em telas médias+) */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-surface px-4 py-2 text-sm text-foreground opacity-0 shadow-lg ring-1 ring-wire-line/70 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Fale conosco no WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform group-hover:scale-105">
        {/* pulso sutil */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
