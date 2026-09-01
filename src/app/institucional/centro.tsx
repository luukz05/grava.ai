"use client";

/* O CENTRO — a IA e o cliente, aliados, ditos em movimento.

   ───────────────────────────────────────────────────────────────────────────
   A FRASE QUE A CENA DESENHA

   A marca coloca o cliente no centro da criação. A Inteligência Artificial não
   substitui esse cliente: ela o ACOMPANHA — recebe a ideia dele, otimiza,
   projeta, e é isso que faz a personalização acontecer na hora.

   Por isso o cliente nunca sai do meio da cena. Nenhuma batida o apaga,
   nenhuma o troca por outra coisa. O que muda em volta dele é quem chegou
   para ajudar:

   1 · O CLIENTE NO CENTRO — a órbita se insinua e ele aparece no meio dela.
   2 · A IDEIA É DELE — um balão sobe do cliente. O pedido existe antes de
       existir máquina, e é dele.
   3 · A IA PROJETA EM VOLTA — o balão é recolhido e uma coroa se fecha em
       torno do cliente: um ponto de luz dá a volta nele e vai deixando o
       traço atrás de si. A marca acende no alto dessa coroa quando ela fecha.
       Ninguém foi substituído — alguém foi REVESTIDO.
   4 · O PRODUTO — uma onda parte do centro, a órbita externa se rompe e a
       coroa explode em peças, que abrem numa esfera em volta do par cliente +
       IA e ficam girando.

   A VERSÃO ANTERIOR DIZIA O CONTRÁRIO, e por isso mudou: lá a marca CRESCIA
   NO LUGAR do cliente e ele apagava. Desenhar substituição numa seção cujo
   texto afirma "o cliente no centro da criação" é a página se contradizer no
   meio da própria frase — o mesmo defeito que fez os três passos saírem de
   uma fileira de cartões, que é a forma de uma esteira.

   ───────────────────────────────────────────────────────────────────────────
   O TEXTO ANDA EM VOLTA DA CENA, e não numa coluna fixa

   Antes eram duas colunas: texto sempre à esquerda, desenho sempre à direita.
   Legível e inerte — quatro batidas na mesma moldura, com o olho parado no
   mesmo lugar as quatro vezes.

   Agora a cena fica grudada no meio da tela e o texto passa POR VOLTA dela:
   em cima na primeira batida, à esquerda na segunda, à direita na terceira,
   embaixo na quarta. É o mesmo percurso que a cena desenha — algo girando em
   torno de quem está no meio —, agora acontecendo também com o corpo da
   página. O leitor faz a volta junto.

   A troca de lugar é ESTRUTURAL, não animada: cada bloco tem o seu canto
   (`data-lugar`) e a rolagem faz o resto. Mover texto com JavaScript por cima
   de uma cena que já é raspada pela rolagem seria um segundo relógio medindo
   o mesmo intervalo.

   ───────────────────────────────────────────────────────────────────────────
   A ROLAGEM CONTINUA LIVRE. ISTO NÃO PRENDE A PÁGINA.

   Nada aqui segura a rolagem: os blocos rolam em fluxo normal, a cena
   acompanha com `position: sticky` — trabalho do navegador — e a linha do
   tempo é raspada (`scrub`) pela posição da coluna. Descer avança, subir
   desfaz, parar congela.

   As batidas são IGUALMENTE ESPAÇADAS (`i * T_BATIDA`) e os blocos têm a mesma
   altura mínima. É essa dupla igualdade que faz a explosão acontecer enquanto
   o texto do produto está na tela — sem um gatilho por bloco para amarrar as
   duas coisas.

   A ESFERA GIRA EM CSS, e não no relógio do GSAP. Três animações de mesma
   duração: uma vira o conjunto, a segunda desvira cada peça para ela continuar
   de frente para quem olha, e a terceira apaga a peça quando ela passa por
   trás. Feito em `requestAnimationFrame` seriam catorze matrizes recalculadas
   por quadro em JavaScript enquanto a pessoa rola; feito assim, o compositor
   resolve. O GSAP só abre e fecha a esfera. */

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { Marca, IcoArte } from "../icons";
import { E_UI, E_LUZ, E_MOLA, E_MOLA_SOLTA } from "./curvas";

/* As fotos são IMPORTADAS e não caminhos de `public/`, pela mesma razão de
   `gravidade.tsx`: o arquivo vai para `_next/static/media` com o hash do
   conteúdo no nome, e trocar a foto troca a URL. Servido de `public/`, o
   endereço é fixo para sempre e o otimizador continua entregando a foto velha
   em algumas larguras e a nova em outras. */
import copo from "../produtos/copo.png";
import faca from "../produtos/faca.png";
import sacola from "../produtos/sacola.png";
import caneta from "../produtos/caneta.png";
import garrafa from "../produtos/garrafa.png";

/* As cinco peças, na ordem que alterna silhueta — bojuda, fina, larga, fina,
   bojuda. A `escala` iguala a ÁREA e não a altura: as fotos têm todas 900px de
   alto e larguras diferentes, então normalizadas pela altura a sacola ocupa
   quase o dobro do copo. Mesmos valores de `gravidade.tsx`. */
const PECAS: Array<{ src: StaticImageData; escala: number }> = [
  { src: copo, escala: 0.72 },
  { src: faca, escala: 0.78 },
  { src: sacola, escala: 0.66 },
  { src: caneta, escala: 0.76 },
  { src: garrafa, escala: 0.72 },
];

/* ───────────────────────────────────────────────────────────────────────────
   A ESFERA

   Catorze posições distribuídas por FIBONACCI, e não por uma grade de
   paralelos e meridianos. Numa grade as peças se amontoam nos polos e abrem
   buracos no equador — é o defeito de sempre ao dividir uma esfera em ângulos
   iguais. O ângulo áureo espalha os pontos de forma quase uniforme sem que
   nenhum par caia no mesmo meridiano, e a diferença entre as duas
   distribuições é a diferença entre um enxame e uma cortina.

   Determinístico: nada de sorteio. O mesmo desenho no servidor e no cliente,
   como no resto da página. */
const N_ORBES = 14;
const AUREO = 137.50776405003785;

const ORBES = Array.from({ length: N_ORBES }, (_, i) => {
  /* `i + 0.5` e não `i`: sem o meio passo o primeiro ponto cai exatamente no
     polo, e peça em cima do polo é peça vista de topo — a única posição da
     esfera em que a foto não se lê. */
  const t = (i + 0.5) / N_ORBES;
  /* `acos(1 − 2t)` é o que dá área igual por peça. Distribuir a latitude
     linearmente concentraria tudo perto dos polos, onde os paralelos são
     curtos. */
  const lat = 90 - (Math.acos(1 - 2 * t) * 180) / Math.PI;
  const lon = (i * AUREO) % 360;

  /* A PROFUNDIDADE, RESOLVIDA NA FASE.

     A perspectiva já muda o TAMANHO da peça conforme ela vem e vai; o que
     faltava era o resto do sinal de distância — longe é mais apagado. Sem
     isso as catorze peças têm o mesmo peso de tinta, e o olho lê um móbile de
     recortes chapados em vez de um volume.

     A posição em z é `R·cos(lat)·cos(giro + lon)`: uma cossenoide de período
     igual ao da volta, defasada pela longitude da peça. Então a opacidade não
     precisa de conta nenhuma por quadro — basta a MESMA animação em todas com
     um `animation-delay` proporcional à longitude. `fase` é essa defasagem,
     em voltas.

     `dim` é o quanto a peça chega a apagar, e ele depende da LATITUDE: quem
     está perto dos polos quase não se move em z (o `cos(lat)` encolhe o
     balanço) e apagar tanto quanto uma peça do equador seria anunciar uma
     viagem que ela não faz. */
  const emRad = (lat * Math.PI) / 180;
  return {
    lat,
    lon,
    fase: lon / 360,
    dim: +(1 - 0.74 * Math.cos(emRad)).toFixed(3),
    peca: PECAS[i % PECAS.length],
  };
});

/* Segundos para a esfera dar uma volta. Longa de propósito: a peça é o fundo
   de um texto que se lê, e giro rápido atrás de parágrafo é o mesmo erro de um
   carrossel automático.

   O valor é PUBLICADO em `--ctr-volta` e as três animações do `centro.css` —
   a volta, a contravolta e o apagamento do fundo — leem dele. Escrito à mão em
   cada lugar, meio segundo de diferença entre eles faz cada peça girar devagar
   sobre o próprio eixo enquanto orbita, e o defeito só aparece depois de um
   minuto de tela. */
const VOLTA = 46;

/* ───────────────────────────────────────────────────────────────────────────
   OS QUATRO TÓPICOS

   Um bloco de texto e uma batida da cena, com o mesmo nome. `lugar` é o canto
   da tela em que aquele bloco aparece — ver `[data-lugar]` no `centro.css`.

   Nenhum texto aqui é fato novo. O credo é o da seção `#marca`; "participa da
   criação em vez de escolher de um catálogo" e "carrega um significado" são do
   antigo `#produto`; "projeta a arte em segundos" e "na hora, e não por
   encomenda" recompõem o que `#ia` e o antigo passo 02 já afirmavam. A seção
   reorganiza o que a página diz — não acrescenta afirmação. */
type Topico = {
  id: string;
  lugar: "topo" | "esq" | "dir" | "baixo";
  rotulo: string;
  titulo: string;
  texto: React.ReactNode;
};

const TOPICOS: Topico[] = [
  {
    id: "credo",
    lugar: "topo",
    rotulo: "A marca",
    titulo: "O cliente no centro",
    texto: (
      <>
        Uma marca que coloca o cliente <mark>no centro da criação</mark> e usa
        tecnologia para transformar cada momento em um produto que carrega uma
        história.
      </>
    ),
  },
  {
    id: "ideia",
    lugar: "esq",
    rotulo: "Passo 01",
    titulo: "A ideia é dele",
    texto: (
      <>
        No totem, o cliente descreve o que quer. Ele{" "}
        <mark>participa da criação</mark> em vez de escolher de um catálogo.
      </>
    ),
  },
  {
    id: "ia",
    lugar: "dir",
    rotulo: "Passo 02",
    titulo: "A IA projeta em volta",
    texto: (
      <>
        A Inteligência Artificial recebe a ideia, otimiza e{" "}
        <mark>projeta a arte em segundos</mark>. É o que faz a personalização
        acontecer na hora, e não por encomenda.
      </>
    ),
  },
  {
    id: "produto",
    lugar: "baixo",
    rotulo: "Passo 03",
    titulo: "O produto",
    texto: (
      <>
        O cliente sai com um produto exclusivo que{" "}
        <mark>carrega um significado</mark> — e não com mais um item de
        prateleira.
      </>
    ),
  },
];

/* Quanto tempo de linha do tempo cabe em cada batida. Todas iguais, e é isso
   que as amarra aos blocos: quatro blocos de mesma altura mínima dividem a
   rolagem em quatro fatias iguais, e quatro batidas de mesma duração dividem a
   linha do tempo do mesmo jeito. Uma batida "mais importante" que ganhasse
   tempo extra sairia de sincronia com o texto dela. */
const T_BATIDA = 3;

/* O cliente. Traço 1.5 numa caixa de 24, como o resto do sistema de ícones —
   mora aqui e não em `icons.tsx` porque é o único desenho da página que
   representa uma PESSOA, e ele existe para esta cena. */
function IcoPessoa() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0113 0" />
    </svg>
  );
}

export function Centro() {
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
        const q = (s: string) =>
          gsap.utils.toArray<HTMLElement>(no.querySelectorAll(s));
        const um = <T extends Element>(s: string) => no.querySelector<T>(s)!;
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /* `ctr-vivo` liga o que só existe em movimento: o estado inicial
             abaixo, o giro da esfera e o esmaecimento dos blocos que não estão
             sendo lidos. Sem ela — sem script ou com movimento reduzido — a
             cena fica montada no estado final e os quatro blocos ficam todos
             legíveis. O LAYOUT É O MESMO NOS DOIS CASOS. */
          no.classList.add("ctr-vivo");

          const cena = um<HTMLElement>(".ctr-cena");
          const aura = um<HTMLElement>(".ctr-aura");
          const guia = um<HTMLElement>(".ctr-guia");
          const onda = um<HTMLElement>(".ctr-onda");
          const eu = um<HTMLElement>(".ctr-eu");
          const balao = um<HTMLElement>(".ctr-balao");
          const coroa = um<SVGCircleElement>(".ctr-coroa-fio");
          const orbita = um<HTMLElement>(".ctr-orbita");
          const cabeca = um<HTMLElement>(".ctr-cabeca");
          const selo = um<HTMLElement>(".ctr-selo");
          const esfera = um<HTMLElement>(".ctr-esfera");
          const orbes = q(".ctr-orbe-face");
          const blocos = q(".ctr-passo");

          /* Estado zero. Tudo que a cena constrói nasce ausente AQUI, e não no
             CSS: sem script a página mostra a cena montada, e esconder pelo
             CSS apagaria justamente esse estado. */
          gsap.set(aura, { opacity: 0, scale: 0.84 });
          gsap.set(guia, { autoAlpha: 0, scale: 0.86 });
          gsap.set(onda, { autoAlpha: 0, scale: 0.14 });
          gsap.set(eu, { autoAlpha: 0, scale: 0.55 });
          gsap.set(balao, { autoAlpha: 0, scale: 0.62, x: -12, y: 14 });
          gsap.set(coroa, { strokeDashoffset: 1 });
          gsap.set(orbita, { rotation: 0 });
          gsap.set(cabeca, { autoAlpha: 0, scale: 0.5 });
          gsap.set(selo, { autoAlpha: 0, scale: 0.4 });
          /* A esfera nasce fechada num ponto, não pequena: `scale: 0.04` é o
             que faz as catorze peças partirem todas do centro exato. Elas estão
             em `translateZ` fixo — o que explode é a caixa inteira, e é por
             isso que a peça cresce enquanto se afasta, como qualquer coisa que
             vem na sua direção.

             SÓ ESCALA, sem `autoAlpha`. Opacidade menor que 1 é propriedade de
             agrupamento: ela ACHATA o `preserve-3d` da caixa, e com a caixa
             achatada as peças param de se intercalar com o cliente no meio — as
             que passam na frente sumiriam atrás dele. Quem faz a aparição é o
             acender das faces, uma a uma. */
          gsap.set(esfera, { scale: 0.04 });
          gsap.set(orbes, { autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              /* O gatilho é a COLUNA DE BLOCOS e não a seção: é a altura dela
                 que define quanto a cena tem para andar, e é ela que carrega
                 os quatro blocos de mesma altura mínima.

                 `top center` → `bottom center`: começa quando o primeiro bloco
                 chega ao meio da tela e acaba quando o último sai dele. */
              trigger: um<HTMLElement>(".ctr-passos"),
              start: "top center",
              end: "bottom center",
              /* Raspagem folgada: o que continua andando depois que a pessoa
                 para é uma mola chegando ao repouso — que é exatamente o que
                 ela deveria estar fazendo. */
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });

          const batida = (nome: string, i: number) =>
            tl.addLabel(nome, i * T_BATIDA);

          /* ── 1 · O CLIENTE NO CENTRO ──
             A luz primeiro, o lugar depois, o cliente por último. A aura não
             desenha nada: ela diz onde é o centro, e alguém que aparece antes
             de o centro existir não está no centro de coisa nenhuma. A órbita
             externa entra junto, ainda apagada — ela é a promessa do diâmetro
             que a quarta batida vai ocupar. */
          batida("credo", 0);
          tl.to(
            aura,
            { opacity: 0.5, scale: 1, duration: 1.4, ease: E_LUZ },
            "credo"
          )
            .to(
              guia,
              { autoAlpha: 1, scale: 1, duration: 1.6, ease: E_MOLA },
              "credo+=0.15"
            )
            .to(
              eu,
              { autoAlpha: 1, scale: 1, duration: 1.1, ease: E_MOLA },
              "credo+=0.5"
            );

          /* ── 2 · A IDEIA É DELE ──
             O balão sobe do cliente — nasce meio corpo abaixo e à esquerda, na
             direção dele, e sobe para o lugar. Entra com a mola SOLTA, que
             passa uns 8% do ponto: é o único gesto da cena que deve ler como
             impulso, e não como posicionamento. A ideia chega; ela não se
             instala. */
          batida("ideia", 1);
          tl.to(
            balao,
            {
              autoAlpha: 1,
              scale: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: E_MOLA_SOLTA,
            },
            "ideia+=0.2"
          );

          /* ── 3 · A IA PROJETA EM VOLTA ──
             Três gestos, nesta ordem, e a ordem é a frase:

             — o balão é RECOLHIDO para o centro. A ideia não some: ela entra.
               Apagar onde está diria que foi descartada;
             — um ponto de luz DÁ A VOLTA no cliente e o traço da coroa nasce
               atrás dele. É a IA trabalhando em torno de quem pediu, e é o
               contrário do que a versão anterior desenhava — lá a marca crescia
               no lugar do cliente e ele apagava;
             — a marca ACENDE no alto da coroa quando ela fecha. Ela assina o
               que acabou de ser projetado; não ocupa o meio, que é do cliente.

             A cabeça e a coroa correm com a MESMA duração e a MESMA curva. Não
             é coincidência de valores: é a única forma de o ponto de luz
             continuar exatamente na ponta do traço do começo ao fim. Basta uma
             das duas mudar e a linha passa a nascer adiantada em relação a quem
             a desenha — e o efeito morre nesse fio de diferença. */
          batida("ia", 2);
          tl.to(
            balao,
            {
              autoAlpha: 0,
              scale: 0.34,
              xPercent: -52,
              yPercent: 64,
              duration: 0.9,
              ease: E_UI,
            },
            "ia"
          )
            .to(
              cabeca,
              { autoAlpha: 1, scale: 1, duration: 0.5, ease: E_MOLA_SOLTA },
              "ia+=0.25"
            )
            .to(
              orbita,
              { rotation: 360, duration: 1.7, ease: E_UI },
              "ia+=0.35"
            )
            .to(
              coroa,
              { strokeDashoffset: 0, duration: 1.7, ease: E_UI },
              "ia+=0.35"
            )
            .to(aura, { opacity: 0.76, duration: 1.2, ease: E_LUZ }, "ia+=0.4")
            /* A cabeça encolhe para dentro do ponto em que começou em vez de
               apagar no lugar: ela voltou de onde saiu, e é isso que fecha a
               volta. O selo entra no mesmo instante, no mesmo ponto. */
            .to(
              cabeca,
              { autoAlpha: 0, scale: 0.4, duration: 0.5, ease: E_LUZ },
              "ia+=1.95"
            )
            .to(
              selo,
              { autoAlpha: 1, scale: 1, duration: 0.9, ease: E_MOLA_SOLTA },
              "ia+=1.95"
            );

          /* ── 4 · O PRODUTO ──
             A ONDA parte primeiro e a esfera vem atrás dela. É essa ordem que
             faz a batida ler como explosão: sem a onda a esfera apenas cresce,
             e crescer é o que uma coisa faz quando aparece — não quando é
             lançada.

             A órbita externa se rompe ao ser atravessada pela onda. Ela cumpriu
             o papel de segurar o quadro e de prometer o diâmetro; deixá-la
             desenhada por trás da esfera daria à cena um segundo círculo
             competindo com o volume que acabou de nascer.

             O QUE FICA NO MEIO É O PAR: o cliente e a coroa da IA em volta
             dele, os dois um degrau menores para caber dentro da esfera. Eles
             são o assunto da seção inteira, e a peça que sai é consequência —
             não substituição.

             A CENA SOBE 10%. É a única batida em que ela sai do meio da tela,
             e o motivo é o texto: a cartela de fechamento fica EMBAIXO, e uma
             esfera de 62svh centrada não deixa faixa livre nenhuma sob ela.
             Sem a subida o parágrafo entra por dentro da esfera e uma faca em
             primeiro plano corta a linha no meio. A câmera dá o passo, o texto
             ganha o rodapé. */
          batida("produto", 3);
          tl.fromTo(
            onda,
            { autoAlpha: 0.7, scale: 0.14 },
            {
              autoAlpha: 0,
              scale: 1.55,
              duration: 1.7,
              ease: E_UI,
              /* Num `fromTo` dentro de uma linha do tempo o GSAP aplica o
                 estado inicial NA MONTAGEM, não na batida: sem isto a onda
                 nasceria acesa no meio da cena desde o primeiro quadro. */
              immediateRender: false,
            },
            "produto"
          )
            .to(
              guia,
              { autoAlpha: 0, scale: 1.3, duration: 0.9, ease: E_UI },
              "produto+=0.1"
            )
            .to(
              esfera,
              { scale: 1, duration: 1.9, ease: E_MOLA },
              "produto+=0.12"
            )
            .to(
              orbes,
              { autoAlpha: 1, duration: 0.7, ease: E_LUZ, stagger: 0.06 },
              "produto+=0.2"
            )
            .to(
              [eu, selo],
              { scale: 0.86, duration: 1.2, ease: E_MOLA },
              "produto+=0.3"
            )
            .to(
              aura,
              { opacity: 0.58, duration: 1, ease: E_LUZ },
              "produto+=0.4"
            )
            .to(
              cena,
              { yPercent: -10, duration: 1.6, ease: E_MOLA },
              "produto+=0.15"
            );

          /* A última fatia precisa existir inteira na linha do tempo, senão a
             duração acaba no último tween e a quarta batida consome menos
             rolagem que as outras três — os blocos são iguais, as fatias
             também têm que ser. */
          tl.to({}, { duration: T_BATIDA }, 3 * T_BATIDA);

          /* ─────────────────────────────────────────────────────────────────
             O BLOCO QUE ESTÁ SENDO LIDO

             Um gatilho por bloco, só para acender e apagar. Não é animação —
             é ESTADO, e estado nesta página muda em `--t-mov`/`--e-ui`, pelo
             CSS. Amarrá-lo à linha do tempo raspada faria o texto piscar junto
             com a rolagem, que é ruído em cima de leitura. */
          blocos.forEach((el) => {
            ScrollTrigger.create({
              trigger: el,
              start: "top 62%",
              end: "bottom 42%",
              toggleClass: { targets: el, className: "e-ativo" },
            });
          });

          return () => {
            no.classList.remove("ctr-vivo");
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
    <div className="centro ctr" ref={raiz}>
      {/* ---- A CENA, GRUDADA ATRÁS DO TEXTO ----

          A camada é ABSOLUTA e do tamanho do percurso inteiro. É isso que
          libera o texto para andar em volta: em fluxo, a cena ocuparia uma
          coluna e os blocos teriam de caber na outra — que é exatamente o
          layout de duas colunas que esta seção deixou de ter.

          O `.ctr-visual` dentro dela é o grudado. Ele desliza pela altura da
          camada, que é a da lista de blocos, e para quando chega ao fim dela.

          `aria-hidden`: quem lê por leitor de tela recebe a lista de tópicos
          direto, sem uma ilustração na frente. */}
      <div className="ctr-fundo" aria-hidden="true">
        <div className="ctr-visual">
          <div className="ctr-cena">
            {/* A aura é o fundo da cena: luz e só luz. Ela não desenha nada,
                diz onde é o centro. */}
            <div className="ctr-aura" />

            {/* A órbita externa e a onda da explosão, centradas pelo mesmo
                `.ctr-marco` das outras peças. Ficam ANTES da câmara na
                marcação: são o chão da cena, e os produtos passam por cima
                delas. */}
            <div className="ctr-marco" style={{ left: "50%", top: "50%" }}>
              <span className="ctr-guia" />
            </div>
            <div className="ctr-marco" style={{ left: "50%", top: "50%" }}>
              <span className="ctr-onda" />
            </div>

            {/* A CÂMARA carrega a perspectiva, e a cena carrega o
                `container-type` — separados porque a contenção do contêiner de
                consulta e a profundidade não podem morar na mesma caixa sem
                que uma atrapalhe a outra. Tudo dentro é medido em `cqw`, então
                a cena guarda a proporção em qualquer tamanho de tela.

                O CLIENTE E A COROA MORAM AQUI DENTRO, e não fora com o resto
                do HTML. Eles são irmãos da esfera no mesmo contexto 3D, parados
                em z = 0, e é isso que faz o navegador ORDENAR as peças em volta
                deles: as da frente passam por cima, as de trás passam por
                baixo. Desenhados fora da câmara, seriam só a última camada da
                pilha — e uma peça vindo na direção de quem olha sumiria atrás
                do cliente justamente no instante em que está mais perto. */}
            <div className="ctr-camara">
              <div
                className="ctr-esfera"
                style={{ "--ctr-volta": `${VOLTA}s` } as React.CSSProperties}
              >
                {/* Duas caixas e não uma: o GSAP escreve a ESCALA na de fora
                    (é ela que explode) e o CSS escreve o GIRO na de dentro.
                    Empilhadas na mesma, uma reescreveria a matriz da outra a
                    cada quadro. */}
                <div className="ctr-giro">
                  {ORBES.map((o, i) => (
                    <div
                      key={i}
                      className="ctr-orbe"
                      style={
                        {
                          "--lon": `${o.lon.toFixed(3)}deg`,
                          "--lat": `${o.lat.toFixed(3)}deg`,
                        } as React.CSSProperties
                      }
                    >
                      {/* O EIXO desvira a peça da posição dela na esfera e a
                          FACE desvira do giro do conjunto. As duas juntas são a
                          inversa exata da rotação que a levou até ali: a peça
                          mantém a posição na esfera e continua de frente para
                          quem olha, que é a única orientação em que uma foto de
                          produto se lê. Sem elas, metade das peças estaria de
                          perfil ou de costas. */}
                      <div className="ctr-orbe-eixo">
                        <div className="ctr-orbe-face">
                          <span
                            className="ctr-orbe-peca"
                            style={
                              {
                                "--peca-esc": o.peca.escala,
                                "--fase": o.fase.toFixed(4),
                                "--dim": o.dim,
                              } as React.CSSProperties
                            }
                          >
                            <Image
                              src={o.peca.src}
                              alt=""
                              fill
                              /* Cinco arquivos para catorze órbitas, e todos
                                 aparecem na mesma batida. Adiar aqui trocaria
                                 tráfego que viria de qualquer jeito por buraco
                                 no meio da explosão — mas a prioridade é baixa:
                                 o LCP desta página é a manchete do herói, e
                                 nada desta cena disputa com ela. */
                              loading="eager"
                              fetchPriority="low"
                              sizes="(max-width: 900px) 18vw, 12vw"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* A COROA DA IA. Um círculo só, desenhado de cima e no sentido
                  do relógio — daí o `rotate(-90 50 50)`, porque um `<circle>`
                  de SVG começa às três horas. `pathLength={1}` para o
                  `stroke-dashoffset` ir de 1 (nada) a 0 (inteiro) sem depender
                  do comprimento real da circunferência. */}
              <div className="ctr-marco" style={{ left: "50%", top: "50%" }}>
                <svg className="ctr-coroa" viewBox="0 0 100 100">
                  <circle
                    className="ctr-coroa-fio"
                    cx="50"
                    cy="50"
                    r="34"
                    pathLength={1}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>

              {/* O CLIENTE, no meio, e ele fica aqui do começo ao fim. */}
              <div className="ctr-marco" style={{ left: "50%", top: "50%" }}>
                <div className="ctr-eu">
                  <span className="ctr-eu-glifo">
                    <IcoPessoa />
                  </span>
                  <span className="ctr-eu-rot mono">o cliente</span>
                </div>
              </div>

              {/* O PONTO DE LUZ que desenha a coroa. A órbita é uma caixa de
                  tamanho zero no centro — o GSAP gira ELA, e o ponto pendurado
                  a um raio de distância descreve a circunferência.

                  Um DISCO e não um glifo: qualquer desenho com orientação
                  precisaria de uma contra-rotação para não tombar durante a
                  volta, e um círculo é a única forma que gira sem que se note.
                  Foi por isso que a marca não virou o ponto: o "G" dela
                  cambalhotaria. Ela entra depois, parada, no alto da coroa. */}
              <div className="ctr-marco" style={{ left: "50%", top: "50%" }}>
                <span className="ctr-orbita">
                  <span className="ctr-cabeca" />
                </span>
              </div>

              {/* O SELO DA MARCA no alto da coroa: ela assina o que a IA acabou
                  de projetar. Pequeno de propósito — o meio da cena é do
                  cliente, e uma marca do tamanho do assunto passa a ser o
                  assunto. */}
              <div className="ctr-marco" style={{ left: "50%", top: "35%" }}>
                <span className="ctr-selo">
                  <Marca />
                </span>
              </div>

              {/* O BALÃO DA IDEIA. Acima e à direita do cliente, com o bico
                  apontando de volta para ele — é fala, e fala precisa dizer de
                  quem é. Dentro vai o glifo da arte, o mesmo ícone que a seção
                  `#ia` usa para "Na criação": o balão é o pedido, e o pedido
                  nesta rede é uma arte. */}
              <div className="ctr-marco" style={{ left: "68%", top: "32%" }}>
                <div className="ctr-balao">
                  <span className="ctr-balao-ico">
                    <IcoArte />
                  </span>
                  <span className="ctr-balao-bico" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- O TEXTO, ANDANDO EM VOLTA ----

          Uma lista ordenada de verdade: os quatro tópicos têm ordem, e a ordem
          precisa existir na marcação e não só na tipografia. Para quem não vê a
          cena, isto é a seção inteira — e continua completa.

          `data-lugar` é o canto de cada bloco. É atributo e não classe porque
          é um EIXO com quatro valores, não quatro adjetivos independentes: um
          bloco tem exatamente um lugar. */}
      <ol className="ctr-passos">
        {TOPICOS.map((t) => (
          <li className="ctr-passo" key={t.id} data-lugar={t.lugar}>
            <div className="ctr-bloco">
              <span className="ctr-rot mono">{t.rotulo}</span>
              <h3 className="ctr-tit">{t.titulo}</h3>
              <p className="ctr-txt">{t.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
