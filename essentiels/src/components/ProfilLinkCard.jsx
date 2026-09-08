import { Link } from "react-router-dom";
import { HiOutlineUserCircle, HiOutlineArrowRight } from "react-icons/hi2";
import AnimatedSection from "./AnimatedSection";

/**
 * Carte de renvoi vers la page "Profil" (nom, photo, e-mail, mot de passe…).
 * Utilisée dans les pages Paramètres, qui ne gèrent plus que les préférences
 * (apparence, langue, notifications…) et non plus l'identité de l'utilisateur.
 *
 * ⚠️ Ajuste la prop `to` si le chemin de ta route Profil diffère.
 */
export default function ProfilLinkCard({ to = "/profil", delay = 0 }) {
  return (
    <AnimatedSection delay={delay} className="flex h-full flex-col justify-between rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/10 text-coral-dark">
          <HiOutlineUserCircle size={18} />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Profil</h3>
          <p className="mt-0.5 font-body text-sm text-ink-soft">
            Nom, photo, e-mail et mot de passe se gèrent depuis ta page de profil.
          </p>
        </div>
      </div>

      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-coral"
      >
        Aller à mon profil
        <HiOutlineArrowRight size={15} />
      </Link>
    </AnimatedSection>
  );
}
