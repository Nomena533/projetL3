import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HiOutlineSearch, HiOutlineArrowRight, HiStar, HiOutlineX } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { courses, instruments, niveaux } from "../../lib/mockHomeData";

function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

const CARD_BG = { coral: "bg-coral/90", amber: "bg-amber/90", brick: "bg-brick/90" };
const BG_BY_INSTRUMENT = { Valiha: "coral", Kabosy: "amber", Guitare: "brick", Piano: "coral", Chant: "amber", Batterie: "brick" };

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeInstrument = params.get("instrument") || "";
  const [niveau, setNiveau] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchInstrument = activeInstrument
        ? c.instrument.toLowerCase() === (instruments.find((i) => i.id === activeInstrument)?.nom || "").toLowerCase()
        : true;
      const matchNiveau = niveau ? c.niveau === niveau : true;
      const matchSearch = search
        ? (c.titre + c.prof + c.instrument).toLowerCase().includes(search.toLowerCase())
        : true;
      return matchInstrument && matchNiveau && matchSearch;
    });
  }, [activeInstrument, niveau, search]);

  const setInstrument = (id) => {
    if (id) setParams({ instrument: id });
    else setParams({});
  };

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Catalogue</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Trouvez le cours qui vous ressemble
          </h1>
          <p className="mt-4 font-body text-ink-soft">
            {courses.length} cours disponibles, enseignés par des professeurs sélectionnés pour leur pédagogie.
          </p>
        </AnimatedSection>

        {/* Barre de recherche */}
        <AnimatedSection delay={80} className="relative mt-10 max-w-xl">
          <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un cours, un professeur…"
            className="w-full rounded-full border border-ivory-dark bg-white/70 py-3 pl-11 pr-4 font-body text-sm text-ink outline-none transition-all duration-300 focus:border-coral focus:bg-white"
          />
        </AnimatedSection>

        {/* Filtres instrument */}
        <AnimatedSection delay={120} className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setInstrument("")}
            className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-300 ${
              !activeInstrument ? "bg-ink text-ivory" : "bg-ivory-dark text-ink-soft hover:bg-ivory-dark/70"
            }`}
          >
            Tous les instruments
          </button>
          {instruments.map((i) => (
            <button
              key={i.id}
              onClick={() => setInstrument(i.id)}
              className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-300 ${
                activeInstrument === i.id ? "bg-coral text-ivory" : "bg-ivory-dark text-ink-soft hover:bg-ivory-dark/70"
              }`}
            >
              {i.emoji} {i.nom}
            </button>
          ))}
        </AnimatedSection>

        {/* Filtres niveau */}
        <AnimatedSection delay={160} className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">Niveau :</span>
          {niveaux.map((n) => (
            <button
              key={n}
              onClick={() => setNiveau(niveau === n ? "" : n)}
              className={`rounded-full border px-3.5 py-1.5 font-body text-xs font-medium transition-colors duration-300 ${
                niveau === n ? "border-brick bg-brick/10 text-brick" : "border-ivory-dark text-ink-soft hover:bg-ivory-dark/50"
              }`}
            >
              {n}
            </button>
          ))}
          {(activeInstrument || niveau || search) && (
            <button
              onClick={() => { setInstrument(""); setNiveau(""); setSearch(""); }}
              className="inline-flex items-center gap-1 font-body text-xs font-medium text-coral-dark hover:text-brick"
            >
              <HiOutlineX size={14} /> Réinitialiser
            </button>
          )}
        </AnimatedSection>

        {/* Résultats */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={Math.min(i, 6) * 60}
              as={Link}
              to={`/cours/${c.id}`}
              className="group block overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
            >
              <div className={`flex h-32 items-center justify-center relative ${CARD_BG[BG_BY_INSTRUMENT[c.instrument]]}`}>
                <span className="font-display text-3xl text-ivory/90">
                  {instruments.find((x) => x.nom === c.instrument)?.emoji}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
                  {c.niveau}
                </span>
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{c.instrument}</p>
                <h3 className="mt-1.5 font-display text-base font-semibold text-ink group-hover:text-coral-dark">{c.titre}</h3>
                <p className="mt-1 font-body text-sm text-ink-soft">avec {c.prof}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ivory-dark pt-4">
                  <span className="flex items-center gap-1 font-body text-sm text-ink-soft">
                    <HiStar className="text-amber" size={15} /> {c.note} · {c.lecons} leçons
                  </span>
                  <span className="font-mono text-sm font-semibold text-ink">{formatAriary(c.prix)}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <AnimatedSection className="mt-16 flex flex-col items-center gap-3 text-center">
            <p className="font-display text-lg text-ink">Aucun cours ne correspond à ces critères</p>
            <p className="font-body text-sm text-ink-soft">Essayez d'élargir votre recherche ou vos filtres.</p>
            <button
              onClick={() => { setInstrument(""); setNiveau(""); setSearch(""); }}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory transition-colors hover:bg-coral-dark"
            >
              Réinitialiser les filtres <HiOutlineArrowRight size={14} />
            </button>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
