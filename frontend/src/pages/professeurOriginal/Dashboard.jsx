import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Users, TrendingUp } from "../../lib/icons";
import ValihaStrings from "../../components/ValihaStrings";
import StatCard from "../../components/StatCard";
import Pill from "../../components/Pill";
import { MES_COURS } from "../../lib/mockProfAdminData";

export default function ProfDashboard() {
  return (
    <div className="space-y-8">
      <section className="bg-teal-950 rounded-sm p-8 relative overflow-hidden">
        <p className="text-amber-400 text-xs font-mono tracking-wide">BONJOUR RADO</p>
        <h2 className="font-display text-2xl md:text-3xl text-stone-50 mt-2 max-w-md">3 soumissions attendent ta correction.</h2>
        <Link to="/professeur/corrections" className="mt-6 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-5 py-2.5 rounded-sm inline-flex items-center gap-2">
          Corriger maintenant <ChevronRight size={15} />
        </Link>
        <ValihaStrings className="absolute right-6 top-0 h-full w-32 opacity-60" count={20} tone="amber" />
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Cours publiés" value="2" />
        <StatCard icon={Users} label="Élèves inscrits" value="45" />
        <StatCard icon={TrendingUp} label="Revenus ce mois" value="410k Ar" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-teal-950">Mes cours</h3>
          <Link to="/professeur/mescours" className="text-xs font-mono text-amber-700">GÉRER MES COURS →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {MES_COURS.slice(0, 2).map((c) => (
            <div key={c.id} className="bg-white border border-stone-200 rounded-sm p-4">
              <div className="flex items-start justify-between">
                <p className="font-body text-sm font-semibold text-teal-950">{c.titre}</p>
                <Pill>{c.statut}</Pill>
              </div>
              <p className="text-xs text-stone-500 mt-1">{c.eleves} élèves inscrits</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
