import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changerLangue = (langue) => {
    // Change la langue immédiatement
    i18n.changeLanguage(langue);

    // Mémorise le choix dans le navigateur
    localStorage.setItem("langue", langue);
  };

  return (
    <select
      value={i18n.resolvedLanguage?.split("-")[0] || "fr"}
      onChange={(e) => changerLangue(e.target.value)}
      aria-label="Choisir la langue"
    >
      <option value="fr">🇫🇷 Français</option>
      <option value="mg">🇲🇬 Malagasy</option>
      <option value="en">🇬🇧 English</option>
    </select>
  );
}