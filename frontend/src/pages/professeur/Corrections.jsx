import React, { useState } from "react";
import { CheckCircle2 } from "../../lib/icons";
import Pill from "../../components/Pill";
import { SOUMISSIONS } from "../../lib/mockProfAdminData";

export default function ProfCorrections() {
  const [items, setItems] = useState(SOUMISSIONS);

  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div key={s.id} className="bg-white border border-stone-200 rounded-sm p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-teal-950">
              {s.exercice} <span className="text-stone-400 font-normal">— {s.cours}</span>
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              {s.eleve} · {s.date}
            </p>
          </div>
          <Pill>{s.statut}</Pill>
          {s.statut === "En attente" ? (
            <div className="flex items-center gap-2">
              <input placeholder="Note /20" className="w-20 text-sm border border-stone-300 rounded-sm px-2 py-1.5 outline-none" />
              <button
                onClick={() => setItems(items.map((x) => (x.id === s.id ? { ...x, statut: "Corrigé" } : x)))}
                className="bg-teal-950 text-stone-50 text-xs font-medium px-3 py-2 rounded-sm"
              >
                Valider
              </button>
            </div>
          ) : (
            <CheckCircle2 size={18} className="text-emerald-600" />
          )}
        </div>
      ))}
    </div>
  );
}
