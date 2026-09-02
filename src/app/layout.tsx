import type { Metadata, Viewport } from "next";
import "./reset.css";
import { SITE_URL, SITE_NOME, WHATSAPP_E164, INSTAGRAM } from "./site";

/* AQUI MORAVAM O TÍTULO E A DESCRIÇÃO DA LANDING, de volta ao tempo em que ela
   era a home e o layout podia se confundir com ela. Com `/` servindo a página
   da marca e a captação em `/seja-franqueado`, cada rota declara os seus — o
   layout ficou só com o que é de todas.

   O que resta é `metadataBase`, o nome do site e um título de reserva. Sem
   `title.template`: as quatro páginas já abrem com "GRAVA.AI —", e um template
   que acrescentasse a marca no fim daria "GRAVA.AI — … | GRAVA.AI". O que fica
   é o `default`, que só aparece se alguma rota futura esquecer de declarar o
   seu — melhor o nome da marca do que o título vazio. */
export const metadata: Metadata = {
  /* Sem `metadataBase` o Next emite as URLs de Open Graph relativas, e URL
     relativa em meta tag não resolve em lugar nenhum: o card do WhatsApp e do
     Instagram sai quebrado. Também é daqui que as canônicas de cada rota tiram
     o domínio. */
  metadataBase: new URL(SITE_URL),
  title: SITE_NOME,
  /* Não existe `keywords` aqui de propósito. A meta tag de palavras-chave é
     ignorada pelo Google desde 2009 — ele publicou um post só para dizer isso,
     porque a tag é preenchida pelo dono do site e por isso não vale como sinal.
     As palavras que importam entram no título, no H1, no texto e nas perguntas
     do FAQ, onde o buscador as lê no contexto. O mapa de termos por página está
     em `docs/palavras-chave.md`. */
  openGraph: {
    siteName: SITE_NOME,
    locale: "pt_BR",
    type: "website",
  },
  /* Sem imagem de OG: não existe ativo real e inventar um contraria a mesma
     regra que mantém números e depoimentos fora da página. Entra quando houver
     foto ou composição própria. */
};

/* `viewportFit: "cover"` é o que faz as variáveis `env(safe-area-inset-*)`
   receberem valor no iPhone. Sem ele a barra fixa do rodapé calcula folga zero
   e encosta no indicador de home. */
/* `colorScheme: "dark"` é o que faz o navegador pintar de escuro tudo que não
   passa pelo CSS da página: a barra de rolagem, o fundo além do documento no
   overscroll, os controles nativos de formulário e o autofill. O site é
   dark-only — não existe chave de tema nem tema salvo —, então isso é uma
   afirmação, não uma preferência. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Um tema só. Aqui existia `data-tema` mais um script bloqueante que lia o
       tema salvo antes do primeiro paint — a máquina inteira de toggle claro/
       escuro. Com o site dark-only não sobra estado nenhum para restaurar, e
       sem divergência entre servidor e cliente também não é preciso
       `suppressHydrationWarning`. */
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        {/* Quem é a organização, em dados. É o que permite ao Google ligar o
            site à marca em vez de tratá-lo como mais um domínio com texto — e é
            o que alimenta o painel lateral quando alguém busca "GRAVA.AI".

            Só campos verificáveis: nome, tagline, endereço do site, logo e os
            dois canais que a rede publica. Sem `aggregateRating`, sem número de
            unidades, sem `foundingDate` — dado estruturado inventado é a via
            mais rápida para uma ação manual de spam, porque ali a afirmação é
            legível por máquina e fica registrada. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NOME,
              url: SITE_URL,
              logo: `${SITE_URL}/brand/grava-stacked.png`,
              slogan: "Transformando ideias em produtos personalizados.",
              description:
                "Personalização de produtos com inteligência artificial em totens automatizados, operada por rede de franquias.",
              sameAs: [INSTAGRAM],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: WHATSAPP_E164,
                contactType: "sales",
                areaServed: "BR",
                availableLanguage: "Portuguese",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
