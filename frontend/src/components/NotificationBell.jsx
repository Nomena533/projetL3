import { useEffect, useRef, useState } from "react";
import { Bell } from "../lib/icons";

/**
 * Icône "cloche" avec badge de compteur, qui ouvre un panneau listant les
 * dernières notifications non lues (au lieu de rediriger vers une page
 * dédiée, qui n'existe pas forcément pour chaque espace).
 *
 * Props :
 * - count : nombre de notifications non lues (badge masqué si 0)
 * - items : [{ id, title, time }] dernières notifications à afficher
 *           (tableau vide -> état "Aucune nouvelle notification")
 */
export default function NotificationBell({ count = 0, items = [] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

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
        title="Notifications"
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={open}
        className="relative grid h-9 w-9 place-items-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-teal-950"
      >
        <Bell size={18} />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-coral px-1 font-mono text-[10px] font-semibold leading-none text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-80 max-w-[90vw] origin-top-right overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg shadow-black/5"
        >
          <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
            <p className="font-display text-sm text-ink">Notifications</p>
            {count > 0 && (
              <span className="font-mono text-xs text-stone-400">
                {count} non lue{count > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-6 text-center font-body text-sm text-stone-400">
                Aucune nouvelle notification
              </p>
            ) : (
              items.map((n) => (
                <div
                  key={n.id}
                  className="border-b border-stone-50 px-4 py-3 last:border-b-0 hover:bg-stone-50"
                >
                  <p className="font-body text-sm text-ink">{n.title}</p>
                  {n.time && (
                    <p className="mt-0.5 font-mono text-xs text-stone-400">
                      {n.time}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
