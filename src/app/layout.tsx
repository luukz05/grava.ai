import type { Metadata, Viewport } from "next";
import "./reset.css";

export const metadata: Metadata = {
  title: "GRAVA.AI — uma franquia que a IA opera junto com você",
  description:
    "Totens de personalização com IA em shoppings, supermercados e aeroportos. O cliente cria a arte na hora e leva a peça gravada.",
  openGraph: {
    title: "GRAVA.AI — uma franquia que a IA opera junto com você",
    description:
      "Totens de personalização com IA em shoppings, supermercados e aeroportos. O cliente cria a arte na hora e leva a peça gravada.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
