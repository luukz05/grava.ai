/* A landing de captação de franqueado.

   ELA JÁ FOI A HOME, e a troca vale a explicação. Enquanto `/` servia esta
   página, quem chegava pelo nome da marca — que é como a maior parte do
   tráfego de uma rede nova chega — caía numa proposta de investimento antes de
   saber o que a GRAVA.AI faz. A barra do topo já denunciava a inversão: ela
   chamava `/institucional` de "Home" e esta rota de "Franqueado".

   Agora `/` é a página da marca e esta é `/seja-franqueado`. O endereço diz o
   que a página é, o que importa aqui mais do que na maioria dos casos: é ele
   que vai colado no anúncio pago, e URL que descreve a oferta é o primeiro
   pedaço de contexto que a pessoa lê no resultado.

   Forma, fundo e barra do topo vêm da casca compartilhada com as outras rotas.

   As variações de estudo (dez fundos, duas formas, três temas, o estúdio ao
   vivo e as dezoito rotas /v) foram retiradas quando a decisão saiu. Elas
   existem no commit `f5b1214` se a comparação precisar voltar. */

import type { Metadata } from "next";
import { Landing } from "../landing";

/* Uma frase só, usada na meta e no Open Graph — divergir entre os dois é como
   o card de compartilhamento passa a dizer uma coisa e o resultado do Google
   outra. Este par morava no `layout.tsx`, de volta ao tempo em que esta era a
   home: título e descrição da rota moram na rota.

   A descrição é reescrita pelo Google na maior parte das vezes — as medições
   públicas ficam entre 60% e 70% dos casos —, então ela não é sinal de
   ranqueamento: é o texto que aparece quando ele decide usar o seu. Duas
   consequências práticas, ambas aplicadas aqui: cabe em ~155 caracteres, e a
   carga útil vem na frente, porque no celular sobra pouco mais de 110.

   O que vem na frente é a categoria que a pessoa busca ("franquia de
   personalização com IA"), não a marca — quem já sabe o nome chega pela busca
   por nome de qualquer jeito. O investimento fecha a frase de propósito: numa
   página de captação, a descrição que já filtra quem não tem o valor economiza
   o primeiro contato, que é a única métrica do site. */
const TITULO = "GRAVA.AI — uma franquia que a IA opera junto com você";
const DESCRICAO =
  "Franquia de personalização com IA: o totem cria a arte e grava a peça na hora. Investimento de R$ 99.900 e payback estimado de 6 a 12 meses.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/seja-franqueado" },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/seja-franqueado",
    siteName: "GRAVA.AI",
    locale: "pt_BR",
    type: "website",
  },
};

export default function SejaFranqueado() {
  return <Landing />;
}
