/* A casca das três páginas.

   Antes cada rota montava a sua: instanciava as fontes por conta própria,
   escrevia o wrapper com — ou sem — `data-forma`, e decidia se tinha barra do
   topo nova, chave de tema, botão flutuante e barra fixa. O resultado é o que
   se espera disso: a landing arredondada e a institucional reta, uma com a
   display da marca carregada e a outra não, duas assinaturas de fundo
   diferentes na mesma marca.

   Aqui a casca é uma só. Cada página entrega o miolo; forma, tipografia,
   navegação e os fixos vêm daqui e mudam nas três de uma vez. */

import { Bricolage_Grotesque, Space_Mono, Rajdhani } from "next/font/google";
import { NavBar, type Pagina } from "./navbar";
import { AplicarTema } from "./tema-switch";
import { Flutuante } from "./flutuante";
import { FundoTopo } from "./fundos";

const grotesk = Bricolage_Grotesque({
  variable: "--f-txt",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--f-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

/* A display angular do documento do cliente. Estava só na landing, o que
   deixava a marca com uma voz tipográfica em uma página e outra nas demais. */
const brand = Rajdhani({
  variable: "--f-brand",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const WHATSAPP = "https://wa.me/5515996610916";

export function Casca({
  atual,
  tema,
  children,
}: {
  atual: Pagina;
  /* Passar `tema` fixa a página naquele tema — é o que as rotas de estudo
     fazem. Sem ele, quem manda é o `<html>`. */
  tema?: "dark" | "light";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${grotesk.variable} ${mono.variable} ${brand.variable} v5`}
      data-forma="oblongo"
      data-fundo="topo"
    >
      {tema ? <AplicarTema tema={tema} /> : null}
      <main>
        <NavBar atual={atual} />
        {children}
        <Flutuante />

        {/* No celular o CTA principal vira barra fixa, no alcance do polegar. */}
        <div className="dock">
          <a className="cta cta--lg" href={WHATSAPP}>
            Falar no WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}

/* A carta topográfica atrás do primeiro bloco. É a assinatura de material da
   marca e vale para as três rotas: uma segunda textura de fundo em outra
   página seria uma segunda marca. */
export function Heroi({ children }: { children: React.ReactNode }) {
  return (
    <div className="herowrap herowrap--plano">
      <FundoTopo />
      {children}
    </div>
  );
}
