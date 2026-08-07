/* Prepara os vídeos da cena do totem para serem percorridos pela rolagem.
 *
 *   node scripts/videos.mjs
 *
 * Lê os brutos em `public/cena/bruto/` e escreve `totem.mp4` e `pecas.mp4` em
 * `public/cena/`.
 *
 * POR QUE ISTO EXISTE. Vídeo comum não serve para ser percorrido pela rolagem.
 * Encoder normal grava um keyframe a cada 1 ou 2 segundos e descreve os quadros
 * do meio como diferenças do anterior; pedir `currentTime` num quadro do meio
 * obriga o decodificador a voltar ao keyframe e refazer tudo até lá. A rolagem
 * pede dezenas de posições por segundo, o decodificador não acompanha e descarta
 * quase todas — e o que se vê é a cena pulando em blocos em vez de deslizar.
 *
 * `-g 1 -keyint_min 1 -sc_threshold 0` faz de TODO quadro um keyframe. Aí buscar
 * qualquer posição é uma leitura direta.
 *
 * Isso engorda o arquivo, e a conta foi medida nos dois eixos:
 *
 *     1280px CRF23   3,7MB   — some detalhe visível em janela de 1900px
 *     1600px CRF21   7,4MB
 *     1920px CRF23   8,1MB
 *     1920px CRF20  11,9MB   <- escolhido
 *
 * Ficou na resolução NATIVA porque abaixo dela o navegador amplia, e ampliar é
 * exatamente o que fazia a cena parecer de qualidade menor que a do arquivo.
 *
 * Os 11,9MB são protegidos por carregamento tardio: os elementos nascem com
 * `preload="none"` e só baixam quando a seção se aproxima, então esse peso
 * nunca disputa banda com o herói.
 *
 * `-an` remove o áudio de verdade, em vez de só silenciar no elemento. Vídeo
 * movido por rolagem não toca áudio em sentido nenhum; a faixa só ocupava banda.
 *
 * O CORTE do totem existe porque o movimento dele termina antes do arquivo: os
 * últimos ~27% são quadro parado. Sem cortar, um terço da rolagem não faria nada
 * na tela. */

import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const PECAS = [
  /* `corte` é em segundos, e sai vazio quando o arquivo inteiro é útil. */
  { bruto: "totem-entrada.mp4", saida: "totem.mp4", corte: "3.65" },
  { bruto: "pecas-voando.mp4", saida: "pecas.mp4", corte: null },
];

const LARGURA = 1920;
const CRF = 20;

let falhou = false;
for (const p of PECAS) {
  const de = `public/cena/bruto/${p.bruto}`;
  if (!existsSync(de)) {
    console.error(`faltando: ${de}`);
    falhou = true;
    continue;
  }
  const args = [
    "-y", "-hide_banner", "-loglevel", "error",
    "-i", de,
    ...(p.corte ? ["-t", p.corte] : []),
    "-an",
    "-vf", `scale=${LARGURA}:-2`,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(CRF),
    "-g", "1", "-keyint_min", "1", "-sc_threshold", "0",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    `public/cena/${p.saida}`,
  ];
  const r = spawnSync(ffmpeg, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) {
    console.error(`${p.saida} falhou:\n${r.stderr.toString().slice(0, 400)}`);
    falhou = true;
    continue;
  }
  const mb = (statSync(`public/cena/${p.saida}`).size / 1024 / 1024).toFixed(1);
  console.log(`${p.saida}  ${mb}MB  all-intra ${LARGURA}px sem áudio`);
}
process.exit(falhou ? 1 : 0);
