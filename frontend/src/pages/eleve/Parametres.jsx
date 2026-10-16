import { useState } from "react";
import {
  HiOutlineMoon,
  HiOutlineLanguage,
  HiOutlineBellAlert,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import SettingsSection from "../../components/SettingsSection";
import Toggle from "../../components/Toggle";
import ProfilLinkCard from "../../components/ProfilLinkCard";
import { useLang } from "../../app/hooks/useLang";

const LANGUES = [
  { id: "fr", label: "Français" },
  { id: "mg", label: "Malagasy" },
];

export default function Parametres() {
  const { t, lang: langue, setLang: setLangue } = useLang();
  const [darkMode, setDarkMode] = useState(false);
  const [notifCours, setNotifCours] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Mon compte")}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Paramètres")}</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">{t("Personnalise ton expérience d'apprentissage sur Kalon'ny.")}</p>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={60}>
          <SettingsSection icon={HiOutlineMoon} title={t("Apparence")} description={t("Choisis comment la plateforme s'affiche pour toi.")}>
            <Toggle
              checked={darkMode}
              onChange={setDarkMode}
              label={t("Mode sombre")}
              description={t("Bascule l'interface vers un thème sombre.")}
            />
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <SettingsSection icon={HiOutlineLanguage} title={t("Langue")} description={t("Langue utilisée dans ton espace élève.")}>
            <div className="flex gap-2 py-4">
              {LANGUES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLangue(l.id)}
                  className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-all duration-300 ${
                    langue === l.id ? "bg-coral text-ivory shadow-md shadow-coral/25" : "border border-ivory-dark text-ink-soft hover:border-coral/40"
                  }`}
                >
                  {t(l.label)}
                </button>
              ))}
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={140}>
          <SettingsSection icon={HiOutlineBellAlert} title={t("Notifications")} description={t("Choisis ce qui te tient informé.")}>
            <Toggle checked={notifCours} onChange={setNotifCours} label={t("Rappels de cours")} description={t("Nouvelles leçons disponibles, échéances.")} />
            <Toggle checked={notifMessages} onChange={setNotifMessages} label={t("Nouveaux messages")} description={t("Réponses de tes professeurs.")} />
            <Toggle checked={notifEmail} onChange={setNotifEmail} label={t("Résumé hebdomadaire par e-mail")} description={t("Ta progression de la semaine.")} />
          </SettingsSection>
        </AnimatedSection>

        <ProfilLinkCard to="/eleve/profil" delay={180} />
      </div>

      <AnimatedSection delay={220} className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saved ? t("Paramètres enregistrés") : t("Enregistrer les paramètres")}
        </button>
      </AnimatedSection>
    </div>
  );
}
