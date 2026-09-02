/* O mapa do site.

   Quatro páginas não precisam de sitemap para serem descobertas — o Google
   chega nelas pelos links internos. O que o sitemap faz aqui é outra coisa, e
   é o que importa num site novo: ele declara quais URLs são as boas. Sem ele,
   qualquer variante que apareça em algum lugar (com barra no fim, com `?fbclid`
   de campanha, o domínio `.com` e o `.com.br` respondendo iguais) concorre em
   pé de igualdade com a URL certa, e o Google escolhe sozinho qual indexar.

   O QUE O GOOGLE LÊ AQUI, E O QUE ELE JOGA FORA.

   `<priority>` e `<changefreq>` são ignorados. Está na documentação de sitemaps
   do próprio Google ("Google ignores <priority> and <changefreq> values"), e
   Gary Illyes já chamou os dois de "bag of noise" em público. A versão anterior
   deste arquivo tratava `priority` como orçamento de rastreio — não é, e o
   comentário que dizia isso saiu junto com os campos. Quem decide em que página
   gastar rastreio é o Google, por link interno, histórico e engajamento.

   Sobram `<loc>` e `<lastmod>`. E `<lastmod>` só vale se for verdade: o Google
   compara a data declarada com a página que ele busca, e sitemap que jura
   "mudou ontem" numa página parada há meses perde a discussão — não em parte,
   no arquivo inteiro. Data errada não é neutra, ela desqualifica a coluna toda.

   Por isso as datas abaixo são fixas e escritas à mão, não `new Date()`. A
   armadilha é justamente essa: `new Date()` num sitemap de site estático
   carimba a hora do build em toda URL, e cada deploy — mesmo um que só mexeu
   em CSS — passa a anunciar que as quatro páginas mudaram. É a forma mais
   rápida de o `lastmod` do site virar decoração.

   AO MUDAR O CONTEÚDO DE UMA PÁGINA, ATUALIZE A DATA DELA AQUI. Mudança de
   conteúdo de verdade: texto, resposta do FAQ, preço, dado estruturado. Não
   conta ajuste de estilo, refator ou troca de imagem decorativa. */

import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

/* Data da última alteração real de conteúdo de cada rota, em ISO. Os valores
   iniciais vêm do último commit que tocou o arquivo de cada página
   (`git log -1 --format=%cI -- <arquivo>`), conferido em 11/08/2026. */
const ATUALIZADO_EM = {
  /* `/` passou a servir a página da marca (era `/institucional`) e a landing de
     captação foi para `/seja-franqueado` — 02/09/2026. Troca de URL é mudança
     de conteúdo para quem rastreia: as duas rotas mudaram de fato o que
     respondem.

     `/institucional` NÃO entra na lista abaixo, e é de propósito: ela agora
     redireciona (ver `next.config.ts`), e URL que redireciona dentro de um
     sitemap é sinal contraditório — o arquivo declara "esta é a boa" enquanto
     o servidor responde "não é, vá para outra". */
  home: "2026-09-02",
  sejaFranqueado: "2026-09-02",
  perguntas: "2026-09-02",
  galeria: "2026-09-02",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: ATUALIZADO_EM.home },
    {
      url: `${SITE_URL}/seja-franqueado`,
      lastModified: ATUALIZADO_EM.sejaFranqueado,
    },
    { url: `${SITE_URL}/perguntas`, lastModified: ATUALIZADO_EM.perguntas },
    { url: `${SITE_URL}/galeria`, lastModified: ATUALIZADO_EM.galeria },
  ];
}
