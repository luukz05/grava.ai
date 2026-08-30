/* Sobe o `next dev` gravando tudo em `dev.log`.
   Uso: `npm run dev:log` no lugar de `npm run dev`.

   POR QUE ISTO EXISTE.

   Quando o servidor de dev morre sozinho — a aba vira `ERR_CONNECTION_REFUSED`
   — a única pista útil são as últimas linhas que ele imprimiu e o motivo da
   saída. No terminal integrado do editor essas linhas somem junto com o
   processo: a aba fecha, o scrollback vai embora, e sobra "caiu de novo".

   Este envelope resolve isso sendo transparente. O `next dev` continua
   herdando o terminal (cores, `Ctrl+C`, overlay de erro, tudo igual), mas a
   saída também é duplicada para `dev.log`. Na hora da morte o script carimba
   uma última linha com código de saída e sinal — que é exatamente o que
   distingue os casos:

     `signal=SIGINT`   → alguém apertou Ctrl+C, ou o editor matou a árvore de
                         processos do terminal (reload de janela, extensão que
                         reiniciou). Não é bug do projeto.
     `signal=SIGTERM`  → o sistema operacional ou outra ferramenta derrubou.
     `code=134`/`code=137` → estouro de memória do Node.
     `code=1` com stack antes → o Next quebrou de verdade; a stack está no log.

   O log é reaberto do zero a cada subida, então o que está ali é sempre a
   sessão atual. Ele é ignorado pelo git. */

import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destino = path.join(raiz, "dev.log");
const log = createWriteStream(destino, { flags: "w" });

const carimbo = () => new Date().toISOString().slice(11, 19);

log.write(`[${carimbo()}] subindo next dev\n`);

/* `stdio: pipe` nos dois canais para poder duplicar; `stdin: inherit` para o
   Ctrl+C continuar chegando no Next como sempre chegou. */
const filho = spawn(
  process.execPath,
  [path.join(raiz, "node_modules", "next", "dist", "bin", "next"), "dev", "-p", "4040"],
  { cwd: raiz, stdio: ["inherit", "pipe", "pipe"] },
);

for (const [canal, saida] of [
  [filho.stdout, process.stdout],
  [filho.stderr, process.stderr],
]) {
  canal.on("data", (bloco) => {
    saida.write(bloco);
    log.write(bloco);
  });
}

filho.on("exit", (code, signal) => {
  log.write(`[${carimbo()}] next dev saiu — code=${code} signal=${signal}\n`);
  log.end();
  process.exit(code ?? 1);
});

filho.on("error", (erro) => {
  log.write(`[${carimbo()}] falha ao subir: ${erro.stack}\n`);
  log.end();
  process.exit(1);
});
