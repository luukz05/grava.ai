"use client";

/* Chave de tema na navbar.
   O atributo vive no `<html>`, não no wrapper da página: assim o script
   bloqueante do layout consegue aplicá-lo antes do primeiro paint e não existe
   piscada de tema errado ao carregar. Este componente só lê e escreve o mesmo
   atributo, mais o localStorage. */

import { useEffect, useState } from "react";

type Tema = "dark" | "light";

function lerTema(): Tema {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.tema === "light" ? "light" : "dark";
}

/* As rotas /v fixam um tema por variação. Como o atributo mora no `<html>`,
   elas precisam escrevê-lo ao montar — e desfazer ao sair, senão o tema da
   variação vazaria para a landing na navegação seguinte. */
export function AplicarTema({ tema }: { tema: string }) {
  useEffect(() => {
    const anterior = document.documentElement.dataset.tema;
    document.documentElement.dataset.tema = tema;
    return () => {
      document.documentElement.dataset.tema = anterior ?? "dark";
    };
  }, [tema]);
  return null;
}

export function TemaSwitch() {
  /* Começa em dark para o HTML do servidor bater com o do cliente. O valor
     real chega no efeito, logo depois da hidratação. */
  const [tema, setTema] = useState<Tema>("dark");
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setTema(lerTema());
    setPronto(true);
  }, []);

  function trocar() {
    const novo: Tema = tema === "dark" ? "light" : "dark";
    document.documentElement.dataset.tema = novo;
    try {
      localStorage.setItem("grava:tema", novo);
    } catch {
      /* modo privado, sessão anônima: a troca vale para esta visita e pronto */
    }
    setTema(novo);
  }

  const alvo = tema === "dark" ? "claro" : "escuro";

  return (
    <button
      type="button"
      className="tema-switch"
      onClick={trocar}
      aria-label={`Mudar para o tema ${alvo}`}
      title={`Tema ${alvo}`}
    >
      <span className="tema-icone" aria-hidden="true">
        {/* Sol e lua desenhados no mesmo traço dos ícones da página, e não
            emoji: emoji como ícone é justamente o que o brief proíbe. */}
        {pronto && tema === "light" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
          </svg>
        )}
      </span>
    </button>
  );
}
