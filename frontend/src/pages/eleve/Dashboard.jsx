import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineClock, HiStar } from "react-icons/hi";
import { HiOutlineChartBarSquare, HiOutlineAcademicCap, HiOutlineChatBubbleLeftRight, HiOutlineHeart } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import StatCard from "../../components/StatCard";
import { COURSES, CERTIFICATS, TONE_BG, formatAriary } from "../../lib/mockStudentData";

const EN_COURS = COURSES.filter((c) => c.progression > 0);
const SUGGESTIONS = COURSES.filter((c) => c.progression === 0).slice(0, 3);

const QUICK_LINKS = [
  { to: "/eleve/catalogue", label: "Catalogue", icon: HiOutlineAcademicCap },
  { to: "/eleve/favoris", label: "Favoris", icon: HiOutlineHeart },
  { to: "/eleve/messages", label: "Messages", icon: HiOutlineChatBubbleLeftRight },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* ---------- HERO ---------- */}
      <AnimatedSection className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brick via-coral to-amber p-1 shadow-2xl shadow-brick/20">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-ink/90 p-8 sm:p-10">
          <div className="relative z-10 max-w-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-light">Bonjour Fara</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">
              Tu as tenu 12 jours d'affilée. Continue de tresser tes progrès.
            </h2>
            <Link
              to="/eleve/lecon"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-body text-sm font-semibold text-brick shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Reprendre ma leçon
              <HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ValihaMotif count={22} tone="amber" className="pointer-events-none absolute -right-4 top-0 h-full w-40 opacity-50" />
        </div>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard icon={HiOutlineClock} label="Temps d'écoute cette semaine" value="4h 20" />
        <StatCard icon={HiOutlineChartBarSquare} label="Progression globale" value="68%" delay={80} />
        <StatCard icon={HiOutlineAcademicCap} label="Certificats obtenus" value={CERTIFICATS.length} delay={160} />
      </section>

      {/* ---------- COURS EN COURS ---------- */}
      <section>
        <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink">Mes cours en cours</h3>
          <Link to="/eleve/catalogue" className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick">
            Voir le catalogue <HiOutlineArrowRight size={15} />
          </Link>
        </AnimatedSection>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {EN_COURS.map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={i * 90}
              as={Link}
              to={`/eleve/cours/${c.id}`}
              className="group flex gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10"
            >
              <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl text-2xl ${TONE_BG[c.tone]}`}>
                <span className="opacity-90">{c.emoji}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-ink group-hover:text-coral-dark">{c.titre}</p>
                <p className="mt-0.5 font-body text-sm text-ink-soft">avec {c.prof}</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-ivory-dark">
                  <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${c.progression}%` }} />
                </div>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{c.progression}% terminé</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ---------- SUGGESTIONS ---------- */}
      <section>
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Pour continuer à progresser</span>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">Cours suggérés pour toi</h3>
        </AnimatedSection>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUGGESTIONS.map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={i * 90}
              as={Link}
              to={`/eleve/cours/${c.id}`}
              className="group block overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
            >
              <div className={`flex h-28 items-center justify-center ${TONE_BG[c.tone]}`}>
                <span className="font-display text-3xl text-ivory/90">{c.emoji}</span>
              </div>
              <div className="p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{c.instrument}</p>
                <h4 className="mt-1 font-display text-sm font-semibold text-ink group-hover:text-coral-dark">{c.titre}</h4>
                <div className="mt-3 flex items-center justify-between border-t border-ivory-dark pt-3">
                  <span className="flex items-center gap-1 font-body text-xs text-ink-soft">
                    <HiStar className="text-amber" size={13} /> {c.note}
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink">{formatAriary(c.prix)}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ---------- ACCÈS RAPIDES ---------- */}
      <section className="grid gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((l, i) => (
          <AnimatedSection
            key={l.to}
            delay={i * 80}
            as={Link}
            to={l.to}
            className="group flex items-center gap-3 rounded-2xl border border-ivory-dark bg-ivory-dark/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 hover:bg-white"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark transition-colors duration-300 group-hover:bg-coral group-hover:text-ivory">
              <l.icon size={17} />
            </span>
            <span className="font-body text-sm font-semibold text-ink">{l.label}</span>
            <HiOutlineArrowRight className="ml-auto text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" size={15} />
          </AnimatedSection>
        ))}
      </section>
    </div>
  );
}
