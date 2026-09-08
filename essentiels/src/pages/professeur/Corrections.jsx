import { useMemo, useState } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Pill from "../../components/Pill";
import FilterBar from "../../components/FilterBar";
import { SOUMISSIONS } from "../../lib/mockProfData";

const STATUT_OPTIONS = [
  { value: "En attente", label: "En attente" },
  { value: "Corrigé", label: "Corrigé" },
];

export default function ProfCorrections() {
  const [items, setItems] = useState(SOUMISSIONS);
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("");

  const filtered = useMemo(() => {
    return items.filter((s) => {
      const matchSearch = search
        ? `${s.exercice} ${s.cours} ${s.eleve}`
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      const matchStatut = statutFilter ? s.statut === statutFilter : true;
      return matchSearch && matchStatut;
    });
  }, [items, search, statutFilter]);

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
          {filtered.map((s, i) => (
            <AnimatedSection
              key={s.id}
              delay={i * 70}
              className="flex flex-col gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold text-ink">
                  {s.exercice} <span className="font-normal text-ink-soft">— {s.cours}</span>
                </p>
                <p className="mt-0.5 font-body text-xs text-ink-soft">
                  {s.eleve} · {s.date}
                </p>
              </div>

              <Pill>{s.statut}</Pill>

              {s.statut === "En attente" ? (
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Note /20"
                    className="w-24 rounded-full border border-ivory-dark bg-white/70 px-4 py-2 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
                  />
                  <button
                    onClick={() => setItems(items.map((x) => (x.id === s.id ? { ...x, statut: "Corrigé" } : x)))}
                    className="rounded-full bg-coral px-4 py-2 font-body text-xs font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
                  >
                    Valider
                  </button>
                </div>
              ) : (
                <span className="flex items-center gap-1.5 font-mono text-xs text-coral-dark">
                  <HiOutlineCheckCircle size={17} /> {s.note ? `${s.note}/20` : "Corrigé"}
                </span>
              )}
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
