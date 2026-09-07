/* Os três modelos de unidade — painéis de foto com nome e preço.

   ───────────────────────────────────────────────────────────────────────────
   SUBSTITUI A TABELA COMPARATIVA, E O MOTIVO NÃO É ESTÉTICO

   A tabela colocava os três modelos em colunas com um selo em cima de uma delas
   e linhas de sim/não atravessando as outras. Isso é forma de comparação
   ADVERSARIAL — desenhada para eleger um vencedor, como comparativo de plano de
   assinatura. Mas aqui não existe modelo melhor: existe o que cabe no ponto que
   o candidato conseguiu. Um selo "menor investimento" transforma os outros dois
   em consolação, e o quiosque fechado não é a versão cara do aberto.

   Em painéis, cada modelo é ele mesmo. A foto lidera e nada na tela diz que um
   perdeu.

   ───────────────────────────────────────────────────────────────────────────
   O PAINEL MOSTRA NOME E PREÇO, E MAIS NADA

   Passaram por aqui um ícone em bolinha acima do nome, uma linha de resumo
   abaixo do preço e — até agora — uma ficha de quatro linhas que aparecia no
   hover: área, onde funciona, estoque no ponto e operação. Os três saíram a
   pedido, nesta ordem.

   A FICHA foi a última, e o que ela deixa para trás merece registro porque é
   informação que existia e agora não existe em lugar nenhum do site:

     Quiosque aberto    ≈ 4 m²  · corredor de shopping e frente de caixa ·
                        reposição diária · uma pessoa
     Quiosque fechado   ≈ 9 m²  · shopping, aeroporto e rodoviária ·
                        estoque para a semana · uma a duas pessoas
     Loja compacta      ≈ 18 m² · rua e praça de alimentação ·
                        semana inteira com reserva · duas pessoas

   Eram números PROVISÓRIOS, nunca confirmados pela franqueadora — o que já era
   razão para não deixá-los na página sem revisão. Se voltarem, voltam daqui.

   O que sobra é a hierarquia mínima que a escolha pede: qual modelo é, e quanto
   custa. As duas linhas ficam no pé do painel, à esquerda, sobre a foto.

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

   O GESTO SOBREVIVEU À FICHA, e não por inércia: sem ela o painel que cresce
   deixa de revelar texto e passa a revelar FOTO — o modelo sob o cursor mostra
   mais da unidade e os irmãos cedem espaço. É o mesmo gesto servindo ao que
   restou na tela, que é a imagem.

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
};

const MODELOS: Modelo[] = [
  {
    id: "aberto",
    nome: "Quiosque aberto",
    investimento: "R$ 99.900",
    imagem: "Quiosque aberto no corredor",
  },
  {
    id: "fechado",
    nome: "Quiosque fechado",
    investimento: "R$ 139.900",
    imagem: "Quiosque fechado com vitrine",
  },
  {
    id: "compacta",
    /* NOME PROVISÓRIO: a franqueadora ainda não batizou o terceiro modelo. */
    nome: "Loja compacta",
    investimento: "R$ 189.900",
    imagem: "Loja compacta com fachada",
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
