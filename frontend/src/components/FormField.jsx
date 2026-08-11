import { useId } from "react";

/**
 * FormField — champ de formulaire réutilisable (auth, profil, réservation…).
 * Bordure ivory-dark → coral au focus, label mono en majuscules comme les
 * "eyebrows" du Home. `rightElement` permet d'ajouter un bouton (ex. afficher
 * le mot de passe) sans complexifier l'API du composant.
 */
export default function FormField({ label, icon: Icon, type = "text", value, rightElement, error, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white/70 px-4 py-3 transition-colors duration-300 focus-within:border-coral ${
          error ? "border-brick/60" : "border-ivory-dark"
        }`}
      >
        {Icon && <Icon size={16} className="shrink-0 text-ink-soft" />}
        <input
          id={id}
          type={type}
          value={value}
          className="w-full bg-transparent font-body text-sm text-ink placeholder:text-ink-soft/60 outline-none"
          {...props}
        />
        {rightElement}
      </div>
      {error && <p className="mt-1.5 font-body text-xs text-brick">{error}</p>}
    </div>
  );
}
