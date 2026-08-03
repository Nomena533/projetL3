import React from "react";
import { Th, Td } from "../../components/Table";
import { INSCRIPTIONS } from "../../lib/mockData";

export default function ProfEleves() {
  return (
    <div className="bg-white border border-stone-200 rounded-sm overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-stone-200">
          <tr>
            <Th>Élève</Th>
            <Th>Cours</Th>
            <Th>Progression</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {INSCRIPTIONS.map((i) => (
            <tr key={i.id}>
              <Td className="font-medium">{i.eleve}</Td>
              <Td>{i.cours}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1.5 bg-stone-200 rounded-full">
                    <div className="h-1.5 bg-amber-600 rounded-full" style={{ width: `${i.progression}%` }} />
                  </div>
                  <span className="font-mono text-xs text-stone-500">{i.progression}%</span>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
