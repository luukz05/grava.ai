/* O card da landing de captação.

   Ele existe separado do card da raiz por causa de onde este link é colado: no
   anúncio pago, no WhatsApp do time da franqueadora e no Teams do candidato. O
   card da marca diria "produtos personalizados" a quem já está sendo convidado
   a investir — a promessa certa, na página errada.

   A frase é a mesma da `<title>` e do `og:title` da rota (`page.tsx`). Divergir
   entre a imagem e o título faria o card dizer uma coisa em cima da outra na
   mesma pré-visualização.

   O PÉ TROUXE O PAYBACK ESTIMADO E NÃO TRAZ MAIS. O raciocínio de pôr era bom
   — o número já está na `description` e filtra quem não tem o perfil antes do
   primeiro contato. O de tirar é melhor: a `description` viaja junto da página,
   e uma imagem não. Ela é reencaminhada solta, vira captura de tela, aparece
   sem a palavra "estimado" ao lado. Promessa de retorno é a afirmação que menos
   pode circular sem contexto numa captação de franqueado. */

import { CardOg, TAMANHO, TIPO_CONTEUDO } from "../og-card";

export const alt = "GRAVA.AI — uma franquia que a IA opera junto com você";
export const size = TAMANHO;
export const contentType = TIPO_CONTEUDO;

export default async function Image() {
  return CardOg({
    titulo: "Uma franquia que a",
    destaque: "IA opera junto com você",
    rodape: "Seja franqueado",
  });
}
