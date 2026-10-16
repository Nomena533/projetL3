import { Link, useParams } from "react-router-dom";
import { HiStar, HiOutlineClock, HiOutlineBookOpen, HiOutlineUsers, HiOutlineCheckCircle, HiPlay, HiOutlineDocumentText, HiOutlineMusicNote, HiOutlineArrowLeft } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { courses, teachers, instruments } from "../../lib/mockHomeData";
import { useLang } from "../../app/hooks/useLang";

function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

const PROGRAMME = [
  { icon: HiPlay, titre: "Prise en main de l'instrument", duree: "45 min" },
  { icon: HiOutlineMusicNote, titre: "Premiers accords / gammes", duree: "1h10" },
  { icon: HiOutlineDocumentText, titre: "Lecture de partition simplifiée", duree: "50 min" },
  { icon: HiPlay, titre: "Premier morceau complet", duree: "1h30" },
  { icon: HiOutlineDocumentText, titre: "Exercice noté par le professeur", duree: "40 min" },
];

export default function HomeCourseDetail() {
  const { t: tl } = useLang();
  const { id } = useParams();
  const course = courses.find((c) => c.id === id) ?? courses[0];
  const teacher = teachers.find((t) => t.nom === course.prof);
  const instrument = instruments.find((i) => i.nom === course.instrument);

  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Link to="/cours" className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-soft hover:text-coral-dark">
            <HiOutlineArrowLeft size={15} />{" "}{tl("Retour au catalogue")}</Link>
        </AnimatedSection>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <AnimatedSection>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-coral-dark">
                {instrument?.emoji} {course.instrument} · {tl(course.niveau)}
              </span>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {course.titre}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-5 font-body text-sm text-ink-soft">
                <span className="flex items-center gap-1.5"><HiStar className="text-amber" size={16} />{" "}{tl("{{note}} ({{eleves}} avis)", { note: course.note, eleves: course.eleves })}</span>
                <span className="flex items-center gap-1.5"><HiOutlineClock size={16} /> {course.duree}</span>
                <span className="flex items-center gap-1.5"><HiOutlineBookOpen size={16} />{" "}{tl("{{lecons}} leçons", { lecons: course.lecons })}</span>
                <span className="flex items-center gap-1.5"><HiOutlineUsers size={16} />{" "}{tl("{{eleves}} élèves inscrits", { eleves: course.eleves })}</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100} className="mt-8 aspect-video overflow-hidden rounded-2xl bg-linear-to-br from-brick via-coral to-amber">
              <div className="flex h-full items-center justify-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-brick shadow-lg transition-transform duration-300 hover:scale-105">
                  <HiPlay size={30} />
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150} className="mt-10">
              <h2 className="font-display text-xl font-semibold text-ink">{tl("À propos de ce cours")}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{tl("Ce parcours {{v0}} en {{v1}} vous accompagne pas à pas : vidéos pédagogiques, partitions PDF, fichiers audio d'accompagnement et exercices corrigés personnellement par {{prof}}. À la fin du parcours, un certificat numérique valide vos acquis.", { v0: course.niveau.toLowerCase(), v1: course.instrument.toLowerCase(), prof: course.prof })}</p>
            </AnimatedSection>

            <AnimatedSection delay={200} className="mt-10">
              <h2 className="font-display text-xl font-semibold text-ink">{tl("Programme du cours")}</h2>
              <ul className="mt-4 divide-y divide-ivory-dark rounded-2xl border border-ivory-dark bg-white/50">
                {PROGRAMME.map((p, i) => (
                  <li key={p.titre} className="flex items-center gap-4 p-4 transition-colors duration-200 hover:bg-ivory-dark/40">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                      <p.icon size={18} />
                    </span>
                    <span className="flex-1 font-body text-sm text-ink">{i + 1}. {p.titre}</span>
                    <span className="font-mono text-xs text-ink-soft">{p.duree}</span>
                  </li>
                ))}
                <li className="flex items-center gap-4 p-4 font-body text-sm text-ink-soft">{tl("+ {{v0}} autres leçons débloquées progressivement", { v0: course.lecons - PROGRAMME.length })}</li>
              </ul>
            </AnimatedSection>

            {teacher && (
              <AnimatedSection delay={250} className="mt-10 flex items-start gap-4 rounded-2xl border border-ivory-dark bg-white/50 p-6">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brick font-display text-lg font-semibold text-ivory">
                  {teacher.nom.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">{teacher.nom}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{tl("{{instrument}} · {{eleves}} élèves", { instrument: teacher.instrument, eleves: teacher.eleves })}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{tl(teacher.bio)}</p>
                  <Link to="/professeurs" className="mt-2 inline-block font-body text-sm font-medium text-coral-dark hover:text-brick">{tl("Voir le profil complet →")}</Link>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Carte d'inscription sticky */}
          <AnimatedSection delay={100} className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-ivory-dark bg-white/80 p-6 shadow-lg shadow-brick/5">
              <p className="font-mono text-2xl font-semibold text-ink">{formatAriary(course.prix)}</p>
              <p className="font-body text-xs text-ink-soft">{tl("Accès à vie au contenu du cours")}</p>
              <Link
                to="/inscription"
                className="mt-5 block rounded-full bg-coral py-3 text-center font-body text-sm font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
              >{tl("S'inscrire à ce cours")}</Link>
              <ul className="mt-6 space-y-3">
                {[tl("Vidéos HD à volonté"), tl("Supports PDF téléchargeables"), tl("Exercices corrigés"), tl("Certificat en fin de parcours"), tl("Messagerie avec le professeur")].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 font-body text-sm text-ink-soft">
                    <HiOutlineCheckCircle className="shrink-0 text-coral-dark" size={17} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-ivory-dark pt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{tl("Paiement via Mvola · Orange Money · Airtel Money")}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
