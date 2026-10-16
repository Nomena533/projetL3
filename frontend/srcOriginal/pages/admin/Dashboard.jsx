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
import { COURS_A_VALIDER, formatAriary } from "../../lib/mockAdminData";
import useInscription from "../../app/hooks/useInscription";
import { useMemo } from "react";
import { useUser } from "../../app/hooks/useUser";
import useGetCour from "../../app/hooks/useGetCour";
import usePaiement from "../../app/hooks/usePaiement";

const QUICK_LINKS = [
  {
    to: "/administrateur/utilisateurs",
    label: "Utilisateurs",
    icon: HiOutlineUsers,
  },
  {
    to: "/administrateur/validation",
    label: "Validation des cours",
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    to: "/administrateur/paiements",
    label: "Paiements",
    icon: HiOutlineBanknotes,
  },
  { to: "/administrateur/avis", label: "Avis", icon: HiOutlineStar },
  {
    to: "/administrateur/referentiels",
    label: "Référentiels",
    icon: HiOutlineBookOpen,
  },
  {
    to: "/administrateur/parametres",
    label: "Paramètres du site",
    icon: HiOutlineAdjustmentsHorizontal,
  },
];

// Convertit une date en objet Date.
// Les dates YYYY-MM-DD sont interprétées en heure locale.
function convertirDate(date) {
  if (!date) return null;

  if (date instanceof Date) {
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof date === "string") {
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (match) {
      const [, annee, mois, jour] = match;
      const resultat = new Date(Number(annee), Number(mois) - 1, Number(jour));

      // Écarte les dates invalides.
      if (
        resultat.getFullYear() !== Number(annee) ||
        resultat.getMonth() !== Number(mois) - 1 ||
        resultat.getDate() !== Number(jour)
      ) {
        return null;
      }

      return resultat;
    }
  }

  const resultat = new Date(date);

  return Number.isNaN(resultat.getTime()) ? null : resultat;
}

export default function AdminDashboard() {
  const { inscriptions } = useInscription();
  const { userList } = useUser();
  const { cours, courBrouillon } = useGetCour();
  const { paiementList } = usePaiement();
  
  const revenuMois = useMemo(() => {
    const maintenant = new Date();
    const moisActuel = maintenant.getMonth();
    const anneeActuelle = maintenant.getFullYear();

    return (paiementList ?? []).reduce((total, paiement) => {
      // 1. Ne conserver que les paiements validés.
      if (paiement.statut?.toLowerCase() !== "validé") {
        return total;
      }

      // 2. Récupérer la date de validation.
      const dateValidation = convertirDate(paiement.updated_at);

      if (!dateValidation) {
        return total;
      }

      // 3. Vérifier que la validation appartient au mois actuel.
      const memeMois =
        dateValidation.getMonth() === moisActuel &&
        dateValidation.getFullYear() === anneeActuelle;

      if (!memeMois) {
        return total;
      }

      // 4. Ajouter le montant au total.
      return total + Number(paiement.montant || 0);
    }, 0);
  }, [paiementList]);

  const statistiques = useMemo(() => {
    const maintenant = new Date();

    // Générer les six mois calendaires,
    // du plus ancien au mois actuel.
    const mois = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(
        maintenant.getFullYear(),
        maintenant.getMonth() - 5 + i,
        1,
      );

      return {
        cle: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0",
        )}`,

        label: date.toLocaleDateString("fr-FR", {
          month: "short",
        }),

        total: 0,
      };
    });

    // Associer chaque mois à son nombre d'inscriptions.
    const parMois = new Map(mois.map((m) => [m.cle, m]));

    (inscriptions ?? []).forEach((inscription) => {
      const date = convertirDate(inscription.date_debut);

      if (!date) return;

      const cle = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;

      const statistique = parMois.get(cle);

      if (statistique) {
        statistique.total += 1;
      }
    });

    return mois;
  }, [inscriptions]);

  // Éviter une division par zéro.
  const maximum = Math.max(...statistiques.map((m) => m.total), 1);
  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Administration
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Vue d'ensemble
        </h2>
      </AnimatedSection>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={HiOutlineUsers}
          label="Utilisateurs"
          value={userList.length || 0}
        />
        <StatCard
          icon={HiOutlineBookOpen}
          label="Cours publiés"
          value={cours.filter((c) => c.statut === "publié").length}
          delay={80}
        />
        <StatCard
          icon={HiOutlineBanknotes}
          label="Revenus ce mois"
          value={formatAriary(revenuMois)}
          delay={160}
        />
        <StatCard
          icon={HiOutlineClipboardDocumentCheck}
          label="Cours à valider"
          value={courBrouillon.length || 0}
          delay={240}
        />
      </section>

      <AnimatedSection
        delay={100}
        className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6 sm:p-7"
      >
        <div className="mb-6 flex items-center gap-2">
          <HiOutlineChartBar size={17} className="text-coral-dark" />
          <h3 className="font-display text-lg font-semibold text-ink">
            Inscriptions — 6 derniers mois
          </h3>
        </div>
        <div className="flex h-40 items-stretch gap-3 sm:gap-4">
          {statistiques.map((m) => {
            const hauteur =
              m.total === 0 ? 0 : Math.max((m.total / maximum) * 100, 3);

            return (
              <div
                key={m.cle}
                className="flex min-w-0 flex-1 flex-col items-center gap-2"
              >
                {/* Zone du graphique */}
                <div className="relative w-full flex-1">
                  {/* Nombre d'inscriptions */}
                  <span className="absolute inset-x-0 -top-5 text-center font-mono text-[10px] text-ink-soft">
                    {m.total}
                  </span>

                  {/* Barre */}
                  <div
                    className="absolute bottom-0 w-full rounded-t-lg bg-coral/80 transition-all duration-700 ease-out"
                    style={{
                      height: `${hauteur}%`,
                      minHeight: m.total > 0 ? "2px" : "0",
                    }}
                    title={`${m.total} inscription(s) en ${m.label}`}
                  />
                </div>

                {/* Mois */}
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((l, i) => (
          <AnimatedSection
            key={l.to}
            delay={i * 60}
            as={Link}
            to={l.to}
            className="group flex items-center gap-3 rounded-2xl border border-ivory-dark bg-ivory-dark/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 hover:bg-white dark:hover:bg-ivory-dark"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark transition-colors duration-300 group-hover:bg-coral group-hover:text-ivory">
              <l.icon size={17} />
            </span>
            <span className="font-body text-sm font-semibold text-ink">
              {l.label}
            </span>
            <HiOutlineArrowRight
              className="ml-auto text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              size={15}
            />
          </AnimatedSection>
        ))}
      </section>
    </div>
  );
}
