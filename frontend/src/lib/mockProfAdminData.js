import { LayoutDashboard, BookOpen, ClipboardCheck, Users, MessageCircle, Sliders, Wallet, Star } from "./icons";

export const MES_COURS = [
  { id: 1, titre: "Valiha — Les bases du tressage sonore", niveau: "Débutant", eleves: 34, statut: "Publié", prix: 45000 },
  { id: 2, titre: "Valiha — Improvisation avancée", niveau: "Avancé", eleves: 11, statut: "Publié", prix: 65000 },
  { id: 3, titre: "Initiation au kabosy", niveau: "Débutant", eleves: 0, statut: "Brouillon", prix: 38000 },
];

export const SOUMISSIONS = [
  { id: 1, eleve: "Fara Rakoto", exercice: "Premiers arpèges", cours: "Valiha — Les bases", date: "Auj. 09:12", statut: "En attente" },
  { id: 2, eleve: "Tojo Rabe", exercice: "Mélodie traditionnelle", cours: "Valiha — Les bases", date: "Hier", statut: "En attente" },
  { id: 3, eleve: "Miora Andria", exercice: "Improvisation guidée", cours: "Valiha — Avancée", date: "Lun.", statut: "Corrigé" },
];

export const INSCRIPTIONS = [
  { id: 1, eleve: "Fara Rakoto", cours: "Valiha — Les bases", progression: 60 },
  { id: 2, eleve: "Tojo Rabe", cours: "Valiha — Les bases", progression: 35 },
  { id: 3, eleve: "Miora Andria", cours: "Valiha — Avancée", progression: 82 },
  { id: 4, eleve: "Naina Rasoa", cours: "Valiha — Les bases", progression: 12 },
];

export const UTILISATEURS = [
  { id: 1, nom: "Fara Rakoto", role: "Élève", email: "fara.rakoto@mail.mg", statut: "Actif" },
  { id: 2, nom: "Rado Andrianasolo", role: "Professeur", email: "rado.a@mail.mg", statut: "Actif" },
  { id: 3, nom: "Tojo Rabe", role: "Élève", email: "tojo.rabe@mail.mg", statut: "Actif" },
  { id: 4, nom: "Hery Rakoto", role: "Professeur", email: "hery.r@mail.mg", statut: "Suspendu" },
];

export const COURS_A_VALIDER = [
  { id: 1, titre: "Kabosy — rythmes du Sud", prof: "Tojo Randria", instrument: "Kabosy", date: "Aujourd'hui" },
  { id: 2, titre: "Chant lyrique avancé", prof: "Voahangy Rasolofo", instrument: "Chant", date: "Hier" },
];

export const INSTRUMENTS = ["Valiha", "Piano", "Guitare", "Violon", "Kabosy", "Chant"];
export const NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"];

export const PAIEMENTS = [
  { id: 1, eleve: "Fara Rakoto", cours: "Valiha — Les bases", montant: 45000, mode: "Mvola", statut: "Payé" },
  { id: 2, eleve: "Miora Andria", cours: "Valiha — Avancée", montant: 65000, mode: "Orange Money", statut: "Payé" },
  { id: 3, eleve: "Naina Rasoa", cours: "Valiha — Les bases", montant: 45000, mode: "Carte", statut: "En attente" },
];

export const AVIS_ADMIN = [
  { id: 1, cours: "Valiha — Les bases", eleve: "Fara Rakoto", note: 5, commentaire: "Excellent professeur, très clair.", statut: "Publié" },
  { id: 2, cours: "Piano classique", eleve: "Tojo Rabe", note: 2, commentaire: "Contenu répétitif.", statut: "Signalé" },
];

/* "path" = route absolue react-router-dom, "end" = correspondance exacte pour <NavLink> */
export const NAV_PROF = [
  { path: "/professeur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { path: "/professeur/mescours", label: "Mes cours", icon: BookOpen },
  { path: "/professeur/corrections", label: "Corrections", icon: ClipboardCheck },
  { path: "/professeur/eleves", label: "Élèves & progression", icon: Users },
  { path: "/professeur/messages", label: "Messages", icon: MessageCircle },
];

export const NAV_ADMIN = [
  { path: "/administrateur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { path: "/administrateur/utilisateurs", label: "Utilisateurs", icon: Users },
  { path: "/administrateur/validation", label: "Cours à valider", icon: ClipboardCheck },
  { path: "/administrateur/referentiels", label: "Instruments & niveaux", icon: Sliders },
  { path: "/administrateur/paiements", label: "Paiements", icon: Wallet },
  { path: "/administrateur/avis", label: "Avis", icon: Star },
];

export const statusColor = {
  "Publié": "bg-emerald-100 text-emerald-700",
  "Brouillon": "bg-stone-200 text-stone-600",
  "En attente": "bg-amber-100 text-amber-800",
  "Corrigé": "bg-emerald-100 text-emerald-700",
  "Actif": "bg-emerald-100 text-emerald-700",
  "Suspendu": "bg-orange-100 text-orange-700",
  "Payé": "bg-emerald-100 text-emerald-700",
  "Signalé": "bg-orange-100 text-orange-700",
};
