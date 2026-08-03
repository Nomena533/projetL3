import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, PenSquare, Trash2 } from "../../lib/icons";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { MES_COURS } from "../../lib/mockData";

export default function ProfMesCours() {
  const [cours, setCours] = useState(MES_COURS);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link to="/professeur/cours/nouveau" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-sm">
          <Plus size={15} /> Créer un cours
        </Link>
      </div>
      <div className="bg-white border border-stone-200 rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-stone-200">
            <tr>
              <Th>Cours</Th>
              <Th>Niveau</Th>
              <Th>Élèves</Th>
              <Th>Statut</Th>
              <Th>Prix</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {cours.map((c) => (
              <tr key={c.id}>
                <Td className="font-medium">{c.titre}</Td>
                <Td>{c.niveau}</Td>
                <Td>{c.eleves}</Td>
                <Td>
                  <Pill>{c.statut}</Pill>
                </Td>
                <Td className="font-mono">{c.prix.toLocaleString()} Ar</Td>
                <Td>
                  <div className="flex gap-3">
                    <Link to={`/professeur/cours/${c.id}`} className="text-amber-700">
                      <PenSquare size={15} />
                    </Link>
                    <button onClick={() => setCours(cours.filter((x) => x.id !== c.id))} className="text-orange-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
