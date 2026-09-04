/* As rotas do site, num lugar só.

   ELAS MORAVAM DENTRO DE `navbar.tsx`, e não podiam continuar lá: o menu do
   celular é componente de cliente e a barra do topo é de servidor. Importar a
   lista da barra para dentro do menu fecharia um ciclo entre os dois arquivos
   — a barra importa o menu, o menu importaria a barra — por causa de um array
   de quatro linhas.

   Módulo sem `"use client"` e sem nada de servidor dentro: ele é arrastado
   pelos dois lados da fronteira sem levar nenhum dos dois junto.

   ───────────────────────────────────────────────────────────────────────────
   `/perguntas` CHEGOU A ENTRAR NA LISTA, E SAIU JUNTO COM A ROTA.

   A página de perguntas foi extinta a pedido: o FAQ passou a ser uma seção da
   landing (`#duvidas`), abaixo dos três modelos. `/perguntas` agora redireciona
   para lá — ver `next.config.ts`.

   O que a passagem dela deixou de bom: enquanto existia, a rota não tinha valor
   próprio de `Pagina` e a página se declarava `atual="franqueado"`, então a
   barra do topo pintava a pílula de "Franqueado" como se a pessoa estivesse
   nela. Marcar a página errada como atual é pior que não marcar nenhuma — o
   leitor de tela anuncia um lugar em que ninguém está. São três rotas agora, e
   as três se declaram certo. */

export type Pagina = "home" | "franqueado" | "galeria";

/* Os rótulos são curtos de propósito: eles vivem numa cápsula que divide a
   linha da barra com a marca e o botão de conversão. */
export const ROTAS: Array<{ id: Pagina; rotulo: string; href: string }> = [
  { id: "home", rotulo: "Home", href: "/" },
  { id: "franqueado", rotulo: "Franqueado", href: "/seja-franqueado" },
  { id: "galeria", rotulo: "Galeria", href: "/galeria" },
];
