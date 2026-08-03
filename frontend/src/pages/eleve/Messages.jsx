import React, { useState } from "react";
import { Send } from "../../lib/icons";
import { MESSAGES } from "../../lib/mockStudentData";

export default function Messages() {
  const [active, setActive] = useState(MESSAGES[0]);

  return (
    <div className="grid md:grid-cols-3 gap-0 bg-white border border-stone-200 rounded-sm overflow-hidden" style={{ minHeight: "480px" }}>
      <div className="border-r border-stone-200 divide-y divide-stone-100">
        {MESSAGES.map((m) => (
          <button key={m.id} onClick={() => setActive(m)} className={`w-full text-left px-4 py-3 ${active.id === m.id ? "bg-amber-50" : "hover:bg-stone-50"}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-teal-950">{m.prof}</p>
              {!m.lu && <span className="w-2 h-2 rounded-full bg-orange-600" />}
            </div>
            <p className="text-xs text-stone-500 truncate mt-0.5">{m.extrait}</p>
            <p className="text-[10px] font-mono text-stone-400 mt-1">{m.heure}</p>
          </button>
        ))}
      </div>
      <div className="md:col-span-2 flex flex-col">
        <div className="px-5 py-3 border-b border-stone-200">
          <p className="text-sm font-semibold text-teal-950">{active.prof}</p>
          <p className="text-xs text-stone-500">Professeur · Valiha</p>
        </div>
        <div className="flex-1 p-5 space-y-3">
          <div className="bg-stone-100 text-sm text-teal-950 rounded-sm px-4 py-2 max-w-xs">{active.extrait}</div>
        </div>
        <div className="p-4 border-t border-stone-200 flex items-center gap-2">
          <input placeholder="Écrire un message…" className="flex-1 text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none" />
          <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-sm p-2.5">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
