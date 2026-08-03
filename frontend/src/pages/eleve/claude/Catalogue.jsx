import React from 'react'

function Catalogue({ goTo }) {
  const [q, setQ] = useState("");
  const [niveau, setNiveau] = useState("Tous");
  const niveaux = ["Tous", "Débutant", "Intermédiaire", "Avancé"];
  const filtered = COURSES.filter(c =>
    c.titre.toLowerCase().includes(q.toLowerCase()) &&
    (niveau === "Tous" || c.niveau === niveau)
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-stone-300 rounded-sm px-3 py-2.5">
          <Search size={16} className="text-stone-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un cours, un instrument, un professeur…" className="w-full text-sm outline-none bg-transparent text-teal-950" />
        </div>
        <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-sm px-3 py-2.5">
          <Filter size={15} className="text-stone-400" />
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className="text-sm outline-none bg-transparent text-teal-950">
            {niveaux.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => (
          <button key={c.id} onClick={() => goTo("detail")} className="text-left bg-white border border-stone-200 rounded-sm overflow-hidden hover:border-amber-600 hover:shadow-md transition-all">
            <div className={`h-28 ${swatch[c.img]} flex items-center justify-center`}>
              <Music size={28} className="text-teal-950/40" />
            </div>
            <div className="p-4">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${badge[c.img]}`}>{c.niveau.toUpperCase()}</span>
              <p className="font-body text-sm font-semibold text-teal-950 mt-2 leading-snug">{c.titre}</p>
              <p className="text-xs text-stone-500 mt-1">{c.prof} · {c.instrument}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-stone-500">
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-500" /> {c.note} ({c.avis})</span>
                <span className="font-mono text-teal-950">{c.prix.toLocaleString()} Ar</span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-sm text-stone-500 col-span-full">Aucun cours ne correspond à ta recherche.</p>}
      </div>
    </div>
  );
}

export default Catalogue