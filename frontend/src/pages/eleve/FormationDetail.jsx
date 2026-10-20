import { useParams, Link } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronUp,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlayCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineAcademicCap,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { useAuth } from "../../app/hooks/useAuth";
import { useUser } from "../../app/hooks/useUser";
import { useEffect, useState } from "react";
import useGetCour from "../../app/hooks/useGetCour";
import { useSoumission } from "../../app/hooks/useSoumission";
import { HiMusicNote, HiXCircle } from "react-icons/hi";
import { capitalize } from "../../lib/formatFunction";
import { useLang } from "../../app/hooks/useLang";
import { dateLocale } from "../../lib/i18nRuntime";
import { ActionFeedback } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";
import {
  ETATS_NIVEAU,
  calculDateFin,
  calculProgression,
  estPublie,
  getEtatNiveau,
  lireDecision,
  lireExamen,
  parseDureeMois,
} from "../../lib/parcoursUtils";
import { BookOpen } from "../../lib/icons";

const TYPES_EXAMEN = {
  theorique: "Théorique",
  pratique: "Pratique",
  mixte: "Mixte (théorie et pratique)",
};

// Texte « prochaine étape » affiché en tête de page selon l'état du niveau.
const PROCHAINE_ETAPE = {
  en_attente: "Ton inscription est en cours de validation. Le niveau sera accessible dès son activation.",
  en_cours: "Suis tes cours et réalise les exercices de chaque leçon pour te préparer à l'examen de passage.",
  examen_a_passer: "Le niveau est terminé : vérifie tes conditions d'accès et prépare ton examen de passage.",
  resultat_attendu: "Ta copie a été remise. Le résultat apparaîtra ici dès sa publication officielle.",
  reussi: "Niveau validé. Tu peux consulter ton résultat ci-dessous.",
  rattrapage: "Tes progrès sont conservés. Consulte le commentaire de ton professeur pour préparer le rattrapage.",
};

export default function FormationDetail() {
  const { t } = useLang();
  const { niveauName } = useParams();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription } = useUser();
  const { courPublie } = useGetCour();
  const { soumission } = useSoumission();

  // Chargement des inscriptions de l'élève (spinner plein écran + erreur « Réessayer »)
  const load = useAsyncAction({ initialPending: !!user, initialLabel: "Chargement de la formation" });

  const charger = () => {
    if (!user) return;
    return load.run("Chargement de la formation", () => fetchUserListInscription(user.id));
  };

  useEffect(() => {
    charger();
  }, [user]);

  const formation = userListInscription.find(
    (inscription) => inscription.level?.name === niveauName,
  );

  const lienRetour = (
    <Link
      to="/eleve/formation"
      className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
    >
      <HiOutlineChevronLeft size={13} /> {t("Retour à mon parcours")}
    </Link>
  );

  // ---------- États de chargement / erreur / introuvable ----------
  if (load.pending || load.error) {
    return <ActionFeedback action={load} variant="fetch" />;
  }

  if (!formation) {
    return (
      <div className="space-y-6">
        {lienRetour}
        <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
          {t("Aucune inscription trouvée pour ce niveau.")}
        </p>
      </div>
    );
  }

  // ---------- Données dérivées ----------
  const dureeMois = parseDureeMois(formation.level?.duree);
  const progression = calculProgression(formation.date_debut, dureeMois);
  const dateFin = calculDateFin(formation.date_debut, dureeMois);
  const infosExamen = lireExamen(formation);
  const { examen, tentatives, derniere, dateExamen, eligibilite } = infosExamen;
  const etat = getEtatNiveau(formation, progression, infosExamen);
  const meta = ETATS_NIVEAU[etat];
  const decision = lireDecision(derniere);
  const mois = Array.from({ length: dureeMois }, (_, idx) => idx + 1);

  const formatDate = (date) => {
    if (!date) return "—";
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(dateLocale(), {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Badge de l'examen : le résultat officiel prime sur la date.
  const examenInfo = (() => {
    if (decision === "reussi")
      return { label: "Réussi", badge: "bg-coral/15 text-coral-dark", hint: "Résultat officiel publié." };
    if (decision === "echec")
      return { label: "Rattrapage", badge: "bg-brick/10 text-brick", hint: "Résultat officiel publié." };
    if (derniere?.soumis_le)
      return { label: "Résultat à venir", badge: "bg-amber/20 text-ink", hint: "Le résultat sera visible après sa publication officielle." };

    if (!dateExamen) {
      return {
        label: "À planifier",
        badge: "bg-ivory-dark text-ink-soft",
        hint: "La date sera communiquée à la fin du niveau.",
      };
    }
    const jours = Math.ceil((dateExamen - new Date()) / (1000 * 60 * 60 * 24));
    if (jours < 0)
      return { label: "Passé", badge: "bg-ivory-dark text-ink-soft", hint: "L'examen a déjà eu lieu." };
    if (jours === 0)
      return { label: "Aujourd'hui", badge: "bg-coral text-white", hint: "Bonne chance !" };
    if (jours <= 14)
      return {
        label: jours > 1 ? "Dans {{jours}} jours" : "Dans {{jours}} jour",
        jours,
        badge: "bg-coral text-white",
        hint: "Pensez à réviser vos cours et exercices.",
      };
    return {
      label: "Dans {{jours}} jours",
      jours,
      badge: "bg-amber-100 text-coral-dark",
      hint: "Après la fin du niveau, vous passerez l'examen de passage.",
    };
  })();

  // Éligibilité : fournie par l'API (Laravel reste l'autorité). Aucun critère n'est
  // inventé côté React.
  const criteres = Array.isArray(eligibilite?.criteres) ? eligibilite.criteres : [];
  const obligatoires = criteres.filter((c) => c.obligatoire !== false);
  const eligible =
    typeof eligibilite?.eligible === "boolean"
      ? eligibilite.eligible
      : criteres.length > 0
        ? obligatoires.every((c) => c.rempli)
        : null;

  const instruments = courPublie ? (formation.instruments ?? []) : null;

  return (
    <div className="space-y-8">
      {lienRetour}

      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          {t("Niveau {{id}}", { id: formation.level.id })}
        </span>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {capitalize(formation.level.name)}
          </h2>
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${meta.badge}`}
          >
            {t(meta.label)}
          </span>
        </div>
        {PROCHAINE_ETAPE[etat] && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-coral/5 px-4 py-3 font-body text-sm text-ink-soft">
            <HiOutlineInformationCircle size={18} className="mt-0.5 shrink-0 text-coral-dark" />
            <span>
              <span className="font-semibold text-ink">{t("Prochaine étape")} : </span>
              {t(PROCHAINE_ETAPE[etat])}
              {etat === "en_cours" && (
                <>
                  {" "}
                  <a href="#cours-du-niveau" className="font-semibold text-coral-dark hover:text-brick">
                    {t("Voir mes cours")}
                  </a>
                </>
              )}
            </span>
          </p>
        )}
      </AnimatedSection>

      {/* ---------- PROGRESSION DU NIVEAU ---------- */}
      <AnimatedSection className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">
            {t("Progression du niveau")}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">
            {t("{{v0}}% terminé", { v0: Math.round(progression.avancement) })}
          </span>
        </div>

        {!progression.demarre ? (
          <p className="mt-4 font-body text-sm text-ink-soft">
            {t("La progression démarrera à la date de début de ton niveau.")}
          </p>
        ) : (
          <>
            <div className="mt-6 flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
                  {t("Début")}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  {formatDate(formation.date_debut)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
                  {t("Fin")}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  {formatDate(dateFin)}
                </span>
              </div>
            </div>

            <div className="mt-3 overflow-x-auto">
              <div className="relative min-w-[16rem] pt-3">
                <div className="absolute left-3 right-3 top-6 h-0.5 -translate-y-1/2 bg-ivory-dark" />
                <div
                  className="absolute left-3 top-6 h-0.5 -translate-y-1/2 bg-coral transition-all duration-500"
                  style={{
                    width: `calc(${progression.progression}% - ${progression.progression >= 100 ? "24px" : "12px"})`,
                  }}
                />

                <ol className="relative flex justify-between">
                  {mois.map((m) => {
                    const estTermine = progression.termine || m < progression.moisActuel;
                    const estActuel = !progression.termine && m === progression.moisActuel;
                    return (
                      <li
                        key={m}
                        aria-current={estActuel ? "step" : undefined}
                        className="flex flex-1 flex-col items-center gap-2 text-center"
                      >
                        <div className="flex h-4 items-end">
                          {estActuel && (
                            <HiOutlineChevronUp size={14} className="text-coral-dark" />
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
                          {t("Mois {{mois}}", { mois: m })}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wide ${
                            estActuel ? "text-coral-dark" : "text-transparent"
                          }`}
                          aria-hidden={!estActuel}
                        >
                          {t("Actuel")}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              <span>
                {t("Mois écoulés :")}{" "}
                <span className="text-ink">{progression.moisEcoules}</span>
              </span>
              <span>
                {t("Mois restants :")}{" "}
                <span className="text-ink">
                  {progression.termine ? 0 : progression.moisRestants}
                </span>
              </span>
            </div>
          </>
        )}
      </AnimatedSection>

      {/* ---------- EXAMEN DE PASSAGE ---------- */}
      <AnimatedSection
        delay={60}
        className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-amber text-2xl">
              <HiOutlineAcademicCap className="opacity-90" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                {t("Examen de passage")}
              </h3>
              <p className="mt-0.5 font-body text-sm text-ink-soft">{t(examenInfo.hint)}</p>
            </div>
          </div>
          <span
            className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide ${examenInfo.badge}`}
          >
            {t(examenInfo.label, { jours: examenInfo.jours })}
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2.5 rounded-xl border border-ivory-dark bg-ivory/40 px-4 py-3">
            <HiOutlineCheckCircle size={18} className="shrink-0 text-ink-soft" />
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                {t("Fin du niveau")}
              </span>
              <span className="font-body text-sm text-ink">{formatDate(dateFin)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-ivory-dark bg-ivory/40 px-4 py-3">
            <HiOutlineCalendarDays size={18} className="shrink-0 text-coral-dark" />
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                {t("Date de l'examen")}
              </span>
              <span className="font-body text-sm font-semibold text-ink">
                {dateExamen ? formatDate(dateExamen) : t("À définir")}
              </span>
            </div>
          </div>
        </div>

        {/* --- Éligibilité --- */}
        <div className="mt-6">
          <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
            {t("Conditions d'accès à l'examen")}
          </h4>
          {criteres.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ivory-dark px-4 py-3 font-body text-sm text-ink-soft">
              {t("Les conditions d'accès à l'examen seront précisées par l'école. L'accès est vérifié par la plateforme au moment de l'examen.")}
            </p>
          ) : (
            <>
              <p
                className={`mb-3 flex items-center gap-2 rounded-xl px-4 py-3 font-body text-sm font-medium ${
                  eligible ? "bg-coral/5 text-coral-dark" : "bg-amber/15 text-ink"
                }`}
              >
                {eligible ? (
                  <HiOutlineCheckCircle size={16} />
                ) : (
                  <HiOutlineExclamationTriangle size={16} />
                )}
                {eligible
                  ? t("Tu remplis toutes les conditions obligatoires.")
                  : t("Il manque au moins une condition obligatoire avant de pouvoir passer l'examen.")}
              </p>
              <ul className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                {criteres.map((c, idx) => (
                  <li key={c.code ?? idx} className="flex items-center gap-2.5 px-4 py-3">
                    {c.rempli ? (
                      <HiOutlineCheckCircle size={18} className="shrink-0 text-coral-dark" />
                    ) : (
                      <HiOutlineXCircle size={18} className="shrink-0 text-brick" />
                    )}
                    <div className="flex-1">
                      <p className="font-body text-sm text-ink">{c.libelle}</p>
                      {c.detail && (
                        <p className="font-body text-xs text-ink-soft">{c.detail}</p>
                      )}
                    </div>
                    <span className="sr-only">
                      {c.rempli ? t("Condition remplie") : t("Condition manquante")}
                    </span>
                    {c.obligatoire !== false && (
                      <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                        {t("Obligatoire")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* --- Préparation --- */}
        {examen && (
          <div className="mt-6">
            <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t("Préparation")}
            </h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {examen.type_examen && (
                <div className="rounded-xl border border-ivory-dark bg-ivory/40 px-4 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{t("Format")}</p>
                  <p className="font-body text-sm text-ink">
                    {t(TYPES_EXAMEN[examen.type_examen] ?? capitalize(examen.type_examen))}
                  </p>
                </div>
              )}
              {examen.duree_minutes && (
                <div className="rounded-xl border border-ivory-dark bg-ivory/40 px-4 py-3">
                  <p className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <HiOutlineClock size={12} /> {t("Durée")}
                  </p>
                  <p className="font-body text-sm text-ink">
                    {t("{{n}} min", { n: examen.duree_minutes })}
                  </p>
                </div>
              )}
              {examen.note_minimale != null && (
                <div className="rounded-xl border border-ivory-dark bg-ivory/40 px-4 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{t("Note minimale")}</p>
                  <p className="font-body text-sm text-ink">{examen.note_minimale}</p>
                </div>
              )}
            </div>
            {examen.titre && (
              <p className="mt-3 font-body text-sm font-semibold text-ink">{examen.titre}</p>
            )}
            {examen.consignes && (
              <p className="mt-1 whitespace-pre-line font-body text-sm leading-relaxed text-ink-soft">
                {examen.consignes}
              </p>
            )}
            {Array.isArray(examen.ressources) && examen.ressources.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {examen.ressources.map((r, idx) => (
                  <li key={r.id ?? idx}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-coral-dark hover:text-brick"
                    >
                      <HiOutlineDocumentText size={15} /> {r.titre}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* --- Résultat --- */}
        {derniere && (
          <div className="mt-6">
            <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t("Résultat")}
            </h4>
            {estPublie(derniere) ? (
              <div
                className={`rounded-xl border px-4 py-4 ${
                  decision === "reussi"
                    ? "border-coral/40 bg-coral/5"
                    : "border-brick/30 bg-brick/5"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-base font-semibold text-ink">
                    {decision === "reussi"
                      ? t("Niveau validé")
                      : decision === "echec"
                        ? t("Niveau non validé — rattrapage")
                        : t("Résultat publié")}
                  </p>
                  {derniere.note != null && (
                    <span className="font-mono text-sm font-semibold text-ink">
                      {t("Note : {{note}}", { note: derniere.note })}
                    </span>
                  )}
                </div>
                {derniere.publie_le && (
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    {t("Publié le {{date}}", { date: formatDate(derniere.publie_le) })}
                  </p>
                )}
                {derniere.commentaire_professeur && (
                  <p className="mt-3 whitespace-pre-line font-body text-sm leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">{t("Commentaire du professeur")} : </span>
                    {derniere.commentaire_professeur}
                  </p>
                )}
                <p className="mt-3 font-body text-xs text-ink-soft">
                  {decision === "reussi"
                    ? t("L'accès au niveau suivant dépend des règles de l'école.")
                    : t("Tes progrès et ton historique sont conservés.")}
                </p>
              </div>
            ) : (
              <p className="flex items-center gap-2 rounded-xl bg-amber/15 px-4 py-3 font-body text-sm text-ink">
                <HiOutlineClock size={16} />
                {derniere.soumis_le
                  ? t("Ta copie a été remise le {{date}}. Le résultat sera visible après sa publication officielle.", {
                      date: formatDate(derniere.soumis_le),
                    })
                  : t("Une tentative est en cours ou autorisée.")}
              </p>
            )}
          </div>
        )}

        {/* --- Historique des tentatives --- */}
        {tentatives.length > 1 && (
          <div className="mt-6">
            <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t("Historique des tentatives")}
            </h4>
            <ul className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
              {tentatives.map((tent, idx) => {
                const d = lireDecision(tent);
                return (
                  <li key={tent.id ?? idx} className="flex items-center gap-3 px-4 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      {t("Tentative {{n}}", { n: tent.numero_tentative ?? tentatives.length - idx })}
                    </span>
                    <span className="flex-1 font-body text-sm text-ink">
                      {tent.soumis_le ? formatDate(tent.soumis_le) : "—"}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      {d === "reussi"
                        ? t("Réussi")
                        : d === "echec"
                          ? t("Non validé")
                          : tent.soumis_le
                            ? t("Résultat à venir")
                            : t("En cours")}
                      {estPublie(tent) && tent.note != null && ` · ${tent.note}`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </AnimatedSection>

      {/* ---------- COURS PAR INSTRUMENT ---------- */}
      <div id="cours-du-niveau" className="space-y-6 scroll-mt-6">
        {instruments && instruments.length === 0 && (
          <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
            {t("Aucun instrument n'est rattaché à ce niveau pour le moment.")}
          </p>
        )}
        {instruments &&
          instruments.map((instrument, i) => {
            const courFormation = courPublie.filter(
              (cour) =>
                cour.level?.id === formation.niveau_id &&
                cour.instrument?.id === instrument.id,
            );

            // Exercices réalisés : soumissions de l'élève rattachées aux cours affichés.
            // Dépend de la forme de la réponse API (exercice.lecon.cour_id) ; liste vide sinon.
            const idsCours = new Set(courFormation.map((c) => Number(c.id)));
            const exercicesRealises = (soumission ?? []).filter(
              (s) =>
                Number(s.user_id) === Number(user?.id) &&
                idsCours.has(Number(s.exercice?.lecon?.cour_id ?? s.exercice?.lecon?.cour?.id)),
            );

            return (
              <AnimatedSection
                key={instrument.id ?? instrument.name}
                delay={i * 90}
                className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-amber text-2xl">
                    <span className="opacity-90">
                      <BookOpen />
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {t("Mes cours de {{name}}", { name: instrument.name })}
                  </h3>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {t("Cours suivis")}
                    </h4>
                    <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                      {courFormation.length === 0 ? (
                        <div className="flex items-center gap-2.5 bg-amber/15 text-ink px-4 py-3">
                          <HiXCircle/>
                          <span className="font-body text-sm text-ink">
                            {t("Aucun cours publié pour l'instant")}
                          </span>
                        </div>
                      ) : (
                        courFormation.map((c) => (
                          <Link
                            key={c.id}
                            to={`/eleve/formation/cours/${c.id}`}
                            className="flex items-center gap-2.5 px-4 py-3 transition-colors duration-200 hover:bg-ivory-dark/40"
                          >
                            <HiOutlinePlayCircle size={18} className="shrink-0 text-ink-soft" />
                            <span className="flex-1 font-body text-sm text-ink">
                              {capitalize(c.titre)}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                              {c.duree}
                            </span>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {t("Exercices réalisés")}
                    </h4>
                    {exercicesRealises.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-ivory-dark px-4 py-3 font-body text-sm text-ink-soft">
                        {t("Retrouve et réalise les exercices depuis chaque leçon de tes cours.")}
                      </p>
                    ) : (
                      <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                        {exercicesRealises.map((s) => (
                          <div key={s.id} className="flex items-center gap-2.5 px-4 py-3">
                            <HiOutlineClipboardDocumentCheck size={16} className="shrink-0 text-coral-dark" />
                            <span className="flex-1 font-body text-sm text-ink">
                              {s.exercice?.titre}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                              {s.note != null ? s.note : t("En attente de correction")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
      </div>
    </div>
  );
}
