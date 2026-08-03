import React from "react";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { PAIEMENTS } from "../../lib/mockData";

export default function AdminPaiements() {
  return (
    <div className="bg-white border border-stone-200 rounded-sm overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-stone-200">
          <tr>
            <Th>Élève</Th>
            <Th>Cours</Th>
            <Th>Montant</Th>
            <Th>Mode</Th>
            <Th>Statut</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {PAIEMENTS.map((p) => (
            <tr key={p.id}>
              <Td className="font-medium">{p.eleve}</Td>
              <Td>{p.cours}</Td>
              <Td className="font-mono">{p.montant.toLocaleString()} Ar</Td>
              <Td>{p.mode}</Td>
              <Td>
                <Pill>{p.statut}</Pill>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
