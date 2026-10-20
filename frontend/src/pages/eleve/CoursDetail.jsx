import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiStar } from "react-icons/hi";
import {
  HiOutlineChevronLeft,
  HiOutlineCheckCircle,
  HiOutlinePlayCircle,
  HiOutlineHeart,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineSpeakerWave,
  HiOutlineAcademicCap,
  HiOutlinePhoto,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineArrowRight,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import useGetCour from "../../app/hooks/useGetCour";
import { BASE_URL } from "../../app/api/api";
import { capitalize } from "../../lib/formatFunction";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback, DataGate } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";

const INCLUS = [
  { icon: HiOutlineVideoCamera, label: "Leçons vidéo téléchargeables" },
  { icon: HiOutlineDocumentText, label: "Partitions PDF incluses" },
  { icon: HiOutlineSpeakerWave, label: "Pistes audio d'accompagnement" },
  { icon: HiOutlineAcademicCap, label: "Certificat à la fin du parcours" },
];

const NIVEAU_BADGE = {
  initiation: "bg-amber/20 text-brick",
  debutant: "bg-coral/10 text-coral-dark",
  intermediaire: "bg-amber/20 text-brick",
  avance: "bg-brick/10 text-brick",
};

export default function CourseDetail() {
  const { t } = useLang();
  const { id } = useParams();
  const [fav, setFav] = useState(false);

  const { cour, fetchCourDetail } = useGetCour();
  // Chargement du cours (plein écran + erreur « Réessayer »)
  const load = useAsyncAction({ initialPending: true, initialLabel: "Chargement du cours" });
  const charger = () => load.run("Chargement du cours", () => fetchCourDetail(id));

  useEffect(() => {
    charger();
  }, [id]);

  // On ignore une réponse qui correspondrait encore au cours précédemment ouvert.
  const courDetail =
    cour?.cour && (cour.cour.id == null || String(cour.cour.id) === String(id))
      ? cour.cour
      : null;
  const lecons = courDetail ? (cour.lesson ?? []) : [];

  // ---------- États : chargement / erreur / introuvable ----------
  if (load.pending || load.error) {
    return <ActionFeedback action={load} variant="fetch" />;
  }

  if (!courDetail) {
    return (
      <div className="space-y-6">
        <Link
          to="/eleve/formation"
          className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
        >
          <HiOutlineChevronLeft size={13} /> {t("Retour à mon parcours")}
        </Link>
        <div
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-brick/40 bg-brick/5 p-5"
        >
          <HiOutlineExclamationTriangle size={20} className="shrink-0 text-brick" />
          <p className="flex-1 font-body text-sm text-ink">
            {t("Ce cours est introuvable ou n'est plus disponible.")}
          </p>
          <button
            type="button"
            onClick={charger}
            className="inline-flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors hover:border-coral/40 hover:text-coral-dark"
          >
            <HiOutlineArrowPath size={14} /> {t("Réessayer")}
          </button>
        </div>
      </div>
    );
  }

  // ---------- Données dérivées ----------
  const nomNiveau = courDetail.level?.name;
  const lienRetour = nomNiveau ? `/eleve/formation/${nomNiveau}` : "/eleve/formation";
  const faites = lecons.filter((l) => l.fait).length;
  const pctFaites = lecons.length > 0 ? Math.round((faites / lecons.length) * 100) : 0;
  const prochaineLecon = lecons.find((l) => !l.fait) ?? lecons[0] ?? null;
  const libelleAction =
    faites === 0
      ? t("Commencer le cours")
      : faites >= lecons.length
        ? t("Revoir le cours")
        : t("Continuer le cours");
  const lienLecon = (l) => `/eleve/formation/lecon/${l.id}?courId=${courDetail.id}`;

  // Prérequis : affichés seulement s'ils sont renseignés par l'API.
  const prerequis = Array.isArray(courDetail.prerequis)
    ? courDetail.prerequis
    : courDetail.prerequis
      ? [courDetail.prerequis]
      : [];

  // Avis : fournis par l'API ; aucune donnée simulée.
  const avis = cour?.avis ?? courDetail.avis ?? [];

  return (
    <div className="space-y-6">
      <Link
        to={lienRetour}
        className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> {t("Retour au niveau")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Bloc 1 — Visuel + identité du cours */}
          <AnimatedSection className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
            <div className="flex h-56 items-center justify-center overflow-hidden">
              {courDetail.image ? (
                <img
                  src={`${BASE_URL}/storage/${courDetail.image}`}
                  alt={courDetail.titre}
                  className="h-full w-full object-cover"
                />
              ) : (
                <HiOutlinePhoto size={28} className="text-ink-soft" aria-hidden="true" />
              )}
            </div>

            <div className="p-6">
              {nomNiveau && (
                <span
                  className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${NIVEAU_BADGE[nomNiveau] ?? "bg-ivory-dark text-ink-soft"}`}
                >
                  {capitalize(nomNiveau)}
                </span>
              )}
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {capitalize(courDetail.titre)}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ivory-dark pt-4 font-body text-xs text-ink-soft">
                {courDetail.prof && (
                  <span className="flex items-center gap-1.5">
                    <HiOutlineUser size={14} className="text-coral-dark" />
                    {courDetail.prof.name} {courDetail.prof.firstname}
                  </span>
                )}
                {courDetail.duree && (
                  <span className="flex items-center gap-1.5">
                    <HiOutlineClock size={14} className="text-coral-dark" />
                    {courDetail.duree}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <HiOutlineBookOpen size={14} className="text-coral-dark" />
                  {t("{{length}} leçons", { length: lecons.length })}
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Bloc 2 — Description + prérequis */}
          <AnimatedSection
            delay={60}
            className="rounded-2xl border border-ivory-dark bg-white/60 p-6 dark:bg-white/10"
          >
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">
              {t("À propos de ce cours")}
            </h3>
            <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              {capitalize(courDetail.description)}
            </p>

            {prerequis.length > 0 && (
              <div className="mt-5 border-t border-ivory-dark pt-4">
                <h4 className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  <HiOutlineClipboardDocumentList size={14} /> {t("Prérequis")}
                </h4>
                <ul className="list-disc space-y-1 pl-5 font-body text-sm text-ink-soft">
                  {prerequis.map((p, idx) => (
                    <li key={idx}>{typeof p === "string" ? p : (p.libelle ?? p.titre)}</li>
                  ))}
                </ul>
              </div>
            )}
          </AnimatedSection>

          {/* Bloc 3 — Contenu / leçons */}
          <AnimatedSection delay={120}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-ink">
                {t("Contenu du cours")}
              </h3>
              {lecons.length > 0 && (
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  {t("{{faites}} / {{total}} leçons terminées", {
                    faites,
                    total: lecons.length,
                  })}
                </span>
              )}
            </div>

            {lecons.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
                {t("Aucune leçon n'est encore publiée pour ce cours.")}
              </p>
            ) : (
              <ol className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
                {lecons.map((l, idx) => {
                  const estProchaine = prochaineLecon?.id === l.id && faites > 0 && !l.fait;
                  return (
                    <li key={l.id}>
                      <Link
                        to={lienLecon(l)}
                        className="flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-200 hover:bg-ivory-dark/40"
                      >
                        {l.fait ? (
                          <HiOutlineCheckCircle size={18} className="shrink-0 text-coral-dark" />
                        ) : (
                          <HiOutlinePlayCircle size={18} className="shrink-0 text-ink-soft" />
                        )}
                        <span className="sr-only">
                          {l.fait ? t("Leçon terminée") : t("Leçon à faire")}
                        </span>
                        <span className="font-mono text-[11px] text-ink-soft">{idx + 1}.</span>
                        <span className="flex-1 font-body text-sm text-ink">
                          {capitalize(l.titre)}
                        </span>
                        {estProchaine && (
                          <span className="rounded-full bg-coral/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-coral-dark">
                            {t("À reprendre")}
                          </span>
                        )}
                        <span className="font-mono text-xs text-ink-soft">
                          {capitalize(l.duree)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </AnimatedSection>

          {/* Bloc 4 — Avis */}
          <AnimatedSection delay={160}>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">
              {t("Avis des élèves")}
            </h3>
            {avis.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
                {t("Aucun avis pour ce cours pour le moment.")}
              </p>
            ) : (
              <div className="space-y-4">
                {avis.map((a, idx) => (
                  <div
                    key={a.id ?? idx}
                    className="rounded-2xl border border-ivory-dark bg-white/60 p-5 dark:bg-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="flex gap-0.5 text-amber"
                        role="img"
                        aria-label={t("{{note}} sur 5", { note: a.note })}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <HiStar
                            key={i}
                            size={13}
                            className={i < a.note ? "" : "opacity-25"}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-xs text-ink-soft">
                        {a.nom ?? a.utilisateur?.name ?? a.user?.name} ·{" "}
                        {a.date ?? (a.created_at ? new Date(a.created_at).toLocaleDateString() : "")}
                      </span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                      {a.texte ?? a.commentaire}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>

        {/* Colonne latérale — action principale + ce qui est inclus */}
        <AnimatedSection
          delay={100}
          as="aside"
          className="h-fit rounded-2xl border border-ivory-dark bg-white/70 p-6 dark:bg-white/10 lg:sticky lg:top-6"
        >
          {prochaineLecon && (
            <div className="mb-5">
              {lecons.length > 0 && (
                <>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <span>{t("Ma progression")}</span>
                    <span className="font-semibold text-ink">{pctFaites}%</span>
                  </div>
                  <div
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ivory-dark"
                    role="progressbar"
                    aria-label={t("Ma progression")}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pctFaites}
                  >
                    <div
                      className="h-full rounded-full bg-coral transition-all duration-500"
                      style={{ width: `${pctFaites}%` }}
                    />
                  </div>
                </>
              )}
              <Link
                to={lienLecon(prochaineLecon)}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-coral py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
              >
                {libelleAction}
                <HiOutlineArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              {faites > 0 && faites < lecons.length && (
                <p className="mt-2 text-center font-body text-xs text-ink-soft">
                  {capitalize(prochaineLecon.titre)}
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setFav(!fav)}
            aria-pressed={fav}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ivory-dark py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
          >
            <HiOutlineHeart
              size={16}
              className={fav ? "fill-coral text-coral" : "text-ink-soft"}
            />
            {fav ? t("Dans mes favoris") : t("Ajouter aux favoris")}
          </button>

          <div className="mt-6 space-y-2.5 border-t border-ivory-dark pt-5">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              {t("Ce cours inclut")}
            </p>
            {INCLUS.map((it) => (
              <p
                key={it.label}
                className="flex items-center gap-2.5 font-body text-xs text-ink-soft"
              >
                <it.icon size={14} className="shrink-0 text-coral-dark" /> {t(it.label)}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
