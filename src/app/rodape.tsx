/* Rodapé das três páginas.

   Três andares, como um rodapé de produto e não como uma linha de créditos:

   1. a marca com a assinatura, à esquerda, e duas colunas de links à direita
      — "Navegar" (as páginas e âncoras que cada rota passa por `links`) e
      "Fale com a gente" (WhatsApp e Instagram, com o número e o @ visíveis, e
      não só o ícone: quem chega aqui já rolou a página inteira e quer o dado,
      não uma charada);
   2. um fio;
   3. a linha institucional: © de um lado, links legais do outro.

   A versão anterior era o bloco `footer` do 21st.dev adaptado: marca de 26px,
   dois círculos com ícone e os links numa fileira única empurrada para a
   direita. Em 1400px de largura sobrava um vazio no meio, a marca sumia em
   cima do fundo topográfico e os cinco links liam como uma frase, não como um
   menu. No celular a fileira quebrava em duas linhas desiguais.

   O que continua: sem Tailwind, sem shadcn; os ícones são autorais no traço
   1.5 do resto da página; `rel="noopener noreferrer"` em tudo que abre em
   nova aba. A fileira de links legais só renderiza quando há o que colocar
   nela — a rede não tem política de privacidade nem termos publicados, e
   apontar para uma página que não existe é pior do que não ter a linha. */

import Image from "next/image";
import Link from "next/link";
import { IcoWhatsApp, IcoInstagram } from "./icons";

export type LinkRodape = { href: string; rotulo: string };

const CONTATO = [
  {
    href: "https://wa.me/5515996610916",
    rotulo: "WhatsApp",
    valor: "(15) 99661-0916",
    Icone: IcoWhatsApp,
  },
  {
    href: "https://instagram.com/gravaaioficial",
    rotulo: "Instagram",
    valor: "@gravaaioficial",
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
      <div className="rodape-grade">
        <div className="rodape-marca-col">
          <Link className="rodape-marca" href="/" aria-label="GRAVA.AI, início">
            <Image
              src="/brand/grava-horizontal.png"
              alt=""
              width={420}
              height={96}
            />
          </Link>
          <p className="rodape-assinatura">{assinatura}</p>
        </div>

        <nav className="rodape-col" aria-labelledby="rodape-nav-titulo">
          <h2 id="rodape-nav-titulo" className="rodape-titulo mono">
            Navegar
          </h2>
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

        <div className="rodape-col" aria-labelledby="rodape-contato-titulo">
          <h2 id="rodape-contato-titulo" className="rodape-titulo mono">
            Fale com a gente
          </h2>
          <ul>
            {CONTATO.map((c) => (
              <li key={c.href}>
                <a
                  className="rodape-contato"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <c.Icone />
                  <span>
                    <span className="rodape-contato-rotulo">{c.rotulo}</span>
                    <span className="rodape-contato-valor">{c.valor}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rodape-base">
        <p className="rodape-copy">
          © {new Date().getFullYear()} GRAVA.AI · Todos os direitos reservados.
        </p>

        {legais.length > 0 ? (
          <ul className="rodape-legais">
            {legais.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.rotulo}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
