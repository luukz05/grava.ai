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

   OS TRÊS PILARES ERAM UM DESENHO À PARTE, uma seção abaixo: outro hexágono,
   noutra caixa, redesenhado do zero meia tela depois de esta cena ter acabado
   de formar um. Duas peças iguais em sequência, a segunda apagando a primeira.

   Então as duas últimas batidas são a EMENDA. Na quinta, o fio da coroa — o
   mesmo círculo que a IA desenhou em volta do cliente — cresce e endireita as
   curvas até virar o hexágono. Na sexta, os raios saem do meio e os três
   pilares pousam nos vértices dele. O que fecha uma seção é o que abre a
   próxima, e a forma faz a emenda: o que a IA desenhou em volta de quem pediu é
   o que os três pilares sustentam.

   ───────────────────────────────────────────────────────────────────────────
   SETE FATIAS, E NÃO TREZE

   A seção pedia ONZE TELAS de rolagem. Quatro eram a narrativa acima, uma a
   passagem — e as OUTRAS OITO eram os pilares e os papéis da IA, cada grupo
   com um cabeçalho e um item por tela. Nessas oito a cena não mudava de
   assunto: o mesmo hexágono parado, um nó crescendo e os outros recuando, oito
   telas para seis frases curtas. Informação boa cobrando pedágio.

   As oito viraram DUAS CONSTELAÇÕES. A diferença é a relação entre texto e
   desenho: na narrativa o bloco passa POR CIMA da cena, um de cada vez, e por
   isso cada um precisa da fatia inteira; na constelação os três textos moram EM
   VOLTA do polígono, cada um do lado do vértice de que fala. O que ligava a
   frase ao nó era o tempo (o nó acendia na vez dele); passa a ser a POSIÇÃO — e
   o gesto continua no `stagger`, com cada frase pousando no instante em que o
   seu vértice acende. Nenhuma palavra saiu; saiu a rolagem morta.

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

   CADA BATIDA RECEBE A FRAÇÃO DE TEMPO QUE A FATIA DELA OCUPA. As alturas são
   lidas do DOM e viram posição e duração na linha do tempo (`emT`/`durT`), o
   que mantém a amarra antiga — a explosão acontece enquanto o texto do produto
   está na tela, sem um gatilho por bloco — valendo agora para fatias de
   tamanhos diferentes, e continuando a valer no celular, onde o CSS empilha a
   constelação e muda as proporções.

   A ESFERA GIRA EM CSS, e não no relógio do GSAP. Três animações de mesma
   duração: uma vira o conjunto, a segunda desvira cada peça para ela continuar
   de frente para quem olha, e a terceira apaga a peça quando ela passa por
   trás. Feito em `requestAnimationFrame` seriam catorze matrizes recalculadas
   por quadro em JavaScript enquanto a pessoa rola; feito assim, o compositor
   resolve. O GSAP só abre e fecha a esfera. */

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  Marca,
  IcoInovacao,
  IcoExperiencia,
  IcoRentabilidade,
  IcoArte,
  IcoTempo,
  IcoJornada,
} from "../icons";
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

   OS ÂNGULOS (−90 no topo, de 60 em 60) são também os dos VÉRTICES em que os
   três pilares se penduram, na batida seguinte: os nós usam três deles,
   alternados. Uma lista só para as duas coisas — separadas, um ajuste na forma
   deixaria os nós fora dos cantos.

   O RAIO 34 é o `r` do `<circle>` que estava aqui, e ele não é livre: a caixa
   do SVG vale `--coroa-r / 0.34` (ver `.ctr-coroa` no CSS) justamente para que
   34 unidades de `viewBox` valham `--coroa-r` na tela. Os dois números são um
   só, escrito em dois lugares. */
const A_COROA = [-90, -30, 30, 90, 150, 210];
const R_COROA = 34;
const K_COROA = (4 / 3) * Math.tan(Math.PI / 12);

/* Quanto o fio cresce ao virar hexágono. Ele sai de `--coroa-r` (15cqw, no
   `centro.css`) e chega a 33cqw — que é o raio em que os três pilares se
   penduram, logo abaixo. Os dois números são o mesmo número: mexer neste sem
   mexer lá põe os nós fora dos vértices. */
const ESCALA_HEX = 2.2;
const R_HEX_CENA = 15 * ESCALA_HEX;

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

   Um bloco de texto e uma batida da cena, com o mesmo nome. Cada bloco é um
   título e um parágrafo — SEM RÓTULO. "Passo 01/02/03" numerava ao lado de uma
   cena que já é sequencial: a mesma informação dita duas vezes, e a segunda em
   forma de esteira, que é a forma de que esta seção fugiu. Quem marca qual
   bloco está sendo lido agora é o FIO ao lado do texto, que acende — trabalho
   que o rótulo fazia com palavras. `lugar` é o canto
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
  lugar: "topo" | "esq" | "dir" | "baixo" | "flancos";
  titulo: string;
  texto: React.ReactNode;
};

const TOPICOS: Topico[] = [
  {
    id: "credo",
    lugar: "topo",
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

/* ───────────────────────────────────────────────────────────────────────────
   OS TRÊS PILARES, NO HEXÁGONO QUE A CENA ACABOU DE FORMAR

   Eles tinham desenho próprio (`pilares.tsx`, agora removido): um segundo
   hexágono, numa caixa de 34rem, redesenhado do zero uma seção abaixo. Duas
   peças iguais em sequência, e a segunda apagando a primeira — o leitor via a
   cena entregar um hexágono e, meia tela depois, outro hexágono nascer
   sozinho. A rima virava repetição.

   Agora é UM SÓ. O fio que a IA desenhou em volta do cliente vira o hexágono
   na quinta batida e recebe os pilares na sexta, sem corte: os raios saem do
   meio, onde a marca está, e os nós pousam nos vértices. A frase que a página
   diz em duas seções passa a ser uma frase só — o que a marca faz, e o que a
   sustenta.

   TRÊS VÉRTICES ALTERNADOS, e não três seguidos: alternados, os pilares formam
   um triângulo equilátero dentro do hexágono e a carga fica distribuída, que é
   o desenho de algo sustentado. Em três vizinhos ficariam todos de um lado e o
   polígono pareceria prestes a tombar.

   O NOME E O TEXTO NÃO MORAM NO DESENHO. No vértice fica só o ÍCONE: escrito
   nos dois lugares, o nome apareceria duas vezes no mesmo quadro. A explicação
   fica num bloco ao lado — o mesmo texto que estava nos três cartões da seção
   que existia abaixo.

   OS TRÊS APARECEM JUNTOS, numa fatia só. Cada um já teve a sua batida, e o
   que ligava a frase ao vértice era o nó acender na vez dele: ligação por
   TEMPO, que custa uma tela de rolagem por item. Agora a ligação é por LUGAR —
   o bloco fica do lado do vértice de que fala —, e o gesto continua existindo
   no `stagger`: o nó acende e a frase dele pousa no mesmo instante.

   `lugar` é a célula da constelação, e ela segue o ângulo do vértice: 210° e
   −30° são as duas laterais acima do eixo (`esq` e `dir`), 90° é a ponta de
   baixo (`baixo`, na faixa livre entre o hexágono e o rodapé da tela). Do
   LADO, e não em cima: o texto do pilar de baixo já esteve no alto — do outro
   lado da cena — e a distância desfazia a ligação. */
const PILARES = [
  {
    id: "inovacao",
    nome: "Inovação no processo",
    ang: 210,
    lugar: "esq" as const,
    Ico: IcoInovacao,
    texto:
      "A personalização deixa de ser encomenda e vira criação na hora, conduzida por Inteligência Artificial.",
  },
  {
    id: "experiencia",
    nome: "Experiência imersiva",
    ang: -30,
    lugar: "dir" as const,
    Ico: IcoExperiencia,
    texto:
      "O cliente participa da criação em vez de escolher de um catálogo. A experiência é parte do produto.",
  },
  {
    id: "rentabilidade",
    nome: "Rentabilidade real",
    ang: 90,
    lugar: "baixo" as const,
    Ico: IcoRentabilidade,
    texto:
      "Uma operação que se sustenta para quem opera a franquia, não só uma ideia bonita de tecnologia.",
  },
];

/* A ESCALA DO SELO quando ele desce para o meio (quarta batida). Vive aqui,
   e não só dentro do tween, porque os raios dos pilares precisam dela: eles
   começam na BORDA do anel da marca, e o anel tem o tamanho do selo escalado. */
const ESCALA_SELO_NO_CENTRO = 1.9;

/* ONDE O RAIO COMEÇA, contado do centro em unidades da cena (1 = 1cqw) — o
   valor do HTML, que só vale até o script medir.

   Não é 0 porque a marca está no meio e não tem chapa atrás: com a linha
   partindo do centro exato, ela passava POR DENTRO do glifo. O ponto certo é
   a borda do anel, e o anel nasce de um `clamp()` em rem — não dá para
   escrever em cqw. Então a linha do tempo MEDE o selo antes de desenhar os
   raios (ver a batida dos pilares) e reescreve `x1/y1`; este número é só o
   chute do servidor, para a marcação não nascer com a linha dentro da marca. */
const R_RAIO_INICIO = 6;

const emCena = (ang: number) => ({
  left: `${n3(50 + R_HEX_CENA * Math.cos(rad(ang)))}%`,
  top: `${n3(50 + R_HEX_CENA * Math.sin(rad(ang)))}%`,
});

/* ───────────────────────────────────────────────────────────────────────────
   A IA, NOS TRÊS VÉRTICES QUE SOBRARAM

   O hexágono tem seis cantos e os pilares ocupam três, alternados. Os outros
   três estavam vazios — e a seção seguinte da página era exatamente outra lista
   de três, sobre a IA, em outros três cartões. O polígono já era a resposta:
   um vértice para cada, e as duas listas passam a ser as duas metades da mesma
   figura, intercaladas.

   É a mesma emenda que trouxe os pilares para cá, um degrau adiante: em vez de
   três seções em fila — a marca, os pilares, a IA —, uma cena só que vai
   ganhando peça e nunca recomeça.

   ÂNGULOS: −90 (topo), 30 e 150. São os complementares dos pilares (210, −30,
   90) na mesma lista de seis, então nenhum dos dois grupos precisa saber do
   outro para não colidir — a geometria já garante.

   E É AQUI QUE A MARCA CRESCE. Com os seis cantos ocupados, o meio deixa de ser
   um ponto e passa a ser a área que os seis seguram: a marca abre até ocupar o
   hexágono, atrás dos nós, e o que a cena diz no último quadro é que tudo
   aquilo é uma coisa só. */
const IA = [
  {
    id: "criacao",
    nome: "Na criação",
    ang: -90,
    lugar: "esq" as const,
    Ico: IcoArte,
    texto:
      "O cliente gera a arte ideal em segundos, com Inteligência Artificial.",
  },
  {
    id: "producao",
    nome: "Na produção",
    ang: 30,
    lugar: "dir" as const,
    Ico: IcoTempo,
    texto: "Do conceito ao produto gravado, em poucos minutos.",
  },
  {
    id: "atendimento",
    nome: "No atendimento",
    ang: 150,
    lugar: "baixo" as const,
    Ico: IcoJornada,
    texto: "A IA conduz o cliente do primeiro toque até a retirada.",
  },
];

/* Quanto do DIÂMETRO do hexágono a marca ocupa quando abre. Menos de 1 porque
   ela precisa terminar dentro do polígono, e não encostada nele: marca colada
   na linha vira selo carimbado por cima do desenho. */
const MARCA_NO_HEX = 0.78;

/* A UNIDADE DE TEMPO DE UMA BATIDA — hoje só a régua, e não mais a divisão.

   Enquanto todas as fatias tinham a mesma altura, a linha do tempo era
   `i * T_BATIDA` e pronto. As fatias deixaram de ser iguais: um bloco da
   narrativa vale 76svh, a passagem 64 e cada constelação uma tela inteira,
   porque nela três textos entram ao mesmo tempo em volta do hexágono.

   Então quem divide a linha do tempo é a ALTURA REAL de cada fatia, medida do
   DOM (ver `emT`/`durT` no efeito). Esta constante só decide quanto tempo o
   percurso inteiro dura — o que importa é a razão entre ele e as durações dos
   tweens, que continuam escritas em unidades de batida. */
const T_BATIDA = 3;

/* ───────────────────────────────────────────────────────────────────────────
   O BALÃO DA IDEIA

   O QUE ESTAVA ERRADO, item por item:

   — O GLIFO ERA ILEGÍVEL. Dentro do disco ia o `IcoArte` — um pincel de quatro
     traços numa caixa de 24 —, desenhado a uns 17px de lado. Na tela isso não
     é um pincel, é um rabisco: quatro segmentos finos que o olho lê como
     sujeira. Ícone de sistema não sobrevive a meio tamanho.
   — O BICO ERA OUTRA PEÇA. Um losango de `0.62rem` com duas bordas, encostado
     por baixo do disco a `left: 12%`. Duas peças com o mesmo contorno e o mesmo
     fundo nunca fecham: a costura aparece na borda arredondada, e o que se via
     era um apêndice torto colado na bolha.
   — O BICO APONTAVA PARA BAIXO, e o cliente está embaixo E À ESQUERDA. Balão de
     fala que não aponta para quem fala é bolha solta no quadro.
   — E O DESENHO NÃO TINHA ESCALA: `11cqw` de disco não comportam glifo nenhum.

   O QUE ELE É AGORA: um CAMINHO SÓ — a bolha e a cauda no mesmo contorno, sem
   costura possível — com a cauda apontando na direção exata do cliente (135°
   no sistema do SVG: para baixo e para a esquerda), e uma LÂMPADA dentro, que
   ACENDE depois de o balão pousar.

   A lâmpada é o único glifo que já é a palavra: ideia. E acender é o que
   separa esta batida da anterior — o balão chega apagado (o pedido existe
   antes de ser dito) e a luz vem um instante depois, com o halo atrás dela. É
   o mesmo gesto que o resto da cena usa para dizer "isto está acontecendo
   agora": primeiro o lugar, depois a luz.

   ELE ACENDE EM AZUL, e não em âmbar. Uma lâmpada amarela seria a única cor
   fora da paleta em toda a página, e num quadro dark+azul ela não lê como
   "acendeu" — lê como aviso.

   O BALÃO FICA PERTO DO CLIENTE: `64%/36%` contra os `68%/32%` de antes. A
   posição não é solta — dela sai a direção da cauda: 14 pontos à direita e 14
   acima do centro é exatamente a diagonal de 135°, então a ponta aponta para o
   cliente sem que nenhum dos dois números precise ser ajustado à mão. Longe,
   as duas peças liam como dois assuntos no mesmo quadro.

   A geometria fica em números nomeados porque ela é uma frase: a ABERTURA é o
   quanto da borda a cauda toma, e a PONTA é o quanto ela avança, contado em
   raios — mexer num sem o outro é o que dá cauda de agulha ou de leque. */
const BAL_CX = 50;
const BAL_CY = 40;
const BAL_R = 34;
/* Para onde a cauda aponta. O cliente está no centro da cena e o balão acima e
   à direita dele, então a direção é a diagonal para baixo e para a esquerda —
   135° num sistema em que o Y cresce para baixo. */
const BAL_ANG = 135;
const BAL_ABERTURA = 27;
const BAL_PONTA = 1.62;

function dBalao() {
  const em = (g: number, r: number): [number, number] => [
    BAL_CX + r * Math.cos(rad(g)),
    BAL_CY + r * Math.sin(rad(g)),
  ];
  const [ax, ay] = em(BAL_ANG - BAL_ABERTURA, BAL_R);
  const [bx, by] = em(BAL_ANG + BAL_ABERTURA, BAL_R);
  const [px, py] = em(BAL_ANG, BAL_R * BAL_PONTA);
  /* Do lado de trás da base até o da frente pelo caminho LONGO da
     circunferência (`1 1`: arco maior, sentido dos ângulos crescentes), e o
     fecho é a cauda — dois segmentos até a ponta e de volta. */
  return (
    `M${n3(bx)} ${n3(by)} A${BAL_R} ${BAL_R} 0 1 1 ${n3(ax)} ${n3(ay)} ` +
    `L${n3(px)} ${n3(py)} Z`
  );
}

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
          /* A caixa grudada por fora da cena. Ela entra na conta da descida no
             celular, logo abaixo: o `top` dela é de onde a cena parte. */
          const visual = um<HTMLElement>(".ctr-visual");
          const aura = um<HTMLElement>(".ctr-aura");
          const guia = um<HTMLElement>(".ctr-guia");
          const onda = um<HTMLElement>(".ctr-onda");
          const eu = um<HTMLElement>(".ctr-eu");
          const balao = um<HTMLElement>(".ctr-balao");
          const lampada = um<SVGGElement>(".ctr-balao-luz");
          const halo = um<SVGCircleElement>(".ctr-balao-halo");
          const coroa = um<SVGPathElement>(".ctr-coroa-fio");
          const coroaCaixa = um<SVGElement>(".ctr-coroa");
          const orbita = um<HTMLElement>(".ctr-orbita");
          const cabeca = um<HTMLElement>(".ctr-cabeca");
          const selo = um<HTMLElement>(".ctr-selo");
          const esfera = um<HTMLElement>(".ctr-esfera");
          const orbes = q(".ctr-orbe-face");
          const raios = q(".ctr-raio");
          const pulsos = q(".ctr-raio-pulso");
          const pilares = q('.ctr-pilar[data-fam="pilar"]');
          const nosIa = q('.ctr-pilar[data-fam="ia"]');
          /* Os textos das constelações. Estão na ordem do DOM, que é a ordem
             de `PILARES` e de `IA` — é o que permite entrar CADA UM junto do
             seu nó, no mesmo `stagger`, sem um gatilho por item. */
          const cabPilares = um<HTMLElement>(
            '.ctr-const-grupo[data-fam="pilar"] .ctr-const-cab',
          );
          const cabIa = um<HTMLElement>(
            '.ctr-const-grupo[data-fam="ia"] .ctr-const-cab',
          );
          const txtPilares = q('.ctr-const-grupo[data-fam="pilar"] .ctr-no');
          const txtIa = q('.ctr-const-grupo[data-fam="ia"] .ctr-no');
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
          /* A lâmpada chega APAGADA: traço frio e sem halo. O balão pousa
             primeiro, a luz vem depois — o pedido existe antes de ser dito. */
          gsap.set(lampada, { stroke: "rgba(157, 220, 255, 0.34)" });
          gsap.set(halo, { autoAlpha: 0, scale: 0.55 });
          /* O FIO NASCE APAGADO, e não só "vazio".

             `strokeDashoffset: 1` esconde o traço inteiro, mas o `stroke-linecap:
             round` do fio ainda desenha as PONTAS de um traço de comprimento
             zero — um pontinho azul no alto da coroa, parado ali desde o
             primeiro quadro da seção. Era o rastro aparecendo antes da bolinha
             que o desenha, que é a ordem invertida da frase.

             O `autoAlpha` resolve na raiz: não há o que arredondar num traço
             que não está sendo pintado. Ele acende no MESMO instante em que o
             ponto de luz começa a volta. */
          gsap.set(coroa, { strokeDashoffset: 1, autoAlpha: 0 });
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
          /* Os pilares não existem até a última batida: os raios com o traço
             recolhido (`pathLength={1}`, então 1 é "nada desenhado") e os nós
             ausentes. */
          gsap.set(raios, { strokeDashoffset: 1 });
          /* O pulso não existe antes do fio: um ponto correndo num caminho que
             ainda não foi desenhado seria luz sem estrada. */
          gsap.set(pulsos, { autoAlpha: 0 });
          gsap.set([...pilares, ...nosIa], { autoAlpha: 0, scale: 0.72 });
          /* Os textos das constelações nascem ausentes pelo mesmo motivo que a
             cena: sem script a página os mostra prontos, e escondê-los pelo
             CSS apagaria justamente o conteúdo que não pode falhar.

             `y` pequeno (14px) e não uma entrada de meia tela: eles não estão
             viajando, estão POUSANDO no vértice que acabou de acender. */
          gsap.set([cabPilares, cabIa, ...txtPilares, ...txtIa], {
            autoAlpha: 0,
            y: 14,
          });

          /* ── A CENA DESCE PARA O MEIO DA TELA NO CELULAR, E SÓ NA NARRATIVA ──

             No telefone o texto não tem lateral para ocupar: ele mora ABAIXO do
             desenho (ver as duas bandas em `centro.css`). Só que as duas metades
             da seção querem a cena em lugares diferentes:

               narrativa      quatro blocos curtos, um por vez. Sobra tela, e o
                              desenho fica melhor CENTRADO, com o texto embaixo.
               constelações   cabeçalho e três itens ao mesmo tempo, ~50svh de
                              cartão. Aqui a cena PRECISA estar no alto, senão
                              não há onde pôr o texto.

             O CSS só sabe de uma posição — `.ctr-visual` é um elemento grudado
             só, com um `top` — então quem faz a diferença é a linha do tempo: a
             cena nasce descida até o centro e SOBE de volta na passagem, que é
             exatamente a batida em que a narrativa acaba e a esfera abre para
             virar hexágono. O movimento não é um ajuste escondido; ele acontece
             junto com o gesto que emenda as duas seções.

             A conta é medida, não escrita: metade do que sobra da tela depois da
             cena, menos o `top` que o CSS já deu. Função e não número porque o
             gatilho tem `invalidateOnRefresh` — vira o telefone e ela se refaz.

             `y` e não `yPercent`: a quarta batida já usa `yPercent` na mesma
             caixa (a subida de 10% abaixo de 1180px), e as duas são componentes
             separadas da mesma transformação — uma não apaga a outra. */
          const descidaCena = () => {
            if (!window.matchMedia("(max-width: 900px)").matches) return 0;
            const topo = parseFloat(getComputedStyle(visual).top) || 0;
            return Math.max(
              0,
              (window.innerHeight - cena.offsetHeight) / 2 - topo,
            );
          };
          gsap.set(cena, { y: descidaCena });

          const tl = gsap.timeline({
            scrollTrigger: {
              /* O gatilho é a COLUNA EM FLUXO — os quatro blocos da narrativa,
                 a faixa de passagem e as duas constelações —, e ela existe como
                 elemento só para isto: é a altura dela que define quanto a cena
                 tem para andar.

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

          /* ── AS FATIAS SÃO MEDIDAS, E NÃO ESCRITAS ──

             A linha do tempo é raspada pela coluna inteira, então cada batida
             precisa cair exatamente sobre a fatia de rolagem que lhe pertence.
             Enquanto TODAS as fatias tinham a mesma altura, `i * T_BATIDA`
             bastava. Não têm mais: os blocos da narrativa valem uma tela curta
             e cada CONSTELAÇÃO vale uma tela inteira, porque nela três textos
             entram ao mesmo tempo em volta do hexágono.

             Então a posição e a duração de cada batida saem da altura REAL da
             fatia, lida do DOM. É a mesma amarra de antes — fatia e batida
             ocupando a mesma fração do percurso —, só que agora ela vale para
             fatias de tamanhos diferentes, e continua valendo no celular, onde
             o CSS empilha a constelação e muda as proporções. */
          const fatias = q(".ctr-fatia");
          const alturas = fatias.map((el) => el.offsetHeight);
          const somaAlt = alturas.reduce((a, b) => a + b, 0) || 1;
          const T_TOTAL = fatias.length * T_BATIDA;
          const emT: number[] = [];
          const durT: number[] = [];
          let corrido = 0;
          for (const alt of alturas) {
            emT.push((corrido / somaAlt) * T_TOTAL);
            durT.push((alt / somaAlt) * T_TOTAL);
            corrido += alt;
          }

          const batida = (nome: string, i: number) =>
            tl.addLabel(nome, emT[i] ?? i * T_BATIDA);

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
            "credo",
          )
            .to(
              guia,
              { autoAlpha: 1, scale: 1, duration: 1.6, ease: E_MOLA },
              "credo+=0.15",
            )
            .to(
              eu,
              { autoAlpha: 1, scale: 1, duration: 1.1, ease: E_MOLA },
              "credo+=0.5",
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
            "ideia+=0.2",
          )
            /* ACENDER É O HALO, não a troca de cor. O traço clareia junto —
               vidro aceso é mais claro que vidro apagado —, mas quem diz
               "acendeu" é a luz derramada em volta, e é por isso que os dois
               correm juntos e não em sequência.

               A mola do halo é a SOLTA, a mesma do balão: a luz de uma lâmpada
               não sobe em rampa, ela estoura e assenta. */
            .to(
              halo,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                ease: E_MOLA_SOLTA,
              },
              "ideia+=0.95",
            )
            .to(
              lampada,
              { stroke: "#eaf7ff", duration: 0.5, ease: E_LUZ },
              "ideia+=0.95",
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
            "ia",
          )
            .to(
              cabeca,
              { autoAlpha: 1, scale: 1, duration: 0.5, ease: E_MOLA_SOLTA },
              "ia+=0.25",
            )
            .to(
              orbita,
              { rotation: 360, duration: 1.7, ease: E_UI },
              "ia+=0.35",
            )
            /* O fio acende junto com a partida do ponto — antes disso ele não
               existe, nem como ponta arredondada. */
            .set(coroa, { autoAlpha: 1 }, "ia+=0.35")
            .to(
              coroa,
              { strokeDashoffset: 0, duration: 1.7, ease: E_UI },
              "ia+=0.35",
            )
            .to(aura, { opacity: 0.76, duration: 1.2, ease: E_LUZ }, "ia+=0.4")
            /* A cabeça encolhe para dentro do ponto em que começou em vez de
               apagar no lugar: ela voltou de onde saiu, e é isso que fecha a
               volta. O selo entra no mesmo instante, no mesmo ponto. */
            .to(
              cabeca,
              { autoAlpha: 0, scale: 0.4, duration: 0.5, ease: E_LUZ },
              "ia+=1.95",
            )
            .to(
              selo,
              { autoAlpha: 1, scale: 1, duration: 0.9, ease: E_MOLA_SOLTA },
              "ia+=1.95",
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
            "produto",
          )
            .to(
              guia,
              { autoAlpha: 0, scale: 1.3, duration: 0.9, ease: E_UI },
              "produto+=0.1",
            )
            .to(
              esfera,
              { scale: 1, duration: 1.9, ease: E_MOLA },
              "produto+=0.12",
            )
            .to(
              orbes,
              { autoAlpha: 1, duration: 0.7, ease: E_LUZ, stagger: 0.06 },
              "produto+=0.2",
            )
            .to(
              eu,
              { autoAlpha: 0, scale: 0.62, duration: 0.9, ease: E_UI },
              "produto+=0.3",
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
                scale: ESCALA_SELO_NO_CENTRO,
                duration: 1.4,
                ease: E_MOLA,
              },
              "produto+=0.3",
            )
            .to(
              aura,
              { opacity: 0.58, duration: 1, ease: E_LUZ },
              "produto+=0.4",
            )
            .to(
              cena,
              {
                yPercent: () =>
                  window.matchMedia("(max-width: 1180px)").matches ? -10 : 0,
                duration: 1.6,
                ease: E_MOLA,
              },
              "produto+=0.15",
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

             O QUE FICA NA TELA no fim: o hexágono e a marca no meio dele —
             pronto para receber os três pilares, que é a batida seguinte. */
          batida("passagem", 4);
          /* A SUBIDA DA CENA, no celular (no desktop `descidaCena` vale 0 e este
             tween não move nada). Ela vai junto com a abertura da esfera: a
             narrativa acabou, o texto que morava embaixo dá lugar ao cartão da
             constelação, e o desenho toma o alto da tela para abrir espaço para
             ele. Ver `descidaCena`, na montagem. */
          tl.to(cena, { y: 0, duration: 1.6, ease: E_MOLA }, "passagem");
          tl.to(esfera, { scale: 2.75, duration: 1.6, ease: E_UI }, "passagem")
            .to(
              orbes,
              { autoAlpha: 0, duration: 0.8, ease: E_LUZ, stagger: 0.03 },
              "passagem+=0.05",
            )
            .to(
              coroaCaixa,
              { scale: ESCALA_HEX, duration: 1.7, ease: E_MOLA },
              "passagem+=0.35",
            )
            .to(
              coroa,
              { "--coroa-w": 0.45, duration: 1.7, ease: E_UI },
              "passagem+=0.35",
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
              "passagem+=0.35",
            )
            .to(
              aura,
              { opacity: 0.72, scale: 1.12, duration: 1.4, ease: E_LUZ },
              "passagem+=0.3",
            );

          /* ── 6 · A CONSTELAÇÃO DOS PILARES ──
             O hexágono já está formado e a marca já está no meio dele. O que
             falta é dizer o que o segura — e a ordem importa: PRIMEIRO OS
             RAIOS, depois os nós, e cada texto junto do seu nó.

             Se os nós chegassem antes, seriam três ícones soltos que ganharam
             linha depois. Com o raio primeiro, cada pilar chega já ligado ao
             centro: a ligação é o que os torna pilares, e é ela que a seção
             afirma no texto ("é o que precisa funcionar junto").

             ISTO ERA QUATRO BATIDAS — cabeçalho e um pilar de cada vez, quatro
             telas de rolagem em que a cena não mudava de assunto: o mesmo
             hexágono parado enquanto um nó crescia e os outros dois recuavam.
             Cobrava meia página para dizer três frases curtas, e o leitor
             pagava esse mesmo pedágio de novo na parte da IA.

             Agora é UMA. Os três textos moram em VOLTA do polígono, cada um do
             lado do seu vértice — e é isso que dispensa a batida por item: o
             que ligava o texto ao nó era o nó acender na vez dele, e aqui é a
             POSIÇÃO que liga. O `stagger` continua: o nó acende e o texto dele
             pousa no mesmo instante, três vezes, dentro de uma fatia só.

             Os três terminam ACESOS, sem recuo. O recuo existia para dizer de
             qual nó o texto da vez falava; com os três textos na tela ao mesmo
             tempo, apagar dois seria apagar dois que estão sendo lidos.

             OS TEMPOS SAEM DA JANELA DE GRUDE, e não do gosto. A moldura da
             constelação vale uma tela dentro de uma fatia de 160svh: ela
             assenta depois de 50svh de rolagem (31% da fatia, ou +1,55 desta
             batida) e solta 110svh adiante (69%, +3,42). Tudo entra DEPOIS de
             assentar e apaga ANTES de soltar — senão o texto atravessa o
             hexágono no caminho, que é o defeito que a moldura veio corrigir. */
          /* ── OS TEMPOS DAS CONSTELAÇÕES, NO CELULAR, SÃO OUTROS ──

             Na tela larga a moldura da constelação GRUDA: ela precisa de meia
             tela de rolagem para assentar e solta outra meia adiante, e é por
             isso que o texto entra tarde (31% da fatia) e sai cedo (69%) — fora
             dessa janela ele atravessaria o hexágono.

             No celular a moldura não gruda, ela é FIXA: não há janela para
             respeitar, e manter os mesmos tempos custava caro. Medido, o texto
             ficava na tela em três de dez amostras da fatia e o resto era
             rolagem com o pé da tela vazio — ~900px depois de cada constelação.

             As frações abaixo são da DURAÇÃO DA FATIA, não segundos soltos:
             entra aos 10% e sai aos 86%, e a conta se refaz sozinha se a altura
             da fatia mudar. A leitura da faixa de mídia acontece na montagem; um
             telefone não troca de faixa ao girar (844px de largura deitado ainda
             é celular), e num tablet que atravesse o limite os tempos ficam
             deslocados dentro da mesma janela, sem quebrar nada. */
          const celular = window.matchMedia("(max-width: 900px)").matches;
          const naFatia = (i: number, fracao: number) =>
            (durT[i] ?? T_BATIDA) * fracao;
          /* AS DUAS CONSTELAÇÕES SÃO A MESMA FATIA (ver a moldura única no
             JSX), então os dois relógios contam do mesmo rótulo. Na tela larga
             a fatia vale 220svh: a moldura assenta em +50svh (~1,5s) e solta em
             +170svh (~5,2s). Os pilares vivem na primeira metade da janela
             presa e a IA na segunda — os tempos dela são os antigos deslocados
             1,75s, que é onde o texto dos pilares acabou de apagar. No celular
             as frações são da fatia inteira: pilares até ~0,43, IA de 0,55 em
             diante. */
          const tPil = (seg: number, frac: number) =>
            "pilares+=" + (celular ? naFatia(5, frac) : seg);
          const tIa = (seg: number, frac: number) =>
            "pilares+=" + (celular ? naFatia(5, frac) : seg + 1.75);

          /* QUANDO O TEXTO DA IA APAGA, NO CELULAR.

             A fração de 0,96 vinha da tela larga, onde o texto mora dentro da
             coluna e some antes de a moldura soltar. No telefone a moldura é
             FIXA no pé da JANELA (ver `.ctr-vivo .ctr-const-grade` em
             `centro.css`), e a linha do tempo só acaba quando o pé da coluna
             chega ao MEIO da tela: aos 0,96 o pé da seção ainda estava a ~59%
             da altura, e nos 41% de baixo o fechamento da página já tinha
             entrado — "Movidos por Inteligência Artificial" impresso em cima
             de "Leve a GRAVA.AI para a sua região" (visto no iPhone).

             O instante certo é o pé da seção encostando no pé da janela: dali
             em diante o bloco fixo cobriria o que vem depois. Na régua da
             fatia isso é meia janela antes do fim, e o apagar de 0,3s começa
             um pouco antes para já ter terminado nesse ponto. Medido em
             `svh`/altura real, não em fração fixa: a fatia vale 220svh no
             celular, mas o número entra pela altura lida do DOM e continua
             certo se a fatia mudar. O `max` segura a conta numa fatia que
             por algum motivo seja mais baixa que a janela. */
          const altIa = alturas[5] ?? 1;
          const durIa = durT[5] ?? T_BATIDA;
          const saidaIa = celular
            ? Math.max(
                0.6,
                1 - (window.innerHeight * 0.5) / altIa - 0.3 / durIa,
              )
            : 0.96;

          /* OS RAIOS ENCOSTAM NO ANEL DA MARCA, e o anel é medido, não escrito.

             O selo tem `clamp(1.5rem, 6cqw, 2.4rem)` de largura e chega ao
             centro escalado (`ESCALA_SELO_NO_CENTRO`): em cqw esse raio muda
             de tela para tela, e um número fixo deixava a linha ou dentro do
             glifo ou parada no ar a meio caminho. `offsetWidth` é a largura
             SEM transform — por isso a escala entra na conta à mão, e a
             medida não depende de o tween da descida já ter rodado.

             Valores em função + `invalidateOnRefresh` no gatilho: a conta se
             refaz a cada `refresh`, no giro do telefone e no redimensionar. O
             `set` vai NA LINHA DO TEMPO, antes do traço, porque é lá que ele
             é reavaliado; feito uma vez na montagem, valeria só para a
             primeira medida. Os dois `<line>` de cada raio (fio e pulso)
             partilham o ângulo — `PILARES[i >> 1]` — porque estão na ordem do
             DOM: fio, pulso, fio, pulso... */
          const raioDoAnel = () =>
            ((selo.offsetWidth * ESCALA_SELO_NO_CENTRO) /
              2 /
              cena.offsetWidth) *
            100;
          const noAnel = (eixo: "cos" | "sin") => (i: number) =>
            n3(50 + raioDoAnel() * Math[eixo](rad(PILARES[i >> 1].ang)));

          batida("pilares", 5);
          tl.to(
            cabPilares,
            { autoAlpha: 1, y: 0, duration: 0.55, ease: E_UI },
            tPil(1.65, 0.05),
          )
            .set(
              q(".ctr-raio, .ctr-raio-pulso"),
              { attr: { x1: noAnel("cos"), y1: noAnel("sin") } },
              tPil(1.7, 0.06),
            )
            .to(
              raios,
              {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: E_UI,
                stagger: 0.2,
              },
              tPil(1.75, 0.065),
            )
            /* O PULSO ACENDE DEPOIS DE O ÚLTIMO FIO FECHAR (0,8 de traço + 0,4
               de escalonamento), e não junto: primeiro a ligação existe, depois
               ela passa a correr. É a mesma ordem do resto da cena — primeiro
               o lugar, depois a luz.

               OS TRÊS JUNTOS, sem `stagger`: os pilares já chegaram os três
               numa batida só, e o pulso escalonado desfazia isso — parecia que
               um estava ligado e os outros dois ainda não. */
            .to(
              pulsos,
              { autoAlpha: 1, duration: 0.6, ease: E_UI },
              tPil(2.95, 0.11),
            )
            .to(
              pilares,
              {
                autoAlpha: 1,
                scale: 1,
                borderColor: "#66cdff",
                duration: 0.7,
                ease: E_MOLA_SOLTA,
                stagger: 0.2,
              },
              tPil(1.95, 0.09),
            )
            /* O texto entra COM o nó — mesmo instante, mesmo intervalo. É o
               par que substitui a batida por item: o olho vê o vértice acender
               e a frase aparecer do lado dele, e não precisa de mais nada para
               saber que são a mesma coisa. */
            .to(
              txtPilares,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                ease: E_UI,
                stagger: 0.2,
              },
              tPil(2, 0.1),
            )
            /* A aura fecha um degrau acima: o quadro tem mais desenho no meio
               do que qualquer outro, e sem isso o hexágono com três nós fica
               boiando num fundo calibrado para uma marca só. */
            .to(
              aura,
              { opacity: 0.66, duration: 1.2, ease: E_LUZ },
              tPil(1.7, 0.055),
            )
            /* E APAGA ANTES DE A MOLDURA SOLTAR. Enquanto ela está presa o
               texto fica parado nas faixas livres; solta, ele sobe — e subir
               aceso é passar por cima do hexágono, que é justamente o que não
               pode acontecer. O gesto é curto (0,3) porque não é uma saída para
               ser vista: é o quadro sendo limpo. */
            .to(
              [cabPilares, ...txtPilares],
              { autoAlpha: 0, y: -8, duration: 0.3, ease: E_UI },
              tPil(3.1, 0.43),
            );

          /* ── 7 · O HEXÁGONO FECHA: A MARCA ABRE E A IA OCUPA O RESTO ──
             Quatro coisas ao mesmo tempo, e juntas são a frase: os três cantos
             que faltavam recebem os nós da IA, a MARCA cresce até ocupar o
             hexágono, os pilares voltam ao repouso e o texto deles sai — o
             assunto passou a ser o conjunto.

             O TEXTO DOS PILARES JÁ SAIU no fim da batida anterior, antes de a
             moldura dele soltar — não há três frases velhas atravessando o
             quadro mais cheio da seção.

             OS TEMPOS SEGUEM A MESMA JANELA de grude da constelação dos
             pilares: entra depois de +1,55 e apaga antes de +3,42.

             A MARCA VIRA FUNDO, e não peça: ela abre atrás dos nós, em opacidade
             baixa. Cheia, um hexágono azul de meia cena vira uma chapa e engole
             os seis pontos que acabaram de ser plantados — e o que a batida diz
             é que eles estão DENTRO dela, não em cima.

             A escala é MEDIDA, não escrita: o alvo é a altura do glifo chegar a
             `MARCA_NO_HEX` do diâmetro do polígono, e a conta usa o tamanho real
             da cena a cada `refresh`. Um número fixo aqui só valeria para a
             tela em que ele foi calibrado — o selo nasce de um `clamp()`, e o
             clamp muda de perna conforme a cena.

             O halo do selo some junto: escalado doze vezes, um brilho de 24px
             vira uma mancha de meia cena. */
          tl.to(
            selo,
            {
              scale: () => {
                const glifo = selo.querySelector("svg");
                const alto = glifo?.getBoundingClientRect().height ?? 1;
                const cheio = cena.getBoundingClientRect().height;
                /* `alto` já vem com a escala atual aplicada (1.9, da quarta
                     batida), então a razão é sobre a caixa como ela está — e o
                     valor devolvido é a escala ABSOLUTA que o tween vai
                     escrever, não um acréscimo. */
                const atual = gsap.getProperty(selo, "scale") as number;
                const alvo = cheio * ((2 * R_HEX_CENA) / 100) * MARCA_NO_HEX;
                return (alvo / alto) * atual;
              },
              opacity: 0.38,
              "--selo-luz": 0,
              "--selo-anel": 0,
              duration: 1.5,
              ease: E_MOLA,
            },
            tIa(1.6, 0.55),
          )
            /* Os raios saem de cena: eles ligavam três nós a um ponto no meio,
               e o meio virou uma área. Linha por baixo de uma marca chapada é
               linha que não se vê e ainda suja a borda dela. */
            .to(
              [...raios, ...pulsos],
              { autoAlpha: 0, duration: 0.7, ease: E_UI },
              tIa(1.6, 0.55),
            )
            .to(
              pilares,
              {
                opacity: 0.62,
                scale: 1,
                borderColor: "rgba(102, 205, 255, 0.22)",
                duration: 0.8,
                ease: E_UI,
              },
              tIa(1.65, 0.555),
            )
            .to(
              cabIa,
              { autoAlpha: 1, y: 0, duration: 0.55, ease: E_UI },
              tIa(1.7, 0.56),
            )
            .to(
              nosIa,
              {
                autoAlpha: 1,
                scale: 1,
                opacity: 1,
                borderColor: "#66cdff",
                duration: 0.8,
                ease: E_MOLA_SOLTA,
                stagger: 0.2,
              },
              tIa(1.95, 0.59),
            )
            .to(
              txtIa,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: E_UI,
                stagger: 0.18,
              },
              tIa(1.95, 0.59),
            )
            /* E o quadro se limpa antes de a moldura soltar, como na batida
               anterior: o que fica na tela daqui em diante é a cena.

               NO CELULAR ELE SE LIMPA MAIS CEDO — ver `saidaIa` acima. */
            .to(
              [cabIa, ...txtIa],
              { autoAlpha: 0, y: -8, duration: 0.3, ease: E_UI },
              tIa(3.1, saidaIa),
            );

          /* A última fatia precisa existir inteira na linha do tempo, senão a
             duração acaba no último tween e a batida final consome menos
             rolagem do que a fatia dela mede. */
          tl.to({}, { duration: durT[5] ?? T_BATIDA }, emT[5] ?? 5 * T_BATIDA);

          /* ─────────────────────────────────────────────────────────────────
             O BLOCO QUE ESTÁ SENDO LIDO

             Um gatilho por bloco, só para acender e apagar. Não é animação —
             é ESTADO, e estado nesta página muda em `--t-mov`/`--e-ui`, pelo
             CSS. Amarrá-lo à linha do tempo raspada faria o texto piscar junto
             com a rolagem, que é ruído em cima de leitura. */
          /* NO CELULAR A JANELA ENCOSTA NA DA VIZINHA, E ISSO É O PONTO.

             Na tela larga o texto mora nas laterais e a janela é folgada nas
             duas pontas ("top 62%" → "bottom 42%"): sobra um pedaço de rolagem
             sem nenhum bloco aceso, e não faz falta, porque o que está no meio
             da tela é a cena.

             No telefone os blocos são FIXOS no pé da janela (ver `.ctr-vivo` no
             `centro.css`) — quatro textos no mesmo lugar, e a rolagem não move
             nenhum. Aí a janela deixa de ser uma questão de conforto e vira a
             troca em si: com folga nas pontas, ou dois ficam acesos ao mesmo
             tempo no mesmo pixel (ilegível), ou nenhum fica e o pé da tela pisca
             vazio no meio da seção.

             `top 50%` → `bottom 50%` é a única janela sem folga E sem
             sobreposição: cada fatia está acesa exatamente enquanto a linha de
             meia tela está dentro dela. Duas fatias vizinhas trocam no mesmo
             instante, e as duas transições de 180ms se cruzam — que é a
             dissolvência pedida. */
          const noCelular = () =>
            window.matchMedia("(max-width: 900px)").matches;

          blocos.forEach((el) => {
            ScrollTrigger.create({
              trigger: el,
              start: () => (noCelular() ? "top 50%" : "top 62%"),
              end: () => (noCelular() ? "bottom 50%" : "bottom 42%"),
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

              {/* OS RAIOS DOS PILARES. Saem do centro — onde a marca está — e
                  vão até os vértices do hexágono. Desenhados AQUI, logo depois
                  do fio e ANTES de toda peça redonda da cena — o cliente, o
                  selo da marca, os nós —, porque são o chão delas: o disco
                  passa por cima da ponta do raio, e não o contrário. E NÃO
                  PARTEM DO CENTRO EXATO: a marca não tem chapa atrás, então
                  ordem na marcação não basta — a linha continuaria visível
                  por dentro do glifo. Elas começam na BORDA DO ANEL da marca,
                  medida pela linha do tempo (`raioDoAnel`); `R_RAIO_INICIO`
                  é só o valor do servidor.

                  Apagados de propósito: são relação, não conteúdo. Com o peso
                  do hexágono, o desenho passaria a ter duas linhas dizendo
                  coisas diferentes com a mesma força.

                  CADA RAIO SÃO DUAS LINHAS NO MESMO TRAÇADO: a de baixo é o fio
                  que a linha do tempo desenha, a de cima é o PULSO — um
                  segmento curto e claro que corre do centro ao nó e volta, em
                  CSS, sem parar. É o que diz que a ligação está VIVA: a marca
                  e o pilar trocando alguma coisa, e não só um risco entre os
                  dois. O pulso só acende depois de o fio estar inteiro (ver a
                  batida dos pilares) e apaga com ele. */}
              <svg
                className="ctr-raios"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                {PILARES.map((p) => {
                  const c = Math.cos(rad(p.ang));
                  const sn = Math.sin(rad(p.ang));
                  const x1 = n3(50 + R_RAIO_INICIO * c);
                  const y1 = n3(50 + R_RAIO_INICIO * sn);
                  const x2 = n3(50 + R_HEX_CENA * c);
                  const y2 = n3(50 + R_HEX_CENA * sn);
                  return (
                    <g key={p.id}>
                      <line
                        className="ctr-raio"
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        pathLength={1}
                      />
                      <line
                        className="ctr-raio-pulso"
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        pathLength={1}
                      />
                    </g>
                  );
                })}
              </svg>

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

              {/* OS TRÊS PILARES, nos vértices — só o ícone. O nome e a
                  explicação estão no bloco de texto da batida de cada um, ao
                  lado da cena; escritos também aqui, apareceriam duas vezes no
                  mesmo quadro. */}
              {PILARES.map(({ id, ang, Ico }) => (
                <div className="ctr-marco" key={id} style={emCena(ang)}>
                  <span className="ctr-pilar" data-fam="pilar" data-no={id}>
                    <Ico />
                  </span>
                </div>
              ))}

              {/* OS TRÊS PAPÉIS DA IA, nos vértices que sobraram. Mesma peça
                  dos pilares — o hexágono não tem dois tipos de canto —, e o
                  que separa as duas listas é só `data-fam`, que a linha do
                  tempo usa para acender uma de cada vez. */}
              {IA.map(({ id, ang, Ico }) => (
                <div className="ctr-marco" key={id} style={emCena(ang)}>
                  <span className="ctr-pilar" data-fam="ia" data-no={id}>
                    <Ico />
                  </span>
                </div>
              ))}

              {/* O BALÃO DA IDEIA. Acima e à direita do cliente, com o bico
                  apontando de volta para ele — é fala, e fala precisa dizer de
                  quem é. Dentro vai o glifo da arte, o mesmo ícone que a seção
                  `#ia` usa para "Na criação": o balão é o pedido, e o pedido
                  nesta rede é uma arte. */}
              <div className="ctr-marco" style={{ left: "64%", top: "36%" }}>
                <div className="ctr-balao">
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <path className="ctr-balao-forma" d={dBalao()} />

                    {/* O halo fica ATRÁS da lâmpada e é o que dá o "acendeu":
                        o traço sozinho só troca de cor, e trocar de cor não é
                        acender — é a luz derramada em volta que diz isso. */}
                    <circle className="ctr-balao-halo" cx="50" cy="38" r="17" />

                    {/* A LÂMPADA, no vocabulário de ícones da página: caixa de
                        24 e traço de 1.5, aqui posta em escala 1.25 e centrada
                        no disco. Desenhada em cima do sistema que já existe, e
                        não à mão em unidades do `viewBox`, para que a espessura
                        do traço bata com a dos outros ícones da cena. */}
                    <g
                      className="ctr-balao-luz"
                      transform="translate(35 24) scale(1.25)"
                    >
                      <path d="M12 3.5a5.5 5.5 0 013.3 9.9c-.55.42-.86 1.06-.86 1.74v.36H9.56v-.36c0-.68-.31-1.32-.86-1.74A5.5 5.5 0 0112 3.5z" />
                      <path d="M9.9 18.4h4.2" />
                      <path d="M10.8 20.9h2.4" />
                    </g>
                  </svg>
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
              <li
                className="ctr-passo ctr-fatia"
                key={t.id}
                data-lugar={t.lugar}
              >
                <div className="ctr-flancos">
                  <div className="ctr-bloco">
                    <h3 className="ctr-tit">{t.titulo}</h3>
                  </div>
                  <div className="ctr-bloco">
                    <p className="ctr-txt">{t.texto}</p>
                  </div>
                </div>
              </li>
            ) : (
              <li
                className="ctr-passo ctr-fatia"
                key={t.id}
                data-lugar={t.lugar}
              >
                <div className="ctr-bloco">
                  <h3 className="ctr-tit">{t.titulo}</h3>
                  <p className="ctr-txt">{t.texto}</p>
                </div>
              </li>
            ),
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
        <div className="ctr-passagem ctr-fatia" aria-hidden="true" />

        {/* ---- AS DUAS CONSTELAÇÕES ----

            OITO FATIAS DE ROLAGEM VIRARAM DUAS. Os pilares e os papéis da IA
            eram, cada grupo, um cabeçalho e três blocos em fila — oito telas em
            que a cena não mudava de assunto: o mesmo hexágono parado enquanto
            um nó crescia e os outros recuavam. Era meia página de rolagem para
            dizer três frases curtas, duas vezes seguidas.

            A constelação diz as mesmas três de uma vez. Os textos deixam de
            passar POR a cena e passam a morar EM VOLTA dela, cada um do lado do
            vértice de que fala: a grade reserva o meio para o hexágono e
            distribui os blocos pelas faixas livres, nas mesmas direções em que
            os nós estão plantados (ver `emCena` e os ângulos em `PILARES`/`IA`).

            É a posição que liga o texto ao nó — trabalho que a batida por item
            fazia gastando uma tela. O que sobrou de movimento é o que importa:
            o raio corre, o nó acende e a frase dele pousa ao lado, três vezes,
            dentro de uma fatia só.

            NENHUMA PALAVRA SE PERDEU: são os mesmos seis nomes e os mesmos seis
            textos que estavam nos cartões das seções antigas.

            `id` fica no invólucro, que é onde a parte começa — é para cá que o
            menu e o rodapé apontam. */}
        <div className="ctr-const ctr-fatia" id="pilares">
          {/* UMA MOLDURA SÓ PARA AS DUAS CONSTELAÇÕES, e não uma por grupo.

              Eram duas fatias de 160svh, cada uma com a sua moldura grudada de
              uma tela. Entre o texto dos pilares apagar e o da IA acender
              passava UMA TELA INTEIRA de rolagem só com o hexágono parado: a
              moldura dos pilares soltava (50svh antes do fim da fatia dela) e
              a da IA precisava subir do pé da tela até assentar (50svh depois
              do começo da dela). É a mecânica do grude — toda moldura de tela
              cheia cobra uma tela para entrar —, e duas seguidas cobram duas.

              Com uma moldura só, os dois grupos são camadas da mesma grade
              (`.ctr-const-grupo`, um em cima do outro na mesma célula) e a
              moldura fica presa por 120svh em vez de 60: os pilares ocupam a
              primeira metade e a IA a segunda, e a troca entre os dois é só o
              fade de um e o do outro — sem rolagem morta no meio. */}
          <div className="ctr-const-grade">
            <div className="ctr-const-grupo" data-fam="pilar">
              {/* O cabeçalho ocupa a faixa livre do ALTO. Os três pilares moram
                em 210°, −30° e 90° — esquerda-cima, direita-cima e baixo —,
                então o topo é o único lugar da grade sem vértice para
                disputar. */}
              <div className="ctr-const-cab">
                <h2 className="ctr-tit ctr-tit--cab">
                  Três pilares <mark>sustentam a empresa.</mark>
                </h2>
                <p className="ctr-txt">
                  Não são valores de parede: são o que precisa funcionar junto.
                </p>
              </div>

              {/* Uma lista de verdade: os três são itens de igual peso, e isso
                precisa existir na marcação e não só na tipografia. */}
              <ul className="ctr-nos">
                {PILARES.map((p) => (
                  <li className="ctr-no" key={p.id} data-lugar={p.lugar}>
                    <h3 className="ctr-no-tit">{p.nome}</h3>
                    <p className="ctr-txt">{p.texto}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* A IA fecha a cena: a partir daqui não há canto vazio no hexágono
            nem seção nova para abrir.

            O TEXTO DELA FICA ONDE O DOS PILARES ESTAVA: cabeçalho em cima,
            dois itens nas laterais altas, um embaixo. Já seguiu os vértices
            dela (−90°, 30°, 150°: cabeçalho embaixo, itens nas metades
            inferiores), e com os dois grupos na mesma moldura isso virava um
            fade em que título e itens pulam de faixa — lia como layout
            quebrando. Agora o texto troca no lugar e quem muda de figura é a
            cena. `lugar` segue a ordem do processo (criação, produção,
            atendimento) nas mesmas células dos pilares — e não o ângulo do nó,
            que é o que vale para os pilares.

            `id="ia"` fica no GRUPO: ele mora a uma tela do topo da fatia na
            ordem do fluxo, então o menu cai exatamente na troca — pilares
            saindo, IA entrando. */}
            <div className="ctr-const-grupo" data-fam="ia" id="ia">
              <div className="ctr-const-cab">
                <h2 className="ctr-tit ctr-tit--cab">
                  Movidos por <mark>Inteligência Artificial.</mark>
                </h2>
                <p className="ctr-txt">
                  Da criação da arte ao atendimento, tudo passa por ela.
                </p>
              </div>

              <ul className="ctr-nos">
                {IA.map((p) => (
                  <li className="ctr-no" key={p.id} data-lugar={p.lugar}>
                    <h3 className="ctr-no-tit">{p.nome}</h3>
                    <p className="ctr-txt">{p.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
