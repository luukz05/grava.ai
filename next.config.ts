import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores stray lockfiles in parent
  // directories (e.g. ~/package-lock.json) and uses this project as the root.
  turbopack: {
    root: __dirname,
  },

  /* As rotas trocaram de lugar: `/` passou a servir a página da marca (era
     `/institucional`) e a landing de captação foi para `/seja-franqueado`.
     Estes dois redirects são o que impede a troca de custar o que já foi
     indexado, compartilhado ou colado em anúncio.

     `permanent: true` emite 308, e o permanente é o que transfere autoridade
     para o novo endereço — um 307 pede ao Google que mantenha o antigo no
     índice, que é o oposto do que se quer aqui. Fica de pé indefinidamente: o
     custo de um redirect é zero e o de um link morto não é.

     `/franqueado` não existiu como rota, mas é o que alguém digita ou escreve
     à mão ao lembrar do nome do item na barra do topo.

     `/perguntas` EXISTIU E FOI EXTINTA: o FAQ virou seção da landing, com as
     doze perguntas e o dado estruturado. O destino leva à âncora `#duvidas`
     porque a seção fica no meio de uma página longa — sem ela, quem clica num
     link antigo cai no topo da landing e tem que procurar o que já tinha
     achado. */
  async redirects() {
    return [
      { source: "/institucional", destination: "/", permanent: true },
      {
        source: "/franqueado",
        destination: "/seja-franqueado",
        permanent: true,
      },
      {
        source: "/perguntas",
        destination: "/seja-franqueado#duvidas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
