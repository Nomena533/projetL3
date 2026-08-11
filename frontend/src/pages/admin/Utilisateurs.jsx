import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineUserMinus, HiOutlineUserPlus, HiOutlineTrash } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { UTILISATEURS } from "../../lib/mockAdminData";

export default function AdminUtilisateurs() {
  const [users, setUsers] = useState(UTILISATEURS);
  const [q, setQ] = useState("");
  const [toDelete, setToDelete] = useState(null);

  const filtered = users.filter(
    (u) => u.nom.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
  );

  function toggleStatut(id) {
    setUsers(users.map((u) => (u.id === id ? { ...u, statut: u.statut === "Actif" ? "Suspendu" : "Actif" } : u)));
  }

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Utilisateurs</h2>
      </AnimatedSection>

      <AnimatedSection delay={60} className="flex max-w-sm items-center gap-2 rounded-full border border-ivory-dark bg-white/70 px-5 py-3 transition-colors duration-300 focus-within:border-coral">
        <HiOutlineMagnifyingGlass className="shrink-0 text-ink-soft" size={16} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un utilisateur…"
          className="w-full bg-transparent font-body text-sm text-ink placeholder:text-ink-soft/60 outline-none"
        />
      </AnimatedSection>

      <AnimatedSection delay={100} className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ivory-dark">
              <tr>
                <Th>Nom</Th>
                <Th>Rôle</Th>
                <Th>E-mail</Th>
                <Th>Statut</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {filtered.map((u) => (
                <tr key={u.id} className="transition-colors duration-200 hover:bg-ivory-dark/30">
                  <Td className="font-semibold text-ink">{u.nom}</Td>
                  <Td>{u.role}</Td>
                  <Td className="text-ink-soft">{u.email}</Td>
                  <Td>
                    <Pill>{u.statut}</Pill>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleStatut(u.id)}
                        className="text-ink-soft transition-colors hover:text-coral-dark"
                        title={u.statut === "Actif" ? "Suspendre" : "Réactiver"}
                      >
                        {u.statut === "Actif" ? <HiOutlineUserMinus size={16} /> : <HiOutlineUserPlus size={16} />}
                      </button>
                      <button onClick={() => setToDelete(u)} className="text-ink-soft transition-colors hover:text-brick" aria-label="Supprimer">
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="px-5 py-12 text-center font-body text-sm text-ink-soft">Aucun utilisateur ne correspond à cette recherche.</p>
        )}
      </AnimatedSection>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer ce compte ?">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          Le compte de <span className="font-semibold text-ink">{toDelete?.nom}</span> sera définitivement supprimé,
          ainsi que ses données associées. Cette action est irréversible.
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
              setUsers(users.filter((x) => x.id !== toDelete.id));
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
