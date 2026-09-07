/* As perguntas frequentes da franquia — o conteúdo e o acordeão que o mostra.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE OS DOIS NO MESMO ARQUIVO

   Mesma escolha de `modelos.tsx`: os dados existem para esta seção e para mais
   nada, e separá-los num módulo próprio criaria dois arquivos que só são
   editados juntos. Quem consome importa `Faq` e a lista; ninguém precisa saber
   que o `.faq.css` existe.

   ELES MORAVAM DENTRO DE `perguntas/page.tsx`, e essa rota não existe mais: o
   FAQ virou uma seção da landing (`#duvidas`), abaixo dos três modelos, a
   pedido. `/perguntas` redireciona para lá — ver `next.config.ts`.

   ───────────────────────────────────────────────────────────────────────────
   REGRA DE CONTEÚDO, QUE VALE MAIS QUE O RESTO

   Nenhuma resposta aqui inventa fato. Todas saem do material da franqueadora
   (`docs/brand-and-content.md`, transcrito da apresentação de 7 slides) ou do
   que a própria landing já afirma. Onde a rede não forneceu dado, a pergunta
   não existe — FAQ é justamente onde a tentação de preencher lacuna com
   estimativa é maior, e é onde ela custa mais caro: resposta errada aqui vira
   resposta errada no resultado do Google, com a marca assinando embaixo.

   Antes de publicar: a franqueadora precisa revisar e confirmar cada resposta.

   ───────────────────────────────────────────────────────────────────────────
   CINCO, E O CRITÉRIO DE CORTE

   Eram doze, herdadas de quando `/perguntas` era uma página inteira. Numa
   página que já responde, pergunta que repete o que está três seções acima não
   é reforço — é a página duvidando de si mesma na frente de quem lê.

   O critério é um só: SÓ ENTRA O QUE A PÁGINA NÃO RESPONDE EM OUTRO LUGAR.

   O que saiu, e onde a resposta já estava:

   - "Quanto custa a franquia" — os três valores estão na tabela de `modelos.tsx`
     e o de abertura em escala de manchete em `numeros-quadro.tsx`.
   - "Existe taxa mensal" e "Qual o ticket médio" — a grade de `numeros.tsx`
     traz royalties, taxa de marketing e ticket, com os mesmos números.
   - "Os valores mudam conforme o tipo de ponto" — é literalmente a nota de
     rodapé da seção dos números.
   - "A plataforma de IA é cobrada à parte" — o bloco "o que já vem junto" de
     `numeros-quadro.tsx` responde com estas palavras.
   - "Onde a unidade pode ser instalada" — o mapa de unidades é uma seção
     inteira, e cada modelo lista o seu "onde funciona".
   - "Como faço para abrir uma unidade" — o formulário logo abaixo diz o que
     acontece depois do envio, no lugar em que a pessoa envia.

   O QUE FICOU não é o resto: é o que a página deixa em aberto. Uma é a ressalva
   do payback — o número está na grade, a ressalva de que ele é estimativa e não
   garantia não está em lugar nenhum, e é ela que protege a rede de uma promessa
   de retorno. As outras quatro são as objeções de quem já aceitou o preço e
   agora quer saber se CONSEGUE tocar isso: o ponto, a habilidade técnica, o
   fornecedor e o próprio tempo.

   A ordem é a de quem está avaliando — dinheiro, ponto, operação — e termina em
   "preciso estar na loja todos os dias", que é a última coisa entre a pessoa e
   o formulário. */

import "./faq.css";

/* A resposta é texto puro, e não JSX, porque ela é usada duas vezes: na página
   e dentro do JSON-LD. Duas fontes para a mesma frase é a receita para o dado
   estruturado divergir do que a página mostra — e isso o Google trata como
   marcação enganosa, não como descuido. */
export type Pergunta = { q: string; a: string };

/* Houve aqui um `GRUPOS` com quatro títulos — dinheiro, ponto, operação, como
   começar — achatado num `TODAS` na linha seguinte. Os títulos nunca chegaram à
   página: dentro de uma seção que já tem `<h2>`, quatro subtítulos com uma a
   seis perguntas cada quebrariam o acordeão em pedaços curtos demais. Eles eram
   a ordem de leitura, e só. Com cinco perguntas, três delas do mesmo grupo, o
   agrupamento virou uma estrutura de dados a mais para dizer o que a ordem da
   lista já diz sozinha. */
export const TODAS: Pergunta[] = [
  {
    /* A ÚNICA DE DINHEIRO QUE SOBROU, e ela não repete o número: repete a
       ressalva. "6 a 12 meses" está na grade de `numeros.tsx` sem nenhuma
       qualificação, e uma estimativa de retorno sem a palavra "estimativa" ao
       lado é o tipo de frase que a rede não quer ter escrito. */
    q: "O payback de 6 a 12 meses é garantido?",
    a: "Não. É a estimativa da franqueadora, não uma garantia de retorno — o resultado depende do ponto, do fluxo e da operação da unidade.",
  },
  {
    /* A seção que comparava os três tipos de ponto foi extinta quando o preço
       passou a variar por modelo, e não por local. A comparação continua sendo
       uma pergunta que o candidato faz — e agora este é o único lugar da página
       em que ela existe. */
    q: "Qual tipo de ponto funciona melhor?",
    a: "Cada um funciona de um jeito. O shopping tem fluxo alto e constante, com pico no fim de semana; o supermercado traz o mesmo cliente toda semana; o aeroporto tem público de fora da cidade e tempo de espera longo. O que muda é o tempo que a pessoa tem e o motivo de ela estar ali.",
  },
  {
    /* A cena do percurso MOSTRA a IA desenhando e o laser gravando; ela em
       nenhum momento diz que o franqueado não precisa saber fazer isso. É a
       diferença entre exibir e afirmar, e esta é a objeção número um de quem
       nunca operou nada parecido. */
    q: "Preciso saber desenhar ou operar máquina de gravação?",
    a: "Não. A arte é gerada na hora pela inteligência artificial, a partir do que o cliente descreve no totem, e a gravação é feita ali mesmo. É a diferença central para uma loja de gravação tradicional, onde alguém precisa saber desenhar e operar o programa.",
  },
  {
    /* "Distribuição centralizada" e "estoque inteligente" aparecem no bloco dos
       números como duas linhas de seis palavras, dentro de uma lista sobre o
       que o investimento cobre. O que elas não têm espaço para dizer ali é o
       COMO — e é o como que responde o medo de virar comprador de matéria-prima
       em vez de dono de unidade. */
    q: "Quem cuida do estoque e dos fornecedores?",
    a: "A distribuição é centralizada: produtos e matéria-prima saem da matriz, sem o franqueado precisar buscar fornecedor ou negociar preço. A plataforma monitora o consumo da unidade e avisa a hora da reposição.",
  },
  {
    /* A ÚLTIMA DE PROPÓSITO: é a pergunta que decide se a pessoa preenche o
       formulário que vem logo abaixo. Quem está avaliando uma segunda renda
       para em "e o meu emprego?" antes de parar em qualquer outra coisa. */
    q: "Preciso estar na loja todos os dias?",
    a: "Não. A operação foi desenhada para rodar sem depender da presença do franqueado: a IA atende no totem, a matriz acompanha a unidade em tempo real pelo CRM e o padrão de qualidade é definido e mantido pela rede.",
  },
];

/* O acordeão.

   `<details>` nativo, e não acordeão em React: abre sem JavaScript, é acessível
   por teclado de fábrica e o Ctrl+F do navegador acha texto dentro dele mesmo
   fechado. O rastreador também lê o conteúdo fechado — o que importa aqui é que
   ninguém precisa clicar para o Google enxergar a resposta.

   A pergunta é `<h3>` porque a seção que a contém é `<h2>`. Houve aqui um
   parâmetro `nivel` para alternar com `<h4>`, de quando `/perguntas` existia e
   punha um `<h2>` em cada grupo — com um consumidor só ele virou configuração
   que ninguém configura. O `.faq.css` continua aceitando os dois (`:is(h3, h4)`),
   e é lá que o dia de precisar do outro nível fica barato. */
export function Faq({ perguntas }: { perguntas: Pergunta[] }) {
  return (
    <div className="faq">
      {perguntas.map((p) => (
        <details className="faq-item" key={p.q}>
          <summary>
            <h3>{p.q}</h3>
            <span className="faq-sinal" aria-hidden="true" />
          </summary>
          <p>{p.a}</p>
        </details>
      ))}
    </div>
  );
}
