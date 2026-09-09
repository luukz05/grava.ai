/* O card padrão do site — o da marca.

   Convenção de arquivo do Next: um `opengraph-image` num segmento vale para
   ELE E PARA TUDO ABAIXO DELE que não declare o seu. Estando na raiz do `app`,
   este card cobre a home e a `/galeria`; a `/seja-franqueado` tem o dela ao
   lado da página, porque o link que vai colado no anúncio e no WhatsApp do
   time precisa dizer "franquia" antes de a pessoa clicar.

   A frase é o slogan da marca, o mesmo que já está no dado estruturado de
   `Organization` no `layout.tsx`. Não é texto novo: é o mesmo que o Google lê. */

import { CardOg, TAMANHO, TIPO_CONTEUDO } from "./og-card";

export const alt =
  "GRAVA.AI — transformando ideias em produtos personalizados";
export const size = TAMANHO;
export const contentType = TIPO_CONTEUDO;

export default async function Image() {
  return CardOg({
    titulo: "Transformando ideias em",
    destaque: "produtos personalizados",
    rodape: "Personalização com IA",
  });
}
