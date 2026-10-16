import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr from "./locales/fr.json";
import mg from "./locales/mg.json";
import en from "./locales/en.json";

// Langues et traductions disponibles
const resources = {
  fr: { translation: fr },
  mg: { translation: mg },
  en: { translation: en }
};

// Initialisation du système de traduction
i18n.use(initReactI18next).init({
  resources,

  // Langue par défaut
  lng: localStorage.getItem("langue") || "fr",

  // Langue de secours
  fallbackLng: "fr",

  // Évite de traiter les clés de traduction comme des chaînes de caractères
  // avec des espaces ajoutés automatiquement
  interpolation: {
    escapeValue: false
  }
});

export default i18n;