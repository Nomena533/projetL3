import React, { useState } from "react";
import { Trash2 } from "../../lib/icons";
import Pill from "../../components/Pill";
import { AVIS_ADMIN } from "../../lib/mockData";

export default function AdminAvis() {
  const [items, setItems] = useState(AVIS_ADMIN);

  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div key={a.id} className="bg-white border border-stone-200 rounded-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-950">{a.cours}</p>
              <p className="text-xs text-stone-500 mt-0.5">
                {a.eleve} · {Array.from({ length: a.note }).map((_, i) => "★").join("")}
              </p>
            </div>
            <Pill>{a.statut}</Pill>
          </div>
          <p className="text-sm text-stone-600 mt-2">{a.commentaire}</p>
          <button onClick={() => setItems(items.filter((x) => x.id !== a.id))} className="text-xs text-orange-600 mt-2 flex items-center gap-1">
            <Trash2 size={13} /> Supprimer l'avis
          </button>
        </div>
      ))}
    </div>
  );
}
