/* robots.txt.

   Não existia nenhum, e a ausência não é neutra: sem `robots.txt` o site
   responde 404 nele, e sem a linha `Sitemap:` o rastreador só encontra o mapa
   se alguém o cadastrar à mão no Search Console. Esta é a única declaração que
   o Google lê antes de qualquer página.

   Libera tudo de propósito. Não há área privada aqui, e `Disallow` preventivo
   em site de captação é o erro clássico que some com a página do Google e leva
   semanas até alguém descobrir por quê.

   OS ROBÔS DE IA, E POR QUE ELES ESTÃO NOMEADOS AQUI.

   A regra `*` já libera todos eles — as linhas nomeadas abaixo não mudam nada
   hoje. Elas existem por dois motivos: registram a decisão de deixar o site
   ser citado (que é uma escolha, não um esquecimento), e sobrevivem ao dia em
   que alguém apertar a regra `*` sem pensar nas respostas de IA.

   A distinção que importa é entre robô de TREINO e robô de BUSCA:

   - Treino (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`,
     `Applebot-Extended`): lê para alimentar modelo. Bloquear não tira o site de
     resposta nenhuma — só do treino futuro.
   - Busca/citação (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`,
     `Bingbot`, `Googlebot`): busca a página na hora em que alguém pergunta, e é
     por esses que a citação acontece. Bloquear estes é sumir das respostas.

   Confundir os dois é o erro caro: quem bloqueia `GPTBot` achando que protege
   conteúdo costuma bloquear `OAI-SearchBot` junto e some do ChatGPT sem
   perceber. Aqui os dois grupos estão liberados — um site de captação de
   franqueado quer ser citado em toda parte onde alguém pergunta sobre franquia.

   ATENÇÃO À VERCEL: o firewall dela tem uma opção de bloquear robô de IA. Se
   alguém ligar isso, ela vence este arquivo — o bloqueio acontece antes de o
   `robots.txt` ser lido. Conferir no painel antes de investigar sumiço. */

import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

/* Os que buscam a página quando alguém pergunta. São estes que geram citação. */
const BUSCA_IA = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "Amazonbot",
  "Applebot",
];

/* Os que leem para treinar modelo. Liberados: o site não tem conteúdo
   proprietário a proteger, e presença no corpus de treino é o que faz o modelo
   conhecer a marca sem precisar buscar. */
const TREINO_IA = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...BUSCA_IA, ...TREINO_IA], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    /* Domínio preferido. Com `.com` e `.com.br` respondendo o mesmo conteúdo —
       que é o cenário provável aqui —, isto e as canônicas são o que impede o
       site de competir consigo mesmo. */
    host: SITE_URL,
  };
}
