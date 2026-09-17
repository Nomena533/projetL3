import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ChevronDown } from "../lib/icons";

/**
 * Menu déroulant affiché en cliquant sur l'avatar (initiales) d'un utilisateur
 * connecté. Regroupe les liens "Profil" / "Paramètres" (ou tout autre lien
 * fourni via `items`) ainsi que la déconnexion.
 *
 * Utilisé dans LayoutAdmin, LayoutStudent, LayoutProf et le Navbar public
 * pour éviter de dupliquer la logique d'ouverture/fermeture du dropdown.
 *
 * Props :
 * - initials       : texte affiché dans le rond avatar (ex: "RA")
 * - displayName     : nom complet affiché en tête du menu
 * - subLabel        : texte secondaire (email, rôle...) affiché sous le nom
 * - items           : [{ to, label, icon: Icon }] liens du menu (Profil, Paramètres, Mon espace...)
 * - onLogout        : callback appelé au clic sur "Déconnexion"
 * - avatarClassName : classes tailwind supplémentaires pour l'avatar (couleurs, taille...)
 */
export default function UserMenu({
  initials = "?",
  displayName = "",
  subLabel = "",
  items = [],
  onLogout,
  avatarClassName = "bg-amber-200 text-teal-950",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Ferme le menu au clic en dehors ou en appuyant sur Échap
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full pr-1 transition-colors hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-900/30"
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm ${avatarClassName}`}
        >
          {initials}
        </span>
        <ChevronDown
          size={14}
          className={`hidden text-stone-400 transition-transform sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg shadow-black/5"
        >
          {(displayName || subLabel) && (
            <div className="border-b border-stone-100 px-4 py-3">
              {displayName && (
                <p className="truncate font-body text-sm font-medium text-ink">
                  {displayName}
                </p>
              )}
              {subLabel && (
                <p className="truncate font-body text-xs text-stone-500">
                  {subLabel}
                </p>
              )}
            </div>
          )}

          {items.length > 0 && (
            <div className="py-1.5">
              {items.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 font-body text-sm text-stone-600 transition-colors hover:bg-stone-50 hover:text-teal-950"
                >
                  {Icon && <Icon size={16} className="shrink-0 text-stone-400" />}
                  {label}
                </Link>
              ))}
            </div>
          )}

          {onLogout && (
            <div className="border-t border-stone-100 py-1.5">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 font-body text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                <LogOut size={16} className="shrink-0" />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
