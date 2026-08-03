import { LayoutDashboard, BookOpen, Award, Heart, MessageCircle, User } from "./icons";

export const COURSES = [
  { id: 1, titre: "Valiha — Les bases du tressage sonore", prof: "Rado Andrianasolo", instrument: "Valiha", niveau: "Débutant", prix: 45000, note: 4.8, avis: 62, duree: "6h20", img: "amber" },
  { id: 2, titre: "Piano classique, du solfège au clavier", prof: "Hery Rakoto", instrument: "Piano", niveau: "Débutant", prix: 60000, note: 4.6, avis: 118, duree: "9h05", img: "stone" },
  { id: 3, titre: "Guitare acoustique — chansons malgaches", prof: "Nirina Rasoanaivo", instrument: "Guitare", niveau: "Intermédiaire", prix: 52000, note: 4.9, avis: 84, duree: "7h40", img: "orange" },
  { id: 4, titre: "Violon — technique d'archet avancée", prof: "Solo Ramanantsoa", instrument: "Violon", niveau: "Avancé", prix: 70000, note: 4.7, avis: 39, duree: "10h15", img: "teal" },
  { id: 5, titre: "Kabosy — rythmes traditionnels du Sud", prof: "Tojo Randria", instrument: "Kabosy", niveau: "Débutant", prix: 38000, note: 4.5, avis: 27, duree: "5h10", img: "amber" },
  { id: 6, titre: "Chant lyrique — pose de voix", prof: "Voahangy Rasolofo", instrument: "Chant", niveau: "Intermédiaire", prix: 55000, note: 4.8, avis: 71, duree: "8h30", img: "stone" },
];

export const LECONS = [
  { id: 1, titre: "Accorder son valiha", duree: "12 min", fait: true },
  { id: 2, titre: "Position des mains et posture", duree: "18 min", fait: true },
  { id: 3, titre: "Premiers arpèges", duree: "24 min", fait: true },
  { id: 4, titre: "Jouer une mélodie traditionnelle", duree: "30 min", fait: false },
  { id: 5, titre: "Improvisation guidée", duree: "22 min", fait: false },
];

export const MESSAGES = [
  { id: 1, prof: "Rado Andrianasolo", extrait: "Bravo pour l'exercice 3, ta tenue de rythme s'améliore.", lu: false, heure: "09:14" },
  { id: 2, prof: "Nirina Rasoanaivo", extrait: "N'oublie pas d'envoyer ta vidéo avant vendredi.", lu: true, heure: "Hier" },
  { id: 3, prof: "Hery Rakoto", extrait: "Voici la partition corrigée en pièce jointe.", lu: true, heure: "Lun." },
];

/* "path" correspond à la route react-router-dom (relative au layout Shell) */
export const NAV = [
  { path: "/", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { path: "/catalogue", label: "Cours", icon: BookOpen },
  { path: "/progression", label: "Progression & certificats", icon: Award },
  { path: "/favoris", label: "Favoris", icon: Heart },
  { path: "/messages", label: "Messages", icon: MessageCircle },
  { path: "/profil", label: "Mon profil", icon: User },
];

export const badge = { amber: "bg-amber-100 text-amber-800", stone: "bg-stone-200 text-stone-700", orange: "bg-orange-100 text-orange-800", teal: "bg-teal-100 text-teal-800" };
export const swatch = { amber: "bg-amber-200", stone: "bg-stone-300", orange: "bg-orange-200", teal: "bg-teal-200" };
