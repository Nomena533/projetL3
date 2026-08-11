import AnimatedSection from "../../components/AnimatedSection";
import { Th, Td } from "../../components/Table";
import { INSCRIPTIONS } from "../../lib/mockProfData";

export default function ProfEleves() {
  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Espace professeur</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Mes élèves</h2>
      </AnimatedSection>

      <AnimatedSection delay={80} className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
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
              {INSCRIPTIONS.map((i) => (
                <tr key={i.id} className="transition-colors duration-200 hover:bg-ivory-dark/30">
                  <Td className="font-semibold text-ink">{i.eleve}</Td>
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
      </AnimatedSection>
    </div>
  );
}
