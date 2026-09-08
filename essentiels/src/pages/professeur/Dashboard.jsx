import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { HiOutlineBookOpen, HiOutlineUsers, HiOutlineBanknotes, HiOutlineInbox, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import StatCard from "../../components/StatCard";
import Pill from "../../components/Pill";
import { MES_COURS, SOUMISSIONS, TONE_BG } from "../../lib/mockProfData";

const EN_ATTENTE = SOUMISSIONS.filter((s) => s.statut === "En attente");

const QUICK_LINKS = [
  { to: "/professeur/mescours", label: "Mes cours", icon: HiOutlineBookOpen },
  { to: "/professeur/eleves", label: "Mes élèves", icon: HiOutlineUsers },
  { to: "/professeur/messages", label: "Messages", icon: HiOutlineChatBubbleLeftRight },
];

export default function ProfDashboard() {
  return (
    <div className="space-y-10">
      {/* ---------- HERO ---------- */}
      <AnimatedSection className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brick via-coral to-amber p-1 shadow-2xl shadow-brick/20">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-ink/90 p-8 sm:p-10">
          <div className="relative z-10 max-w-lg">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-light">Bonjour Rado</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">
              {EN_ATTENTE.length} soumission{EN_ATTENTE.length > 1 ? "s" : ""} attendent ta correction.
            </h2>
            <Link
              to="/professeur/corrections"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-body text-sm font-semibold text-brick shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Corriger maintenant
              <HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ValihaMotif count={22} tone="amber" className="pointer-events-none absolute -right-4 top-0 h-full w-40 opacity-50" />
        </div>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard icon={HiOutlineBookOpen} label="Cours publiés" value={MES_COURS.filter((c) => c.statut === "Publié").length} />
        <StatCard icon={HiOutlineUsers} label="Élèves inscrits" value={MES_COURS.reduce((a, c) => a + c.eleves, 0)} delay={80} />
        <StatCard icon={HiOutlineBanknotes} label="Revenus ce mois" value="410k Ar" delay={160} />
      </section>

      {/* ---------- MES COURS ---------- */}
      <section>
        <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink">Mes cours</h3>
          <Link to="/professeur/mescours" className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors hover:text-brick">
            Gérer mes cours <HiOutlineArrowRight size={15} />
          </Link>
        </AnimatedSection>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {MES_COURS.slice(0, 2).map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={i * 90}
              as={Link}
              to={`/professeur/cours/${c.id}`}
              className="group flex gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10"
            >
              <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl text-2xl ${TONE_BG[c.tone]}`}>
                <span className="opacity-90">{c.emoji}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-display text-base font-semibold text-ink group-hover:text-coral-dark">{c.titre}</p>
                  <Pill>{c.statut}</Pill>
                </div>
                <p className="mt-1.5 font-body text-sm text-ink-soft">{c.eleves} élèves inscrits</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ---------- SOUMISSIONS RÉCENTES ---------- */}
      <section>
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">À traiter</span>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">Dernières soumissions</h3>
        </AnimatedSection>

        <div className="mt-6 space-y-3">
          {EN_ATTENTE.slice(0, 3).map((s, i) => (
            <AnimatedSection
              key={s.id}
              delay={i * 80}
              className="flex items-center gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber/15 text-brick">
                <HiOutlineInbox size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-sm font-semibold text-ink">{s.exercice}</p>
                <p className="mt-0.5 font-body text-xs text-ink-soft">
                  {s.eleve} · {s.cours} · {s.date}
                </p>
              </div>
              <Pill>{s.statut}</Pill>
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
