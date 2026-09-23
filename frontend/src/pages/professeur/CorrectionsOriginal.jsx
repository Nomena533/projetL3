import { useMemo, useState } from "react";
import {
  HiOutlineCheckCircle,
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

const STATUT_OPTIONS = [
  { value: "En attente", label: "En attente" },
  { value: "Corrigé", label: "Corrigé" },
];

// Lit le chemin niveau / cours / leçon et l'utilisateur quelle que soit la forme
// des données (mock plat actuel ou objets imbriqués renvoyés par l'API).
function getSoumissionMeta(s) {
  const lecon = s.lecon ?? s.exercice?.lecon ?? null;
  const cours = s.cours ?? lecon?.cours ?? s.exercice?.lecon?.cours ?? null;
  const niveau = s.niveau ?? cours?.niveau ?? null;

  const niveauNom = typeof niveau === "string" ? niveau : niveau?.nom;
  const coursNom = typeof cours === "string" ? cours : cours?.titre ?? cours?.nom;
  const leconNom = typeof lecon === "string" ? lecon : lecon?.titre;

  const utilisateur = s.utilisateur ?? (typeof s.eleve === "object" ? s.eleve : null);
  const eleveNom =
    typeof s.eleve === "string"
      ? s.eleve
      : `${utilisateur?.prenom ?? ""} ${utilisateur?.nom ?? ""}`.trim() || "Élève inconnu";
  const eleveEmail = utilisateur?.email;
  const eleveAvatar = utilisateur?.photo;

  return { niveauNom, coursNom, leconNom, eleveNom, eleveEmail, eleveAvatar };
}

export default function ProfCorrections() {
  const [items, setItems] = useState(SOUMISSIONS);
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("");
  const { soumission, fetchSoumission } = useSoumission();

  const enriched = useMemo(
    () => items.map((s) => ({ ...s, meta: getSoumissionMeta(s) })),
    [items]
  );

  const filtered = useMemo(() => {
    return enriched.filter((s) => {
      const matchSearch = search
        ? `${s.exercice} ${s.meta.coursNom ?? ""} ${s.meta.leconNom ?? ""} ${s.meta.eleveNom ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      const matchStatut = statutFilter ? s.statut === statutFilter : true;
      return matchSearch && matchStatut;
    });
  }, [enriched, search, statutFilter]);

  const hasActiveFilters = search !== "" || statutFilter !== "";

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Espace professeur</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Corrections</h2>
      </AnimatedSection>

      {items.length > 0 && (
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
          totalCount={items.length}
          hasActiveFilters={hasActiveFilters}
          onReset={() => {
            setSearch("");
            setStatutFilter("");
          }}
        />
      )}

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ivory-dark px-5 py-12 text-center font-body text-sm text-ink-soft">
          {items.length === 0
            ? "Aucune soumission pour le moment."
            : "Aucune soumission ne correspond à ta recherche."}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((s, i) => {
            const { niveauNom, coursNom, leconNom, eleveNom, eleveEmail, eleveAvatar } = s.meta;

            return (
              <AnimatedSection
                key={s.id}
                delay={i * 70}
                className="rounded-2xl border border-ivory-dark bg-white/60 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-body text-sm font-semibold text-ink">{s.exercice}</p>
                      <Pill>{s.statut}</Pill>
                    </div>

                    {/* Chemin niveau / cours / leçon */}
                    {(niveauNom || coursNom || leconNom) && (
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                        {niveauNom && (
                          <span className="flex items-center gap-1">
                            <HiOutlineAcademicCap size={13} className="text-coral-dark" />
                            {niveauNom}
                          </span>
                        )}
                        {niveauNom && (coursNom || leconNom) && <HiOutlineChevronRight size={11} />}
                        {coursNom && (
                          <span className="flex items-center gap-1">
                            <HiOutlineBookOpen size={13} className="text-coral-dark" />
                            {coursNom}
                          </span>
                        )}
                        {coursNom && leconNom && <HiOutlineChevronRight size={11} />}
                        {leconNom && <span>{leconNom}</span>}
                      </div>
                    )}

                    {/* Élève ayant envoyé la soumission */}
                    <div className="flex items-center gap-2">
                      {eleveAvatar ? (
                        <img
                          src={eleveAvatar}
                          alt={eleveNom}
                          className="h-6 w-6 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <HiOutlineUserCircle size={20} className="shrink-0 text-ink-soft" />
                      )}
                      <p className="font-body text-xs text-ink-soft">
                        <span className="font-semibold text-ink">{eleveNom}</span>
                        {eleveEmail && <span> · {eleveEmail}</span>}
                        <span> · {s.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:pl-4">
                    {s.statut === "En attente" ? (
                      <>
                        <input
                          placeholder="Note /20"
                          className="w-24 rounded-full border border-ivory-dark bg-white/70 px-4 py-2 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
                        />
                        <button
                          onClick={() =>
                            setItems(items.map((x) => (x.id === s.id ? { ...x, statut: "Corrigé" } : x)))
                          }
                          className="rounded-full bg-coral px-4 py-2 font-body text-xs font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
                        >
                          Valider
                        </button>
                      </>
                    ) : (
                      <span className="flex items-center gap-1.5 font-mono text-xs text-coral-dark">
                        <HiOutlineCheckCircle size={17} /> {s.note ? `${s.note}/20` : "Corrigé"}
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
