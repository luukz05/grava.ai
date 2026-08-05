/* Fundo do herói — topográfico, em duas cartas e com grão.

   Este arquivo já teve dez fundos em comparação (entalhe, pontilhado,
   blueprint, hexágonos, dot grid, aurora, malha, feixes e grade). A decisão
   ficou no topográfico e o resto saiu: código de opção que ninguém mais pode
   escolher só faz o próximo leitor perguntar qual está em uso. Os outros nove
   estão no commit `f5b1214`.

   Curvas de nível de um terreno gerado por soma de senos. Cada curva é uma
   linha fechada e a distância entre elas conta a inclinação — perto quer dizer
   íngreme, como num mapa de verdade. Determinístico: mesmo desenho no servidor
   e no cliente, sem random e sem JavaScript de runtime.

   PROFUNDIDADE. São duas cartas, não uma. A de trás tem fase, amplitude e
   espaçamento próprios: é outro terreno, não a mesma linha duplicada — cópia
   deslocada leria como erro de registro de impressão. Ela vem desbotada na
   direção da cor do fundo e meio pixel fora de foco (perspectiva aérea, o
   mesmo motivo pelo qual serra distante fica azulada), e na rolagem as duas
   andam em sentidos opostos. O que produz profundidade é a diferença de
   velocidade, não o deslocamento em si.

   GRÃO. Fica fora das duas e não acompanha o parallax: filme está na lente,
   não no terreno. É justamente o grão parado que faz as cartas lerem como
   distância, em vez de dois desenhos escorregando. */

import { SeguirPonteiro } from "./ponteiro";

export type Fundo = "topo";

/* Um ponto cotado. `t` é a fração horizontal, `nivel` diz sobre qual curva ele
   pousa, e `recuo` (0 a 1) é a distância dele dentro da própria camada: encolhe
   o hexágono e apaga o traço. É o recuo que faz três marcos numa mesma carta
   descreverem uma sequência que se afasta, em vez de três adesivos do mesmo
   tamanho espalhados.

   `volta` só vale onde a camada tem rota: é quanto tempo o marco leva para
   subir a carta inteira e descer de volta. */
type Marco = {
  t: number;
  nivel: number;
  recuo: number;
  volta?: number;
};

type Camada = {
  chave: "longe" | "perto";
  /* Quantas curvas de nível e a que distância vertical uma da outra. Mais
     curvas e mais juntas é o que a distância faz com um terreno. */
  cotas: number;
  espaco: number;
  /* Fase desloca o terreno inteiro; amplitude achata o relevo. Juntas, viram
     outra paisagem a partir da mesma função. */
  fase: number;
  amp: number;
  traco: number;
  mestra: number;
  opac: number;
  opacMestra: number;
  /* Marcos com recuo 0. Os outros saem daí para baixo. */
  marcoRaio: number;
  marcoOpac: number;
  /* Quando o primeiro marco da camada entra, em segundos. */
  marcoAtraso: number;
  /* Se os marcos desta camada trocam de curva com o tempo. Só a de trás: um
     hexágono saltando a 0,34 de opacidade em cima da manchete disputaria
     atenção com ela; na névoa, é movimento periférico e é só isso que ele
     precisa ser. */
  marcoRota: boolean;
  marcos: Marco[];
};

/* Duas cartas na mesma faixa vertical se cruzam, e curva de nível que cruza
   outra não existe em mapa nenhum — o olho lê hachura, não relevo. A de trás
   por isso é quase só névoa: opacidade em torno de um vigésimo, desfoque de
   quase um pixel, cor puxada para o fundo. Ela não desenha, ela adensa. Foi
   com ela no mesmo peso da frente que o herói virou um emaranhado. */
const CAMADAS: Camada[] = [
  {
    chave: "longe",
    cotas: 16,
    espaco: 0.05,
    fase: 2.35,
    amp: 0.5,
    traco: 0.6,
    mestra: 0.9,
    opac: 0.05,
    opacMestra: 0.1,
    marcoRaio: 6.5,
    marcoOpac: 0.15,
    marcoAtraso: 0.95,
    marcoRota: true,
    /* Três marcos, cada um percorrendo as dezesseis curvas por conta própria.
       `nivel` aqui é só onde ele começa. Voltas de durações diferentes: com
       durações iguais os três saltariam juntos e o fundo teria um compasso, que
       é o oposto do que uma névoa deve ter. São trinta saltos por volta, o que
       dá entre 2,6 e 3,7 segundos parado em cada cota.

       A regra da carta da frente (marco só em cota mestra) não se aplica aqui —
       nesta camada a diferença entre mestra e intermediária já está abaixo do
       limiar de visão, e manter a restrição só tiraria curvas do percurso sem
       ninguém poder notar. */
    marcos: [
      { t: 0.14, nivel: 12, recuo: 0.2, volta: 78 },
      { t: 0.52, nivel: 6, recuo: 0.6, volta: 94 },
      { t: 0.87, nivel: 2, recuo: 1, volta: 112 },
    ],
  },
  {
    chave: "perto",
    cotas: 15,
    espaco: 0.055,
    fase: 0,
    amp: 1,
    traco: 0.85,
    mestra: 1.4,
    opac: 0.09,
    opacMestra: 0.2,
    marcoRaio: 8,
    marcoOpac: 0.34,
    marcoAtraso: 2,
    marcoRota: false,
    /* Fora da mancha da manchete e do painel do herói, e só sobre cotas
       mestras: marco em curva intermediária contradiz a convenção que a própria
       carta estabelece. */
    marcos: [
      { t: 0.07, nivel: 5, recuo: 0 },
      { t: 0.19, nivel: 10, recuo: 0.25 },
      { t: 0.82, nivel: 0, recuo: 0.1 },
      { t: 0.93, nivel: 5, recuo: 0.35 },
      { t: 0.71, nivel: 10, recuo: 0 },
    ],
  },
];

/* A altura do terreno num ponto. Separada do desenho do caminho porque os
   marcos hexagonais precisam pousar exatamente sobre a curva — marco que
   flutua ao lado da linha lê como erro de alinhamento, não como marco. */
function cota(t: number, nivel: number, altura: number, c: Camada) {
  const centro = (c.cotas - 1) / 2;
  return (
    altura * 0.5 +
    Math.sin(t * 6.1 + nivel * 0.42 + c.fase) * altura * 0.17 * c.amp +
    Math.sin(t * 13.7 - nivel * 0.31 + c.fase) * altura * 0.07 * c.amp +
    Math.cos(t * 3.3 + nivel * 0.9 + c.fase) * altura * 0.1 * c.amp +
    (nivel - centro) * altura * c.espaco
  );
}

function curvaNivel(nivel: number, largura: number, altura: number, c: Camada) {
  const passo = 8;
  const pontos: string[] = [];
  for (let x = 0; x <= largura; x += passo) {
    const t = x / largura;
    pontos.push(`${x.toFixed(0)},${cota(t, nivel, altura, c).toFixed(1)}`);
  }
  return `M${pontos.join("L")}`;
}

/* O percurso de um marco, em quadros de CSS.

   Ele não desliza pela carta: pousa numa curva, fica, salta para a próxima,
   fica. Marco que desliza vira partícula à deriva; marco que pousa continua
   sendo marco, e é a pausa que faz o salto ler como troca de cota.

   VAI E VOLTA, não circular. A primeira versão percorria as cotas em ciclo
   (`(nivel + i * passo) % n`) e o módulo, ao dar a volta, teleportava o marco
   do pé da carta ao topo: um salto de 588px num quadro, medido. Subir vizinha
   por vizinha e descer de volta visita as mesmas dezesseis curvas com salto
   máximo de ~100px e média de 44px. Trinta pousos por volta em vez de
   dezesseis, e nenhum deles atravessa a tela.

   Por que quadros gerados no servidor, e não `offset-path` com `steps()`: os
   saltos têm que cair exatamente sobre as curvas, e as curvas não estão
   igualmente espaçadas num `t` fixo — o termo de onda muda de uma cota para a
   outra em até dois terços do espaçamento. `steps()` divide o percurso em
   fatias iguais e erraria todas. Aqui cada destino é o valor exato de `cota()`.

   E são quadros de CSS, e não `<animateTransform>` do SVG, por um motivo só:
   SMIL não enxerga `prefers-reduced-motion`. Isto aqui apaga inteiro numa
   media query. */
function quadrosRota(nome: string, m: Marco, c: Camada, altura: number) {
  const n = c.cotas;
  /* 0,1,…,n-1,n-2,…,1. A sequência é cíclica e toda vizinhança nela é de cotas
     vizinhas, inclusive na emenda do fim com o começo — então girá-la para
     começar na cota em que o marco foi desenhado não quebra nada. É isso que
     evita o marco pular de lugar no instante em que a animação começa. */
  const ciclo = [
    ...Array.from({ length: n }, (_, i) => i),
    ...Array.from({ length: n - 2 }, (_, i) => n - 2 - i),
  ];
  const rota = [...ciclo.slice(m.nivel), ...ciclo.slice(0, m.nivel)];
  const base = cota(m.t, m.nivel, altura, c);
  const fatia = 100 / rota.length;
  /* 72% da fatia parado, 28% em movimento. */
  const parada = fatia * 0.72;
  const linhas = rota.map((alvo, i) => {
    const dy = (cota(m.t, alvo, altura, c) - base).toFixed(1);
    return `${(i * fatia).toFixed(3)}%,${(i * fatia + parada).toFixed(3)}%{translate:0 ${dy}px}`;
  });
  /* O último quadro repete o primeiro: sem ele o ciclo emendaria com um salto
     seco de volta ao início. */
  linhas.push(`100%{translate:0 ${(cota(m.t, rota[0], altura, c) - base).toFixed(1)}px}`);
  return `@keyframes ${nome}{${linhas.join("")}}`;
}

/* Numa carta de verdade, os pontos cotados são marcados sobre a curva com um
   símbolo e um número — é o que prende o desenho ao terreno real. Aqui o
   símbolo é o hexágono da marca, que é o único lugar em que a identidade entra
   no fundo sem virar logo carimbado. */
function hexagono(cx: number, cy: number, r: number) {
  const pontos = Array.from({ length: 6 }, (_, i) => {
    /* -30° põe um vértice no topo: é a orientação do hexágono da marca, e um
       hexágono na orientação errada lê como outro símbolo. */
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pontos.join("L")}Z`;
}

/* Grão de filme. O `feTurbulence` gera o ruído no próprio navegador: nenhum
   PNG de textura, nenhum byte a mais na rede. O `feColorMatrix` pinta o RGB de
   branco e joga o ruído no canal alfa — o `-0.32` corta tudo abaixo do
   meio-tom, então o que sobra são pontos claros esparsos, que é como grão se
   comporta em sombra. No tema claro o CSS inverte e eles viram ponto escuro
   sobre papel.

   Vai num `<pattern>` de 320px em vez de cobrir a tela inteira: o navegador
   rasteriza o ruído uma vez e repete o ladrilho, em vez de gerar ruído para
   cada pixel do herói. `stitchTiles="stitch"` fecha a emenda; sem ele a
   costura do ladrilho aparece como grade. E a região do filtro é fixada em
   0/0/100%/100% porque o padrão é vazar 10% para fora da caixa — vazar aqui
   significa ladrilho sobrepondo ladrilho e emenda escurecendo. */
function GraoFilme() {
  return (
    <svg className="topo-grao" aria-hidden="true">
      <defs>
        <filter
          id="tpGrao"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves={3}
            stitchTiles="stitch"
            seed={7}
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 -0.32"
          />
        </filter>
        <pattern id="tpGraoTile" width="320" height="320" patternUnits="userSpaceOnUse">
          <rect width="320" height="320" filter="url(#tpGrao)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tpGraoTile)" />
    </svg>
  );
}

/* ---------- a trilha ----------

   A carta topográfica acabava na dobra do herói e a página inteira abaixo dela
   era fundo liso. O material da marca vivia numa tela só.

   Aqui o terreno continua atrás de toda a página, e por cima dele corre uma
   trilha — a linha que atravessa a carta de cima a baixo. Ela não é uma curva
   de nível: curva de nível é o terreno, trilha é o caminho de quem anda nele.
   São desenhos diferentes num mapa de verdade e são desenhos diferentes aqui,
   porque é essa diferença que faz a linha acesa significar alguma coisa.

   A trilha se risca conforme a pessoa rola: o pedaço já desenhado é o trecho
   que ela percorreu, e a ponta é onde ela está. Sem ouvinte de rolagem — a
   linha do tempo é a própria posição do documento, como em todo o resto da
   página. Sem suporte, ou com movimento reduzido, ela aparece inteira: uma
   carta com o caminho marcado, que é um estado correto e não um defeito. */

/* O caminho desce de cima a baixo serpenteando. As frequências são as mesmas
   famílias de seno do terreno, para a mão do desenho ser reconhecidamente a
   mesma; o que muda é o eixo — aqui `y` é quem manda e `x` é que oscila. */
function caminho(largura: number, altura: number) {
  const passo = 12;
  const pontos: string[] = [];
  for (let y = 0; y <= altura; y += passo) {
    const t = y / altura;
    const x =
      largura * 0.5 +
      Math.sin(t * 7.4 + 0.6) * largura * 0.28 +
      Math.sin(t * 17.1 + 1.2) * largura * 0.085 +
      Math.cos(t * 3.1) * largura * 0.06;
    pontos.push(`${x.toFixed(1)},${y.toFixed(0)}`);
  }
  return `M${pontos.join("L")}`;
}

/* As curvas de nível do corpo da página. Bem mais espaçadas e mais rasas que
   as do herói: ali elas são o assunto da tela, aqui são o chão por trás de
   nove telas de texto. Amplitude alta atrás de parágrafo vira ruído de
   leitura. */
function contorno(n: number, total: number, largura: number, altura: number) {
  const passo = 30;
  const pontos: string[] = [];
  const base = altura * ((n + 0.5) / total);
  for (let x = 0; x <= largura; x += passo) {
    const t = x / largura;
    const y =
      base +
      Math.sin(t * 5.3 + n * 1.7) * altura * 0.016 +
      Math.sin(t * 11.9 - n * 0.9) * altura * 0.006 +
      Math.cos(t * 2.6 + n * 0.5) * altura * 0.011;
    pontos.push(`${x.toFixed(0)},${y.toFixed(1)}`);
  }
  return `M${pontos.join("L")}`;
}

export function TrilhaTopo() {
  /* Caixa de coordenadas, não medida real: o SVG estica para a altura da
     página com `preserveAspectRatio="none"`. Por isso `vector-effect` em todo
     traço — sem ele o esticamento vertical engrossaria as linhas junto. */
  const w = 1440;
  const h = 2400;
  const total = 9;
  return (
    <div className="trilha" aria-hidden="true">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {Array.from({ length: total }, (_, n) => (
          <path
            key={n}
            d={contorno(n, total, w, h)}
            fill="none"
            stroke="currentColor"
            strokeWidth={n % 3 === 0 ? 1.4 : 0.9}
            opacity={n % 3 === 0 ? 0.3 : 0.16}
            vectorEffect="non-scaling-stroke"
            className="trilha-nivel"
          />
        ))}

        {/* Duas cópias do mesmo caminho: a larga é o halo, a fina é a linha.
            Halo por sobreposição e não por `filter: drop-shadow` — o filtro
            reprocessa a cada quadro de rolagem, e isto aqui é uma geometria
            que muda em todo quadro. Dois traços custam repintura; um filtro
            sobre traço que muda custa repintura mais borrão. */}
        <path
          className="trilha-linha trilha-linha--halo"
          d={caminho(w, h)}
          fill="none"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
        />
        <path
          className="trilha-linha trilha-linha--fio"
          d={caminho(w, h)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
        />
      </svg>
    </div>
  );
}

export function FundoTopo() {
  const w = 1440;
  const h = 760;
  return (
    <div className="fundo fundo--topo" aria-hidden="true">
      {CAMADAS.map((c) => {
        const perto = c.chave === "perto";
        return (
          <svg
            key={c.chave}
            className={`topo-camada topo-camada--${c.chave}`}
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: c.cotas }, (_, n) => {
              /* A cada cinco curvas vem a linha mestra, mais grossa. É a
                 convenção da carta topográfica e é o que dá leitura ao campo. */
              const eMestra = n % 5 === 0;
              return (
                <path
                  key={n}
                  d={curvaNivel(n, w, h, c)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={eMestra ? c.mestra : c.traco}
                  opacity={eMestra ? c.opacMestra : c.opac}
                  /* Só a carta da frente é plotada curva a curva; a de trás
                     apenas clareia inteira. Duas razões: ela é o terreno que já
                     estava lá antes de alguém desenhar por cima, e riscar 38
                     traços ao mesmo tempo repinta o SVG inteiro a cada quadro
                     — dentro da janela de LCP do herói, justamente. */
                  className={perto ? "topo-curva" : undefined}
                  /* `pathLength="1"` normaliza o comprimento: o traço de cada
                     curva passa a ser medido de 0 a 1 independentemente do
                     tamanho real, e uma única regra de CSS serve para todas. */
                  pathLength={1}
                  /* O atraso escalonado é o que faz a carta parecer desenhada
                     por um plotter, curva após curva, em vez de tudo aparecendo
                     junto. As mestras entram primeiro: são elas que dão a
                     leitura. */
                  style={
                    perto
                      ? {
                          animationDelay: `${(eMestra ? n * 0.05 : 0.28 + n * 0.055).toFixed(2)}s`,
                        }
                      : undefined
                  }
                />
              );
            })}

            {/* Marcos nas duas cartas. Os de trás herdam de graça a cor puxada
                para o fundo e o desfoque da camada, e por cima disso o `recuo`
                os encolhe e apaga uns em relação aos outros — daí a leitura de
                três distâncias dentro da mesma névoa. */}
            {c.marcos.map((m, i) => {
              const cx = m.t * w;
              const cy = cota(m.t, m.nivel, h, c);
              const escala = 1 - m.recuo * 0.4;
              const r = c.marcoRaio * escala;
              const op = c.marcoOpac * (1 - m.recuo * 0.45);
              const rota = c.marcoRota ? `tpRota${c.chave}${i}` : null;
              return (
                /* Dois grupos, e não um: a entrada anima `transform` e o
                   percurso anima `translate`. São propriedades separadas e o
                   navegador compõe as duas — mas duas animações no mesmo
                   elemento exigiriam uma lista só, e a lista do percurso vem de
                   variáveis. Um grupo para cada uma resolve sem acrobacia. */
                <g
                  key={`${m.t}-${m.nivel}`}
                  className="topo-marco"
                  /* Entram depois da própria carta estar pronta — a de trás
                     clareia antes, então os dela vêm antes também. Marco antes
                     da curva seria marco pousado no nada. */
                  style={{
                    animationDelay: `${(c.marcoAtraso + m.recuo * 0.45).toFixed(2)}s`,
                  }}
                >
                  <g
                    className={rota ? "topo-marco-rota" : undefined}
                    /* Nome e duração vão por variável, e não por `animation`
                       direto, porque quem liga a animação é a media query de
                       movimento reduzido. Estilo em linha ligando `animation`
                       venceria a media query e o percurso rodaria mesmo com
                       movimento desligado.

                       Sem atraso: cada percurso já começa girado para a cota em
                       que o marco foi desenhado, e um atraso negativo em cima
                       disso arrancaria o marco do lugar no primeiro quadro. Os
                       três se desencontram pelas durações, que são diferentes. */
                    style={
                      rota
                        ? ({
                            "--tp-rota": rota,
                            "--tp-volta": `${m.volta ?? 60}s`,
                          } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <path
                      d={hexagono(cx, cy, r)}
                      fill="none"
                      stroke="currentColor"
                      /* O traço encolhe junto com o hexágono: hexágono menor com
                         traço da mesma espessura lê como símbolo diferente, não
                         como o mesmo símbolo mais longe. */
                      strokeWidth={1.1 * escala}
                      opacity={op}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={1.6 * escala}
                      fill="currentColor"
                      opacity={op * 1.45}
                    />
                  </g>
                </g>
              );
            })}
          </svg>
        );
      })}

      {/* Os quadros dos percursos. Vão em `<style>` porque os destinos são
          valores exatos de `cota()` — nenhuma folha de estilo estática poderia
          conhecê-los, e é o mesmo cálculo determinístico do resto do arquivo:
          o servidor e o cliente escrevem a mesma regra. */}
      <style
        dangerouslySetInnerHTML={{
          __html: CAMADAS.filter((c) => c.marcoRota)
            .flatMap((c) =>
              c.marcos.map((m, i) => quadrosRota(`tpRota${c.chave}${i}`, m, c, h)),
            )
            .join(""),
        }}
      />

      <div className="topo-luz" />
      {/* A lanterna do ponteiro. Fica acima das cartas e abaixo do grão: luz é
          da cena, grão é da lente. */}
      <div className="topo-lente" />
      <GraoFilme />
      <SeguirPonteiro />
    </div>
  );
}
