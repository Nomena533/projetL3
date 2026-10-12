import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  HiOutlinePlayCircle,
  HiOutlineArrowDownTray,
  HiOutlineSpeakerWave,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineFolderOpen,
  HiOutlineArrowUpTray,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import useLesson from "../../app/hooks/useLesson";
import { useEffect, useState } from "react";
import { capitalize } from "../../lib/formatFunction";
import { getLessonByCour } from "../../app/api/lessonApi";
import { BASE_URL } from "../../app/api/api";
import { getExerciceByLesson } from "../../app/api/exerciceApi";
import { storeSoumission } from "../../app/api/soumissionApi";
import { useSoumission } from "../../app/hooks/useSoumission";
import { useAuth } from "../../app/hooks/useAuth";

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

// Devine le type de ressource (video/audio/pdf) à partir du MIME type,
// avec repli sur l'extension du fichier si le navigateur ne le fournit pas.
function guessType(file) {
  // Vérifie l'extension du fichier
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (["mp4", "mov", "webm", "mkv", "avi"].includes(extension)) return "video";
  if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return "audio";
  if (["pdf","doc","docx","xlsx","xls","csv","ppt","pptx","txt"].includes(extension)) return "document";
}

export default function LessonPlayer() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const courId = params.get("courId");
  const { lessonDetail, fetchLessonDetail } = useLesson();
  const [resource, setResource] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [exercice, setExercice] = useState(null);
  const { soumission, fetchSoumission } = useSoumission();
  const { user, logout } = useAuth();

  // Soumission de l'exercice par l'élève (fichier + description).
  const [soumissionEnvoi, setSoumissionEnvoi] = useState(false);
  const [soumissionStatut, setSoumissionStatut] = useState(null); // "success" | "error" | null

  const [soumissionForm, setSoumissionForm] = useState({
    description: "",
    type: "",
    fichier: null,
  });

  // Ressource actuellement affichée dans la vue principale.
  // null => on affiche le lecteur "par défaut" de la leçon.
  const [activeResource, setActiveResource] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonByCour(courId);
        setLessons(response.data);

        console.log("Leçons sélectionnés avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des leçons :",
          error.response?.data,
        );
      }
    };
    fetchLessons();
  }, [courId]);

  useEffect(() => {
    if (!id) return;
    const fetchExercice = async () => {
      try {
        const response = await getExerciceByLesson(id);
        setExercice(response.data[0]);

        console.log("Exerice sélectionné avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'exercice :",
          error.response?.data,
        );
      }
    };
    fetchExercice();
  }, [id]);

  useEffect(() => {
    fetchLessonDetail(id);
  }, [id]);

  useEffect(() => {
    if (lessonDetail !== null) {
      setResource(lessonDetail.resource);
    }
  }, [lessonDetail]);

  useEffect(() => {
    if (lessonDetail !== null) {
      setLesson(lessonDetail.lesson);
    }
  }, [lessonDetail]);

  // On revient à la vue par défaut si on change de leçon (nouvel id),
  // pour éviter d'afficher la ressource de la leçon précédente.
  useEffect(() => {
    setActiveResource(null);
  }, [id]);

  const handleChange = (e) => {
    setSoumissionForm({
      ...soumissionForm,
      description: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSoumissionForm({
      ...soumissionForm,
      fichier: e.target.files[0],
      type: guessType(e.target.files[0]),
    });
  };

  console.log("soumissionForm : ", soumissionForm);

  // On réinitialise le formulaire de soumission si on change de leçon.
  useEffect(() => {
    setSoumissionForm({ description: "", type: "", fichier: null });
    setSoumissionStatut(null);
  }, [id]);

  const handleSoumissionSubmit = async (e) => {
    e.preventDefault();
    if (!soumissionForm.fichier || !exercice) return;
    try {
      setSoumissionEnvoi(true);
      setSoumissionStatut(null);

      const formData = new FormData();
      formData.append("fichier", soumissionForm.fichier);
      formData.append("description", soumissionForm.description);
      formData.append("type", soumissionForm.type);

      const response = await storeSoumission(exercice?.id, formData);
      console.log("Soumision envoyé avec succès", response.data);

      await fetchSoumission();
      setSoumissionStatut("success");
      setSoumissionForm({ description: "", type: "", fichier: null });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de la soumission :",
        error.response?.data,
      );
      setSoumissionStatut("error");
    } finally {
      setSoumissionEnvoi(false);
    }
  };

  let CURRENT;
  if (lesson && lessons) {
    CURRENT = lessons.find((l) => l.id === lesson.id);
  }

  console.log("CURRENT : ", CURRENT);

  const exerciceHasSoumission = soumission?.find((s) => {
    const conditionExercice = Number(s.exercice_id) === Number(exercice?.id);
    const conditionEleve = Number(s.user_id) === Number(user.id);

    return conditionExercice && conditionEleve;
  });

  // console.log("exerciceHasSoumission : ", exerciceHasSoumission);

  if (!lesson || !resource || !lessons) {
    return (
      <p className="font-body text-sm text-ink-soft">Chargement du cours…</p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {activeResource ? (
          <AnimatedSection className="space-y-3">
            <button
              onClick={() => setActiveResource(null)}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
            >
              <HiOutlineChevronLeft size={13} /> Retour à la leçon
            </button>

            <div className="overflow-hidden rounded-2xl border border-ivory-dark bg-ink">
              {activeResource.type === "video" && (
                <video
                  controls
                  className="aspect-video w-full bg-black"
                  src={`${BASE_URL}/storage/${activeResource.fichier}`}
                >
                  Ton navigateur ne supporte pas la lecture vidéo.
                </video>
              )}

              {activeResource.type === "audio" && (
                <div className="flex aspect-video flex-col items-center justify-center gap-4 p-8">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory/10 text-amber-light">
                    <HiOutlineSpeakerWave size={28} />
                  </span>
                  <audio
                    controls
                    className="w-full max-w-md"
                    src={`${BASE_URL}/storage/${activeResource.fichier}`}
                  >
                    Ton navigateur ne supporte pas la lecture audio.
                  </audio>
                </div>
              )}

              {activeResource.type === "pdf" && (
                <iframe
                  title={activeResource.titre}
                  src={`${BASE_URL}/storage/${activeResource.fichier}`}
                  className="h-[70vh] w-full bg-white"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {capitalize(activeResource.titre)}
                </h3>
                <p className="font-body text-xs text-ink-soft">
                  {RESOURCE_LABEL[activeResource.type] || "Ressource"}
                  {activeResource.duree && ` · ${activeResource.duree}`}
                </p>
              </div>
              {activeResource.fichier && (
                <a
                  href={`${BASE_URL}/storage/${activeResource.fichier}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark"
                >
                  <HiOutlineArrowDownTray size={15} /> Télécharger
                </a>
              )}
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-ink">
            <button className="grid h-16 w-16 place-items-center rounded-full bg-ivory/10 text-amber-light backdrop-blur transition-all duration-300 group-hover:scale-105 group-hover:bg-ivory/20">
              <HiOutlinePlayCircle size={34} />
            </button>
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
            Leçon {lessons.indexOf(CURRENT) + 1} sur {lessons.length} ·{" "}
            {lesson.duree}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark">
            <HiOutlineArrowDownTray size={15} /> Partition PDF
          </button>
          <button className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark">
            <HiOutlineSpeakerWave size={15} /> Piste audio
          </button>
        </AnimatedSection>

        {exercice === null || exercice === undefined ? (
          <AnimatedSection
            delay={140}
            className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
          >
            <h3 className="mb-2 font-display text-base font-semibold text-ink">
              Exercice
            </h3>
            <p className="mb-4 font-body text-sm leading-relaxed text-ink-soft">
              Pas d'exercice disponible pour cette leçcon
            </p>
          </AnimatedSection>
        ) : (
          <AnimatedSection
            delay={140}
            className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
          >
            <h3 className="mb-2 font-display text-base font-semibold text-ink">
              {exercice?.titre}
            </h3>
            <p className="font-body text-sm leading-relaxed text-ink-soft">
              {exercice?.description}
            </p>
            <hr className="border-ivory-dark mt-4 mb-4" />
            {exerciceHasSoumission ? (
              <div className="font-body flex justify-center text-ink-soft leading-relaxed">
                Vous avez déjà soumis votre réponse
              </div>
            ) : (
              <form onSubmit={handleSoumissionSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Fichier à soumettre
                  </label>
                  <label
                    htmlFor="soumission-fichier"
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-ivory-dark  px-4 py-3 font-body text-sm text-ink-soft transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark"
                  >
                    <HiOutlineArrowUpTray size={16} className="shrink-0" />
                    {/* <span className="truncate">
                      {soumissionFichier
                        ? soumissionFichier.name
                        : "Choisir un fichier depuis mon ordinateur"}
                    </span> */}
                    <span className="truncate">
                      {soumissionForm.fichier
                        ? soumissionForm.fichier.name
                        : "Choisir un fichier depuis mon ordinateur"}
                    </span>
                  </label>
                  <input
                    id="soumission-fichier"
                    type="file"
                    accept="video/*,audio/*,.pdf,.doc,.docx,.xlsx,.xls,.csv,.ppt,.pptx,.txt"
                    // onChange={(e) =>
                    //   setSoumissionFichier(e.target.files?.[0] || null)
                    // }
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div>
                  <label
                    htmlFor="soumission-description"
                    className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-ink-soft"
                  >
                    Description (facultatif)
                  </label>
                  <textarea
                    id="soumission-description"
                    rows={3}
                    name="description"
                    // value={soumissionDescription}
                    value={soumissionForm.description}
                    // onChange={(e) => setSoumissionDescription(e.target.value)}
                    onChange={handleChange}
                    placeholder="Un mot sur ta soumission pour ton professeur…"
                    className="w-full resize-none rounded-xl border border-ivory-dark  px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink-soft/60 focus:border-coral/40 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    // disabled={!soumissionFichier || soumissionEnvoi}
                    disabled={!soumissionForm.fichier || soumissionEnvoi}
                    className="rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {soumissionEnvoi
                      ? "Envoi en cours…"
                      : "Envoyer au professeur"}
                  </button>

                  {soumissionStatut === "success" && (
                    <p className="flex items-center gap-1.5 font-body text-xs font-semibold text-coral-dark">
                      <HiOutlineCheckCircle size={14} />
                      Soumission envoyée avec succès !
                    </p>
                  )}
                  {soumissionStatut === "error" && (
                    <p className="font-body text-xs font-semibold text-brick">
                      Une erreur est survenue, réessaie.
                    </p>
                  )}
                </div>
              </form>
            )}
          </AnimatedSection>
        )}
      </div>
      <div className="space-y-6 lg:col-span-1 h-fit lg:sticky lg:top-6">
        <AnimatedSection
          delay={80}
          as="aside"
          className="rounded-2xl border border-ivory-dark bg-white/70 dark:bg-white/10 p-5 "
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
            Plan du cours
          </p>
          <div className="space-y-1">
            {lessons &&
              lessons?.map((l) => (
                <Link
                  key={l.id}
                  to={`/eleve/lecon/${l.id}?courId=${l.cour_id}`}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-body text-sm transition-colors duration-200 ${
                    l.id === CURRENT.id
                      ? "bg-coral/10 text-coral-dark"
                      : "text-ink hover:bg-ivory-dark/40"
                  }`}
                >
                  {l.fait ? (
                    <HiOutlineCheckCircle
                      size={15}
                      className="shrink-0 text-coral-dark"
                    />
                  ) : (
                    <HiOutlinePlayCircle
                      size={15}
                      className="shrink-0 text-ink-soft"
                    />
                  )}
                  <span className="flex-1">{capitalize(l.titre)}</span>
                  <span className="font-mono text-[10px] text-ink-soft">
                    {l.duree}
                  </span>
                </Link>
              ))}
          </div>
        </AnimatedSection>

        {/* Ressources de la leçon — même logique/infos que LeconDetail.jsx */}
        <AnimatedSection
          delay={180}
          className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
        >
          <h3 className="mb-4 font-display text-base font-semibold text-ink">
            Ressources de la leçon
          </h3>

          {resource.length === 0 ? (
            <p className="font-body text-sm text-ink-soft">
              Cette leçon n'a pas encore de ressource.
            </p>
          ) : (
            <div className="space-y-3">
              {resource.map((r) => {
                const Icon = RESOURCE_ICON[r.type] || HiOutlineFolderOpen;
                const isActive = activeResource?.id === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveResource(r)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors duration-300 ${
                      isActive
                        ? "border-coral/40 bg-coral/5"
                        : "border-ivory-dark hover:border-coral/30"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-body text-sm font-semibold text-ink">
                          {r.titre || "_"}
                        </p>
                        <p className="font-body text-xs text-ink-soft">
                          {RESOURCE_LABEL[r.type] || "Ressource"}
                          {r.duree && ` · ${r.duree}`}
                        </p>
                      </div>
                    </div>
                    {r.fichier && (
                      <a
                        href={`${BASE_URL}/storage/${r.fichier}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label="Télécharger le fichier"
                      >
                        <HiOutlineArrowDownTray size={16} />
                      </a>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
