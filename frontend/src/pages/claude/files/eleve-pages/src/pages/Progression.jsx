import React from "react";
import { Award, GraduationCap } from "../lib/icons";
import ValihaStrings from "../components/ValihaStrings";
import { COURSES } from "../lib/mockData";

export default function Progression() {
  return (
    <div className="space-y-8">
      <section className="grid sm:grid-cols-2 gap-5">
        {COURSES.slice(0, 2).map((c, i) => (
          <div key={c.id} className="bg-white border border-stone-200 rounded-sm p-5">
            <p className="font-body text-sm font-semibold text-teal-950">{c.titre}</p>
            <p className="text-xs text-stone-500 mt-0.5">{c.prof}</p>
            <div className="w-full h-2 bg-stone-200 rounded-full mt-4">
              <div className="h-2 bg-amber-600 rounded-full" style={{ width: i === 0 ? "60%" : "30%" }} />
            </div>
            <p className="text-xs font-mono text-stone-500 mt-2">{i === 0 ? "60%" : "30%"} terminé</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="font-display text-lg text-teal-950 mb-3">Mes certificats</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-teal-950 rounded-sm p-5 text-stone-50 relative overflow-hidden">
            <Award size={22} className="text-amber-400" />
            <p className="font-display text-lg mt-3">Piano classique — niveau débutant</p>
            <p className="text-xs text-stone-400 mt-1">Obtenu le 14 mars 2026</p>
            <ValihaStrings className="absolute right-4 top-4 h-16 w-16 opacity-40" count={12} tone="amber" />
          </div>
          <div className="border border-dashed border-stone-300 rounded-sm p-5 flex flex-col items-center justify-center text-center text-stone-400">
            <GraduationCap size={22} />
            <p className="text-xs mt-2">Termine le cours de Valiha pour débloquer ton prochain certificat</p>
          </div>
        </div>
      </section>
    </div>
  );
}
