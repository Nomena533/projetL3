// Données de démonstration pour les pages publiques de Kalon'ny.
// À remplacer par des appels API réels (voir GUIDE_INSTALLATION.md).

export const instruments = [
  { id: "valiha", nom: "Valiha", emoji: "🎋", description: "Cithare tubulaire en bambou, instrument emblématique de Madagascar." },
  { id: "kabosy", nom: "Kabosy", emoji: "🪕", description: "Petite guitare malgache au son vif, cœur de la musique tsapiky." },
  { id: "guitare", nom: "Guitare", emoji: "🎸", description: "Acoustique ou électrique, du fingerstyle à l'accompagnement." },
  { id: "piano", nom: "Piano", emoji: "🎹", description: "Des bases classiques à l'improvisation jazz." },
  { id: "chant", nom: "Chant", emoji: "🎤", description: "Technique vocale, respiration et interprétation." },
  { id: "batterie", nom: "Batterie", emoji: "🥁", description: "Rythme, indépendance des membres et styles variés." },
];

export const niveaux = ["Débutant", "Intermédiaire", "Avancé"];

export const teachers = [
  { id: 1, nom: "Njaka Rakotondrabe", instrument: "Valiha", niveau: "Tous niveaux", eleves: 214, note: 4.9, photoBg: "coral", bio: "Musicien traditionnel formé au Conservatoire, 12 ans d'enseignement." },
  { id: 2, nom: "Voahangy Randria", instrument: "Piano", niveau: "Débutant à avancé", eleves: 178, note: 4.8, photoBg: "amber", bio: "Pianiste classique et jazz, ancienne élève de l'EGM." },
  { id: 3, nom: "Tojo Andrianasolo", instrument: "Guitare", niveau: "Tous niveaux", eleves: 302, note: 4.9, photoBg: "brick", bio: "Spécialiste fingerstyle, tournées internationales." },
  { id: 4, nom: "Fara Ravelojaona", instrument: "Chant", niveau: "Débutant à intermédiaire", eleves: 145, note: 5.0, photoBg: "coral", bio: "Chanteuse lyrique et coach vocal certifiée." },
  { id: 5, nom: "Dimby Rasolofo", instrument: "Kabosy", niveau: "Débutant", eleves: 96, note: 4.7, photoBg: "amber", bio: "Figure du tsapiky, transmet la tradition du Sud." },
  { id: 6, nom: "Mialy Ratsimbazafy", instrument: "Batterie", niveau: "Tous niveaux", eleves: 121, note: 4.8, photoBg: "brick", bio: "Batteuse session, formée aux percussions traditionnelles." },
];

export const courses = [
  { id: "c1", titre: "Valiha : les fondamentaux", instrument: "Valiha", niveau: "Débutant", prof: "Njaka Rakotondrabe", prix: 45000, duree: "6h30", lecons: 18, note: 4.9, eleves: 214 },
  { id: "c2", titre: "Piano jazz : improviser en confiance", instrument: "Piano", niveau: "Intermédiaire", prof: "Voahangy Randria", prix: 65000, duree: "9h15", lecons: 24, note: 4.8, eleves: 178 },
  { id: "c3", titre: "Guitare fingerstyle", instrument: "Guitare", niveau: "Avancé", prof: "Tojo Andrianasolo", prix: 70000, duree: "10h", lecons: 28, note: 4.9, eleves: 302 },
  { id: "c4", titre: "Chant lyrique : poser sa voix", instrument: "Chant", niveau: "Débutant", prof: "Fara Ravelojaona", prix: 50000, duree: "7h", lecons: 20, note: 5.0, eleves: 145 },
  { id: "c5", titre: "Kabosy et musique du Sud", instrument: "Kabosy", niveau: "Débutant", prof: "Dimby Rasolofo", prix: 40000, duree: "5h45", lecons: 15, note: 4.7, eleves: 96 },
  { id: "c6", titre: "Batterie : rythmes traditionnels", instrument: "Batterie", niveau: "Intermédiaire", prof: "Mialy Ratsimbazafy", prix: 55000, duree: "8h", lecons: 22, note: 4.8, eleves: 121 },
];

export const testimonials = [
  { id: 1, nom: "Hery R.", role: "Élève en valiha", texte: "J'ai enfin pu apprendre le valiha de mon grand-père, à distance, avec un vrai professeur. Le suivi de progression me motive chaque semaine." },
  { id: 2, nom: "Lalao A.", role: "Élève en piano", texte: "Les vidéos et les exercices corrigés changent tout. Je progresse deux fois plus vite qu'en autodidacte." },
  { id: 3, nom: "Rivo M.", role: "Élève en guitare", texte: "Le paiement par Mvola a rendu l'inscription hyper simple. Support réactif, cours de qualité." },
];

export const pricingPlans = [
  {
    id: "decouverte",
    nom: "Découverte",
    prix: 0,
    periode: "gratuit",
    description: "Pour tester la plateforme et un premier instrument.",
    avantages: ["1 cours au choix", "Communauté d'élèves", "Support par email"],
    cta: "Commencer gratuitement",
    mis_en_avant: false,
  },
  {
    id: "standard",
    nom: "Standard",
    prix: 35000,
    periode: "/ mois",
    description: "L'essentiel pour progresser régulièrement.",
    avantages: ["Accès à tous les cours d'un instrument", "Suivi de progression", "Certificats de fin de cours", "Messagerie avec les professeurs"],
    cta: "Choisir Standard",
    mis_en_avant: true,
  },
  {
    id: "premium",
    nom: "Premium",
    prix: 60000,
    periode: "/ mois",
    description: "Pour les élèves multi-instruments et assidus.",
    avantages: ["Accès illimité à tous les instruments", "Sessions en visioconférence", "Corrections prioritaires", "Certificats + badges"],
    cta: "Choisir Premium",
    mis_en_avant: false,
  },
];

export const paymentMethods = [
  { id: "mvola", nom: "Mvola" },
  { id: "orange", nom: "Orange Money" },
  { id: "airtel", nom: "Airtel Money" },
];

export const faqItems = [
  { q: "Comment fonctionne un cours sur Kalon'ny ?", r: "Chaque cours est composé de leçons vidéo, de documents PDF et de fichiers audio. Vous progressez à votre rythme et validez des exercices corrigés par le professeur." },
  { q: "Puis-je apprendre le valiha en étant débutant complet ?", r: "Oui, la plupart des cours proposent un parcours « Débutant » qui ne demande aucune expérience préalable." },
  { q: "Quels moyens de paiement acceptez-vous ?", r: "Mvola, Orange Money et Airtel Money sont acceptés, en plus des cartes bancaires internationales." },
  { q: "Est-ce que j'obtiens un certificat ?", r: "Un certificat numérique est délivré à la validation complète d'un cours, avec un code de vérification unique." },
  { q: "Puis-je contacter mon professeur directement ?", r: "Oui, une messagerie intégrée permet d'échanger avec votre professeur pour poser vos questions." },
  { q: "Comment devenir professeur sur la plateforme ?", r: "Créez un compte, sélectionnez le profil « Professeur » et soumettez votre premier cours : notre équipe le valide sous 48h." },
];
