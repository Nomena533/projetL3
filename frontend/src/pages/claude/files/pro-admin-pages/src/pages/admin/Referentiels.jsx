import React, { useState } from "react";
import { Trash2, Plus } from "../../lib/icons";
import { INSTRUMENTS, NIVEAUX } from "../../lib/mockData";

export default function AdminReferentiels() {
  const [tab, setTab] = useState("instruments");
  const list = tab === "instruments" ? INSTRUMENTS : NIVEAUX;

  return (
    <div className="max-w-md space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setTab("instruments")} className={`text-sm px-4 py-2 rounded-sm ${tab === "instruments" ? "bg-teal-950 text-stone-50" : "border border-stone-300 text-teal-950"}`}>
          Instruments
        </button>
        <button onClick={() => setTab("niveaux")} className={`text-sm px-4 py-2 rounded-sm ${tab === "niveaux" ? "bg-teal-950 text-stone-50" : "border border-stone-300 text-teal-950"}`}>
          Niveaux
        </button>
      </div>
      <div className="bg-white border border-stone-200 rounded-sm p-4 space-y-2">
        {list.map((item) => (
          <div key={item} className="flex items-center justify-between border-b border-stone-100 last:border-0 pb-2 last:pb-0">
            <span className="text-sm text-teal-950">{item}</span>
            <button className="text-orange-600">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <input placeholder={tab === "instruments" ? "Nouvel instrument" : "Nouveau niveau"} className="flex-1 text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none" />
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 rounded-sm">
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
