/* Os três tipos de ponto, lado a lado.

   Estrutura do bloco `pricing-section-with-comparison`: uma coluna de rótulos
   à esquerda, uma coluna por opção, linhas agrupadas por assunto e um selo na
   opção destacada. O que mudou na adaptação, e por quê:

   — sem Tailwind, sem shadcn, sem `class-variance-authority` e sem
     `@radix-ui/react-slot`: nenhum dos quatro existe neste projeto, e instalar
     o conjunto para uma seção reescreveria o sistema visual da página;
   — sem preço: aqui as colunas não são planos à venda. O investimento é o
     mesmo nos três pontos e vive na faixa de números, logo abaixo;
   — sem `<Check/>` verde e `<Minus/>` cinza da lucide: o traço do projeto é
     autoral e o "não" é um traço, não um X — X leria como defeito do ponto;
   — a tabela é um `<table>` de verdade, e não uma grade de `<div>` como no
     original. É dado comparativo com cabeçalho de linha e de coluna: em
     leitor de tela, a grade de div vira uma fila de textos soltos.

   Os atributos são qualitativos porque a franqueadora não forneceu número por
   tipo de ponto. O único número aqui é o ticket, que veio do material. */

import { Ph } from "./ph";
import {
  IcoShopping,
  IcoMercado,
  IcoAeroporto,
  IcoSim,
  IcoNao,
} from "./icons";

type Loja = {
  id: string;
  nome: string;
  publico: string;
  resumo: string;
  imagem: string;
  Icone: (p: { className?: string }) => React.ReactElement;
};

/* Qual coluna leva o selo. O texto dele diz o que a própria tabela prova
   duas linhas abaixo — "alto e constante, com pico no fim de semana". O selo
   anterior dizia "Mais escolhido", que é afirmação sobre a distribuição da
   rede: número que a franqueadora nunca forneceu e que a página não pode
   inventar. */
const DESTAQUE = "shopping";

const LOJAS: Loja[] = [
  {
    id: "shopping",
    nome: "Shopping center",
    publico: "Quem está passeando",
    resumo: "No corredor de maior circulação, entre as âncoras.",
    imagem: "Quiosque no corredor do shopping",
    Icone: IcoShopping,
  },
  {
    id: "mercado",
    nome: "Supermercado",
    publico: "Quem mora no bairro",
    resumo: "De grande porte, perto das frentes de caixa.",
    imagem: "Quiosque na frente de caixa",
    Icone: IcoMercado,
  },
  {
    id: "aeroporto",
    nome: "Aeroporto",
    publico: "Quem está de passagem",
    resumo: "Na área de espera, onde o tempo sobra.",
    imagem: "Quiosque na sala de embarque",
    Icone: IcoAeroporto,
  },
];

/* `true`/`false` viram marca e traço; string entra como texto. Um tipo só
   para os dois casos evita duas tabelas paralelas saindo de sincronia. */
type Valor = string | boolean;

/* Cada linha tem um valor por coluna. O que não muda de ponto para ponto —
   investimento, payback, royalties — saiu daqui para a seção de números: valor
   igual nas três colunas não é comparação, e ainda sumia de tela quando a
   tabela deslizava. */
type Linha = { rotulo: string; valores: Valor[] };

const GRUPOS: { titulo: string; linhas: Linha[] }[] = [
  {
    titulo: "Quem passa ali",
    linhas: [
      {
        rotulo: "Fluxo",
        valores: [
          "Alto e constante, com pico no fim de semana",
          "Recorrente, a mesma pessoa volta toda semana",
          "Alto, com público de fora da cidade",
        ],
      },
      {
        rotulo: "Perfil",
        valores: [
          "Família e casal em passeio",
          "Morador do bairro em compra de rotina",
          "Viajante a trabalho e a lazer",
        ],
      },
    ],
  },
  {
    titulo: "O tempo da pessoa",
    linhas: [
      {
        rotulo: "Tempo no ponto",
        valores: [
          "Passeio, sem pressa",
          "Espera de fila, curta e repetida",
          "Longo e ocioso, esperando embarque",
        ],
      },
      {
        rotulo: "Motivo da compra",
        valores: [
          "Presente e lembrança",
          "Impulso e data comemorativa",
          "Souvenir e presente de viagem",
        ],
      },
    ],
  },
  {
    titulo: "O que muda na operação",
    linhas: [
      { rotulo: "O mesmo cliente volta", valores: [false, true, false] },
      { rotulo: "Público de fora da cidade", valores: [false, false, true] },
      { rotulo: "A espera vira vitrine", valores: [false, true, true] },
    ],
  },
];

function Celula({ v }: { v: Valor }) {
  if (typeof v === "string") return <span className="cmp-txt">{v}</span>;
  return v ? (
    <span className="cmp-sim">
      <IcoSim />
      <span className="sr">sim</span>
    </span>
  ) : (
    <span className="cmp-nao">
      <IcoNao />
      <span className="sr">não se aplica</span>
    </span>
  );
}

export function LojasComparativo() {
  return (
    <div
      className="cmp-wrap"
      /* Uma caixa que rola precisa ser alcançável pelo teclado: sem `tabIndex`
         e `role`, quem não usa mouse nem toque não chega nas colunas que
         ficaram fora da tela. */
      tabIndex={0}
      role="region"
      aria-label="Comparação dos tipos de ponto — rolável na horizontal"
    >
      {/* Mais larga que o celular, rola na horizontal em vez de empilhar:
          empilhada ela deixa de ser comparação, que é a única razão desta
          seção existir. A coluna de rótulos fica grudada na esquerda para a
          linha continuar identificada durante a rolagem. */}
      <table className="cmp">
        <caption className="sr">
          Comparação dos três tipos de ponto: quem passa ali, quanto tempo a
          pessoa tem e o que muda na operação.
        </caption>
        <thead>
          <tr>
            <td className="cmp-canto" />
            {LOJAS.map((l) => (
              <th
                key={l.id}
                scope="col"
                className="cmp-col"
                data-destaque={l.id === DESTAQUE ? "1" : undefined}
              >
                <Ph ratio="4 / 3" label={l.imagem} />
                {l.id === DESTAQUE ? (
                  <span className="cmp-selo">Maior fluxo</span>
                ) : null}
                <span className="cmp-publico mono">{l.publico}</span>
                <span className="cmp-nome">
                  <span className="ico">
                    <l.Icone />
                  </span>
                  {l.nome}
                </span>
                <span className="cmp-resumo">{l.resumo}</span>
              </th>
            ))}
          </tr>
        </thead>

        {GRUPOS.map((g) => (
          <tbody key={g.titulo}>
            <tr>
              <th scope="colgroup" colSpan={4} className="cmp-grupo mono">
                {g.titulo}
              </th>
            </tr>
            {g.linhas.map((linha) => (
              <tr key={linha.rotulo}>
                <th scope="row" className="cmp-rotulo">
                  {linha.rotulo}
                </th>
                {linha.valores.map((v, i) => (
                  <td
                    key={LOJAS[i].id}
                    className="cmp-cel"
                    data-destaque={LOJAS[i].id === DESTAQUE ? "1" : undefined}
                  >
                    <Celula v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
