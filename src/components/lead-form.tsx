"use client";

import { useState } from "react";

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
  "w-full rounded-lg border border-wire-line bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-brand focus:outline-none";

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
        className="rounded-2xl border border-brand/40 bg-surface-2 p-6 text-center"
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
      className="rounded-2xl border border-wire-line bg-surface-2 p-6"
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
        className="mt-4 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-black"
      >
        {cta}
      </button>
    </form>
  );
}
