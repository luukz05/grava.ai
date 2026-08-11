/* Os números do contrato.

   Eles viviam dentro da tabela de tipos de ponto, que rola na horizontal.
   Ficavam legíveis parados, mas a seção existe justamente para convidar o
   deslize — e o deslize empurrava os valores para fora da tela, deixando a
   coluna de rótulos sozinha. O gesto que a seção ensina apagava o conteúdo que
   justifica R$ 99.900.

   Aqui eles têm seção própria, âncora própria e hierarquia própria: o
   investimento em escala de manchete e os outros quatro um degrau abaixo. A
   diferença de tamanho é a mensagem — os quatro de baixo só fazem sentido
   depois que o primeiro foi lido.

   O que está escrito aqui é o que o material da franqueadora libera, e nada
   além. Os dois fatos do bloco "o que já está dentro" são os que fazem o
   número encolher na cabeça de quem lê, e estavam fora da página inteira.

   O bloco do valor virou componente próprio (`numeros-quadro.tsx`): ele conta o
   número e revela a composição junto, e para isso precisa de cliente. O que
   ficou aqui é a moldura da seção — cabeçalho, a grade dos quatro percentuais
   e a nota — que continua servidor. */

import { NumerosQuadro } from "./numeros-quadro";

const LINHAS: { rotulo: string; valor: string }[] = [
  { rotulo: "Payback estimado", valor: "6 a 12 meses" },
  { rotulo: "Royalties", valor: "2,5% do faturamento" },
  { rotulo: "Taxa de marketing", valor: "1% do faturamento" },
  { rotulo: "Ticket médio no totem", valor: "R$ 60 a R$ 100" },
];

export function Numeros() {
  return (
    <section className="hold sec num" id="numeros">
      <div className="sec-cab">
        {/* O título dizia "o que custa e em quanto tempo volta", e a seção
            respondia bem a segunda metade e mal a primeira: o número aparecia
            sozinho, com uma frase de rodapé citando duas quantias soltas. A
            pergunta que trava a conversa não é quanto custa — é o que vem
            dentro. O título passou a fazer a pergunta que o bloco responde, e o
            payback continua logo abaixo, na grade. */}
        <h2>
          O que custa <mark>e o que vem dentro.</mark>
        </h2>
        {/* O apoio descrevia a estrutura do bloco — "abaixo está a composição
            e o que vem junto". O bloco já tem dois títulos dizendo isso, cada
            um em cima do grupo que ele nomeia. Legenda de layout não é apoio de
            manchete; o que sobra é o fato que a manchete não cabe. */}
        <p>Um valor só, pago uma vez — e tudo que ele já cobre.</p>
      </div>

      <NumerosQuadro />

      <dl className="num-grade">
        {LINHAS.map((l) => (
          <div className="num-item" key={l.rotulo}>
            <dt className="num-rot mono">{l.rotulo}</dt>
            <dd className="num-val">{l.valor}</dd>
          </div>
        ))}
      </dl>

      <p className="num-nota">
        Os valores são os mesmos em shopping, supermercado ou aeroporto: o que
        muda de um ponto para outro é o público, não o contrato.
      </p>
    </section>
  );
}
