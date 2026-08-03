import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, TrendingUp, Award } from "../../lib/icons";
import ValihaStrings from "../../components/ValihaStrings";
import StatCard from "../../components/StatCard";
import { COURSES, swatch } from "../../lib/mockStudentData";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="bg-teal-950 rounded-sm p-8 relative overflow-hidden">
        <p className="text-amber-400 text-xs font-mono tracking-wide">BONJOUR FARA</p>
        <h2 className="font-display text-2xl md:text-3xl text-stone-50 mt-2 max-w-md">
          Tu as tenu 12 jours d'affilée. Continue de tresser tes progrès.
        </h2>
        <Link to="/lecon" className="mt-6 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-5 py-2.5 rounded-sm inline-flex items-center gap-2">
          Reprendre ma leçon <ChevronRight size={15} />
        </Link>
        <ValihaStrings className="absolute right-6 top-0 h-full w-32 opacity-60" count={20} tone="amber" />
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Clock} label="Temps d'écoute cette semaine" value="4h 20" />
        <StatCard icon={TrendingUp} label="Progression globale" value="68%" />
        <StatCard icon={Award} label="Certificats obtenus" value="1" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-teal-950">Mes cours en cours</h3>
          <Link to="/catalogue" className="text-xs font-mono text-amber-700">VOIR LE CATALOGUE →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {COURSES.slice(0, 2).map((c) => (
            <Link key={c.id} to={`/cours/${c.id}`} className="text-left bg-white border border-stone-200 rounded-sm p-4 flex gap-4 hover:border-amber-600 transition-colors">
              <div className={`w-16 h-16 rounded-sm shrink-0 ${swatch[c.img]}`} />
              <div className="min-w-0">
                <p className="font-body text-sm font-semibold text-teal-950 truncate">{c.titre}</p>
                <p className="text-xs text-stone-500 mt-0.5">{c.prof}</p>
                <div className="w-full h-1.5 bg-stone-200 rounded-full mt-3">
                  <div className="h-1.5 bg-amber-600 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
