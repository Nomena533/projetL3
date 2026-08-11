import { useState } from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { COURS_A_VALIDER } from "../../lib/mockAdminData";

export default function AdminValidation() {
  const [items, setItems] = useState(COURS_A_VALIDER);

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Validation des cours</h2>
      </AnimatedSection>

      {items.length === 0 ? (
        <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
          <HiOutlineClipboardDocumentCheck size={22} className="mx-auto text-ink-soft" />
          <p className="mt-3 font-body text-sm text-ink-soft">Aucun cours en attente de validation.</p>
        </AnimatedSection>
      ) : (
        <div className="space-y-3">
          {items.map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={i * 80}
              className="flex flex-col gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold text-ink">{c.titre}</p>
                <p className="mt-0.5 font-body text-xs text-ink-soft">
                  {c.prof} · {c.instrument} · soumis {c.date}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setItems(items.filter((x) => x.id !== c.id))}
                  className="flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-xs font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
                >
                  <HiOutlineCheckCircle size={15} /> Valider
                </button>
                <button
                  onClick={() => setItems(items.filter((x) => x.id !== c.id))}
                  className="flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-xs font-semibold text-ink transition-all duration-300 hover:border-brick/40 hover:text-brick"
                >
                  <HiOutlineXCircle size={15} /> Refuser
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
