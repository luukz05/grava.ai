/* O mapa do site.

   Quatro páginas não precisam de sitemap para serem descobertas — o Google
   chega nelas pelos links internos. O que o sitemap faz aqui é outra coisa, e
   é o que importa num site novo: ele declara quais URLs são as boas. Sem ele,
   qualquer variante que apareça em algum lugar (com barra no fim, com `?fbclid`
   de campanha, o domínio `.com` e o `.com.br` respondendo iguais) concorre em
   pé de igualdade com a URL certa, e o Google escolhe sozinho qual indexar.

   `priority` é relativo dentro do próprio site, não uma nota absoluta: diz ao
   rastreador em qual página gastar orçamento primeiro. A captação de franqueado
   é a página que paga a conta, então ela é 1. */

import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/perguntas`,
      lastModified: agora,
      /* A que mais muda: cada dúvida nova que chega pelo WhatsApp vira linha
         aqui. É também a que mais tem a ganhar em ser rastreada de novo. */
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/institucional`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/galeria`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
