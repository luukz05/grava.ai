/* AS CURVAS SÃO AS DO SISTEMA, NÃO AS DO GSAP

   O `v5.css` define duas curvas para a página inteira (`--e-ui` e `--e-mola`)
   e o `gravidade.css` define mais duas (`--e-mola-solta`, `--e-luz`). Usar
   `power2.out` e `back.out(1.7)` nas cenas colocaria uma QUINTA e uma SEXTA
   gramática de movimento na mesma marca: o visitante desce do herói (mola do
   sistema) para a seção (mola do GSAP) e o material muda de física no meio da
   página sem que nada tenha mudado.

   O GSAP aceita ease como FUNÇÃO, então as mesmas curvas são desenhadas aqui
   direto da definição — sem somar o `CustomEase` ao pacote e sem copiar tabela
   de amostras que sai de sincronia no dia em que o token mudar.

   Este arquivo existe porque agora são DUAS cenas na mesma página (`centro` e
   `pilares`). Duas cópias das mesmas quatro curvas é o começo de duas físicas
   diferentes: basta alguém ajustar o amortecimento num arquivo. */

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
export const E_UI = bezier(0.32, 0.72, 0, 1);

/* --e-luz: a curva das OPACIDADES. Com a `--e-ui` uma fusão passa de 80% nos
   primeiros 25% do tempo, e o olho não lê isso como fusão, lê como piscada.
   O mesmo raciocínio está escrito no `gravidade.css`. */
export const E_LUZ = bezier(0.35, 0, 0.3, 1);

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
   centro, a marca tomando o meio da cena. Passar do ponto num deslocamento
   longo lê como derrapagem, não como vida. */
export const E_MOLA = mola(1, 0.34);

/* Solta (ζ = 0,62 · 0,42s): o mesmo afrouxamento que o `gravidade.css` usa.
   É de quem CHEGA — o balão da ideia, o pilar, a peça que pousa na órbita. O
   excesso de ~8% é o que diferencia "apareceu" de "foi desenhado", e só coisa
   pequena pode se dar a esse luxo: num bloco grande o mesmo excesso vira
   tremor. */
export const E_MOLA_SOLTA = mola(0.62, 0.42, 2.8);
