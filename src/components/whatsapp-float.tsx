import { WHATSAPP_LINK } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * CTA flutuante de WhatsApp — pill "Converse com um especialista" com o
 * símbolo do WhatsApp à direita. Fixo no canto inferior direito, respira
 * discretamente (halo verde) para chamar atenção sem incomodar.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Converse com um especialista no WhatsApp"
      className="fab-attention group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-brand py-3 pl-5 pr-4 text-sm font-semibold text-black shadow-lg shadow-black/30 transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97] motion-reduce:transition-none"
    >
      <span>Converse com um especialista</span>
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
    </a>
  );
}
