"use client";

/* Formulário de interesse, no fechamento.
   Existe para quem não vai tocar no botão do WhatsApp de cara: dá o que
   preencher e devolve o mesmo destino, agora com contexto.

   O envio monta a mensagem no WhatsApp com o que foi preenchido em vez de
   fingir que existe um servidor. Não há backend neste protótipo, e um
   "recebemos seu contato" que não recebeu nada é a pior coisa que uma landing
   de captação pode fazer. Quando houver CRM, o `onSubmit` troca de destino e o
   resto da peça continua igual. */

import { useEffect, useRef, useState } from "react";

const WHATSAPP = "5515996610916";

/* O FORMULÁRIO ABRAÇA O FECHAMENTO INTEIRO, e `children` é a coluna de texto
   que fica ao lado dele — a marca, a manchete e a linha de apoio.

   Parece invertido (o texto do rodapé morando dentro de um `<form>`), e é
   deliberado: o `<form>` é quem monta o par de colunas, e assim o par e o
   envio são a mesma peça. Ele já teve outro motivo — o botão atravessava as
   duas colunas, e um `<button type="submit">` só envia o formulário em que
   está dentro. O botão voltou para dentro do cartão, mas a montagem continua
   aqui: o alinhamento entre marca e primeira linha do formulário depende dela.

   Com o form por fora, a caixa desenhada não é ele: quem tem borda e fundo é
   `.form-fr-cartao`, em volta do cabeçalho, dos campos e do botão. O `<form>`
   é o layout. */
export function FormFranqueado({ children }: { children?: React.ReactNode }) {
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

  /* O estado do BOTÃO, que é diferente do estado do envio.

     São três: parado, enviando e enviado. O `enviando` dura de propósito —
     240ms — e essa espera é a única coisa artificial nesta peça. A razão: o
     trabalho real aqui é montar uma string e chamar `window.open`, o que
     leva menos de um quadro. Sem a pausa, o botão saltaria direto de "Receber
     material" para o check, e o olho leria isso como glitch, não como
     resposta. É o mesmo motivo pelo qual um botão de pagamento mostra o
     spinner por um instante mesmo quando a resposta volta na hora.

     Uma tentativa anterior de estado `enviando` foi removida deste arquivo
     porque ligava e desligava dentro do mesmo `onSubmit` síncrono — o React
     agrupava as duas escritas e o botão nunca chegava a renderizar. Aqui ele
     passa por `setTimeout`, então cada estado tem o próprio quadro. */
  const [fase, setFase] = useState<"parado" | "enviando" | "enviado">("parado");
  const relogios = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* Quem cria timer limpa timer. Sem isto, sair da página entre o clique e o
     check chama `setState` num componente desmontado. */
  useEffect(() => {
    const atuais = relogios;
    return () => {
      atuais.current.forEach(clearTimeout);
      atuais.current = [];
    };
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fase === "enviando") return;

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

    /* O bloqueio de pop-up é FALHA, e falha não ganha check. O botão volta ao
       repouso e quem fala é o link de resgate logo abaixo. */
    if (!aba) {
      setFase("parado");
      return;
    }

    setFase("enviando");
    relogios.current.push(
      setTimeout(() => setFase("enviado"), 240),
      /* Volta ao repouso depois de ler. O formulário continua ali e a pessoa
         pode enviar de novo — um botão que fica travado em "enviado" para
         sempre é um formulário que perdeu a segunda tentativa. */
      setTimeout(() => setFase("parado"), 3600),
    );
  }

  return (
    <form className="form-fr" onSubmit={onSubmit}>
      <div className="form-fr-duo">
        {children}

        <div className="form-fr-cartao">
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
        {/* O PÉ FICA DENTRO DO CARTÃO. Ele já foi irmão do `.form-fr-duo`,
            atravessando as duas colunas; voltou para dentro da caixa porque
            o botão é o passo seguinte dos campos, e não um rodapé da seção —
            entre o último campo e a ação não deve haver uma borda no meio.

            Aqui havia um segundo "Falar no WhatsApp" na coluna da esquerda. Dois
            botões para a mesma conversa, um do lado do outro, é escolha onde não
            havia escolha — e o da esquerda ainda pulava o formulário, levando a
            conversa a abrir sem nome nem e-mail. Ficou o que qualifica. */}
        <div className="form-fr-pe">
          {/* UM BOTÃO, TRÊS ESTADOS, E A CAIXA NÃO MUDA DE TAMANHO.

              Os três rótulos vivem empilhados no mesmo lugar por grade — todos na
              célula `1 / 1` —, e a largura do botão é a do mais largo dos três.
              É o que impede a peça de encolher quando o texto vira "Enviado": um
              botão que muda de tamanho no meio da confirmação puxa o layout ao
              redor e desfaz a sensação de que a ação deu certo.

              `aria-live` no invólucro para o leitor de tela acompanhar a troca,
              e os rótulos inativos ficam `aria-hidden` — senão os três seriam
              lidos em sequência. */}
          <button
            className="cta cta--lg form-fr-enviar"
            type="submit"
            data-fase={fase}
            disabled={fase === "enviando"}
          >
            <span className="form-fr-rotulos" aria-live="polite">
              <span className="form-fr-rotulo" aria-hidden={fase !== "parado"}>
                Receber material no WhatsApp
              </span>
              <span className="form-fr-rotulo" aria-hidden={fase !== "enviando"}>
                Abrindo a conversa…
              </span>
              <span className="form-fr-rotulo" aria-hidden={fase !== "enviado"}>
                {/* O CHECK.

                    `pathLength={100}` normaliza o comprimento do caminho para
                    100, e o `stroke-dasharray` do CSS conta na MESMA escala —
                    então o traço se desenha sem ninguém medir a geometria. É o
                    mesmo recurso do traço dos ícones da página, e o desenho
                    acontece no CSS.

                    100 e NÃO 1: o dasharray é resolvido em unidades de usuário,
                    que o Chrome trata como px. Com `pathLength="1"`, um
                    dasharray de 1 cobria 1px de um caminho de ~22 e o traço
                    ficava invisível — o check simplesmente nunca aparecia. */}
                <svg className="form-fr-check" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    pathLength={100}
                    d="M4.5 12.5 L9.5 17.5 L19.5 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Enviado
              </span>
            </span>
          </button>

          <p className="form-fr-aviso">
            Seus dados vão direto para a conversa. Nada é publicado e não existe
            cadastro em lista.
          </p>
        </div>
      </div>
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
