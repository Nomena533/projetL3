import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import {
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineBanknotes,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChartBar,
  HiOutlineStar,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import StatCard from "../../components/StatCard";
import { COURS_A_VALIDER } from "../../lib/mockAdminData";

const MOIS = ["Mars", "Avr", "Mai", "Juin", "Juil", "Août"];
const VALEURS = [40, 55, 48, 70, 65, 82];

const QUICK_LINKS = [
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: HiOutlineUsers },
  { to: "/admin/validation", label: "Validation des cours", icon: HiOutlineClipboardDocumentCheck },
  { to: "/admin/paiements", label: "Paiements", icon: HiOutlineBanknotes },
  { to: "/admin/avis", label: "Avis", icon: HiOutlineStar },
  { to: "/admin/referentiels", label: "Référentiels", icon: HiOutlineBookOpen },
  { to: "/admin/parametres", label: "Paramètres du site", icon: HiOutlineAdjustmentsHorizontal },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Vue d'ensemble</h2>
      </AnimatedSection>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={HiOutlineUsers} label="Utilisateurs" value="1 284" />
        <StatCard icon={HiOutlineBookOpen} label="Cours publiés" value="96" delay={80} />
        <StatCard icon={HiOutlineBanknotes} label="Revenus ce mois" value="6,2M Ar" delay={160} />
        <StatCard icon={HiOutlineClipboardDocumentCheck} label="Cours à valider" value={COURS_A_VALIDER.length} delay={240} />
      </section>

      <AnimatedSection delay={100} className="rounded-2xl border border-ivory-dark bg-white/60 p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-2">
          <HiOutlineChartBar size={17} className="text-coral-dark" />
          <h3 className="font-display text-lg font-semibold text-ink">Inscriptions — 6 derniers mois</h3>
        </div>
        <div className="flex h-36 items-end gap-3 sm:gap-4">
          {VALEURS.map((v, i) => (
            <div key={MOIS[i]} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-coral/80 transition-all duration-700 ease-out"
                style={{ height: `${v}%` }}
              />
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">{MOIS[i]}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((l, i) => (
          <AnimatedSection
            key={l.to}
            delay={i * 60}
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
