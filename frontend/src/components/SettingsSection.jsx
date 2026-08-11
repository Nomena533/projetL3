/**
 * SettingsSection — bloc de réglages avec icône, titre, description et une
 * pile d'options séparées par des filets (`divide-y`). Utilisé par les pages
 * Paramètres des trois espaces (Élève, Professeur, Administrateur) pour
 * garder une présentation identique.
 */
export default function SettingsSection({ icon: Icon, title, description, delay = 0, className = "", children }) {
  return (
    <div className={`rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/10 text-coral-dark">
          <Icon size={18} />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
          {description && <p className="mt-0.5 font-body text-sm text-ink-soft">{description}</p>}
        </div>
      </div>
      <div className="mt-4 divide-y divide-ivory-dark border-t border-ivory-dark">{children}</div>
    </div>
  );
}
