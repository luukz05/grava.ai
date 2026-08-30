"use client";

/* O CENTRO — a frase da marca dita em movimento.

   ───────────────────────────────────────────────────────────────────────────
   O QUE ISTO SUBSTITUI, E POR QUÊ

   A página da marca dizia a mesma coisa três vezes, em três seções seguidas e
   em três gramáticas diferentes:

   — `#marca` afirmava o credo num parágrafo de citação ("coloca o cliente no
     centro da criação…");
   — `#produto` desenhava os três passos (a ideia, a personalização, o produto)
     em três cartões parados;
   — `#pilares` listava os três pilares em três células.

   Afirmar, ilustrar e listar. O credo dizia que o cliente está no centro, e a
   página inteira era lida sem que nada nunca ficasse no centro de coisa
   alguma: os três passos eram uma fileira da esquerda para a direita, que é
   exatamente a forma de uma esteira — o oposto do que a frase promete.

   Aqui é uma coisa só: o texto rola à esquerda, e à direita um desenho em que
   o cliente está NO CENTRO e o percurso acontece EM VOLTA dele, andando
   conforme a página desce.

   ───────────────────────────────────────────────────────────────────────────
   A ROLAGEM É LIVRE. ISTO NÃO PRENDE A PÁGINA.

   Esta seção já foi um palco preso (`pin` do ScrollTrigger, cena sangrada na
   tela inteira, texto trocando por opacidade dentro dela) e foi refeita: a
   rolagem VOLTOU A SER DA PESSOA.

   Prender a página cobra um preço que este conteúdo não paga. Quem já sabe o
   que a marca faz não consegue passar direto; quem quer reler o passo anterior
   tem que rolar para trás pela cena inteira; quem chega de celular perde a
   noção de quanto falta. Um herói de produto pode cobrar isso porque a cena É
   o argumento. Aqui a cena ILUSTRA o argumento, e ilustração não sequestra
   quem está lendo.

   O que ficou:

   — ESQUERDA: cinco blocos de texto, um por tópico, em fluxo normal. Rolam
     como qualquer texto da página, dá para varrer, voltar e pular.
   — DIREITA: o desenho, `position: sticky`. Ele acompanha a leitura sem travar
     nada — a página nunca deixa de responder à rolagem.
   — A LINHA DO TEMPO é raspada (`scrub`) pela posição da coluna de texto. Sem
     relógio: descer avança, subir desfaz, parar congela.

   As batidas são IGUALMENTE ESPAÇADAS na linha do tempo (`i * T_BATIDA`) e os
   blocos têm a mesma altura mínima. É essa dupla igualdade que faz o passo 03
   estar desenhando quando o texto do passo 03 está no meio da tela — sem um
   único gatilho por bloco para amarrar as duas coisas.

   ───────────────────────────────────────────────────────────────────────────
   A GEOMETRIA É A FRASE

   Um hexágono (o da marca) com seis vértices. Os TRÊS ALTERNADOS de cima
   recebem os passos, os outros três recebem os pilares — o mesmo polígono
   sustenta as duas coisas, que é literalmente o que a palavra "pilar" pede.

   O anel que liga os três passos é a IA: ele não existe no início, é desenhado
   passo a passo, e quem o desenha é uma cabeça que percorre a circunferência.
   Não é enfeite — é a resposta desenhada para "quem conduz": a linha entre um
   passo e o outro é ela.

   Os raios ligam cada nó ao meio. Sem eles o desenho é um anel com três
   marcações; com eles é uma coisa girando EM TORNO de alguém, que é a frase.

   O cliente fica parado no meio o tempo inteiro. Ele é a única coisa da cena
   que nunca se move, e é isso que a cena precisa dizer.

   ───────────────────────────────────────────────────────────────────────────
   O FUNDO É PRETO E LUZ

   A cena já teve as chapas de glifos de `art.tsx` atrás (o material
   "data-as-texture" da página). Saíram: hexágono, anel, raios, nós e legenda
   já são cinco camadas, e uma sexta feita de dado falso é ruído com cara de
   informação. Ficou a aura — que não desenha nada, só diz onde é o centro.

   `art.tsx` continua no repositório, sem referência. */

import { useEffect, useRef } from "react";
import {
  Marca,
  IcoInovacao,
  IcoExperiencia,
  IcoRentabilidade,
} from "../icons";

/* ───────────────────────────────────────────────────────────────────────────
   A GEOMETRIA

   Tudo em coordenadas de 0 a 100 dentro de uma caixa quadrada: o mesmo número
   serve para o `viewBox` do traçado e para o `left/top` em porcentagem dos
   nós, que são HTML e não SVG — texto de nó precisa herdar a tipografia da
   página, e `<text>` em SVG não herda quebra de linha nenhuma.

   `R_ANEL` menor que `R_HEX` de propósito: os passos ficam num anel interno e
   os pilares nos vértices do hexágono, um degrau atrás. Assim o olho lê duas
   camadas — o que acontece e o que sustenta — sem precisar de legenda. */
const R_ANEL = 30;
const R_HEX = 42;

const rad = (a: number) => (a * Math.PI) / 180;
const px = (a: number, r: number) => 50 + r * Math.cos(rad(a));
const py = (a: number, r: number) => 50 + r * Math.sin(rad(a));
/* Três casas: o valor entra numa string de `d` e numa de `style`, e o React
   compara a marcação do servidor com a do cliente caractere a caractere. */
const n3 = (v: number) => v.toFixed(3);

/* Os seis vértices do hexágono, a partir do topo. Ímpares são os passos,
   pares são os pilares — daí a alternância de 60 em 60 graus. */
const VERTICES = [-90, -30, 30, 90, 150, 210];

const D_HEX =
  VERTICES.map(
    (a, i) => `${i === 0 ? "M" : "L"}${n3(px(a, R_HEX))} ${n3(py(a, R_HEX))}`
  ).join(" ") + " Z";

/* O anel em TRÊS ARCOS e não num `<circle>`: com `pathLength={3}` cada arco
   vale exatamente 1, então o `stroke-dashoffset` conta passos em vez de
   contar comprimento. Desenhar de 3 até 0 é desenhar um trecho por batida,
   sem nenhuma conta de circunferência no meio.

   Varredura 1 (horário) e arco menor (0): cada trecho tem 120°. */
const D_ANEL =
  `M${n3(px(-90, R_ANEL))} ${n3(py(-90, R_ANEL))} ` +
  [30, 150, 270]
    .map(
      (a) =>
        `A${R_ANEL} ${R_ANEL} 0 0 1 ${n3(px(a, R_ANEL))} ${n3(py(a, R_ANEL))}`
    )
    .join(" ");

/* O RASTRO é o mesmo caminho do anel com um traço curto correndo por cima. O
   comprimento dele está aqui em cima porque a conta do `stroke-dashoffset`
   depende dele: com `dasharray: RASTRO 3` e offset `RASTRO − t`, o traço fica
   sempre terminando exatamente onde a cabeça está — ver `desenhar()`. */
const RASTRO = 0.34;

/* Quanto tempo de linha do tempo cabe em cada batida. Todas iguais, e é isso
   que as amarra aos blocos de texto: cinco blocos de mesma altura mínima
   dividem a rolagem em cinco fatias iguais, e cinco batidas de mesma duração
   dividem a linha do tempo do mesmo jeito. Uma batida "mais importante" que
   ganhasse tempo extra sairia de sincronia com o texto dela. */
const T_BATIDA = 3;

/* ───────────────────────────────────────────────────────────────────────────
   OS TRÊS PASSOS

   O texto de cada um vive na coluna da esquerda. Aqui fica só o par
   número + nome: o nó é o marcador do stepper, não o parágrafo. */
const PASSOS = [
  { id: "ideia", n: "01", nome: "A ideia", ang: -90 },
  { id: "personalizacao", n: "02", nome: "A personalização", ang: 30 },
  { id: "produto", n: "03", nome: "O produto", ang: 150 },
];

/* Os três pilares, nos vértices que sobraram. Mesmos nomes e mesmos ícones da
   seção `#pilares` logo abaixo — se um mudar lá, muda aqui junto. */
const PILARES = [
  { id: "inovacao", nome: "Inovação no processo", ang: 210, Ico: IcoInovacao },
  { id: "experiencia", nome: "Experiência imersiva", ang: -30, Ico: IcoExperiencia },
  { id: "rentabilidade", nome: "Rentabilidade real", ang: 90, Ico: IcoRentabilidade },
];

/* ───────────────────────────────────────────────────────────────────────────
   OS CINCO TÓPICOS

   Um bloco de texto e uma batida do desenho, com o mesmo nome. Nenhum texto
   aqui é fato novo: o credo é o da seção `#marca`, os três passos são os de
   `#produto` e o fecho é o apoio de `#pilares` — a seção reorganiza o que a
   página já afirmava, não acrescenta afirmação. */
type Topico = {
  id: string;
  batida: string;
  rotulo: string;
  titulo: string;
  texto: React.ReactNode;
};

const TOPICOS: Topico[] = [
  {
    id: "credo",
    batida: "credo",
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
    id: "p1",
    batida: "p1",
    rotulo: "Passo 01",
    titulo: "A ideia",
    texto: (
      <>
        No totem, o cliente escolhe ou gera a arte{" "}
        <mark>com Inteligência Artificial</mark>. Ele participa da criação em
        vez de escolher de um catálogo.
      </>
    ),
  },
  {
    id: "p2",
    batida: "p2",
    rotulo: "Passo 02",
    titulo: "A personalização",
    texto: (
      <>
        O produto é personalizado <mark>na hora</mark>, com qualidade
        padronizada. A personalização deixa de ser encomenda e vira criação.
      </>
    ),
  },
  {
    id: "p3",
    batida: "p3",
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
  {
    id: "pilares",
    batida: "pilares",
    rotulo: "O que sustenta",
    titulo: "Três pilares, juntos",
    texto: (
      <>
        Inovação, experiência e rentabilidade não são valores de parede:{" "}
        <mark>é o que precisa funcionar junto</mark> para o percurso existir.
      </>
    ),
  },
];

/* ───────────────────────────────────────────────────────────────────────────
   AS CURVAS SÃO AS DO SISTEMA, NÃO AS DO GSAP

   O `v5.css` define duas curvas para a página inteira (`--e-ui` e `--e-mola`)
   e o `gravidade.css` define mais duas (`--e-mola-solta`, `--e-luz`). Usar
   `power2.out` e `back.out(1.7)` aqui colocaria uma QUINTA e uma SEXTA
   gramática de movimento na mesma marca: o visitante desce do herói (mola do
   sistema) para esta seção (mola do GSAP) e o material muda de física no meio
   da página sem que nada tenha mudado.

   O GSAP aceita ease como FUNÇÃO, então as mesmas curvas são desenhadas aqui
   direto da definição — sem somar o `CustomEase` ao pacote e sem copiar tabela
   de amostras que sai de sincronia no dia em que o token mudar. */

/* Cubic-bézier do CSS: P0 (0,0), P1 (x1,y1), P2 (x2,y2), P3 (1,1). Como o CSS,
   resolve-se x por Newton-Raphson e devolve-se y — a curva é paramétrica, e
   ler y direto de `p` daria uma curva parecida mas errada, com o erro maior
   justamente nas mais assimétricas, que são as que valem a pena. */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const C = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) =>
    ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const inclina = (t: number, a: number, b: number) =>
    3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);

  return (p: number) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let t = p;
    for (let i = 0; i < 6; i++) {
      const d = inclina(t, x1, x2);
      if (d === 0) break;
      t -= (calc(t, x1, x2) - p) / d;
    }
    return calc(t, y1, y2);
  };
}

/* --e-ui: a saída padrão da página. Sai rápido e chega devagar, sem passar do
   ponto. É a curva de tudo que responde — traço sendo desenhado, bloco que
   recua, eco que se abre. */
const E_UI = bezier(0.32, 0.72, 0, 1);

/* --e-luz: a curva das OPACIDADES. Com a `--e-ui` uma fusão passa de 80% nos
   primeiros 25% do tempo, e o olho não lê isso como fusão, lê como piscada.
   O mesmo raciocínio está escrito no `gravidade.css`. */
const E_LUZ = bezier(0.35, 0, 0.3, 1);

/* A MOLA, DA FÓRMULA.

   x(t) = 1 − e^(−ζωt)·(cos ω_d t + (ζω/ω_d)·sen ω_d t), com ω = 2π/resposta e
   ω_d = ω√(1−ζ²). Em ζ = 1 a expressão degenera no caso crítico,
   1 − (1 + ωt)·e^(−ωt), que é a mola padrão do `v5.css`.

   A normalização no fim (`/ f(total)`) existe porque a curva chega em 1
   assintoticamente: sem ela o tween pararia a um fio do valor final, e num
   `scrub` esse fio é permanente — a peça fica visivelmente fora de lugar
   enquanto a pessoa não rola mais nada. */
function mola(zeta: number, resposta: number, ciclos = 2.4) {
  const w = (2 * Math.PI) / resposta;
  const total = resposta * ciclos;
  const critica = zeta >= 1;
  const wd = critica ? 0 : w * Math.sqrt(1 - zeta * zeta);

  const f = (t: number) =>
    critica
      ? 1 - (1 + w * t) * Math.exp(-w * t)
      : 1 -
        Math.exp(-zeta * w * t) *
          (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t));

  const r = f(total);
  return (p: number) => f(p * total) / r;
}

/* Firme (ζ = 1,0 · 0,34s): chega e para. É de quem se posiciona — o cliente no
   centro, a cabeça andando de um nó ao outro. Passar do ponto num deslocamento
   longo lê como derrapagem, não como vida. */
const E_MOLA = mola(1, 0.34);

/* Solta (ζ = 0,62 · 0,42s): o mesmo afrouxamento que o `gravidade.css` usa.
   É de quem CHEGA — nó de passo, pilar. O excesso de ~8% é o que diferencia
   "apareceu" de "foi desenhado", e só coisa pequena pode se dar a esse luxo:
   num bloco grande o mesmo excesso vira tremor. */
const E_MOLA_SOLTA = mola(0.62, 0.42, 2.8);

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
             abaixo, o rastro, a cabeça, os ecos e o esmaecimento dos blocos
             que não estão sendo lidos. Sem ela — sem script ou com movimento
             reduzido — o desenho fica montado no estado final e os cinco
             blocos ficam todos legíveis. O LAYOUT É O MESMO NOS DOIS CASOS:
             desde que a rolagem deixou de ser presa, não há nada de estrutural
             para trocar. */
          no.classList.add("ctr-vivo");

          const cena = um<HTMLElement>(".ctr-cena");
          const aura = um<HTMLElement>(".ctr-aura");
          const hex = um<SVGPathElement>(".ctr-hex");
          const anel = um<SVGPathElement>(".ctr-anel");
          const rastro = um<SVGPathElement>(".ctr-rastro");
          const cabeca = um<SVGGElement>(".ctr-cabeca");
          const eu = um<HTMLElement>(".ctr-eu");
          const marca = um<HTMLElement>(".ctr-marca");
          const raios = q(".ctr-raio");
          const raiosPil = q(".ctr-raio-pilar");
          const ecos = q(".ctr-eco");
          const fecho = um<SVGCircleElement>(".ctr-fecho");
          const nos = q(".ctr-no");
          const pilares = q(".ctr-pilar");
          const blocos = q(".ctr-passo");
          const enches = q(".ctr-enche");

          /* Estado zero. Tudo que o desenho constrói nasce ausente aqui, e não
             no CSS: sem script a página mostra o desenho inteiro, e esconder
             pelo CSS apagaria justamente esse estado. */
          gsap.set([hex, anel, rastro], { strokeDashoffset: (i) => [6, 3, RASTRO][i] });
          gsap.set(hex, { opacity: 0.62 });
          gsap.set([...raios, ...raiosPil], { strokeDashoffset: 1 });
          gsap.set([...ecos, fecho], { opacity: 0, transformOrigin: "50% 50%" });
          gsap.set(cabeca, { autoAlpha: 0, scale: 0.5, transformOrigin: "50% 50%" });
          gsap.set(aura, { opacity: 0, scale: 0.82 });
          gsap.set(eu, { autoAlpha: 0, scale: 0.55 });
          gsap.set(marca, { autoAlpha: 0, y: 8 });
          gsap.set(nos, { autoAlpha: 0, scale: 0.68 });
          gsap.set(pilares, { autoAlpha: 0, scale: 0.8 });

          /* ─────────────────────────────────────────────────────────────────
             UM ESCALAR SÓ PARA O PERCURSO INTEIRO

             A cabeça da IA, o anel que ela desenha e o rastro que a segue são
             a MESMA coisa vista de três jeitos. Animá-los em três tweens
             paralelos é pedir que três curvas iguais continuem iguais para
             sempre: basta uma duração mudar num deles e a linha passa a nascer
             adiantada em relação a quem a desenha — e o efeito morre nesse fio
             de diferença.

             Aqui existe um número só, `avanco.t`, que vale 0 no primeiro nó e
             3 quando o anel fecha. Ele é a posição no percurso. */
          const avanco = { t: 0 };
          const desenhar = () => {
            const t = avanco.t;
            cabeca.setAttribute(
              "transform",
              `translate(${n3(px(-90 + t * 120, R_ANEL))} ${n3(
                py(-90 + t * 120, R_ANEL)
              )})`
            );
            /* `pathLength` é 3, então o offset é o que FALTA desenhar. */
            anel.style.strokeDashoffset = String(3 - t);
            /* O rastro tem `dasharray: RASTRO 3`: com este offset o traço curto
               termina exatamente em `t`, que é onde a cabeça está. Em t = 0 ele
               fica inteiro atrás do início do caminho, invisível — o rastro só
               existe depois que há percurso atrás dele. */
            rastro.style.strokeDashoffset = String(RASTRO - t);
          };
          desenhar();

          const pintarRegua = () => {
            const t = tl.time();
            enches.forEach((el, i) => {
              const p = (t - i * T_BATIDA) / T_BATIDA;
              el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
            });
          };

          /* ─────────────────────────────────────────────────────────────────
             O GATILHO

             `trigger` é a COLUNA DE TEXTO, não a seção: é a altura dela que
             define quanto o desenho tem para andar, e ela é quem carrega os
             cinco blocos de mesma altura mínima.

             `top center` → `bottom center`: a linha do tempo começa quando o
             primeiro bloco chega ao meio da tela e acaba quando o último sai
             dele. Com as batidas igualmente espaçadas, cada bloco fica no meio
             da tela durante a batida dele — sem um gatilho por bloco.

             NÃO EXISTE `pin`. A página nunca deixa de rolar; o desenho
             acompanha com `position: sticky`, que é trabalho do navegador e
             não custa quadro nenhum. */
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: um<HTMLElement>(".ctr-passos"),
              start: "top center",
              end: "bottom center",
              /* Raspagem folgada: o que continua andando depois que a pessoa
                 para é uma mola chegando ao repouso — que é exatamente o que
                 ela deveria estar fazendo. */
              scrub: 0.5,
              invalidateOnRefresh: true,
              /* A régua é pintada aqui, escrevendo `--p` direto no DOM. Sem
                 estado de React: são cinco elementos e um número por quadro, e
                 re-renderizar a árvore a 60Hz para mover uma barra de 2px é o
                 tipo de custo que se paga em travada de rolagem. */
              onUpdate: () => pintarRegua(),
            },
          });

          /* Batidas em posição ABSOLUTA na linha do tempo (`i * T_BATIDA`), e
             não relativa (`>+=0.4`). Relativa era o que a versão presa usava, e
             ali fazia sentido: a cena mandava no ritmo. Aqui quem manda é o
             texto, e o texto está dividido em blocos iguais. */
          const batida = (nome: string, i: number) =>
            tl.addLabel(nome, i * T_BATIDA);

          /* O eco de chegada: um anel que se abre e some no vértice em que a
             peça acabou de encaixar. É pontuação, não elemento do desenho. */
          const eco = (alvo: Element, quando: string, forca = 3.2) =>
            tl.fromTo(
              alvo,
              { scale: 0.45, opacity: 0.5 },
              { scale: forca, opacity: 0, duration: 1.2, ease: E_UI },
              quando
            );

          /* ── 1 · O CREDO ──
             O hexágono se risca, o desenho se acomoda de um respiro maior e o
             cliente aparece no meio. Nessa ordem e não ao contrário: o
             polígono é o lugar, e uma pessoa que aparece antes de o lugar
             existir não está no centro de nada. */
          batida("credo", 0);
          tl.fromTo(
            cena,
            { scale: 1.06 },
            { scale: 1, duration: 1.8, ease: E_MOLA },
            "credo"
          )
            .to(hex, { strokeDashoffset: 0, duration: 1.6, ease: E_UI }, "credo")
            .to(aura, { opacity: 0.55, scale: 1, duration: 1.5, ease: E_LUZ }, "credo+=0.2")
            .to(eu, { autoAlpha: 1, scale: 1, duration: 1.1, ease: E_MOLA }, "credo+=0.55")
            .to(marca, { autoAlpha: 1, y: 0, duration: 0.7, ease: E_LUZ }, "credo+=1");

          /* ── 2 · PASSO 01 ──
             O raio do centro ao primeiro nó é desenhado ANTES do nó: a linha
             sai do cliente, e é ela que traz o passo — não o contrário. A
             cabeça da IA acende parada; neste instante ela não está levando
             ninguém a lugar nenhum, está recebendo o que foi pedido. */
          batida("p1", 1);
          tl.to(raios[0], { strokeDashoffset: 0, duration: 0.9, ease: E_UI }, "p1")
            .to(nos[0], { autoAlpha: 1, scale: 1, duration: 1.1, ease: E_MOLA_SOLTA }, "p1+=0.35")
            .to(cabeca, { autoAlpha: 1, scale: 1, duration: 0.7, ease: E_MOLA_SOLTA }, "p1+=0.35");
          eco(ecos[0], "p1+=0.35");

          /* ── 3 · PASSO 02 ──
             A cabeça caminha do nó 01 ao 02 e o anel nasce atrás dela. É a
             única batida em que a linha entre dois passos é desenhada na frente
             de quem olha — e é ela que responde, sem texto, quem conduz o
             cliente de um ponto ao outro.

             O nó só chega depois de a cabeça encostar nele: a IA CHEGA e o
             passo acontece. Invertido, o passo já estaria lá esperando, e a
             linha viraria enfeite. */
          batida("p2", 2);
          tl.to(avanco, { t: 1, duration: 1.4, ease: E_MOLA, onUpdate: desenhar }, "p2")
            .to(raios[1], { strokeDashoffset: 0, duration: 0.9, ease: E_UI }, "p2+=0.8")
            .to(nos[1], { autoAlpha: 1, scale: 1, duration: 1.1, ease: E_MOLA_SOLTA }, "p2+=0.95");
          eco(ecos[1], "p2+=0.95");

          /* ── 4 · PASSO 03 ── mesmo gesto, segundo trecho. */
          batida("p3", 3);
          tl.to(avanco, { t: 2, duration: 1.4, ease: E_MOLA, onUpdate: desenhar }, "p3")
            .to(raios[2], { strokeDashoffset: 0, duration: 0.9, ease: E_UI }, "p3+=0.8")
            .to(nos[2], { autoAlpha: 1, scale: 1, duration: 1.1, ease: E_MOLA_SOLTA }, "p3+=0.95");
          eco(ecos[2], "p3+=0.95");

          /* ── 5 · OS PILARES ──
             O anel fecha voltando ao nó 01 — o percurso é um ciclo, não uma
             esteira — e os três pilares entram nos vértices que sobraram.

             Três coisas acontecem juntas, e as três dizem a mesma frase por
             meios diferentes:

             — o DESENHO RECUA (0,95). A câmera dá um passo atrás para caber o
               que sustenta o percurso, que é o assunto da batida.
             — os PASSOS RECUAM para 50% em vez de sumir: eles são o que os
               pilares sustentam, e apagá-los deixaria três nomes soltos num
               hexágono vazio.
             — o HEXÁGONO ACENDE. Ele foi estrutura apagada o tempo todo; na
               batida em que o assunto é a estrutura, passa a ser o traço mais
               claro do desenho. */
          batida("pilares", 4);
          tl.to(avanco, { t: 3, duration: 1.4, ease: E_MOLA, onUpdate: desenhar }, "pilares")
            .to(cena, { scale: 0.95, duration: 1.4, ease: E_MOLA }, "pilares+=0.5")
            .to(hex, { opacity: 1, strokeWidth: 0.46, duration: 1, ease: E_LUZ }, "pilares+=0.5")
            .to(nos, { opacity: 0.5, scale: 0.94, duration: 0.9, ease: E_UI }, "pilares+=0.6")
            .to(aura, { opacity: 0.8, duration: 1, ease: E_LUZ }, "pilares+=0.5")
            /* A cabeça encolhe para dentro do nó em que começou, em vez de
               apagar no lugar: ela chegou onde saiu, e é isso que fecha o
               ciclo. O eco no mesmo instante é o "encaixou". */
            .to(cabeca, { autoAlpha: 0, scale: 0.4, duration: 0.6, ease: E_LUZ }, "pilares+=1.2")
            .to(
              raiosPil,
              { strokeDashoffset: 0, duration: 1, ease: E_UI, stagger: 0.14 },
              "pilares+=0.9"
            )
            .to(
              pilares,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.2,
                ease: E_MOLA_SOLTA,
                stagger: 0.16,
              },
              "pilares+=1"
            );
          eco(fecho, "pilares+=1.2", 2.6);

          /* A última fatia precisa existir inteira na linha do tempo, senão a
             duração acaba no último tween e a quinta batida consome menos
             rolagem que as outras quatro — os blocos são iguais, as fatias
             também têm que ser. */
          tl.to({}, { duration: T_BATIDA }, 4 * T_BATIDA);

          pintarRegua();

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
      <div className="ctr-grade">
        {/* ---- O DESENHO, GRUDADO ----

            `position: sticky` e não `pin`: o navegador resolve, a rolagem
            continua sendo da pessoa e não existe espaçador nenhum mudando a
            altura do documento.

            VEM ANTES DO TEXTO NA MARCAÇÃO, e isso é de propósito: numa coluna
            só (celular) a `.ctr-grade` vira fluxo de bloco e a ordem do DOM é a
            ordem da tela — o desenho precisa estar em cima, com o texto passando
            por baixo dele. No desktop o `order` devolve o texto para a
            esquerda. Ninguém perde nada com essa inversão porque este bloco é
            `aria-hidden`: quem lê por leitor de tela recebe a lista de tópicos
            direto, sem um desenho decorativo na frente.

            A `.ctr-lado` existe para o `sticky` ter contra o que deslizar. Ela é
            o item da grade e estica com a linha inteira (altura da coluna de
            texto); a `.ctr-visual` dentro dela tem a altura do conteúdo, e a
            diferença entre as duas é exatamente o percurso do grude. Sem o
            invólucro, o elemento grudado teria a altura da própria caixa e não
            sobraria folga nenhuma — é o erro clássico deste layout. */}
        <div className="ctr-lado">
          <div className="ctr-visual" aria-hidden="true">
            <div className="ctr-cena">
              {/* A aura é o fundo do desenho: luz e só luz. Ela não desenha
                  nada, diz onde é o centro — e ganha força conforme o anel
                  fecha. */}
              <div className="ctr-aura" />

              <svg className="ctr-tracado" viewBox="0 0 100 100">
                {/* Os raios primeiro, no fundo da pilha: saem do centro e
                    passam por baixo de tudo. `pathLength={1}` para o
                    `stroke-dashoffset` ir de 1 (nada) a 0 (inteiro) sem
                    depender do comprimento real de cada um. */}
                {PASSOS.map((p) => (
                  <line
                    className="ctr-raio"
                    key={p.id}
                    x1="50"
                    y1="50"
                    x2={n3(px(p.ang, R_ANEL))}
                    y2={n3(py(p.ang, R_ANEL))}
                    pathLength={1}
                  />
                ))}
                {PILARES.map((p) => (
                  <line
                    className="ctr-raio-pilar"
                    key={p.id}
                    x1="50"
                    y1="50"
                    x2={n3(px(p.ang, R_HEX))}
                    y2={n3(py(p.ang, R_HEX))}
                    pathLength={1}
                  />
                ))}

                {/* `pathLength` normaliza os dois caminhos: 6 para o hexágono
                    (um por lado) e 3 para o anel (um por trecho entre passos).
                    Com isso o `stroke-dashoffset` conta LADOS e PASSOS, e não
                    unidades de comprimento que mudariam com o raio. */}
                <path className="ctr-hex" d={D_HEX} pathLength={6} />
                <path className="ctr-anel" d={D_ANEL} pathLength={3} />
                {/* O rastro é o mesmo caminho, com um traço curto e claro
                    correndo logo atrás da cabeça. É ele que faz a linha parecer
                    EMITIDA e não revelada: sem o rastro, anel e cabeça andam
                    juntos e o olho lê uma máscara passando por cima de algo que
                    já estava lá. */}
                <path className="ctr-rastro" d={D_ANEL} pathLength={3} />

                {/* Os ecos de chegada, um por vértice de passo, mais o do fecho
                    no primeiro nó — onde a cabeça termina a volta. */}
                {PASSOS.map((p) => (
                  <circle
                    className="ctr-eco"
                    key={p.id}
                    cx={n3(px(p.ang, R_ANEL))}
                    cy={n3(py(p.ang, R_ANEL))}
                    r="3"
                  />
                ))}
                <circle
                  className="ctr-fecho"
                  cx={n3(px(-90, R_ANEL))}
                  cy={n3(py(-90, R_ANEL))}
                  r="3"
                />

                {/* A cabeça da IA. O `transform` é escrito por `desenhar()`; o
                    desenho fica na origem para o `translate` ser a posição. */}
                <g className="ctr-cabeca">
                  <circle className="ctr-cabeca-halo" r="4.6" />
                  <circle className="ctr-cabeca-disco" r="2.9" />
                </g>
              </svg>

              {/* O CLIENTE, no meio. É o único elemento do desenho que não se
                  move: a frase da marca é essa, e o movimento em volta é o
                  argumento dela. */}
              <div className="ctr-eu">
                <span className="ctr-eu-glifo">
                  <IcoPessoa />
                </span>
                <span className="ctr-eu-rot mono">o cliente</span>
              </div>

              {/* A marca acima do centro. Ela assina o percurso, não é um ponto
                  dele. */}
              <span className="ctr-marca">
                <Marca />
              </span>

              {PASSOS.map((p) => (
                <div
                  className="ctr-no"
                  key={p.id}
                  style={{
                    left: `${n3(px(p.ang, R_ANEL))}%`,
                    top: `${n3(py(p.ang, R_ANEL))}%`,
                  }}
                >
                  <span className="ctr-no-n mono">{p.n}</span>
                  <span className="ctr-no-nome">{p.nome}</span>
                </div>
              ))}

              {PILARES.map(({ id, nome, ang, Ico }) => (
                <div
                  className="ctr-pilar"
                  key={id}
                  style={{
                    left: `${n3(px(ang, R_HEX))}%`,
                    top: `${n3(py(ang, R_HEX))}%`,
                  }}
                >
                  <span className="ctr-pilar-ico">
                    <Ico />
                  </span>
                  <span className="ctr-pilar-nome">{nome}</span>
                </div>
              ))}
            </div>

            {/* A régua. Cheio à esquerda é o que passou, vazio à direita é o
                que vem. O preenchimento é `scaleX(var(--p))`, escrito pelo
                `onUpdate` da linha do tempo — sem `animation` em CSS, que seria
                um segundo relógio medindo o mesmo intervalo. */}
            <div className="ctr-regua">
              {TOPICOS.map((t) => (
                <span className="ctr-seg" key={t.id}>
                  <i className="ctr-enche" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---- O TEXTO, ROLANDO ----

            Uma lista ordenada de verdade: os cinco tópicos têm ordem, e a
            ordem precisa existir na marcação e não só na tipografia. Para quem
            não vê o desenho, isto é a seção inteira — e continua completa. */}
        <ol className="ctr-passos">
          {TOPICOS.map((t) => (
            <li className="ctr-passo" key={t.id}>
              <div className="ctr-bloco">
                <span className="ctr-rot mono">{t.rotulo}</span>
                <h3 className="ctr-tit">{t.titulo}</h3>
                <p className="ctr-txt">{t.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
