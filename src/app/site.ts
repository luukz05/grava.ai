/* O endereço público do site, num lugar só.

   Ele entra em quatro coisas que precisam concordar entre si: o `metadataBase`
   do layout, as URLs canônicas de cada rota, o `sitemap.xml` e a linha `Sitemap:`
   do `robots.txt`. Escrever o domínio quatro vezes é escrever três chances de
   uma delas ficar para trás — e canônica divergente do sitemap é pior que
   canônica nenhuma: o Google recebe dois sinais e escolhe o que quiser.

   ATENÇÃO — O DOMÍNIO AINDA NÃO ESTÁ DECIDIDO. O `CLAUDE.md` registra que
   `gravaai.com` e `gravaai.com.br` já estavam registrados (jul/2026,
   provavelmente do cliente) e que `grava.ai` custaria à parte. Enquanto a
   decisão não sai, o valor abaixo é chute e está aqui só para o build não
   quebrar.

   Antes de publicar: defina `NEXT_PUBLIC_SITE_URL` no ambiente da Vercel com o
   domínio real. Publicar com o domínio errado é pior que publicar sem nenhum,
   porque aí o Google indexa canônicas apontando para um site que não existe. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gravaai.com.br";

export const SITE_NOME = "GRAVA.AI";

export const WHATSAPP_E164 = "+5515996610916";
export const INSTAGRAM = "https://instagram.com/gravaaioficial";
