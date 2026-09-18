import { useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { updateStatutPaiement } from "../../app/api/paiementApi";
import { PAIEMENTS, formatAriary } from "../../lib/mockAdminData";
import usePaiement from "../../app/hooks/usePaiement";
import { useUser } from "../../app/hooks/useUser";
import { useLevel } from "../../app/hooks/useLevel";
import { capitalize } from "../../lib/formatFunction";

const STATUTS_PAIEMENT = ["Payé", "En attente", "Échoué"];

export default function AdminPaiements() {
  const [paiements, setPaiements] = useState(PAIEMENTS);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  const {paiementList} = usePaiement();
  const {userList} = useUser();
  const {levels} = useLevel();

  console.log("paiementList : ", paiementList);

  const handleStatutChange = async (paiement, statut) => {
    const ancienStatut = paiement.statut;
    setError(null);
    setPaiements((items) =>
      items.map((item) => (item.id === paiement.id ? { ...item, statut } : item)),
    );
    setUpdatingId(paiement.id);

    try {
      await updateStatutPaiement(paiement.id, { statut });
    } catch (requestError) {
      setPaiements((items) =>
        items.map((item) =>
          item.id === paiement.id ? { ...item, statut: ancienStatut } : item,
        ),
      );
      setError("Le statut du paiement n'a pas pu être modifié.");
      console.error(
        "Erreur lors de la modification du statut du paiement",
        requestError.response?.data,
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Paiements</h2>
      </AnimatedSection>

      {error && (
        <p role="alert" className="font-body text-sm text-brick">
          {error}
        </p>
      )}

      <AnimatedSection delay={80} className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ivory-dark">
              <tr>
                <Th>Élève</Th>
                <Th>Niveau</Th>
                <Th>Montant</Th>
                <Th>Mode</Th>
                <Th>Statut</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {paiementList.map((p) => {
                const eleve = userList.find((e) => e.id === p.inscription.user_id);
                const niveau = levels.find((l) => l.id === p.inscription.niveau_id);
                return (
                  <tr key={p.id} className="transition-colors duration-200 hover:bg-ivory-dark/30">
                    <Td className="font-semibold text-ink">{eleve.name} {eleve.firstname}</Td>
                    <Td>{capitalize(niveau.name)}</Td>
                    <Td className="font-mono">{formatAriary(p.montant)}</Td>
                    <Td>{p.mode_paiement}</Td>
                    <Td>
                      <label className="flex items-center gap-2">
                        <select
                          value={p.statut}
                          disabled={updatingId === p.id}
                          onChange={(event) => handleStatutChange(p, event.target.value)}
                          aria-label={`Modifier le statut du paiement de ${p.eleve}`}
                          className="rounded-full border border-ivory-dark bg-white/80 px-3 py-1.5 font-body text-xs text-ink outline-none transition-colors duration-300 focus:border-coral disabled:cursor-wait disabled:opacity-60"
                        >
                          {STATUTS_PAIEMENT.map((statut) => (
                            <option key={statut} value={statut}>
                              {statut}
                            </option>
                          ))}
                        </select>
                        <Pill>{p.statut}</Pill>
                      </label>
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </div>
  );
}
