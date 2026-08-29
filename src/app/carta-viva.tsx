"use client";

/* A carta topográfica do herói, afinada para a marca.

   O shader mora em `topography.tsx` (componente do React Bits, vendorizado sem
   opinião nenhuma sobre esta página). Aqui ficam as duas coisas que são da
   GRAVA e não do shader: a paleta da marca e a regulagem dos parâmetros.

   Componente separado do `fundos.tsx` de propósito: WebGL exige `"use client"`,
   e o fundo é o resto da cena — degradê, luz, grão — que continua sendo HTML
   servido pronto. Assim só o canvas paga hidratação. */

import { useCallback, useEffect, useRef } from "react";
import Topography, { type Amostrador } from "./topography";

/* As três cores são faixas de elevação: `baixa` é o vale, `media` é o traço
   dominante (o azul da marca), `alta` é a crista, que clareia até quase
   branco-azulado — sobre breu o que salta é luz.

   Aqui existia um segundo conjunto de cores para um tema claro, escolhido em
   tempo de execução. O site é dark-only: a paleta é constante e o canvas não
   observa mais nada. */
const PALETA = { baixa: "#0e2f4a", media: "#3ba5e8", alta: "#a9e2ff" } as const;

/* O botão de volume do fundo: névoa atrás da manchete, não desenho competindo
   com ela. */
const OPACIDADE = 0.62;

/* ---------- os marcos cotados ----------

   Numa carta de verdade, ponto cotado é um símbolo posto SOBRE a curva, com a
   altura escrita ao lado — é o que prende o desenho ao terreno real. Aqui o
   símbolo é o hexágono da marca, e é o único lugar em que a identidade entra no
   fundo sem virar logo carimbado.

   O ponto todo é o "sobre". Hexágono flutuando ao lado da linha lê como erro de
   registro, não como marco — e com o terreno em WebGL não existe mais um
   caminho de SVG para consultar. Então cada marco resolve, a cada quadro, onde
   está a curva dele: fixa a coluna `t`, fixa o nível `k` (a curva é o lugar
   onde a elevação vale exatamente `k`) e procura o `y` que satisfaz isso.

   NEWTON, NÃO VARREDURA. O terreno anda pouco entre um quadro e o outro, então
   a resposta de agora está a poucos pixels da de antes: três passos de Newton
   partindo dali fecham a conta em quatro leituras do campo. Varrer a coluna
   inteira custaria cento e tantas, sessenta vezes por segundo, vezes cinco
   marcos. A varredura existe, mas só como reaquisição — quando a curva sobe
   demais, desce demais ou simplesmente deixa de existir naquela coluna, o marco
   procura a curva mais próxima e adota o nível dela.

   É essa reaquisição que dá o gesto: o marco não desliza pela carta, ele fica
   agarrado a uma cota até ela sumir debaixo dele, e então troca. O salto ocorre
   quando o terreno manda, não num relógio — que é exatamente o que a versão em
   SVG simulava com quadros de CSS calculados no servidor.

   A MARGEM é o que mantém o salto pequeno. Sem ela, um marco acompanha a curva
   até ela sair pela borda e só então reachar — e a curva mais próxima do lugar
   onde ele estava pode estar do outro lado da tela. Medido: teleporte de 230px
   num quadro. Reagindo antes, na margem de 8%, ele troca sempre para uma curva
   vizinha; em dois minutos simulados dá salto mediano de 42px e máximo de 135,
   que é a mesma ordem de grandeza da versão em SVG.

   E os números que importam, do mesmo teste: nenhum marco perdido, nenhum fora
   da caixa, e desvio máximo da curva de 0,0092 em unidades de banda — abaixo da
   espessura do traço (0,012). O hexágono nunca desencosta da linha. */

type Marco = {
  /* Fração horizontal. Longe da mancha da manchete e do painel do herói. */
  t: number;
  /* Onde ele prefere estar na vertical quando precisa reachar uma curva. */
  alvo: number;
  /* Distância dentro da camada, de 0 a 1: encolhe o hexágono e apaga o traço.
     É o recuo que faz cinco marcos descreverem uma sequência que se afasta, em
     vez de cinco adesivos do mesmo tamanho espalhados. */
  recuo: number;
};

const MARCOS: Marco[] = [
  { t: 0.07, alvo: 0.3, recuo: 0 },
  { t: 0.19, alvo: 0.62, recuo: 0.25 },
  { t: 0.71, alvo: 0.72, recuo: 0 },
  { t: 0.82, alvo: 0.18, recuo: 0.1 },
  { t: 0.93, alvo: 0.42, recuo: 0.35 },
];

/* Raio do hexágono sem recuo, em pixels de tela. */
const RAIO = 8;
const OPACO = 0.34;

/* Quanto Newton pode andar num passo. Sem o limite, uma derivada quase nula
   perto de um cume atira o marco para fora da tela num quadro só. */
const PASSO_MAX = 60;

/* A faixa em que os marcos vivem, medida das bordas de cima e de baixo. Fora
   dela o marco troca de curva em vez de continuar seguindo a que está saindo. */
const MARGEM = 0.08;

/* -30° põe um vértice no topo: é a orientação do hexágono da marca, e um
   hexágono na orientação errada lê como outro símbolo. */
function hexagono(cx: number, cy: number, r: number) {
  const pontos = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pontos.join("L")}Z`;
}

/* Varre a coluna, dentro da margem, e devolve a curva de nível mais próxima de
   `desejado`. Uma curva foi cruzada entre duas amostras sempre que existe um
   inteiro entre os dois valores de elevação; o `y` exato sai por interpolação
   linear, que a esta resolução erra menos que a espessura do traço. */
function reachar(f: (y: number) => number, altura: number, desejado: number) {
  const yMin = altura * MARGEM;
  const yMax = altura * (1 - MARGEM);
  const passo = 7;
  let melhor: { y: number; k: number } | null = null;
  let ya = yMin;
  let fa = f(yMin);
  for (let yb = yMin + passo; yb <= yMax; yb += passo) {
    const fb = f(yb);
    const lo = Math.min(fa, fb);
    const hi = Math.max(fa, fb);
    for (let k = Math.ceil(lo); k <= Math.floor(hi); k++) {
      const y = fb === fa ? ya : ya + ((k - fa) / (fb - fa)) * (yb - ya);
      if (!melhor || Math.abs(y - desejado) < Math.abs(melhor.y - desejado)) {
        melhor = { y, k };
      }
    }
    ya = yb;
    fa = fb;
  }
  return melhor;
}

/* Persegue a curva de nível `k` a partir de `y0`. Devolve `null` quando ela não
   está mais ao alcance — aí quem chamou reachar. */
function perseguir(f: (y: number) => number, y0: number, k: number, altura: number) {
  let y = y0;
  for (let i = 0; i < 4; i++) {
    const g = f(y) - k;
    if (Math.abs(g) < 0.0008) return y;
    /* Derivada por diferença central. O passo de 1,5px é maior que o ruído do
       campo e menor que a distância entre duas curvas. */
    const h = 1.5;
    const d = (f(y + h) - f(y - h)) / (2 * h);
    if (Math.abs(d) < 1e-6) return null;
    y -= Math.max(-PASSO_MAX, Math.min(PASSO_MAX, g / d));
    if (y < -60 || y > altura + 60) return null;
  }
  /* A tolerância final é mais folgada que a de parada, mas ainda menor que a
     espessura do traço: melhor um marco meio pixel fora da curva por um quadro
     que um marco saltando porque a convergência não fechou na quarta volta. */
  return Math.abs(f(y) - k) < 0.004 ? y : null;
}

/* A superfície dos marcos. Vive dentro da mesma caixa do canvas para que o
   sistema de coordenadas seja o mesmo — e para herdar de graça a máscara de
   saída e o parallax que já estão naquela caixa. */
function MarcosCotados({ registrar }: { registrar: (fn: (a: Amostrador) => void) => void }) {
  const caixaRef = useRef<HTMLDivElement>(null);
  const alvosRef = useRef<(HTMLDivElement | null)[]>([]);
  const alturaRef = useRef(0);
  /* Fora do React: isto muda sessenta vezes por segundo e ninguém re-renderiza
     por causa disso. */
  const estados = useRef(MARCOS.map(() => ({ y: NaN, k: NaN })));

  const aoQuadro = useCallback((amostrar: Amostrador) => {
    const altura = alturaRef.current;
    if (!altura) return;

    for (let i = 0; i < MARCOS.length; i++) {
      const el = alvosRef.current[i];
      if (!el) continue;
      const m = MARCOS[i];
      /* O `v` do amostrador conta de baixo para cima; o `y` do DOM, de cima
         para baixo. A conversão mora aqui, num lugar só. */
      const f = (y: number) => amostrar(m.t, 1 - y / altura);
      const st = estados.current[i];
      const yMin = altura * MARGEM;
      const yMax = altura * (1 - MARGEM);

      let y = Number.isFinite(st.y) ? perseguir(f, st.y, st.k, altura) : null;
      /* Perdeu a curva, ou ela chegou na margem: troca de cota. O destino é o
         cruzamento mais próximo de onde o marco está agora — é isso que faz a
         troca ser para uma curva VIZINHA, e não para a mais próxima de um lugar
         de preferência que pode estar do outro lado da tela. */
      if (y === null || y < yMin || y > yMax) {
        const desejado = Number.isFinite(st.y)
          ? Math.max(yMin, Math.min(yMax, st.y))
          : m.alvo * altura;
        const achado = reachar(f, altura, desejado);
        if (!achado) {
          /* Coluna sem nenhuma curva dentro da margem. Não acontece com os
             parâmetros atuais — nem uma vez em dois minutos simulados — mas
             marco pousado no nada é pior que marco ausente. */
          el.style.opacity = "0";
          continue;
        }
        y = achado.y;
        st.k = achado.k;
      }

      st.y = y;
      /* A opacidade vai no ponto e não no símbolo porque é o símbolo que carrega
         a animação de entrada, e animação vence estilo em linha. */
      el.style.opacity = "";
      el.style.translate = `0 ${y.toFixed(1)}px`;
    }
  }, []);

  useEffect(() => {
    registrar(aoQuadro);
    const caixa = caixaRef.current;
    if (!caixa) return;
    const ro = new ResizeObserver(() => {
      alturaRef.current = caixa.getBoundingClientRect().height;
    });
    ro.observe(caixa);
    alturaRef.current = caixa.getBoundingClientRect().height;
    return () => ro.disconnect();
  }, [registrar, aoQuadro]);

  return (
    <div className="topo-marcos" ref={caixaRef}>
      {MARCOS.map((m, i) => {
        const escala = 1 - m.recuo * 0.4;
        const r = RAIO * escala;
        const lado = Math.ceil(2 * r + 4);
        const op = OPACO * (1 - m.recuo * 0.45);
        return (
          <div
            key={m.t}
            ref={(el) => {
              alvosRef.current[i] = el;
            }}
            className="topo-marco"
            style={{ left: `${m.t * 100}%` }}
          >
            {/* Entram depois da carta já estar na tela — marco antes da curva
                seria marco pousado no nada. Os mais recuados entram por último,
                que é a mesma ordem em que a distância os organiza. */}
            <svg
              width={lado}
              height={lado}
              viewBox={`0 0 ${lado} ${lado}`}
              style={{ animationDelay: `${(1.1 + m.recuo * 0.45).toFixed(2)}s` }}
            >
              <path
                d={hexagono(lado / 2, lado / 2, r)}
                fill="none"
                stroke="currentColor"
                /* O traço encolhe junto com o hexágono: hexágono menor com traço
                   da mesma espessura lê como símbolo diferente, não como o mesmo
                   símbolo mais longe. */
                strokeWidth={1.1 * escala}
                opacity={op}
              />
              <circle
                cx={lado / 2}
                cy={lado / 2}
                r={1.6 * escala}
                fill="currentColor"
                opacity={op * 1.45}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/* `marcos` existe por causa do fechamento da página, que usa a mesma carta sem
   as cotas: elas são legenda de terreno e, repetidas no rodapé, viram enfeite —
   a mesma piada contada duas vezes na mesma página. Ver `FundoFecho` em
   `fundos.tsx`.

   Padrão `true` para o herói, que é quem tinha o comportamento antes de este
   parâmetro existir: acrescentar opção não deve mudar quem já estava lá. */
export function CartaViva({ marcos = true }: { marcos?: boolean } = {}) {
  /* O canvas entrega o campo, os marcos consomem. A ponte é uma ref porque
     `aoQuadro` é chamado de dentro do laço de render: passar a função por
     estado faria o React re-renderizar a árvore inteira a cada quadro. */
  const ouvinte = useRef<((a: Amostrador) => void) | null>(null);
  const registrar = useCallback((fn: (a: Amostrador) => void) => {
    ouvinte.current = fn;
  }, []);
  const aoQuadro = useCallback((amostrar: Amostrador) => {
    ouvinte.current?.(amostrar);
  }, []);

  return (
    <>
      <Topography
        aoQuadro={aoQuadro}
        lowColor={PALETA.baixa}
        midColor={PALETA.media}
        highColor={PALETA.alta}
        /* Devagar. Este terreno fica atrás da manchete e do CTA principal da
           página: ele tem que se mexer o bastante para não parecer um PNG, e
           pouco o bastante para ninguém olhar para ele. */
        speed={0.22}
        morphAmount={2.6}
        morphSpeed={0.055}
        /* Densidade das isolinhas. Bem acima do padrão do componente (2.0)
           porque a carta anterior tinha quinze cotas na altura do herói — com
           poucas bandas o desenho lê como onda, não como terreno cotado. */
        bands={3.4}
        thickness={0.012}
        scale={1.05}
        glow={0.34}
        colorMode="elevation"
        contrast={2.6}
        brightness={1}
        opacity={OPACIDADE}
        /* O grão da cena é o `feTurbulence` do `fundos.tsx`, e ele fica parado
           enquanto o terreno se move — filme está na lente, não no terreno. O
           grão do shader anda junto com o campo e desfaria essa leitura. */
        grain={false}
        /* O cursor já tem gesto próprio aqui: a lanterna do `SeguirPonteiro`.
           Um segundo efeito de cursor, levantando o relevo por baixo do
           primeiro, seriam duas respostas ao mesmo movimento. E o `.fundo`
           inteiro é `pointer-events: none` — o canvas nem receberia o evento. */
        mouseInteraction={false}
      />
      {marcos ? <MarcosCotados registrar={registrar} /> : null}
    </>
  );
}
