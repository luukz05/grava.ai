/* GRAVA.AI — v5 alta fidelidade · arte ASCII.
   Direção: nada de radar sci-fi. O material da página é o glifo monoespaçado.
   O header é uma malha hexagonal de caracteres que ondula, e a marca (hexágono
   com o G vazado) emerge dela em glifos densos. Tudo determinístico: mesmo
   desenho no servidor e no cliente, sem random. */

/* Exportada: a página institucional monta a própria arte com a mesma rampa.
   Duas rampas diferentes no site seriam dois materiais diferentes. */
export const RAMP = [" ", "·", ":", "-", "=", "+", "*", "#", "@"];

function hexVerts(r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return [r * Math.cos(a), r * Math.sin(a)] as [number, number];
  });
}

function inPoly(x: number, y: number, poly: Array<[number, number]>) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/* A marca em coordenadas normalizadas: hexágono cheio, menos o G vazado.
   O G é um anel aberto à direita mais a barra horizontal. */
const HEX = hexVerts(1);

/* O G é o vazio: um C aberto à direita mais a barra. Calibrado para ler
   nesta resolução de célula — anel e barra e mais nada, porque haste extra
   vira borrão quando cada traço tem duas células de largura. */
export function inMark(x: number, y: number) {
  if (!inPoly(x, y, HEX)) return false;
  const d = Math.hypot(x, y);
  const ang = (Math.atan2(y, x) * 180) / Math.PI;
  const ring = d > 0.32 && d < 0.6 && !(ang > -34 && ang < 34);
  const bar = Math.abs(y) < 0.1 && x > 0.05 && x < 0.6;
  return !(ring || bar);
}

export function AsciiWaveHeader() {
  const cols = 52;
  const rows = 32;
  const cw = 15;
  const ch = 15;
  const w = cols * cw + 40;
  const h = rows * ch + 56;

  /* centro da marca, em células */
  const mcx = (cols - 1) / 2;
  const mcy = (rows - 1) / 2;
  const mr = 13;

  const cells: React.ReactElement[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      /* deslocamento hexagonal: linhas ímpares meio passo à direita */
      const ox = row % 2 ? cw / 2 : 0;
      const x = 20 + col * cw + ox;
      const y = 34 + row * ch;

      /* posição relativa à marca, normalizada pelo raio dela */
      const nx = (col - mcx + (row % 2 ? 0.5 : 0)) / mr;
      const ny = ((row - mcy) * (ch / cw)) / mr;
      const mark = Math.hypot(nx, ny) < 1.25 && inMark(nx, ny);

      /* Densidade em moldura, lição da gravura Petrach do acervo: as bordas
         carregam a massa e o centro fica quieto para o tipo respirar.
         Antes era o contrário, e por isso o campo competia com a marca. */
      const wave = Math.sin(col * 0.42 + row * 0.31) + Math.cos(col * 0.17 - row * 0.53) * 0.6;
      const hx = Math.abs(col - mcx) / (cols / 2); // 0 no centro, 1 nas laterais
      const vy = Math.abs(row - mcy) / (rows / 2);
      const frame = Math.pow(Math.max(hx, vy * 0.72), 1.7);
      const quiet = 1 - Math.max(0, 1 - Math.hypot((col - mcx) / 16, (row - mcy) / 12)) * 0.8;
      const dens = Math.max(0, Math.min(1, (wave * 0.2 + 0.26 + frame * 0.72) * quiet));

      const idx = mark ? 8 : Math.round(dens * 7);
      const glyph = RAMP[idx];
      if (glyph === " ") continue;

      const delay = ((col * 0.6 + row * 1.15) % 14) * 0.14;

      cells.push(
        <text
          key={`${col}-${row}`}
          x={x}
          y={y}
          className={mark ? "a-mark" : "a-cell"}
          /* só a partir do glifo médio a célula entra na onda; abaixo disso
             o movimento é imperceptível e só custa. */
          data-live={!mark && idx >= 3 ? "1" : undefined}
          fill={mark ? "#9ddcff" : idx >= 5 ? "#3ba5e8" : "#2b566f"}
          style={mark ? undefined : { animationDelay: `${delay.toFixed(2)}s` }}
        >
          {glyph}
        </text>
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="Malha hexagonal de caracteres em onda, com a marca GRAVA.AI emergindo do campo em glifos densos."
      className="ascii"
    >
      <rect width={w} height={h} fill="#070c11" />
      <g fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="13" textAnchor="middle">
        {cells}
      </g>
      {/* Legenda em caixa mista e 12px: é texto funcional, não ornamento.
          Caixa alta numa frase de 42 caracteres derruba a legibilidade. */}
      <text x="20" y={h - 14} fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="12" fill="#7c8fa0" letterSpacing="0.4">
        Campo ilustrativo · sem valores declarados
      </text>
    </svg>
  );
}

/* O totem, e a arte se formando nele.
   Dois slots do CONTENT.md que estavam ausentes na página e voltam aqui como
   uma composição só, porque são o mesmo objeto: a máquina em proporção de
   quiosque e o estado→estado da geração acontecendo na tela dela.

   Sem foto e sem raster: o corpo é o mesmo campo de glifos do header, e a arte
   é a própria marca emergindo do ruído — a tela mostra o que a IA faz ali.
   Determinístico: o ciclo é atraso de CSS, não estado de React. */
export function AsciiTotem() {
  const cols = 26;
  const rows = 44;
  const cw = 13;
  const ch = 13;
  const w = cols * cw + 40;
  const h = rows * ch + 44;

  /* A tela ocupa o terço superior do corpo, em proporção de quiosque:
     alto e estreito, tela na altura do olho, base cega. */
  const scr = { c0: 4, c1: cols - 5, r0: 4, r1: 19 };
  const scx = (scr.c0 + scr.c1) / 2;
  const scy = (scr.r0 + scr.r1) / 2;
  const smr = 6.4;

  const body: React.ReactElement[] = [];
  const screen: React.ReactElement[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = 20 + col * cw + (row % 2 ? cw / 2 : 0);
      const y = 30 + row * ch;

      const inScreen =
        col >= scr.c0 && col <= scr.c1 && row >= scr.r0 && row <= scr.r1;

      /* Silhueta: corpo cheio até a base, com o pé mais estreito.
         Fora dela não se desenha nada — o vazio é o vazio. */
      const waist = row > rows - 7 ? 6 : row > rows - 10 ? 3 : 1;
      const inBody = col >= waist && col <= cols - 1 - waist && row >= 1;
      if (!inBody) continue;

      if (inScreen) {
        /* Dentro da tela: ruído de fundo e, por cima, a marca em glifo denso.
           A marca entra célula a célula e sai junto, e é esse ciclo que conta
           a geração: campo → arte → campo. */
        const nx = (col - scx + (row % 2 ? 0.5 : 0)) / smr;
        const ny = ((row - scy) * (ch / cw)) / smr;
        const isMark = Math.hypot(nx, ny) < 1.25 && inMark(nx, ny);

        const noise = Math.sin(col * 0.9 + row * 0.6) + Math.cos(col * 0.3 - row * 0.7) * 0.5;
        const idx = Math.max(0, Math.min(4, Math.round((noise * 0.5 + 0.5) * 4)));
        const g = RAMP[idx];

        if (g !== " ") {
          screen.push(
            <text
              key={`s${col}-${row}`}
              x={x}
              y={y}
              className="t-noise"
              fill="#2b566f"
              style={{ animationDelay: `${(((col + row) % 9) * 0.12).toFixed(2)}s` }}
            >
              {g}
            </text>
          );
        }

        if (isMark) {
          /* atraso radial: a arte fecha do centro para fora, como o traço
             de gravação fecha o desenho. */
          const d = Math.hypot(nx, ny);
          screen.push(
            <text
              key={`m${col}-${row}`}
              x={x}
              y={y}
              className="t-form"
              fill="#9ddcff"
              style={{ animationDelay: `${(d * 0.9).toFixed(2)}s` }}
            >
              @
            </text>
          );
        }
        continue;
      }

      /* Fora da tela: a carcaça. Borda densa, miolo quieto, base sólida —
         o objeto se lê pela moldura, como no header. */
      const edge =
        col === waist || col === cols - 1 - waist || row === 1 || row === rows - 1;
      const nearScreen = row >= scr.r0 - 1 && row <= scr.r1 + 1;
      const base = row > rows - 7;
      const idx = edge ? 7 : base ? 5 : nearScreen ? 4 : 2;

      body.push(
        <text key={`b${col}-${row}`} x={x} y={y} fill={idx >= 5 ? "#3ba5e8" : "#28485c"} opacity={idx >= 5 ? 0.8 : 0.5}>
          {RAMP[idx]}
        </text>
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="O totem desenhado em caracteres, com a arte se formando na tela: o campo de ruído fecha na marca e volta a abrir."
      className="ascii"
    >
      <rect width={w} height={h} fill="#070c11" />
      <g fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="12" textAnchor="middle">
        {body}
        {screen}
      </g>
      <text x="20" y={h - 12} fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="12" fill="#7c8fa0" letterSpacing="0.4">
        A arte fecha na tela e vira gravação
      </text>
    </svg>
  );
}

/* O sistema, em anel.
   A IA da GRAVA.AI não é um recurso solto: ela fecha um circuito entre quem
   compra e quem administra. O anel é hexagonal porque a marca é, e tem seis
   estações — três do lado do cliente, três do lado da operação. O traço entre
   elas é feito do mesmo glifo do resto da página.

   Reativo à rolagem sem JavaScript: o `animation-timeline: view()` do CSS
   controla a entrada de cada estação. Onde o navegador não suporta, tudo
   aparece no estado final e a seção continua legível — a rolagem enriquece,
   não sustenta. */
export const CIRCUITO = [
  { k: "01", lado: "cliente", t: "Chega no totem", d: "A IA faz o primeiro atendimento, sem fila e sem balcão." },
  { k: "02", lado: "cliente", t: "Descreve o que quer", d: "A arte é gerada ali, com o cliente olhando ela fechar." },
  { k: "03", lado: "cliente", t: "Leva a peça gravada", d: "Sai com o produto na mão e com uma história junto." },
  { k: "04", lado: "operação", t: "O estoque se conta", d: "O consumo daquela venda desce do saldo na hora." },
  { k: "05", lado: "operação", t: "A matriz enxerga", d: "O CRM mostra a unidade operando, em tempo real." },
  { k: "06", lado: "operação", t: "A reposição sai", d: "A distribuição parte da matriz antes de faltar." },
] as const;

export function AsciiCircuito() {
  const size = 420;
  const c = size / 2;
  const R = 148;

  /* seis estações nos vértices do hexágono, começando no topo */
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return { x: c + R * Math.cos(a), y: c + R * Math.sin(a), i };
  });

  /* O anel desenhado em caracteres: cada passo do perímetro vira um glifo.
     Densidade constante, porque aqui o traço é estrutura e não textura. */
  const ring: React.ReactElement[] = [];
  const STEPS = 96;
  for (let s = 0; s < STEPS; s++) {
    const t = (s / STEPS) * 6; // posição em lados do hexágono
    const seg = Math.floor(t);
    const f = t - seg;
    const p0 = pts[seg % 6];
    const p1 = pts[(seg + 1) % 6];
    const x = p0.x + (p1.x - p0.x) * f;
    const y = p0.y + (p1.y - p0.y) * f;
    ring.push(
      <text
        key={`r${s}`}
        x={x}
        y={y}
        className="c-ring"
        fill="#2b566f"
        style={{ animationDelay: `${(s * 0.012).toFixed(3)}s` }}
      >
        {s % 8 === 0 ? "+" : "·"}
      </text>
    );
  }

  /* raios até o centro: é o que faz o anel ser um sistema e não uma roda */
  const spokes: React.ReactElement[] = [];
  pts.forEach((p, i) => {
    for (let s = 3; s < 12; s++) {
      const f = s / 13;
      spokes.push(
        <text
          key={`s${i}-${s}`}
          x={c + (p.x - c) * f}
          y={c + (p.y - c) * f}
          className="c-spoke"
          fill="#28485c"
          style={{ animationDelay: `${(i * 0.09 + s * 0.02).toFixed(2)}s` }}
        >
          {s > 9 ? ":" : "·"}
        </text>
      );
    }
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Anel hexagonal de seis estações em caracteres: três do lado do cliente e três do lado da operação, ligadas ao centro."
      className="ascii circuito"
    >
      <rect width={size} height={size} fill="#070c11" />
      <g fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="13" textAnchor="middle">
        {ring}
        {spokes}

        {/* núcleo: a marca, que é onde as duas metades se encontram */}
        <text x={c} y={c - 6} className="c-core" fill="#9ddcff" fontSize="26">
          ⬢
        </text>
        <text x={c} y={c + 18} className="c-core" fill="#7c8fa0" fontSize="11" letterSpacing="1.6">
          IA
        </text>

        {/* estações */}
        {pts.map((p, i) => (
          <g key={`n${i}`}>
            <text
              x={p.x}
              y={p.y + 5}
              className="c-node"
              fill={i < 3 ? "#66cdff" : "#3ba5e8"}
              fontSize="19"
              style={{ animationDelay: `${(i * 0.12).toFixed(2)}s` }}
            >
              @
            </text>
            <text
              x={p.x}
              y={p.y - 16}
              className="c-node"
              fill="#7c8fa0"
              fontSize="11"
              style={{ animationDelay: `${(i * 0.12).toFixed(2)}s` }}
            >
              {CIRCUITO[i].k}
            </text>
          </g>
        ))}
      </g>

      <text x="14" y={size - 12} fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="11" fill="#7c8fa0" letterSpacing="0.4">
        Cliente à esquerda · operação à direita · a IA no meio
      </text>
    </svg>
  );
}

/* Medidor de canal em ASCII: a parte preenchida usa glifo denso,
   o resto fica no glifo fraco. Sem número, sem porcentagem. */
export function AsciiMeter({ f }: { f: number }) {
  const n = 22;
  const filled = Math.round(f * n);
  const cells = Array.from({ length: n }, (_, i) => {
    const on = i < filled;
    return (
      <text
        key={i}
        x={10 + i * 13}
        y={26}
        fill={on ? "#3ba5e8" : "#28485c"}
        className={on ? "a-on" : undefined}
        style={on ? { animationDelay: `${i * 0.05}s` } : undefined}
      >
        {on ? (i >= filled - 2 ? "#" : "=") : "·"}
      </text>
    );
  });
  return (
    <svg viewBox="0 0 300 40" aria-hidden="true" className="ascii">
      <g fontFamily="var(--f-txt), system-ui, sans-serif" fontSize="15">{cells}</g>
    </svg>
  );
}
