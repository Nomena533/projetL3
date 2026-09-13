import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  HiOutlinePlayCircle,
  HiOutlineArrowDownTray,
  HiOutlineSpeakerWave,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import { LECONS } from "../../lib/mockStudentData";
import useLesson from "../../app/hooks/useLesson";
import { useEffect, useState } from "react";
import { capitalize } from "../../lib/formatFunction";
import { getLessonByCour } from "../../app/api/lessonApi";


export default function LessonPlayer() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const courId = params.get("courId")
  const { lessonDetail, fetchLessonDetail } = useLesson();
  const [resource, setResource] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  
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


  let CURRENT;
  if ( lesson && lessons ) {
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

  if (!lesson || !resource || !lessons) {
    return (
      <p className="font-body text-sm text-ink-soft">Chargement du cours…</p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
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

        <AnimatedSection
          delay={140}
          className="rounded-2xl border border-ivory-dark bg-white/60 p-6"
        >
          <h3 className="mb-2 font-display text-base font-semibold text-ink">
            Exercice
          </h3>
          <p className="mb-4 font-body text-sm leading-relaxed text-ink-soft">
            Enregistre-toi en train de jouer la mélodie, puis envoie ton fichier
            pour correction par ton professeur.
          </p>
          <button className="rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark">
            Déposer mon fichier
          </button>
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
          {lessons.map((l) => (
            <Link
              key={l.id}
              to="/eleve/lecon"
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
