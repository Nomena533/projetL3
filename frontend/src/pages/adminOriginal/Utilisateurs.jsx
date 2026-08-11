import React, { useState } from "react";
import { Search, UserX, UserCheck, Trash2 } from "../../lib/icons";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { UTILISATEURS } from "../../lib/mockProfAdminData";

export default function AdminUtilisateurs() {
  const [users, setUsers] = useState(UTILISATEURS);
  const toggle = (id) => setUsers(users.map((u) => (u.id === id ? { ...u, statut: u.statut === "Actif" ? "Suspendu" : "Actif" } : u)));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-sm px-3 py-2.5 max-w-sm">
        <Search size={15} className="text-stone-400" />
        <input placeholder="Rechercher un utilisateur…" className="w-full text-sm outline-none bg-transparent" />
      </div>
      <div className="bg-white border border-stone-200 rounded-sm overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-stone-200">
            <tr>
              <Th>Nom</Th>
              <Th>Rôle</Th>
              <Th>E-mail</Th>
              <Th>Statut</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.map((u) => (
              <tr key={u.id}>
                <Td className="font-medium">{u.nom}</Td>
                <Td>{u.role}</Td>
                <Td className="text-stone-500">{u.email}</Td>
                <Td>
                  <Pill>{u.statut}</Pill>
                </Td>
                <Td>
                  <div className="flex gap-3">
                    <button onClick={() => toggle(u.id)} className="text-stone-500" title={u.statut === "Actif" ? "Suspendre" : "Réactiver"}>
                      {u.statut === "Actif" ? <UserX size={15} /> : <UserCheck size={15} />}
                    </button>
                    <button onClick={() => setUsers(users.filter((x) => x.id !== u.id))} className="text-orange-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
