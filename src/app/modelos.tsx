/* Os três modelos de unidade — painéis que se abrem.

   ───────────────────────────────────────────────────────────────────────────
   SUBSTITUI A TABELA COMPARATIVA, E O MOTIVO NÃO É ESTÉTICO

   A tabela colocava os três modelos em colunas com um selo em cima de uma delas
   e linhas de sim/não atravessando as outras. Isso é forma de comparação
   ADVERSARIAL — desenhada para eleger um vencedor, como comparativo de plano de
   assinatura. Mas aqui não existe modelo melhor: existe o que cabe no ponto que
   o candidato conseguiu. Um selo "menor investimento" transforma os outros dois
   em consolação, e o quiosque fechado não é a versão cara do aberto.

   Em painéis, cada modelo é ele mesmo. A foto lidera, o detalhe aparece quando
   a pessoa se interessa, e nada na tela diz que um perdeu.

   ───────────────────────────────────────────────────────────────────────────
   O PAINEL FECHADO MOSTRA NOME E PREÇO, E MAIS NADA

   Havia aqui um ícone em bolinha acima do nome e uma linha de resumo abaixo do
   preço ("Ilha no corredor, atendimento pelos quatro lados"). Os dois saíram a
   pedido, e o desenho ficou melhor por dois motivos além do pedido:

   — o ÍCONE não distinguia nada. Os três eram um pictograma genérico de lugar,
     e a foto logo atrás dele já diz o que cada modelo é, com mais precisão do
     que 16px de traço conseguem.
   — o RESUMO já era conteúdo em fuga: ele desaparecia no hover justamente
     porque repetia, pior, o que o detalhe diz melhor. Uma linha que existe para
     sumir assim que a pessoa demonstra interesse é uma linha que a seção não
     precisava ter.

   O que sobra no painel fechado é a hierarquia mínima que a escolha pede: qual
   modelo é, e quanto custa. O resto entra quando o painel abre.

   ───────────────────────────────────────────────────────────────────────────
   VEIO DE UM COMPONENTE DE GALERIA, E FOI PORTADO — NÃO COPIADO

   A referência era React com Tailwind, shadcn e framer-motion. Nenhum dos três
   existe aqui, e os três são caros de trazer: Tailwind e shadcn reescreveriam o
   sistema visual do site por causa de uma seção, e framer-motion seria a SEGUNDA
   biblioteca de animação ao lado do GSAP que já entrou para a cena do totem.

   O que a referência faz de fato é `flex: 1` virando `flex: 2` no item sob o
   cursor, com os irmãos encolhendo. Isso é uma transição de CSS — não precisa de
   biblioteca, não precisa de estado em React, e sai funcionando com teclado de
   graça via `:focus-within`. O componente continua sendo de servidor.

   O que NÃO foi portado: o modal de imagem ampliada. Aqui o conteúdo que
   importa é o detalhe do modelo, e ele cabe dentro do painel aberto — abrir uma
   camada por cima da página para mostrar a mesma foto maior seria um passo a
   mais para chegar à mesma informação.

   ───────────────────────────────────────────────────────────────────────────
   OS VALORES SÃO PROVISÓRIOS

   Estão em `MODELOS`, e em nenhum outro lugar. A franqueadora vai informar os
   definitivos — inclusive o nome do terceiro modelo, que aqui está como "Loja
   compacta" porque ela ainda não nomeou. */

import { Ph } from "./ph";

type Modelo = {
  id: string;
  nome: string;
  /* PROVISÓRIO — aguardando a franqueadora. */
  investimento: string;
  imagem: string;
  detalhes: { rotulo: string; valor: string }[];
};

const MODELOS: Modelo[] = [
  {
    id: "aberto",
    nome: "Quiosque aberto",
    investimento: "R$ 99.900",
    imagem: "Quiosque aberto no corredor",
    detalhes: [
      { rotulo: "Área", valor: "≈ 4 m²" },
      { rotulo: "Onde funciona", valor: "Corredor de shopping e frente de caixa" },
      { rotulo: "Estoque no ponto", valor: "Reposição diária" },
      { rotulo: "Operação", valor: "Uma pessoa" },
    ],
  },
  {
    id: "fechado",
    nome: "Quiosque fechado",
    investimento: "R$ 139.900",
    imagem: "Quiosque fechado com vitrine",
    detalhes: [
      { rotulo: "Área", valor: "≈ 9 m²" },
      { rotulo: "Onde funciona", valor: "Shopping, aeroporto e rodoviária" },
      { rotulo: "Estoque no ponto", valor: "Semana inteira" },
      { rotulo: "Operação", valor: "Uma a duas pessoas" },
    ],
  },
  {
    id: "compacta",
    /* NOME PROVISÓRIO: a franqueadora ainda não batizou o terceiro modelo. */
    nome: "Loja compacta",
    investimento: "R$ 189.900",
    imagem: "Loja compacta com fachada",
    detalhes: [
      { rotulo: "Área", valor: "≈ 18 m²" },
      { rotulo: "Onde funciona", valor: "Rua e praça de alimentação" },
      { rotulo: "Estoque no ponto", valor: "Semana inteira, com reserva" },
      { rotulo: "Operação", valor: "Duas pessoas" },
    ],
  },
];

const COMUNS = [
  { rotulo: "Payback estimado", valor: "6 a 12 meses" },
  { rotulo: "Royalties", valor: "2,5% do faturamento" },
  { rotulo: "Taxa de marketing", valor: "1% do faturamento" },
  { rotulo: "Ticket médio no totem", valor: "R$ 60 a R$ 100" },
];

export function Modelos() {
  return (
    <>
      <div className="mod">
        {MODELOS.map((m) => (
          /* `tabIndex` no painel é o que faz `:focus-within` funcionar: sem ele,
             quem navega por teclado nunca abre nenhum, porque não há link nem
             botão dentro para receber o foco. */
          <article className="mod-painel" key={m.id} tabIndex={0}>
            <div className="mod-foto">
              <Ph ratio="3 / 4" label={m.imagem} />
            </div>

            <div className="mod-corpo">
              <h3 className="mod-nome">{m.nome}</h3>
              <p className="mod-preco">{m.investimento}</p>

              <dl className="mod-detalhes">
                {m.detalhes.map((d) => (
                  <div className="mod-det" key={d.rotulo}>
                    <dt className="mono">{d.rotulo}</dt>
                    <dd>{d.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      {/* O que NÃO muda de modelo para modelo fica fora dos painéis: repetir os
          mesmos quatro valores em três lugares é ruído, não comparação. */}
      <dl className="mod-comuns">
        {COMUNS.map((l) => (
          <div className="mod-comum" key={l.rotulo}>
            <dt className="mono">{l.rotulo}</dt>
            <dd>{l.valor}</dd>
          </div>
        ))}
      </dl>

      <p className="mod-nota">
        O investimento é pago uma vez e já inclui a taxa de franquia, o
        equipamento e o estoque inicial. Royalties e taxa de marketing são iguais
        nos três modelos.
      </p>
    </>
  );
}
