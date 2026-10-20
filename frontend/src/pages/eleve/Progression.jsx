import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import { useAuth } from "../../app/hooks/useAuth";
import { useUser } from "../../app/hooks/useUser";
import { useSoumission } from "../../app/hooks/useSoumission";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";
import { capitalize, formatDate } from "../../lib/formatFunction";
import {
  ETATS_NIVEAU,
  LIBELLE_ACTION_NIVEAU,
  calculProgression,
  getEtatNiveau,
  lireExamen,
  parseDureeMois,
} from "../../lib/parcoursUtils";

// Progression réelle de l'élève, calculée à partir de ses inscriptions et de ses
// soumissions renvoyées par l'API (plus aucune donnée simulée).
export default function Progression() {
  const { t } = useLang();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription } = useUser();
  const { soumission } = useSoumission();

  // Chargement des inscriptions de l'élève (spinner plein écran + erreur « Réessayer »)
  const load = useAsyncAction({ initialPending: !!user, initialLabel: "Chargement de la progression" });

  const charger = () => {
    if (!user) return;
    return load.run("Chargement de la progression", () => fetchUserListInscription(user.id));
  };

  useEffect(() => {
    charger();
  }, [user]);

  const niveaux = userListInscription.map((inscription) => {
    const dureeMois = parseDureeMois(inscription.level?.duree);
    const progression = calculProgression(inscription.date_debut, dureeMois);
    const examen = lireExamen(inscription);
    const etat = getEtatNiveau(inscription, progression, examen);
    return { inscription, dureeMois, progression, examen, etat };
  });

  const certificats = niveaux.filter((n) => n.etat === "reussi");

  const evaluations = (soumission ?? [])
    .filter((s) => Number(s.user_id) === Number(user?.id))
    .sort((a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0));

  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Suivi")}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Ma progression")}</h2>
      </AnimatedSection>

      {load.pending || load.error ? (
        <ActionFeedback action={load} variant="fetch" />
      ) : (
        <>
          {/* ---------- PAR NIVEAU ---------- */}
          <section>
            <AnimatedSection>
              <h3 className="mb-4 font-display text-lg font-semibold text-ink">{t("Mes niveaux")}</h3>
            </AnimatedSection>
            {niveaux.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
                {t("Tu n'es inscrit à aucun niveau pour le moment.")}
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {niveaux.map((n, i) => {
                  const meta = ETATS_NIVEAU[n.etat];
                  const pct = Math.round(n.progression.avancement);
                  return (
                    <AnimatedSection
                      key={n.inscription.id}
                      delay={i * 90}
                      className="rounded-2xl border border-ivory-dark bg-white/60 p-6 dark:bg-white/10"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-base font-semibold text-ink">
                          {capitalize(n.inscription.level?.name)}
                        </p>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${meta.badge}`}
                        >
                          {t(meta.label)}
                        </span>
                      </div>

                      {(n.inscription.instruments ?? []).length > 0 && (
                        <p className="mt-2 flex flex-wrap gap-1.5">
                          {n.inscription.instruments.map((instrument) => (
                            <span
                              key={instrument.id ?? instrument.name}
                              className="rounded-full bg-ivory-dark/50 px-2.5 py-0.5 font-body text-xs text-ink-soft"
                            >
                              {instrument.name}
                            </span>
                          ))}
                        </p>
                      )}

                      {n.progression.demarre ? (
                        <>
                          <div
                            className="mt-5 h-2 w-full rounded-full bg-ivory-dark"
                            role="progressbar"
                            aria-label={t("Progression du niveau")}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={pct}
                          >
                            <div
                              className="h-2 rounded-full bg-coral transition-all duration-700"
                              style={{ width: `${n.progression.avancement}%` }}
                            />
                          </div>
                          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
                            {t("{{progression}}% terminé", { progression: pct })} ·{" "}
                            {t("Mois {{moisActuel}} sur {{dureeMois}}", {
                              moisActuel: n.progression.moisActuel,
                              dureeMois: n.dureeMois,
                            })}
                          </p>
                          <Link
                            to={`/eleve/formation/${n.inscription.level?.name}`}
                            className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors duration-300 hover:text-brick"
                          >
                            {t(LIBELLE_ACTION_NIVEAU[n.etat] ?? "Voir le détail de ma formation")}
                            <HiOutlineArrowRight
                              size={14}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </Link>
                        </>
                      ) : (
                        <p className="mt-4 flex items-center gap-1.5 font-body text-sm text-ink-soft">
                          <HiOutlineClock size={14} />
                          {t("La progression démarrera à l'activation de ton inscription.")}
                        </p>
                      )}
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </section>

          {/* ---------- ÉVALUATIONS ---------- */}
          <section>
            <AnimatedSection>
              <h3 className="mb-4 font-display text-lg font-semibold text-ink">{t("Mes évaluations")}</h3>
            </AnimatedSection>
            {evaluations.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
                {t("Tes exercices soumis et leurs notes apparaîtront ici.")}
              </p>
            ) : (
              <ul className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
                {evaluations.map((s) => (
                  <li key={s.id} className="px-5 py-3.5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <p className="min-w-[8rem] flex-1 font-body text-sm font-semibold text-ink">
                        {s.exercice?.titre ?? t("Exercice")}
                      </p>
                      {s.created_at && (
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                          {formatDate(s.created_at)}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                          s.note != null ? "bg-coral/15 text-coral-dark" : "bg-amber/20 text-ink"
                        }`}
                      >
                        {s.note != null ? t("Note : {{note}}", { note: s.note }) : t("En attente de correction")}
                      </span>
                    </div>
                    {s.commentaire && (
                      <p className="mt-1.5 whitespace-pre-line font-body text-xs leading-relaxed text-ink-soft">
                        <span className="font-semibold text-ink">{t("Commentaire du professeur")} : </span>
                        {s.commentaire}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ---------- CERTIFICATS ---------- */}
          <section>
            <AnimatedSection>
              <h3 className="mb-4 font-display text-lg font-semibold text-ink">{t("Mes certificats")}</h3>
            </AnimatedSection>
            <div className="grid gap-5 sm:grid-cols-2">
              {certificats.map((n, i) => (
                <AnimatedSection
                  key={n.inscription.id}
                  delay={i * 90}
                  className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brick via-coral-dark to-coral p-6"
                >
                  <HiOutlineAcademicCap size={24} className="text-amber-light" />
                  <p className="mt-4 font-display text-lg font-semibold text-ivory">
                    {t("Niveau {{nom}} validé", { nom: capitalize(n.inscription.level?.name) })}
                  </p>
                  {n.examen.derniere?.publie_le && (
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ivory/60">
                      {t("Obtenu le {{date}}", { date: formatDate(n.examen.derniere.publie_le) })}
                    </p>
                  )}
                  <ValihaMotif
                    className="pointer-events-none absolute right-4 top-4 h-16 w-16 opacity-40"
                    count={12}
                    tone="amber"
                  />
                </AnimatedSection>
              ))}
              <AnimatedSection
                delay={certificats.length * 90}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ivory-dark p-6 text-center"
              >
                <HiOutlineCheckCircle size={22} className="text-ink-soft" />
                <p className="mt-3 font-body text-xs leading-relaxed text-ink-soft">
                  {t("Valide un niveau en réussissant son examen de passage pour obtenir ton prochain certificat.")}
                </p>
              </AnimatedSection>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
