import { LayoutDashboard, BookOpen, ClipboardCheck, Users, MessageCircle, Sliders, Wallet, Star } from "./icons";

// src/lib/mockProfData.js
// Données factices pour l'espace Professeur — à remplacer par les appels à
// l'API Laravel lorsque le back-end sera connecté. Classes Tailwind écrites
// en clair (maps statiques) pour rester compatibles avec le moteur JIT.

export const NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"];
export const INSTRUMENTS = ["Valiha", "Kabosy", "Piano", "Guitare", "Chant", "Batterie"];

// Fond des vignettes de cours par "tonalité" (même cycle que l'espace Élève)
export const TONE_BG = {
  coral: "bg-coral/90",
  amber: "bg-amber/90",
  brick: "bg-brick/90",
};

// Les teintes de badge de statut sont désormais centralisées dans
// `components/Pill.jsx` (partagées avec l'espace Administrateur).

export function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export const MES_COURS = [
  {
    id: 1,
    titre: "Valiha — Les fondamentaux",
    instrument: "Valiha",
    niveau: "Débutant",
    statut: "Publié",
    eleves: 28,
    prix: 45000,
    tone: "coral",
    emoji: "🎼",
  },
  {
    id: 2,
    titre: "Valiha — Techniques avancées",
    instrument: "Valiha",
    niveau: "Avancé",
    statut: "Publié",
    eleves: 17,
    prix: 58000,
    tone: "brick",
    emoji: "🎼",
  },
  {
    id: 3,
    titre: "Improvisation au Valiha",
    instrument: "Valiha",
    niveau: "Intermédiaire",
    statut: "Brouillon",
    eleves: 0,
    prix: 50000,
    tone: "amber",
    emoji: "🎼",
  },
];

export const SOUMISSIONS = [
  {
    id: 1,
    eleve: "Fara Rakoto",
    cours: "Valiha — Les fondamentaux",
    exercice: "Exercice 4 — Mélodie traditionnelle",
    date: "il y a 2h",
    statut: "En attente",
  },
  {
    id: 2,
    eleve: "Tsiory Randria",
    cours: "Valiha — Les fondamentaux",
    exercice: "Exercice 3 — Gammes et arpèges",
    date: "il y a 5h",
    statut: "En attente",
  },
  {
    id: 3,
    eleve: "Mamy Faneva",
    cours: "Valiha — Techniques avancées",
    exercice: "Exercice 2 — Improvisation libre",
    date: "Hier",
    statut: "En attente",
  },
  {
    id: 4,
    eleve: "Voahangy Andria",
    cours: "Valiha — Les fondamentaux",
    exercice: "Exercice 1 — Accordage",
    date: "il y a 2 jours",
    statut: "Corrigé",
    note: 18,
  },
];

export const INSCRIPTIONS = [
  { id: 1, eleve: "Fara Rakoto", cours: "Valiha — Les fondamentaux", progression: 60 },
  { id: 2, eleve: "Tsiory Randria", cours: "Valiha — Les fondamentaux", progression: 35 },
  { id: 3, eleve: "Mamy Faneva", cours: "Valiha — Techniques avancées", progression: 80 },
  { id: 4, eleve: "Voahangy Andria", cours: "Valiha — Les fondamentaux", progression: 15 },
];

/* "path" = route absolue react-router-dom, "end" = correspondance exacte pour <NavLink> */
export const NAV_PROF = [
  { path: "/professeur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { path: "/professeur/mescours", label: "Mes cours", icon: BookOpen },
  { path: "/professeur/corrections", label: "Corrections", icon: ClipboardCheck },
  { path: "/professeur/eleves", label: "Élèves & progression", icon: Users },
  { path: "/professeur/messages", label: "Messages", icon: MessageCircle },
];
