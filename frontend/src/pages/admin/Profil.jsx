import AnimatedSection from "../../components/AnimatedSection";
import ProfileAccountForm from "../../components/ProfileAccountForm";
import { useLang } from "../../app/hooks/useLang";

// L'administrateur utilise le même flux sécurisé de mise à jour des informations de compte.
export default function AdminProfil() {
  const { t } = useLang();
  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Mon compte")}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Mon profil")}</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">{t("Informations de ton compte administrateur.")}</p>
      </AnimatedSection>
      <ProfileAccountForm
        description={t("Ton identité et tes coordonnées de compte.")}
        roleLabel={t("Administrateur")}
      />
    </div>
  );
}
