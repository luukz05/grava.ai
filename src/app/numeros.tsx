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
   número encolher na cabeça de quem lê, e estavam fora da página inteira. */

const LINHAS: { rotulo: string; valor: string }[] = [
  { rotulo: "Payback estimado", valor: "6 a 12 meses" },
  { rotulo: "Royalties", valor: "2,5% do faturamento" },
  { rotulo: "Taxa de marketing", valor: "1% do faturamento" },
  { rotulo: "Ticket médio no totem", valor: "R$ 60 a R$ 100" },
];

export function Numeros() {
  return (
    <section className="hold sec num" id="numeros">
      <div className="num-topo">
        <h2>O que custa e em quanto tempo volta.</h2>
        <p>
          Um valor só, com o que já vem dentro dele. Nada aqui é cobrado
          depois, e a plataforma de IA que opera a unidade está inclusa na
          operação — não é assinatura à parte.
        </p>
      </div>

      <div className="num-destaque">
        <span className="num-rot mono">Investimento total</span>
        <strong className="num-val">R$ 99.900</strong>
        <p className="num-inclui">
          A taxa de franquia de <strong>R$ 35.000</strong> já está aí dentro, e
          com ela cerca de <strong>R$ 15.000</strong> em equipamentos e no
          estoque inicial da unidade.
        </p>
      </div>

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
