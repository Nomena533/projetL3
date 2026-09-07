// ---------------------------------------------------------------------------
// Données du parcours de formation (4 niveaux) — à terme remplacées par les
// appels API Laravel (GET /api/eleve/parcours, GET /api/eleve/parcours/:niveau).
// En attendant, cette fabrique de mock sert de source unique pour :
//   - eleve/Formation.jsx        (page "Mon parcours")
//   - eleve/FormationDetail.jsx  (détail d'un niveau)
//   - home/Inscription.jsx       (formulaire d'inscription public)
// ---------------------------------------------------------------------------

// `inscrit` : l'élève a-t-il déjà une inscription active sur ce niveau ?
// `progression` : pourcentage global de complétion du niveau (0-100).
export const NIVEAUX_PARCOURS = [
  {
    id: "initiation",
    ordre: 1,
    nom: "Initiation",
    duree: "2 mois",
    description: "Premiers gestes avec l'instrument : posture, accordage, écoute.",
    inscrit: true,
    dateInscription: "12 Fév 2026",
    progression: 100,
  },
  {
    id: "debutant",
    ordre: 2,
    nom: "Débutant",
    duree: "3 mois",
    description: "Lecture simplifiée, gammes et premiers morceaux traditionnels.",
    inscrit: true,
    dateInscription: "20 Avr 2026",
    progression: 55,
  },
  {
    id: "intermediaire",
    ordre: 3,
    nom: "Intermédiaire",
    duree: "4 mois",
    description: "Techniques avancées, jeu à l'oreille et répertoire élargi.",
    inscrit: false,
    dateInscription: null,
    progression: 0,
  },
  {
    id: "avance",
    ordre: 4,
    nom: "Avancé",
    duree: "6 mois",
    description: "Maîtrise de l'instrument, scène, improvisation et création.",
    inscrit: false,
    dateInscription: null,
    progression: 0,
  },
];

// Montant identique pour chaque instrument, quel que soit le niveau.
export const MONTANT_PAR_INSTRUMENT = 50000; // en Ariary

// Instruments proposés lors de l'inscription (choix multiple).
export const INSTRUMENTS_DISPONIBLES = [
  { id: "valiha", nom: "Valiha", emoji: "🎼" },
  { id: "kabosy", nom: "Kabosy", emoji: "🪕" },
  { id: "sodina", nom: "Sodina", emoji: "🎋" },
  { id: "guitare", nom: "Guitare", emoji: "🎸" },
  { id: "piano", nom: "Piano", emoji: "🎹" },
  { id: "chant", nom: "Chant", emoji: "🎤" },
];

// Détail des formations suivies par l'élève, par niveau puis par instrument.
// Chaque entrée contient les cours suivis et les exercices réalisés.
export const FORMATIONS_PAR_NIVEAU = {
  initiation: [
    {
      instrument: "Valiha",
      emoji: "🎼",
      tone: "coral",
      prof: "Rado Andrianantenaina",
      progression: 100,
      cours: [
        { id: 1, titre: "Découverte du Valiha", statut: "Terminé" },
        { id: 2, titre: "Accordage et posture", statut: "Terminé" },
        { id: 3, titre: "Premiers arpèges", statut: "Terminé" },
      ],
      exercices: [
        { id: 1, titre: "Reconnaître les cordes à l'oreille", note: "18/20" },
        { id: 2, titre: "Enregistrer un arpège simple", note: "16/20" },
      ],
    },
  ],
  debutant: [
    {
      instrument: "Valiha",
      emoji: "🎼",
      tone: "coral",
      prof: "Rado Andrianantenaina",
      progression: 70,
      cours: [
        { id: 1, titre: "Gammes traditionnelles", statut: "Terminé" },
        { id: 2, titre: "Morceau : Andriana", statut: "En cours" },
      ],
      exercices: [{ id: 1, titre: "Interpréter un extrait de 30 secondes", note: "En attente" }],
    },
    {
      instrument: "Kabosy",
      emoji: "🪕",
      tone: "amber",
      prof: "Hery Rakotomalala",
      progression: 40,
      cours: [
        { id: 1, titre: "Accords de base", statut: "Terminé" },
        { id: 2, titre: "Rythmes du sud", statut: "En cours" },
      ],
      exercices: [{ id: 1, titre: "Jouer un rythme à deux temps", note: "14/20" }],
    },
  ],
};
