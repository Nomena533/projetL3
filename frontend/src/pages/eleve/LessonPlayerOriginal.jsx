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
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import { LECONS } from "../../lib/mockStudentData";
import useLesson from "../../app/hooks/useLesson";
import { useEffect, useState } from "react";
import { capitalize } from "../../lib/formatFunction";
import { getLessonByCour } from "../../app/api/lessonApi";
import { BASE_URL } from "../../app/api/api";
import { getExerciceByLesson } from "../../app/api/exerciceApi";

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

export default function LessonPlayer() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const courId = params.get("courId");
  const { lessonDetail, fetchLessonDetail } = useLesson();
  const [resource, setResource] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [exercice, setExercice] = useState(null);
  console.log("courId : ", courId);

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

  console.log("exercice : ", exercice);

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

  let CURRENT;
  if (lesson && lessons) {
    CURRENT = lessons.find((l) => l.id === lesson.id);
  }

  console.log("CURRENT : ", CURRENT);

  console.log("lessonDetail : ", lessonDetail);
  console.log("lesson : ", lesson);
  console.log("resource : ", resource);

  if (lessons) {
    console.log("lessons : ", lessons);
    console.log("indexOf : ", lessons.indexOf(lesson));
  }

  if (!lesson || !resource || !lessons ) {
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
            className="rounded-2xl border border-ivory-dark bg-white/60 p-6"
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
            className="rounded-2xl border border-ivory-dark bg-white/60 p-6"
          >
            <h3 className="mb-2 font-display text-base font-semibold text-ink">
              Exercice : {exercice?.titre}
            </h3>
            <p className="mb-4 font-body text-sm leading-relaxed text-ink-soft">
              {/* Enregistre-toi en train de jouer la mélodie, puis envoie ton fichier
            pour correction par ton professeur. */}
              {exercice?.description}
            </p>
            <button className="rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark">
              Déposer mon fichier
              <input type="file" accept="image/*" className="hidden" />
            </button>
          </AnimatedSection>
        )}

        {/* Ressources de la leçon — même logique/infos que LeconDetail.jsx */}
        <AnimatedSection
          delay={180}
          className="rounded-2xl border border-ivory-dark bg-white/60 p-6"
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

      <AnimatedSection
        delay={80}
        as="aside"
        className="h-fit rounded-2xl border border-ivory-dark bg-white/70 p-5 lg:sticky lg:top-6"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
          Plan du cours
        </p>
        <div className="space-y-1">
          {lessons && lessons.map((l) => (
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
    </div>
  );
}
