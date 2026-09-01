/* GRAVA.AI — institucional · arte dos três estados.
   O `CONTENT.md` pede um slot de "geração da arte: estado indo a estado", e a
   landing não o resolveu. Aqui ele existe como três chapas do mesmo campo de
   glifos: dispersão, formação e marca gravada. Mesma rampa e mesma marca da
   `AsciiWaveHeader` — importadas, não recriadas, para os dois materiais não
   divergirem.

   Tudo determinístico: o mesmo desenho no servidor e no cliente. Nenhum
   `Math.random`, nenhum valor declarado, nenhum número inventado. */

import { RAMP, inMark } from "../assets";

const COLS = 20;
const ROWS = 13;
const CW = 13;
const CH = 13;

/* Ruído estável por célula: hash do par (col,row), sempre o mesmo resultado.
   É o que dá grão de dispersão sem sortear nada em tempo de render. */
function noise(col: number, row: number) {
  const s = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export type Estado = 0 | 1 | 2;

const LEGENDA: Record<Estado, string> = {
  0: "Campo disperso: a ideia antes de ter forma.",
  1: "O campo se organiza em torno da marca: a IA compondo a arte.",
  2: "Marca cheia e gravada: o produto que o cliente leva.",
};

/* Uma chapa por estado. O que muda entre elas é só quanto do campo já
   obedece à marca — de 0 (nada) a 1 (tudo). O resto do desenho é o mesmo,
   e é isso que faz as três lerem como um processo e não como três imagens. */
export function AsciiEstado({ estado }: { estado: Estado }) {
  const w = COLS * CW + 24;
  const h = ROWS * CH + 34;

  /* quanto a marca já emergiu */
  const forma = estado / 2;

  const mcx = (COLS - 1) / 2;
  const mcy = (ROWS - 1) / 2;
  const mr = 5.6;

  const cells: React.ReactElement[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const ox = row % 2 ? CW / 2 : 0;
      const x = 12 + col * CW + ox;
      const y = 20 + row * CH;

      const nx = (col - mcx + (row % 2 ? 0.5 : 0)) / mr;
      const ny = ((row - mcy) * (CH / CW)) / mr;
      const dentro = Math.hypot(nx, ny) < 1.3;
      const marca = dentro && inMark(nx, ny);

      /* Dispersão: forte no primeiro estado, quase nula no terceiro.
         Sobra alguma no último de propósito — campo perfeitamente limpo
         perde o material e vira logotipo. O piso de 0,42 existe porque o
         primeiro estado precisa ler como campo cheio de ruído; sem ele o
         hash sozinho deixava a chapa quase preta, e chapa vazia lê como
         imagem quebrada, não como ideia sem forma. */
      const grao = 0.42 + noise(col, row) * 0.58;
      const disperso = grao * (1 - forma * 0.82);

      /* A marca ganha peso conforme o estado avança; fora dela o campo perde
         peso na mesma medida. No primeiro estado o peso da marca é zero — a
         célula cai no glifo vazio e some. Marca visível já no passo da ideia
         contaria a história ao contrário. */
      const peso = marca ? (estado === 0 ? 0 : 0.55 + forma * 0.45) : disperso * 0.62;

      const idx = Math.max(0, Math.min(8, Math.round(peso * 8)));
      const glifo = RAMP[idx];
      if (glifo === " ") continue;

      const acesa = marca && forma > 0.4;

      cells.push(
        <text
          key={`${col}-${row}`}
          x={x}
          y={y}
          className={acesa ? "a-mark" : "a-cell"}
          fill={acesa ? "#9ddcff" : idx >= 5 ? "#3ba5e8" : "#2b566f"}
        >
          {glifo}
        </text>
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={LEGENDA[estado]}
      className="ascii"
    >
      <rect width={w} height={h} fill="#070c11" />
      <g fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="12" textAnchor="middle">
        {cells}
      </g>
    </svg>
  );
}
