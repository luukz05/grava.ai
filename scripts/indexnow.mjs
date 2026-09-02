/* Avisa os buscadores que suportam IndexNow de que as páginas mudaram.
   Uso: `npm run indexnow` — depois de um deploy que mexeu em conteúdo.

   O QUE ISTO FAZ, E O QUE NÃO FAZ.

   IndexNow é um ping: em vez de esperar o rastreador passar por aqui, o site
   avisa que a URL mudou. Quem escuta: Bing, Yandex, Naver, Seznam e Yep.
   Quem NÃO escuta: o Google — ele não suporta o protocolo e não tem plano de
   suportar. Para o Google, o caminho continua sendo sitemap e Search Console.

   Então por que rodar isto num site que quer o Google? Porque o Bing não é só
   o Bing. O ChatGPT usa a infraestrutura de índice da Microsoft junto com o
   crawler próprio (`OAI-SearchBot`); site fora do índice do Bing tende a ficar
   fora das respostas do ChatGPT também. O mesmo índice alimenta o Copilot.
   Este ping é a via mais curta e barata para essa fatia.

   ANTES DE RODAR: o domínio precisa estar decidido e no ar, e o arquivo de
   chave precisa responder em `https://<domínio>/<chave>.txt` — é assim que o
   buscador confirma que quem pediu é dono do site. A chave está em
   `public/c85bd0d6319776caf7a25942dca5c9db.txt` e é pública por desenho: ela
   não protege nada, só amarra o ping ao domínio.

   Ping com data mentida não adianta nada aqui — a lista abaixo é a mesma do
   `src/app/sitemap.ts`, e o que vale é mandar quando a página mudou de
   verdade, não a cada deploy. */

const CHAVE = "c85bd0d6319776caf7a25942dca5c9db";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gravaai.com.br";

/* `/institucional` saiu daqui: a rota agora redireciona para `/` (as duas
   trocaram de lugar em 02/09/2026), e avisar o IndexNow de uma URL que
   redireciona é gastar o ping com o endereço errado. */
const ROTAS = ["/", "/seja-franqueado", "/perguntas", "/galeria"];

const host = new URL(SITE).host;
const urlList = ROTAS.map((r) => new URL(r, SITE).href);

const corpo = {
  host,
  key: CHAVE,
  keyLocation: `${SITE}/${CHAVE}.txt`,
  urlList,
};

/* Um endpoint só. Os buscadores que participam do IndexNow compartilham o que
   recebem entre si — mandar para todos é duplicar o mesmo aviso. */
const resposta = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(corpo),
});

/* 200 e 202 são os dois sucessos: 202 quer dizer "aceito, ainda vou validar a
   chave". 403 é chave que não responde na URL declarada — quase sempre deploy
   que não subiu o arquivo. 422 é URL que não pertence ao host declarado. */
console.log(`${resposta.status} ${resposta.statusText} — ${host}`);
console.log(urlList.join("\n"));

if (!resposta.ok) {
  console.error(await resposta.text());
  process.exit(1);
}
