import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Download, Headphones, CheckCircle2 } from "../../lib/icons";
import ValihaStrings from "../../components/ValihaStrings";
import { LECONS } from "../../lib/mockStudentData";

export default function LessonPlayer() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video bg-teal-950 rounded-sm flex items-center justify-center relative overflow-hidden">
          <PlayCircle size={52} className="text-amber-400" />
          <ValihaStrings className="absolute bottom-0 left-0 h-8 w-full opacity-30" count={40} tone="amber" />
        </div>
        <div>
          <h2 className="font-display text-xl text-teal-950">Jouer une mélodie traditionnelle</h2>
          <p className="text-sm text-stone-500 mt-1">Leçon 4 sur 5 · 30 min</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 text-sm border border-stone-300 px-4 py-2 rounded-sm text-teal-950">
            <Download size={14} /> Partition PDF
          </button>
          <button className="flex items-center gap-2 text-sm border border-stone-300 px-4 py-2 rounded-sm text-teal-950">
            <Headphones size={14} /> Piste audio
          </button>
        </div>
        <div className="bg-white border border-stone-200 rounded-sm p-5">
          <h3 className="font-display text-base text-teal-950 mb-2">Exercice</h3>
          <p className="text-sm text-stone-600 mb-3">Enregistre-toi en train de jouer la mélodie, puis envoie ton fichier pour correction.</p>
          <button className="text-sm bg-teal-950 text-stone-50 px-4 py-2 rounded-sm">Déposer mon fichier</button>
        </div>
      </div>

      <aside className="bg-white border border-stone-200 rounded-sm p-4 h-fit">
        <p className="text-xs font-mono text-stone-400 mb-3">PLAN DU COURS</p>
        <div className="space-y-1">
          {LECONS.map((l) => (
            <Link
              key={l.id}
              to="/lecon"
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-sm text-left text-sm ${
                l.titre === "Jouer une mélodie traditionnelle" ? "bg-amber-50 text-amber-800" : "text-teal-950 hover:bg-stone-50"
              }`}
            >
              {l.fait ? <CheckCircle2 size={14} className="text-emerald-600" /> : <PlayCircle size={14} className="text-stone-400" />}
              {l.titre}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
