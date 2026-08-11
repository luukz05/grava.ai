import type { Metadata, Viewport } from "next";
import "./reset.css";
import { SITE_URL, SITE_NOME, WHATSAPP_E164, INSTAGRAM } from "./site";

/* Título e descrição da home, num lugar só porque são usados duas vezes (meta
   e Open Graph) e divergir entre os dois é como o card do WhatsApp passa a
   dizer uma coisa e o resultado do Google outra.

   A descrição é reescrita pelo Google na maior parte das vezes — as medições
   públicas ficam entre 60% e 70% dos casos —, então ela não é um sinal de
   ranqueamento: é o texto que aparece quando ele decide usar o seu. Duas
   consequências práticas, ambas aplicadas aqui: cabe em ~155 caracteres, e a
   carga útil vem na frente, porque no celular sobra pouco mais de 110.

   O que vem na frente é a categoria que a pessoa busca ("franquia de
   personalização com IA"), não a marca — quem já sabe o nome da marca chega
   pela busca por nome de qualquer jeito. O investimento fecha a frase de
   propósito: numa página de captação, a descrição que já filtra quem não tem o
   valor economiza a conversa no WhatsApp, que é a única métrica do site. */
const TITULO = "GRAVA.AI — uma franquia que a IA opera junto com você";
const DESCRICAO =
  "Franquia de personalização com IA: o totem cria a arte e grava a peça na hora. Investimento de R$ 99.900 e payback estimado de 6 a 12 meses.";

export const metadata: Metadata = {
  /* Faltava, e é a peça que faz todo o resto valer. Sem `metadataBase` o Next
     emite as URLs de Open Graph relativas, e URL relativa em meta tag não
     resolve em lugar nenhum: o card do WhatsApp e do Instagram sai quebrado, e
     é por WhatsApp que esta página converte. Também é daqui que as canônicas
     de cada rota tiram o domínio. */
  metadataBase: new URL(SITE_URL),
  title: TITULO,
  description: DESCRICAO,
  /* A canônica da home. Com `.com` e `.com.br` provavelmente respondendo o
     mesmo conteúdo, é ela que diz qual das duas é a página de verdade — senão
     o site divide a própria autoridade entre dois endereços idênticos. */
  alternates: { canonical: "/" },
  /* Não existe `keywords` aqui de propósito. A meta tag de palavras-chave é
     ignorada pelo Google desde 2009 — ele publicou um post só para dizer isso,
     porque a tag é preenchida pelo dono do site e por isso não vale como sinal.
     As palavras que importam entram no título, no H1, no texto e nas perguntas
     do FAQ, onde o buscador as lê no contexto. O mapa de termos por página está
     em `docs/palavras-chave.md`. */
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
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
