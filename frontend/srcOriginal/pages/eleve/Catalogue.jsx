import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiStar } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { COURSES, TONE_BG, NIVEAU_BADGE, formatAriary } from "../../lib/mockStudentData";

const NIVEAUX = ["Tous", "Débutant", "Intermédiaire", "Avancé"];
const INSTRUMENTS = ["Tous", ...Array.from(new Set(COURSES.map((c) => c.instrument)))];

export default function Catalogue() {
  const [q, setQ] = useState("");
  const [niveau, setNiveau] = useState("Tous");
  const [instrument, setInstrument] = useState("Tous");

  const filtered = useMemo(
    () =>
      COURSES.filter(
        (c) =>
          c.titre.toLowerCase().includes(q.toLowerCase()) &&
          (niveau === "Tous" || c.niveau === niveau) &&
          (instrument === "Tous" || c.instrument === instrument)
      ),
    [q, niveau, instrument]
  );

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Catalogue</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Trouve ton prochain cours</h2>
      </AnimatedSection>

      <AnimatedSection delay={80} className="space-y-4">
        <div className="flex items-center gap-2 rounded-full border border-ivory-dark bg-white/70 px-5 py-3 transition-colors duration-300 focus-within:border-coral">
          <HiOutlineMagnifyingGlass className="shrink-0 text-ink-soft" size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un cours, un instrument, un professeur…"
            className="w-full bg-transparent font-body text-sm text-ink placeholder:text-ink-soft/60 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Niveau :</span>
          {NIVEAUX.map((n) => (
            <button
              key={n}
              onClick={() => setNiveau(n)}
              className={`rounded-full px-4 py-1.5 font-body text-xs font-semibold transition-all duration-300 ${
                niveau === n ? "bg-coral text-ivory shadow-md shadow-coral/25" : "bg-ivory-dark/60 text-ink-soft hover:bg-ivory-dark"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Instrument :</span>
          {INSTRUMENTS.map((n) => (
            <button
              key={n}
              onClick={() => setInstrument(n)}
              className={`rounded-full px-4 py-1.5 font-body text-xs font-semibold transition-all duration-300 ${
                instrument === n ? "bg-brick text-ivory shadow-md shadow-brick/25" : "bg-ivory-dark/60 text-ink-soft hover:bg-ivory-dark"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </AnimatedSection>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <AnimatedSection
            key={c.id}
            delay={i * 70}
            as={Link}
            to={`/eleve/cours/${c.id}`}
            className="group block overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
          >
            <div className={`relative flex h-36 items-center justify-center overflow-hidden ${TONE_BG[c.tone]}`}>
              <span className="font-display text-4xl text-ivory/90">{c.emoji}</span>
              <span className={`absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${NIVEAU_BADGE[c.niveau]}`}>
                {c.niveau}
              </span>
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{c.instrument}</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-ink group-hover:text-coral-dark">{c.titre}</h3>
              <p className="mt-1 font-body text-sm text-ink-soft">avec {c.prof}</p>
              <div className="mt-4 flex items-center justify-between border-t border-ivory-dark pt-4">
                <span className="flex items-center gap-1 font-body text-sm text-ink-soft">
                  <HiStar className="text-amber" size={15} /> {c.note} ({c.avis})
                </span>
                <span className="font-mono text-sm font-semibold text-ink">{formatAriary(c.prix)}</span>
              </div>
            </div>
          </AnimatedSection>
        ))}

        {filtered.length === 0 && (
          <AnimatedSection className="col-span-full rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
            <p className="font-body text-sm text-ink-soft">Aucun cours ne correspond à ta recherche.</p>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
