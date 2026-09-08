import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import ValihaMotif from "../../components/ValihaMotif";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <ValihaMotif count={20} tone="coral" className="h-14" />
      <p className="mt-6 font-display text-6xl font-semibold text-coral/30">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Cette page a changé de tempo</h1>
      <p className="mt-2 max-w-sm font-body text-sm text-ink-soft">
        La page que vous cherchez n'existe pas ou plus. Revenez à l'accueil pour continuer votre exploration.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
      >
        Retour à l'accueil <HiOutlineArrowRight />
      </Link>
    </section>
  );
}
