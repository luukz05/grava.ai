"use client";

/* Formulário de interesse, no fechamento.
   Existe para quem não vai tocar no botão do WhatsApp de cara: dá o que
   preencher e devolve o mesmo destino, agora com contexto.

   O envio monta a mensagem no WhatsApp com o que foi preenchido em vez de
   fingir que existe um servidor. Não há backend neste protótipo, e um
   "recebemos seu contato" que não recebeu nada é a pior coisa que uma landing
   de captação pode fazer. Quando houver CRM, o `onSubmit` troca de destino e o
   resto da peça continua igual. */

import { useState } from "react";

const WHATSAPP = "5515996610916";

export function FormFranqueado() {
  /* A conversa que não abriu. Bloqueador de pop-up, WebView de rede social e
     navegador em modo restrito engolem `window.open` sem erro nenhum: o clique
     acontece, nada aparece e a pessoa acha que enviou. Como esta é a única
     conversão da página, o destino vira um link visível em vez de sumir. */
  const [resgate, setResgate] = useState<string | null>(null);
  /* E a conversa que abriu. Antes daqui existia um estado `enviando` que ligava
     e desligava dentro do mesmo `onSubmit` síncrono: o React agrupa as duas
     escritas, o botão nunca chegava a renderizar desabilitado e o formulário
     não dava sinal nenhum de que algo tinha acontecido. Quem envia num celular
     com o WhatsApp abrindo em outro aplicativo volta para uma página idêntica
     à de antes do clique — e reenvia. Ação que importa termina em confirmação;
     é a única coisa que este formulário faz, e ele estava terminando em nada. */
  const [aberto, setAberto] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const d = new FormData(e.currentTarget);
    const linhas = [
      "Olá! Vim pelo site e quero receber o material da franquia GRAVA.AI.",
      "",
      `Nome: ${d.get("nome")}`,
      `E-mail: ${d.get("email")}`,
    ];

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join("\n"))}`;
    let aba: Window | null = null;
    try {
      aba = window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      aba = null;
    }
    setResgate(aba ? null : url);
    setAberto(Boolean(aba));
  }

  return (
    <form className="form-fr" onSubmit={onSubmit}>
      <div className="form-fr-head">
        <h3>Receba o material da franquia</h3>
        <p>
          Preencha e a conversa abre no WhatsApp com seus dados já preenchidos.
          Do outro lado responde quem opera a rede, com a apresentação
          completa da franquia.
        </p>
      </div>

      {/* DOIS CAMPOS, E SÓ.

          Saíram cidade e estado, o seletor de momento e o campo de pergunta.
          Cada campo a mais é uma chance a mais de a pessoa desistir no meio — e
          nenhum dos três era necessário AGORA: onde ela quer a unidade e quando
          pretende começar são exatamente as perguntas que quem atende faz na
          primeira mensagem, com a conversa já aberta e a pessoa já engajada.

          Pedir antes é cobrar esforço para qualificar um contato que ainda pode
          nem existir. */}
      <div className="form-fr-campos">
        <label className="campo">
          <span>Nome</span>
          <input
            type="text"
            name="nome"
            required
            autoComplete="name"
            placeholder="Como devemos te chamar"
          />
        </label>

        <label className="campo">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="vai junto na conversa"
          />
        </label>
      </div>

      <div className="form-fr-pe">
        <button className="cta cta--lg" type="submit">
          Receber material no WhatsApp
        </button>
        <p className="form-fr-aviso">
          Seus dados vão direto para a conversa. Nada é publicado e não existe
          cadastro em lista.
        </p>
      </div>

      {/* `role="status"` e não `alert`: é confirmação, não interrupção — o
          leitor de tela anuncia quando terminar o que está lendo. A frase diz
          onde a conversa está, porque no celular ela abriu em outro
          aplicativo e a pessoa continua olhando para esta tela. */}
      {aberto ? (
        <p className="form-fr-status" role="status">
          Pronto — a conversa abriu no WhatsApp com os seus dados. Se ela não
          apareceu, procure o aplicativo.
        </p>
      ) : null}

      {resgate ? (
        <p className="form-fr-resgate" role="alert">
          O navegador bloqueou a abertura da conversa.{" "}
          <a href={resgate} target="_blank" rel="noopener noreferrer">
            Abrir o WhatsApp com seus dados
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
