import { LayoutDashboard, BookOpen, ClipboardCheck, Users, MessageCircle, Sliders, Wallet, Star, Settings } from "./icons";

// src/lib/mockAdminData.js
// Données factices pour l'espace Administrateur — à remplacer par les appels
// à l'API Laravel lorsque le back-end sera connecté.

export const INSTRUMENTS = ["Valiha", "Kabosy", "Piano", "Guitare", "Chant", "Batterie", "Sodina"];
export const NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"];

export function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export const UTILISATEURS = [
  { id: 1, nom: "Fara Rakoto", role: "Élève", email: "fara.rakoto@mail.mg", statut: "Actif" },
  { id: 2, nom: "Njaka Rakotondrabe", role: "Professeur", email: "njaka.r@mail.mg", statut: "Actif" },
  { id: 3, nom: "Tsiory Randria", role: "Élève", email: "tsiory.r@mail.mg", statut: "Actif" },
  { id: 4, nom: "Voahangy Andriamora", role: "Professeur", email: "voahangy.a@mail.mg", statut: "Suspendu" },
  { id: 5, nom: "Mamy Faneva", role: "Élève", email: "mamy.f@mail.mg", statut: "Actif" },
  { id: 6, nom: "Rado Andriamampianina", role: "Professeur", email: "rado.a@mail.mg", statut: "Actif" },
];

export const COURS_A_VALIDER = [
  { id: 1, titre: "Improvisation au Valiha", prof: "Rado Andriamampianina", instrument: "Valiha", date: "il y a 1 jour" },
  { id: 2, titre: "Kabosy — Rythmes du Sud", prof: "Voahangy Andriamora", instrument: "Kabosy", date: "il y a 3 jours" },
];

export const PAIEMENTS = [
  { id: 1, eleve: "Fara Rakoto", cours: "Valiha — Les fondamentaux", montant: 45000, mode: "Mvola", statut: "Payé" },
  { id: 2, eleve: "Tsiory Randria", cours: "Piano — Premiers accords", montant: 52000, mode: "Orange Money", statut: "Payé" },
  { id: 3, eleve: "Mamy Faneva", cours: "Valiha — Techniques avancées", montant: 58000, mode: "Carte bancaire", statut: "En attente" },
  { id: 4, eleve: "Voahangy Andria", cours: "Guitare — Accompagnement chant", montant: 41000, mode: "Airtel Money", statut: "Échoué" },
];

export const AVIS_ADMIN = [
  { id: 1, cours: "Valiha — Les fondamentaux", eleve: "Tsiory R.", note: 5, commentaire: "Professeur patient, contenu très clair et bien rythmé.", statut: "Publié" },
  { id: 2, cours: "Piano — Premiers accords", eleve: "Mamy F.", note: 2, commentaire: "Le rythme des leçons est trop rapide pour un vrai débutant.", statut: "Signalé" },
  { id: 3, cours: "Guitare — Accompagnement chant", eleve: "Voahangy A.", note: 4, commentaire: "Très bon accompagnement, quelques exercices en plus seraient bienvenus.", statut: "Publié" },
];

export const NAV_ADMIN = [
  { path: "/administrateur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { path: "/administrateur/utilisateurs", label: "Utilisateurs", icon: Users },
  { path: "/administrateur/validation", label: "Cours à valider", icon: ClipboardCheck },
  { path: "/administrateur/referentiels", label: "Instruments & niveaux", icon: Sliders },
  { path: "/administrateur/paiements", label: "Paiements", icon: Wallet },
  { path: "/administrateur/avis", label: "Avis", icon: Star },
  { path: "/administrateur/parametres", label: "Parametres", icon: Settings },
];