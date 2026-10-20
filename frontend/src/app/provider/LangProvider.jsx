import { useCallback, useEffect, useMemo, useState } from "react";
import { LangContext } from "../context/LangContext";
import { setRuntimeLang, translate } from "../../lib/i18nRuntime";

const STORAGE_KEY = "kalonny-lang";
const DEFAULT_LANG = "fr";
const SUPPORTED_LANGS = ["fr", "mg", "en"];

/**
 * Système de traduction :
 *  - la clé d'un texte EST le texte français (ex: t("Mon profil"))
 *  - les traductions malgaches sont dans src/locales/mg.json
 *  - un texte sans traduction (ou une donnée venant de l'API) s'affiche tel quel
 *  - variables : t("Bonjour {{prenom}}", { prenom })
 * Pour ajouter une langue : créer src/locales/<code>.json, l'enregistrer dans
 * DICTIONARIES (lib/i18nRuntime.js) et dans SUPPORTED_LANGS ci-dessous.
 */

function getInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  // Synchronisé pendant le rendu pour que tr() / dateLocale() soient à jour
  // dès le premier rendu des enfants.
  setRuntimeLang(lang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    // Permet de cibler la langue en CSS (:lang()) et d'aider les lecteurs d'écran
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    if (SUPPORTED_LANGS.includes(code)) setLangState(code);
  }, []);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, supportedLangs: SUPPORTED_LANGS }),
    [lang, setLang, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
