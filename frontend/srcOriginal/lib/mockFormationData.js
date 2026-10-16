// ---------------------------------------------------------------------------
// Données du parcours de formation (4 niveaux) — à terme remplacées par les
// appels API Laravel (GET /api/eleve/parcours, GET /api/eleve/parcours/:niveau,
// GET /api/eleve/paiements, POST /api/paiements).
// En attendant, cette fabrique de mock sert de source unique pour :
//   - eleve/Formation.jsx        (page "Mon parcours")
//   - eleve/FormationDetail.jsx  (détail d'un niveau)
//   - eleve/Paiement.jsx         (gestion des paiements restants de l'élève)
//   - home/Inscription.jsx       (formulaire d'inscription public)
//   - home/FormationPublique.jsx (catalogue public des niveaux)
//   - home/PaiementPublic.jsx    (1er paiement, juste après inscription)
// ---------------------------------------------------------------------------

// `inscrit`            : l'élève a-t-il déjà une inscription active sur ce niveau ?
// `progression`        : pourcentage global de complétion du niveau (0-100).
// `dureeMois`          : durée totale du niveau, en mois (version numérique de `duree`).
// `montantMensuel`     : mensualité du niveau, en Ariary.
// `droitInscription`   : frais uniques prélevés au tout premier paiement du niveau.
// `ouvertInscription`  : true si le niveau est accessible en inscription directe
//   depuis l'espace public (home/FormationPublique.jsx). Les niveaux intermédiaires
//   se débloquent uniquement en terminant le niveau précédent (voir eleve/Formation.jsx).
export const NIVEAUX_PARCOURS = [
  {
    id: "initiation",
    ordre: 1,
    nom: "Initiation",
    duree: "2 mois",
    dureeMois: 2,
    description: "Premiers gestes avec l'instrument : posture, accordage, écoute.",
    inscrit: true,
    dateInscription: "12 Fév 2026",
    progression: 100,
    montantMensuel: 50000,
    droitInscription: 20000,
    ouvertInscription: true,
  },
  {
    id: "debutant",
    ordre: 2,
    nom: "Débutant",
    duree: "3 mois",
    dureeMois: 3,
    description: "Lecture simplifiée, gammes et premiers morceaux traditionnels.",
    inscrit: true,
    dateInscription: "20 Avr 2026",
    progression: 55,
    montantMensuel: 60000,
    droitInscription: 20000,
    ouvertInscription: false,
  },
  {
    id: "intermediaire",
    ordre: 3,
    nom: "Intermédiaire",
    duree: "4 mois",
    dureeMois: 4,
    description: "Techniques avancées, jeu à l'oreille et répertoire élargi.",
    inscrit: false,
    dateInscription: null,
    progression: 0,
    montantMensuel: 70000,
    droitInscription: 25000,
    ouvertInscription: false,
  },
  {
    id: "avance",
    ordre: 4,
    nom: "Avancé",
    duree: "6 mois",
    dureeMois: 6,
    description: "Maîtrise de l'instrument, scène, improvisation et création.",
    inscrit: false,
    dateInscription: null,
    progression: 0,
    montantMensuel: 90000,
    droitInscription: 30000,
    ouvertInscription: true,
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

// ---------------------------------------------------------------------------
// Paiements
// ---------------------------------------------------------------------------

// Modes de paiement proposés sur les écrans de paiement (public et élève).
export const MODES_PAIEMENT = [
  { id: "mvola", nom: "Mvola", groupe: "mobile_money" },
  { id: "orange_money", nom: "Orange Money", groupe: "mobile_money" },
  { id: "airtel_money", nom: "Airtel Money", groupe: "mobile_money" },
  { id: "carte", nom: "Carte bancaire", groupe: "carte" },
];

// Mois déjà réglés par l'élève connecté, par niveau (1 = premier mois du niveau).
// - "initiation" (dureeMois: 2) est intégralement payé → aucun paiement en attente.
// - "debutant" (dureeMois: 3) n'a que son premier mois réglé (celui du premier
//   paiement fait juste après l'inscription) → 2 mois restent à payer.
// Alimente eleve/Paiement.jsx pour ne proposer que les mois restants.
export const MOIS_PAYES_PAR_NIVEAU = {
  initiation: [1, 2],
  debutant: [1],
};
