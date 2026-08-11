// Teintes de badge de statut — jamais de nouvelle couleur, uniquement les
// tokens coral / amber / brick déjà définis dans index.css. Ce fichier est le
// point d'entrée unique pour tous les statuts affichés via <Pill>, qu'ils
// viennent de l'espace Professeur ou de l'espace Administrateur.
const TONE = {
  // Cours / leçons
  Publié: "bg-coral/10 text-coral-dark",
  Brouillon: "bg-amber/20 text-brick",
  // Corrections
  "En attente": "bg-amber/20 text-brick",
  Corrigé: "bg-coral/10 text-coral-dark",
  // Utilisateurs
  Actif: "bg-coral/10 text-coral-dark",
  Suspendu: "bg-brick/10 text-brick",
  // Paiements
  Payé: "bg-coral/10 text-coral-dark",
  Échoué: "bg-brick/10 text-brick",
  // Avis
  Signalé: "bg-brick/10 text-brick",
};

/**
 * Pill — badge de statut compact (Publié, Brouillon, En attente, Actif,
 * Payé, Signalé…). Ajoutez de nouveaux statuts dans `TONE` ci-dessus plutôt
 * que d'inventer une classe de couleur au point d'appel.
 */
export default function Pill({ children }) {
  const tone = TONE[children] || "bg-ivory-dark text-ink-soft";
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${tone}`}>
      {children}
    </span>
  );
}
