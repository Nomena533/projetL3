import AnimatedSection from "../../components/AnimatedSection";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { PAIEMENTS, formatAriary } from "../../lib/mockAdminData";

export default function AdminPaiements() {
  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Paiements</h2>
      </AnimatedSection>

      <AnimatedSection delay={80} className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ivory-dark">
              <tr>
                <Th>Élève</Th>
                <Th>Cours</Th>
                <Th>Montant</Th>
                <Th>Mode</Th>
                <Th>Statut</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {PAIEMENTS.map((p) => (
                <tr key={p.id} className="transition-colors duration-200 hover:bg-ivory-dark/30">
                  <Td className="font-semibold text-ink">{p.eleve}</Td>
                  <Td>{p.cours}</Td>
                  <Td className="font-mono">{formatAriary(p.montant)}</Td>
                  <Td>{p.mode}</Td>
                  <Td>
                    <Pill>{p.statut}</Pill>
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
