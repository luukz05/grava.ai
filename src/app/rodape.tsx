/* Rodapé das três páginas.

   Estrutura do bloco `footer-section` do 21st.dev, adaptada ao sistema desta
   página: quatro colunas numa grade — a chamada com um mini-formulário de
   e-mail, os links de navegação, os contatos e os canais em botões redondos —
   e embaixo, depois de um fio, a linha institucional com o © de um lado e os
   links legais do outro.

   O que mudou na adaptação, e por quê:

   — sem Tailwind, sem shadcn, sem `class-variance-authority` e sem os quatro
     pacotes Radix (slot, label, switch, tooltip): nenhum deles existe neste
     projeto, e trazer o conjunto para um rodapé reescreveria o sistema visual
     da página. O que os componentes faziam, o CSS de `.rodape*` faz;
   — o formulário de "newsletter" virou a porta do FORMULÁRIO DE VERDADE: a
     rede não tem newsletter, e uma caixa de e-mail que não leva a nada é
     promessa vazia. Aqui o e-mail vai por GET para `/seja-franqueado#falar`, e
     o formulário de lá já nasce com ele preenchido (ver `form-franqueado.tsx`).
     É um `<form>` puro, sem script: funciona antes de o JS carregar;
   — a coluna de contato não inventa endereço: a rede publicou WhatsApp e
     Instagram, e é isso que aparece, com o número e o @ visíveis — quem chega
     aqui já rolou a página inteira e quer o dado, não uma charada;
   — os botões redondos de "Siga a gente" têm os DOIS canais da rede, e não os
     quatro do original (Facebook, Twitter, LinkedIn não existem);
   — a dica de cada botão é o `title` nativo, e não um Tooltip do Radix: é
     texto de apoio a um ícone rotulado por `aria-label`, não conteúdo;
   — a chave de tema claro/escuro SAIU: o site é escuro por decisão de marca
     (ver `fsk-design-system.md`), e uma chave que não muda nada é pior que
     nenhuma;
   — os ícones são do pacote da página, no traço 1.5 do resto, e não Lucide;
   — `rel="noopener noreferrer"` nos links externos, que o original esquece ao
     usar `target="_blank"`.

   A fileira de links legais só renderiza quando há o que colocar nela — a rede
   não tem política de privacidade nem termos publicados, e apontar para uma
   página que não existe é pior do que não ter a linha. */

import Link from "next/link";
import { IcoEnviar, IcoInstagram, IcoWhatsApp } from "./icons";

export type LinkRodape = { href: string; rotulo: string };

const CONTATO = [
  {
    href: "https://wa.me/5515996610916",
    rotulo: "WhatsApp",
    valor: "(15) 99661-0916",
    dica: "Chamar no WhatsApp",
    Icone: IcoWhatsApp,
  },
  {
    href: "https://instagram.com/gravaaioficial",
    rotulo: "Instagram",
    valor: "@gravaaioficial",
    dica: "Seguir no Instagram",
    Icone: IcoInstagram,
  },
];

export function Rodape({
  links,
  legais = [],
  assinatura = "Deixe o e-mail e receba a apresentação da franquia.",
}: {
  links: LinkRodape[];
  legais?: LinkRodape[];
  /* O parágrafo embaixo da chamada. */
  assinatura?: string;
}) {
  return (
    <div className="rodape">
      <div className="rodape-grade">
        {/* A CHAMADA. O título grande, o apoio e a caixa de e-mail — que é a
            entrada do formulário da landing, não uma newsletter. O brilho
            desfocado no canto é o `::after` da coluna. */}
        <div className="rodape-col rodape-col--chamada">
          <h2 className="rodape-chamada">Leve a GRAVA.AI para a sua região.</h2>
          <p className="rodape-apoio">{assinatura}</p>
          <form className="rodape-form" action="/seja-franqueado#falar" method="get">
            <label htmlFor="rodape-email" className="sr">
              Seu e-mail
            </label>
            <input
              id="rodape-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Seu e-mail"
              required
            />
            <button type="submit" className="rodape-enviar" aria-label="Continuar">
              <IcoEnviar />
            </button>
          </form>
        </div>

        <nav className="rodape-col" aria-labelledby="rodape-nav-titulo">
          <h3 id="rodape-nav-titulo" className="rodape-titulo">
            Navegar
          </h3>
          <ul className="rodape-lista">
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

        <div className="rodape-col">
          <h3 className="rodape-titulo">Fale com a gente</h3>
          <address className="rodape-lista rodape-endereco">
            {CONTATO.map((c) => (
              <p key={c.href}>
                <span className="rodape-endereco-rotulo">{c.rotulo}: </span>
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.valor}
                </a>
              </p>
            ))}
          </address>
        </div>

        <div className="rodape-col rodape-col--redes">
          <h3 className="rodape-titulo">Siga a gente</h3>
          <ul className="rodape-redes">
            {CONTATO.map((c) => (
              <li key={c.href}>
                <a
                  className="rodape-rede"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.rotulo}
                  title={c.dica}
                >
                  <c.Icone />
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
          <nav className="rodape-legais" aria-label="Legal">
            {legais.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.rotulo}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
