import { useState } from "react";
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
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import { COURSES, LECONS, AVIS_COURS, TONE_BG, NIVEAU_BADGE, formatAriary } from "../../lib/mockStudentData";

const INCLUS = [
  { icon: HiOutlineVideoCamera, label: "Leçons vidéo téléchargeables" },
  { icon: HiOutlineDocumentText, label: "Partitions PDF incluses" },
  { icon: HiOutlineSpeakerWave, label: "Pistes audio d'accompagnement" },
  { icon: HiOutlineAcademicCap, label: "Certificat à la fin du parcours" },
];

export default function CourseDetail() {
  const { id } = useParams();
  const c = COURSES.find((x) => String(x.id) === id) || COURSES[0];
  const [fav, setFav] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);

  return (
    <div className="space-y-6">
      <Link to="/eleve/catalogue" className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark">
        <HiOutlineChevronLeft size={13} /> Retour au catalogue
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <AnimatedSection>
            <div className={`flex h-56 items-center justify-center rounded-2xl ${TONE_BG[c.tone]}`}>
              <span className="font-display text-5xl text-ivory/90">{c.emoji}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={60}>
            <span className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${NIVEAU_BADGE[c.niveau]}`}>
              {c.niveau}
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">{c.titre}</h2>
            <p className="mt-1.5 font-body text-sm text-ink-soft">
              Par {c.prof} · {c.duree} de contenu · {LECONS.length} leçons
            </p>
            <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              Un parcours pas à pas pour apprendre le {c.instrument.toLowerCase()}, de l'accordage aux premières
              mélodies traditionnelles, avec des retours personnalisés de ton professeur à chaque exercice envoyé.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">Contenu du cours</h3>
            <div className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60">
              {LECONS.map((l) => (
                <Link
                  key={l.id}
                  to="/eleve/lecon"
                  className="flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-200 hover:bg-ivory-dark/40"
                >
                  {l.fait ? (
                    <HiOutlineCheckCircle size={18} className="shrink-0 text-coral-dark" />
                  ) : (
                    <HiOutlinePlayCircle size={18} className="shrink-0 text-ink-soft" />
                  )}
                  <span className="flex-1 font-body text-sm text-ink">{l.titre}</span>
                  <span className="font-mono text-xs text-ink-soft">{l.duree}</span>
                </Link>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={160}>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">Avis des élèves</h3>
            <div className="space-y-4">
              {AVIS_COURS.map((a) => (
                <div key={a.id} className="rounded-2xl border border-ivory-dark bg-white/60 p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 text-amber">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <HiStar key={i} size={13} className={i < a.note ? "" : "opacity-25"} />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-ink-soft">
                      {a.nom} · {a.date}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{a.texte}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={100} as="aside" className="h-fit rounded-2xl border border-ivory-dark bg-white/70 p-6 lg:sticky lg:top-6">
          <p className="font-mono text-3xl font-semibold text-ink">{formatAriary(c.prix)}</p>

          {purchased ? (
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-coral/10 px-4 py-3 font-body text-sm font-semibold text-coral-dark">
              <HiOutlineCheckCircle size={17} /> Cours ajouté à ton parcours
            </p>
          ) : (
            <button
              onClick={() => setConfirmOpen(true)}
              className="mt-4 w-full rounded-full bg-coral py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            >
              Acheter ce cours
            </button>
          )}

          <button
            onClick={() => setFav(!fav)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ivory-dark py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
          >
            <HiOutlineHeart size={16} className={fav ? "fill-coral text-coral" : "text-ink-soft"} />
            {fav ? "Dans mes favoris" : "Ajouter aux favoris"}
          </button>

          <div className="mt-6 space-y-2.5 border-t border-ivory-dark pt-5">
            {INCLUS.map((it) => (
              <p key={it.label} className="flex items-center gap-2.5 font-body text-xs text-ink-soft">
                <it.icon size={14} className="shrink-0 text-coral-dark" /> {it.label}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirmer l'achat">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          Tu es sur le point d'ajouter <span className="font-semibold text-ink">« {c.titre} »</span> à ton parcours pour{" "}
          <span className="font-semibold text-ink">{formatAriary(c.prix)}</span>.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setConfirmOpen(false)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              setPurchased(true);
              setConfirmOpen(false);
            }}
            className="flex-1 rounded-full bg-coral py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:bg-coral-dark"
          >
            Confirmer
          </button>
        </div>
      </Modal>
    </div>
  );
}
