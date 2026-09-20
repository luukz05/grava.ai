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

/* O FECHAMENTO É O DESTINO DE TODO CTA — NA ROTA QUE TEM FORMULÁRIO.

   Antes cada botão de contato ia direto para o WhatsApp. Agora o primeiro
   contato é o formulário — e como ele existe no fechamento de
   `/seja-franqueado`, a âncora resolve na própria página onde a pessoa está:
   nenhum botão de contato tira ninguém da página que estava convencendo.

   Continua sendo `#falar` porque era esse o id do fechamento antes de tudo
   isto, nas quatro rotas. */
export const ANCORA_FORM = "#falar";

/* AS EXCEÇÕES SÃO A HOME E A GALERIA, que não têm formulário.

   A home é a página da marca e existe para a busca pelo nome: pedir nome,
   e-mail e WhatsApp a quem chegou para saber o que a GRAVA.AI faz é cobrar dado
   antes de haver intenção. A galeria é a página de quem quer ver peça, e o
   argumento é o mesmo. O fechamento das duas encaminha em vez de captar (os
   portais de `portais.tsx`), e os botões fixos — barra do topo, barra do
   celular, flutuante — têm de encaminhar junto. Apontados para `#falar` ali,
   desceriam até um fechamento sem formulário nenhum: o pior tipo de link
   quebrado, o que não parece quebrado.

   Quem escolhe entre os dois é `destinoCta`, e o rótulo muda junto: um botão
   que troca de página não pode prometer o que só a outra página entrega. */
export const ROTA_FRANQUEADO = "/seja-franqueado";

/* Os rótulos, num lugar só. O CTA aparece na barra do topo, no herói, na barra
   fixa do celular e no flutuante — quatro botões que precisam dizer a mesma
   coisa, senão a página oferece quatro ações onde há uma. */
export const CTA_ROTULO = "Receber apresentação";
const CTA_ROTULO_ENCAMINHA = "Seja um franqueado";

/* `temFormulario` e não a `Pagina` da barra do topo: este módulo é importado
   por ela, e receber o tipo de volta fecharia um ciclo entre os dois arquivos
   por uma informação que é um booleano. */
export function destinoCta(temFormulario: boolean) {
  return temFormulario
    ? { href: ANCORA_FORM, rotulo: CTA_ROTULO }
    : { href: ROTA_FRANQUEADO, rotulo: CTA_ROTULO_ENCAMINHA };
}
