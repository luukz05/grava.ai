/* O card da landing de captação.

   Ele existe separado do card da raiz por causa de onde este link é colado: no
   anúncio pago, no WhatsApp do time da franqueadora e no Teams do candidato. O
   card da marca diria "produtos personalizados" a quem já está sendo convidado
   a investir — a promessa certa, na página errada.

   A frase é a mesma da `<title>` e do `og:title` da rota (`page.tsx`). Divergir
   entre a imagem e o título faria o card dizer uma coisa em cima da outra na
   mesma pré-visualização.

   O pé traz o payback estimado porque ele já está na `description` da página e
   é o filtro que economiza o primeiro contato — quem lê "6 a 12 meses" e não
   se reconhece no perfil não clica, e a única métrica do site é contato. */

import { CardOg, TAMANHO, TIPO_CONTEUDO } from "../og-card";

export const alt = "GRAVA.AI — uma franquia que a IA opera junto com você";
export const size = TAMANHO;
export const contentType = TIPO_CONTEUDO;

export default async function Image() {
  return CardOg({
    titulo: "Uma franquia que a",
    destaque: "IA opera junto com você",
    rodape: "Payback estimado 6–12 meses",
  });
}
