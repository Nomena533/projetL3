// Utilitaires partagés du parcours élève
// (Formation, FormationDetail, Progression, Paiement).
//
// Aucune dépendance React. Tout est dérivé des données DÉJÀ renvoyées par l'API
// (inscription, level, paiements). Les champs liés à l'examen sont OPTIONNELS :
// tant que l'API Laravel ne les renvoie pas, l'interface retombe sur un état neutre
// (voir CHANGEMENTS_PARCOURS_ELEVE.md pour la forme attendue).

/** Minuscule, sans accents, sans espaces superflus — pour comparer des statuts. */
export function normaliser(valeur) {
  return String(valeur ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** "3 mois" -> 3 ; valeur invalide -> 0. */
export function parseDureeMois(duree) {
  const n = parseInt(String(duree ?? "").split(" ")[0], 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// ---------------------------------------------------------------------------
// Paiements
// ---------------------------------------------------------------------------

/**
 * Statut normalisé d'un paiement : "valide" | "en_attente" | "refuse".
 * Un statut absent ou inconnu est traité comme "valide" pour ne pas casser
 * l'affichage existant ; seuls les statuts explicitement en attente / refusés
 * sont distingués.
 */
export function statutPaiement(paiement) {
  const s = normaliser(paiement?.statut);
  if (!s) return "valide";
  if (s.includes("attente") || s.includes("pending")) return "en_attente";
  if (/(refus|echou|rejet|annul|fail)/.test(s)) return "refuse";
  return "valide";
}

/**
 * Résumé des mois payés pour une inscription.
 * Un paiement "en attente" n'est JAMAIS compté comme validé, mais ses mois
 * ne peuvent pas être payés une seconde fois.
 */
export function resumePaiements(paiements, dureeMois) {
  let moisValides = 0;
  let moisEnAttente = 0;
  for (const p of paiements ?? []) {
    const n = parseInt(p?.nombre_mois, 10) || 0;
    const statut = statutPaiement(p);
    if (statut === "valide") moisValides += n;
    else if (statut === "en_attente") moisEnAttente += n;
  }
  return {
    moisValides,
    moisEnAttente,
    moisRestants: Math.max(0, dureeMois - moisValides - moisEnAttente),
  };
}

// ---------------------------------------------------------------------------
// Progression dans le temps
// ---------------------------------------------------------------------------

/**
 * Progression calendaire d'un niveau à partir de la date de début.
 * - progression : position de la ligne de la frise (mois courant inclus)
 * - avancement  : mois réellement écoulés / durée (pour les libellés "% terminé")
 */
export function calculProgression(dateDebut, dureeMois) {
  const duree = Number(dureeMois) || 0;
  const debut = dateDebut ? new Date(dateDebut) : null;

  if (!debut || Number.isNaN(debut.getTime()) || duree <= 0) {
    return {
      demarre: false,
      termine: false,
      moisEcoules: 0,
      moisActuel: 0,
      moisRestants: duree,
      progression: 0,
      avancement: 0,
    };
  }

  const now = new Date();
  let moisEcoules =
    (now.getFullYear() - debut.getFullYear()) * 12 +
    (now.getMonth() - debut.getMonth());
  if (now.getDate() < debut.getDate()) moisEcoules--;
  moisEcoules = Math.max(0, moisEcoules);

  const moisActuel = Math.min(moisEcoules + 1, duree);

  return {
    demarre: true,
    termine: moisEcoules >= duree,
    moisEcoules: Math.min(moisEcoules, duree),
    moisActuel,
    moisRestants: Math.max(duree - moisActuel, 0),
    progression: Math.min((moisActuel / duree) * 100, 100),
    avancement: Math.min((moisEcoules / duree) * 100, 100),
  };
}

export function calculDateFin(dateDebut, dureeMois) {
  if (!dateDebut || !dureeMois) return null;
  const debut = new Date(dateDebut);
  if (Number.isNaN(debut.getTime())) return null;
  const fin = new Date(debut);
  fin.setMonth(fin.getMonth() + Number(dureeMois));
  return fin;
}

// ---------------------------------------------------------------------------
// Examen de passage (champs optionnels renvoyés par l'API)
// ---------------------------------------------------------------------------

/**
 * Décision publiée d'une tentative : "reussi" | "echec" | null.
 * Retourne null tant que le résultat n'est pas officiellement publié.
 */
export function estPublie(tentative) {
  return (
    Boolean(tentative?.publie_le) || normaliser(tentative?.statut) === "publie"
  );
}

export function lireDecision(tentative) {
  if (!tentative || !estPublie(tentative)) return null;
  const d = normaliser(tentative.decision);
  if (/(echec|ajourn|rattrapage|refus|insuffisant|non.?admis|non.?valide)/.test(d))
    return "echec";
  if (/(reussi|admis|valide)/.test(d)) return "reussi";
  return null;
}

/**
 * Lit les informations d'examen d'une inscription.
 * Champs optionnels : inscription.examen, inscription.date_examen,
 * inscription.tentatives (ou tentatives_examen), inscription.eligibilite.
 */
export function lireExamen(inscription) {
  const examen = inscription?.examen ?? null;
  const brut =
    [inscription?.tentatives, inscription?.tentatives_examen].find(Array.isArray) ?? [];
  const tentatives = [...brut].sort(
    (a, b) => (Number(b.numero_tentative) || 0) - (Number(a.numero_tentative) || 0),
  );
  const date = examen?.date_debut ?? inscription?.date_examen ?? null;
  const dateExamen = date ? new Date(date) : null;

  return {
    examen,
    tentatives,
    derniere: tentatives[0] ?? null,
    dateExamen: dateExamen && !Number.isNaN(dateExamen.getTime()) ? dateExamen : null,
    eligibilite: inscription?.eligibilite ?? null,
  };
}

// ---------------------------------------------------------------------------
// État d'un niveau + prochaine action
// ---------------------------------------------------------------------------

export const ETATS_NIVEAU = {
  non_commence: { label: "Non commencé", badge: "bg-ivory-dark text-ink-soft" },
  en_attente: { label: "En attente", badge: "bg-amber/20 text-ink" },
  en_cours: { label: "En cours", badge: "bg-amber/20 text-ink" },
  examen_a_passer: { label: "Examen à passer", badge: "bg-coral/15 text-coral-dark" },
  resultat_attendu: { label: "Résultat à venir", badge: "bg-amber/20 text-ink" },
  reussi: { label: "Réussi", badge: "bg-coral/15 text-coral-dark" },
  rattrapage: { label: "Rattrapage", badge: "bg-brick/10 text-brick" },
};

/**
 * État pédagogique d'un niveau. Indépendant du paiement :
 * le paiement est affiché séparément.
 */
export function getEtatNiveau(inscription, progression, examen) {
  if (!inscription) return "non_commence";
  if (!inscription.date_debut) return "en_attente";

  const decision = lireDecision(examen?.derniere);
  const statut = normaliser(inscription.statut);
  if (decision === "reussi" || ["reussi", "diplome", "termine"].includes(statut))
    return "reussi";
  if (decision === "echec") return "rattrapage";
  if (examen?.derniere?.soumis_le) return "resultat_attendu";
  if (progression?.termine) return "examen_a_passer";
  return "en_cours";
}

/** Libellé du lien principal d'une carte de niveau, selon son état. */
export const LIBELLE_ACTION_NIVEAU = {
  en_cours: "Continuer ma formation",
  examen_a_passer: "Préparer l'examen de passage",
  resultat_attendu: "Voir mon examen",
  reussi: "Voir le détail de ma formation",
  rattrapage: "Préparer le rattrapage",
};
