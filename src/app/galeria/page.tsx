/* Galeria de peças.
   Existe porque a navbar aponta para cá — link de navegação que leva a 404 é
   pior do que não ter o link. É uma casca honesta: a estrutura está de pé e
   cada slot diz o que vai receber, sem foto inventada e sem produto que a
   GRAVA.AI não confirmou.

   Forma, tipografia, barra do topo e fixos vêm do `Casca`, o mesmo das outras
   duas rotas. */

import type { Metadata } from "next";
import "../v5.css";
import "../variacoes.css";
import { Casca, Heroi, WHATSAPP } from "../casca";
import { FundoFecho } from "../fundos";
import { Ph } from "../ph";
import { Rodape } from "../rodape";

/* A descrição anterior tinha 58 caracteres e desperdiçava o espaço: cabe cerca
   de 155, e o que não é dito ali o Google preenche sozinho com um trecho
   qualquer da página — que aqui ainda é casca. */
const TITULO = "GRAVA.AI — galeria de peças gravadas";
const DESCRICAO =
  "O que sai do totem GRAVA.AI: peças gravadas a laser com arte criada por IA na hora, de lembrança de shopping a presente de viagem, com ticket de R$ 60 a R$ 100.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/galeria",
    locale: "pt_BR",
    type: "website",
  },
};

/* Os materiais que a apresentação do cliente cita. Nada além deles: inventar
   catálogo aqui seria prometer produto que a rede não confirmou. */
const PECAS = [
  { t: "Arte gerada no totem", d: "O desenho que o cliente descreve e vê fechar na tela." },
  { t: "Gravação a laser", d: "A marca queimada na superfície, feita na hora." },
  { t: "Peça pronta", d: "O item que sai com o cliente, com ticket de R$ 60 a R$ 100." },
  { t: "Personalização por data", d: "O que a unidade produz em época comemorativa." },
  { t: "Presente de viagem", d: "O que sai nas unidades de aeroporto." },
  { t: "Lembrança de shopping", d: "O que sai no corredor de maior circulação." },
];

export default function Galeria() {
  return (
    <Casca atual="galeria">
      {/* Mesma abertura das outras rotas: a carta topográfica atrás do primeiro
          bloco, com a barra do topo flutuando sobre ela. */}
      <Heroi>
        <header className="hold hero hero--curto" id="topo">
          <div>
            <h1>O que sai do totem.</h1>
            <p>
              Cada peça começa numa conversa de trinta segundos com a IA e
              termina gravada. As imagens entram quando a rede enviar o material
              de fotografia.
            </p>
            <div className="row">
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
              <a className="cta cta--lg cta--out" href="/#numeros">
                Ver os números
              </a>
            </div>
          </div>
        </header>
      </Heroi>

      <section className="hold sec" id="pecas">
        {/* O cabeçalho de seção estava faltando aqui, e era a única seção das
            três rotas sem ele: a grade começava direto embaixo do herói, sem
            nada dizendo o que aqueles seis blocos são. O `.sec-cab` é a receita
            que as outras doze seções usam — manchete à esquerda, contexto à
            direita — e é ela que dá o degrau entre 'o que sai do totem' (a
            promessa, no herói) e os tipos de peça (a lista). */}
        <div className="sec-cab">
          <h2>
            Seis peças, <mark>seis motivos.</mark>
          </h2>
          <p>
            O mesmo equipamento e o mesmo insumo — o que muda de uma para outra é
            a arte, e é a IA que a resolve na conversa com o cliente.
          </p>
        </div>

        <div className="lojas">
          {PECAS.map((p) => (
            <article className="loja" key={p.t}>
              <Ph ratio="4 / 3" label={p.t} />
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Mesmo fechamento das outras duas rotas: a carta volta ao fundo. */}
      <div className="close-fundo">
        <FundoFecho />
      <footer className="hold close" id="falar">
        <div className="sec-cab">
          <h2>
            Quer ver <mark>de perto?</mark>
          </h2>
          <p>A apresentação completa da franquia sai pelo WhatsApp.</p>
        </div>
        <div className="row" style={{ marginTop: 0 }}>
          <a className="cta cta--lg" href={WHATSAPP}>
            Falar no WhatsApp
          </a>
        </div>
        <Rodape
          links={[
            { href: "/", rotulo: "Seja um franqueado" },
            { href: "/perguntas", rotulo: "Perguntas frequentes" },
            { href: "/institucional", rotulo: "A marca" },
          ]}
        />
      </footer>
      </div>
    </Casca>
  );
}
