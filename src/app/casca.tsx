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

/* `axes: ["opsz"]` carrega o eixo óptico da Bricolage (12–96) junto com o peso.
   Sem ele o navegador recebe um único desenho de letra, congelado no valor
   padrão do eixo (14), e usa esse mesmo desenho da manchete de 76px ao rótulo
   de 11px. Com ele, o `font-optical-sizing: auto` do `v5.css` passa a valer: a
   letra afina e abre a contraforma conforme cresce, engrossa e respira mais
   quando encolhe. É o mesmo trabalho que a San Francisco faz sozinha nos
   sistemas da Apple, e é a diferença entre uma tipografia dimensionada e uma
   escalada. */
const grotesk = Bricolage_Grotesque({
  variable: "--f-txt",
  subsets: ["latin"],
  axes: ["opsz"],
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
        {/* Aqui vinha a `TrilhaTopo`: curvas de nível rasas atrás da página
            inteira, com uma linha acesa que se riscava conforme a rolagem. Saiu
            a pedido. O que ela fazia — estender o material da marca para além da
            dobra — o herói passou a fazer sozinho: a carta viva se mexe, e uma
            textura estática atrás de nove telas de texto ao lado dela lia como
            segunda tentativa do mesmo assunto. O componente está no histórico. */}
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
