/* O destino do formulário de captação.

   O FLUXO QUE ESTA ROTA SERVE, porque ele define tudo o que está aqui: o
   primeiro contato é por e-mail e é rápido — a pessoa deixa nome, e-mail e
   WhatsApp, e recebe a apresentação demonstrativa da franquia. O telefone não
   é usado agora: é o SEGUNDO contato, feito à mão pelo WhatsApp depois que a
   apresentação já chegou. Por isso o formulário não abre conversa nenhuma no
   envio, e por isso o telefone é obrigatório mesmo sem ser usado no ato.

   O ENVIO DE E-MAIL AINDA NÃO ESTÁ LIGADO, e isso é deliberado. Não existe
   provedor provisionado no projeto e um provedor escolhido no escuro é o tipo
   de decisão que se paga depois. O que existe aqui é o contrato inteiro —
   validação, normalização, formato de resposta e o ponto único de ligação
   (`entregar`) — de modo que ligar o provedor seja trocar o corpo de UMA
   função, sem tocar no formulário nem no resto da rota.

   Enquanto não há provedor, o lead é registrado no log do servidor. É pouco, e
   é honesto: em desenvolvimento aparece no terminal, em produção aparece no
   painel de logs do deploy. O que NÃO se faz é responder "enviamos" sem ter
   enviado — o formulário diz exatamente o que aconteceu. */

/* O formato da resposta mora em `../../lead`, e não aqui: um arquivo `route.ts`
   tem lista fechada de exports permitidos e o Next valida isso na build — um
   tipo exportado daqui é build quebrada. */
import type { RespostaLead } from "../../lead";

type Lead = {
  nome: string;
  email: string;
  telefone: string;
  /* De onde veio: a rota que estava aberta quando a pessoa enviou. Não é
     rastreamento — é a única forma de saber qual página converte quando as
     quatro têm o mesmo formulário no fechamento. */
  origem: string;
};

/* Validação de e-mail em uma linha, e de propósito.

   A regra completa do RFC 5322 é um monstro que aceita coisas que nenhum
   provedor entrega, e a rejeição de um endereço válido custa um lead. Aqui o
   objetivo é só barrar o que é claramente não-endereço: algo, arroba, algo,
   ponto, algo, sem espaço no meio. O resto quem julga é o servidor de e-mail
   na hora de entregar. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Telefone brasileiro reduzido a dígitos: 10 (fixo com DDD) a 13 (com o 55 na
   frente). A máscara do formulário é conveniência visual; quem decide é isto,
   porque o campo aceita colar de qualquer lugar. */
function normalizarTelefone(bruto: string): string | null {
  const digitos = bruto.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 13) return null;
  /* Guarda em E.164 sem o "+": é o formato que o link do WhatsApp usa, e é
     nele que este número vai ser usado no segundo contato. */
  return digitos.startsWith("55") ? digitos : `55${digitos}`;
}

/* Corta o que veio grande demais. Um campo de nome com 4 KB não é um nome — é
   alguém testando o formulário, e o log não precisa carregar isso. */
function texto(v: unknown, limite: number): string {
  return typeof v === "string" ? v.trim().slice(0, limite) : "";
}

/* O PONTO DE LIGAÇÃO.

   Quando houver provedor, é aqui dentro que ele entra — e só aqui. São dois
   e-mails, e vale anotar a diferença porque ela muda o remetente:

   1. para o lead: a apresentação demonstrativa da franquia (link ou anexo).
      Sai de um domínio verificado, senão cai em spam;
   2. para a operação: o aviso com nome, e-mail, telefone e origem, que é o
      gatilho do segundo contato pelo WhatsApp.

   O `await` já existe na assinatura para que ligar o provedor não vire uma
   mudança de forma na função. */
async function entregar(lead: Lead): Promise<void> {
  // TODO(provedor): trocar por Resend/SES/etc. Ver o cabeçalho desta função.
  console.log("[lead]", JSON.stringify(lead));
}

export async function POST(req: Request): Promise<Response> {
  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return Response.json(
      { ok: false, erro: "Não foi possível ler o envio." } satisfies RespostaLead,
      { status: 400 },
    );
  }

  const d = (corpo ?? {}) as Record<string, unknown>;

  const nome = texto(d.nome, 120);
  const email = texto(d.email, 200).toLowerCase();
  const telefone = normalizarTelefone(texto(d.telefone, 40));

  /* UMA mensagem por vez, e a do primeiro campo que falhou. O formulário
     mostra o erro numa linha só; despejar três de uma vez faz a pessoa ler
     três e corrigir uma. */
  if (nome.length < 2) {
    return Response.json(
      { ok: false, erro: "Escreva seu nome." } satisfies RespostaLead,
      { status: 400 },
    );
  }
  if (!EMAIL.test(email)) {
    return Response.json(
      { ok: false, erro: "Confira o e-mail: a apresentação vai para ele." } satisfies RespostaLead,
      { status: 400 },
    );
  }
  if (!telefone) {
    return Response.json(
      { ok: false, erro: "Confira o WhatsApp com o DDD." } satisfies RespostaLead,
      { status: 400 },
    );
  }

  try {
    await entregar({ nome, email, telefone, origem: texto(d.origem, 120) || "/" });
  } catch (e) {
    /* A falha do provedor não pode virar "enviado" na tela. O lead já está no
       log do servidor pelo `console.error`, então nada se perde do lado de cá
       — o que a pessoa precisa saber é que não recebeu nada ainda. */
    console.error("[lead] falha ao entregar", { nome, email, telefone }, e);
    return Response.json(
      {
        ok: false,
        erro: "Não conseguimos enviar agora. Tente de novo em instantes.",
      } satisfies RespostaLead,
      { status: 502 },
    );
  }

  return Response.json({ ok: true } satisfies RespostaLead);
}
