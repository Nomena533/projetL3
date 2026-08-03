import React from 'react'

export default function Favoris({ goTo }) {
  const favs = COURSES.slice(2, 5);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {favs.map(c => (
        <div key={c.id} className="bg-white border border-stone-200 rounded-sm overflow-hidden">
          <div className={`h-24 ${swatch[c.img]}`} />
          <div className="p-4">
            <p className="font-body text-sm font-semibold text-teal-950 leading-snug">{c.titre}</p>
            <p className="text-xs text-stone-500 mt-1">{c.prof}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="font-mono text-xs text-teal-950">{c.prix.toLocaleString()} Ar</span>
              <button onClick={() => goTo("detail")} className="text-xs font-mono text-amber-700">VOIR →</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
