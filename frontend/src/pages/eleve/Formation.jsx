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
import { useLevel } from "../../app/hooks/useLevel";
import { useEffect, useState } from "react";
import { getUserListInscription } from "../../app/api/userApi";
import { useAuth } from "../../app/hooks/useAuth";
import { formatDate } from "../../lib/formatFunction";
import { useUser } from "../../app/hooks/useUser";

const NIVEAUX_TERMINES = NIVEAUX_PARCOURS.filter(
  (n) => n.inscrit && n.progression >= 100,
).length;
const NIVEAU_ACTUEL = NIVEAUX_PARCOURS.find(
  (n) => n.inscrit && n.progression < 100,
);
const NIVEAUX_INSCRITS = NIVEAUX_PARCOURS.filter((n) => n.inscrit).length;

export default function Formation() {
  const { levels } = useLevel();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription } = useUser();

  useEffect(() => {
    fetchUserListInscription(user.id);
  }, [user]);

  console.log("userListInscription : ", userListInscription);
  // return;

  // Un niveau est ouvert à l'inscription si c'est le premier de la liste,
  // ou si le niveau précédent est terminé (inscrit + progression 100%).
  /*
  const peutSinscrire = (index) => {
    if (index === 0) return true;
    const precedent = levels[index - 1];
    console.log("precedent : ", precedent);
    return Boolean(precedent?.inscrit && precedent.progression >= 100);
  };
  */

  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Formation
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Mon parcours
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">
          Ta progression à travers les 4 niveaux de la formation Kalon'ny, de
          l'initiation jusqu'au niveau avancé.
        </p>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-4">
        <StatCard
          icon={HiOutlineAcademicCap}
          label="Niveaux terminés"
          value={`${NIVEAUX_TERMINES} / ${NIVEAUX_PARCOURS.length}`}
        />
        <StatCard
          icon={HiOutlineClock}
          label="Niveau en cours"
          value={NIVEAU_ACTUEL ? NIVEAU_ACTUEL.nom : "Aucun"}
          delay={80}
        />
        <StatCard
          icon={HiOutlineMusicalNote}
          label="Niveaux avec inscription"
          value={userListInscription.length}
          delay={160}
        />
        <StatCard
          icon={HiOutlineMusicalNote}
          label="Instrument à apprendre"
          value={null}
          delay={160}
        />
      </section>

      {/* ---------- PARCOURS ---------- */}
      <section className="relative">
        {/* ligne verticale reliant les cartes */}
        <div
          className="absolute left-6 top-6 bottom-6 w-px bg-ivory-dark sm:left-7"
          aria-hidden="true"
        />

        <div className="space-y-5">
          {levels.map((n, i) => {
            const inscription = userListInscription.filter(
              (inscription) => inscription.niveau_id === n.id,
            );
            const inscrit = inscription.length === 1;
            const nouveau = inscription.length === 0;

            // const termine = n.inscrit && n.progression >= 100;
            // const enCours = n.inscrit && n.progression < 100;
            // const accessible = peutSinscrire(i);

            return (
              <>
                <AnimatedSection
                  key={n.id}
                  delay={i * 90}
                  className="relative flex gap-4 sm:gap-5"
                >
                  {/* pastille d'étape */}
                  {/* <div
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-ivory font-display text-sm font-semibold shadow-md sm:h-14 sm:w-14 ${
                    termine
                      ? "bg-coral text-ivory"
                      : enCours
                        ? "bg-amber text-ink"
                        : "bg-ivory-dark text-ink-soft"
                  }`}
                >
                  {termine ? (
                    <HiOutlineCheckCircle size={20} />
                  ) : n.inscrit ? (
                    n.ordre
                  ) : (
                    <HiOutlineLockClosed size={17} />
                  )}
                </div> */}
                  <div
                    className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-ivory font-display text-sm font-semibold shadow-md sm:h-14 sm:w-14 ${
                      inscrit
                        ? "bg-amber text-ink"
                        : "bg-ivory-dark text-ink-soft"
                    }`}
                  >
                    {inscrit ? n.id : <HiOutlineLockClosed size={17} />}
                  </div>

                  {/* carte niveau */}
                  {/* Blocs pour afficher l'état du niveau : inscrit ou non  */}
                  <div
                    className={`flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                      inscrit
                        ? "border-ivory-dark bg-white/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10"
                        : "border-dashed border-ivory-dark bg-ivory-dark/20"
                    }`}
                  >
                    <div
                      className={`flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                        inscrit
                          ? "border-ivory-dark bg-white/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10"
                          : "border-dashed border-ivory-dark bg-ivory-dark/20"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-lg font-semibold text-ink">
                              {n.name === "initiation"
                                ? "Initiation"
                                : n.name === "debutant"
                                  ? "Débutant"
                                  : n.name === "intermediaire"
                                    ? "Intermédiaire"
                                    : "Avancé"}
                            </h3>
                            {/* Bloc pour présenter l'état du niveau : termine / enCours / aucunDesDeux */}
                            {/* <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                            termine
                              ? "bg-coral/10 text-coral-dark"
                              : enCours
                                ? "bg-amber/20 text-ink"
                                : "bg-ivory-dark text-ink-soft"
                          }`}
                        > */}
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide bg-coral/10 text-coral-dark`}
                            >
                              {/* {termine ? "Terminé" : enCours ? "En cours" : "Non commencé"} */}
                              "Terminé" / "En cours" / "Non commencé"
                            </span>
                          </div>
                          <p className="mt-1 font-body text-sm text-ink-soft">
                            {n.description}
                          </p>
                          <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                            <HiOutlineClock size={13} /> Durée : {n.duree}
                            {inscription.map((ins) => (
                              <span className="ml-2">
                                · Inscrit le {formatDate(ins.created_at)}{" "}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>

                      {/* Bar de progression pour les niveaux si inscrit */}
                      {/* {n.inscrit && (
                    <div className="mt-4">
                      <div className="h-1.5 w-full rounded-full bg-ivory-dark">
                        <div
                          className="h-1.5 rounded-full bg-coral transition-all duration-500"
                          style={{ width: `${n.progression}%` }}
                        />
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                        {n.progression}% terminé
                      </p>
                    </div>
                  )} */}

                      {/* Bloc pour afficher le lien en fonction de l'état du niveau : inscrit ou non */}
                      {/* {inscrit ? (
                    <Link
                      to={`/eleve/formation/${n.id}`}
                      className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors duration-300 hover:text-brick"
                    >
                      Voir le détail de ma formation
                      <HiOutlineArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  ) : accessible ? (
                    <Link
                      to={`/inscription?niveau=${n.id}`}
                      className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:text-coral-dark"
                    >
                      S'inscrire à ce niveau
                      <HiOutlineArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                    ) : (
                      <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-soft/70">
                      <HiOutlineLockClosed size={14} />
                      Termine le niveau précédent pour débloquer l'inscription
                      </span>
                      )} */}
                      {inscrit ? (
                        <Link
                          to={`/eleve/formation/${n.name}`}
                          className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors duration-300 hover:text-brick"
                        >
                          Voir le détail de ma formation
                          <HiOutlineArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      ) : n.id === 1 || n.id === 4 ? (
                        <Link
                          to={`/inscription?niveau=${n.name}`}
                          className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:text-coral-dark"
                        >
                          S'inscrire à ce niveau
                          <HiOutlineArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      ) : (
                        <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-soft/70">
                          <HiOutlineLockClosed size={14} />
                          Termine le niveau précédent pour débloquer
                          l'inscription
                        </span>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
}
