/* Fundo do herói — carta topográfica viva, em WebGL, com luz e grão.

   Este arquivo já teve dez fundos em comparação (entalhe, pontilhado,
   blueprint, hexágonos, dot grid, aurora, malha, feixes e grade). A decisão
   ficou no topográfico e o resto saiu: código de opção que ninguém mais pode
   escolher só faz o próximo leitor perguntar qual está em uso. Os outros nove
   estão no commit `f5b1214`.

   O QUE MUDOU. A carta do herói era SVG: duas camadas de curvas geradas no
   servidor por soma de senos, plotadas na entrada e deslocadas em parallax na
   rolagem. Ela desenhava bem e não se mexia — o terreno era o mesmo do primeiro
   ao último quadro, e todo o movimento vinha de mover o desenho pronto.

   Agora quem desenha é um shader (`topography.tsx`, do React Bits, regulado
   para a marca em `carta-viva.tsx`): o campo de elevação é recalculado a cada
   quadro, então as isolinhas nascem, se fundem e somem como num terreno que
   respira. É o mesmo assunto — curva de nível, a assinatura de material da
   marca — com a diferença que separa uma carta impressa de um terreno vivo. A
   versão em SVG, com os marcos hexagonais que pousavam sobre as cotas, está no
   histórico.

   O QUE FICOU. Tudo que era da CENA e não do desenho: o degradê de fundo, a luz
   fixa que impede a carta de virar textura uniforme, a lanterna do ponteiro, a
   varredura que apaga da esquerda para a direita quando o herói sai, e o grão.

   GRÃO. Fica fora da carta e não acompanha o parallax: filme está na lente, não
   no terreno. O shader tem grão próprio — ele fica desligado aqui, porque grão
   que anda junto com o terreno é justamente o que este não quer ser. */

import { CartaViva } from "./carta-viva";
import { SeguirPonteiro } from "./ponteiro";

export type Fundo = "topo";

/* Grão de filme. O `feTurbulence` gera o ruído no próprio navegador: nenhum
   PNG de textura, nenhum byte a mais na rede. O `feColorMatrix` pinta o RGB de
   branco e joga o ruído no canal alfa — o `-0.32` corta tudo abaixo do
   meio-tom, então o que sobra são pontos claros esparsos, que é como grão se
   comporta em sombra. No tema claro o CSS inverte e eles viram ponto escuro
   sobre papel.

   Vai num `<pattern>` de 320px em vez de cobrir a tela inteira: o navegador
   rasteriza o ruído uma vez e repete o ladrilho, em vez de gerar ruído para
   cada pixel do herói. `stitchTiles="stitch"` fecha a emenda; sem ele a
   costura do ladrilho aparece como grade. E a região do filtro é fixada em
   0/0/100%/100% porque o padrão é vazar 10% para fora da caixa — vazar aqui
   significa ladrilho sobrepondo ladrilho e emenda escurecendo. */
function GraoFilme() {
  return (
    <svg className="topo-grao" aria-hidden="true">
      <defs>
        <filter
          id="tpGrao"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves={3}
            stitchTiles="stitch"
            seed={7}
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 -0.32"
          />
        </filter>
        <pattern id="tpGraoTile" width="320" height="320" patternUnits="userSpaceOnUse">
          <rect width="320" height="320" filter="url(#tpGrao)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tpGraoTile)" />
    </svg>
  );
}

export function FundoTopo() {
  return (
    <div className="fundo fundo--topo" aria-hidden="true">
      {/* A caixa herda o recorte de saída de `topo-camada--perto`: a varredura
          que apaga da esquerda para a direita quando o herói sai é a mesma de
          antes, e continua indo no mesmo sentido do resto da página. */}
      <div className="topo-camada topo-camada--perto topo-camada--gl">
        <CartaViva />
      </div>

      <div className="topo-luz" />
      {/* A lanterna do ponteiro. Fica acima das cartas e abaixo do grão: luz é
          da cena, grão é da lente. */}
      <div className="topo-lente" />
      <GraoFilme />
      <SeguirPonteiro />
    </div>
  );
}
