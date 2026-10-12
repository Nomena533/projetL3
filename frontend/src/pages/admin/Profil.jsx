import AnimatedSection from "../../components/AnimatedSection";
import ProfileAccountForm from "../../components/ProfileAccountForm";

// L'administrateur utilise le même flux sécurisé de mise à jour des informations de compte.
export default function AdminProfil() {
  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Mon compte</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Mon profil</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">Informations de ton compte administrateur.</p>
      </AnimatedSection>
      <ProfileAccountForm
        description="Ton identité et tes coordonnées de compte."
        roleLabel="Administrateur"
      />
    </div>
  );
}
