import { useEffect, useMemo, useState } from "react";
import { LangContext } from "../context/LangContext";

const STORAGE_KEY = "kalonny-lang";
const DEFAULT_LANG = "fr";
const SUPPORTED_LANGS = ["fr", "mg"];

/**
 * Dictionnaire de traductions minimal. Complétez-le au fur et à mesure :
 * chaque clé renvoie un objet { fr, mg }. Les composants qui ont besoin de
 * traduire un texte utilisent `t("cle")` fourni par useLang().
 *
 * Exemple d'ajout :
 *   subscribe: { fr: "S'abonner", mg: "Misoratra anarana" },
 */
const TRANSLATIONS = {
  login: { fr: "Se connecter", mg: "Hiditra" },
  signup: { fr: "Commencer", mg: "Manomboka" },
  logout: { fr: "Déconnexion", mg: "Hivoaka" },
  mySpace: { fr: "Mon espace", mg: "Ny sehatro" },
  profile: { fr: "Profil", mg: "Mombamomba ahy" },
  settings: { fr: "Paramètres", mg: "Kirakira" },
};

function getInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    // Permet de cibler la langue en CSS (:lang()) et d'aider les lecteurs d'écran
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (code) => {
    if (SUPPORTED_LANGS.includes(code)) setLangState(code);
  };

  const t = (key) => TRANSLATIONS[key]?.[lang] ?? TRANSLATIONS[key]?.[DEFAULT_LANG] ?? key;

  const value = useMemo(
    () => ({ lang, setLang, t, supportedLangs: SUPPORTED_LANGS }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
