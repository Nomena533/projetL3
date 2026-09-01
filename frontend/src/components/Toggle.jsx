export default function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex cursor-pointer select-none items-center justify-between gap-4 py-4">
      {(label || description) && (
        <span className="flex-1">
          {label && <span className="block font-body text-sm font-semibold text-ink">{label}</span>}
          {description && <span className="mt-0.5 block font-body text-xs text-ink-soft">{description}</span>}
        </span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-emerald-500" : "bg-ivory-dark"
        }`}
      >
        {/* Le span est positionné en absolute avec un décalage fixe (left-0.5),
            puis déplacé avec translate-x. La largeur du cercle (w-5) + les marges (0.5 de chaque
            côté) tiennent exactement dans le rail (w-11 / h-6), donc il ne peut plus déborder. */}
        <span
          className={`absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}
