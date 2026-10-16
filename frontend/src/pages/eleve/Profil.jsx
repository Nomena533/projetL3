import AnimatedSection from "../../components/AnimatedSection";
import ProfileAccountForm from "../../components/ProfileAccountForm";
import { useLang } from "../../app/hooks/useLang";

// L'élève réutilise la sauvegarde commune et peut aussi mettre à jour sa présentation personnelle.
export default function Profil() {
  const { t } = useLang();
  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Mon compte")}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Mon profil")}</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">{t("Gère tes informations personnelles et ta sécurité.")}</p>
      </AnimatedSection>
      <ProfileAccountForm
        description={t("Ton identité, tes coordonnées et ta présentation personnelle.")}
        showBio
      />
    </div>
  );
}
