/* O card da galeria.

   ELA VINHA HERDANDO O CARD DA MARCA. A convenção de arquivo do Next cascateia:
   sem um `opengraph-image` aqui, quem colasse `/galeria` no WhatsApp via o card
   da raiz — "transformando ideias em produtos personalizados". Não estava
   errado, só não era desta página: o link diz galeria e a imagem falava de
   marca.

   A frase sai da `description` da própria rota, sem o ticket. O valor de R$ 60
   a R$ 100 continua na página, onde vem acompanhado do que ele significa; numa
   imagem que circula solta ele viraria tabela de preço da rede, que é outra
   coisa — o mesmo motivo pelo qual o payback saiu do card de captação.

   ENQUANTO A GALERIA FOR CASCA, ESTE CARD PROMETE MAIS DO QUE A PÁGINA ENTREGA.
   A `/galeria` ainda é estrutura com slot nomeado, sem fotografia real (ver o
   cabeçalho de `page.tsx` e a pendência de `noindex` em `docs/seo-implementacao.md`
   §3.4). O card não inventa foto — ele é o mesmo desenho das outras duas rotas
   —, mas vale saber que quem clicar vai encontrar menos do que o card sugere,
   até as peças chegarem. */

import { CardOg, TAMANHO, TIPO_CONTEUDO } from "../og-card";

export const alt = "GRAVA.AI — galeria de peças gravadas";
export const size = TAMANHO;
export const contentType = TIPO_CONTEUDO;

export default async function Image() {
  return CardOg({
    titulo: "Peças gravadas a laser,",
    destaque: "com arte criada por IA",
    rodape: "Galeria de peças",
  });
}
