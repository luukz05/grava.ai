/* robots.txt.

   Não existia nenhum, e a ausência não é neutra: sem `robots.txt` o site
   responde 404 nele, e sem a linha `Sitemap:` o rastreador só encontra o mapa
   se alguém o cadastrar à mão no Search Console. Esta é a única declaração que
   o Google lê antes de qualquer página.

   Libera tudo de propósito. Não há área privada aqui, e `Disallow` preventivo
   em site de captação é o erro clássico que some com a página do Google e leva
   semanas até alguém descobrir por quê. */

import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    /* Domínio preferido. Com `.com` e `.com.br` respondendo o mesmo conteúdo —
       que é o cenário provável aqui —, isto e as canônicas são o que impede o
       site de competir consigo mesmo. */
    host: SITE_URL,
  };
}
