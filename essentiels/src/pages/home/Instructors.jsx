import { useState } from "react";
import { Link } from "react-router-dom";
import { HiStar, HiOutlineUsers, HiOutlineArrowRight } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { teachers, instruments } from "../../lib/mockHomeData";

const AVATAR_BG = { coral: "bg-coral", amber: "bg-amber", brick: "bg-brick" };

export default function Instructors() {
  const [active, setActive] = useState("");

  const filtered = active ? teachers.filter((t) => t.instrument === active) : teachers;

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">L'équipe pédagogique</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Nos professeurs, votre progression
          </h1>
          <p className="mt-4 font-body text-ink-soft">
            Chaque professeur est sélectionné pour son niveau musical et sa capacité à transmettre,
            pas seulement à jouer.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("")}
            className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-300 ${
              !active ? "bg-ink text-ivory" : "bg-ivory-dark text-ink-soft hover:bg-ivory-dark/70"
            }`}
          >
            Tous
          </button>
          {instruments.map((i) => (
            <button
              key={i.id}
              onClick={() => setActive(active === i.nom ? "" : i.nom)}
              className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-300 ${
                active === i.nom ? "bg-coral text-ivory" : "bg-ivory-dark text-ink-soft hover:bg-ivory-dark/70"
              }`}
            >
              {i.emoji} {i.nom}
            </button>
          ))}
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <AnimatedSection
              key={t.id}
              delay={Math.min(i, 6) * 70}
              className="group rounded-2xl border border-ivory-dark bg-white/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
            >
              <div className="flex items-start justify-between">
                <div className={`grid h-16 w-16 place-items-center rounded-full font-display text-xl font-semibold text-ivory ${AVATAR_BG[t.photoBg]}`}>
                  {t.nom.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="flex items-center gap-1 rounded-full bg-amber/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-light">
                  <HiStar className="text-amber" size={13} /> {t.note}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{t.nom}</h3>
              <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{t.instrument} · {t.niveau}</p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{t.bio}</p>
              <div className="mt-5 flex items-center justify-between border-t border-ivory-dark pt-4">
                <span className="flex items-center gap-1.5 font-body text-sm text-ink-soft">
                  <HiOutlineUsers size={15} /> {t.eleves} élèves
                </span>
                <Link
                  to="/cours"
                  className="inline-flex items-center gap-1 font-body text-sm font-semibold text-coral-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-brick"
                >
                  Voir les cours <HiOutlineArrowRight size={13} />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={150} className="mt-16 flex flex-col items-center gap-4 rounded-4xl bg-ivory-dark/50 px-8 py-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">Vous êtes musicien et pédagogue ?</h2>
          <p className="max-w-md font-body text-sm text-ink-soft">
            Rejoignez le corps professoral de Kalon'ny et partagez votre savoir avec des élèves motivés partout à Madagascar.
          </p>
          <Link to="/inscription" className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark">
            Postuler comme professeur <HiOutlineArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
