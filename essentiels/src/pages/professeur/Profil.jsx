import { useState } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiOutlineCamera,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import SettingsSection from "../../components/SettingsSection";
import FormField from "../../components/FormField";
import { useAuth } from "../../app/hooks/useAuth";

export default function ProfProfil() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const initials = user ? `${user.firstname?.[0] || ""}${user.name?.[0] || ""}`.toUpperCase() : "?";

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-4xl space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Mon compte</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Mon profil</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Ces informations sont visibles par tes élèves sur ta fiche professeur.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={60}>
          <SettingsSection icon={HiOutlineUserCircle} title="Photo de profil" description="Une photo claire aide les élèves à te reconnaître.">
            <div className="flex items-center gap-4 py-5">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-coral/10 font-display text-lg text-coral-dark">
                {initials}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40"
                >
                  <HiOutlineCamera size={16} />
                  Changer la photo
                </button>
                <button type="button" className="font-body text-xs font-medium text-ink-soft transition-colors hover:text-brick">
                  Supprimer la photo
                </button>
              </div>
            </div>
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <SettingsSection icon={HiOutlineLockClosed} title="Sécurité" description="Modifie le mot de passe de ton compte.">
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <FormField label="Nouveau mot de passe" type="password" placeholder="••••••••" />
              <FormField label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={140}>
        <SettingsSection icon={HiOutlineIdentification} title="Informations personnelles" description="Ton identité et ta présentation publique.">
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <FormField label="Prénom" defaultValue={user?.firstname} placeholder="Prénom" />
            <FormField label="Nom" defaultValue={user?.name} placeholder="Nom" />
            <FormField label="E-mail" type="email" defaultValue={user?.email} placeholder="email@exemple.com" />
            <FormField label="Téléphone" type="tel" placeholder="034 00 000 00" />
            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">Présentation publique</span>
                <textarea
                  rows={4}
                  placeholder="Quelques lignes sur ton parcours et ta pédagogie…"
                  className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
                />
              </label>
            </div>
          </div>
        </SettingsSection>
      </AnimatedSection>

      <AnimatedSection delay={180}>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saved ? "Profil enregistré" : "Enregistrer les modifications"}
        </button>
      </AnimatedSection>
    </div>
  );
}
