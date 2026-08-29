"use client";

/* O quadro do investimento: o número contando e o que ele cobre, ao lado.

   POR QUE ISTO É CLIENTE, e o resto da landing não é.

   A página inteira reage à rolagem por CSS, sem uma linha de JavaScript. Aqui
   não dá, e a razão é de correção e não de gosto: uma contagem presa à
   `animation-timeline: view()` é raspada pela posição da rolagem, então quem
   para no meio da faixa vê o número parado num valor que não é o preço. Seria
   o número mais importante da página exibindo R$ 61.400 porque a pessoa parou
   de rolar. Contagem tem que disparar uma vez, andar no próprio tempo e
   aterrissar no valor certo — e isso, hoje, não existe em CSS.

   O observador é o mesmo padrão do índice: dispara na entrada e desconecta. Sem
   ouvinte de rolagem.

   O número não passa por estado do React. Um `setState` por quadro seriam ~72
   renderizações da seção inteira durante a contagem; o texto é escrito direto
   no nó por `ref`, e o React só é acionado quando muda quantas parcelas estão
   reveladas — no máximo três vezes. */

import { useEffect, useRef, useState } from "react";

const TOTAL = 99900;
const DURACAO = 1200;

const real = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/* As parcelas aparecem quando a contagem passa pelo valor delas: o recibo se
   preenche enquanto o total sobe. Não é enfeite sincronizado por acaso — é a
   mesma informação contada de dois jeitos ao mesmo tempo, e é isso que faz
   entender de onde vem o número em vez de só ver ele crescer.

   `limiar` é acumulado, não o valor da linha: a segunda parcela aparece aos
   50.000 porque é aí que a soma dela com a primeira fecha. */
type Parcela = {
  rotulo: string;
  valor: string;
  nota: string;
  limiar: number;
  pendente?: boolean;
};

const PARCELAS: Parcela[] = [
  {
    rotulo: "Taxa de franquia",
    valor: "R$ 35.000",
    nota: "O direito de operar a marca. Já está dentro do total, não vem depois.",
    limiar: 35000,
  },
  {
    rotulo: "Equipamentos e estoque inicial",
    valor: "≈ R$ 15.000",
    nota: "A unidade montada e abastecida para o primeiro dia de operação.",
    limiar: 50000,
  },
  /* O material da franqueadora fecha R$ 50.000 dos R$ 99.900 e não detalha o
     resto. A subtração é aritmética em cima dos números dela; a composição
     desses R$ 49.900 é dado que a rede precisa fornecer.

     Fica como slot declarado e não como linha inventada, pelo mesmo motivo que
     as imagens desta página são placeholders rotulados: uma landing de captação
     que erra a composição do próprio preço perde a conversa no primeiro
     "e o resto, é o quê?". */
  {
    rotulo: "Restante do pacote",
    valor: "R$ 49.900",
    nota: "Composição a detalhar com a franqueadora.",
    limiar: TOTAL,
    pendente: true,
  },
];

/* Sem valor ao lado de propósito: estes não são parcelas do preço, são coisas
   que já vêm dentro dele. Pôr número aqui faria a soma não fechar e
   transformaria benefício em cobrança. Todos saem do material da rede. */
const JUNTOS: { titulo: string; texto: string }[] = [
  {
    titulo: "A plataforma de IA que opera a unidade",
    texto: "Inclusa na operação. Não é assinatura à parte nem custo mensal.",
  },
  {
    titulo: "Distribuição centralizada",
    texto: "Produtos e matéria-prima saem da matriz, sem caçar fornecedor.",
  },
  {
    titulo: "Estoque inteligente",
    texto: "A plataforma monitora o consumo e avisa a hora da reposição.",
  },
  {
    titulo: "A matriz acompanhando em tempo real",
    texto: "O CRM mostra a unidade para a rede sem você montar relatório.",
  },
  {
    titulo: "Padrão de qualidade da rede",
    texto: "Definido e mantido pela franqueadora, igual em todas as unidades.",
  },
];

/* Desaceleração forte: a contagem tem que sair rápido e aterrissar, não subir
   em velocidade constante. Quártica e não cúbica porque o fim precisa ser
   nitidamente mais lento que o meio — é o pouso no valor final que faz o
   número parecer que chegou em vez de ter sido interrompido. */
function saida(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function NumerosQuadro() {
  /* Quantas parcelas já foram alcançadas pela contagem, e se ela terminou. Os
     benefícios entram depois do pouso: são outra coisa, e misturar os dois
     grupos no mesmo gatilho faria parecer que eles também são parcelas. */
  const [parcelas, setParcelas] = useState(PARCELAS.length);
  const [pousou, setPousou] = useState(true);
  const valorRef = useRef<HTMLSpanElement>(null);
  const quadroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alvo = quadroRef.current;
    if (!alvo) return;

    /* Movimento reduzido: o quadro já nasce no estado final e nada roda. O
       valor não é enfeite — ele precisa estar certo e legível de qualquer
       jeito, então o que sai é a contagem, não o número. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let quadro = 0;
    let inicio = 0;
    /* Quantas linhas já foram reveladas, guardado fora do React. É o que
       permite comparar antes de avisar: sem isso o `setState` seria chamado em
       todo quadro, e mesmo com o React descartando os valores repetidos são 72
       agendamentos para três mudanças reais. */
    let reveladas = 0;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        /* Uma vez só. A contagem é explicação, não indicador de estado: repetir
           a cada passagem pela seção viraria ruído para quem sobe e desce a
           página comparando os números. */
        observador.disconnect();

        setParcelas(0);
        setPousou(false);

        const passo = (agora: number) => {
          if (!inicio) inicio = agora;
          const t = Math.min(1, (agora - inicio) / DURACAO);
          const v = Math.round(TOTAL * saida(t));

          if (valorRef.current) valorRef.current.textContent = `R$ ${real.format(v)}`;

          /* Avisa o React só quando o número de linhas reveladas muda de
             verdade — três vezes na contagem inteira. */
          const alcancadas = PARCELAS.filter((p) => v >= p.limiar).length;
          if (alcancadas > reveladas) {
            reveladas = alcancadas;
            setParcelas(alcancadas);
          }

          if (t < 1) {
            quadro = requestAnimationFrame(passo);
          } else {
            setPousou(true);
          }
        };

        /* O nó só vai a zero aqui, no quadro anterior ao início da contagem.
           Zerar na montagem deixaria "R$ 0" no documento de quem nunca chega a
           esta seção — e é o valor que decide a página. */
        if (valorRef.current) valorRef.current.textContent = "R$ 0";
        quadro = requestAnimationFrame(passo);
      },
      /* Só quando o quadro está de fato sendo olhado, não quando encosta a
         primeira linha na borda de baixo da tela. */
      { threshold: 0.35 }
    );

    observador.observe(alvo);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <>
    <div className="num-quadro" ref={quadroRef}>
      {/* `data-pousou` acende enquanto a contagem corre e apaga quando ela
          chega. O halo do cartão vive nesse atributo — ver `.num-face` no
          `v5.css`. Ele nasce ligado, como o resto: sem JavaScript, com
          movimento reduzido ou antes da hidratação, o cartão está no estado
          final e nada pulsa. */}
      <div className="num-face" data-pousou={pousou ? "1" : undefined}>
        <span className="num-rot mono">Investimento total</span>
        {/* Só `num-conta`: o `num-val` que existia aqui perdeu as regras junto
            com o `.num-destaque`, e classe sem regra é pista falsa. O `.num-val`
            continua vivo na grade dos quatro percentuais, com escopo próprio. */}
        <strong className="num-conta">
          {/* O valor verdadeiro, sempre, para leitor de tela: o nó que conta é
              `aria-hidden` porque durante a contagem ele carrega um número que
              não é o preço, e ninguém pode ouvir "R$ 61.400" desta página. */}
          <span className="sr">R$ 99.900</span>
          <span aria-hidden="true" ref={valorRef}>
            R$ 99.900
          </span>
        </strong>
        <p className="num-face-nota">
          Um valor só, pago uma vez à rede. O que vem depois dele são os
          percentuais sobre faturamento — e só eles.
        </p>
      </div>

      <div className="num-composicao">
        <h3 className="num-titulo mono">O que esse valor cobre</h3>
        <ol className="num-parcelas">
          {PARCELAS.map((p, i) => (
            <li
              key={p.rotulo}
              data-visivel={i < parcelas ? "1" : undefined}
              data-pendente={p.pendente ? "1" : undefined}
            >
              <span className="num-parcela-rot">{p.rotulo}</span>
              <span className="num-parcela-val">{p.valor}</span>
              <span className="num-parcela-nota">{p.nota}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>

    {/* Fora do quadro de duas colunas, e é uma decisão de leitura, não de
        arrumação. Estas cinco não são parcelas do preço: são o que a rede já
        entrega sem cobrar à parte. Dentro da coluna da direita elas viravam a
        continuação da lista de cima — mesma largura, mesmo empilhamento, e a
        pessoa lia dez itens de um assunto só, sendo que a virada de assunto é o
        argumento inteiro do bloco.

        Aqui embaixo, na largura da página e lado a lado, elas leem como o que
        são: uma faixa de cinco coisas de mesmo peso, nenhuma delas com preço. E
        a seção deixa de ser uma coluna de dez itens de altura. */}
    <div className="num-juntos-bloco">
      <h3 className="num-titulo mono">E o que já vem junto, sem custo à parte</h3>
      <ul className="num-juntos" data-visivel={pousou ? "1" : undefined}>
        {JUNTOS.map((j) => (
          <li key={j.titulo}>
            <span className="num-junto-tit">{j.titulo}</span>
            <span className="num-junto-txt">{j.texto}</span>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
