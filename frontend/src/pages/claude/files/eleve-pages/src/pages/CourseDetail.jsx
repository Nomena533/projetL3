import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Music, CheckCircle2, PlayCircle, Star, Heart, Video, FileText, Headphones, Award } from "../lib/icons";
import { COURSES, LECONS, badge, swatch } from "../lib/mockData";

export default function CourseDetail() {
  const { id } = useParams();
  const c = COURSES.find((x) => String(x.id) === id) || COURSES[0];
  const [fav, setFav] = useState(false);

  return (
    <div className="space-y-6">
      <Link to="/catalogue" className="text-xs font-mono text-stone-500 flex items-center gap-1 w-fit">
        <ChevronLeft size={13} /> RETOUR AU CATALOGUE
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className={`h-56 rounded-sm ${swatch[c.img]} flex items-center justify-center`}>
            <Music size={40} className="text-teal-950/40" />
          </div>
          <div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${badge[c.img]}`}>{c.niveau.toUpperCase()}</span>
            <h2 className="font-display text-2xl text-teal-950 mt-2">{c.titre}</h2>
            <p className="text-sm text-stone-500 mt-1">
              Par {c.prof} · {c.duree} de contenu · {LECONS.length} leçons
            </p>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Un parcours pas à pas pour apprendre {c.instrument.toLowerCase()}, de l'accordage aux premières mélodies traditionnelles, avec des
            retours personnalisés de ton professeur à chaque exercice envoyé.
          </p>

          <div>
            <h3 className="font-display text-lg text-teal-950 mb-3">Contenu du cours</h3>
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-sm">
              {LECONS.map((l) => (
                <Link key={l.id} to="/lecon" className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-50">
                  {l.fait ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <PlayCircle size={16} className="text-stone-400 shrink-0" />}
                  <span className="text-sm text-teal-950 flex-1">{l.titre}</span>
                  <span className="text-xs font-mono text-stone-400">{l.duree}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-teal-950 mb-3">Avis des élèves</h3>
            <div className="bg-white border border-stone-200 rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="text-amber-500 fill-amber-500" />
                ))}
                <span className="text-xs text-stone-500">Tsiory, il y a 3 jours</span>
              </div>
              <p className="text-sm text-stone-600">Professeur patient, les vidéos sont claires et le rythme est parfait pour un vrai débutant.</p>
              <label className="flex items-center gap-2 mt-4 text-xs text-stone-500">
                Laisser une note :
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-stone-300" />
                ))}
              </label>
            </div>
          </div>
        </div>

        <aside className="bg-white border border-stone-200 rounded-sm p-5 h-fit sticky top-4">
          <p className="font-mono text-2xl text-teal-950">{c.prix.toLocaleString()} Ar</p>
          <button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-3 rounded-sm">Acheter ce cours</button>
          <button onClick={() => setFav(!fav)} className="w-full mt-2 border border-stone-300 text-sm font-medium py-3 rounded-sm flex items-center justify-center gap-2 text-teal-950">
            <Heart size={15} className={fav ? "fill-orange-600 text-orange-600" : "text-stone-400"} />
            {fav ? "Dans mes favoris" : "Ajouter aux favoris"}
          </button>
          <div className="mt-5 space-y-2 text-xs text-stone-500">
            <p className="flex items-center gap-2">
              <Video size={13} /> Leçons vidéo téléchargeables
            </p>
            <p className="flex items-center gap-2">
              <FileText size={13} /> Partitions PDF incluses
            </p>
            <p className="flex items-center gap-2">
              <Headphones size={13} /> Pistes audio d'accompagnement
            </p>
            <p className="flex items-center gap-2">
              <Award size={13} /> Certificat à la fin du parcours
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
