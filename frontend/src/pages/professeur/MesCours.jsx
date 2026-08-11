import { useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { MES_COURS, formatAriary } from "../../lib/mockProfData";

export default function ProfMesCours() {
  const [cours, setCours] = useState(MES_COURS);
  const [toDelete, setToDelete] = useState(null);

  return (
    <div className="space-y-6">
      <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Espace professeur</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Mes cours</h2>
        </div>
        <Link
          to="/professeur/cours/nouveau"
          className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          <HiPlus size={16} /> Créer un cours
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={80} className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ivory-dark">
              <tr>
                <Th>Cours</Th>
                <Th>Niveau</Th>
                <Th>Élèves</Th>
                <Th>Statut</Th>
                <Th>Prix</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {cours.map((c) => (
                <tr key={c.id} className="transition-colors duration-200 hover:bg-ivory-dark/30">
                  <Td className="font-semibold text-ink">{c.titre}</Td>
                  <Td>{c.niveau}</Td>
                  <Td>{c.eleves}</Td>
                  <Td>
                    <Pill>{c.statut}</Pill>
                  </Td>
                  <Td className="font-mono">{formatAriary(c.prix)}</Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Link to={`/professeur/cours/${c.id}`} className="text-ink-soft transition-colors hover:text-coral-dark" aria-label="Modifier">
                        <HiOutlinePencilSquare size={17} />
                      </Link>
                      <button onClick={() => setToDelete(c)} className="text-ink-soft transition-colors hover:text-brick" aria-label="Supprimer">
                        <HiOutlineTrash size={17} />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cours.length === 0 && (
          <p className="px-5 py-12 text-center font-body text-sm text-ink-soft">
            Tu n'as pas encore publié de cours.{" "}
            <Link to="/professeur/cours/nouveau" className="font-semibold text-coral-dark hover:text-brick">
              Crée le premier →
            </Link>
          </p>
        )}
      </AnimatedSection>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer ce cours ?">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">« {toDelete?.titre} »</span> sera définitivement supprimé, ainsi
          que ses leçons. Les élèves déjà inscrits perdront l'accès au contenu. Cette action est irréversible.
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
              setCours(cours.filter((x) => x.id !== toDelete.id));
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
