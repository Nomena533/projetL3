import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineLockClosed,
  HiOutlineBanknotes,
} from "../../lib/icons";
import AnimatedSection from "../../components/AnimatedSection";
import { NIVEAUX_PARCOURS } from "../../lib/mockFormationData";
import { useLevel } from "../../app/hooks/useLevel";

export default function FormationPublique() {
  const { levels } = useLevel();

  
  const location = useLocation();
  console.log(location);
  
  // console.log(levels); return;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6">
      <AnimatedSection className="text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Formation Kalon'ny
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Choisis ton niveau
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink-soft">
          Découvre les 4 niveaux du parcours Kalon'ny. L'inscription directe est
          ouverte pour les niveaux{" "}
          <span className="font-semibold text-ink">Initiation</span> et{" "}
          <span className="font-semibold text-ink">Avancé</span>. Les autres
          niveaux se débloquent progressivement, en terminant le niveau
          précédent.
        </p>
      </AnimatedSection>

      <div className="space-y-4">
        {levels.map((n, i) => {
          let ouvertInscription;
          if (n.name === "initiation") {
            ouvertInscription = true;
          } else if (n.name === "debutant") {
            ouvertInscription = false;
          } else if (n.name === "intermediaire") {
            ouvertInscription = false;
          } else if (n.name === "avance") {
            ouvertInscription = true;
          }
          return (
            <AnimatedSection
              key={n.id}
              delay={i * 90}
              className="flex flex-col gap-4 rounded-2xl border border-ivory-dark bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
            >
              {/* pastille niveau */}

              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-base font-semibold sm:h-16 sm:w-16 ${
                  ouvertInscription
                    ? "bg-coral/10 text-coral-dark"
                    : "bg-ivory-dark text-ink-soft"
                }`}
              >
                {i+1}
              </div>

              {/* détail */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {n.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                      ouvertInscription
                        ? "bg-coral/10 text-coral-dark"
                        : "bg-ivory-dark text-ink-soft"
                    }`}
                  >
                    {ouvertInscription ? "Inscription ouverte" : "Progressif"}
                  </span>
                </div>
                <p className="mt-1 font-body text-sm text-ink-soft">
                  {n.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <HiOutlineClock size={13} /> {n.duree}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineBanknotes size={13} />{" "}
                    {n.prix_mensuel.toLocaleString("fr-MG")} Ar/mois
                  </span>
                  <span>
                    Droit d'inscription :{" "}
                    {n.droit_inscription.toLocaleString("fr-MG")} Ar
                  </span>
                </div>
              </div>

              {/* action */}
              <div className="shrink-0 sm:w-48">
                {ouvertInscription ? (
                  <Link
                    to={`/inscription?niveau=${n.id}`}
                    className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-coral px-4 py-2.5 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick sm:w-auto"
                  >
                    S'inscrire
                    <HiOutlineArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                ) : (
                  <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-dashed border-ivory-dark px-4 py-2.5 font-body text-sm font-medium text-ink-soft sm:w-auto">
                    <HiOutlineLockClosed size={14} />
                    Débloqué par progression
                  </span>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
