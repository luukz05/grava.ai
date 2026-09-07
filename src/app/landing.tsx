/* GRAVA.AI — landing. Estética Data-As-Texture, vencedora da bancada.
   O material da página é o glifo monoespaçado: o header é uma malha hexagonal
   de caracteres em onda com a marca emergindo dela, e os canais da IA viram
   medidores de glifos. Sem radar, sem sci-fi. */

import Image from "next/image";
import "./v5.css";
import "./variacoes.css";
import "./mapa-unidades.css";
import "./modelos.css";
import "./gravidade.css";
/* A arte ASCII segue inteira em `assets.tsx`. Ela saiu da página a pedido, para
   a leitura de layout acontecer sem o ruído dos mocks — voltar é reimportar
   AsciiWaveHeader / AsciiMeter / AsciiTotem / AsciiCircuito no lugar de quem
   herdou o espaço deles. */
import { Casca, Heroi } from "./casca";
import { ANCORA_FORM, CTA_ROTULO } from "./lead";
import { FundoFecho } from "./fundos";
import { Gravidade } from "./gravidade";
import { Modelos } from "./modelos";
import { MapaUnidades } from "./mapa-unidades";
/* O acordeão, as doze perguntas e o CSS deles — o CSS é importado dentro do
   próprio módulo. Ver o cabeçalho de `faq.tsx`, que é onde vive a regra de
   conteúdo: nenhuma resposta inventa fato, e a franqueadora revisa todas antes
   de publicar. */
import { Faq, TODAS } from "./faq";
/* A cena do totem e o stepper das quatro frentes viraram um percurso só — ver o
   cabeçalho de `percurso.tsx`. `estudio.tsx` e `frentes.tsx` seguem no
   repositório, sem referência, para o caso de a divisão precisar voltar. */
import { Percurso } from "./percurso";
import { FormFranqueado } from "./form-franqueado";
import { Rodape } from "./rodape";


export function Landing() {
  return (
    <Casca atual="franqueado">
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
              <a className="cta cta--lg" href={ANCORA_FORM}>
                {CTA_ROTULO}
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
        <section className="hold sec pontos" id="esperar">
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
        {/* O `.breu` é a chegada na cena. A cena é uma chapa de preto puro
            sangrada na tela inteira e a página em volta é #05090d, o que
            desenhava uma moldura em torno do vídeo; este bloco apaga a página
            até o preto dela ao longo do cabeçalho, e devolve a cor depois. Ver
            `.breu` no `v5.css`. */}
        <div className="breu">
          <section className="hold sec pontos" id="ia">
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
        </div>

        {/* DUAS SEÇÕES VIRARAM UMA.

            Aqui havia "Gente em movimento", comparando três LOCAIS sem preço, e
            logo abaixo "O que custa e o que vem dentro", com um valor único —
            porque o investimento era o mesmo em qualquer ponto.

            A franqueadora passou a ter preço por MODELO, e isso derruba a
            premissa das duas: o eixo da escolha deixa de ser onde a unidade fica
            e passa a ser qual unidade se compra. O valor volta para dentro da
            tabela, que é o único lugar onde ele compara.

            A âncora `#numeros` fica com esta seção porque é para cá que apontam
            o botão do herói, o rodapé e a galeria — e é
            aqui que os números passaram a morar.

            O `.breu-saida` é a outra metade da chegada na cena: o preto do vídeo
            se dissolve de volta no fundo da página ao longo do respiro e da
            manchete daqui, sem gastar altura para isso. Ver `.breu` no
            `v5.css`. */}
        <div className="breu-saida">
          <section className="hold sec pontos" id="numeros">
            <div className="sec-cab">
              <h2>
                Três modelos <mark>de unidade.</mark>
              </h2>
              <p>O que muda entre eles é o tamanho do ponto — e o que cada um custa.</p>
            </div>

            <Modelos />
          </section>
        </div>

        {/* AS PERGUNTAS, AQUI E NÃO NO FIM.

            Este é o ponto da página em que o candidato acabou de ver preço — e
            preço é o que faz a objeção subir. Um FAQ colado no rodapé chega
            depois do formulário, ou seja, depois da decisão; aqui ele chega
            entre o número e o pedido, que é onde a dúvida acontece.

            ELA JÁ FOI UMA ROTA, `/perguntas`, e esta seção mostrava seis das
            doze com um link para o resto. A rota saiu, as doze vieram para cá e
            agora são CINCO: numa página que já responde preço, taxas, ticket e
            onde a unidade fica, sete das doze repetiam em forma de pergunta o
            que a seção logo acima afirma. O critério do corte — só entra o que
            a página não responde em outro lugar — e o que saiu para onde estão
            no cabeçalho de `faq.tsx`.

            `/perguntas` redireciona para cá (ver `next.config.ts`): a URL foi
            publicada, e link morto é pior que redirect. */}
        <section className="hold sec pontos" id="duvidas">
          {/* O JSON-LD sai da MESMA lista que a seção renderiza. Se uma resposta
              mudar, as duas mudam juntas — é a única forma de garantir que o que
              o buscador lê é o que a página diz, e divergência entre os dois o
              Google trata como marcação enganosa, não como descuido.

              Ele mudou de rota junto com o conteúdo: enquanto `/perguntas`
              existia, a marcação era de lá, e uma segunda cópia aqui faria duas
              páginas do domínio se declararem o FAQ do mesmo assunto. Agora é
              uma só, e é esta.

              NÃO É PELO RESULTADO RICO. O Google restringiu a caixa expansível
              de FAQ a sites de governo e saúde em agosto de 2023 e desligou o
              recurso de vez em 07/05/2026. O que a marcação faz hoje é dizer aos
              sistemas de resposta — ChatGPT, Perplexity, Copilot e o próprio
              Google — que aquilo é uma pergunta com resposta fechada e de quem
              ela é. Morreu o enfeite, não o dado. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: TODAS.map((p) => ({
                  "@type": "Question",
                  name: p.q,
                  acceptedAnswer: { "@type": "Answer", text: p.a },
                })),
              }),
            }}
          />

          <div className="sec-cab">
            <h2>
              Perguntas de quem está <mark>avaliando a franquia.</mark>
            </h2>
            <p>
              As dúvidas que mais chegam, respondidas com o que a rede já
              confirmou. O que não estiver aqui, pergunte no formulário abaixo.
            </p>
          </div>

          <Faq perguntas={TODAS} />
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
        {/* O FORMULÁRIO É O FECHAMENTO INTEIRO — ver o cabeçalho de
            `form-franqueado.tsx`. A coluna de texto entra como `children` dele
            porque o `<form>` é quem monta o par de colunas. O `.close-duo` que
            fazia esse papel saiu junto: quem monta as colunas agora é o
            `.form-fr-duo`. */}
        <FormFranqueado>
          {/* A COLUNA DE ASSINATURA — marca e manchete —, e ela SOME NO CELULAR.

              A classe existe para isso: no telefone o par vira uma coluna só, e
              a marca empilhada mais a manchete empurram o formulário para baixo
              da dobra. Quem chega aqui já rolou a página inteira e já viu a
              marca no alto; repeti-la em 84px de altura logo antes do campo de
              nome custa o único lugar da página em que a pessoa faz alguma
              coisa. A manchete continua existindo para leitor de tela (ver
              `.close-intro` no `v5.css`) — é o `<h2>` desta seção, e uma seção
              sem título é uma seção sem nome no índice de quem navega por
              cabeçalho. */}
          <div className="close-intro">
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
              {/* Sem linha de apoio. Havia aqui "Quem responde é quem opera a
                  rede, não um atendente" — saiu a pedido. A manchete e o
                  formulário ao lado já dizem o que fazer, e a promessa sobre
                  quem atende é de um tipo que a página não tem como provar. */}
            </div>
            {/* Havia aqui um segundo "Falar no WhatsApp". Ele saiu: dois botões
                para a mesma conversa, lado a lado, é escolha onde não havia
                escolha — e este ainda pulava o formulário, abrindo a conversa
                sem nome nem e-mail. Ficou o que qualifica, agora atravessando o
                fechamento inteiro. */}
          </div>
        </FormFranqueado>
        <Rodape
          links={[
            { href: "#duvidas", rotulo: "Perguntas frequentes" },
            { href: "/", rotulo: "A marca" },
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
