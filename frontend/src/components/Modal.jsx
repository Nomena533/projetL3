import { useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

/**
 * Modal — boîte de dialogue générique (confirmation d'achat, aperçu de
 * certificat, etc.). Fond assombri en fade-in, panneau en fade-up : les deux
 * animations utilisent les keyframes déjà définies dans index.css.
 */
export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-5" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-3xl bg-ivory p-7 shadow-2xl shadow-brick/20 animate-fade-up">
        <div className="flex items-start justify-between gap-4">
          {title && <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>}
          <button
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-ivory-dark hover:text-ink"
            aria-label="Fermer"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
