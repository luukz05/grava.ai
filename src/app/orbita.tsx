/* As quatro frentes que a IA opera, todas visíveis ao mesmo tempo.

   O desenho vem do bloco `integrations-5` — hexágono com os ícones em volta e
   a marca na origem — portado para o CSS deste projeto, que não tem Tailwind
   nem shadcn.

   Este componente já foi um carrossel: um nome por vez, trocando a cada 5,2
   segundos. Três coisas mataram esse formato:

   — o título da seção promete "quatro lugares, todos com nome" e o desenho
     entregava quatro círculos anônimos. A manchete contradizia a figura;
   — essas quatro funções nomeadas são a prova de que isto não é mais uma
     franquia de gravação a laser. É o conteúdo que menos pode estar oculto, e
     três dos quatro estavam sempre escondidos;
   — o `<h3>` mudava sozinho a cada 5,2s, então o índice de cabeçalhos que um
     leitor de tela monta era diferente a cada passada.

   Sem ciclo não sobra estado: nem `setInterval`, nem o observador que existia
   só para pausá-lo fora da tela, nem botão de pausa, nem abas. O componente
   voltou a ser servidor.

   As quatro imagens saíram junto. Quatro placeholders lado a lado empurravam
   a leitura para baixo e competiam entre si; o hexágono já é a imagem desta
   seção, e cada frente precisa de ícone, nome e uma linha — não de uma foto
   que ainda não existe. */

import Image from "next/image";
import { IcoTotem, IcoOnline, IcoCrm, IcoEstoque } from "./icons";

type Frente = {
  id: string;
  rotulo: string;
  titulo: string;
  Icone: (p: { className?: string }) => React.ReactElement;
};

/* Posição de cada nó, em fração da largura da caixa e medida a partir da
   origem — a marca, embaixo no centro. Cada nó pousa no meio de uma aresta
   inclinada: os dois de fora no hexágono maior, os dois do meio no menor.
   É o que escalona o desenho; nas quinas o quarteto sairia quase na mesma
   altura e o segundo hexágono não apareceria.

   Ler da esquerda para a direita dá a ordem das frentes, e é a mesma ordem da
   lista embaixo. */
const POS: { dx: number; dy: number }[] = [
  { dx: -0.334, dy: -0.193 },
  { dx: -0.198, dy: -0.114 },
  { dx: 0.198, dy: -0.114 },
  { dx: 0.334, dy: -0.193 },
];

const FRENTES: Frente[] = [
  {
    id: "totem",
    rotulo: "No totem",
    titulo: "Atende e desenha, sem balcão",
    Icone: IcoTotem,
  },
  {
    id: "online",
    rotulo: "Nas vendas online",
    titulo: "A unidade vende fora do ponto",
    Icone: IcoOnline,
  },
  {
    id: "crm",
    rotulo: "No CRM da matriz",
    titulo: "A matriz enxerga em tempo real",
    Icone: IcoCrm,
  },
  {
    id: "estoque",
    rotulo: "Estoque inteligente",
    titulo: "A plataforma avisa a reposição",
    Icone: IcoEstoque,
  },
];

export function Orbita() {
  return (
    <div className="orbita">
      <div className="orb-arco">
        {/* Dois hexágonos cortados na metade, um dentro do outro. Só a metade
            de cima entra: o corte cai na linha da marca, que é a origem do
            desenho. Hexágono de topo plano, o mesmo da marca.

            Caixa de coordenadas 440×240, origem em (220, 230). Raio 196 no de
            fora e 116 no de dentro; a altura de cada um é raio × √3/2. */}
        {/* `pathLength={1}` normaliza o comprimento dos dois arcos: eles têm
            tamanhos diferentes e, sem isso, riscariam em velocidades
            diferentes na mesma faixa de rolagem — o de dentro chegando ao fim
            enquanto o de fora ainda está na metade. Mesma razão pela qual as
            quinze curvas da carta do herói usam o mesmo atributo. */}
        <svg className="orb-arcos" viewBox="0 0 440 240" aria-hidden="true">
          <path d="M24 230L122 60H318L416 230" pathLength={1} />
          <path d="M104 230L162 130H278L336 230" pathLength={1} />
        </svg>

        {/* Os nós são o desenho, não controle: nada acontece ao clicar neles
            porque não há mais nada para trocar. Cada um carrega o número da
            frente que a lista abaixo repete — é o que amarra a figura ao
            texto sem obrigar ninguém a decorar posição. */}
        {FRENTES.map((x, i) => (
          <span
            key={x.id}
            className="orb-no"
            aria-hidden="true"
            style={
              { "--dx": POS[i].dx, "--dy": POS[i].dy } as React.CSSProperties
            }
          >
            <x.Icone />
            <em className="orb-n mono">{String(i + 1).padStart(2, "0")}</em>
          </span>
        ))}

        {/* A marca do manual, não um hexágono desenhado parecido com ela. O
            centro do diagrama é onde a rede assina o desenho. */}
        <span className="orb-centro" aria-hidden="true">
          <Image
            src="/brand/grava-mark.png"
            alt=""
            width={108}
            height={128}
            className="orb-marca"
          />
        </span>
      </div>

      <FrentesLista />
    </div>
  );
}

/* Os quatro nomes, sem a figura.

   Separada porque a seção da IA passou a ser a cena do totem: lá a história é
   uma unidade operando do pedido à peça pronta, e o hexágono ao lado dela seria
   um segundo desenho disputando a mesma atenção. Os nomes continuam — são eles
   que provam que a IA não é só o desenho da arte —, mas entram como texto, no
   degrau de presença que texto tem.

   A numeração existia para casar com a do hexágono. Ela fica: numerar quatro
   frentes as torna uma lista de coisas que a rede faz, e não quatro adjetivos. */
export function FrentesLista() {
  return (
    <ol className="orb-lista">
      {FRENTES.map((x, i) => (
        <li key={x.id}>
          <span className="orb-n mono">{String(i + 1).padStart(2, "0")}</span>
          <span className="orb-rotulo">{x.rotulo}</span>
          <h3>{x.titulo}</h3>
        </li>
      ))}
    </ol>
  );
}
