/* Rodapé das três páginas.

   Estrutura do bloco `footer` do 21st.dev: marca à esquerda e canais em botões
   circulares à direita, um fio, e embaixo uma grade onde a assinatura fica na
   esquerda enquanto os links se alinham à direita. O que mudou na adaptação, e
   por quê:

   — sem Tailwind, sem shadcn, sem `class-variance-authority` e sem
     `@radix-ui/react-slot`: nenhum dos quatro existe neste projeto, e trazer o
     conjunto para um rodapé reescreveria o sistema visual da página;
   — sem `<Button variant="secondary" asChild>` nos canais: o círculo deles é o
     mesmo material da chave de tema da barra do topo, que já é o "botão de
     ícone" desta página. Dois desenhos diferentes para o mesmo papel seria
     inconsistência, não variedade;
   — a marca entra como lockup do manual, sem o nome repetido ao lado em texto:
     o arquivo do cliente já traz símbolo e wordmark desenhados juntos;
   — os ícones sociais são autorais, no traço 1.5 do resto da página, em vez de
     logos de biblioteca;
   — `rel="noopener noreferrer"` nos links externos, que o original esquece ao
     usar `target="_blank"`.

   A fileira de links legais existe mas só renderiza quando há o que colocar
   nela. Hoje não há: a rede não tem política de privacidade nem termos
   publicados, e apontar para uma página que não existe é pior do que não ter a
   linha. Quando existirem, entram sem tocar no layout. */

import Image from "next/image";
import Link from "next/link";
import { IcoWhatsApp, IcoInstagram } from "./icons";

export type LinkRodape = { href: string; rotulo: string };

const REDES = [
  {
    href: "https://wa.me/5515996610916",
    rotulo: "WhatsApp da GRAVA.AI",
    Icone: IcoWhatsApp,
  },
  {
    href: "https://instagram.com/gravaaioficial",
    rotulo: "Instagram da GRAVA.AI",
    Icone: IcoInstagram,
  },
];

export function Rodape({
  links,
  legais = [],
  assinatura = "Transformando ideias em produtos personalizados.",
}: {
  links: LinkRodape[];
  legais?: LinkRodape[];
  assinatura?: string;
}) {
  return (
    <div className="rodape">
      <div className="rodape-topo">
        <Link className="rodape-marca" href="/" aria-label="GRAVA.AI, início">
          <Image
            src="/brand/grava-horizontal.png"
            alt=""
            width={420}
            height={96}
          />
        </Link>

        <ul className="rodape-redes">
          {REDES.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.rotulo}
              >
                <r.Icone />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="rodape-grade">
        <nav className="rodape-nav" aria-label="Rodapé">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                {l.href.startsWith("#") ? (
                  <a href={l.href}>{l.rotulo}</a>
                ) : (
                  <Link href={l.href}>{l.rotulo}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {legais.length > 0 ? (
          <ul className="rodape-legais">
            {legais.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.rotulo}</Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="rodape-copy">
          <span>{assinatura}</span>
          <span>© GRAVA.AI 2026 · (15) 99661-0916</span>
        </div>
      </div>
    </div>
  );
}
