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
import { IcoShopping, IcoMercado, IcoAeroporto } from "./icons";

type Modelo = {
  id: string;
  nome: string;
  resumo: string;
  /* PROVISÓRIO — aguardando a franqueadora. */
  investimento: string;
  imagem: string;
  detalhes: { rotulo: string; valor: string }[];
  Icone: (p: { className?: string }) => React.ReactElement;
};

const MODELOS: Modelo[] = [
  {
    id: "aberto",
    nome: "Quiosque aberto",
    resumo: "Ilha no corredor, atendimento pelos quatro lados.",
    investimento: "R$ 99.900",
    imagem: "Quiosque aberto no corredor",
    Icone: IcoShopping,
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
    resumo: "Cabine com vitrine, estoque e balcão próprios.",
    investimento: "R$ 139.900",
    imagem: "Quiosque fechado com vitrine",
    Icone: IcoMercado,
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
    resumo: "Ponto com porta, para praça de maior permanência.",
    investimento: "R$ 189.900",
    imagem: "Loja compacta com fachada",
    Icone: IcoAeroporto,
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
              <span className="mod-ico" aria-hidden="true">
                <m.Icone />
              </span>

              <h3 className="mod-nome">{m.nome}</h3>
              <p className="mod-preco">{m.investimento}</p>

              {/* Some quando o painel abre: com o detalhe na tela, o resumo vira
                  a mesma informação dita duas vezes. */}
              <p className="mod-resumo">{m.resumo}</p>

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
