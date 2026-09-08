import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { COURSES, TONE_BG, formatAriary } from "../../lib/mockStudentData";

export default function Favoris() {
  const [favs, setFavs] = useState(COURSES.slice(2, 5));

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Mes favoris</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Cours mis de côté</h2>
      </AnimatedSection>

      {favs.length === 0 ? (
        <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
          <HiOutlineHeart size={22} className="mx-auto text-ink-soft" />
          <p className="mt-3 font-body text-sm text-ink-soft">Tu n'as pas encore ajouté de cours à tes favoris.</p>
          <Link to="/eleve/catalogue" className="mt-4 inline-block font-body text-sm font-semibold text-coral-dark hover:text-brick">
            Parcourir le catalogue →
          </Link>
        </AnimatedSection>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favs.map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={i * 80}
              className="group overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
            >
              <div className={`relative flex h-28 items-center justify-center ${TONE_BG[c.tone]}`}>
                <span className="font-display text-3xl text-ivory/90">{c.emoji}</span>
                <button
                  onClick={() => setFavs(favs.filter((f) => f.id !== c.id))}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-coral transition-transform duration-300 hover:scale-110"
                  aria-label="Retirer des favoris"
                >
                  <HiOutlineHeart size={15} className="fill-coral" />
                </button>
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-semibold leading-snug text-ink group-hover:text-coral-dark">{c.titre}</p>
                <p className="mt-1 font-body text-xs text-ink-soft">{c.prof}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-ink">{formatAriary(c.prix)}</span>
                  <Link to={`/eleve/cours/${c.id}`} className="font-mono text-[11px] font-semibold uppercase tracking-wide text-coral-dark hover:text-brick">
                    Voir →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
