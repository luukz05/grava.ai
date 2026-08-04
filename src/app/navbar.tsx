import Link from "next/link";
import Image from "next/image";
import { TemaSwitch } from "./tema-switch";

/* Barra de navegação do site.
   Três peças, como na referência: marca à esquerda, grupo de links numa
   cápsula ao centro-esquerda com a página atual preenchida, e o controle à
   direita. A cápsula é o que dá a leitura de "você está aqui" sem precisar de
   sublinhado nem de cor diferente no texto.

   O item atual não é link: `aria-current` marca para leitor de tela e o
   elemento vira `span`, porque link que aponta para a própria página é ruído
   de navegação. */

export type Pagina = "home" | "franqueado" | "galeria";

const ITENS: Array<{ id: Pagina; rotulo: string; href: string }> = [
  { id: "home", rotulo: "Home", href: "/institucional" },
  { id: "franqueado", rotulo: "Franqueado", href: "/" },
  { id: "galeria", rotulo: "Galeria", href: "/galeria" },
];

export function NavBar({ atual }: { atual: Pagina }) {
  /* Sem barra em volta. Na referência não existe contêiner: a marca, a cápsula
     das pílulas e as ações ficam soltas sobre a página, e a única superfície
     desenhada é a cápsula dos links. O elemento que segurava tudo virou o
     próprio contêiner de largura, que já existia. */
  return (
    <div className="hold navbar">
      <Link className="brand" href="/institucional" aria-label="GRAVA.AI, ir para o início">
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
          )
        )}
      </nav>

      <div className="nav-acoes">
        <a className="cta nav-cta" href="https://wa.me/5515996610916">
          Falar no WhatsApp
        </a>
        <TemaSwitch />
      </div>
    </div>
  );
}
