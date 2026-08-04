/* Head to head: o modelo tradicional de um lado, a GRAVA.AI do outro.

   Duas decisões que sustentam o bloco:

   — a coluna da esquerda é o MODELO, não uma rede com nome. A página não tem
     dado sobre concorrente nenhum, e comparar com marca específica sem dado é
     onde uma peça de venda vira mentira. O que está ali é o que qualquer loja
     de gravação sem IA e sem totem precisa fazer para funcionar;
   — as linhas são deveres, não elogios. A seção tinha uma galeria de seis
     cartões listando o que a rede entrega, e ela saiu: dizia o mesmo que a
     coluna da direita daqui, sem dizer contra o quê. A pergunta agora é uma
     só — de quem é a tarefa — e é ela que dá o título da seção.

   O tema fica no meio porque é o eixo da comparação — os dois lados são
   respostas para a mesma pergunta, e no meio eles se olham. */

import Image from "next/image";

const PARES: { tema: string; eles: string; nos: string }[] = [
  {
    tema: "Atendimento no ponto",
    eles: "Contratar, treinar e escalar atendente para todo o horário.",
    nos: "A IA atende no totem, do primeiro oi até a peça pronta.",
  },
  {
    tema: "Criação das peças",
    eles: "Alguém precisa saber desenhar e operar o programa.",
    nos: "A arte fecha na tela, gerada na hora com o cliente.",
  },
  {
    tema: "Compra de insumos",
    eles: "Achar fornecedor, negociar preço e conferir qualidade.",
    nos: "Produtos e matéria-prima saem da matriz.",
  },
  {
    tema: "Controle de estoque",
    eles: "Contagem no olho e reposição descoberta quando falta.",
    nos: "A plataforma monitora consumo e avisa a reposição.",
  },
  {
    tema: "Padrão de qualidade",
    eles: "Cada unidade resolve do seu jeito.",
    nos: "Padronização definida e mantida pela rede.",
  },
  {
    tema: "Gestão e números",
    eles: "Você monta o relatório e manda.",
    nos: "A matriz enxerga a unidade em tempo real.",
  },
  {
    tema: "Sua presença",
    eles: "A loja depende de você estar lá todo dia.",
    nos: "A operação roda sem depender disso.",
  },
];

export function HeadToHead() {
  return (
    <div className="h2h">
      {/* O lado da rede se apresenta com a marca: símbolo do manual e o nome
          na display da marca. O outro lado é o mono cinza de dado, porque é o
          que ele é — a descrição de um modelo, não uma identidade. */}
      <div className="h2h-cab" aria-hidden="true">
        <span className="h2h-lado mono">Franquia de gravação tradicional</span>
        <span />
        <span className="h2h-lado h2h-lado--nos">
          <Image
            src="/brand/grava-mark.png"
            alt=""
            width={108}
            height={128}
            className="h2h-marca"
          />
          GRAVA.AI
        </span>
      </div>

      {/* O tema vem primeiro dentro de cada linha porque é o `<dt>`: descrição
          antes do termo não existe em lista de definição. Quem coloca ele no
          meio das duas respostas é a grade, com `grid-column` explícito. */}
      <dl className="h2h-linhas">
        {PARES.map((p) => (
          <div className="h2h-linha" key={p.tema}>
            <dt className="h2h-tema">{p.tema}</dt>
            <dd className="h2h-eles">
              <span className="h2h-tag mono">Tradicional</span>
              {p.eles}
            </dd>
            <dd className="h2h-nos">
              <span className="h2h-tag h2h-tag--nos">GRAVA.AI</span>
              {p.nos}
            </dd>
          </div>
        ))}
      </dl>

      <p className="h2h-rodape">
        A coluna da esquerda descreve o modelo tradicional de loja de gravação,
        não uma rede específica.
      </p>
    </div>
  );
}
