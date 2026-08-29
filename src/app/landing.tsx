/* GRAVA.AI — landing. Estética Data-As-Texture, vencedora da bancada.
   O material da página é o glifo monoespaçado: o header é uma malha hexagonal
   de caracteres em onda com a marca emergindo dela, e os canais da IA viram
   medidores de glifos. Sem radar, sem sci-fi. */

import Image from "next/image";
import "./v5.css";
import "./variacoes.css";
import "./temas.css";
import "./mapa-unidades.css";
import "./modelos.css";
import "./gravidade.css";
/* A arte ASCII segue inteira em `assets.tsx`. Ela saiu da página a pedido, para
   a leitura de layout acontecer sem o ruído dos mocks — voltar é reimportar
   AsciiWaveHeader / AsciiMeter / AsciiTotem / AsciiCircuito no lugar de quem
   herdou o espaço deles. */
import { Casca, Heroi, WHATSAPP } from "./casca";
import { FundoFecho } from "./fundos";
import { Gravidade } from "./gravidade";
import { Modelos } from "./modelos";
import { MapaUnidades } from "./mapa-unidades";
/* A cena do totem e o stepper das quatro frentes viraram um percurso só — ver o
   cabeçalho de `percurso.tsx`. `estudio.tsx` e `frentes.tsx` seguem no
   repositório, sem referência, para o caso de a divisão precisar voltar. */
import { Percurso } from "./percurso";
import { FormFranqueado } from "./form-franqueado";
import { Rodape } from "./rodape";


export type Tema = "dark" | "light";

export function Landing({ tema }: { tema?: Tema }) {
  return (
    <Casca atual="franqueado" tema={tema}>
      {/* Herói: carta topográfica atrás do conteúdo. As curvas se riscam na
          entrada e a máscara apaga da esquerda para a direita conforme o bloco
          sai — os dois gestos no mesmo sentido. */}
      <Heroi>
        <header className="hold hero" id="topo">
          <div>
            <h1>
              Uma franquia que a <mark>IA opera</mark> junto com você.
            </h1>
            {/* O parágrafo longo do brief virou resumo: no herói ele
                      competia com a manchete e adiantava três seções que a página
                      já explica melhor logo abaixo. */}
            <p>
              Totens de personalização em pontos de alto fluxo. A IA atende o
              cliente, controla o estoque e reporta à matriz.
            </p>
            <div className="row">
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
              <a className="cta cta--lg cta--out" href="#numeros">
                Ver os números
              </a>
            </div>
          </div>
          {/* Sem `.scope`: o painel de fio e fundo emoldurava um placeholder,
              e o que está aqui agora não quer moldura. As massas líquidas
              dissolvem nas bordas — encostá-las num retângulo de 1px seria
              desmentir o material na única linha da caixa. */}
          <figure className="hero-arte">
            <Gravidade />
          </figure>
        </header>
      </Heroi>

      <div className="corpo">

        {/* ONDE A REDE ESTÁ.

            Aqui havia a seção "O que a rede vende não é a máquina": uma grade de
            três molduras vazias (`<Ph>`) em volta de um cartão de texto. Ela
            afirmava que a operação vem montada e pedia ao visitante que
            acreditasse — as fotos que provariam isso não existem.

            O mapa responde a pergunta que o candidato faz de fato, e responde
            com dado em vez de adjetivo: onde já tem unidade, e o que abre perto
            dele. "Praça definida, entrega em 30 dias" é a única frase desta
            página que cria urgência sem inventar nada — a vaga da região dele
            ou está livre, ou não está.

            Os links para a história e a galeria não se perderam: os dois já
            estão no rodapé, e o segundo também no menu. */}
        <section className="hold sec" id="esperar">
          <div className="sec-cab">
            <h2>
              Onde a rede <mark>já está.</mark>
            </h2>
            <p>Unidades em operação e as próximas praças, com prazo de entrega.</p>
          </div>

          <MapaUnidades />
        </section>

        {/* A seção "Diferenciais" foi extinta, e não movida.

           Ela era o comparativo `HeadToHead`: a operação de uma loja comum de
           gravação contra a da unidade. O problema não era o desenho, era a
           premissa — não existe hoje no Brasil uma rede de franquia de gravação
           a laser para comparar. A seção inventava um concorrente e, ao inventá-
           lo, ensinava o visitante que aquela categoria existe e que ele poderia
           procurá-la. Custava atenção para criar consciência de uma alternativa
           que ninguém tinha pedido.

           O que ela tentava provar — que aqui o dono não opera quase nada — quem
           prova agora é a cena abaixo, mostrando a máquina fazendo o trabalho em
           vez de afirmar que ela faz. O componente segue em `head-to-head.tsx`,
           sem referência: se a comparação voltar a fazer sentido, está pronta. */}

        {/* A IA e o totem numa seção só, e agora numa cena só.

            Aqui já houve duas paradas de índice dizendo o mesmo assunto de
            ângulos diferentes, depois um hexágono com quatro nós e uma lista.
            O hexágono nomeava as frentes; ele não mostrava nenhuma acontecendo.

            A cena mostra uma unidade indo do pedido escrito à peça pronta, presa
            na tela enquanto a pessoa rola. Os quatro nomes ficam logo abaixo, em
            texto: eles provam que a IA não para no desenho da arte, e é papel de
            texto provar isso — não de um segundo desenho competindo com o
            primeiro. O hexágono está em `orbita.tsx`, agora sem referência. */}
        {/* Esta seção passou um tempo SEM cabeçalho, de propósito: um título
            anunciando o que a cena mostra contava o final antes do começo.
            Voltou a pedido, e por um motivo que o argumento antigo não tinha
            considerado — a cena entra depois de uma seção de mapa e entra
            grudando na tela, e chegar nela sem uma linha de aviso é um degrau
            seco. O cabeçalho aqui não é spoiler se disser o PERCURSO e não o
            desfecho: "do totem ao produto final" é o enquadramento, e o que
            acontece dentro dele continua sendo a cena que mostra. */}
        <section className="hold sec" id="ia">
          <div className="sec-cab">
            <h2>
              Do totem <mark>ao produto final.</mark>
            </h2>
            {/* O apoio absorveu a manchete que era das Frentes ("O nosso maior
                diferencial: a IA"). Com as duas seções fundidas numa só, duas
                manchetes de peso igual disputariam o mesmo assunto — e a
                segunda chegaria depois de a cena já ter provado o que ela
                afirmava.

                NÃO DIZ MAIS "as quatro frentes". O percurso mostra a do totem
                acontecendo (é a cena inteira) e nomeia as outras três; anunciar
                uma contagem de quatro faria o visitante procurar quatro blocos
                e achar três. A frase enumera em vez de contar — e enumerando ela
                ainda entrega as quatro. */}
            <p>
              O cliente descreve em palavras, a IA desenha, o laser grava e a
              peça sai pronta no balcão. A <strong>mesma inteligência</strong>{" "}
              atende no totem, vende online, reporta à matriz e repõe o estoque —
              ao mesmo tempo, o dia inteiro, sem ninguém no meio.
            </p>
          </div>

          <Percurso />
        </section>

        {/* O sistema fechando o circuito. Reativo à rolagem: a arte fica presa
            enquanto as seis estações passam ao lado dela. */}

        {/* DUAS SEÇÕES VIRARAM UMA.

            Aqui havia "Gente em movimento", comparando três LOCAIS sem preço, e
            logo abaixo "O que custa e o que vem dentro", com um valor único —
            porque o investimento era o mesmo em qualquer ponto.

            A franqueadora passou a ter preço por MODELO, e isso derruba a
            premissa das duas: o eixo da escolha deixa de ser onde a unidade fica
            e passa a ser qual unidade se compra. O valor volta para dentro da
            tabela, que é o único lugar onde ele compara.

            A âncora `#numeros` fica com esta seção porque é para cá que apontam
            o botão do herói, o rodapé, a galeria e a página de perguntas — e é
            aqui que os números passaram a morar. */}
        <section className="hold sec" id="numeros">
          <div className="sec-cab">
            <h2>
              Três modelos <mark>de unidade.</mark>
            </h2>
            <p>O que muda entre eles é o tamanho do ponto — e o que cada um custa.</p>
          </div>

          <Modelos />
        </section>

      </div>

      {/* O fechamento leva a mesma carta topográfica do herói, mais ao fundo e
          sem os gestos de abertura — ver `FundoFecho` em `fundos.tsx`.

          A `.close-fundo` é a caixa de posicionamento: o `.fundo` é
          `position: absolute`, e sem um ancestral posicionado ele se penduraria
          na viewport em vez de no rodapé. O `<footer>` não serve para isso
          porque é ele que tem o `.hold` (largura máxima e respiro lateral) — a
          carta precisa sangrar de borda a borda, e não parar na coluna de
          texto. */}
      <div className="close-fundo">
        <FundoFecho />
        <footer className="hold close" id="falar">
        <div className="close-duo">
          <div>
            {/* A marca empilhada, que é a versão do documento do cliente para
                assinatura. No topo ela é símbolo mais wordmark em linha; aqui,
                onde a página assina, ela aparece inteira.

                Ela estava FORA do par, ocupando a largura toda acima dele — e
                por isso o formulário começava abaixo da marca, enquanto a
                coluna de texto começava embaixo dela também. Os dois topos não
                se encontravam em lugar nenhum. Dentro da coluna, a primeira
                linha do formulário nasce na mesma altura do topo da marca. */}
            <Image
              src="/brand/grava-stacked.png"
              alt="GRAVA.AI"
              width={293}
              height={183}
              className="close-logo"
            />
            <div className="sec-cab">
              <h2>
                Leve a unidade <mark>para a sua região.</mark>
              </h2>
              {/* A frase antiga dizia "não com um formulário". Com o formulário
                    ao lado, ela passou a contradizer a própria página: o que se
                    promete agora é que do outro lado tem gente, não que não
                    existe campo para preencher. A instrução de como usar o
                    formulário saiu daqui — ela já está escrita dentro dele. */}
              <p>Quem responde é quem opera a rede, não um atendente.</p>
            </div>
            <div className="row" style={{ marginTop: 0 }}>
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <FormFranqueado />
        </div>
        <Rodape
          links={[
            { href: "/perguntas", rotulo: "Perguntas frequentes" },
            { href: "/institucional", rotulo: "A marca" },
            { href: "#ia", rotulo: "A IA" },
            { href: "#numeros", rotulo: "Modelos e valores" },
            { href: "/galeria", rotulo: "Galeria" },
          ]}
        />
        </footer>
      </div>
    </Casca>
  );
}
