import { FAQ as ITEMS } from "@/lib/site";

/**
 * FAQ em acordeão nativo (<details>) — sem JS, bom para performance/SEO.
 * As perguntas também podem virar JSON-LD FAQPage numa próxima etapa.
 */
export function Faq() {
  return (
    <div className="mt-10 divide-y divide-wire-line/60 border-y border-wire-line/60">
      {ITEMS.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
            {item.q}
            <span className="text-2xl text-brand transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
