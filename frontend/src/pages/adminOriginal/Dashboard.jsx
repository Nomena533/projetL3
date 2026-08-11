import React from "react";
import { Users, BookOpen, Wallet, ClipboardCheck, BarChart3 } from "../../lib/icons";
import StatCard from "../../components/StatCard";
import { COURS_A_VALIDER } from "../../lib/mockProfAdminData";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid sm:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Utilisateurs" value="1 284" />
        <StatCard icon={BookOpen} label="Cours publiés" value="96" />
        <StatCard icon={Wallet} label="Revenus ce mois" value="6,2M Ar" />
        <StatCard icon={ClipboardCheck} label="Cours à valider" value={COURS_A_VALIDER.length} />
      </section>
      <section className="bg-white border border-stone-200 rounded-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={16} className="text-amber-700" />
          <h3 className="font-display text-lg text-teal-950">Inscriptions — 6 derniers mois</h3>
        </div>
        <div className="flex items-end gap-3 h-32">
          {[40, 55, 48, 70, 65, 82].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-amber-500/80 rounded-t-sm" style={{ height: `${v}%` }} />
              <span className="text-[10px] font-mono text-stone-400">{["Mars", "Avr", "Mai", "Juin", "Juil", "Août"][i]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
