import type { Metadata, Viewport } from "next";
import "./reset.css";
import { SITE_URL, SITE_NOME, WHATSAPP_E164, INSTAGRAM } from "./site";

export const metadata: Metadata = {
  /* Faltava, e é a peça que faz todo o resto valer. Sem `metadataBase` o Next
     emite as URLs de Open Graph relativas, e URL relativa em meta tag não
     resolve em lugar nenhum: o card do WhatsApp e do Instagram sai quebrado, e
     é por WhatsApp que esta página converte. Também é daqui que as canônicas
     de cada rota tiram o domínio. */
  metadataBase: new URL(SITE_URL),
  title: "GRAVA.AI — uma franquia que a IA opera junto com você",
  description:
    "Totens de personalização com IA em shoppings, supermercados e aeroportos. O cliente cria a arte na hora e leva a peça gravada.",
  /* A canônica da home. Com `.com` e `.com.br` provavelmente respondendo o
     mesmo conteúdo, é ela que diz qual das duas é a página de verdade — senão
     o site divide a própria autoridade entre dois endereços idênticos. */
  alternates: { canonical: "/" },
  openGraph: {
    title: "GRAVA.AI — uma franquia que a IA opera junto com você",
    description:
      "Totens de personalização com IA em shoppings, supermercados e aeroportos. O cliente cria a arte na hora e leva a peça gravada.",
    url: "/",
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
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* `suppressHydrationWarning`: o script abaixo escreve `data-tema` antes de
       o React hidratar, então o atributo do servidor e o do cliente divergem
       de propósito. Sem a marcação o React registra erro de hidratação no
       console e avisa que não vai corrigir o atributo — que é exatamente o
       comportamento desejado, só sem o erro. */
    <html lang="pt-BR" data-tema="dark" suppressHydrationWarning>
      <head>
        {/* Aplica o tema salvo antes do primeiro paint. Precisa ser bloqueante
            e inline: qualquer coisa que rode depois da pintura mostra o tema
            errado por um quadro, que é o defeito clássico de toggle de tema.
            Só mexe no atributo do `<html>`, nada além disso. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('grava:tema');if(t==='light'||t==='dark'){document.documentElement.dataset.tema=t}}catch(e){}`,
          }}
        />

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
