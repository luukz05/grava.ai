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
import { Casca, Heroi } from "../casca";
import { Portais, PORTAL_FRANQUEADO, PORTAL_MARCA } from "../portais";
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
    <Casca atual="galeria" leitura>
      {/* Mesma abertura das outras rotas: a carta topográfica atrás do primeiro
          bloco, com a barra do topo flutuando sobre ela.

          Herói do mesmo tamanho do da landing, centrado: as três rotas abrem
          na mesma altura, e é isso que faz as três lerem como um site só. Os
          dois botões grandes seguem fora — repetiam o fechamento desta mesma
          página. Sem painel à direita, a coluna vai para o meio; ver
          `[data-leitura="centro"]` no `v5.css`. */}
      <Heroi>
        <header className="hold hero" id="topo">
          <div>
            <h1>O que sai do totem.</h1>
            <p>
              Cada peça começa numa conversa de trinta segundos com a IA e
              termina gravada. As imagens entram quando a rede enviar o material
              de fotografia.
            </p>
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
      {/* O FORMULÁRIO SAIU DAQUI. Ele era o mesmo `FormFranqueado` da landing,
          e a razão de estar aqui era o CTA da barra do topo descer para
          `#falar` sem sair da página. Só que a galeria é a página de quem quer
          ver peça, não de quem está avaliando a franquia: pedir nome, e-mail e
          WhatsApp no fim dela é cobrar dado antes de haver intenção — o mesmo
          argumento que tirou o formulário da home.

          No lugar, os dois portais: a franquia e a marca, cartões de tipografia
          grande com o ícone da página de destino em marca d'água (ver
          `portais.tsx`). Os fixos desta rota passaram a encaminhar para
          `/seja-franqueado`, como os da home — ver `destinoCta` em `lead.ts`. */}
      <footer className="hold close" id="falar">
        <div className="sec-cab">
          <h2>
            Quer ver <mark>de perto?</mark>
          </h2>
          <p>
            A franquia tem página própria, com modelos, investimento e a
            apresentação. E a marca conta o resto.
          </p>
        </div>
        <Portais itens={[PORTAL_FRANQUEADO, PORTAL_MARCA]} />
        <Rodape
          links={[
            { href: "/seja-franqueado", rotulo: "Seja um franqueado" },
            { href: "/seja-franqueado#duvidas", rotulo: "Perguntas frequentes" },
            { href: "/", rotulo: "A marca" },
          ]}
        />
      </footer>
      </div>
    </Casca>
  );
}
