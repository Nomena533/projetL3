import { HiOutlineAcademicCap } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import { COURSES, CERTIFICATS } from "../../lib/mockStudentData";

const EN_COURS = COURSES.filter((c) => c.progression > 0);

export default function Progression() {
  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Suivi</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Ma progression</h2>
      </AnimatedSection>

      <section className="grid gap-5 sm:grid-cols-2">
        {EN_COURS.map((c, i) => (
          <AnimatedSection key={c.id} delay={i * 90} className="rounded-2xl border border-ivory-dark bg-white/60 p-6">
            <p className="font-display text-base font-semibold text-ink">{c.titre}</p>
            <p className="mt-0.5 font-body text-sm text-ink-soft">avec {c.prof}</p>
            <div className="mt-5 h-2 w-full rounded-full bg-ivory-dark">
              <div className="h-2 rounded-full bg-coral transition-all duration-700" style={{ width: `${c.progression}%` }} />
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-soft">{c.progression}% terminé</p>
          </AnimatedSection>
        ))}
      </section>

      <section>
        <AnimatedSection>
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">Mes certificats</h3>
        </AnimatedSection>
        <div className="grid gap-5 sm:grid-cols-2">
          {CERTIFICATS.map((cert, i) => (
            <AnimatedSection
              key={cert.id}
              delay={i * 90}
              className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brick via-coral-dark to-coral p-6"
            >
              <HiOutlineAcademicCap size={24} className="text-amber-light" />
              <p className="mt-4 font-display text-lg font-semibold text-ivory">{cert.titre}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ivory/60">Obtenu le {cert.date}</p>
              <ValihaMotif className="pointer-events-none absolute right-4 top-4 h-16 w-16 opacity-40" count={12} tone="amber" />
            </AnimatedSection>
          ))}
          <AnimatedSection
            delay={CERTIFICATS.length * 90}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ivory-dark p-6 text-center"
          >
            <HiOutlineAcademicCap size={22} className="text-ink-soft" />
            <p className="mt-3 font-body text-xs leading-relaxed text-ink-soft">
              Termine un cours de Kabosy ou de Piano pour débloquer ton prochain certificat.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
