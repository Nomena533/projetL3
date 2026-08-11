import { useState } from "react";
import {
  HiOutlineMoon,
  HiOutlineLanguage,
  HiOutlineBellAlert,
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import SettingsSection from "../../components/SettingsSection";
import Toggle from "../../components/Toggle";
import FormField from "../../components/FormField";
import Modal from "../../components/Modal";

const LANGUES = [
  { id: "fr", label: "Français" },
  { id: "mg", label: "Malagasy" },
];

export default function Parametres() {
  const [darkMode, setDarkMode] = useState(false);
  const [langue, setLangue] = useState("fr");
  const [notifCours, setNotifCours] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Mon compte</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Paramètres</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Personnalise ton expérience d'apprentissage sur Kalon'ny.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={60}>
        <SettingsSection icon={HiOutlineMoon} title="Apparence" description="Choisis comment la plateforme s'affiche pour toi.">
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Mode sombre"
            description="Bascule l'interface vers un thème sombre."
          />
        </SettingsSection>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <SettingsSection icon={HiOutlineLanguage} title="Langue" description="Langue utilisée dans ton espace élève.">
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

      <AnimatedSection delay={140}>
        <SettingsSection icon={HiOutlineBellAlert} title="Notifications" description="Choisis ce qui te tient informé.">
          <Toggle checked={notifCours} onChange={setNotifCours} label="Rappels de cours" description="Nouvelles leçons disponibles, échéances." />
          <Toggle checked={notifMessages} onChange={setNotifMessages} label="Nouveaux messages" description="Réponses de tes professeurs." />
          <Toggle checked={notifEmail} onChange={setNotifEmail} label="Résumé hebdomadaire par e-mail" description="Ta progression de la semaine." />
        </SettingsSection>
      </AnimatedSection>

      <AnimatedSection delay={180}>
        <SettingsSection icon={HiOutlineLockClosed} title="Sécurité" description="Modifie le mot de passe de ton compte.">
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <FormField label="Nouveau mot de passe" type="password" placeholder="••••••••" />
            <FormField label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
          </div>
        </SettingsSection>
      </AnimatedSection>

      <AnimatedSection delay={220} className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saved ? "Paramètres enregistrés" : "Enregistrer les paramètres"}
        </button>
        <button
          onClick={() => setDeleteOpen(true)}
          className="font-body text-sm font-semibold text-brick/80 transition-colors hover:text-brick"
        >
          Supprimer mon compte
        </button>
      </AnimatedSection>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Supprimer ton compte ?">
        <p className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-ink-soft">
          <HiOutlineExclamationTriangle size={18} className="mt-0.5 shrink-0 text-brick" />
          Ton profil, ta progression et tes certificats seront définitivement supprimés. Cette action est
          irréversible.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setDeleteOpen(false)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => setDeleteOpen(false)}
            className="flex-1 rounded-full bg-brick py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-brick/25 transition-all duration-300 hover:bg-brick-light"
          >
            Supprimer définitivement
          </button>
        </div>
      </Modal>
    </div>
  );
}
