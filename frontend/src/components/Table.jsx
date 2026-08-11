/**
 * Table primitives — en-têtes et cellules réutilisées par les tableaux de
 * l'espace Professeur (Mes cours, Élèves…). Même typographie que le reste du
 * design system : eyebrow mono pour les en-têtes, texte body pour les cellules.
 */
export function Th({ children }) {
  return (
    <th className="px-5 py-3.5 text-left font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
      {children}
    </th>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`px-5 py-4 font-body text-sm text-ink ${className}`}>{children}</td>;
}
