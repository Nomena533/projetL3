import { LayoutDashboard, BookOpen, Award, Heart, MessageCircle, User, Settings } from "./icons";

// src/lib/mockStudentData.js
// Données factices pour l'espace Élève — à remplacer par les appels à l'API Laravel
// lorsque le back-end sera connecté. Toutes les classes Tailwind sont écrites en clair
// (maps statiques) pour rester compatibles avec le moteur JIT de Tailwind.

// Fond des vignettes de cours par "tonalité" (cycle coral / amber / brick, comme sur le Home)
export const TONE_BG = {
  coral: "bg-coral/90",
  amber: "bg-amber/90",
  brick: "bg-brick/90",
};

// Badge de niveau — mêmes teintes que le design system, jamais de nouvelle couleur
export const NIVEAU_BADGE = {
  Débutant: "bg-coral/10 text-coral-dark",
  Intermédiaire: "bg-amber/20 text-brick",
  Avancé: "bg-brick/10 text-brick",
};

export function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export const COURSES = [
  {
    id: 1,
    titre: "Valiha — Les fondamentaux",
    instrument: "Valiha",
    emoji: "🎼",
    niveau: "Débutant",
    prof: "Njaka Rakotondrabe",
    prix: 45000,
    note: 4.9,
    avis: 128,
    duree: "3h 40",
    tone: "coral",
    progression: 60,
  },
  {
    id: 2,
    titre: "Kabosy — Rythmes du Sud",
    instrument: "Kabosy",
    emoji: "🪕",
    niveau: "Intermédiaire",
    prof: "Voahangy Andriamora",
    prix: 38000,
    note: 4.7,
    avis: 94,
    duree: "2h 55",
    tone: "amber",
    progression: 30,
  },
  {
    id: 3,
    titre: "Piano — Premiers accords",
    instrument: "Piano",
    emoji: "🎹",
    niveau: "Débutant",
    prof: "Hery Rasoanaivo",
    prix: 52000,
    note: 4.8,
    avis: 156,
    duree: "4h 10",
    tone: "brick",
    progression: 0,
  },
  {
    id: 4,
    titre: "Guitare — Accompagnement chant",
    instrument: "Guitare",
    emoji: "🎸",
    niveau: "Intermédiaire",
    prof: "Tiana Ravelojaona",
    prix: 41000,
    note: 4.6,
    avis: 73,
    duree: "3h 15",
    tone: "coral",
    progression: 0,
  },
  {
    id: 5,
    titre: "Chant traditionnel malgache",
    instrument: "Chant",
    emoji: "🎤",
    niveau: "Avancé",
    prof: "Soa Rajaonarivelo",
    prix: 48000,
    note: 5.0,
    avis: 61,
    duree: "2h 30",
    tone: "amber",
    progression: 0,
  },
  {
    id: 6,
    titre: "Batterie — Bases rythmiques",
    instrument: "Batterie",
    emoji: "🥁",
    niveau: "Débutant",
    prof: "Fy Andriamahefa",
    prix: 36000,
    note: 4.5,
    avis: 42,
    duree: "3h 00",
    tone: "brick",
    progression: 0,
  },
];

export const LECONS = [
  { id: 1, titre: "Découvrir le valiha et l'accordage", duree: "18 min", fait: true },
  { id: 2, titre: "Position des mains et premiers sons", duree: "22 min", fait: true },
  { id: 3, titre: "Gammes et arpèges de base", duree: "25 min", fait: true },
  { id: 4, titre: "Jouer une mélodie traditionnelle", duree: "30 min", fait: false },
  { id: 5, titre: "Accompagner un chant simple", duree: "28 min", fait: false },
];

export const CONVERSATIONS = [
  {
    id: 1,
    prof: "Njaka Rakotondrabe",
    instrument: "Valiha",
    extrait: "Bravo pour ton exercice, la position des doigts est bien meilleure !",
    heure: "09:42",
    lu: false,
    tone: "coral",
  },
  {
    id: 2,
    prof: "Voahangy Andriamora",
    instrument: "Kabosy",
    extrait: "N'oublie pas d'envoyer ton enregistrement avant vendredi.",
    heure: "Hier",
    lu: true,
    tone: "amber",
  },
  {
    id: 3,
    prof: "Hery Rasoanaivo",
    instrument: "Piano",
    extrait: "On reprend le morceau ensemble lors de la prochaine session.",
    heure: "Lundi",
    lu: true,
    tone: "brick",
  },
];

export const CERTIFICATS = [
  { id: 1, titre: "Valiha — Niveau débutant", date: "14 mars 2026" },
];

export const AVIS_COURS = [
  { id: 1, nom: "Tsiory R.", note: 5, texte: "Professeur patient, les vidéos sont claires et le rythme est parfait pour un vrai débutant.", date: "il y a 3 jours" },
  { id: 2, nom: "Mamy F.", note: 4, texte: "Très bon contenu, j'aurais aimé un peu plus d'exercices pratiques entre les leçons.", date: "il y a 1 semaine" },
];

/* "path" correspond à la route react-router-dom (relative au layout Shell) */
export const NAV = [
  { path: "/eleve", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { path: "/eleve/catalogue", label: "Cours", icon: BookOpen },
  { path: "/eleve/progression", label: "Progression & certificats", icon: Award },
  { path: "/eleve/favoris", label: "Favoris", icon: Heart },
  { path: "/eleve/messages", label: "Messages", icon: MessageCircle },
  { path: "/eleve/profil", label: "Mon profil", icon: User },
  { path: "/eleve/parametres", label: "Parametres", icon: Settings },
];
