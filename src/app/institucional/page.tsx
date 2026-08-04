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

export const metadata: Metadata = {
  title: "GRAVA.AI — transformando ideias em produtos personalizados",
  description:
    "A GRAVA.AI une Inteligência Artificial e personalização para criar produtos exclusivos na hora — onde tem gente em movimento em busca de algo especial.",
  openGraph: {
    title: "GRAVA.AI — transformando ideias em produtos personalizados",
    description:
      "Uma marca que coloca o cliente no centro da criação e usa tecnologia para transformar cada momento em um produto que carrega uma história.",
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
        <h2>O mercado mudou. E nossa marca acompanhou.</h2>
        <p>
          Hoje as pessoas buscam produtos exclusivos, experiências
          personalizadas e soluções rápidas. A Inteligência Artificial está
          transformando como criamos, compramos e nos conectamos com as marcas.
        </p>
        <p className="creed">
          Uma marca que coloca o cliente no centro da criação e usa tecnologia
          para transformar cada momento em um produto que carrega uma história.
        </p>
      </section>

      <section className="hold sec" id="pilares">
        <h2>Três pilares sustentam a empresa.</h2>
        <p>
          Não são valores de parede. São as três coisas que precisam funcionar
          juntas para a marca existir de verdade.
        </p>
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
        <h2>Da ideia ao produto, em 3 passos.</h2>
        <p>
          O caminho inteiro acontece no ponto, na frente do cliente, sem
          encomenda e sem espera de dias.
        </p>
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
        <h2>Movidos por Inteligência Artificial.</h2>
        <p>
          A IA é o coração da GRAVA.AI — da criação da arte à experiência do
          cliente no totem.
        </p>
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
        <h2>Onde a GRAVA.AI pode estar?</h2>
        <p>
          Onde já existe fluxo de gente: a unidade ocupa pouca área e vive da
          circulação do ponto.
        </p>
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

      <footer className="hold close" id="falar">
        <h2>Leve a GRAVA.AI para a sua região.</h2>
        <p>
          A conversa começa no WhatsApp e segue com quem opera a rede, não com
          um formulário.
        </p>
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
            { href: "/", rotulo: "Seja um franqueado" },
          ]}
        />
      </footer>
    </Casca>
  );
}
