import { useMemo, useState } from "react";
import { HiOutlineUsers, HiOutlineBookOpen, HiOutlineChartBar } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import StatCard from "../../components/StatCard";
import FilterBar from "../../components/FilterBar";
import { Th, Td } from "../../components/Table";
import { INSCRIPTIONS } from "../../lib/mockProfData";

// Initiales d'un nom pour l'avatar rond (ex. "Rado Andria" -> "RA")
function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function ProfEleves() {
  const [search, setSearch] = useState("");
  const [coursFilter, setCoursFilter] = useState("");

  const coursOptions = useMemo(() => {
    const set = new Set(INSCRIPTIONS.map((i) => i.cours).filter(Boolean));
    return [...set].map((c) => ({ value: c, label: c }));
  }, []);

  const filtered = useMemo(() => {
    return INSCRIPTIONS.filter((i) => {
      const matchSearch = search
        ? `${i.eleve} ${i.cours}`.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchCours = coursFilter ? i.cours === coursFilter : true;
      return matchSearch && matchCours;
    });
  }, [search, coursFilter]);

  const hasActiveFilters = search !== "" || coursFilter !== "";

  const totalEleves = new Set(INSCRIPTIONS.map((i) => i.eleve)).size;
  const totalCours = new Set(INSCRIPTIONS.map((i) => i.cours)).size;
  const progressionMoyenne = INSCRIPTIONS.length
    ? Math.round(
        INSCRIPTIONS.reduce((a, i) => a + i.progression, 0) /
          INSCRIPTIONS.length,
      )
    : 0;

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Espace professeur
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Mes élèves
        </h2>
      </AnimatedSection>

      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard icon={HiOutlineUsers} label="Élèves inscrits" value={totalEleves} />
        <StatCard icon={HiOutlineBookOpen} label="Cours suivis" value={totalCours} delay={60} />
        <StatCard icon={HiOutlineChartBar} label="Progression moyenne" value={`${progressionMoyenne}%`} delay={120} />
      </section>

      {INSCRIPTIONS.length > 0 && (
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Rechercher un élève…"
          filters={[
            {
              name: "cours",
              label: "Tous les cours",
              value: coursFilter,
              onChange: setCoursFilter,
              options: coursOptions,
            },
          ]}
          resultCount={filtered.length}
          totalCount={INSCRIPTIONS.length}
          hasActiveFilters={hasActiveFilters}
          onReset={() => {
            setSearch("");
            setCoursFilter("");
          }}
        />
      )}

      <AnimatedSection
        delay={80}
        className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ivory-dark">
              <tr>
                <Th>Élève</Th>
                <Th>Cours</Th>
                <Th>Progression</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {filtered.map((i) => (
                <tr key={i.id} className="transition-colors duration-200 hover:bg-ivory-dark/30">
                  <Td>
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral/10 font-mono text-xs font-semibold text-coral-dark">
                        {initials(i.eleve)}
                      </span>
                      <span className="font-semibold text-ink">{i.eleve}</span>
                    </div>
                  </Td>
                  <Td>{i.cours}</Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 rounded-full bg-ivory-dark">
                        <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${i.progression}%` }} />
                      </div>
                      <span className="font-mono text-xs text-ink-soft">{i.progression}%</span>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {INSCRIPTIONS.length === 0 ? (
          <p className="px-5 py-12 text-center font-body text-sm text-ink-soft">
            Tu n'as pas encore d'élève inscrit à l'un de tes cours.
          </p>
        ) : (
          filtered.length === 0 && (
            <p className="px-5 py-12 text-center font-body text-sm text-ink-soft">
              Aucun élève ne correspond à ta recherche.
            </p>
          )
        )}
      </AnimatedSection>
    </div>
  );
}
