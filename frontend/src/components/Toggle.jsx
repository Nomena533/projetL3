/**
 * Toggle — interrupteur pilule utilisé pour les réglages (mode sombre,
 * moyens de paiement, notifications…). Teinte "actif" en coral, piste
 * inactive en ivory-dark : aucune nouvelle couleur.
 */
export default function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex items-center justify-between gap-6 py-4">
      <span className="min-w-0">
        <span className="block font-body text-sm font-semibold text-ink">{label}</span>
        {description && <span className="mt-0.5 block font-body text-xs text-ink-soft">{description}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${checked ? "bg-coral" : "bg-ivory-dark"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}
