import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/Shell";

import ProfDashboard from "./pages/professeur/Dashboard";
import ProfMesCours from "./pages/professeur/MesCours";
import ProfEditeur from "./pages/professeur/Editeur";
import ProfCorrections from "./pages/professeur/Corrections";
import ProfEleves from "./pages/professeur/Eleves";
import ProfMessages from "./pages/professeur/Messages";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUtilisateurs from "./pages/admin/Utilisateurs";
import AdminValidation from "./pages/admin/Validation";
import AdminReferentiels from "./pages/admin/Referentiels";
import AdminPaiements from "./pages/admin/Paiements";
import AdminAvis from "./pages/admin/Avis";

export default function App() {
  return (
    <Routes>
      {/* Entrée par défaut : redirige vers l'espace professeur.
          En production, redirige plutôt vers /professeur ou /administrateur
          selon le rôle de l'utilisateur connecté. */}
      <Route path="/" element={<Navigate to="/professeur" replace />} />

      <Route path="/professeur" element={<Shell role="prof" />}>
        <Route index element={<ProfDashboard />} />
        <Route path="mescours" element={<ProfMesCours />} />
        <Route path="cours/nouveau" element={<ProfEditeur />} />
        <Route path="cours/:id" element={<ProfEditeur />} />
        <Route path="corrections" element={<ProfCorrections />} />
        <Route path="eleves" element={<ProfEleves />} />
        <Route path="messages" element={<ProfMessages />} />
      </Route>

      <Route path="/administrateur" element={<Shell role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="utilisateurs" element={<AdminUtilisateurs />} />
        <Route path="validation" element={<AdminValidation />} />
        <Route path="referentiels" element={<AdminReferentiels />} />
        <Route path="paiements" element={<AdminPaiements />} />
        <Route path="avis" element={<AdminAvis />} />
      </Route>
    </Routes>
  );
}
