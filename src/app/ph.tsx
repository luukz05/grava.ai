/* Placeholder cinza. Ocupa a mesma caixa que a arte vai ocupar, guarda a
   proporção dela e diz o que iria ali — o ponto é enxergar o layout, e uma
   caixa sem proporção nem rótulo mudaria o layout que se quer enxergar.

   Saiu de dentro do `landing.tsx` quando a comparação de lojas passou a
   precisar dele: o comparativo importa da landing e a landing importa o
   comparativo, e o ciclo quebraria o módulo. */

export function Ph({ ratio, label }: { ratio: string; label: string }) {
  return (
    <div
      className="ph"
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span>{label}</span>
    </div>
  );
}
