import { useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { CONVERSATIONS } from "../../lib/mockStudentData";

export default function Messages() {
  const [active, setActive] = useState(CONVERSATIONS[0]);
  const [draft, setDraft] = useState("");

  return (
    <AnimatedSection
      className="grid overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 md:grid-cols-3"
      style={{ minHeight: "480px" }}
    >
      <div className="divide-y divide-ivory-dark border-b border-ivory-dark md:border-b-0 md:border-r">
        {CONVERSATIONS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m)}
            className={`w-full px-5 py-4 text-left transition-colors duration-200 ${
              active.id === m.id ? "bg-coral/10" : "hover:bg-ivory-dark/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-body text-sm font-semibold text-ink">{m.prof}</p>
              {!m.lu && <span className="h-2 w-2 rounded-full bg-coral" />}
            </div>
            <p className="mt-0.5 truncate font-body text-xs text-ink-soft">{m.extrait}</p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">{m.heure}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:col-span-2">
        <div className="border-b border-ivory-dark px-6 py-4">
          <p className="font-display text-sm font-semibold text-ink">{active.prof}</p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Professeur · {active.instrument}</p>
        </div>
        <div className="flex-1 space-y-3 p-6">
          <div className="max-w-xs rounded-2xl rounded-tl-sm bg-ivory-dark/60 px-4 py-2.5 font-body text-sm text-ink">{active.extrait}</div>
        </div>
        <div className="flex items-center gap-2 border-t border-ivory-dark p-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Écrire un message…"
            className="flex-1 rounded-full border border-ivory-dark bg-white/70 px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
          />
          <button
            onClick={() => setDraft("")}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            aria-label="Envoyer"
          >
            <HiOutlinePaperAirplane size={15} />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
