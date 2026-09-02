/* O contrato entre o formulário e a rota que o recebe, mais o destino único
   para onde todos os botões de contato apontam.

   POR QUE NÃO MORA EM `api/lead/route.ts`: um arquivo `route.ts` tem uma lista
   fechada de exports permitidos (os métodos HTTP e um punhado de opções de
   configuração), e o Next valida isso na build. Um tipo exportado de lá é uma
   build quebrada esperando acontecer. Aqui os dois lados importam do mesmo
   lugar sem redigitar o formato. */

/* O que a rota promete devolver, em qualquer desfecho. Sempre JSON: o
   formulário lê `ok` antes de decidir o que mostrar. */
export type RespostaLead = { ok: true } | { ok: false; erro: string };

/* O FECHAMENTO É O DESTINO DE TODO CTA DA PÁGINA.

   Antes cada botão de contato ia direto para o WhatsApp. Agora o primeiro
   contato é o formulário — e como ele existe no fechamento das quatro rotas,
   a âncora resolve na própria página onde a pessoa está: nenhum botão de
   contato tira ninguém da página que estava convencendo.

   Continua sendo `#falar` porque era esse o id do fechamento antes de tudo
   isto, nas quatro rotas. */
export const ANCORA_FORM = "#falar";

/* O rótulo, num lugar só. Ele aparece na barra do topo, no herói, na barra
   fixa do celular e no flutuante — quatro botões que precisam dizer a mesma
   coisa, senão a página oferece quatro ações onde há uma. */
export const CTA_ROTULO = "Receber apresentação";
