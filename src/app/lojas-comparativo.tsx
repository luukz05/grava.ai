/* Os três modelos de unidade, lado a lado — com o preço de cada um.

   ───────────────────────────────────────────────────────────────────────────
   O QUE MUDOU, E POR QUÊ

   Antes eram DUAS seções. "Gente em movimento" comparava três LOCAIS (shopping,
   supermercado, aeroporto) sem preço nenhum, e "O que custa e o que vem dentro"
   mostrava um valor único, porque o investimento era o mesmo em qualquer ponto.

   A franqueadora confirmou que passa a ter preço POR MODELO. Isso derruba a
   premissa das duas: o eixo da comparação deixa de ser onde a unidade fica e
   passa a ser qual unidade se compra — e aí o valor volta para dentro da
   tabela, que é onde ele compara.

   As duas viraram uma. `numeros.tsx` e `numeros-quadro.tsx` seguem no repo sem
   referência: o quadro do valor único com a contagem animada não sobrevive a
   três preços, mas está pronto se um dia houver de novo um número só.

   A FOTO PASSOU A LIDERAR. Antes ela era uma tarja de 4/3 espremida acima de
   sete linhas de texto. Quem escolhe entre quiosque aberto e fechado escolhe
   por como a coisa É, não por adjetivo — a imagem virou o topo de cada coluna,
   e as linhas de dado caíram de sete para cinco para não competir com ela.

   ───────────────────────────────────────────────────────────────────────────
   OS VALORES SÃO PROVISÓRIOS

   Estão em `MODELOS`, e em nenhum outro lugar. A franqueadora vai informar os
   definitivos — inclusive o nome do terceiro modelo, que aqui está como "Loja
   compacta" porque ela ainda não nomeou.

   A mesma regra de sempre: número de vitrine inventado nesta página é candidato
   tomando decisão com dado falso. Estes estão marcados para serem trocados, não
   para serem exibidos. */

import { Ph } from "./ph";
import { IcoShopping, IcoMercado, IcoAeroporto, IcoSim, IcoNao } from "./icons";

type Modelo = {
  id: string;
  nome: string;
  resumo: string;
  /* PROVISÓRIO — aguardando a franqueadora. */
  investimento: string;
  imagem: string;
  Icone: (p: { className?: string }) => React.ReactElement;
};

/* Qual coluna leva o selo. "Menor investimento" é um fato que a própria linha de
   preço prova duas linhas abaixo — e não uma afirmação sobre a rede, como seria
   "o mais escolhido", que exigiria um dado de distribuição que ninguém forneceu. */
const DESTAQUE = "aberto";

const MODELOS: Modelo[] = [
  {
    id: "aberto",
    nome: "Quiosque aberto",
    resumo: "Ilha no corredor, atendimento pelos quatro lados.",
    investimento: "R$ 99.900",
    imagem: "Quiosque aberto no corredor",
    Icone: IcoShopping,
  },
  {
    id: "fechado",
    nome: "Quiosque fechado",
    resumo: "Cabine com vitrine, estoque e balcão próprios.",
    investimento: "R$ 139.900",
    imagem: "Quiosque fechado com vitrine",
    Icone: IcoMercado,
  },
  {
    id: "compacta",
    /* NOME PROVISÓRIO: a franqueadora ainda não batizou o terceiro modelo. */
    nome: "Loja compacta",
    resumo: "Ponto com porta, para praça de maior permanência.",
    investimento: "R$ 189.900",
    imagem: "Loja compacta com fachada",
    Icone: IcoAeroporto,
  },
];

/* `true`/`false` viram marca e traço; string entra como texto. Um tipo só para
   os dois casos evita duas tabelas paralelas saindo de sincronia. */
type Valor = string | boolean;
type Linha = { rotulo: string; valores: Valor[]; forte?: boolean };

/* Cinco linhas, e não as sete de antes: com a foto liderando, cada linha a mais
   empurra a imagem para fora da primeira leitura. O que sobrou é o que muda de
   modelo para modelo e pesa na decisão.

   `forte` marca a linha do investimento — é a única que ganha escala, porque é
   a pergunta que trava a conversa. */
const LINHAS: Linha[] = [
  {
    rotulo: "Investimento",
    valores: MODELOS.map((m) => m.investimento),
    forte: true,
  },
  {
    rotulo: "Área ocupada",
    valores: ["≈ 4 m²", "≈ 9 m²", "≈ 18 m²"],
  },
  {
    rotulo: "Onde costuma ficar",
    valores: [
      "Corredor de shopping e frente de caixa",
      "Shopping, aeroporto e rodoviária",
      "Rua e praça de alimentação",
    ],
  },
  { rotulo: "Estoque no próprio ponto", valores: [false, true, true] },
  { rotulo: "Vitrine fechada", valores: [false, true, true] },
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
      <span className="sr">não</span>
    </span>
  );
}

export function LojasComparativo() {
  return (
    <>
      <div
        className="cmp-wrap"
        /* Uma caixa que rola precisa ser alcançável pelo teclado: sem `tabIndex`
           e `role`, quem não usa mouse nem toque não chega nas colunas que
           ficaram fora da tela. */
        tabIndex={0}
        role="region"
        aria-label="Comparação dos modelos de unidade — rolável na horizontal"
      >
        {/* Mais larga que o celular, rola na horizontal em vez de empilhar:
            empilhada ela deixa de ser comparação, que é a única razão desta
            seção existir. A coluna de rótulos fica grudada na esquerda para a
            linha continuar identificada durante a rolagem. */}
        <table className="cmp cmp--foto">
          <caption className="sr">
            Comparação dos três modelos de unidade: investimento, área, onde
            costuma ficar e o que muda na operação.
          </caption>
          <thead>
            <tr>
              <td className="cmp-canto" />
              {MODELOS.map((m) => (
                <th
                  key={m.id}
                  scope="col"
                  className="cmp-col"
                  data-destaque={m.id === DESTAQUE ? "1" : undefined}
                >
                  <Ph ratio="5 / 4" label={m.imagem} />
                  {m.id === DESTAQUE ? (
                    <span className="cmp-selo">Menor investimento</span>
                  ) : null}
                  <span className="cmp-nome">
                    <span className="ico">
                      <m.Icone />
                    </span>
                    {m.nome}
                  </span>
                  <span className="cmp-resumo">{m.resumo}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {LINHAS.map((linha) => (
              <tr key={linha.rotulo} data-forte={linha.forte ? "1" : undefined}>
                <th scope="row" className="cmp-rotulo">
                  {linha.rotulo}
                </th>
                {linha.valores.map((v, i) => (
                  <td
                    key={MODELOS[i].id}
                    className="cmp-cel"
                    data-destaque={MODELOS[i].id === DESTAQUE ? "1" : undefined}
                  >
                    <Celula v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* O que NÃO muda de modelo para modelo fica fora da tabela: valor igual
          nas três colunas não é comparação, é repetição que rouba largura de
          quem compara. */}
      <dl className="cmp-comuns">
        {[
          { rotulo: "Payback estimado", valor: "6 a 12 meses" },
          { rotulo: "Royalties", valor: "2,5% do faturamento" },
          { rotulo: "Taxa de marketing", valor: "1% do faturamento" },
          { rotulo: "Ticket médio no totem", valor: "R$ 60 a R$ 100" },
        ].map((l) => (
          <div className="cmp-comum" key={l.rotulo}>
            <dt className="mono">{l.rotulo}</dt>
            <dd>{l.valor}</dd>
          </div>
        ))}
      </dl>

      <p className="cmp-nota">
        O investimento é pago uma vez e já inclui a taxa de franquia, o
        equipamento e o estoque inicial. Royalties e taxa de marketing são iguais
        nos três modelos.
      </p>
    </>
  );
}
