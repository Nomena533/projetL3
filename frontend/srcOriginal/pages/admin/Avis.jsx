import { useState } from "react";
import { HiStar } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import Pill from "../../components/Pill";
import { AVIS_ADMIN } from "../../lib/mockAdminData";

export default function AdminAvis() {
  const [items, setItems] = useState(AVIS_ADMIN);
  const [toDelete, setToDelete] = useState(null);

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Avis</h2>
      </AnimatedSection>

      <div className="space-y-3">
        {items.map((a, i) => (
          <AnimatedSection key={a.id} delay={i * 80} className="rounded-2xl border border-ivory-dark bg-white/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-body text-sm font-semibold text-ink">{a.cours}</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <HiStar key={j} size={13} className={j < a.note ? "" : "opacity-25"} />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-ink-soft">{a.eleve}</span>
                </div>
              </div>
              <Pill>{a.statut}</Pill>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{a.commentaire}</p>
            <button
              onClick={() => setToDelete(a)}
              className="mt-3 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-brick/80 transition-colors hover:text-brick"
            >
              <HiOutlineTrash size={13} /> Supprimer l'avis
            </button>
          </AnimatedSection>
        ))}

        {items.length === 0 && (
          <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
            <p className="font-body text-sm text-ink-soft">Aucun avis à modérer.</p>
          </AnimatedSection>
        )}
      </div>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer cet avis ?">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          L'avis de <span className="font-semibold text-ink">{toDelete?.eleve}</span> sur{" "}
          <span className="font-semibold text-ink">« {toDelete?.cours} »</span> sera définitivement supprimé.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setToDelete(null)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              setItems(items.filter((x) => x.id !== toDelete.id));
              setToDelete(null);
            }}
            className="flex-1 rounded-full bg-brick py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-brick/25 transition-all duration-300 hover:bg-brick-light"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
