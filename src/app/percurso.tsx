"use client";

/* O PERCURSO — a cena do totem e as frentes da IA numa seção só.

   ───────────────────────────────────────────────────────────────────────────
   O QUE ISTO SUBSTITUI, E POR QUÊ

   Havia duas seções seguidas dizendo a mesma coisa por meios diferentes: a cena
   do totem (`estudio.tsx`), presa na tela e movida pela rolagem, e logo abaixo
   um stepper de quatro frentes (`frentes.tsx`) que trocava sozinho num relógio
   de `requestAnimationFrame`.

   Somadas, elas custavam duas telas presas, dois motores de tempo e duas
   gramáticas de leitura — a primeira obedecendo à rolagem, a segunda a um
   cronômetro que a pessoa não controla. Quem rolava rápido perdia as frentes;
   quem parava para ler via a cena congelada acima.

   Agora é um percurso só: SEIS PASSOS, um trilho, um motor. Cada momento da cena
   virou um passo com nome e texto próprios, e o que as quatro frentes diziam
   está dentro deles — nos blocos de apoio da margem oposta.

   Os dois arquivos antigos continuam no repositório, sem referência: se a
   divisão precisar voltar, está pronta. Mesmo caminho de `head-to-head.tsx` e
   `orbita.tsx`.

   ───────────────────────────────────────────────────────────────────────────
   UM MOTOR SÓ: A ROLAGEM

   Não existe relógio aqui. A rolagem é a cabeça de leitura do vídeo (o
   `currentTime` é escrito pela linha do tempo do GSAP), é o que troca a
   legenda, é o que enche a régua. Descer avança, subir desfaz.

   Isso resolve de graça o problema que o stepper por cronômetro tinha: ninguém
   perde o texto no meio da leitura porque um contador venceu. Quem parou, parou
   a cena junto.

   ───────────────────────────────────────────────────────────────────────────
   O TEXTO ALTERNA DE LADO

   A animação sangra a tela inteira e fica AO FUNDO; o texto de cada passo entra
   na margem, trocando de lado a cada passo. Duas razões:

   — a cena nunca fica coberta do mesmo lado duas vezes seguidas, então o olho
     sempre tem metade do quadro livre para ver o que está acontecendo;
   — o zigue-zague é o que dá ritmo de percurso. Texto sempre no mesmo lado, com
     seis blocos, lê como legenda de vídeo — e legenda não se lê.

   O véu lateral (`.pcs-veu`) existe por causa disso: é ele que garante contraste
   do texto claro contra qualquer quadro do vídeo, sem escurecer o meio da cena.

   ───────────────────────────────────────────────────────────────────────────
   O QUE VEIO INTEIRO DA CENA ANTIGA

   O console é o mesmo marcado e o mesmo `estudio.css`: saudação, campo, atalhos,
   raciocínio e resposta. O meio da cena continua sendo DOM e não vídeo porque é
   TEXTO — texto em vídeo é pixel, não é lido por leitor de tela, não é indexado
   e mudar uma vírgula exigiria refazer o arquivo.

   Também vieram os cuidados que custaram caro para descobrir, todos comentados
   no lugar: a sangria medida em JavaScript, o carregamento tardio dos vídeos, a
   busca de quadro só quando o quadro muda, e a remedição do ScrollTrigger depois
   que a sangria muda a altura do documento.

   ───────────────────────────────────────────────────────────────────────────
   ANTES DO JAVASCRIPT

   O HTML do servidor é uma composição legível: o pôster do primeiro vídeo, o
   console com o pedido JÁ ESCRITO no campo, a resposta inteira, e os seis passos
   em duas colunas de texto normal. `est-vivo` só entra quando a animação vai
   mesmo rodar. */

import { useEffect, useRef } from "react";
import "./estudio.css";
import "./percurso.css";
import { Marca } from "./icons";

/* A fala do cliente. Aberta de propósito: "me mostre o que você pode fazer" é o
   que justifica o catálogo INTEIRO chegando no fim. Um pedido específico ("arte
   de abelha num copo") entregaria um copo — e aí as outras cinco peças voando
   seriam enfeite sem resposta. */
const PEDIDO = "me mostre o que você pode fazer";

/* Os atalhos embaixo do campo: os quatro materiais que a rede grava, em pílula.
   Mesma função que os atalhos de um console de IA — dizer, sem texto de ajuda,
   o que dá para pedir ali. */
const ATALHOS = ["Copo térmico", "Placa de metal", "Chaveiro", "Lona"];

/* O raciocínio visível. Quatro passos, e cada um é uma coisa que a máquina
   realmente faz entre o pedido e a peça. O último não fecha: fica girando
   enquanto o feixe entra, porque a peça ainda não existe. */
const PASSOS_IA = [
  "Lendo o pedido",
  "Escolhendo o material",
  "Fechando o traço em vetor",
  "Ajustando à área da peça",
];

const RESPOSTA = [
  "Metal, cerâmica, lona, plástico — grava em tudo isso.",
  "Eu fecho o traço e ajusto na área de cada peça. Você não precisa saber nada disso.",
  "Gerando",
];

/* Os dois arquivos são re-encodados ALL-INTRA (todo quadro é keyframe) e já vêm
   cortados no trecho útil, então a rolagem cobre 100% de cada um.

   O all-intra é o que faz a cena ser fluida: vídeo de IA sai com keyframe a cada
   1 ou 2 segundos, e pedir `currentTime` entre keyframes obriga o decodificador
   a voltar ao anterior e decodificar tudo de novo — a 60Hz de rolagem ele
   descarta quase toda busca, e o sintoma é "travando em blocos".

   A receita está no `scripts/videos.mjs`, para quando trocarem os arquivos. */
const FPS = 24;

/* A CAUDA depois que o vídeo das peças chega ao último quadro. As seis batidas
   têm duração ditada pelo que acontece nelas (o vídeo, a digitação, o feixe);
   esta sobra existe só para o último passo ser lido — é o mais carregado dos
   seis, com duas informações de apoio ao lado.

   Curta de propósito. O que se vê aqui é o quadro final do vídeo, e quadro
   parado de vídeo não lê como fim, lê como travamento: o que segura a cena de
   pé nesses instantes é o avanço de câmera que a cauda ainda faz (ver a batida
   11). Esticá-la seria pedir que ele segurasse mais do que consegue. */
const DUR_FECHO = 1.6;

/* ───────────────────────────────────────────────────────────────────────────
   OS SEIS PASSOS

   `batida` é o rótulo da linha do tempo em que o passo começa — é ele que amarra
   o texto ao que a cena está fazendo. As batidas intermediárias ("acende",
   "digita", "envia", "resposta") não abrem passo: elas acontecem DENTRO de um.

   `lado` alterna, e alterna na ordem — não é decoração: ver o bloco "O TEXTO
   ALTERNA DE LADO" no topo.

   ───────────────────────────────────────────────────────────────────────────
   ERAM DEZ, E O PERCURSO TERMINA ONDE A CENA TERMINA

   As quatro frentes que o stepper antigo mostrava viraram, uma a uma, outra
   coisa:

   — "Atende e desenha" foi CORTADA. Era, palavra por palavra, o que os passos
     02, 03 e 04 mostram acontecendo. Repetir em texto o que a cena provou em
     movimento não reforça: enfraquece. Quem viu lê como "então aquilo não
     bastou", e quem não viu não ganha nada, porque a frase é mais pobre que a
     cena. Aquela frente continua na página — ela É os seis primeiros passos.
   — as outras três viraram APOIO dos passos 05 e 06 (ver `apoio`, abaixo).

   O que isso conserta: o percurso tinha três batidas depois do último quadro de
   vídeo, com a foto parada ao fundo e texto novo entrando por cima. A cena
   acabava e a rolagem continuava presa — que é exatamente a sensação que este
   componente existe para não produzir. Agora o pin solta quando a cena fecha.

   ───────────────────────────────────────────────────────────────────────────
   O LADO OPOSTO: O APOIO

   Cada passo escreve na margem de um lado, e a margem do outro ficava vazia — o
   véu escurecia uma faixa da tela para não pôr nada nela. É onde as três frentes
   couberam, e onde cabe o que o percurso não tinha onde dizer.

   O APOIO NÃO REPETE A FRASE PRINCIPAL, e essa é a regra que decide o que entra:
   o bloco grande diz o que ACONTECE naquele momento da cena, o apoio diz o que
   está por trás — o que a rede entrega, o que já vem junto, o que continua
   acontecendo depois. Duas leituras do mesmo instante, não a mesma dita duas
   vezes.

   E vem do que a página já afirma em outras seções (`numeros-quadro.tsx`,
   `modelos.tsx`): distribuição centralizada, estoque monitorado, CRM em tempo
   real, padrão de qualidade da rede, área e operação de cada modelo. Nada aqui
   é fato novo — se um número mudar lá, muda aqui junto. */
type Passo = {
  id: string;
  batida: string;
  rotulo: string;
  titulo: string;
  /* Nó, e não string, por causa do realce: as palavras que decidem a frase vêm
     em `<mark>` e saem na cor da marca. Ver `.pcs-txt mark` no CSS.

     UM REALCE POR PASSO, e no máximo dois. Realce é contraste, e contraste que
     se repete deixa de ser contraste: com meia frase em azul, o olho volta a ter
     que ler tudo para achar o que importa — que é exatamente o problema que o
     realce existe para resolver. */
  texto: React.ReactNode;
  lado: "e" | "d";
  /* No máximo DOIS por passo. O apoio ocupa a margem oposta, e a margem oposta
     tem a mesma largura da do texto principal: com três itens ela vira uma
     coluna de leitura própria, e aí são dois textos disputando a mesma cena. */
  apoio: { rotulo: string; texto: string }[];
};

const PASSOS: Passo[] = [
  {
    id: "totem",
    batida: "chegada",
    rotulo: "A unidade",
    titulo: "Tudo cabe num totem",
    texto: (
      <>
        Um equipamento em <mark>ponto de alto fluxo</mark>. É a loja inteira:
        atendimento, arte e gravação no mesmo lugar.
      </>
    ),
    lado: "e",
    apoio: [
      {
        rotulo: "A partir de 4 m²",
        texto:
          "Corredor de shopping, frente de caixa, aeroporto, rodoviária ou praça de alimentação.",
      },
      {
        rotulo: "Uma pessoa opera",
        texto:
          "Não existe função de designer nem de operador de máquina no ponto.",
      },
    ],
  },
  {
    id: "console",
    batida: "console",
    rotulo: "O atendimento",
    titulo: "Quem atende é a IA",
    texto: (
      <>
        A tela abre com <mark>uma pergunta só</mark>. Não há catálogo para
        folhear nem menu para aprender a usar.
      </>
    ),
    lado: "d",
    apoio: [
      {
        rotulo: "Inclusa na operação",
        texto:
          "A plataforma que atende, desenha e controla não é assinatura à parte nem custo mensal.",
      },
      {
        rotulo: "Quatro materiais",
        texto: "Copo térmico, placa de metal, chaveiro e lona.",
      },
    ],
  },
  {
    id: "pedido",
    batida: "cursor",
    rotulo: "O pedido",
    titulo: "O cliente escreve o que quer",
    texto: (
      <>
        Em palavras, do jeito dele. É esta a interface da unidade — e é por isso
        que <mark>ninguém precisa ser treinado</mark> para operar.
      </>
    ),
    lado: "e",
    apoio: [
      {
        rotulo: "Sem arquivo e sem medida",
        texto:
          "O cliente não traz vetor, não escolhe resolução e não informa a área de gravação.",
      },
    ],
  },
  {
    id: "raciocinio",
    batida: "pensa",
    rotulo: "A arte",
    titulo: "A IA resolve o desenho",
    texto: (
      <>
        Lê o pedido, escolhe o material, fecha o traço em vetor e ajusta à área
        da peça. <mark>Em segundos</mark>, sem designer no meio.
      </>
    ),
    lado: "d",
    apoio: [
      {
        rotulo: "Sai pronto para o laser",
        texto:
          "O traço já vem fechado em vetor e enquadrado na área útil da peça, sem ajuste manual.",
      },
      {
        rotulo: "Padrão da rede",
        texto:
          "Definido e mantido pela franqueadora, igual em todas as unidades.",
      },
    ],
  },
  {
    id: "laser",
    batida: "laser",
    rotulo: "A gravação",
    titulo: "O laser grava na hora",
    texto: (
      <>
        <mark>Sem encomenda e sem tiragem mínima.</mark> A peça é feita enquanto
        o cliente está no balcão.
      </>
    ),
    lado: "e",
    /* O ESTOQUE, que era a quarta frente. Ele cabe aqui porque é aqui que o
       insumo é consumido: a máquina gravando é o momento em que a peça em branco
       vira produto e some da prateleira. */
    apoio: [
      {
        rotulo: "Insumo da matriz",
        texto:
          "Produtos e matéria-prima saem da distribuição centralizada, sem caçar fornecedor.",
      },
      {
        rotulo: "Estoque monitorado",
        texto:
          "A plataforma acompanha o consumo de cada insumo e dispara o pedido antes de faltar.",
      },
    ],
  },
  {
    id: "pecas",
    batida: "pecas",
    rotulo: "O produto",
    titulo: "A peça sai pronta",
    texto: (
      <>
        Metal, cerâmica, lona, plástico — o mesmo equipamento e o mesmo insumo
        para todos. O que muda de uma peça para a outra é{" "}
        <mark>só a arte</mark>.
      </>
    ),
    lado: "d",
    /* AS DUAS FRENTES QUE SOBREVIVERAM COMO APOIO. É o lugar certo delas: as
       duas falam do que acontece DEPOIS que a peça existe — a arte que continua
       vendendo e a venda que chega à matriz. Como passos próprios, elas pediam
       três telas de rolagem a mais para dizer o que aqui cabe em duas linhas, ao
       lado da foto que já é o argumento. */
    apoio: [
      {
        rotulo: "Vende fora do ponto",
        texto:
          "A mesma arte vai para o catálogo da unidade e continua vendendo depois que a loja fecha.",
      },
      {
        rotulo: "A matriz vê na hora",
        texto:
          "Cada venda chega à franqueadora no instante em que acontece, sem ninguém preencher planilha.",
      },
    ],
  },
];

/* Os ícones da barra do campo. Traço de 1,6 como o resto dos ícones do site, e
   desenhados aqui em vez de virem de um pacote: são quatro caminhos. */
function IcoMais() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 5.5v13M5.5 12h13" strokeLinecap="round" />
    </svg>
  );
}

function IcoMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" strokeLinecap="round" />
    </svg>
  );
}

/* A onda de voz. Cinco barras de alturas diferentes — a mesma figura que todo
   console usa para "falar em vez de escrever". */
function IcoOnda() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 10v4M8 6.5v11M12 3.5v17M16 6.5v11M20 10v4" strokeLinecap="round" />
    </svg>
  );
}

function IcoCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* O ponteiro. Desenhado, e não o cursor do sistema: o cursor de verdade está na
   mão de quem rola a página, e o da cena precisa estar onde a cena mandar. */
function IcoPonteiro() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 2.5 18.5 11.2 12.4 12.2 15.6 19.4 13 20.6 9.8 13.4 5 17.6Z"
        fill="#f4fbff"
        stroke="rgba(6,12,18,0.55)"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Percurso() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;

    let cancelado = false;
    let limpar: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const q = (s: string) => gsap.utils.toArray<HTMLElement>(no.querySelectorAll(s));
        const um = <T extends HTMLElement>(s: string) => no.querySelector<T>(s)!;
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /* A sangria é medida no próprio elemento, sem a classe: a distância da
             borda esquerda dele até a borda da janela é exatamente o que falta
             de cada lado. Medir o pai erra — o `<section>` tem respiro interno.

             E é medida, nunca `50vw`: `100vw` inclui a barra de rolagem. */
          const sangrar = () => {
            no.classList.remove("est-vivo");
            const folga = no.getBoundingClientRect().left;
            no.classList.add("est-vivo");
            no.style.setProperty("--est-sangria", `${Math.max(0, folga)}px`);
          };
          sangrar();

          const vTotem = um<HTMLVideoElement>(".est-vid--totem");
          const vPecas = um<HTMLVideoElement>(".est-vid--pecas");
          const ui = um(".est-ui");
          const consola = um(".est-console");
          const digitado = um(".est-digitado");
          const legendas = q(".pcs-legenda");
          const enches = q(".pcs-enche");

          /* CARREGAMENTO TARDIO, e não `preload="auto"` no marcado.

             Os dois arquivos somam ~12MB, na resolução nativa de 1920px porque
             abaixo disso o navegador amplia — e ampliar era o que fazia a cena
             parecer de qualidade menor que a do arquivo. Esse peso não pode
             competir com o herói: o download só começa quando a seção está a
             duas telas de distância.

             Buscar quadro em vídeo sem dados não desenha nada, então o gatilho é
             deliberadamente folgado: melhor baixar cedo demais que a cena abrir
             em preto. */
          const puxar = ScrollTrigger.create({
            trigger: no,
            start: "top bottom+=200%",
            once: true,
            onEnter: () => {
              vTotem.preload = "auto";
              vPecas.preload = "auto";
              vTotem.load();
              vPecas.load();
            },
          });

          /* Um objeto por vídeo em vez de tween direto no elemento: o GSAP move
             o número e o `onUpdate` escreve o `currentTime`. Escrever direto na
             propriedade faria o GSAP ler o valor de volta a cada quadro, e o
             navegador devolve o quadro JÁ ENCONTRADO, não o pedido — a animação
             passaria a perseguir a própria latência de busca.

             E o `onUpdate` só busca quando o quadro MUDA. A rolagem dispara
             dezenas de atualizações por segundo, mas o vídeo tem 24 quadros. */
          const cabeca = (v: HTMLVideoElement) => {
            const p = { t: 0 };
            let ultimo = -1;
            return {
              alvo: p,
              fim: {
                t: 1,
                ease: "none" as const,
                onUpdate: () => {
                  const d = v.duration;
                  if (!Number.isFinite(d) || d <= 0) return;
                  const quadro = Math.round(p.t * d * FPS);
                  if (quadro === ultimo) return;
                  ultimo = quadro;
                  v.currentTime = Math.min(d - 1 / FPS, quadro / FPS);
                },
              },
            };
          };

          /* Estado zero. O campo é ESVAZIADO aqui: o servidor manda o pedido
             escrito nele para o estado sem script fazer sentido, e é este
             `textContent = ""` que devolve a folha em branco para a digitação. */
          gsap.set(ui, { autoAlpha: 0 });
          gsap.set(consola, { scale: 1, transformOrigin: "50% 62%" });
          gsap.set(q(".est-saudacao, .est-composer, .est-atalhos"), { autoAlpha: 0, y: 16 });
          gsap.set(q(".est-cursor, .est-clique"), { autoAlpha: 0 });
          gsap.set(q(".est-caret"), { autoAlpha: 0 });
          gsap.set(q(".est-thread"), { autoAlpha: 0 });
          gsap.set(q(".est-turno"), { autoAlpha: 0, y: 18 });
          /* Só as falas da IA nascem escondidas. A do cliente entra junto com o
             turno dela, no envio — ela É o envio. */
          gsap.set(q(".est-turno--ia .est-fala"), { autoAlpha: 0, y: 14 });
          gsap.set(q(".est-passo"), { autoAlpha: 0, y: 10 });
          gsap.set(q(".est-ok"), { autoAlpha: 0 });
          gsap.set(q(".est-feixe"), { autoAlpha: 0 });
          gsap.set(q(".est-flash"), { autoAlpha: 0 });
          gsap.set(vPecas, { autoAlpha: 0, scale: 1, transformOrigin: "50% 50%" });
          digitado.textContent = "";

          /* As legendas somem por OPACIDADE, e nunca por `autoAlpha`.

             `autoAlpha` leva o `visibility: hidden` junto, e isso tiraria os seis
             textos da árvore de acessibilidade — o percurso inteiro sumiria para
             quem usa leitor de tela, que é justamente o público que não pode
             assistir à cena. Em opacidade pura eles continuam sendo lidos, em
             ordem, como uma lista de seis passos.

             `pointer-events: none` vem do CSS, permanente: são textos, não têm
             o que receber de clique. */
          gsap.set(legendas, { opacity: 0, y: 18 });

          /* A RÉGUA é pintada a partir dos TEMPOS DOS RÓTULOS, e eles só existem
             depois que a linha do tempo inteira está montada: os seis primeiros
             são posicionados relativamente (`>+=`), então cada um depende da
             duração do tween anterior.

             Daí as duas caixas vazias aqui em cima. O `onUpdate` do
             ScrollTrigger dispara já na primeira medição — antes de qualquer
             rótulo existir — e é por isso que `pintar` sai calada com a lista
             vazia em vez de dividir por um intervalo que ainda não tem fim. */
          let inicios: number[] = [];
          let fim = 0;

          const pintarRegua = () => {
            if (!inicios.length || fim <= 0) return;
            const t = tl.time();
            enches.forEach((el, i) => {
              const a = inicios[i];
              const b = i + 1 < inicios.length ? inicios[i + 1] : fim;
              const p = b > a ? (t - a) / (b - a) : 0;
              el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
            });
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: no,
              pin: um(".est-palco"),
              start: "top top",
              /* SENSIBILIDADE — este número é o inverso dela. É a distância de
                 rolagem que a cena inteira consome; quanto MENOR, mais cena por
                 gesto de trackpad.

                 Passou por 5200 (as dez batidas da cena sozinha), 7600 (com as
                 frentes como passos próprios) e 6200. Agora 4200, a pedido: a
                 cena estava lenta de rolar, e a razão é que o número vinha sendo
                 calculado pelo tempo de LEITURA do passo mais carregado, não
                 pelo ritmo do vídeo. Quem lê para no meio do gesto — e, com a
                 rolagem sendo a cabeça de leitura, parar de rolar já congela a
                 cena para ler. Não é preciso comprar esse tempo antecipado em
                 pixels de rolagem para todo mundo.

                 O piso é o vídeo, não o texto: abaixo de ~3500 as duas tomadas
                 passam depressa demais para o decodificador acompanhar em
                 trackpad, e o sintoma é a cena andando aos saltos. */
              end: "+=4200",
              /* Suavização quase nula: valor alto faz o vídeo continuar buscando
                 depois que a pessoa parou de rolar, e buscar sem rolagem lê como
                 atraso, não como suavidade. */
              scrub: 0.18,
              invalidateOnRefresh: true,
              /* A régua é pintada aqui, escrevendo `--p` direto no DOM. Sem
                 estado de React: são nove elementos e um número por quadro, e
                 re-renderizar a árvore a 60Hz para mover uma barra de 2px é o
                 tipo de custo que se paga em travada de rolagem. */
              onUpdate: () => pintarRegua(),
            },
          });

          /* `">+=0.3"` e não `">+0.3"`. Sem o `=` o GSAP não reconhece o
             deslocamento relativo, o rótulo cai em posição inválida e a linha do
             tempo fica com duração quebrada — o sintoma não é rótulo fora de
             lugar, é o pin travado na página inteira e a cena congelada. Já
             aconteceu neste arquivo. */
          const batida = (nome: string, i: number, folga = 0.3) =>
            tl.addLabel(nome, i === 0 ? 0 : `>+=${folga}`);

          /* 1 — o totem chega. A rolagem é a cabeça de leitura do vídeo. */
          const chTotem = cabeca(vTotem);
          batida("chegada", 0);
          tl.to(chTotem.alvo, { ...chTotem.fim, duration: 3 }, "chegada");

          /* 2 — a tela acesa. Só um rótulo: quem entrega esta batida é o próprio
             vídeo, e o que ela faz na linha do tempo é reservar o tempo de
             rolagem em que o azul inunda a tela. */
          batida("acende", 1);

          /* 3 — o console abre na tela que o vídeo deixou preta. Saudação, campo
             e atalhos entram escalonados, de cima para baixo: é a ordem em que
             uma interface se monta, e entrar tudo junto lê como imagem colada. */
          batida("console", 2);
          tl.to(ui, { autoAlpha: 1, duration: 0.5 }, "console")
            .to(
              q(".est-saudacao, .est-composer, .est-atalhos"),
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.16 },
              "console+=0.15",
            );

          /* 4 — o ponteiro atravessa e clica no campo.

             Ele mora DENTRO do campo, deslocado por `x`/`y`, e volta para a
             origem. Posicioná-lo contra a cena exigiria saber onde o campo caiu
             em cada largura de tela; assim o destino é sempre exato.

             `power2.out` porque mão que aponta chega freando. */
          batida("cursor", 3);
          tl.fromTo(
            q(".est-cursor"),
            { x: 300, y: 230, autoAlpha: 0 },
            { x: 0, y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
            "cursor",
          )
            .fromTo(
              q(".est-clique"),
              { scale: 0.2, autoAlpha: 0.9 },
              { scale: 1, autoAlpha: 0, duration: 0.5, ease: "power2.out" },
              "cursor+=0.95",
            )
            .to(q(".est-caret"), { autoAlpha: 1, duration: 0.2 }, "cursor+=1")
            .to(q(".est-dica"), { autoAlpha: 0, duration: 0.2 }, "cursor+=1.05");

          /* 5 — o zoom e a digitação.

             O zoom é a única forma de o que foi digitado ser legível: é texto de
             15px no meio de uma cena de tela cheia. Origem em 62% da altura, que
             é onde o campo está.

             ELE ENCOLHEU de 1.18 para 1.1 quando o texto foi para as margens: o
             console agora divide a largura com as duas colunas de legenda, e o
             zoom antigo o fazia invadir a coluna do passo.

             A escrita é um NÚMERO animado, não uma sequência de `setTimeout`:
             assim ela obedece ao `scrub` como o resto da cena, e rolar para trás
             apaga o texto letra por letra. */
          batida("digita", 4);
          const escrita = { n: 0 };
          tl.to(consola, { scale: 1.1, duration: 0.9, ease: "power2.out" }, "digita")
            .to(q(".est-cursor"), { autoAlpha: 0, duration: 0.3 }, "digita+=0.3")
            .to(
              escrita,
              {
                n: PEDIDO.length,
                duration: 1.6,
                ease: "none",
                onUpdate: () => {
                  digitado.textContent = PEDIDO.slice(0, Math.round(escrita.n));
                },
              },
              "digita+=0.35",
            );

          /* 6 — enviado. O texto sai do campo e sobe como fala do cliente, e o
             console volta ao tamanho natural: o assunto deixou de ser o que se
             escreve e passou a ser o que a máquina faz com isso. */
          batida("envia", 5);
          tl.to(consola, { scale: 1, duration: 0.7, ease: "power2.inOut" }, "envia")
            .to(q(".est-composer-txt"), { autoAlpha: 0, duration: 0.25 }, "envia")
            .to(q(".est-saudacao, .est-atalhos"), { autoAlpha: 0, duration: 0.3 }, "envia")
            .to(q(".est-thread"), { autoAlpha: 1, duration: 0.3 }, "envia+=0.15")
            .to(q(".est-turno--cliente"), { autoAlpha: 1, y: 0, duration: 0.4 }, "envia+=0.2");

          /* 7 — o raciocínio. Os passos entram um a um e vão fechando com o
             visto; o anel de cada um apaga quando o visto chega.

             O ÚLTIMO NÃO FECHA — daí o `slice(0, -1)` nas duas listas. Ele fica
             girando enquanto o feixe entra, porque é literalmente o que está
             acontecendo: a peça ainda não existe. */
          batida("pensa", 6);
          const passosIa = q(".est-passo");
          tl.to(q(".est-turno--ia"), { autoAlpha: 1, y: 0, duration: 0.4 }, "pensa")
            .to(passosIa, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.3 }, "pensa+=0.15")
            .to(q(".est-ok").slice(0, -1), { autoAlpha: 1, duration: 0.25, stagger: 0.3 }, "pensa+=0.5")
            .to(q(".est-anel").slice(0, -1), { autoAlpha: 0, duration: 0.25, stagger: 0.3 }, "pensa+=0.5");

          /* 8 — a resposta em texto. */
          batida("resposta", 7);
          tl.to(
            q(".est-turno--ia .est-fala"),
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.25 },
            "resposta",
          );

          /* 9 — o feixe varre e estoura em branco. */
          batida("laser", 8);
          tl.to(q(".est-feixe"), { autoAlpha: 1, duration: 0.2 }, "laser")
            .fromTo(q(".est-feixe"), { xPercent: -65 }, { xPercent: 65, duration: 1.1, ease: "none" }, "laser")
            .to(ui, { autoAlpha: 0, duration: 0.5 }, "laser+=0.7")
            .to(q(".est-flash"), { autoAlpha: 1, duration: 0.4, ease: "power3.in" }, "laser+=0.9")
            .to(q(".est-feixe"), { autoAlpha: 0, duration: 0.2 }, "laser+=1.2");

          /* 10 — as peças chegam voando, saindo do branco. A troca de vídeo
             acontece escondida atrás do estouro: é para isso que ele existe. */
          const chPecas = cabeca(vPecas);
          batida("pecas", 9);
          tl.set(vTotem, { autoAlpha: 0 }, "pecas")
            .set(vPecas, { autoAlpha: 1 }, "pecas")
            .to(q(".est-flash"), { autoAlpha: 0, duration: 0.7 }, "pecas+=0.1")
            .to(chPecas.alvo, { ...chPecas.fim, duration: 3 }, "pecas");

          /* 11 — A CAUDA. Nenhum rótulo novo: o percurso já contou os seis
             passos, e o que falta é tempo para o último ser lido — ele é o mais
             carregado, com duas informações de apoio ao lado.

             AQUI ENTRAVA A MESA POSTA — a foto com as peças gravadas de verdade,
             que cobria o quadro final do vídeo. Ela saiu a pedido, e o problema
             que ela resolvia voltou junto: o vídeo das peças termina com a câmera
             parada no meio de um movimento de aproximação, e quadro congelado de
             vídeo não lê como fim, lê como travamento.

             Quem resolve agora é ESTE tween. A cabeça de leitura chegou ao último
             quadro, mas o elemento continua se aproximando por conta própria —
             4% de escala, quase imperceptível por quadro, e é essa lentidão que
             separa "cena viva" de "imagem que travou". O movimento não é do
             arquivo, é do `<video>`: `scale` no elemento, e não `currentTime`.

             A troca de arquivos aqui é possível de novo: se um dia o vídeo das
             peças ganhar um fim de câmera próprio, este tween sai. */
          tl.to(
            vPecas,
            { scale: 1.04, ease: "none", duration: DUR_FECHO },
            "pecas+=2.6",
          );

          /* ---- as legendas ----

             Cada uma entra no rótulo do seu passo e sai um pouco antes do
             próximo começar: a folga de 0.25 é o que evita as duas coexistirem
             em lados opostos da tela, que leria como dois assuntos simultâneos.

             A última não tem "próximo" e fica até o fim do percurso — é ela que
             está na tela quando o pin solta e a página volta a rolar. */
          PASSOS.forEach((p, i) => {
            const el = legendas[i];
            if (!el) return;
            tl.to(el, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, p.batida);
            const prox = PASSOS[i + 1];
            if (prox) {
              tl.to(el, { opacity: 0, y: -14, duration: 0.35, ease: "power2.in" }, `${prox.batida}-=0.25`);
            }
          });

          /* ---- a régua ----

             Os tempos são lidos DEPOIS de tudo montado: os rótulos das seis
             primeiras batidas são posicionados relativamente (`>+=`), então o
             tempo de cada um só existe quando o último tween entrou na linha.

             A régua conta duas coisas que um contador de "passo 3 de 10" não
             conta: quanto falta para trocar, e que existe um caminho inteiro
             atrás. Segmento cheio à esquerda é passado, vazio à direita é o que
             vem. */
          inicios = PASSOS.map((p) => tl.labels[p.batida] ?? 0);
          fim = tl.duration();
          pintarRegua();

          /* A classe `est-vivo` sangra a seção para a largura da tela, e isso
             muda a altura do documento. O ScrollTrigger já mediu antes disso —
             ele não observa mudanças de layout que ele próprio não causou — e
             fica com início e fim errados. O sintoma é cruel de diagnosticar:
             tudo carrega, o espaçador tem a altura certa, a rolagem funciona, e
             mesmo assim o pin nunca engata e a cena não sai do primeiro quadro.

             Uma remedição depois de tudo montado resolve. Vale também para os
             vídeos: `loadedmetadata` pode mudar caixa no estado sem palco. */
          ScrollTrigger.refresh();

          const remedir = () => {
            sangrar();
            ScrollTrigger.refresh();
          };
          vTotem.addEventListener("loadedmetadata", remedir);
          vPecas.addEventListener("loadedmetadata", remedir);
          window.addEventListener("resize", remedir);

          return () => {
            vTotem.removeEventListener("loadedmetadata", remedir);
            vPecas.removeEventListener("loadedmetadata", remedir);
            window.removeEventListener("resize", remedir);
            puxar.kill();
            /* Devolve o pedido ao campo. Sem isto, sair do modo animado — troca
               para movimento reduzido, desmontagem — deixaria o campo vazio, que
               é justamente o estado que o HTML do servidor evita. */
            digitado.textContent = PEDIDO;
            no.style.removeProperty("--est-sangria");
            no.classList.remove("est-vivo");
          };
        });

        return () => mm.revert();
      }, no);

      limpar = () => ctx.revert();
    })();

    return () => {
      cancelado = true;
      limpar?.();
    };
  }, []);

  return (
    <div className="estudio pcs" ref={raiz}>
      <div className="est-palco">
        <div className="est-cena">
          {/* Os dois vídeos ocupam a cena inteira e se revezam. `muted` não é
              preferência: é o que deixa o navegador decodificar sem gesto do
              usuário, e vídeo movido por rolagem não tem sentido de áudio. */}
          <video
            className="est-vid est-vid--totem"
            src="/cena/totem.mp4"
            muted
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <video
            className="est-vid est-vid--pecas"
            src="/cena/pecas.mp4"
            muted
            playsInline
            preload="none"
            aria-hidden="true"
          />

          {/* AQUI FICAVA A MESA POSTA — `/cena/mesa-completa.jpg`, a foto com as
              peças gravadas de verdade, que entrava por cima do quadro final do
              vídeo das peças e fechava a cena.

              Ela saiu a pedido. A cena termina no vídeo, e o que evita o quadro
              congelado é o avanço de câmera da cauda (batida 11). O arquivo
              continua no repositório e segue em uso por `estudio.tsx` e
              `frentes.tsx` — remontar isto é devolver um `<img className="est-vid
              est-vid--mesa">` aqui e os dois tweens da batida 11; as regras de
              `.est-vid--mesa` nunca saíram do `estudio.css`. */}

          {/* O VÉU LATERAL. Escurece só as duas margens, onde o texto vive, e
              deixa o meio do quadro intacto — é o que permite o texto ser claro
              sobre qualquer quadro dos vídeos sem apagar a cena.

              Um véu chapado sobre tudo resolveria o contraste e mataria o
              assunto: a cena ficaria atrás de um vidro fosco durante os seis
              passos. */}
          <div className="pcs-veu" aria-hidden="true" />

          <div className="est-ui">
            <div className="est-console">
              {/* A saudação. Símbolo e frase na mesma linha, centrados — é o
                  formato que um console de IA usa para dizer "estou pronto"
                  sem escrever nada além da pergunta. */}
              <p className="est-saudacao">
                <Marca className="est-saudacao-marca" />
                <span>O que você quer gravar hoje?</span>
              </p>

              {/* O TOPO TEM ALTURA FIXA e guarda duas coisas na mesma célula: a
                  saudação, que sai, e a conversa, que entra. Sem a altura
                  reservada, a conversa crescendo empurraria o campo para baixo
                  no meio da cena — e o campo é o que o zoom acabou de
                  enquadrar. Ele não pode se mexer. */}
              <div className="est-topo">
                <div className="est-thread">
                  <div className="est-turno est-turno--cliente">
                    <div className="est-falas">
                      <p className="est-fala est-fala--dita">{PEDIDO}</p>
                    </div>
                  </div>

                  <div className="est-turno est-turno--ia">
                    <span className="est-marca" aria-hidden="true">
                      <Marca />
                    </span>
                    <div className="est-falas">
                      {/* O bloco de raciocínio. Ele vem ANTES da resposta porque
                          é o que acontece antes dela — e é a parte que prova que
                          existe trabalho sendo feito, não uma frase pronta. */}
                      <div className="est-pensando">
                        <span className="est-pensando-rot">Pensando</span>
                        <ul className="est-passos">
                          {PASSOS_IA.map((p) => (
                            <li className="est-passo" key={p}>
                              <span className="est-passo-ico" aria-hidden="true">
                                <i className="est-anel" />
                                <span className="est-ok">
                                  <IcoCheck />
                                </span>
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {RESPOSTA.map((texto, i) => {
                        /* A última fala é a que está acontecendo: ela ganha os
                           pontos pulsando. */
                        const gerando = i === RESPOSTA.length - 1;
                        return (
                          <p key={texto} className="est-fala">
                            {texto}
                            {gerando && (
                              <span className="est-pontos" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                              </span>
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* O CAMPO. Não é um `<input>`: nada aqui é para ser preenchido, e
                  um campo de verdade no meio de uma cena pediria foco, teclado
                  no celular e um `<label>` para leitor de tela — três promessas
                  que a cena não cumpre. É um desenho, e por isso é `<div>`. */}
              <div className="est-composer">
                <div className="est-composer-txt">
                  <span className="est-dica">Descreva a peça e a arte…</span>
                  <span className="est-digitado">{PEDIDO}</span>
                  <span className="est-caret" aria-hidden="true" />
                </div>

                <div className="est-composer-barra" aria-hidden="true">
                  <span className="est-acao est-acao--mais">
                    <IcoMais />
                  </span>
                  <span className="est-modelo">
                    GRAVA.AI <b>Estúdio</b>
                  </span>
                  <span className="est-acao">
                    <IcoMic />
                  </span>
                  <span className="est-acao">
                    <IcoOnda />
                  </span>
                </div>

                {/* O ponteiro e o anel do clique vivem dentro do campo: o
                    destino deles é o campo, e assim ele é exato em qualquer
                    largura de tela. */}
                <span className="est-clique" aria-hidden="true" />
                <span className="est-cursor" aria-hidden="true">
                  <IcoPonteiro />
                </span>
              </div>

              <div className="est-atalhos" aria-hidden="true">
                {ATALHOS.map((a) => (
                  <span className="est-atalho" key={a}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="est-feixe" aria-hidden="true" />
          <div className="est-flash" aria-hidden="true" />
        </div>

        {/* ---- O TEXTO, NAS DUAS MARGENS ----

            Uma lista ordenada de verdade, e não seis `<div>`: para quem não vê a
            cena isto É o conteúdo da seção, e a ordem dos passos precisa existir
            na marcação, não só na tipografia. Sem script ela cai em duas colunas
            de texto normal, embaixo da composição.

            CADA PASSO OCUPA A LARGURA INTEIRA e se divide por dentro: o bloco
            principal numa margem, o apoio na outra, o corredor do console no
            meio. É por isso que o `<li>` repete o mesmo grid de três colunas do
            pai em vez de morar numa delas — assim o par nasce alinhado, e a
            opacidade continua tendo UM alvo por passo em vez de dois que podem
            dessincronizar.

            O NÚMERO SAIU DA TELA, e não da estrutura: `<ol>` numera para o leitor
            de tela sem desenhar nada. Ele era um "01" mono acima de cada bloco, e
            não contava nada que a régua da base não conte melhor — ela ainda diz
            quanto falta.

            Os seis ficam SEMPRE no DOM, escondidos por opacidade e nunca por
            `visibility` — ver o bloco das legendas na linha do tempo. */}
        <ol className="pcs-legendas">
          {PASSOS.map((p) => (
            <li className="pcs-legenda" data-lado={p.lado} key={p.id}>
              <div className="pcs-bloco">
                <span className="pcs-rot mono">{p.rotulo}</span>
                <h3 className="pcs-tit">{p.titulo}</h3>
                <p className="pcs-txt">{p.texto}</p>
              </div>

              {/* O APOIO, na margem oposta. Lista de verdade, e não parágrafos
                  soltos: são itens irmãos e independentes, e é assim que um
                  leitor de tela os anuncia — "lista de dois itens" — em vez de
                  emendar tudo na frase do passo. */}
              <ul className="pcs-apoio">
                {p.apoio.map((a) => (
                  <li key={a.rotulo}>
                    <b className="pcs-apoio-rot">{a.rotulo}</b>
                    <span className="pcs-apoio-txt">{a.texto}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* ---- A RÉGUA ----

            Decorativa: quem anuncia o percurso é a lista ordenada acima. Aqui é
            só a barra de tempo, e ela é o único lugar em que a posição no percurso
            aparece desenhada: cheio à esquerda é passado, vazio à direita é o que
            vem. O preenchimento é `scaleX(var(--p))`, escrito pelo `onUpdate` da
            linha do tempo. */}
        <div className="pcs-regua" aria-hidden="true">
          {PASSOS.map((p) => (
            <span className="pcs-seg" key={p.id}>
              <i className="pcs-enche" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
