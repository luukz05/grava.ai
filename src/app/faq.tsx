/* As perguntas frequentes da franquia — o conteúdo e o acordeão que o mostra.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE OS DOIS NO MESMO ARQUIVO

   Mesma escolha de `modelos.tsx`: os dados existem para esta seção e para mais
   nada, e separá-los num módulo próprio criaria dois arquivos que só são
   editados juntos. Quem consome importa `Faq` e uma das listas; ninguém precisa
   saber que o `.faq.css` existe.

   ELES MORAVAM DENTRO DE `perguntas/page.tsx`, e essa rota não existe mais: o
   FAQ virou uma seção da landing (`#duvidas`), abaixo dos três modelos, a
   pedido. `/perguntas` redireciona para lá — ver `next.config.ts`.

   O módulo continua existindo apesar de ter um consumidor só, e não é inércia:
   `landing.tsx` já tem 300 linhas, e as doze respostas são o conteúdo mais
   sensível do site — o que a franqueadora precisa revisar linha a linha antes
   de publicar. Elas merecem um arquivo em que se ache isso sem rolar por uma
   página inteira de seções.

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
   AS DOZE, E NÃO UM RECORTE

   Houve aqui um campo `destaque`, marcando seis para a landing mostrar e
   deixando as outras seis para `/perguntas`. O critério era bom — não repetir
   em forma de pergunta o que a tabela dos modelos já responde duas seções
   acima — e ele morreu com a rota: sem uma segunda página, "não mostrar" virou
   "apagar do site".

   O que se perderia não era redundância. "O payback de 6 a 12 meses é uma
   estimativa da franqueadora, não uma garantia de retorno" é a ressalva que
   protege a rede de uma promessa de retorno, e ela só existe aqui. Some junto o
   que a taxa de franquia inclui, o ticket médio e onde a unidade pode ser
   instalada.

   O custo de trazer as doze é pequeno porque o acordeão nasce fechado: uma
   pergunta a mais é uma linha a mais, não um parágrafo a mais. A ordem é a de
   leitura de quem está avaliando — dinheiro, ponto, operação — e termina em
   "como faço para abrir uma unidade", que é a pergunta que entrega o
   formulário logo abaixo. */

import "./faq.css";

/* A resposta é texto puro, e não JSX, porque ela é usada duas vezes: na página
   e dentro do JSON-LD. Duas fontes para a mesma frase é a receita para o dado
   estruturado divergir do que a página mostra — e isso o Google trata como
   marcação enganosa, não como descuido. */
export type Pergunta = { q: string; a: string };

export const GRUPOS: { titulo: string; perguntas: Pergunta[] }[] = [
  {
    titulo: "Dinheiro",
    perguntas: [
      {
        /* REESCRITA EM 04/09/2026, e não por estilo: ela dizia "o investimento
           total é de R$ 99.900" e "a taxa de franquia de R$ 35.000 já está
           dentro desse valor, e com ela cerca de R$ 15.000 em equipamentos e no
           estoque inicial". Isso era verdade enquanto existia um preço só.

           `modelos.tsx` passou a ter três, e a resposta antiga contradizia a
           tabela que fica na mesma página, dois blocos acima. Os valores vêm de
           lá — `MODELOS` é a fonte da verdade — e a abertura ("R$ 99.900") virou
           a menor das três.

           O QUE SAIU E PRECISA VOLTAR: a divisão de R$ 35.000 de taxa de
           franquia e ~R$ 15.000 de equipamento e estoque. Ela era do tempo do
           preço único, e não dá para afirmar que vale igual nos três modelos
           sem a franqueadora dizer. Perguntar antes de publicar. */
        q: "Quanto custa a franquia GRAVA.AI?",
        a: "Depende do modelo de unidade: R$ 99.900 no quiosque aberto, R$ 139.900 no quiosque fechado e R$ 189.900 na loja compacta. O valor é pago uma vez e já inclui a taxa de franquia, o equipamento e o estoque inicial da unidade.",
      },
      {
        q: "Em quanto tempo o investimento volta?",
        a: "O payback estimado pela rede é de 6 a 12 meses. É uma estimativa da franqueadora, não uma garantia de retorno — o resultado depende do ponto, do fluxo e da operação.",
      },
      {
        q: "Existe taxa mensal?",
        a: "Sim: royalties de 2,5% e taxa de marketing de 1%, ambos sobre o faturamento bruto. Não há mensalidade fixa, e a plataforma de IA que opera a unidade não é cobrada à parte.",
      },
      {
        q: "Qual o ticket médio de uma peça?",
        a: "Entre R$ 60 e R$ 100, segundo o material da rede. É o valor de uma peça personalizada e gravada na hora, no totem.",
      },
      {
        /* Mesma correção da primeira: o investimento passou a variar, só que
           por MODELO e não por tipo de ponto. A pergunta continua fazendo
           sentido — é a que o candidato faz — e agora ela separa as duas coisas
           em vez de negar as duas. */
        q: "Os valores mudam conforme o tipo de ponto?",
        a: "Não. O que muda o investimento é o modelo de unidade, não onde ela fica: o mesmo quiosque aberto custa o mesmo em shopping, supermercado ou aeroporto. Royalties de 2,5% e taxa de marketing de 1% são iguais nos três modelos.",
      },
      {
        q: "A plataforma de IA é cobrada à parte?",
        a: "Não. Ela está inclusa na operação — não é assinatura separada nem custo mensal.",
      },
    ],
  },
  {
    titulo: "O ponto",
    perguntas: [
      {
        q: "Onde a unidade pode ser instalada?",
        a: "Em locais de alto fluxo: shopping centers, supermercados e hipermercados de grande porte, e aeroportos. A unidade ocupa pouca área e vive da circulação que o ponto já tem.",
      },
      {
        q: "Qual tipo de ponto funciona melhor?",
        a: "Cada um funciona de um jeito. O shopping tem fluxo alto e constante, com pico no fim de semana; o supermercado traz o mesmo cliente toda semana; o aeroporto tem público de fora da cidade e tempo de espera longo. O que muda é o tempo que a pessoa tem e o motivo de ela estar ali.",
      },
    ],
  },
  {
    titulo: "A operação",
    perguntas: [
      {
        q: "Preciso saber desenhar ou operar máquina de gravação?",
        a: "Não. A arte é gerada na hora pela inteligência artificial, a partir do que o cliente descreve no totem, e a gravação é feita ali mesmo. É a diferença central para uma loja de gravação tradicional, onde alguém precisa saber desenhar e operar o programa.",
      },
      {
        q: "Quem cuida do estoque e dos fornecedores?",
        a: "A distribuição é centralizada: produtos e matéria-prima saem da matriz, sem o franqueado precisar buscar fornecedor ou negociar preço. A plataforma monitora o consumo da unidade e avisa a hora da reposição.",
      },
      {
        q: "Preciso estar na loja todos os dias?",
        a: "Não. A operação foi desenhada para rodar sem depender da presença do franqueado: a IA atende no totem, a matriz acompanha a unidade em tempo real pelo CRM e o padrão de qualidade é definido e mantido pela rede.",
      },
    ],
  },
  {
    titulo: "Como começar",
    perguntas: [
      {
        q: "Como faço para abrir uma unidade?",
        a: "Você recebe a apresentação demonstrativa da franquia por e-mail assim que preenche o formulário. Em seguida, quem opera a rede chama no seu WhatsApp para seguir a conversa — não é um atendente.",
      },
    ],
  },
];

/* A lista achatada, e é ela que a landing renderiza. Os quatro títulos de
   `GRUPOS` continuam existindo porque são a ordem de leitura — dinheiro, ponto,
   operação, como começar —, mas não viram cabeçalho na página: dentro de uma
   seção que já tem `<h2>`, quatro subtítulos com uma a seis perguntas cada
   quebrariam o acordeão em quatro pedaços curtos, e o de "Como começar" teria
   um item só. A ordem entrega o agrupamento sem precisar anunciá-lo. */
export const TODAS: Pergunta[] = GRUPOS.flatMap((g) => g.perguntas);

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
