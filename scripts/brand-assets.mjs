/* Prepara os assets de marca do UIKIT para uso na página.
   O que os arquivos originais têm de errado para web: fundo branco chapado e
   muita folga em volta do desenho, num quadrado de 640. Numa página #05090d o
   branco vira caixa; a folga faz o logo aparecer pequeno dentro de uma caixa
   grande e desalinha tudo que tenta encostar nele.

   Duas operações, nesta ordem:
   1. branco vira alfa zero, com tolerância — o PNG tem antialias, então o
      recorte é por distância do branco e não por igualdade exata, senão sobra
      uma auréola cinza na borda do desenho.
   2. corta a folga transparente até o desenho (trim), para a altura do arquivo
      ser a altura do desenho.

   Uso: node scripts/brand-assets.mjs */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "C:/Users/Lucas/Desktop/GRAVA AI UIKIT";
const OUT = "public/brand";

/* Os quatro lockups do manual, nomeados pelo que são e não pelo número. */
const FILES = [
  ["1.png", "grava-stacked.png", "símbolo sobre wordmark"],
  ["2.png", "grava-mark.png", "só o símbolo"],
  ["3.png", "grava-wordmark.png", "só o wordmark"],
  ["4.png", "grava-horizontal.png", "símbolo ao lado do wordmark"],
];

/* Limiar de branco. Acima disso o pixel é fundo. 232 deixa passar o antialias
   claro da borda como semitransparente em vez de o cravar como opaco. */
const CUT = 232;

async function despill(input) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const min = Math.min(r, g, b);
    if (min >= CUT) {
      /* branco puro ou quase: fora */
      data[i + 3] = 0;
      continue;
    }
    /* Borda: quanto mais claro, mais transparente. Mantém o degradê do
       antialias em vez de serrilhar o hexágono. */
    if (min > 200) {
      const t = (min - 200) / (CUT - 200);
      data[i + 3] = Math.round(255 * (1 - t));
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png();
}

await mkdir(OUT, { recursive: true });

for (const [src, out, what] of FILES) {
  const cut = await despill(`${SRC}/${src}`);
  const buf = await cut.trim({ threshold: 1 }).png({ compressionLevel: 9 }).toBuffer();
  const meta = await sharp(buf).metadata();
  await sharp(buf).toFile(`${OUT}/${out}`);
  console.log(`${out.padEnd(24)} ${meta.width}x${meta.height}  ${what}`);
}
