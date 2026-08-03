import React, { useState } from "react";
import { CheckCircle2, XCircle } from "../../lib/icons";
import { COURS_A_VALIDER } from "../../lib/mockData";

export default function AdminValidation() {
  const [items, setItems] = useState(COURS_A_VALIDER);

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-stone-500">Aucun cours en attente de validation.</p>}
      {items.map((c) => (
        <div key={c.id} className="bg-white border border-stone-200 rounded-sm p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-teal-950">{c.titre}</p>
            <p className="text-xs text-stone-500 mt-0.5">
              {c.prof} · {c.instrument} · soumis {c.date}
            </p>
          </div>
          <button onClick={() => setItems(items.filter((x) => x.id !== c.id))} className="flex items-center gap-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-sm">
            <CheckCircle2 size={14} /> Valider
          </button>
          <button onClick={() => setItems(items.filter((x) => x.id !== c.id))} className="flex items-center gap-1 text-xs font-medium border border-stone-300 text-teal-950 px-3 py-2 rounded-sm">
            <XCircle size={14} /> Refuser
          </button>
        </div>
      ))}
    </div>
  );
}
