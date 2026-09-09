/* Gera a fonte que o card de compartilhamento usa.
   Uso: `npm run og:fonte` — só quando o arquivo da Switzer for trocado.

   POR QUE O CARD NÃO PODE USAR A FONTE DO SITE.

   O site serve `src/app/fontes/Switzer-Variable.woff2`: um arquivo variável de
   um eixo (wght 100–900), comprimido em WOFF2. A imagem de Open Graph é
   desenhada pelo Satori (dentro do `next/og`), e ele bate em duas paredes com
   esse arquivo:

   1. WOFF2 NÃO ABRE. O parser de OpenType do Satori lê `ttf` e `otf`; a
      compressão Brotli do WOFF2 ele não desfaz. Passar o arquivo do site
      quebra o build com "Unsupported font format".

   2. A TABELA `fvar` DERRUBA O PARSER. Descomprimido para `ttf`, o arquivo
      ainda carrega a tabela que descreve o eixo variável. O Satori a lê e
      procura o NOME do eixo em `name` — mas a Switzer registra esse nome no ID
      256 (a faixa dos nomes personalizados), e o parser só carrega os IDs
      padrão, de 0 a 25. O que sai é um `TypeError: Cannot read properties of
      undefined (reading '256')` durante a geração da imagem.

   O QUE ESTE SCRIPT FAZ: descomprime o WOFF2 e remove as tabelas de variação,
   deixando um `ttf` estático com o desenho da instância padrão — que é o peso
   400. Nada se perde no caminho: o Satori lê `fvar`, mas não aplica a `gvar`
   que de fato deforma os contornos, então ele já desenhava 400 e só 400. As
   tabelas removidas eram peso morto que ainda por cima quebrava o build.

   `GSUB`, `GPOS` e `GDEF` FICAM: é de onde vem o kerning e a ligadura. Card com
   par mal encaixado é a diferença entre uma peça de marca e uma captura de
   tela. */

import { readFile, writeFile } from "node:fs/promises";
import { decompress } from "wawoff2";

const ENTRADA = "src/app/fontes/Switzer-Variable.woff2";
const SAIDA = "src/app/fontes/Switzer-Regular-og.ttf";

/* As tabelas do modelo variável. `fvar` é a que quebra; as outras só descrevem
   como interpolar entre pesos que não existem mais no arquivo de saída, e uma
   tabela de variação órfã é convite para o próximo parser tropeçar do mesmo
   jeito. */
const VARIACAO = new Set(["fvar", "gvar", "avar", "cvar", "STAT", "HVAR", "VVAR", "MVAR"]);

/* Soma de ULONGs big-endian, que é como o formato SFNT define checksum. O
   preenchimento até múltiplo de 4 entra como zero — daí o `padStart` implícito
   de ler além do fim com `??  0`. */
function checksum(buf) {
  let soma = 0;
  for (let i = 0; i < buf.length; i += 4) {
    const palavra =
      ((buf[i] ?? 0) << 24) |
      ((buf[i + 1] ?? 0) << 16) |
      ((buf[i + 2] ?? 0) << 8) |
      (buf[i + 3] ?? 0);
    soma = (soma + (palavra >>> 0)) >>> 0;
  }
  return soma >>> 0;
}

function semVariacao(fonte) {
  const numTabelas = fonte.readUInt16BE(4);

  const tabelas = [];
  for (let i = 0; i < numTabelas; i++) {
    const reg = 12 + i * 16;
    const tag = fonte.toString("ascii", reg, reg + 4);
    if (VARIACAO.has(tag)) continue;
    const inicio = fonte.readUInt32BE(reg + 8);
    const tamanho = fonte.readUInt32BE(reg + 12);
    tabelas.push({ tag, dados: fonte.subarray(inicio, inicio + tamanho) });
  }

  /* A ordem dos registros no diretório é alfabética por tag — está na
     especificação e alguns validadores cobram. */
  tabelas.sort((a, b) => (a.tag < b.tag ? -1 : 1));

  const n = tabelas.length;
  /* `searchRange`, `entrySelector` e `rangeShift` são os três campos da busca
     binária que o formato pede: a maior potência de 2 menor ou igual a `n`,
     vezes 16. Errar aqui não quebra parser moderno nenhum, mas é o tipo de
     campo que só é conferido no dia em que já foi longe demais. */
  const expoente = Math.floor(Math.log2(n));
  const potencia = 2 ** expoente;

  const cabecalho = Buffer.alloc(12 + n * 16);
  cabecalho.writeUInt32BE(0x00010000, 0);
  cabecalho.writeUInt16BE(n, 4);
  cabecalho.writeUInt16BE(potencia * 16, 6);
  cabecalho.writeUInt16BE(expoente, 8);
  cabecalho.writeUInt16BE(n * 16 - potencia * 16, 10);

  const corpos = [];
  let deslocamento = cabecalho.length;

  tabelas.forEach((t, i) => {
    const reg = 12 + i * 16;
    cabecalho.write(t.tag, reg, 4, "ascii");
    cabecalho.writeUInt32BE(checksum(t.dados), reg + 4);
    cabecalho.writeUInt32BE(deslocamento, reg + 8);
    cabecalho.writeUInt32BE(t.dados.length, reg + 12);

    /* Cada tabela começa em múltiplo de 4. O recheio conta para o
       deslocamento da próxima, mas não para o `length` declarada — é assim que
       o formato separa "onde a tabela está" de "quanto dela é dado". */
    const recheio = (4 - (t.dados.length % 4)) % 4;
    corpos.push(t.dados, Buffer.alloc(recheio));
    deslocamento += t.dados.length + recheio;
  });

  const saida = Buffer.concat([cabecalho, ...corpos]);

  /* `checkSumAdjustment` do `head`: a constante mágica menos o checksum do
     arquivo inteiro com esse campo zerado. Ele mudou porque o diretório mudou,
     e deixá-lo desatualizado é o mesmo que assinar o arquivo errado. */
  const head = tabelas.findIndex((t) => t.tag === "head");
  if (head !== -1) {
    const inicio = cabecalho.readUInt32BE(12 + head * 16 + 8);
    saida.writeUInt32BE(0, inicio + 8);
    saida.writeUInt32BE((0xb1b0afba - checksum(saida)) >>> 0, inicio + 8);
  }

  return { saida, removidas: numTabelas - n };
}

const woff2 = await readFile(ENTRADA);
const ttf = Buffer.from(await decompress(woff2));
const { saida, removidas } = semVariacao(ttf);
await writeFile(SAIDA, saida);

console.log(
  `${SAIDA} — ${(saida.length / 1024).toFixed(0)} KB, ${removidas} tabelas de variação removidas`,
);
