import { useParams, Link } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronUp,
  HiOutlineCheckCircle,
  HiOutlinePlayCircle,
  HiOutlineLockClosed,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import {
  NIVEAUX_PARCOURS,
  FORMATIONS_PAR_NIVEAU,
} from "../../lib/mockFormationData";
import { useAuth } from "../../app/hooks/useAuth";
import { useUser } from "../../app/hooks/useUser";
import { useEffect } from "react";
import useGetCour from "../../app/hooks/useGetCour";
import { HiMusicNote } from "react-icons/hi";
import { capitalize } from "../../lib/formatFunction";

const TONE_BG = {
  coral: "bg-coral",
  amber: "bg-amber",
  brick: "bg-brick",
};

export default function FormationDetail() {
  const { niveauName } = useParams();

  const { user } = useAuth();

  const { userListInscription, fetchUserListInscription } = useUser();

  const { courPublie, setCours, fetchCours } = useGetCour();

  useEffect(() => {
    if (user) {
      fetchUserListInscription(user.id);
    }
  }, [user]);
  console.log("userListInscription : ", userListInscription);
  console.log("courPublie : ", courPublie);

  const formation = userListInscription.find(
    (inscription) => inscription.level.name === niveauName,
  );

  console.log("formation : ", formation);

  const calculProgression = (dateDebut, dureeTotale) => {
    const debut = new Date(dateDebut);
    const aujourdHui = new Date();

    let moisEcoules =
      (aujourdHui.getFullYear() - debut.getFullYear()) * 12 +
      (aujourdHui.getMonth() - debut.getMonth());

    if (aujourdHui.getDate() < debut.getDate()) {
      moisEcoules--;
    }

    moisEcoules = Math.max(0, moisEcoules);

    const moisActuel = Math.min(moisEcoules + 1, dureeTotale);

    const progression = Math.min((moisActuel / dureeTotale) * 100, 100);

    const moisRestants = Math.max(dureeTotale - moisActuel, 0);

    return {
      moisEcoules,
      moisActuel,
      moisRestants,
      progression,
    };
  };

  const progressionValues = calculProgression(
    formation?.date_debut,
    formation?.level.duree.split(" ")[0],
  );

  console.log("progressionValues : ", progressionValues);
  console.log("moisActuel : ", progressionValues?.moisActuel);

  const dureeTotale = Array.from(
    { length: formation?.level.duree.split(" ")[0] },
    (_, idx) => idx + 1,
  );

  const dateFin = (() => {
    if (!formation?.date_debut) return null;
    const debut = new Date(formation.date_debut);
    const fin = new Date(debut);
    fin.setMonth(fin.getMonth() + Number(dureeTotale.length));
    return fin;
  })();

  const formatDate = (date) => {
    if (!date) return "—";
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  let instruments = null;

  if (formation && courPublie) {
    instruments = formation.instruments;
  }

  if (!formation) {
    return (
      <p className="font-body text-sm text-ink-soft">Chargement du cours…</p>
    );
  }

  const formations = FORMATIONS_PAR_NIVEAU[formation.id] || [];

  return (
    <div className="space-y-8">
      <Link
        to="/eleve/formation"
        className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour à mon parcours
      </Link>

      {/* <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Niveau {niveau.ordre}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{niveau.nom}</h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">{niveau.description}</p>
        <div className="mt-4 h-1.5 w-full max-w-md rounded-full bg-ivory-dark">
          <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${niveau.progression}%` }} />
        </div>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{niveau.progression}% terminé</p>
      </AnimatedSection> */}
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Niveau {formation.level.id}
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {capitalize(formation.level.name)}
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft"></p>
      </AnimatedSection>

      <AnimatedSection className="rounded-2xl border border-ivory-dark bg-white/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">
            Progression du niveau
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">
            {Math.round(progressionValues.progression)}% terminé
          </span>
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
              Début
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              {formatDate(formation.date_debut)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
              Fin
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              {formatDate(dateFin)}
            </span>
          </div>
        </div>

        <div className="relative mt-3 pt-3">
          {/* Ligne de base */}
          <div className="absolute left-3 right-3 top-6 h-0.5 -translate-y-1/2 bg-ivory-dark" />
          {/* Ligne de progression */}
          <div
            className="absolute left-3 top-6 h-0.5 -translate-y-1/2 bg-coral transition-all duration-500"
            style={{
              width: `calc(${progressionValues.progression}% - ${
                progressionValues.progression >= 100 ? "24px" : "12px"
              })`,
            }}
          />

          <div className="relative flex justify-between">
            {dureeTotale.map((mois) => {
              const estTermine = mois < progressionValues.moisActuel;
              const estActuel = mois === progressionValues.moisActuel;

              return (
                <div
                  key={mois}
                  className="flex flex-1 flex-col items-center gap-2 text-center"
                >
                  <div className="flex h-4 items-end">
                    {estActuel && (
                      <HiOutlineChevronUp
                        size={14}
                        className="text-coral-dark"
                      />
                    )}
                  </div>
                  <div
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                      estTermine
                        ? "border-coral bg-coral text-white"
                        : estActuel
                          ? "border-coral bg-white ring-4 ring-coral/20"
                          : "border-ivory-dark bg-white"
                    }`}
                  >
                    {estTermine && <HiOutlineCheckCircle size={14} />}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    Mois {mois}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide ${
                      estActuel ? "text-coral-dark" : "text-transparent"
                    }`}
                  >
                    Actuel
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          <span>
            Mois écoulés :{" "}
            <span className="text-ink">{progressionValues.moisEcoules}</span>
          </span>
          <span>
            Mois restants :{" "}
            <span className="text-ink">{progressionValues.moisRestants}</span>
          </span>
        </div>
      </AnimatedSection>

      <div className="space-y-6">
        {/* {formations.map((f, i) => (
            <AnimatedSection
              key={f.instrument}
              delay={i * 90}
              className="rounded-2xl border border-ivory-dark bg-white/60 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl ${TONE_BG[f.tone]}`}
                  >
                    <span className="opacity-90">{f.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {f.instrument}
                    </h3>
                    <p className="font-body text-sm text-ink-soft">
                      avec {f.prof}
                    </p>
                  </div>
                </div>
                <div className="min-w-[140px] flex-1 sm:flex-none sm:w-40">
                  <div className="h-1.5 w-full rounded-full bg-ivory-dark">
                    <div
                      className="h-1.5 rounded-full bg-coral transition-all duration-500"
                      style={{ width: `${f.progression}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-right font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    {f.progression}%
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Cours suivis
                  </h4>
                  <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                    {f.cours.map((c) => (
                      <Link
                        key={c.id}
                        to={`/eleve/cours/${c.coursId}`}
                        className="flex items-center gap-2.5 px-4 py-3 transition-colors duration-200 hover:bg-ivory-dark/40"
                      >
                        {c.statut === "Terminé" ? (
                          <HiOutlineCheckCircle
                            size={16}
                            className="shrink-0 text-coral-dark"
                          />
                        ) : (
                          <HiOutlinePlayCircle
                            size={16}
                            className="shrink-0 text-ink-soft"
                          />
                        )}
                        <span className="flex-1 font-body text-sm text-ink">
                          {c.titre}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                          {c.statut}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Exercices réalisés
                  </h4>
                  <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                    {f.exercices.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center gap-2.5 px-4 py-3"
                      >
                        <HiOutlineClipboardDocumentCheck
                          size={16}
                          className="shrink-0 text-coral-dark"
                        />
                        <span className="flex-1 font-body text-sm text-ink">
                          {e.titre}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                          {e.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))} 
           */}
        {instruments &&
          instruments.map((instrument, i) => {
            // let courFormation;
            const courFormation = courPublie.filter(
              (cour) =>
                cour.level.id === formation.niveau_id &&
                cour.instrument.id === instrument.id,
            );
            console.log("courFormation : ", courFormation);

            return (
              <AnimatedSection
                key={instrument.name}
                delay={i * 90}
                className="rounded-2xl border border-ivory-dark bg-white/60 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl bg-amber">
                      <span className="opacity-90">
                        <HiMusicNote />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        Mes cours de {instrument.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      Cours suivis
                    </h4>
                    <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                      {courFormation.length === 0 ? (
                        <div className="flex items-center justify-center gap-2.5 px-4 py-3 transition-colors duration-200 bg-amber-100 hover:bg-amber-200">
                          <span className="font-body text-sm text-ink text-center">
                            Aucune cour publiée pour l'instant
                          </span>
                        </div>
                      ) : (
                        courFormation.map((c) => (
                          <Link
                            key={c.id}
                            to={`/eleve/cours/${c.id}`}
                            className="flex items-center gap-2.5 px-4 py-3 transition-colors duration-200 hover:bg-ivory-dark/40"
                          >
                            {/* {c.statut === "Terminé" ? (
                        <HiOutlineCheckCircle
                          size={16}
                          className="shrink-0 text-coral-dark"
                        />
                      ) : (
                        <HiOutlinePlayCircle
                        size={16}
                        className="shrink-0 text-ink-soft"
                        />
                      )} */}
                            <HiOutlineCheckCircle
                              size={16}
                              className="shrink-0 text-coral-dark"
                            />
                            <HiOutlinePlayCircle
                              size={16}
                              className="shrink-0 text-ink-soft"
                            />
                            <span className="flex-1 font-body text-sm text-ink">
                              {capitalize(c.titre)}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                              STATUT(TERMINE OU en cours)
                            </span>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      Exercices réalisés
                    </h4>
                    <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                      {/* {f.exercices.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center gap-2.5 px-4 py-3"
                    >
                      <HiOutlineClipboardDocumentCheck
                        size={16}
                        className="shrink-0 text-coral-dark"
                      />
                      <span className="flex-1 font-body text-sm text-ink">
                        {e.titre}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                        {e.note}
                      </span>
                    </div>
                  ))} */}
                      <div
                        key=""
                        className="flex items-center gap-2.5 px-4 py-3"
                      >
                        <HiOutlineClipboardDocumentCheck
                          size={16}
                          className="shrink-0 text-coral-dark"
                        />
                        <span className="flex-1 font-body text-sm text-ink">
                          TITRE
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                          NOTE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
      </div>
    </div>
  );
}
