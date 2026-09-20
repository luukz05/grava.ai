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
import "./v5.css";
import "./variacoes.css";
import "./_marca/marca.css";
import "./_marca/centro.css";
import { Casca, Heroi } from "./casca";
import { FundoFecho } from "./fundos";
import { Centro } from "./_marca/centro";
import { Portais, PORTAL_FRANQUEADO, PORTAL_GALERIA } from "./portais";
import { Rodape } from "./rodape";
/* Os ícones dos pilares e os da IA saíram junto com os cartões: os seis são
   agora os nós do hexágono, dentro da cena (ver `_marca/centro.tsx`). */

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
      <section className="hold sec pontos" id="marca">
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

      {/* A SEÇÃO DOS TRÊS PILARES SAIU DAQUI, inteira.

          Ela era um `<h2>`, um hexágono próprio e três cartões lado a lado —
          e o hexágono era o segundo da página, redesenhado do zero meia tela
          depois de a cena da marca ter acabado de formar um.

          Agora é a continuação da mesma cena grudada (ver `centro.tsx`): o
          polígono que o fio da coroa formou recebe os três pilares nos
          vértices, e o cabeçalho e o texto de cada um passam ao lado enquanto
          o nó da vez acende. Nada do texto se perdeu — as três explicações que
          estavam nos cartões são os blocos das três últimas batidas. */}

      {/* A seção "Da ideia ao produto, em 3 passos" SAIU daqui.

          Ela era, cartão por cartão, o que a cena da marca agora mostra
          acontecendo: mesmos três nomes, mesmos três textos e as mesmas três
          chapas de `art.tsx` — que continuam na página, ao fundo da cena,
          trocando de estado junto com os passos.

          Repetir em texto parado o que a cena provou em movimento não reforça:
          enfraquece. Quem viu lê como "então aquilo não bastou", e quem não viu
          não ganha nada, porque o cartão é mais pobre que a cena. */}

      {/* A SEÇÃO "MOVIDOS POR INTELIGÊNCIA ARTIFICIAL" TAMBÉM SAIU DAQUI.

          Ela era um `<h2>` e três cartões — criação, produção, atendimento —
          logo depois dos três pilares, que já eram outros três cartões. Duas
          listas de três em fila, e nenhuma das duas dizia por que eram três.

          O hexágono da cena tinha SEIS cantos e os pilares ocupavam três,
          alternados. Os outros três eram exatamente esta lista: agora cada
          papel da IA é um vértice, a marca abre até ocupar o polígono e a
          figura fecha com as duas listas intercaladas — que é a relação que os
          seis cartões em fila nunca chegaram a desenhar.

          Todo o texto continua na página, nos blocos das quatro últimas
          batidas da cena (ver `_marca/centro.tsx`). */}

      {/* AQUI FICAVA `#onde` — "Onde a GRAVA.AI pode estar?", com os três
          cartões de shopping, supermercado e aeroporto. Saiu a pedido.

          O que ela dizia é argumento de FRANQUIA, não de marca: onde o totem
          cabe e de que fluxo ele vive são a pergunta de quem está avaliando um
          ponto, e essa pessoa está em `/seja-franqueado`. Numa página que existe
          para a busca pelo nome da marca, os três cartões respondiam a uma
          pergunta que o leitor ainda não tinha feito. */}

      {/* O fechamento leva a mesma carta do herói, mais ao fundo e sem os
          gestos de abertura — ver `FundoFecho` em `fundos.tsx`. A
          `.close-fundo` é a caixa de posicionamento: o `.fundo` é absoluto e
          precisa de um ancestral posicionado que não seja o `<footer>`, que
          carrega o `.hold` e pararia a carta na coluna de texto. */}
      <div className="close-fundo">
        <FundoFecho />
      {/* O FECHAMENTO DA HOME NÃO CAPTA — ELE ENCAMINHA.

          Aqui ficava o mesmo `FormFranqueado` das outras rotas. Saiu a pedido,
          e a razão é a mesma que tirou `#onde` acima: esta página existe para a
          busca pelo nome da marca, e pedir nome, e-mail e WhatsApp a quem
          chegou para saber o que a GRAVA.AI faz é cobrar dado antes de haver
          intenção. O formulário continua inteiro em `/seja-franqueado` — onde
          quem lê já está avaliando a franquia.

          Depois do formulário saiu também o botão que ficou no lugar dele: um
          `cta--lg` sozinho embaixo de um `.sec-cab` era um fechamento apagado,
          uma linha e uma pílula no fim de uma página que tinha acabado de
          mostrar uma cena inteira. Agora são os dois portais — franquia e
          galeria —, cartões de tipografia grande com o ícone da página de
          destino em marca d'água. Ver `portais.tsx`. */}
      <footer className="hold close" id="falar">
        <div className="sec-cab">
          <h2>
            Leve a GRAVA.AI <mark>para a sua região.</mark>
          </h2>
          <p>
            A franquia tem página própria — e as peças que saem do totem
            também.
          </p>
        </div>
        <Portais itens={[PORTAL_FRANQUEADO, PORTAL_GALERIA]} />
        <Rodape
          links={[
            { href: "#marca", rotulo: "Quem somos" },
            { href: "#pilares", rotulo: "Os pilares" },
            { href: "#ia", rotulo: "A IA" },
            { href: "/seja-franqueado#duvidas", rotulo: "Perguntas frequentes" },
            { href: "/seja-franqueado", rotulo: "Seja um franqueado" },
          ]}
        />
      </footer>
      </div>
    </Casca>
  );
}
