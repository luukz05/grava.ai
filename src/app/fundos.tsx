/* Fundo do herói — topográfico.

   Este arquivo já teve dez fundos em comparação (entalhe, pontilhado,
   blueprint, hexágonos, dot grid, aurora, malha, feixes e grade). A decisão
   ficou no topográfico e o resto saiu: código de opção que ninguém mais pode
   escolher só faz o próximo leitor perguntar qual está em uso. Os outros nove
   estão no commit `f5b1214`.

   Curvas de nível de um terreno gerado por soma de senos. Cada curva é uma
   linha fechada e a distância entre elas conta a inclinação — perto quer dizer
   íngreme, como num mapa de verdade. Determinístico: mesmo desenho no servidor
   e no cliente, sem random e sem JavaScript de runtime. */

export type Fundo = "topo";

function curvaNivel(nivel: number, largura: number, altura: number) {
  const passo = 8;
  const pontos: string[] = [];
  for (let x = 0; x <= largura; x += passo) {
    const t = x / largura;
    const y =
      altura * 0.5 +
      Math.sin(t * 6.1 + nivel * 0.42) * altura * 0.17 +
      Math.sin(t * 13.7 - nivel * 0.31) * altura * 0.07 +
      Math.cos(t * 3.3 + nivel * 0.9) * altura * 0.1 +
      (nivel - 7) * altura * 0.055;
    pontos.push(`${x.toFixed(0)},${y.toFixed(1)}`);
  }
  return `M${pontos.join("L")}`;
}

export function FundoTopo() {
  const w = 1440;
  const h = 760;
  const niveis = Array.from({ length: 15 }, (_, i) => i);
  return (
    <div className="fundo fundo--topo" aria-hidden="true">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
        {niveis.map((n) => (
          <path
            key={n}
            d={curvaNivel(n, w, h)}
            fill="none"
            stroke="currentColor"
            /* A cada cinco curvas vem a linha mestra, mais grossa. É a
               convenção da carta topográfica e é o que dá leitura ao campo. */
            strokeWidth={n % 5 === 0 ? 1.6 : 0.9}
            opacity={n % 5 === 0 ? 0.34 : 0.16}
            className="topo-curva"
            /* `pathLength="1"` normaliza o comprimento: o traço de cada curva
               passa a ser medido de 0 a 1 independentemente do tamanho real,
               e uma única regra de CSS serve para as quinze. */
            pathLength={1}
            /* O atraso escalonado é o que faz a carta parecer desenhada por um
               plotter, curva após curva, em vez de tudo aparecendo junto.
               As mestras entram primeiro: são elas que dão a leitura. */
            style={{ animationDelay: `${(n % 5 === 0 ? n * 0.05 : 0.28 + n * 0.055).toFixed(2)}s` }}
          />
        ))}
      </svg>
      <div className="topo-luz" />
    </div>
  );
}
