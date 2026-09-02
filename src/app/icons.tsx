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
   Mesmo traço, mesma caixa, mesmo vocabulário hexagonal. Os seis abaixo
   nasceram para a página da marca: pilares, tecnologia e jornada. */

export function IcoInovacao({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9z" />
      <path d="M12 8.5v7M9 10.25l6 3.5M15 10.25l-6 3.5" />
    </svg>
  );
}

export function IcoExperiencia({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="10" height="13" rx="0.5" />
      <path d="M7 8h4" />
      <path d="M14.5 12.5a4.5 4.5 0 013 3M14.5 9a8 8 0 016.5 6.5" />
      <path d="M7 21h10" />
    </svg>
  );
}

export function IcoRentabilidade({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20v-5M9.3 20v-8M14.6 20v-4M20 20V7" />
      <path d="M3 20h18" />
      <path d="M17 4h4v4" />
    </svg>
  );
}

export function IcoArte({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20l6.5-6.5" />
      <path d="M10.5 13.5l3-3 3.5 3.5-3 3z" />
      <path d="M13.5 10.5l3-3 3.5 3.5-3 3" />
      <path d="M4 20h3.5" />
    </svg>
  );
}

export function IcoTempo({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5l7 4v9l-7 4-7-4v-9z" />
      <path d="M12 8v4.3l3 1.8" />
    </svg>
  );
}

export function IcoJornada({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 17h3.5a4 4 0 004-4v-2a4 4 0 014-4H20" />
      <path d="M3 17h2M18.5 5.5L20 7l-1.5 1.5" />
      <path d="M4.5 15.5L3 17l1.5 1.5" />
    </svg>
  );
}
