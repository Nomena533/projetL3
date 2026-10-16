/**
 * ValihaMotif — motif signature généré proceduralement, évoquant les cordes
 * tendues du valiha (zithère en bambou). Aucune image requise.
 *
 * NOTE : si ce composant existe déjà dans votre projet (utilisé par Home.jsx),
 * NE L'ÉCRASEZ PAS — ignorez ce fichier et réutilisez le vôtre. Il est fourni
 * ici pour rendre ce livrable autonome.
 */
const TONES = {
  amber: "var(--color-amber)",
  coral: "var(--color-coral-light)",
  ivory: "var(--color-ivory)",
};

export default function ValihaMotif({ count = 20, tone = "amber", className = "" }) {
  const color = TONES[tone] || TONES.amber;
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-px rounded-full animate-string"
          style={{
            height: `${28 + Math.abs(Math.sin(i * 0.6)) * 60}%`,
            minHeight: "18%",
            backgroundColor: color,
            opacity: 0.35 + (i % 5) * 0.1,
            animationDelay: `${(i % 8) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
