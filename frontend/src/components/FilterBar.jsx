import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

/**
 * Barre de filtre réutilisable pour les pages de liste (cours, leçons,
 * ressources, élèves, corrections…). Auto-suffisant : ne dépend d'aucune
 * donnée externe, ne fait que recevoir des valeurs/handlers en props.
 *
 * @param {string} searchValue - valeur courante du champ de recherche
 * @param {(v: string) => void} onSearchChange
 * @param {string} [searchPlaceholder]
 * @param {Array<{ name: string, label: string, value: string, onChange: (v: string) => void, options: Array<{value:string,label:string}> }>} [filters]
 *   Liste de selects additionnels (ex. statut, instrument, type de ressource…)
 * @param {number} [resultCount] - nombre d'éléments après filtrage
 * @param {number} [totalCount] - nombre total d'éléments avant filtrage
 * @param {boolean} [hasActiveFilters] - affiche le bouton "Réinitialiser" si vrai
 * @param {() => void} [onReset]
 */
export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Rechercher…",
  filters = [],
  resultCount,
  totalCount,
  hasActiveFilters = false,
  onReset,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ivory-dark bg-white/70 p-3 sm:p-3.5">
      <label className="relative min-w-45 flex-1">
        <HiOutlineMagnifyingGlass
          size={15}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
        />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-ivory-dark bg-white/80 py-2.5 pl-9 pr-4 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
        />
      </label>

      {filters.map((f) => (
        <select
          key={f.name}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="rounded-full border border-ivory-dark bg-white/80 px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
        >
          <option value="">{f.label}</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ))}

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-brick"
        >
          <HiOutlineXMark size={13} /> Réinitialiser
        </button>
      )}

      {resultCount != null && totalCount != null && (
        <span className="shrink-0 font-mono text-xs text-ink-soft">
          {resultCount} / {totalCount}
        </span>
      )}
    </div>
  );
}
