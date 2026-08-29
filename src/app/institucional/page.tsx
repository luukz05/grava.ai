/* GRAVA.AI — institucional. A página da marca, não da franquia.
   Mesmo sistema visual da landing: v5.css, glifo monoespaçado como material,
   ícones autorais de traço 1.5 e a chapa de entalhe atrás do herói. O que
   muda é o assunto — aqui a GRAVA.AI fala de si, e a franquia é destino, não
   argumento.

   Conteúdo transcrito do site antigo (grava-ai-five.vercel.app). Nenhum
   número, contagem de unidade ou depoimento foi acrescentado: a página herda
   a mesma regra do CONTENT.md. */

import type { Metadata } from "next";
import Link from "next/link";
import "../v5.css";
import "../variacoes.css";
import "../temas.css";
import "./institucional.css";
import { Casca, Heroi } from "../casca";
import { FundoFecho } from "../fundos";
import { AsciiWaveHeader } from "../assets";
import { AsciiEstado } from "./art";
import { Rodape } from "../rodape";
import {
  IcoInovacao,
  IcoExperiencia,
  IcoRentabilidade,
  IcoArte,
  IcoTempo,
  IcoJornada,
  IcoShopping,
  IcoMercado,
  IcoAeroporto,
} from "../icons";

/* Uma frase só, usada na meta e no Open Graph. Antes eram duas frases
   diferentes para a mesma página: o card do WhatsApp dizia uma coisa e o
   resultado do Google outra, o que é ruído gratuito num site que ainda está
   construindo o próprio nome. */
const TITULO = "GRAVA.AI — transformando ideias em produtos personalizados";
const DESCRICAO =
  "Personalização de produtos com inteligência artificial: o cliente descreve a arte, a IA cria e o totem grava a peça na hora, onde tem gente em movimento.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/institucional" },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/institucional",
    locale: "pt_BR",
    type: "website",
  },
};

const WHATSAPP = "https://wa.me/5515996610916";

export default function Institucional() {
  return (
    <Casca atual="home">
      <Heroi>
        <header className="hold hero" id="topo">
          <div>
            <h1>
              Transformando ideias em <mark>produtos personalizados</mark>.
            </h1>
            <p>
              A GRAVA.AI une Inteligência Artificial e personalização para criar
              produtos exclusivos na hora — onde tem gente em movimento em busca
              de algo especial.
            </p>
            <div className="row">
              <a className="cta cta--lg" href="#marca">
                Conheça a GRAVA.AI
              </a>
              <a className="cta cta--lg cta--out" href={WHATSAPP}>
                Fale conosco no WhatsApp
              </a>
            </div>
          </div>
          <figure className="scope" style={{ margin: 0 }}>
            <AsciiWaveHeader />
          </figure>
        </header>
      </Heroi>

      <section className="hold sec" id="marca">
        {/* O apoio listava três desejos e depois explicava a IA em abstrato —
            190 caracteres para dizer o que a frase abaixo diz em 67. O credo,
            logo em seguida, é quem carrega o peso desta seção. */}
        <div className="sec-cab">
          <h2>
            O mercado mudou. <mark>A marca acompanhou.</mark>
          </h2>
          <p>Exclusivo, personalizado e na hora: é o que a IA passou a permitir.</p>
        </div>
        {/* O credo fica fora do cabeçalho: é a frase de propósito da marca, não
            linha de apoio da manchete. Tem fio próprio, corpo médio e medida
            mais estreita — se entrasse no `.sec-cab`, herdaria a medida larga do
            apoio e deixaria de ser citação. */}
        <p className="creed">
          Uma marca que coloca o cliente no centro da criação e usa tecnologia
          para transformar cada momento em um produto que carrega uma história.
        </p>
      </section>

      <section className="hold sec" id="pilares">
        <div className="sec-cab">
          <h2>
            Três pilares <mark>sustentam a empresa.</mark>
          </h2>
          <p>Não são valores de parede: são o que precisa funcionar junto.</p>
        </div>
        <div className="cells cells--3">
          <div className="cellart">
            <span className="ico">
              <IcoInovacao />
            </span>
            <h3>Inovação no processo</h3>
            <p>
              A personalização deixa de ser encomenda e vira criação na hora,
              conduzida por Inteligência Artificial.
            </p>
          </div>
          <div className="cellart">
            <span className="ico">
              <IcoExperiencia />
            </span>
            <h3>Experiência imersiva</h3>
            <p>
              O cliente participa da criação em vez de escolher de um catálogo.
              A experiência é parte do produto.
            </p>
          </div>
          <div className="cellart">
            <span className="ico">
              <IcoRentabilidade />
            </span>
            <h3>Rentabilidade real</h3>
            <p>
              Uma operação que se sustenta para quem opera a franquia, não só
              uma ideia bonita de tecnologia.
            </p>
          </div>
        </div>
      </section>

      <section className="hold sec" id="produto">
        <div className="sec-cab">
          <h2>
            Da ideia ao produto, <mark>em 3 passos.</mark>
          </h2>
          <p>Tudo acontece no ponto, na frente do cliente, sem encomenda.</p>
        </div>
        <div className="steps">
          <div className="step">
            <figure>
              <AsciiEstado estado={0} />
            </figure>
            <div className="txt">
              <span className="mono num">01</span>
              <h3>A ideia</h3>
              <p>
                No totem, o cliente escolhe ou gera a arte com Inteligência
                Artificial.
              </p>
            </div>
          </div>
          <div className="step">
            <figure>
              <AsciiEstado estado={1} />
            </figure>
            <div className="txt">
              <span className="mono num">02</span>
              <h3>A personalização</h3>
              <p>
                O produto é personalizado na hora, com qualidade padronizada.
              </p>
            </div>
          </div>
          <div className="step">
            <figure>
              <AsciiEstado estado={2} />
            </figure>
            <div className="txt">
              <span className="mono num">03</span>
              <h3>O produto</h3>
              <p>
                O cliente sai com um produto exclusivo que carrega um
                significado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hold sec" id="ia">
        <div className="sec-cab">
          <h2>
            Movidos por <mark>Inteligência Artificial.</mark>
          </h2>
          <p>Da criação da arte ao atendimento, tudo passa por ela.</p>
        </div>
        <div className="cells cells--3">
          <div className="cellart">
            <span className="ico">
              <IcoArte />
            </span>
            <h3>Na criação</h3>
            <p>
              O cliente gera a arte ideal em segundos, com Inteligência
              Artificial.
            </p>
          </div>
          <div className="cellart">
            <span className="ico">
              <IcoTempo />
            </span>
            <h3>Na produção</h3>
            <p>Do conceito ao produto gravado, em poucos minutos.</p>
          </div>
          <div className="cellart">
            <span className="ico">
              <IcoJornada />
            </span>
            <h3>No atendimento</h3>
            <p>A IA conduz o cliente do primeiro toque até a retirada.</p>
          </div>
        </div>
      </section>

      <section className="hold sec" id="onde">
        <div className="sec-cab">
          <h2>
            Onde a GRAVA.AI <mark>pode estar?</mark>
          </h2>
          <p>Ocupa pouca área e vive do fluxo que o ponto já tem.</p>
        </div>
        <div className="cells cells--3">
          <div className="cellart">
            <span className="ico">
              <IcoShopping />
            </span>
            <h3>Shopping center</h3>
            <p>No corredor de maior circulação.</p>
          </div>
          <div className="cellart">
            <span className="ico">
              <IcoMercado />
            </span>
            <h3>Supermercado</h3>
            <p>Grande porte, perto das frentes de caixa.</p>
          </div>
          <div className="cellart">
            <span className="ico">
              <IcoAeroporto />
            </span>
            <h3>Aeroporto</h3>
            <p>Área de espera, onde o tempo sobra.</p>
          </div>
        </div>
      </section>

      {/* O fechamento leva a mesma carta do herói, mais ao fundo e sem os
          gestos de abertura — ver `FundoFecho` em `fundos.tsx`. A
          `.close-fundo` é a caixa de posicionamento: o `.fundo` é absoluto e
          precisa de um ancestral posicionado que não seja o `<footer>`, que
          carrega o `.hold` e pararia a carta na coluna de texto. */}
      <div className="close-fundo">
        <FundoFecho />
      <footer className="hold close" id="falar">
        <div className="sec-cab">
          <h2>
            Leve a GRAVA.AI <mark>para a sua região.</mark>
          </h2>
          <p>A conversa começa no WhatsApp, com quem opera a rede.</p>
        </div>
        <div className="row" style={{ marginTop: 0 }}>
          <a className="cta cta--lg" href={WHATSAPP}>
            Fale conosco no WhatsApp
          </a>
          <Link className="cta cta--lg cta--out" href="/">
            Seja um franqueado
          </Link>
        </div>
        <Rodape
          assinatura="Transformando ideias em produtos personalizados com Inteligência Artificial."
          links={[
            { href: "#marca", rotulo: "Quem somos" },
            { href: "#produto", rotulo: "O produto" },
            { href: "#onde", rotulo: "Onde atuamos" },
            { href: "/perguntas", rotulo: "Perguntas frequentes" },
            { href: "/", rotulo: "Seja um franqueado" },
          ]}
        />
      </footer>
      </div>
    </Casca>
  );
}
