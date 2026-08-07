/* As quatro frentes que a mesma IA opera — em linha, e com a IA no centro.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE ERA VERTICAL E POR QUE DEIXOU DE SER

   Era uma lista empilhada: 01, 02, 03, 04, um item embaixo do outro. Lista
   vertical numerada lê como PASSOS — coisas que acontecem em sequência, cada
   uma esperando a anterior. Não é o que acontece: as quatro frentes rodam ao
   mesmo tempo, o dia inteiro, e essa simultaneidade é justamente o argumento.

   Em linha, com uma régua atravessando as quatro, a leitura vira o que o fato
   é: um sistema só, presente em quatro lugares ao mesmo tempo.

   E a IA passou a aparecer. Antes ela era o sujeito oculto de uma lista de
   substantivos; agora ela é o bloco de onde a régua sai, e as quatro frentes
   pendem dela. A frase que sustenta a seção não é "existem quatro frentes" —
   é "é a mesma IA nas quatro". */

import { IcoTotem, IcoOnline, IcoCrm, IcoEstoque } from "./icons";

type Frente = {
  id: string;
  rotulo: string;
  titulo: string;
  /* O que ela de fato faz. A lista antiga parava no título e o visitante ficava
     com quatro nomes sem verbo. */
  faz: string;
  Icone: (p: { className?: string }) => React.ReactElement;
};

const FRENTES: Frente[] = [
  {
    id: "totem",
    rotulo: "No totem",
    titulo: "Atende e desenha",
    faz: "Conversa com o cliente, entende o pedido e gera a arte pronta para gravar.",
    Icone: IcoTotem,
  },
  {
    id: "online",
    rotulo: "Nas vendas online",
    titulo: "Vende fora do ponto",
    faz: "A mesma arte vai para o catálogo da unidade e continua vendendo depois que a loja fecha.",
    Icone: IcoOnline,
  },
  {
    id: "crm",
    rotulo: "No CRM da matriz",
    titulo: "Reporta em tempo real",
    faz: "Cada venda chega à franqueadora no instante em que acontece, sem ninguém preencher planilha.",
    Icone: IcoCrm,
  },
  {
    id: "estoque",
    rotulo: "No estoque",
    titulo: "Pede a reposição",
    faz: "Acompanha o consumo de cada insumo e dispara o pedido antes de faltar.",
    Icone: IcoEstoque,
  },
];

export function Frentes() {
  return (
    <div className="fre">
      {/* A IA em evidência: ela é o sujeito, e as quatro frentes são o que ela
          alcança. Sem este bloco, a régua sairia do nada. */}
      <div className="fre-fonte">
        <span className="fre-fonte-rot mono">Uma IA</span>
        <p className="fre-fonte-txt">
          A mesma inteligência opera as <strong>quatro frentes</strong> da
          unidade — ao mesmo tempo, o dia inteiro, sem ninguém no meio.
        </p>
      </div>

      {/* A régua é decorativa e por isso está fora da lista: ela desenha a ideia
          de "um sistema só", e um leitor de tela não deve encontrar um item
          vazio no meio dos quatro reais. */}
      <ol className="fre-linha">
        {FRENTES.map((f, i) => (
          <li className="fre-item" key={f.id}>
            <span className="fre-no" aria-hidden="true">
              <f.Icone />
            </span>
            <span className="fre-num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="fre-rot mono">{f.rotulo}</span>
            <h3 className="fre-tit">{f.titulo}</h3>
            <p className="fre-faz">{f.faz}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
