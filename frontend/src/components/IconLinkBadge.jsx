import { Link } from "react-router-dom";

/**
 * Icône cliquable (lien) avec un badge de compteur, utilisée dans les
 * en-têtes des espaces Élève / Professeur / Administrateur pour les
 * messages et notifications non lus.
 *
 * Props :
 * - to     : route vers laquelle rediriger
 * - icon   : composant icône (depuis ../lib/icons)
 * - count  : nombre d'éléments non lus (le badge est masqué si count <= 0)
 * - label  : libellé accessible (title / aria-label)
 */
export default function IconLinkBadge({ to, icon: Icon, count = 0, label }) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className="relative grid h-9 w-9 place-items-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-teal-950"
    >
      <Icon size={18} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-coral px-1 font-mono text-[10px] font-semibold leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
