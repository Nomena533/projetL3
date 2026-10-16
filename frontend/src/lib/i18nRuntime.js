// Petit utilitaire de langue utilisable HORS composant React (fonctions
// utilitaires, constantes de modules, formatage de dates…).
// La langue courante est synchronisée par <LangProvider> à chaque rendu.
import mg from "../locales/mg.json";

export const DICTIONARIES = { mg };
let currentLang = "fr";

export function setRuntimeLang(lang) {
  currentLang = lang;
}

export function getRuntimeLang() {
  return currentLang;
}

// Remplace les {{variable}} d'un texte par les valeurs fournies
function interpolate(text, vars) {
  if (!vars) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    vars[name] !== undefined && vars[name] !== null ? vars[name] : match,
  );
}

/**
 * Traduit un texte écrit en français (la clé EST le texte français).
 * - langue "fr" ou texte absent du dictionnaire → le texte d'origine est renvoyé
 *   (les données venant de l'API passent donc sans être modifiées) ;
 * - valeur non textuelle → renvoyée telle quelle.
 */
export function translate(lang, key, vars) {
  if (typeof key !== "string") return key;
  const text = lang === "fr" ? key : (DICTIONARIES[lang]?.[key] ?? key);
  return interpolate(text, vars);
}

// Version « sans hook » de t(), pour les helpers définis hors composant
export function tr(key, vars) {
  return translate(currentLang, key, vars);
}

// Locale à passer à toLocaleDateString / Intl.DateTimeFormat
export function dateLocale() {
  return currentLang === "mg" ? "mg-MG" : "fr-FR";
}
