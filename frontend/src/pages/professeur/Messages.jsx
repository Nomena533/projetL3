import React, { useState } from "react";
import { Send } from "../../lib/icons";
import { INSCRIPTIONS } from "../../lib/mockProfAdminData";

export default function ProfMessages() {
  const [active, setActive] = useState(INSCRIPTIONS[0]);

  return (
    <div className="grid md:grid-cols-3 bg-white border border-stone-200 rounded-sm overflow-hidden" style={{ minHeight: "440px" }}>
      <div className="border-r border-stone-200 divide-y divide-stone-100">
        {INSCRIPTIONS.map((i) => (
          <button key={i.id} onClick={() => setActive(i)} className={`w-full text-left px-4 py-3 ${active.id === i.id ? "bg-amber-50" : "hover:bg-stone-50"}`}>
            <p className="text-sm font-semibold text-teal-950">{i.eleve}</p>
            <p className="text-xs text-stone-500 mt-0.5">À propos de : {i.cours}</p>
          </button>
        ))}
      </div>
      <div className="md:col-span-2 flex flex-col">
        <div className="px-5 py-3 border-b border-stone-200">
          <p className="text-sm font-semibold text-teal-950">{active.eleve}</p>
        </div>
        <div className="flex-1 p-5">
          <div className="bg-stone-100 text-sm text-teal-950 rounded-sm px-4 py-2 max-w-xs">Bonjour professeur, j'ai une question sur l'exercice 3.</div>
        </div>
        <div className="p-4 border-t border-stone-200 flex items-center gap-2">
          <input placeholder="Répondre…" className="flex-1 text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none" />
          <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-sm p-2.5">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
