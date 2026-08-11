import Link from "next/link";
import Image from "next/image";
import { TemaSwitch } from "./tema-switch";
import { IcoWhatsApp } from "./icons";
import "./navbar.css";

/* Barra de navegação do site.
   Três peças, como na referência: marca à esquerda, grupo de links numa
   cápsula ao centro-esquerda com a página atual preenchida, e o controle à
   direita. A cápsula é o que dá a leitura de "você está aqui" sem precisar de
   sublinhado nem de cor diferente no texto.

   O item atual não é link: `aria-current` marca para leitor de tela e o
   elemento vira `span`, porque link que aponta para a própria página é ruído
   de navegação.

   ───────────────────────────────────────────────────────────────────────────
   ELA SE CONDENSA NA ROLAGEM, E SEM UMA LINHA DE JAVASCRIPT

   Fora do topo, as três peças soltas se recolhem para dentro de um oblongo só,
   e o botão do WhatsApp vira uma bolinha com o ícone. No topo, volta ao que é
   agora.

   Quem faz isso é `animation-timeline: scroll()` no CSS — o mesmo mecanismo que
   apaga a carta do herói quando ela sai. Não há ouvinte de rolagem, não há
   estado em React, e o componente continua sendo de servidor.

   O rótulo do botão não é apagado quando ele encolhe: vira `.nav-cta-rotulo`
   com largura zero e `visibility` preservada para o leitor de tela, e o ícone
   aparece no lugar. Trocar texto por ícone escondendo o texto de todo mundo
   deixaria o botão sem nome acessível — a bolinha viraria um alvo anônimo. */

export type Pagina = "home" | "franqueado" | "galeria";

const ITENS: Array<{ id: Pagina; rotulo: string; href: string }> = [
  { id: "home", rotulo: "Home", href: "/institucional" },
  { id: "franqueado", rotulo: "Franqueado", href: "/" },
  { id: "galeria", rotulo: "Galeria", href: "/galeria" },
];

export function NavBar({ atual }: { atual: Pagina }) {
  /* No topo não existe barra em volta: a marca, a cápsula das pílulas e as ações
     ficam soltas sobre a página, e a única superfície desenhada é a cápsula dos
     links. É só ao rolar que uma superfície aparece em volta das três.

     Dois elementos, e não um. `.navbar-faixa` é a COLUNA — largura máxima e
     respiro lateral da página, herdados do `.hold` — e é ela que gruda no topo.
     `.navbar` dentro dela é só a linha de conteúdo, e é ela que vira o oblongo.

     Antes eram a mesma coisa, e isso quebrava o estado do topo: para o oblongo
     abraçar o conteúdo eu precisava de `min-width` variável, e `min-width`
     VENCE `max-width` — a barra passava a ser mais larga que a coluna em vez de
     acompanhá-la. Separando, o mínimo passa a ser medido contra a coluna, que é
     o que se queria desde o começo. */
  return (
    <div className="hold navbar-faixa">
      <div className="navbar">
        <Link
          className="brand"
          href="/institucional"
          aria-label="GRAVA.AI, ir para o início"
        >
          <Image
            src="/brand/grava-mark.png"
            alt="GRAVA.AI"
            width={108}
            height={128}
            priority
            className="brand-simbolo"
          />
        </Link>

        <nav className="nav-pilulas" aria-label="Páginas">
          {ITENS.map((i) =>
            i.id === atual ? (
              <span key={i.id} className="pilula" aria-current="page">
                {i.rotulo}
              </span>
            ) : (
              <Link key={i.id} className="pilula" href={i.href}>
                {i.rotulo}
              </Link>
            ),
          )}
        </nav>

        <div className="nav-acoes">
          <a className="cta nav-cta" href="https://wa.me/5515996610916">
            <IcoWhatsApp className="nav-cta-ico" />
            <span className="nav-cta-rotulo">Falar no WhatsApp</span>
          </a>
          <TemaSwitch />
        </div>
      </div>
    </div>
  );
}
