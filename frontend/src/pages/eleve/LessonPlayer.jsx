import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  HiOutlinePlayCircle,
  HiOutlineArrowDownTray,
  HiOutlineSpeakerWave,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineFolderOpen,
  HiOutlineArrowUpTray,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineClock,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import useLesson from "../../app/hooks/useLesson";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "../../lib/formatFunction";
import { getLessonByCour } from "../../app/api/lessonApi";
import { BASE_URL } from "../../app/api/api";
import { getExerciceByLesson } from "../../app/api/exerciceApi";
import { storeSoumission } from "../../app/api/soumissionApi";
import { useSoumission } from "../../app/hooks/useSoumission";
import { useAuth } from "../../app/hooks/useAuth";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback, ErrorRetry, LoadingScreen } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";

// Reprend exactement la même logique d'affichage que dans LeconDetail.jsx,
// pour rester cohérent sur toute la plateforme.
const RESOURCE_ICON = {
  video: HiOutlineVideoCamera,
  audio: HiOutlineSpeakerWave,
  pdf: HiOutlineDocumentText,
};

const RESOURCE_LABEL = {
  video: "Vidéo",
  audio: "Audio",
  pdf: "PDF",
};

// Devine le type de ressource à partir de l'extension du fichier.
// Retourne undefined si le format n'est pas pris en charge.
function guessType(file) {
  const extension = file?.name.split(".").pop()?.toLowerCase();
  if (["mp4", "mov", "webm", "mkv", "avi"].includes(extension)) return "video";
  if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return "audio";
  if (["pdf", "doc", "docx", "xlsx", "xls", "csv", "ppt", "pptx", "txt"].includes(extension))
    return "document";
}

// Reprise de lecture : position mémorisée sur CET appareil uniquement (localStorage),
// en attendant un suivi serveur de la progression des leçons.
function cleReprise(userId, ressourceId) {
  return `aam:reprise:${userId ?? "anon"}:${ressourceId}`;
}
function lirePosition(cle) {
  try {
    const v = Number(window.localStorage.getItem(cle));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}
function ecrirePosition(cle, secondes) {
  try {
    window.localStorage.setItem(cle, String(Math.floor(secondes)));
  } catch {
    /* stockage indisponible : on ignore */
  }
}

export default function LessonPlayer() {
  const { t } = useLang();
  const { id } = useParams();
  const [params] = useSearchParams();
  const courId = params.get("courId");
  const { lessonDetail, fetchLessonDetail } = useLesson();
  const [resource, setResource] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [exercice, setExercice] = useState(null);
  // Trois chargements indépendants + l'envoi de la soumission, chacun avec son spinner et son « Réessayer »
  const loadLecon = useAsyncAction({ initialPending: true, initialLabel: "Chargement de la leçon" });
  const loadLecons = useAsyncAction({ initialPending: true, initialLabel: "Chargement du plan du cours" });
  const loadExercice = useAsyncAction();
  const envoi = useAsyncAction();
  const erreurLecons = !!loadLecons.error;
  const erreurExercice = !!loadExercice.error;
  const { soumission, fetchSoumission } = useSoumission();
  const { user } = useAuth();

  // Soumission de l'exercice par l'élève (fichier + description).
  const soumissionEnvoi = envoi.pending;
  const [soumissionStatut, setSoumissionStatut] = useState(null); // "success" | "error" | null
  const [soumissionMessage, setSoumissionMessage] = useState("");

  const [soumissionForm, setSoumissionForm] = useState({
    description: "",
    type: "",
    fichier: null,
  });

  // Ressource choisie par l'élève dans la liste. null => ressource par défaut
  // (première vidéo de la leçon, si elle existe).
  const [activeResource, setActiveResource] = useState(null);

  const mediaRef = useRef(null);
  const dernierEnregistrement = useRef(0);

  const chargerLecons = () =>
    loadLecons.run("Chargement du plan du cours", async () => {
      const response = await getLessonByCour(courId);
      setLessons(response.data);
    });

  useEffect(() => {
    chargerLecons();
  }, [courId]);

  const chargerExercice = () =>
    loadExercice.run("Chargement de l'exercice", async () => {
      const response = await getExerciceByLesson(id);
      setExercice(response.data[0] ?? null);
    });

  useEffect(() => {
    if (!id) return;
    setExercice(null);
    chargerExercice();
  }, [id]);

  useEffect(() => {
    loadLecon.run("Chargement de la leçon", () => fetchLessonDetail(id));
  }, [id]);

  useEffect(() => {
    if (lessonDetail !== null) {
      setResource(lessonDetail.resource ?? []);
      setLesson(lessonDetail.lesson);
    }
  }, [lessonDetail]);

  // Nouvelle leçon : retour à la vue par défaut et formulaire vierge.
  useEffect(() => {
    setActiveResource(null);
    setSoumissionForm({ description: "", type: "", fichier: null });
    setSoumissionStatut(null);
    setSoumissionMessage("");
  }, [id]);

  const handleChange = (e) => {
    setSoumissionForm({ ...soumissionForm, description: e.target.value });
  };

  const handleFileChange = (e) => {
    const fichier = e.target.files?.[0] ?? null;
    if (!fichier) return;
    const type = guessType(fichier);
    if (!type) {
      setSoumissionStatut("error");
      setSoumissionMessage(t("Ce format de fichier n'est pas pris en charge."));
      return;
    }
    setSoumissionStatut(null);
    setSoumissionMessage("");
    setSoumissionForm({ ...soumissionForm, fichier, type });
  };

  const handleSoumissionSubmit = (e) => {
    e.preventDefault();
    if (!soumissionForm.fichier || !exercice || soumissionEnvoi) return;
    setSoumissionStatut(null);
    setSoumissionMessage("");

    const formData = new FormData();
    formData.append("fichier", soumissionForm.fichier);
    formData.append("description", soumissionForm.description);
    formData.append("type", soumissionForm.type);

    return envoi.run(
      "Envoi de la soumission",
      async () => {
        await storeSoumission(exercice.id, formData);
        // Un échec du rafraîchissement ne doit pas déclencher un nouvel envoi (« Réessayer »).
        await Promise.resolve(fetchSoumission()).catch(() => {});
        setSoumissionStatut("success");
        setSoumissionForm({ description: "", type: "", fichier: null });
      },
      { errorMessage: t("Une erreur est survenue, réessaie.") },
    );
  };

  const CURRENT = lesson && lessons ? lessons.find((l) => l.id === lesson.id) : undefined;
  const indexCourant = CURRENT ? lessons.indexOf(CURRENT) : -1;
  const lessonPrecedente = indexCourant > 0 ? lessons[indexCourant - 1] : null;
  const lessonSuivante =
    indexCourant >= 0 && indexCourant < lessons.length - 1 ? lessons[indexCourant + 1] : null;
  const lessonPath = (l) => `/eleve/lecon/${l.id}?courId=${l.cour_id ?? courId}`;
  const lessonsTerminees = lessons.filter((l) => l.fait).length;

  const exerciceSoumis = soumission?.find(
    (s) =>
      Number(s.exercice_id) === Number(exercice?.id) && Number(s.user_id) === Number(user?.id),
  );

  // Ressource affichée : choix de l'élève, sinon première vidéo de la leçon.
  const premiereVideo = resource.find((r) => r.type === "video") ?? null;
  const ressourceAffichee = activeResource ?? premiereVideo;
  const partitionPdf = resource.find((r) => r.type === "pdf") ?? null;
  const pisteAudio = resource.find((r) => r.type === "audio") ?? null;

  // Reprise de lecture (appareil local) pour vidéo/audio.
  const cle = ressourceAffichee ? cleReprise(user?.id, ressourceAffichee.id) : null;
  const onLoadedMetadata = () => {
    const media = mediaRef.current;
    if (!media || !cle) return;
    const position = lirePosition(cle);
    if (position > 0 && position < (media.duration || Infinity) - 5) media.currentTime = position;
  };
  const onTimeUpdate = () => {
    const media = mediaRef.current;
    if (!media || !cle) return;
    const maintenant = Date.now();
    if (maintenant - dernierEnregistrement.current > 5000) {
      dernierEnregistrement.current = maintenant;
      ecrirePosition(cle, media.currentTime);
    }
  };
  const onEnded = () => cle && ecrirePosition(cle, 0);

  // ---------- États de chargement / erreur ----------
  if (loadLecon.pending || loadLecon.error) {
    return <ActionFeedback action={loadLecon} variant="fetch" />;
  }

  if (!lesson || lesson.id == null || String(lesson.id) !== String(id)) {
    return <LoadingScreen label="Chargement de la leçon" />;
  }

  const urlFichier = (r) => `${BASE_URL}/storage/${r.fichier}`;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {ressourceAffichee ? (
          <AnimatedSection className="space-y-3">
            {activeResource && (
              <button
                type="button"
                onClick={() => setActiveResource(null)}
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
              >
                <HiOutlineChevronLeft size={13} /> {t("Retour à la leçon")}
              </button>
            )}

            <div className="overflow-hidden rounded-2xl border border-ivory-dark bg-ink">
              {ressourceAffichee.type === "video" && (
                <video
                  key={ressourceAffichee.id}
                  ref={mediaRef}
                  controls
                  className="aspect-video w-full bg-black"
                  src={urlFichier(ressourceAffichee)}
                  onLoadedMetadata={onLoadedMetadata}
                  onTimeUpdate={onTimeUpdate}
                  onEnded={onEnded}
                >
                  {t("Ton navigateur ne supporte pas la lecture vidéo.")}
                </video>
              )}

              {ressourceAffichee.type === "audio" && (
                <div className="flex aspect-video flex-col items-center justify-center gap-4 p-8">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory/10 text-amber-light">
                    <HiOutlineSpeakerWave size={28} />
                  </span>
                  <audio
                    key={ressourceAffichee.id}
                    ref={mediaRef}
                    controls
                    className="w-full max-w-md"
                    src={urlFichier(ressourceAffichee)}
                    onLoadedMetadata={onLoadedMetadata}
                    onTimeUpdate={onTimeUpdate}
                    onEnded={onEnded}
                  >
                    {t("Ton navigateur ne supporte pas la lecture audio.")}
                  </audio>
                </div>
              )}

              {ressourceAffichee.type === "pdf" && (
                <iframe
                  title={ressourceAffichee.titre}
                  src={urlFichier(ressourceAffichee)}
                  className="h-[70vh] w-full bg-white"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {capitalize(ressourceAffichee.titre)}
                </h3>
                <p className="font-body text-xs text-ink-soft">
                  {t(RESOURCE_LABEL[ressourceAffichee.type] || "Ressource")}
                  {ressourceAffichee.duree && ` · ${ressourceAffichee.duree}`}
                </p>
              </div>
              {ressourceAffichee.fichier && (
                <a
                  href={urlFichier(ressourceAffichee)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark"
                >
                  <HiOutlineArrowDownTray size={15} /> {t("Télécharger")}
                </a>
              )}
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection className="relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-ink px-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory/10 text-amber-light">
              <HiOutlinePlayCircle size={34} />
            </span>
            <p className="font-body text-sm text-ivory/80">
              {t("Aucune vidéo n'est disponible pour cette leçon.")}
            </p>
            <ValihaMotif
              className="absolute bottom-0 left-0 h-10 w-full opacity-30"
              count={40}
              tone="amber"
            />
          </AnimatedSection>
        )}

        <AnimatedSection delay={60}>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {capitalize(lesson.titre)}
          </h2>
          <p className="mt-1 font-body text-sm text-ink-soft">
            {t("Leçon {{v0}} sur {{length}} · {{duree}}", {
              v0: indexCourant + 1,
              length: lessons.length,
              duree: lesson.duree,
            })}
          </p>
          {resource.some((r) => r.type === "video" || r.type === "audio") && (
            <p className="mt-1 font-body text-[11px] text-ink-soft/80">
              {t("Ta position de lecture est mémorisée sur cet appareil.")}
            </p>
          )}
        </AnimatedSection>

        {/* Accès rapides aux ressources de la leçon */}
        <AnimatedSection delay={100} className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!partitionPdf}
            onClick={() => partitionPdf && setActiveResource(partitionPdf)}
            className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-ivory-dark disabled:hover:text-ink"
          >
            <HiOutlineDocumentText size={15} /> {t("Partition PDF")}
          </button>
          <button
            type="button"
            disabled={!pisteAudio}
            onClick={() => pisteAudio && setActiveResource(pisteAudio)}
            className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-ivory-dark disabled:hover:text-ink"
          >
            <HiOutlineSpeakerWave size={15} /> {t("Piste audio")}
          </button>
        </AnimatedSection>

        {/* Exercice */}
        <AnimatedSection
          delay={140}
          className="rounded-2xl border border-ivory-dark bg-white/60 p-6 dark:bg-white/10"
        >
          {erreurExercice ? (
            <ErrorRetry
              variant="banner"
              title="Chargement de l'exercice : échec"
              message={loadExercice.error}
              onRetry={chargerExercice}
            />
          ) : exercice === null ? (
            <>
              <h3 className="mb-2 font-display text-base font-semibold text-ink">{t("Exercice")}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                {t("Pas d'exercice disponible pour cette leçcon")}
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-2 font-display text-base font-semibold text-ink">{exercice.titre}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-soft">{exercice.description}</p>
              <hr className="mb-4 mt-4 border-ivory-dark" />

              {exerciceSoumis ? (
                <div className="space-y-2 rounded-xl bg-ivory-dark/30 px-4 py-3">
                  <p className="flex items-center gap-2 font-body text-sm font-semibold text-ink">
                    <HiOutlineCheckCircle size={16} className="text-coral-dark" />
                    {t("Vous avez déjà soumis votre réponse")}
                  </p>
                  {exerciceSoumis.note != null ? (
                    <p className="font-body text-sm text-ink-soft">
                      <span className="font-semibold text-ink">{t("Note")} : </span>
                      {exerciceSoumis.note}
                    </p>
                  ) : (
                    <p className="flex items-center gap-1.5 font-body text-xs text-ink-soft">
                      <HiOutlineClock size={13} /> {t("En attente de correction par ton professeur.")}
                    </p>
                  )}
                  {exerciceSoumis.commentaire && (
                    <p className="whitespace-pre-line font-body text-sm text-ink-soft">
                      <span className="font-semibold text-ink">{t("Commentaire du professeur")} : </span>
                      {exerciceSoumis.commentaire}
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSoumissionSubmit} className="space-y-4">
                  <div>
                    <span className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {t("Fichier à soumettre")}
                    </span>
                    <label
                      htmlFor="soumission-fichier"
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-ivory-dark px-4 py-3 font-body text-sm text-ink-soft transition-colors duration-300 focus-within:border-coral/40 hover:border-coral/40 hover:text-coral-dark"
                    >
                      <HiOutlineArrowUpTray size={16} className="shrink-0" />
                      <span className="truncate">
                        {soumissionForm.fichier
                          ? soumissionForm.fichier.name
                          : t("Choisir un fichier depuis mon ordinateur")}
                      </span>
                    </label>
                    <input
                      id="soumission-fichier"
                      type="file"
                      accept="video/*,audio/*,.pdf,.doc,.docx,.xlsx,.xls,.csv,.ppt,.pptx,.txt"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="soumission-description"
                      className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-ink-soft"
                    >
                      {t("Description (facultatif)")}
                    </label>
                    <textarea
                      id="soumission-description"
                      rows={3}
                      name="description"
                      value={soumissionForm.description}
                      onChange={handleChange}
                      placeholder={t("Un mot sur ta soumission pour ton professeur…")}
                      className="w-full resize-none rounded-xl border border-ivory-dark px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink-soft/60 focus:border-coral/40 focus:outline-none"
                    />
                  </div>

                  <ActionFeedback action={envoi} />
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={!soumissionForm.fichier || soumissionEnvoi}
                      aria-busy={soumissionEnvoi}
                      className="rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {soumissionEnvoi ? t("Envoi en cours…") : t("Envoyer au professeur")}
                    </button>

                    <div aria-live="polite">
                      {soumissionStatut === "success" && (
                        <p className="flex items-center gap-1.5 font-body text-xs font-semibold text-coral-dark">
                          <HiOutlineCheckCircle size={14} />
                          {t("Soumission envoyée avec succès !")}
                        </p>
                      )}
                      {soumissionStatut === "error" && (
                        <p role="alert" className="font-body text-xs font-semibold text-brick">
                          {soumissionMessage || t("Une erreur est survenue, réessaie.")}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </AnimatedSection>

        {/* Navigation entre leçons */}
        {(lessonPrecedente || lessonSuivante) && (
          <nav
            aria-label={t("Navigation entre les leçons")}
            className="flex items-center justify-between gap-3"
          >
            {lessonPrecedente ? (
              <Link
                to={lessonPath(lessonPrecedente)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors hover:border-coral/40 hover:text-coral-dark"
              >
                <HiOutlineChevronLeft size={14} /> {t("Leçon précédente")}
              </Link>
            ) : (
              <span />
            )}
            {lessonSuivante && (
              <Link
                to={lessonPath(lessonSuivante)}
                className="inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-sm font-semibold text-ivory transition-colors hover:bg-coral-dark"
              >
                {t("Leçon suivante")} <HiOutlineChevronRight size={14} />
              </Link>
            )}
          </nav>
        )}
      </div>

      <div className="h-fit space-y-6 lg:sticky lg:top-6 lg:col-span-1">
        <AnimatedSection
          delay={80}
          as="aside"
          className="rounded-2xl border border-ivory-dark bg-white/70 p-5 dark:bg-white/10"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">{t("Plan du cours")}</p>
            {lessons.length > 0 && (
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                {t("{{faites}} / {{total}} leçons terminées", {
                  faites: lessonsTerminees,
                  total: lessons.length,
                })}
              </span>
            )}
          </div>

          {erreurLecons ? (
            <ErrorRetry
              variant="banner"
              title="Chargement du plan du cours : échec"
              message={loadLecons.error}
              onRetry={chargerLecons}
            />
          ) : (
            <div className="space-y-1">
              {lessons.map((l) => (
                <Link
                  key={l.id}
                  to={lessonPath(l)}
                  aria-current={l.id === lesson.id ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors duration-200 ${
                    l.id === lesson.id
                      ? "bg-coral/10 text-coral-dark"
                      : "text-ink hover:bg-ivory-dark/40"
                  }`}
                >
                  {l.fait ? (
                    <HiOutlineCheckCircle size={15} className="shrink-0 text-coral-dark" />
                  ) : (
                    <HiOutlinePlayCircle size={15} className="shrink-0 text-ink-soft" />
                  )}
                  <span className="sr-only">{l.fait ? t("Leçon terminée") : t("Leçon à faire")}</span>
                  <span className="flex-1">{capitalize(l.titre)}</span>
                  <span className="font-mono text-[10px] text-ink-soft">{l.duree}</span>
                </Link>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Ressources de la leçon — même logique/infos que LeconDetail.jsx */}
        <AnimatedSection
          delay={180}
          className="rounded-2xl border border-ivory-dark bg-white/60 p-6 dark:bg-white/10"
        >
          <h3 className="mb-4 font-display text-base font-semibold text-ink">
            {t("Ressources de la leçon")}
          </h3>

          {resource.length === 0 ? (
            <p className="font-body text-sm text-ink-soft">{t("Cette leçon n'a pas encore de ressource.")}</p>
          ) : (
            <div className="space-y-3">
              {resource.map((r) => {
                const Icon = RESOURCE_ICON[r.type] || HiOutlineFolderOpen;
                const isActive = ressourceAffichee?.id === r.id;
                return (
                  <div
                    key={r.id}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 transition-colors duration-300 ${
                      isActive ? "border-coral/40 bg-coral/5" : "border-ivory-dark hover:border-coral/30"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveResource(r)}
                      aria-pressed={isActive}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-body text-sm font-semibold text-ink">
                          {r.titre || "_"}
                        </span>
                        <span className="block font-body text-xs text-ink-soft">
                          {t(RESOURCE_LABEL[r.type] || "Ressource")}
                          {r.duree && ` · ${r.duree}`}
                        </span>
                      </span>
                    </button>
                    {r.fichier && (
                      <a
                        href={urlFichier(r)}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label={t("Télécharger le fichier")}
                      >
                        <HiOutlineArrowDownTray size={16} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
