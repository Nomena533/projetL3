/**
 * ValihaMotif — motif signature de la plateforme : rangée de lignes verticales
 * inspirée des cordes du valiha (cithare tubulaire en bambou malgache).
 * Utilisé comme séparateur de section ou texture d'arrière-plan.
 *
 * Props :
 *  - count   : nombre de lignes
 *  - tone    : "coral" | "amber" | "ivory"
 *  - className
 */
export default function ValihaMotif({ count = 24, tone = "coral", className = "" }) {
  const colors = {
    coral: "var(--color-coral)",
    amber: "var(--color-amber)",
    ivory: "var(--color-ivory-dark)",
  };
  // Séquence déterministe de hauteurs (motif d'onde, pas de random)
  const pattern = Array.from({ length: count }, (_, i) => {
    const wave = Math.sin(i * 0.55) * 0.5 + 0.5; // 0..1
    return 0.25 + wave * 0.75;
  });

  return (
    <div
      className={`flex items-end justify-center gap-[6px] ${className}`}
      style={{ height: 48 }}
      aria-hidden="true"
    >
      {pattern.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full opacity-70"
          style={{ height: `${h * 100}%`, backgroundColor: colors[tone] }}
        />
      ))}
    </div>
  );
}
