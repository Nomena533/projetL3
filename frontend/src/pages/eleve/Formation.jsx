import { Link } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineMusicalNote,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import StatCard from "../../components/StatCard";
import { NIVEAUX_PARCOURS } from "../../lib/mockFormationData";

const NIVEAUX_TERMINES = NIVEAUX_PARCOURS.filter((n) => n.inscrit && n.progression >= 100).length;
const NIVEAU_ACTUEL = NIVEAUX_PARCOURS.find((n) => n.inscrit && n.progression < 100);
const NIVEAUX_INSCRITS = NIVEAUX_PARCOURS.filter((n) => n.inscrit).length;

export default function Formation() {
  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Formation</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Mon parcours</h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">
          Ta progression à travers les 4 niveaux de la formation Kalon'ny, de l'initiation jusqu'au niveau avancé.
        </p>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard icon={HiOutlineAcademicCap} label="Niveaux terminés" value={`${NIVEAUX_TERMINES} / ${NIVEAUX_PARCOURS.length}`} />
        <StatCard icon={HiOutlineClock} label="Niveau en cours" value={NIVEAU_ACTUEL ? NIVEAU_ACTUEL.nom : "Aucun"} delay={80} />
        <StatCard icon={HiOutlineMusicalNote} label="Niveaux avec inscription" value={NIVEAUX_INSCRITS} delay={160} />
      </section>

      {/* ---------- PARCOURS ---------- */}
      <section className="relative">
        {/* ligne verticale reliant les cartes */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-ivory-dark sm:left-7" aria-hidden="true" />

        <div className="space-y-5">
          {NIVEAUX_PARCOURS.map((n, i) => {
            const termine = n.inscrit && n.progression >= 100;
            const enCours = n.inscrit && n.progression < 100;

            return (
              <AnimatedSection key={n.id} delay={i * 90} className="relative flex gap-4 sm:gap-5">
                {/* pastille d'étape */}
                <div
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-ivory font-display text-sm font-semibold shadow-md sm:h-14 sm:w-14 ${
                    termine
                      ? "bg-coral text-ivory"
                      : enCours
                      ? "bg-amber text-ink"
                      : "bg-ivory-dark text-ink-soft"
                  }`}
                >
                  {termine ? <HiOutlineCheckCircle size={20} /> : n.inscrit ? n.ordre : <HiOutlineLockClosed size={17} />}
                </div>

                {/* carte niveau */}
                <div
                  className={`flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                    n.inscrit
                      ? "border-ivory-dark bg-white/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10"
                      : "border-dashed border-ivory-dark bg-ivory-dark/20"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink">{n.nom}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                            termine
                              ? "bg-coral/10 text-coral-dark"
                              : enCours
                              ? "bg-amber/20 text-ink"
                              : "bg-ivory-dark text-ink-soft"
                          }`}
                        >
                          {termine ? "Terminé" : enCours ? "En cours" : "Non commencé"}
                        </span>
                      </div>
                      <p className="mt-1 font-body text-sm text-ink-soft">{n.description}</p>
                      <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                        <HiOutlineClock size={13} /> Durée : {n.duree}
                        {n.dateInscription && <span className="ml-2">· Inscrit le {n.dateInscription}</span>}
                      </p>
                    </div>
                  </div>

                  {n.inscrit && (
                    <div className="mt-4">
                      <div className="h-1.5 w-full rounded-full bg-ivory-dark">
                        <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${n.progression}%` }} />
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{n.progression}% terminé</p>
                    </div>
                  )}

                  <Link
                    to={n.inscrit ? `/eleve/formation/${n.id}` : `/eleve/inscription?niveau=${n.id}`}
                    className={`group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-colors duration-300 ${
                      n.inscrit ? "text-coral-dark hover:text-brick" : "text-ink hover:text-coral-dark"
                    }`}
                  >
                    {n.inscrit ? "Voir le détail de ma formation" : "S'inscrire à ce niveau"}
                    <HiOutlineArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </div>
  );
}
