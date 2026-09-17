import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "../lib/icons";
// ⚠️ À vérifier : chemin/API du LangContext déjà présent dans le projet
// (FR/Malagasy, persistance localStorage). Adapter l'import et les noms
// `lang` / `setLang` ci-dessous si votre contexte expose une autre forme
// (ex: `t`, `locale`, `setLocale`...).
import { useLang } from "../app/hooks/useLang";

const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "mg", label: "Malagasy" },
];

/**
 * Petit menu déroulant de choix de langue pour le Navbar public,
 * déclenché par une icône globe. Suit le même pattern d'ouverture/fermeture
 * que UserMenu / NotificationBell (clic extérieur + touche Échap).
 */
export default function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const { lang, setLang } = useLang();

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
        title="Choisir la langue"
        aria-label="Choisir la langue"
        aria-haspopup="menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ivory-dark"
      >
        <Globe size={19} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-lg border border-ivory-dark bg-ivory shadow-lg shadow-black/5"
        >
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              role="menuitem"
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2.5 font-body text-sm text-ink-soft transition-colors hover:bg-ivory-dark hover:text-ink"
            >
              {label}
              {lang === code && <Check size={15} className="text-coral" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
