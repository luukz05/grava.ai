/* Galeria de peças.
   Existe porque a navbar aponta para cá — link de navegação que leva a 404 é
   pior do que não ter o link. É uma casca honesta: a estrutura está de pé e
   cada slot diz o que vai receber, sem foto inventada e sem produto que a
   GRAVA.AI não confirmou.

   Forma, tipografia, barra do topo e fixos vêm do `Casca`, o mesmo das outras
   duas rotas. */

import "../v5.css";
import "../variacoes.css";
import "../temas.css";
import { Casca, Heroi, WHATSAPP } from "../casca";
import { Ph } from "../ph";
import { Rodape } from "../rodape";

export const metadata = {
  title: "GRAVA.AI — galeria de peças",
  description: "O que sai do totem: peças gravadas com arte criada na hora.",
};

/* Os materiais que a apresentação do cliente cita. Nada além deles: inventar
   catálogo aqui seria prometer produto que a rede não confirmou. */
const PECAS = [
  { t: "Arte gerada no totem", d: "O desenho que o cliente descreve e vê fechar na tela." },
  { t: "Gravação a laser", d: "A marca queimada na superfície, feita na hora." },
  { t: "Peça pronta", d: "O item que sai com o cliente, com ticket de R$ 60 a R$ 100." },
  { t: "Personalização por data", d: "O que a unidade produz em época comemorativa." },
  { t: "Presente de viagem", d: "O que sai nas unidades de aeroporto." },
  { t: "Lembrança de shopping", d: "O que sai no corredor de maior circulação." },
];

export default function Galeria() {
  return (
    <Casca atual="galeria">
      {/* Mesma abertura das outras rotas: a carta topográfica atrás do primeiro
          bloco, com a barra do topo flutuando sobre ela. */}
      <Heroi>
        <header className="hold hero hero--curto" id="topo">
          <div>
            <h1>O que sai do totem.</h1>
            <p>
              Cada peça começa numa conversa de trinta segundos com a IA e
              termina gravada. As imagens entram quando a rede enviar o material
              de fotografia.
            </p>
            <div className="row">
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
              <a className="cta cta--lg cta--out" href="/#numeros">
                Ver os números
              </a>
            </div>
          </div>
        </header>
      </Heroi>

      <section className="hold sec" id="pecas">
        <div className="lojas">
          {PECAS.map((p) => (
            <article className="loja" key={p.t}>
              <Ph ratio="4 / 3" label={p.t} />
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="hold close" id="falar">
        <h2>Quer ver de perto?</h2>
        <p>
          A apresentação completa da franquia sai pelo WhatsApp, com as peças
          que a rede já produz.
        </p>
        <div className="row" style={{ marginTop: 0 }}>
          <a className="cta cta--lg" href={WHATSAPP}>
            Falar no WhatsApp
          </a>
        </div>
        <Rodape
          links={[
            { href: "/", rotulo: "Seja um franqueado" },
            { href: "/institucional", rotulo: "A marca" },
          ]}
        />
      </footer>
    </Casca>
  );
}
