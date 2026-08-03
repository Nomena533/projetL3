import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Trash2, Video, FileText, Headphones } from "../../lib/icons";
import { NIVEAUX, MES_COURS } from "../../lib/mockData";

export default function ProfEditeur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existant = id ? MES_COURS.find((c) => String(c.id) === id) : null;

  const [lecons, setLecons] = useState([
    { id: 1, titre: "Accorder son valiha", video: true, pdf: true, audio: false },
    { id: 2, titre: "Premiers arpèges", video: true, pdf: false, audio: true },
  ]);

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate("/professeur/mescours")} className="text-xs font-mono text-stone-500 flex items-center gap-1">
        <ChevronLeft size={13} /> RETOUR À MES COURS
      </button>

      <div className="bg-white border border-stone-200 rounded-sm p-6 space-y-4">
        <h2 className="font-display text-lg text-teal-950">{existant ? "Modifier le cours" : "Nouveau cours"}</h2>
        <label className="block">
          <span className="text-xs font-body font-medium text-stone-500">Titre du cours</span>
          <input defaultValue={existant?.titre || ""} className="mt-1 w-full text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none focus:border-amber-600" />
        </label>
        <label className="block">
          <span className="text-xs font-body font-medium text-stone-500">Description</span>
          <textarea
            rows={3}
            className="mt-1 w-full text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none focus:border-amber-600"
            defaultValue="Un parcours pas à pas pour apprendre le valiha, de l'accordage aux premières mélodies."
          />
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs font-body font-medium text-stone-500">Instrument</span>
            <select className="mt-1 w-full text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none">
              <option>Valiha</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-body font-medium text-stone-500">Niveau</span>
            <select defaultValue={existant?.niveau} className="mt-1 w-full text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none">
              {NIVEAUX.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-body font-medium text-stone-500">Prix (Ar)</span>
            <input defaultValue={existant?.prix || 45000} className="mt-1 w-full text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none" />
          </label>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-teal-950">Leçons</h2>
          <button
            onClick={() => setLecons([...lecons, { id: Date.now(), titre: "Nouvelle leçon", video: false, pdf: false, audio: false }])}
            className="flex items-center gap-1 text-xs font-mono text-amber-700"
          >
            <Plus size={13} /> AJOUTER UNE LEÇON
          </button>
        </div>
        <div className="space-y-3">
          {lecons.map((l) => (
            <div key={l.id} className="border border-stone-200 rounded-sm p-4">
              <div className="flex items-center justify-between">
                <input defaultValue={l.titre} className="text-sm font-medium text-teal-950 outline-none border-b border-transparent focus:border-amber-600" />
                <button onClick={() => setLecons(lecons.filter((x) => x.id !== l.id))} className="text-orange-600">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-sm border ${l.video ? "border-amber-600 text-amber-700 bg-amber-50" : "border-stone-300 text-stone-500"}`}>
                  <Video size={13} /> Vidéo
                </button>
                <button className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-sm border ${l.pdf ? "border-amber-600 text-amber-700 bg-amber-50" : "border-stone-300 text-stone-500"}`}>
                  <FileText size={13} /> PDF
                </button>
                <button className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-sm border ${l.audio ? "border-amber-600 text-amber-700 bg-amber-50" : "border-stone-300 text-stone-500"}`}>
                  <Headphones size={13} /> Audio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => navigate("/professeur/mescours")} className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-5 py-2.5 rounded-sm">
          Publier le cours
        </button>
        <button onClick={() => navigate("/professeur/mescours")} className="border border-stone-300 text-teal-950 text-sm font-medium px-5 py-2.5 rounded-sm">
          Enregistrer le brouillon
        </button>
      </div>
    </div>
  );
}
