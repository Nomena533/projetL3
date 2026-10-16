// Helpers partagés entre prof/Profil.jsx (édition) et home/DetailProf.jsx (affichage).
// Les listes `experiences` et `parcours` peuvent arriver de l'API soit déjà en tableau
// (cast 'array' côté Laravel), soit sous forme de chaîne JSON : on gère les deux.
export function parseList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseSpecialites(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const EMPTY_EXPERIENCE = { poste: "", lieu: "", periode: "", description: "" };
export const EMPTY_PARCOURS = { diplome: "", etablissement: "", periode: "" };
