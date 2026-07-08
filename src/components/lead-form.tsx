"use client";

import { useState } from "react";
import { BTN_BASE } from "./wireframe";

/**
 * Formulário de captura de lead (wireframe — sem backend).
 * variant="short": hero (baixa fricção). variant="full": qualificação completa.
 * Campos UTM são capturados ocultos para atribuição de mídia paga.
 */
const UF = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
  "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const inputClass =
  "w-full rounded-lg bg-background px-4 py-2.5 text-sm text-foreground ring-1 ring-wire-line placeholder:text-muted/70 transition-shadow duration-150 focus:outline-none focus:ring-brand";

export function LeadForm({
  variant = "short",
  id,
  title = "Quero ser franqueado",
  subtitle = "Fale com um especialista e descubra se seu perfil combina com a franquia.",
  cta = "Quero ser franqueado",
}: {
  variant?: "short" | "full";
  id?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        id={id}
        className="animate-scale-in rounded-2xl bg-surface-2 p-6 text-center ring-1 ring-brand/40"
      >
        <p className="text-lg font-semibold text-brand">Recebemos seu contato!</p>
        <p className="mt-2 text-sm text-muted">
          Em breve um especialista vai falar com você. (Wireframe — sem envio
          real.)
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl bg-surface-2 p-6 ring-1 ring-wire-line"
    >
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand">
        {title}
      </p>
      <p className="mb-4 text-xs text-muted">{subtitle}</p>

      <div className="space-y-3">
        <input className={inputClass} placeholder="Nome completo" required />
        <input
          className={inputClass}
          placeholder="WhatsApp / Celular"
          type="tel"
          required
        />

        {variant === "full" && (
          <input
            className={inputClass}
            placeholder="E-mail"
            type="email"
            required
          />
        )}

        <div className="flex gap-3">
          <select className={`${inputClass} w-24`} defaultValue="" required>
            <option value="" disabled>
              UF
            </option>
            {UF.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          <input className={inputClass} placeholder="Cidade" required />
        </div>

        {variant === "full" && (
          <>
            <select className={inputClass} defaultValue="" required>
              <option value="" disabled>
                Capital disponível para investir
              </option>
              <option>Até R$ 100 mil</option>
              <option>R$ 100 mil a R$ 200 mil</option>
              <option>Acima de R$ 200 mil</option>
            </select>
            <select className={inputClass} defaultValue="" required>
              <option value="" disabled>
                Quando pretende começar?
              </option>
              <option>Imediatamente</option>
              <option>Em até 3 meses</option>
              <option>Em 6 meses ou mais</option>
            </select>
          </>
        )}

        <label className="flex items-start gap-2 text-xs text-muted">
          <input type="checkbox" required className="mt-0.5" />
          <span>
            Autorizo o contato e o tratamento dos meus dados conforme a Política
            de Privacidade (LGPD).
          </span>
        </label>

        {/* Campos UTM ocultos para atribuição de tráfego pago */}
        <input type="hidden" name="utm_source" />
        <input type="hidden" name="utm_medium" />
        <input type="hidden" name="utm_campaign" />
        <input type="hidden" name="utm_term" />
        <input type="hidden" name="utm_content" />
      </div>

      <button
        type="submit"
        className={`${BTN_BASE} mt-4 w-full bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-400`}
      >
        {cta}
      </button>
    </form>
  );
}
