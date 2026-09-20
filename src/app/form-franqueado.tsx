"use client";

/* Formulário de captação, no fechamento das quatro páginas.

   MUDOU O FLUXO, e é ele que explica o resto deste arquivo.

   Antes o envio montava uma mensagem e abria o WhatsApp: o primeiro contato
   era a conversa, e a apresentação da franquia saía por lá, à mão. O custo
   disso é que a conversão inteira dependia de a pessoa querer conversar AGORA
   — e um bloqueador de pop-up ou uma WebView de rede social eram suficientes
   para derrubá-la no meio.

   Agora o primeiro contato é por e-mail e é rápido: nome, e-mail e WhatsApp,
   e a apresentação demonstrativa da franquia chega no e-mail. O telefone é
   pedido aqui mas não é usado aqui — ele é o SEGUNDO contato, feito à mão pelo
   WhatsApp depois que a apresentação já chegou e a pessoa já sabe do que se
   trata. Quem chama é a operação, não a landing.

   Consequências diretas no código: sumiu o `window.open`, sumiu o link de
   resgate para pop-up bloqueado — não há mais janela para bloquear —, e o
   envio virou o que sempre deveria ter sido, um POST com resposta de verdade
   em `/api/lead`. Como agora existe uma requisição, existe erro: o quarto
   estado do botão não é decoração, é a rede falhando. */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { RespostaLead } from "./lead";
import { Brilho } from "./brilho";

/* O FORMULÁRIO ABRAÇA O FECHAMENTO INTEIRO, e `children` é a coluna de texto
   que fica ao lado dele — a marca, a manchete e a linha de apoio.

   Parece invertido (o texto do rodapé morando dentro de um `<form>`), e é
   deliberado: o `<form>` é quem monta o par de colunas, e assim o par e o
   envio são a mesma peça.

   Com o form por fora, a caixa desenhada não é ele: quem tem borda e fundo é
   `.form-fr-cartao`, em volta do cabeçalho, dos campos e do botão. O `<form>`
   é o layout. */
export function FormFranqueado({ children }: { children?: React.ReactNode }) {
  /* Três estados de envio e um de falha, separados de propósito: `fase` conta
     o que está acontecendo com o pedido, `erro` conta o que voltou errado. Um
     envio que falha volta para `parado` COM erro — o botão fica clicável de
     novo, que é o que a pessoa precisa depois de corrigir o e-mail. */
  const [fase, setFase] = useState<"parado" | "enviando" | "enviado">("parado");
  const [erro, setErro] = useState<string | null>(null);

  /* Quem cria requisição cancela requisição. Sem isto, sair da página no meio
     do POST chama `setState` num componente desmontado. */
  const abortar = useRef<AbortController | null>(null);
  useEffect(() => () => abortar.current?.abort(), []);

  /* O E-MAIL PODE CHEGAR PELA URL. O mini-formulário do rodapé
     (`rodape.tsx`) manda `?email=` por GET para cá, e a pessoa que já
     digitou o e-mail lá não deveria digitar de novo aqui. Lido de
     `window.location` num efeito, e não por `useSearchParams`: o hook
     exigiria um limite de Suspense em volta do formulário nas três rotas
     por causa de UM parâmetro opcional. Escrito no campo por `ref`, e só se
     o campo ainda estiver vazio — o autofill do navegador pode ter chegado
     antes, e o que a pessoa (ou o navegador dela) escreveu vence a URL. */
  const campoEmail = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    const campo = campoEmail.current;
    if (email && campo && !campo.value) campo.value = email;
  }, []);

  /* Qual das quatro páginas converteu. Vai junto no corpo do POST porque as
     quatro têm o mesmo formulário no fechamento e, sem isto, não há como
     saber qual delas trouxe o lead. */
  const rota = usePathname();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fase !== "parado") return;

    const d = new FormData(e.currentTarget);
    setFase("enviando");
    setErro(null);

    abortar.current?.abort();
    const ctrl = new AbortController();
    abortar.current = ctrl;

    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          nome: d.get("nome"),
          email: d.get("email"),
          telefone: d.get("telefone"),
          origem: rota,
        }),
      });

      /* A rota responde JSON em qualquer desfecho, mas um 500 de infra pode
         devolver HTML. O `catch` do parse cobre esse caso para o formulário
         não morrer com "Unexpected token <". */
      const corpo: RespostaLead = await r.json().catch(() => ({
        ok: false as const,
        erro: "Não conseguimos enviar agora. Tente de novo em instantes.",
      }));

      if (!r.ok || !corpo.ok) {
        setErro(
          corpo.ok
            ? "Não conseguimos enviar agora. Tente de novo em instantes."
            : corpo.erro,
        );
        setFase("parado");
        return;
      }

      setFase("enviado");
    } catch (err) {
      /* Cancelamento não é falha: o componente saiu de cena e não há mais
         ninguém para ler o aviso. */
      if (err instanceof DOMException && err.name === "AbortError") return;
      setErro("Sem conexão com o servidor. Tente de novo em instantes.");
      setFase("parado");
    }
  }

  return (
    <form className="form-fr" onSubmit={onSubmit}>
      <div className="form-fr-duo">
        {children}

        <div className="form-fr-cartao brilho">
          {/* O brilho que segue o ponteiro, o mesmo dos portais do fechamento
              da home e da galeria: a classe `brilho` dá a camada, o componente
              dá as variáveis. Ver `brilho.tsx`. */}
          <Brilho />
          {/* O SUCESSO SUBSTITUI O FORMULÁRIO, e não é enfeite.

              Enquanto o envio abria o WhatsApp, fazia sentido o botão voltar
              ao repouso: a conversa podia não ter aberto, e a pessoa tinha de
              poder tentar de novo. Agora o servidor confirmou o recebimento —
              deixar os campos preenchidos e o botão vivo do lado de uma
              confirmação é convidar o mesmo lead a entrar duas vezes.

              O que fica no lugar é o que a pessoa precisa saber a seguir: o
              e-mail está a caminho, e o WhatsApp é o próximo passo, feito por
              nós. */}
          {fase === "enviado" ? (
            <div className="form-fr-ok" role="status">
              <span className="form-fr-ok-selo" aria-hidden="true">
                <Check />
              </span>
              <h3>Apresentação a caminho.</h3>
              <p>
                Ela chega no e-mail que você deixou, em alguns minutos. Se não
                aparecer, vale olhar no spam.
              </p>
              <p className="form-fr-ok-nota">
                Depois disso, quem opera a rede chama no seu WhatsApp para
                seguir a conversa.
              </p>
            </div>
          ) : (
            <>
              {/* O TÍTULO SOZINHO. Embaixo dele havia um parágrafo de duas
                  frases ("Preencha e a apresentação vai para o seu e-mail. Em
                  seguida, quem opera a rede chama no seu WhatsApp") — a
                  primeira o botão já diz, a segunda a nota de sucesso já
                  conta. Saiu a pedido; o rótulo do e-mail ("recebe a
                  apresentação") e o do WhatsApp seguem explicando cada campo
                  no lugar do campo. */}
              <div className="form-fr-head">
                <h3>Receba a apresentação da franquia</h3>
              </div>

              {/* TRÊS CAMPOS, E SÓ.

                  Nome e e-mail são o primeiro contato; o WhatsApp é o segundo,
                  e por isso está aqui mesmo sem ser usado no envio — pedi-lo
                  depois seria pedir duas vezes.

                  Continuam de fora cidade, estado, momento e pergunta: são
                  exatamente as perguntas que quem atende faz na conversa, com
                  a pessoa já engajada. Cobrá-las aqui é qualificar um contato
                  que ainda pode nem existir. */}
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
                  <span>
                    WhatsApp <em>com DDD</em>
                  </span>
                  <input
                    type="tel"
                    name="telefone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(15) 99999-9999"
                  />
                </label>

                {/* O E-MAIL ATRAVESSA AS DUAS COLUNAS porque é ele que recebe
                    a apresentação: é o campo que decide se o envio serviu para
                    alguma coisa, e endereço longo cortado em meia coluna é
                    endereço digitado errado. */}
                <label className="campo campo--largo">
                  <span>
                    E-mail <em>recebe a apresentação</em>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="voce@empresa.com.br"
                    ref={campoEmail}
                  />
                </label>
              </div>

              <div className="form-fr-pe">
                {/* UM BOTÃO, TRÊS RÓTULOS, E A CAIXA NÃO MUDA DE TAMANHO.

                    Os rótulos vivem empilhados no mesmo lugar por grade —
                    todos na célula `1 / 1` —, e a largura do botão é a do mais
                    largo. É o que impede a peça de encolher no meio da
                    confirmação, puxando o layout ao redor.

                    `aria-live` no invólucro para o leitor de tela acompanhar a
                    troca, e os rótulos inativos ficam `aria-hidden` — senão os
                    três seriam lidos em sequência. */}
                <button
                  className="cta cta--lg form-fr-enviar"
                  type="submit"
                  data-fase={fase}
                  disabled={fase === "enviando"}
                >
                  <span className="form-fr-rotulos" aria-live="polite">
                    <span className="form-fr-rotulo" aria-hidden={fase !== "parado"}>
                      Receber apresentação
                    </span>
                    <span className="form-fr-rotulo" aria-hidden={fase !== "enviando"}>
                      Enviando…
                    </span>
                  </span>
                </button>

                {/* O erro mora colado no botão, e não no topo do cartão: é ali
                    que o olho está quando o envio falha. `role="alert"` porque
                    interrompe mesmo — a pessoa acha que enviou. */}
                {erro ? (
                  <p className="form-fr-erro" role="alert">
                    {erro}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

/* O CHECK.

   `pathLength={100}` normaliza o comprimento do caminho para 100, e o
   `stroke-dasharray` do CSS conta na MESMA escala — então o traço se desenha
   sem ninguém medir a geometria. É o mesmo recurso do traço dos ícones da
   página, e o desenho acontece no CSS.

   100 e NÃO 1: o dasharray é resolvido em unidades de usuário, que o Chrome
   trata como px. Com `pathLength="1"`, um dasharray de 1 cobria 1px de um
   caminho de ~22 e o traço ficava invisível — o check simplesmente nunca
   aparecia. */
function Check() {
  return (
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
  );
}
