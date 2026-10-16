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
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import {
  COURSES,
  LECONS,
  AVIS_COURS,
  TONE_BG,
  formatAriary,
} from "../../lib/mockStudentData";
import useGetCour from "../../app/hooks/useGetCour";
import { BASE_URL } from "../../app/api/api";
import { capitalize } from "../../lib/formatFunction";
import { useLang } from "../../app/hooks/useLang";

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
  const c = COURSES.find((x) => String(x.id) === id) || COURSES[0];
  const [fav, setFav] = useState(false);

  const { cour, fetchCourDetail } = useGetCour();
  const [courDetail, setCourDetail] = useState(null);
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    fetchCourDetail(id);
  }, [id]);

  useEffect(() => {
    if (cour !== null) {
      setCourDetail(cour.cour);
    }
  }, [cour]);

  useEffect(() => {
    if (cour !== null) {
      setLesson(cour.lesson);
    }
  }, [cour]);

  if (!courDetail || !lesson) {
    return (
      <p className="font-body text-sm text-ink-soft">{t("Chargement du cours…")}</p>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/eleve/formation"
        className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} />{" "}{t("Retour au formation")}</Link>

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
                <HiOutlinePhoto size={28} className="text-ink-soft" />
              )}
            </div>

            <div className="p-6">
              <span
                className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${NIVEAU_BADGE[courDetail.level.name]}`}
              >
                {capitalize(courDetail.level.name)}
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {capitalize(courDetail.titre)}
              </h2>

              {/* Infos clés regroupées et distinguées par icône */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ivory-dark pt-4 font-body text-xs text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <HiOutlineUser size={14} className="text-coral-dark" />
                  {courDetail.prof.name} {courDetail.prof.firstname}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineClock size={14} className="text-coral-dark" />
                  {courDetail.duree}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineBookOpen size={14} className="text-coral-dark" />{t("{{length}} leçons", { length: lesson.length })}</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Bloc 2 — Description */}
          <AnimatedSection
            delay={60}
            className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
          >
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">{t("À propos de ce cours")}</h3>
            <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              {capitalize(courDetail.description)}
            </p>
          </AnimatedSection>

          {/* Bloc 3 — Contenu / leçons */}
          <AnimatedSection delay={120}>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">{t("Contenu du cours")}</h3>
            <div className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
              {lesson.map((l) => (
                <Link
                  key={l.id}
                  to={`/eleve/formation/lecon/${l.id}?courId=${courDetail.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-200 hover:bg-ivory-dark/40"
                >
                  {l.fait ? (
                    <HiOutlineCheckCircle
                      size={18}
                      className="shrink-0 text-coral-dark"
                    />
                  ) : (
                    <HiOutlinePlayCircle
                      size={18}
                      className="shrink-0 text-ink-soft"
                    />
                  )}
                  <span className="flex-1 font-body text-sm text-ink">
                    {capitalize(l.titre)}
                  </span>
                  <span className="font-mono text-xs text-ink-soft">
                    {capitalize(l.duree)}
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>

          {/* Bloc 4 — Avis */}
          <AnimatedSection delay={160}>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">{t("Avis des élèves")}</h3>
            <div className="space-y-4">
              {AVIS_COURS.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-5"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 text-amber">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <HiStar
                          key={i}
                          size={13}
                          className={i < a.note ? "" : "opacity-25"}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-ink-soft">
                      {a.nom} · {a.date}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                    {t(a.texte)}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Colonne latérale — actions + ce qui est inclus, séparés du contenu principal */}
        <AnimatedSection
          delay={100}
          as="aside"
          className="h-fit rounded-2xl border border-ivory-dark bg-white/70 dark:bg-white/10 p-6 lg:sticky lg:top-6"
        >
          <button
            onClick={() => setFav(!fav)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ivory-dark py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
          >
            <HiOutlineHeart
              size={16}
              className={fav ? "fill-coral text-coral" : "text-ink-soft"}
            />
            {fav ? t("Dans mes favoris") : t("Ajouter aux favoris")}
          </button>

          <div className="mt-6 space-y-2.5 border-t border-ivory-dark pt-5">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{t("Ce cours inclut")}</p>
            {INCLUS.map((it) => (
              <p
                key={it.label}
                className="flex items-center gap-2.5 font-body text-xs text-ink-soft"
              >
                <it.icon size={14} className="shrink-0 text-coral-dark" />{" "}
                {t(it.label)}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
