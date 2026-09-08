import AnimatedSection from "./AnimatedSection";

/**
 * StatCard — vignette de statistique utilisée sur les tableaux de bord.
 * Reprend exactement le langage visuel des cartes du Home (bordure ivory-dark,
 * icône dans un cercle coral/10, hover lift + halo).
 */
export default function StatCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <AnimatedSection
      delay={delay}
      className="group rounded-2xl border border-ivory-dark bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-coral/10 text-coral-dark transition-colors duration-300 group-hover:bg-coral group-hover:text-ivory">
        <Icon size={19} />
      </div>
      <p className="mt-4 font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</p>
    </AnimatedSection>
  );
}
