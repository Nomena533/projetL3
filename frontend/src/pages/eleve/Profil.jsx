import { useState } from "react";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineCheckCircle } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";

export default function Profil() {
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-xl space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Mon profil</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Informations personnelles</h2>
      </AnimatedSection>

      <AnimatedSection delay={80} as="form" onSubmit={handleSave} className="rounded-2xl border border-ivory-dark bg-white/70 p-7">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-linear-to-br from-coral to-amber font-display text-xl font-semibold text-ivory">
            FR
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-ink">Fara Rakoto</p>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Élève depuis février 2026</p>
          </div>
        </div>

        <div className="mt-7 space-y-4">
          <FormField label="Nom complet" defaultValue="Fara Rakoto" />
          <FormField label="Adresse e-mail" defaultValue="fara.rakoto@mail.mg" icon={HiOutlineEnvelope} />
          <FormField label="Téléphone" defaultValue="+261 34 00 000 00" icon={HiOutlinePhone} />
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saved ? "Modifications enregistrées" : "Enregistrer les modifications"}
        </button>
      </AnimatedSection>
    </div>
  );
}
