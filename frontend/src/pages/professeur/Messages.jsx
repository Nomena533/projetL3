import { useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { INSCRIPTIONS } from "../../lib/mockProfData";

export default function ProfMessages() {
  const [active, setActive] = useState(INSCRIPTIONS[0]);
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Espace professeur</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Messages</h2>
      </AnimatedSection>

      <AnimatedSection
        delay={80}
        className="grid overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 md:grid-cols-3"
        style={{ minHeight: "440px" }}
      >
        <div className="divide-y divide-ivory-dark border-b border-ivory-dark md:border-b-0 md:border-r">
          {INSCRIPTIONS.map((i) => (
            <button
              key={i.id}
              onClick={() => setActive(i)}
              className={`w-full px-5 py-4 text-left transition-colors duration-200 ${
                active.id === i.id ? "bg-coral/10" : "hover:bg-ivory-dark/40"
              }`}
            >
              <p className="font-body text-sm font-semibold text-ink">{i.eleve}</p>
              <p className="mt-0.5 font-body text-xs text-ink-soft">À propos de : {i.cours}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:col-span-2">
          <div className="border-b border-ivory-dark px-6 py-4">
            <p className="font-display text-sm font-semibold text-ink">{active.eleve}</p>
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{active.cours}</p>
          </div>
          <div className="flex-1 space-y-3 p-6">
            <div className="max-w-xs rounded-2xl rounded-tl-sm bg-ivory-dark/60 px-4 py-2.5 font-body text-sm text-ink">
              Bonjour professeur, j'ai une question sur l'exercice 3.
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-ivory-dark p-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Répondre…"
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
    </div>
  );
}
