import { Link } from "react-router-dom";

/**
 * Logo — icône "valiha" (lignes verticales inspirées du zither en bambou malgache)
 * + nom de la plateforme. Utilisé dans la Navbar et le Footer.
 *
 * Props :
 *  - variant : "dark" (texte foncé, fond clair) | "light" (texte clair, fond foncé)
 *  - size    : "sm" | "md" | "lg"
 */
export default function Logo({ variant = "dark", size = "md" }) {
  const textColor = variant === "light" ? "text-ivory" : "text-ink";
  const subColor = variant === "light" ? "text-amber-light" : "text-coral-dark";

  const sizes = {
    sm: { icon: 30, title: "text-lg", sub: "text-[10px]" },
    md: { icon: 38, title: "text-xl", sub: "text-[11px]" },
    lg: { icon: 48, title: "text-2xl", sub: "text-xs" },
  };
  const s = sizes[size];

  // Hauteurs procédurales des "cordes" du valiha, déterministes (pas de Math.random)
  const heights = [0.55, 0.85, 1, 0.7, 0.9, 0.6];

  return (
    <Link to="/" className="group flex items-center gap-3 shrink-0" aria-label="Kalon'ny — Accueil">
      <span
        className="relative flex items-end gap-0.75 rounded-xl p-2 transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ width: s.icon, height: s.icon, background: "linear-gradient(135deg, var(--color-coral), var(--color-brick))" }}
      >
        {heights.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-amber-light origin-bottom animate-string"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-tight ${s.title} ${textColor}`}>
          Kalon<span className="text-coral">'</span>ny
        </span>
        <span className={`font-mono uppercase tracking-[0.18em] ${s.sub} ${subColor}`}>
          École de musique
        </span>
      </span>
    </Link>
  );
}
