import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Pill from "../../components/Pill";
import FilterBar from "../../components/FilterBar";
import { SOUMISSIONS } from "../../lib/mockProfData";
import { useSoumission } from "../../app/hooks/useSoumission";
import { getSoumissionMeta } from "../../lib/soumissionMeta";
import { useLevel } from "../../app/hooks/useLevel";
import { capitalize, formatDate } from "../../lib/formatFunction";
import Alert from "../../components/Alert";
import { User } from "../../lib/icons";
import { useAuth } from "../../app/hooks/useAuth";

const STATUT_OPTIONS = [
  { value: "en attente", label: "En attente" },
  { value: "corriger", label: "Corrigé" },
];

export default function ProfCorrections() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("");
  const { soumission, fetchSoumission } = useSoumission();
  // console.log("soumission :", soumission);
  const {user} = useAuth();

  const soumissionProf = soumission.filter((s) => s.exercice.lesson.cour.prof_id === user.id);
  // console.log("soumissionProf : ", soumissionProf);

  const [alert, setAlert] = useState(
    location.state?.success
      ? { type: "success", message: location.state.success }
      : location.state?.error
        ? { type: "error", message: location.state.error }
        : null,
  );

  // Nettoie le state de navigation pour ne pas réafficher l'alerte si
  // l'utilisateur revient sur cette page (F5, retour navigateur…).
  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-fermeture de l'alerte après quelques secondes.
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const filtered = useMemo(() => {
    return soumissionProf.filter((s) => {
      const matchSearch = search
        ? `${s.exercice.titre} ${s.exercice.lesson.titre ?? ""} ${s.exercice.lesson.cour.titre ?? ""} ${s.exercice.lesson.cour.level.name ?? ""} ${s.eleve.name ?? ""} ${s.eleve.firstname ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      const matchStatut = statutFilter ? s.statut === statutFilter : true;
      return matchSearch && matchStatut;
    });
  }, [soumission, search, statutFilter]);

  const hasActiveFilters = search !== "" || statutFilter !== "";

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Espace professeur
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Corrections
        </h2>
      </AnimatedSection>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {soumission?.length > 0 && (
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Rechercher un exercice, un élève…"
          filters={[
            {
              name: "statut",
              label: "Tous les statuts",
              value: statutFilter,
              onChange: setStatutFilter,
              options: STATUT_OPTIONS,
            },
          ]}
          resultCount={filtered.length}
          totalCount={soumission.length}
          hasActiveFilters={hasActiveFilters}
          onReset={() => {
            setSearch("");
            setStatutFilter("");
          }}
        />
      )}

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ivory-dark px-5 py-12 text-center font-body text-sm text-ink-soft">
          {soumission.length === 0
            ? "Aucune soumission pour le moment."
            : "Aucune soumission ne correspond à ta recherche."}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((s, i) => {
            const niveauNom = s.exercice.lesson.cour.level.name;
            const coursNom = s.exercice.lesson.cour.titre;
            const leconNom = s.exercice.lesson.titre;
            const eleveNom = `${s.eleve.name} ${s.eleve.firstname}`;
            const eleveEmail = s.eleve.email;
            const eleveAvatar = s.eleve.photo;

            return (
              <AnimatedSection
                key={s.id}
                delay={i * 70}
                className="rounded-2xl border border-ivory-dark bg-white/60 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-body text-sm font-semibold text-ink">
                        {s.exercice.titre}
                      </p>
                      {/* le bg du statut est défini depuis le composant réutilisatble components/Pill.jsx 
                        "en attente": "bg-amber/20 text-brick",
                        corriger: "bg-coral/10 text-coral-dark",
                      */}
                      <Pill>{s.statut}</Pill>
                    </div>

                    {/* Chemin niveau / cours / leçon — infos générales sur la soumission */}
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      <span className="flex items-center gap-1">
                        <HiOutlineAcademicCap
                          size={13}
                          className="text-coral-dark"
                        />
                        {niveauNom}
                      </span>
                      <HiOutlineChevronRight size={11} />
                      <span className="flex items-center gap-1">
                        <HiOutlineBookOpen
                          size={13}
                          className="text-coral-dark"
                        />
                        {coursNom}
                      </span>
                      <HiOutlineChevronRight size={11} />
                      <span>{leconNom}</span>
                    </div>

                    {/* Élève ayant envoyé la soumission */}
                    <div className="flex items-center gap-2">
                      {eleveAvatar ? (
                        <img
                          src={eleveAvatar}
                          alt={eleveNom}
                          className="h-6 w-6 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <HiOutlineUserCircle
                          size={20}
                          className="shrink-0 text-ink-soft"
                        />
                      )}
                      <p className="font-body text-xs text-ink-soft">
                        <span className="font-semibold text-ink">
                          {eleveNom}
                        </span>
                        {/* {eleveEmail && <span> · {eleveEmail}</span>} */}
                        <span> · {formatDate(s.created_at)}</span>
                      </p>
                    </div>

                    {/* Lien discret vers le détail de la soumission */}
                    <Link
                      to={`/professeur/corrections/${s.id}`}
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft/70 transition-colors duration-200 hover:text-coral-dark"
                    >
                      Voir le détail
                      <HiOutlineChevronRight size={11} />
                    </Link>
                  </div>

                  {/* Statut + note mise par le prof (lecture seule ici, la correction se fait sur la page de détail) */}
                  <div className="flex shrink-0 items-center gap-1.5 font-mono text-xs sm:pl-4">
                    {s.statut === "en attente" ? (
                      <span className="flex items-center gap-1.5 text-ink-soft">
                        <HiOutlineClock size={16} /> En attente
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-coral-dark">
                        <HiOutlineCheckCircle size={17} />{" "}
                        {s.note ? `${s.note}/20` : "Corrigé"}
                      </span>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      )}
    </div>
  );
}
