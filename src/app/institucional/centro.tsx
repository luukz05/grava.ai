"use client";

/* O CENTRO — a IA e o cliente, aliados, ditos em movimento.

   ───────────────────────────────────────────────────────────────────────────
   A FRASE QUE A CENA DESENHA

   A marca coloca o cliente no centro da criação. A Inteligência Artificial não
   substitui esse cliente: ela o ACOMPANHA — recebe a ideia dele, otimiza,
   projeta, e é isso que faz a personalização acontecer na hora.

   Por isso o cliente fica no meio da cena ENQUANTO A CRIAÇÃO ACONTECE.
   Nenhuma batida da criação o apaga, nenhuma o troca por outra coisa. O que
   muda em volta dele é quem chegou para ajudar:

   1 · O CLIENTE NO CENTRO — a órbita se insinua e ele aparece no meio dela.
   2 · A IDEIA É DELE — um balão sobe do cliente. O pedido existe antes de
       existir máquina, e é dele.
   3 · A IA PROJETA EM VOLTA — o balão é recolhido e uma coroa se fecha em
       torno do cliente: um ponto de luz dá a volta nele e vai deixando o
       traço atrás de si. A marca acende no alto dessa coroa quando ela fecha.
       Ninguém foi substituído — alguém foi REVESTIDO.
   4 · O PRODUTO — uma onda parte do centro, a órbita externa se rompe e a
       coroa explode em peças, que abrem numa esfera girando. Aqui a criação já
       terminou: o cliente sai do meio levando o que pediu, e a MARCA desce do
       alto da coroa para o centro da esfera. Quem assina o que nasceu é a
       grava.ai.
   5 · A PASSAGEM — a esfera é REPELIDA: as peças continuam o movimento que já
       traziam, abrem para fora do quadro e se apagam no caminho. Não some o
       catálogo, some a vitrine dele; o que estava girando em volta da marca
       segue adiante e libera o meio. Ficam a marca e o fio da coroa, que cresce
       e ENDIREITA as curvas até virar o hexágono da seção seguinte.

   A VERSÃO ANTERIOR DIZIA O CONTRÁRIO, e por isso mudou: lá a marca CRESCIA
   NO LUGAR do cliente DURANTE A PROJEÇÃO — a IA apagando quem pediu. Desenhar
   substituição numa seção cujo texto afirma "o cliente no centro da criação" é
   a página se contradizer no meio da própria frase, o mesmo defeito que fez os
   três passos saírem de uma fileira de cartões, que é a forma de uma esteira.

   A TROCA DE CENTRO DA QUARTA BATIDA NÃO É ESSA SUBSTITUIÇÃO. Ela acontece
   DEPOIS de o produto existir: o cliente não é apagado no meio do próprio
   pedido, ele sai com ele na mão. O assunto do último quadro é o catálogo que
   nasceu, e catálogo quem assina é a marca.

   ───────────────────────────────────────────────────────────────────────────
   A SEÇÃO NÃO ACABA: ELA ENTREGA

   A seção seguinte abre com o HEXÁGONO DOS TRÊS PILARES e a marca no meio dele
   (ver `pilares.tsx`). Cortar aqui e recomeçar lá daria duas cenas com a mesma
   marca no meio e nenhuma relação declarada entre elas — a página teria dito
   duas vezes "a marca está no centro" sem nunca dizer de que centro se trata.

   Então a última batida é uma PASSAGEM: o fio da coroa — o mesmo círculo que a
   IA desenhou em volta do cliente — cresce e endireita as curvas até virar o
   hexágono, nos MESMOS SEIS VÉRTICES que `pilares.tsx` usa. O que fecha uma
   seção é o que abre a próxima, e a forma faz a emenda: o que a IA desenhou em
   volta de quem pediu é o que os três pilares sustentam.

   O MORFO É GEOMÉTRICO, e não um plugin: um só `<path>` de seis cúbicas, com o
   comprimento dos punhos de bézier indo de `K·R` (arco) a zero (reta). Ver
   `dCoroa` logo abaixo.

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
   O FIO DA COROA: DE CÍRCULO A HEXÁGONO, SEM PLUGIN

   O fio era um `<circle>`. Virou um `<path>` porque na última batida ele tem
   de VIRAR O HEXÁGONO da seção dos pilares, e círculo e polígono não são a
   mesma primitiva — não há como interpolar entre as duas.

   A conta é toda a mesma coisa: um círculo aproximado por SEIS cúbicas tem os
   pontos de apoio exatamente nos seis vértices do hexágono. O que separa as
   duas formas é só o comprimento dos punhos de bézier — `K·R` desenha o arco,
   zero desenha a reta. `t` vai de 1 a 0 e a curva endireita.

   `K = 4/3·tan(π/(2n))` com `n = 6` é o comprimento que faz a cúbica passar
   pelo arco de 60° com erro invisível. É a mesma constante que os programas de
   desenho usam para aproximar círculos, com `n = 4` (o famoso 0,5523).

   OS ÂNGULOS SÃO OS DE `pilares.tsx` (−90 no topo, de 60 em 60): é isso que faz
   o hexágono que nasce aqui ter a mesma orientação do que abre a seção
   seguinte. Mudar um lado sem mudar o outro quebra a emenda entre as duas
   seções, e o defeito aparece a uma tela de distância do lugar onde foi
   causado — anotado aqui e lá.

   O RAIO 34 é o `r` do `<circle>` que estava aqui, e ele não é livre: a caixa
   do SVG vale `--coroa-r / 0.34` (ver `.ctr-coroa` no CSS) justamente para que
   34 unidades de `viewBox` valham `--coroa-r` na tela. Os dois números são um
   só, escrito em dois lugares. */
const A_COROA = [-90, -30, 30, 90, 150, 210];
const R_COROA = 34;
const K_COROA = (4 / 3) * Math.tan(Math.PI / 12);

const rad = (g: number) => (g * Math.PI) / 180;
/* Três casas: o valor entra num `d` que o React compara caractere a caractere
   entre o que veio do servidor e o que ele mesmo desenharia. */
const n3 = (v: number) => v.toFixed(3);

function dCoroa(t: number) {
  const h = K_COROA * R_COROA * t;
  const ponto = (g: number) => [
    50 + R_COROA * Math.cos(rad(g)),
    50 + R_COROA * Math.sin(rad(g)),
  ];
  /* A tangente é a derivada do ponto no ângulo — o sentido em que a curva
     avança. É ela que garante que o punho saia do vértice acompanhando o arco,
     e não numa direção qualquer que faria a forma inchar de um lado. */
  const tang = (g: number) => [-Math.sin(rad(g)) * h, Math.cos(rad(g)) * h];

  const [x0, y0] = ponto(A_COROA[0]);
  let d = `M${n3(x0)} ${n3(y0)}`;
  for (let i = 0; i < A_COROA.length; i++) {
    const a = A_COROA[i];
    const b = A_COROA[(i + 1) % A_COROA.length];
    const [px, py] = ponto(a);
    const [qx, qy] = ponto(b);
    const [tax, tay] = tang(a);
    const [tbx, tby] = tang(b);
    d += ` C${n3(px + tax)} ${n3(py + tay)} ${n3(qx - tbx)} ${n3(qy - tby)} ${n3(qx)} ${n3(qy)}`;
  }
  return d + " Z";
}

/* ───────────────────────────────────────────────────────────────────────────
   OS QUATRO TÓPICOS

   Um bloco de texto e uma batida da cena, com o mesmo nome. `lugar` é o canto
   da tela em que aquele bloco aparece — ver `[data-lugar]` no `centro.css`.
   O último não tem um canto: ele é `flancos`, e ABRE EM DOIS — rótulo e título
   de um lado da esfera, o parágrafo do outro. É a batida em que a cena está no
   tamanho máximo e não sobra canto vazio nenhum, e é também a única em que o
   texto PODE cercar o desenho: o assunto dele deixou de estar num ponto da cena
   e passou a ser a cena inteira.

   A LINHA QUE OS QUATRO ESCREVEM JUNTOS, e é ela que decide cada palavra:
   a marca tem o cliente no centro; a ideia é dele; a IA é a aliada; e são as
   duas juntas que concebem um produto único — a ideia dele, materializada, com
   significado. "Juntas" é a palavra-chave do fecho: o produto não sai da
   máquina nem sai do cliente sozinho, sai do par.

   Nenhum texto aqui é fato novo. O credo é o da seção `#marca`; "participa da
   criação em vez de escolher de um catálogo" e "carrega um significado" são do
   antigo `#produto`; "projeta a arte em segundos" e "na hora, e não por
   encomenda" recompõem o que `#ia` e o antigo passo 02 já afirmavam. A seção
   reorganiza o que a página diz — não acrescenta afirmação.

   TERCEIRA PESSOA, e não "a sua ideia": nesta página o "você" é o CANDIDATO A
   FRANQUEADO — é com ele que o herói e o fecho falam ("leve a GRAVA.AI para a
   sua região"). Quem descreve a ideia no totem é o consumidor da loja dele.
   Trocar de interlocutor no meio da página faria o franqueado ler a seção como
   se ele fosse o cliente do quiosque. */
type Topico = {
  id: string;
  lugar: "topo" | "esq" | "dir" | "flancos";
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
        No totem, o cliente descreve o que quer. A ideia é dele — ele{" "}
        <mark>participa da criação</mark> em vez de escolher de um catálogo.
      </>
    ),
  },
  {
    id: "ia",
    lugar: "dir",
    rotulo: "Passo 02",
    titulo: "A IA entra como aliada",
    texto: (
      <>
        A Inteligência Artificial recebe essa ideia, otimiza e{" "}
        <mark>projeta a arte em segundos</mark>. Ela não cria no lugar de
        ninguém: acompanha quem pediu.
      </>
    ),
  },
  {
    id: "produto",
    lugar: "flancos",
    rotulo: "Passo 03",
    titulo: "Juntas, concebem",
    texto: (
      <>
        Do par nasce um produto único: a ideia do cliente{" "}
        <mark>materializada e com significado</mark> — e não mais um item de
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
          const coroa = um<SVGPathElement>(".ctr-coroa-fio");
          const coroaCaixa = um<SVGElement>(".ctr-coroa");
          const orbita = um<HTMLElement>(".ctr-orbita");
          const cabeca = um<HTMLElement>(".ctr-cabeca");
          const selo = um<HTMLElement>(".ctr-selo");
          const esfera = um<HTMLElement>(".ctr-esfera");
          const orbes = q(".ctr-orbe-face");
          /* Estado do morfo do fio: 1 é o círculo, 0 é o hexágono. */
          const morfo = { t: 1 };
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
          /* O fio nasce redondo, e o `d` do HTML já é esse — o `set` existe
             para o caso de a linha do tempo ser reconstruída (troca de mídia,
             `refresh`) com o morfo a meio caminho. */
          coroa.setAttribute("d", dCoroa(1));
          gsap.set(coroaCaixa, { scale: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              /* O gatilho é a COLUNA EM FLUXO — os quatro blocos MAIS a faixa
                 de passagem —, e ela existe como elemento só para isto: é a
                 altura dela que define quanto a cena tem para andar.

                 NÃO É A RAIZ, e a diferença não é de gosto: a raiz carrega
                 também a camada absoluta da cena, e medi-la aqui dava uma
                 leitura em que o gatilho nascia já vencido — a cena aparecia no
                 estado final desde o topo da página, em qualquer posição de
                 rolagem. Um invólucro que contém só o que está em fluxo mede o
                 que se quer medir.

                 A FAIXA DE PASSAGEM É A QUINTA FATIA. Ela não tem texto, e é
                 por isso que precisa existir como altura: sem ela o morfo do
                 fio aconteceria espremido no fim do último bloco, com o texto
                 ainda na tela disputando a atenção do gesto que emenda as duas
                 seções.

                 `top center` → `bottom center`: começa quando o primeiro bloco
                 chega ao meio da tela e acaba quando a faixa sai dele. */
              trigger: um<HTMLElement>(".ctr-coluna"),
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

             O CENTRO TROCA DE DONO, e é a única batida em que isso pode
             acontecer: a criação acabou. O cliente sai do meio levando o que
             pediu — encolhe e apaga, sem ser empurrado por nada — e a MARCA
             desce do alto da coroa para o lugar dele, maior, no eixo da esfera.

             A descida é de 15% da altura da cena, que é quadrada: exatamente o
             `--coroa-r: 15cqw` que põe o selo no alto da coroa. A medida é lida
             do elemento a cada `refresh` (`invalidateOnRefresh`), e não escrita
             em pixels — em pixels o selo pararia fora do centro em qualquer
             tela que não fosse aquela em que foi medido.

             O selo desce ENQUANTO o cliente apaga, e não depois: em sequência
             lê como reposição de peça, junto lê como passagem de bastão.

             A CENA SÓ SAI DO MEIO QUANDO O TEXTO FECHA EM COLUNA. Ela subia
             10% aqui sempre, e o motivo era o texto: a cartela de fechamento
             ficava EMBAIXO, e uma esfera de 62svh centrada não deixa faixa
             livre nenhuma sob ela — sem a subida o parágrafo entra por dentro
             da esfera e uma faca em primeiro plano corta a linha no meio.

             Com os DOIS FLANCOS a cena não tem o que desviar: o texto ocupa as
             faixas laterais que a esfera nunca ocupou, e ela fica no eixo,
             entre as duas metades da fala. Abaixo de 1180px, porém, os flancos
             fecham em coluna (ver `centro.css`) e o problema antigo volta
             inteiro — então a subida volta com ele.

             A CONDIÇÃO É LIDA A CADA MEDIÇÃO, e não uma vez na montagem: o
             valor é uma função e o gatilho tem `invalidateOnRefresh`, então
             quem redimensiona a janela por cima do limite recebe o layout
             certo sem recarregar a página. */
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
              eu,
              { autoAlpha: 0, scale: 0.62, duration: 0.9, ease: E_UI },
              "produto+=0.3"
            )
            /* A descida e o crescimento vão no SELO, nunca no marco: o marco
               centra com `translate: -50% -50%` na propriedade própria, e o
               GSAP zera `translate` ao assumir um alvo — animado ali, o selo
               desceria e ao mesmo tempo escorregaria meia peça para a direita
               e para baixo. Ver o comentário do `.ctr-marco` no CSS. */
            .to(
              selo,
              {
                y: () => cena.getBoundingClientRect().height * 0.15,
                scale: 1.9,
                duration: 1.4,
                ease: E_MOLA,
              },
              "produto+=0.3"
            )
            .to(
              aura,
              { opacity: 0.58, duration: 1, ease: E_LUZ },
              "produto+=0.4"
            )
            .to(
              cena,
              {
                yPercent: () =>
                  window.matchMedia("(max-width: 1180px)").matches ? -10 : 0,
                duration: 1.6,
                ease: E_MOLA,
              },
              "produto+=0.15"
            );

          /* ── 5 · A PASSAGEM PARA OS PILARES ──
             A esfera é REPELIDA. Ela não encolhe de volta ao ponto de onde
             saiu: continua o movimento que já trazia, abre para fora do quadro
             e apaga no caminho. Encolher desfaria a explosão — diria que o
             catálogo foi recolhido —, e o que a página precisa dizer aqui é que
             ele seguiu adiante e liberou o meio.

             As peças apagam ANTES de a caixa terminar de abrir (a última fecha
             em 13,3 da linha do tempo, contra 13,6 da abertura): peça que ainda
             está acesa quando cruza a borda da tela é peça CORTADA pelo quadro,
             e corte é o contrário de afastamento. O `stagger` é curto (0,03)
             pelo mesmo motivo — com o escalonamento largo, as últimas da fila
             ainda estavam inteiras quando já tinham saído do quadro.

             O FIO ENTÃO CRESCE E ENDIREITA. São dois tweens sobre a mesma
             coisa e o par é a frase: a escala leva o círculo de `--coroa-r` ao
             tamanho do hexágono da seção seguinte, e o morfo tira a curva dos
             seis arcos. O traço AFINA junto (0.9 → 0.45) porque a escala
             engrossaria o desenho na mesma proporção, e o hexágono dos pilares
             é um traço fino — sem isso, o que chega lá é a mesma forma com o
             dobro do peso de tinta.

             O QUE FICA NA TELA no fim: o hexágono e a marca no meio dele. É,
             ponto por ponto, a composição com que `pilares.tsx` abre. */
          batida("pilares", 4);
          tl.to(esfera, { scale: 2.75, duration: 1.6, ease: E_UI }, "pilares")
            .to(
              orbes,
              { autoAlpha: 0, duration: 0.8, ease: E_LUZ, stagger: 0.03 },
              "pilares+=0.05"
            )
            .to(
              coroaCaixa,
              { scale: 2.2, duration: 1.7, ease: E_MOLA },
              "pilares+=0.35"
            )
            .to(
              coroa,
              { "--coroa-w": 0.45, duration: 1.7, ease: E_UI },
              "pilares+=0.35"
            )
            /* O morfo anda num objeto e não no elemento: `d` é atributo de
               caminho, não propriedade animável, e quem escreve o caminho a
               cada quadro é a mesma função que desenhou o estado inicial no
               HTML — uma fonte só para as duas formas. */
            .to(
              morfo,
              {
                t: 0,
                duration: 1.7,
                ease: E_UI,
                onUpdate: () => coroa.setAttribute("d", dCoroa(morfo.t)),
              },
              "pilares+=0.35"
            )
            .to(
              aura,
              { opacity: 0.72, scale: 1.12, duration: 1.4, ease: E_LUZ },
              "pilares+=0.3"
            );

          /* A última fatia precisa existir inteira na linha do tempo, senão a
             duração acaba no último tween e a batida final consome menos
             rolagem que as outras — as fatias de texto são iguais, e a da
             passagem tem a mesma altura delas. */
          tl.to({}, { duration: T_BATIDA }, 4 * T_BATIDA);

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

              {/* A COROA DA IA. Um traço só, que começa no alto e corre no
                  sentido do relógio — o caminho parte de −90°, e é isso que o
                  põe em fase com o ponto de luz que o desenha, pendurado no
                  topo da órbita.

                  UM `<path>` E NÃO UM `<circle>`: na última batida ele vira o
                  hexágono dos pilares, e as duas formas precisam ser a mesma
                  primitiva para haver o que interpolar. `dCoroa(1)` é o
                  círculo — a mesma função que o morfo usa depois, então o
                  desenho do servidor e o do primeiro quadro são o mesmo texto.

                  `pathLength={1}` para o `stroke-dashoffset` ir de 1 (nada) a 0
                  (inteiro) sem depender do comprimento real do caminho — que,
                  aqui, muda de forma no meio do caminho. */}
              <div className="ctr-marco" style={{ left: "50%", top: "50%" }}>
                <svg className="ctr-coroa" viewBox="0 0 100 100">
                  <path
                    className="ctr-coroa-fio"
                    d={dCoroa(1)}
                    pathLength={1}
                  />
                </svg>
              </div>

              {/* O CLIENTE, no meio durante as três batidas da criação. Na
                  quarta ele sai com o produto e o meio passa para a marca. */}
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

              {/* O SELO DA MARCA. Nasce PEQUENO no alto da coroa, onde ela
                  assina o que a IA acabou de projetar sem tomar o meio da cena
                  — enquanto se cria, o meio é do cliente.

                  Na quarta batida ele desce para o centro da esfera e cresce:
                  o produto já existe, e o que fica no eixo do catálogo é a
                  marca. `top: 35%` é a posição de partida, 15% acima do centro
                  — a mesma medida que a descida desfaz. */}
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
      {/* A COLUNA EM FLUXO: os blocos e a faixa de passagem. É ela que o
          gatilho da linha do tempo mede — ver `trigger` acima. */}
      <div className="ctr-coluna">
        <ol className="ctr-passos">
          {TOPICOS.map((t) =>
            t.lugar === "flancos" ? (
              /* O BLOCO PARTIDO DA ÚLTIMA BATIDA: rótulo e título de um lado da
               esfera, o parágrafo do outro.

               OS DOIS LADOS MORAM DENTRO DE UM INVÓLUCRO, e é o invólucro que
               gruda. Dois `.ctr-bloco` grudados como irmãos na mesma altura
               ficariam certos na tela larga e empilhados um sobre o outro na
               estreita, onde a grade vira coluna e os dois passam a disputar o
               mesmo `top`. Um grude só não tem esse problema: o que muda entre
               largo e estreito é o desenho interno da grade, e não o número de
               coisas presas na tela. Ver `.ctr-flancos` no `centro.css`. */
              <li className="ctr-passo" key={t.id} data-lugar={t.lugar}>
                <div className="ctr-flancos">
                  <div className="ctr-bloco">
                    <span className="ctr-rot mono">{t.rotulo}</span>
                    <h3 className="ctr-tit">{t.titulo}</h3>
                  </div>
                  <div className="ctr-bloco">
                    <p className="ctr-txt">{t.texto}</p>
                  </div>
                </div>
              </li>
            ) : (
              <li className="ctr-passo" key={t.id} data-lugar={t.lugar}>
                <div className="ctr-bloco">
                  <span className="ctr-rot mono">{t.rotulo}</span>
                  <h3 className="ctr-tit">{t.titulo}</h3>
                  <p className="ctr-txt">{t.texto}</p>
                </div>
              </li>
            )
          )}
        </ol>

        {/* ---- A FAIXA DE PASSAGEM ----

          Uma tela de rolagem sem texto nenhum, e ela é a quinta fatia da linha
          do tempo: é aqui que a esfera abre para fora e o fio da coroa vira o
          hexágono da seção seguinte.

          POR QUE ALTURA E NÃO SÓ TEMPO: a linha do tempo é raspada pela
          rolagem, então tempo de animação é altura de página — sem esta faixa,
          o gesto que emenda as duas seções teria de caber no fim do último
          bloco, com o texto dele ainda na tela.

          Fora da `<ol>` de propósito: não é um tópico, e um `<li>` vazio é um
          item de lista sem item. `aria-hidden` porque não há nada aqui para
          ler — quem usa leitor de tela vai do último tópico direto para a
          seção dos pilares, que é a leitura certa. */}
        <div className="ctr-passagem" aria-hidden="true" />
      </div>
    </div>
  );
}
