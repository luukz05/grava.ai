/* GRAVA.AI — a home. A página da marca, não da franquia.

   ELA JÁ FOI `/institucional`, com a landing de captação em `/`. A inversão
   corrigiu o que a própria barra do topo já denunciava: ela chamava esta
   página de "Home" e a de captação de "Franqueado". Quem chega pelo nome da
   marca — que é como a maior parte do tráfego de uma rede nova chega — caía
   numa proposta de investimento antes de saber o que a GRAVA.AI faz. A landing
   passou para `/seja-franqueado`, e `/institucional` redireciona para cá (ver
   `next.config.ts`).

   Mesmo sistema visual da landing: v5.css, glifo monoespaçado como material,
   ícones autorais de traço 1.5 e a chapa de entalhe atrás do herói. O que
   muda é o assunto — aqui a GRAVA.AI fala de si, e a franquia é destino, não
   argumento.

   Os componentes que só esta página usa vivem em `_marca/`. O underscore não é
   estilo: é a pasta privada do Next, que fica de fora do roteamento. Ela se
   chamava `institucional/` e era a rota; sem o prefixo, o nome sugeriria uma
   rota que não existe mais.

   Conteúdo transcrito do site antigo (grava-ai-five.vercel.app). Nenhum
   número, contagem de unidade ou depoimento foi acrescentado: a página herda
   a mesma regra do CONTENT.md. */

import type { Metadata } from "next";
import Link from "next/link";
import "./v5.css";
import "./variacoes.css";
import "./_marca/marca.css";
import "./_marca/centro.css";
import "./_marca/pilares.css";
import { Casca, Heroi } from "./casca";
import { FormFranqueado } from "./form-franqueado";
import { FundoFecho } from "./fundos";
import { Centro } from "./_marca/centro";
import { Pilares } from "./_marca/pilares";
import { Rodape } from "./rodape";
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
} from "./icons";

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
  /* A canônica da home. Com `.com` e `.com.br` provavelmente respondendo o
     mesmo conteúdo, é ela que diz qual das duas é a página de verdade — senão
     o site divide a própria autoridade entre dois endereços idênticos. */
  alternates: { canonical: "/" },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/",
    siteName: "GRAVA.AI",
    locale: "pt_BR",
    type: "website",
  },
};

export default function Home() {
  return (
    <Casca atual="home" leitura>
      {/* Herói do mesmo tamanho do da landing, centrado. Esta página é da
          marca, e por um tempo ela abriu com um herói colapsado — a manchete
          um degrau menor, na quina de uma tela larga. Abrir menor que a página
          de franqueado fazia a marca ler como anexo dela.

          O que continua fora: a segunda coluna (a onda em ASCII dentro de um
          `.scope`) e os dois botões grandes, que eram cópia exata do
          fechamento lá embaixo. O CTA segue na barra do topo, no par
          flutuante e na barra fixa do celular, e os três descem para o mesmo
          formulário. Sem painel à direita, a coluna
          vai para o meio — ver `[data-leitura="centro"]` no `v5.css`. */}
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
          </div>
        </header>
      </Heroi>

      {/* A SEÇÃO DA MARCA.

          O credo era um parágrafo de citação aqui, e os três passos ("A ideia",
          "A personalização", "O produto") eram uma seção `#produto` de três
          cartões parados, algumas telas abaixo. Os dois viraram uma coisa só:
          o texto rola normalmente à esquerda e o desenho acompanha à direita,
          grudado — ver o cabeçalho de `centro.tsx`.

          O que a fusão conserta: o credo afirmava que o cliente está no centro
          da criação, e a página provava o contrário na linha seguinte — três
          cartões da esquerda para a direita são a forma de uma esteira, que é o
          oposto de "no centro". Agora ele está, literalmente, no meio do
          desenho, e o percurso acontece em volta.

          SEM `.breu` AQUI. Ele existe para entregar uma cena de preto puro
          sangrada na tela inteira sem desenhar moldura em volta, e essa cena
          não existe mais: o desenho vive dentro da coluna da página, no fundo
          da página, como qualquer outra seção. */}
      <section className="hold sec" id="marca">
        {/* O apoio listava três desejos e depois explicava a IA em abstrato —
            190 caracteres para dizer o que a frase abaixo diz em 67. */}
        <div className="sec-cab">
          <h2>
            O mercado mudou. <mark>A marca acompanhou.</mark>
          </h2>
          <p>Exclusivo, personalizado e na hora: é o que a IA passou a permitir.</p>
        </div>

        <Centro />
      </section>

      {/* OS TRÊS PILARES.

          O hexágono que abre esta seção é o antigo diagrama da cena da marca —
          ver o cabeçalho de `pilares.tsx`. Lá ele carregava duas leituras ao
          mesmo tempo (o processo num anel interno, os pilares nos vértices) e
          ficava embolado; aqui carrega uma só, que é a desta seção.

          O DESENHO NOMEIA, OS CARTÕES DETALHAM. Três nomes num hexágono dizem
          que os três sustentam a mesma peça — que é a frase do apoio, e é o que
          três cartões lado a lado não conseguem dizer. O texto de cada um
          continua nos cartões, logo abaixo. */}
      <section className="hold sec" id="pilares">
        <div className="sec-cab">
          <h2>
            Três pilares <mark>sustentam a empresa.</mark>
          </h2>
          <p>Não são valores de parede: são o que precisa funcionar junto.</p>
        </div>

        <Pilares />

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

      {/* A seção "Da ideia ao produto, em 3 passos" SAIU daqui.

          Ela era, cartão por cartão, o que a cena da marca agora mostra
          acontecendo: mesmos três nomes, mesmos três textos e as mesmas três
          chapas de `art.tsx` — que continuam na página, ao fundo da cena,
          trocando de estado junto com os passos.

          Repetir em texto parado o que a cena provou em movimento não reforça:
          enfraquece. Quem viu lê como "então aquilo não bastou", e quem não viu
          não ganha nada, porque o cartão é mais pobre que a cena. */}

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
        <FormFranqueado>
          <div className="sec-cab">
            <h2>
              Leve a GRAVA.AI <mark>para a sua região.</mark>
            </h2>
            <p>
              A apresentação demonstrativa da franquia vai para o seu e-mail. A
              conversa vem depois, no seu WhatsApp, com quem opera a rede.
            </p>
            {/* O secundário fica na coluna de texto, e não ao lado do botão de
                envio: são ações de peso diferente — uma manda a apresentação,
                a outra troca de página. */}
            <div className="row" style={{ marginTop: 0 }}>
              <Link className="cta cta--out" href="/seja-franqueado">
                Seja um franqueado
              </Link>
            </div>
          </div>
        </FormFranqueado>
        <Rodape
          assinatura="Transformando ideias em produtos personalizados com Inteligência Artificial."
          links={[
            { href: "#marca", rotulo: "Quem somos" },
            { href: "#pilares", rotulo: "Os pilares" },
            { href: "#onde", rotulo: "Onde atuamos" },
            { href: "/perguntas", rotulo: "Perguntas frequentes" },
            { href: "/seja-franqueado", rotulo: "Seja um franqueado" },
          ]}
        />
      </footer>
      </div>
    </Casca>
  );
}
