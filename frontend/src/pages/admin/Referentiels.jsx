import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { INSTRUMENTS, NIVEAUX } from "../../lib/mockAdminData";

const TABS = [
  { id: "instruments", label: "Instruments", seed: INSTRUMENTS },
  { id: "niveaux", label: "Niveaux", seed: NIVEAUX },
];

export default function AdminReferentiels() {
  const [tab, setTab] = useState("instruments");
  const [lists, setLists] = useState({ instruments: INSTRUMENTS, niveaux: NIVEAUX });
  const [draft, setDraft] = useState("");

  const list = lists[tab];

  function addItem() {
    if (!draft.trim()) return;
    setLists({ ...lists, [tab]: [...lists[tab], draft.trim()] });
    setDraft("");
  }

  function removeItem(item) {
    setLists({ ...lists, [tab]: lists[tab].filter((x) => x !== item) });
  }

  return (
    <div className="max-w-md space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Référentiels</h2>
      </AnimatedSection>

      <AnimatedSection delay={60} className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-all duration-300 ${
              tab === t.id ? "bg-coral text-ivory shadow-md shadow-coral/25" : "border border-ivory-dark text-ink-soft hover:border-coral/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </AnimatedSection>

      <AnimatedSection delay={100} className="space-y-2 rounded-2xl border border-ivory-dark bg-white/70 p-5">
        {list.map((item) => (
          <div key={item} className="flex items-center justify-between border-b border-ivory-dark py-2.5 last:border-0 last:pb-0">
            <span className="font-body text-sm text-ink">{item}</span>
            <button onClick={() => removeItem(item)} className="text-ink-soft transition-colors hover:text-brick" aria-label={`Supprimer ${item}`}>
              <HiOutlineTrash size={14} />
            </button>
          </div>
        ))}

        <div className="flex gap-2 pt-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder={tab === "instruments" ? "Nouvel instrument" : "Nouveau niveau"}
            className="flex-1 rounded-xl border border-ivory-dark bg-white/70 px-3.5 py-2.5 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
          />
          <button
            onClick={addItem}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            aria-label="Ajouter"
          >
            <HiPlus size={16} />
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
}
