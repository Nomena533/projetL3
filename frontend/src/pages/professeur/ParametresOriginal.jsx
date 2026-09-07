import { useState } from "react";
import {
  HiOutlineMoon,
  HiOutlineLanguage,
  HiOutlineBellAlert,
  HiOutlineLockClosed,
  HiOutlineBanknotes,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import SettingsSection from "../../components/SettingsSection";
import Toggle from "../../components/Toggle";
import FormField from "../../components/FormField";

const LANGUES = [
  { id: "fr", label: "Français" },
  { id: "mg", label: "Malagasy" },
];

const MODES_RECEPTION = ["Mvola", "Orange Money", "Airtel Money", "Virement bancaire"];

function SelectField({ label, defaultValue, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</span>
      <select
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function ProfParametres() {
  const [darkMode, setDarkMode] = useState(false);
  const [langue, setLangue] = useState("fr");
  const [notifSoumissions, setNotifSoumissions] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-4xl space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Mon compte</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Paramètres</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">Personnalise ton espace professeur sur Kalon'ny.</p>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={60}>
          <SettingsSection icon={HiOutlineMoon} title="Apparence" description="Choisis comment la plateforme s'affiche pour toi.">
            <Toggle checked={darkMode} onChange={setDarkMode} label="Mode sombre" description="Bascule l'interface vers un thème sombre." />
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <SettingsSection icon={HiOutlineLanguage} title="Langue" description="Langue utilisée dans ton espace professeur.">
            <div className="flex gap-2 py-4">
              {LANGUES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLangue(l.id)}
                  className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-all duration-300 ${
                    langue === l.id ? "bg-coral text-ivory shadow-md shadow-coral/25" : "border border-ivory-dark text-ink-soft hover:border-coral/40"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={140}>
        <SettingsSection icon={HiOutlineBellAlert} title="Notifications" description="Choisis ce qui te tient informé.">
          <Toggle checked={notifSoumissions} onChange={setNotifSoumissions} label="Nouvelles soumissions" description="Un élève a envoyé un exercice à corriger." />
          <Toggle checked={notifMessages} onChange={setNotifMessages} label="Nouveaux messages" description="Questions de tes élèves." />
          <Toggle checked={notifEmail} onChange={setNotifEmail} label="Résumé hebdomadaire par e-mail" description="Inscriptions, revenus, avis reçus." />
        </SettingsSection>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={180}>
          <SettingsSection icon={HiOutlineBanknotes} title="Coordonnées de paiement" description="Moyen utilisé pour recevoir tes revenus de cours.">
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <SelectField label="Moyen de réception" defaultValue={MODES_RECEPTION[0]} options={MODES_RECEPTION} />
              <FormField label="Numéro / IBAN" placeholder="034 00 000 00" />
            </div>
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={220}>
          <SettingsSection icon={HiOutlineLockClosed} title="Sécurité" description="Modifie le mot de passe de ton compte.">
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <FormField label="Nouveau mot de passe" type="password" placeholder="••••••••" />
              <FormField label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={260}>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saved ? "Paramètres enregistrés" : "Enregistrer les paramètres"}
        </button>
      </AnimatedSection>
    </div>
  );
}
