/* Sistema de ícones autoral — traço 1.5, caixa 24, terminais retos,
   vocabulário hexagonal herdado da marca. Nenhum emoji, nenhuma biblioteca.
   Referência de acabamento: os ícones de linha da Linear (9,5 no acervo). */

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/* A marca. Não segue o `base` acima e não deveria: os ícones são traço de 1,5
   numa caixa de 24, a marca é sólido de contorno medido numa caixa de 522×628.
   O que ela tem em comum com eles é o `currentColor` — o tom vem do CSS, porque
   a mesma marca precisa sair clara sobre aço e escura sobre cerâmica.

   Mora aqui porque já era o segundo lugar a desenhar o mesmo caminho: a cena do
   totem tinha uma cópia privada, e o balão de leitura do herói ia ser a
   terceira. Caminho de marca duplicado é marca que muda em um lugar só no dia
   em que o vetor original aparecer.

   A geometria e o porquê de cada número estão em `public/brand/grava-mark.svg`,
   que é a mesma reconstrução — e segue sendo o arquivo a substituir quando o
   original vier. */
export function Marca({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 522 628" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M261 0 522 156.4 522 471.2 261 627.6 0 471.2 0 156.4Z M261 170.8 147 238.8 147 388.8 261 456.8 375 388.8 375 315.3 257 315.3 522 159.8 522 156.4 486 134.8 341 217.8Z"
      />
    </svg>
  );
}

export function IcoTotem({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="3" width="12" height="13" rx="0.5" />
      <path d="M9 7h6M9 10h4" />
      <path d="M8 16v4M16 16v4M5 20h14" />
    </svg>
  );
}

export function IcoOnline({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9z" />
      <path d="M4.5 12h15" />
      <path d="M12 3c2.2 3 2.2 15 0 18M12 3c-2.2 3-2.2 15 0 18" />
    </svg>
  );
}

export function IcoCrm({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 17l4-5 3.5 3L15 8l6 5" />
      <path d="M3 21h18" />
      <path d="M15 5h6v6" />
    </svg>
  );
}

export function IcoEstoque({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8.5L12 4l8 4.5v7L12 20l-8-4.5z" />
      <path d="M4 8.5L12 13l8-4.5M12 13v7" />
    </svg>
  );
}

export function IcoShopping({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 20V9l9-5 9 5v11" />
      <path d="M3 13.5h18" />
      <path d="M8 20v-4h3v4M13 20v-4h3v4" />
    </svg>
  );
}

export function IcoMercado({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 20V7h18v13" />
      <path d="M7 7v13M11 7v13M15 7v13M19 7v13" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IcoAeroporto({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M2 14l20-6-4.5 8-6-1.5z" />
      <path d="M11.5 14.5L10 21l3-3" />
      <path d="M4 21h6" />
    </svg>
  );
}

export function IcoTicket({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8.5V6h18v2.5a2 2 0 000 4V15H3v-2.5a2 2 0 000-4z" />
      <path d="M12 6v2M12 11v2M12 16v-1" />
    </svg>
  );
}

/* O ícone do CTA. Entra onde o do WhatsApp estava — na esfera em que a barra
   do topo condensa o botão, e no flutuante — porque o destino do botão mudou:
   ele não abre conversa nenhuma, ele pede a apresentação que chega por e-mail.
   Marca de aplicativo em botão que não abre aquele aplicativo é promessa
   quebrada no primeiro clique.

   Aba do envelope em V e não em linha reta: na caixa de 24 com traço de 1,5, o
   V é o que se lê como envelope a 20px — que é o tamanho em que ele aparece na
   esfera condensada, o único lugar onde ele fica sozinho, sem rótulo ao lado
   para dizer o que é. */
export function IcoEnvelope({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.75 7.5 12 13.25 20.25 7.5" />
    </svg>
  );
}

/* O par do menu do celular. Os dois desenhos ocupam a MESMA caixa de 24 e
   compartilham o eixo vertical de 12: o botão troca um pelo outro no lugar, e
   qualquer diferença de altura entre eles apareceria como um salto.

   Três traços e não dois: dois lêem como "igual", que é um sinal de matemática.
   As pontas ficam a 4,5 e 19,5 — 1,5 a mais de folga que o padrão da caixa —,
   porque o botão é pequeno (42px) e traço encostando na borda do viewBox fica
   grudado na quina do círculo.

   O X é o mesmo gesto girado: duas diagonais de canto a canto do mesmo
   retângulo que os traços do menu ocupam, então a área de tinta é parecida e o
   peso visual não muda na troca. */
export function IcoMenu({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 7.5h15" />
      <path d="M4.5 12h15" />
      <path d="M4.5 16.5h15" />
    </svg>
  );
}

export function IcoFechar({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 6.5l11 11" />
      <path d="M17.5 6.5l-11 11" />
    </svg>
  );
}

/* Canais do rodapé. Desenhados no mesmo traço dos demais em vez de importados
   de uma biblioteca de logos: são dois ícones, e trazer um pacote inteiro para
   dois desenhos quebraria a coerência de traço do resto da página. */

export function IcoWhatsApp({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 20.5l1.3-4a8 8 0 113.2 3.1z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.6-.8-1 1a5 5 0 01-2.6-2.6l1-1L10.5 9c-.5 0-1 .4-1 1z" />
    </svg>
  );
}

export function IcoTopo({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 19V6" />
      <path d="M6 11.5L12 5.5l6 6" />
    </svg>
  );
}

export function IcoInstagram({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.8 7.2h.01" />
    </svg>
  );
}

/* Marca e traço da tabela comparativa. O traço é o "não se aplica" — nunca um
   X, que leria como defeito do ponto e não como característica dele. */

export function IcoSim({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function IcoNao({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6 12h12" />
    </svg>
  );
}

/* ---------- institucional ----------

   OS SEIS DOS VÉRTICES, REDESENHADOS. Eles vivem nos nós do hexágono da cena
   (`_marca/centro.tsx`), a uns 22px de lado, e nenhum deles sobrevivia a esse
   tamanho: "inovação" era um hexágono com dois traços cruzados dentro,
   "experiência" um retângulo com ondas ao lado, "arte" um pincel de quatro
   segmentos, "jornada" um caminho sinuoso com duas setas. Metáforas que só se
   leem no tamanho em que foram desenhadas — e nenhuma delas era desenhada em
   22px.

   A REGRA QUE PASSOU A VALER: forma CANÔNICA, a mesma que qualquer pessoa já
   viu mil vezes (chip, olho, gráfico subindo, faísca, raio, headset), e no
   máximo duas partes por ícone. Ícone pequeno não é ilustração reduzida: é um
   desenho que precisa ser reconhecido antes de ser lido, e o que faz isso é a
   silhueta, não o detalhe.

   Nenhuma biblioteca, pelo mesmo motivo de sempre: os outros catorze ícones da
   página são deste sistema — traço 1,5, caixa 24, terminais arredondados —, e
   um conjunto importado ao lado deles seria um segundo vocabulário na mesma
   tela. O que mudou aqui foi a ESCOLHA das formas, não o sistema. */

/* Inovação no processo: um chip. Hardware é o que a rede tem de diferente na
   operação, e a silhueta de quadrado com pinos é das mais reconhecíveis que
   existem em tamanho pequeno. */
export function IcoInovacao({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="7" width="10" height="10" rx="1.4" />
      <path d="M10 3.6v3.4M14 3.6v3.4M10 17v3.4M14 17v3.4" />
      <path d="M3.6 10h3.4M3.6 14h3.4M17 10h3.4M17 14h3.4" />
    </svg>
  );
}

/* Experiência imersiva: um olho. A experiência acontece na frente do totem, e
   olho é a forma mais legível que existe para "ver de perto". */
export function IcoExperiencia({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M2.6 12S6.2 5.8 12 5.8 21.4 12 21.4 12 17.8 18.2 12 18.2 2.6 12 2.6 12z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  );
}

/* Rentabilidade real: a linha que sobe com a seta. É o único dos seis que já
   funcionava, e continua igual em espírito — só com menos traços. */
export function IcoRentabilidade({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 16.5l5-5 3.5 3.5L20.5 7" />
      <path d="M15 7h5.5v5.5" />
    </svg>
  );
}

/* Na criação: a faísca dupla. Virou o símbolo universal de "isto foi gerado por
   Inteligência Artificial" — a página inteira ganha com usar o desenho que a
   pessoa já aprendeu em outro lugar, em vez de um pincel que ninguém lê. */
export function IcoArte({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M10.5 3l1.7 4.6 4.6 1.7-4.6 1.7-1.7 4.6-1.7-4.6L4.2 9.3l4.6-1.7z" />
      <path d="M17.8 14.4l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8z" />
    </svg>
  );
}

/* Na produção: o raio. O que a batida afirma é o TEMPO — do conceito ao produto
   gravado em minutos —, e raio é a forma de "na hora" que não precisa de
   legenda. O relógio dentro de um hexágono que estava aqui virava, em 22px, um
   hexágono com sujeira dentro. */
export function IcoTempo({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M13.2 2.5L4.8 13.4h5.6l-.6 8.1 8.4-10.9h-5.6z" />
    </svg>
  );
}

/* No atendimento: o headset. Atendimento tem um desenho canônico e é este; o
   balão de fala, que seria a outra opção, já é o balão da ideia na mesma cena —
   duas coisas diferentes com a mesma forma, a uma tela de distância. */
export function IcoJornada({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 15v-3a7.5 7.5 0 0115 0v3" />
      <rect x="2.6" y="13.8" width="4.2" height="6.2" rx="1.6" />
      <rect x="17.2" y="13.8" width="4.2" height="6.2" rx="1.6" />
      <path d="M19.5 20a2.6 2.6 0 01-2.6 2.6h-2.4" />
    </svg>
  );
}
