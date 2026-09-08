import { useState } from "react";
import {
  HiOutlineMoon,
  HiOutlineLanguage,
  HiOutlineCreditCard,
  HiOutlineBellAlert,
  HiOutlineWrenchScrewdriver,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Toggle from "../../components/Toggle";

const LANGUES = [
  { id: "fr", label: "Français" },
  { id: "mg", label: "Malagasy" },
];

const MOYENS_PAIEMENT = [
  { id: "mvola", label: "Mvola", description: "Paiement mobile Telma" },
  { id: "orange_money", label: "Orange Money", description: "Paiement mobile Orange" },
  { id: "airtel_money", label: "Airtel Money", description: "Paiement mobile Airtel" },
  { id: "carte", label: "Carte bancaire", description: "Visa, Mastercard" },
];

function SettingsSection({ icon: Icon, title, description, delay = 0, children }) {
  return (
    <AnimatedSection delay={delay} className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/10 text-coral-dark">
          <Icon size={18} />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
          {description && <p className="mt-0.5 font-body text-sm text-ink-soft">{description}</p>}
        </div>
      </div>
      <div className="mt-4 divide-y divide-ivory-dark border-t border-ivory-dark">{children}</div>
    </AnimatedSection>
  );
}

export default function AdminParametres() {
  const [darkMode, setDarkMode] = useState(false);
  const [langue, setLangue] = useState("fr");
  const [paiements, setPaiements] = useState({ mvola: true, orange_money: true, airtel_money: true, carte: false });
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  function togglePaiement(id) {
    setPaiements({ ...paiements, [id]: !paiements[id] });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-4xl space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Administration</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Paramètres du site</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Ces réglages s'appliquent à l'ensemble de la plateforme, pour tous les rôles.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------- APPARENCE ---------- */}
        <SettingsSection icon={HiOutlineMoon} title="Apparence" description="Thème affiché par défaut aux nouveaux visiteurs." delay={60}>
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Mode sombre par défaut"
            description="Les utilisateurs pourront toujours basculer manuellement depuis leur espace."
          />
        </SettingsSection>

        {/* ---------- LANGUE ---------- */}
        <SettingsSection icon={HiOutlineLanguage} title="Langue" description="Langue affichée par défaut sur le site public." delay={100}>
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
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ---------- PAIEMENTS ---------- */}
        <SettingsSection icon={HiOutlineCreditCard} title="Moyens de paiement" description="Activez ou désactivez les modes de paiement proposés aux élèves." delay={140}>
          {MOYENS_PAIEMENT.map((m) => (
            <Toggle key={m.id} checked={paiements[m.id]} onChange={() => togglePaiement(m.id)} label={m.label} description={m.description} />
          ))}
        </SettingsSection>

        {/* ---------- NOTIFICATIONS ---------- */}
        <SettingsSection icon={HiOutlineBellAlert} title="Notifications" description="Notifications envoyées automatiquement par la plateforme." delay={180}>
          <Toggle checked={notifEmail} onChange={setNotifEmail} label="Notifications par e-mail" description="Rappels de cours, messages, paiements." />
          <Toggle checked={notifPush} onChange={setNotifPush} label="Notifications dans l'application" description="Cloche de notification pour élèves et professeurs." />
        </SettingsSection>
      </div>

      {/* ---------- MAINTENANCE ---------- */}
      <SettingsSection icon={HiOutlineWrenchScrewdriver} title="Maintenance" description="Rend le site public inaccessible aux visiteurs le temps d'une intervention." delay={220}>
        <Toggle
          checked={maintenance}
          onChange={setMaintenance}
          label="Mode maintenance"
          description="Seuls les administrateurs pourront se connecter tant que le mode est actif."
        />
      </SettingsSection>

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
