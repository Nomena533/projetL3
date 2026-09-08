import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserPlus,
  HiOutlineAcademicCap,
  HiOutlineMusicalNote,
} from "react-icons/hi2";
import { HiStar } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import FormField from "../../components/FormField";

const ROLES = [
  { id: "eleve", label: "Élève", icon: HiOutlineAcademicCap },
  { id: "professeur", label: "Professeur", icon: HiOutlineMusicalNote },
];

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [role, setRole] = useState("eleve");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Le back-end Laravel n'est pas encore connecté : on simule la requête,
    // puis on redirige vers l'espace correspondant au rôle choisi.
    setTimeout(() => {
      setLoading(false);
      navigate(mode === "login" || role === "eleve" ? "/eleve/dashboard" : "/professeur/dashboard");
    }, 700);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-ivory px-5 py-10 font-body sm:px-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-light/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-coral-light/30 blur-3xl" aria-hidden="true" />

      <Link
        to="/"
        className="relative z-10 mb-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineArrowLeft size={13} /> Retour au site
      </Link>

      <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-4xl shadow-2xl shadow-brick/20 md:grid-cols-2">
        {/* ---------- PANNEAU ÉDITORIAL ---------- */}
        <AnimatedSection className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-brick via-coral to-amber p-1 md:flex">
          <div className="flex h-full flex-col justify-between rounded-[1.85rem] bg-ink/90 p-10">
            <div>
              <span className="font-display text-lg font-semibold text-ivory">Kalon'ny</span>
              <p className="mt-10 font-display text-2xl italic leading-snug text-ivory">
                « Chaque corde tressée
                <br />
                est une leçon apprise. »
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-ivory/60">
                Apprends un instrument avec de vrais professeurs, à ton rythme, où que tu sois à Madagascar.
              </p>
            </div>

            <div>
              <ValihaMotif count={24} tone="amber" className="h-20" />
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-8 w-8 rounded-full border-2 border-ink bg-linear-to-br from-coral to-amber" />
                  ))}
                </div>
                <div>
                  <p className="flex items-center gap-1 font-body text-sm font-semibold text-ivory">
                    4.8 <HiStar className="text-amber" size={13} />
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ivory/50">+1 000 élèves nous font confiance</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ---------- FORMULAIRE ---------- */}
        <AnimatedSection delay={100} className="bg-white/90 p-8 sm:p-10">
          <div className="mb-8 flex gap-6 border-b border-ivory-dark">
            {[
              ["login", "Se connecter"],
              ["signup", "Créer un compte"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`relative pb-3 font-body text-sm font-semibold transition-colors duration-300 ${
                  mode === id ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-coral transition-all duration-300 ${
                    mode === id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} key={mode} className="animate-fade-in">
            {mode === "signup" && (
              <>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <FormField label="Nom" placeholder="Rakoto" required />
                  <FormField label="Prénom" placeholder="Fara" required />
                </div>

                <div className="mb-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wide text-ink-soft">Je m'inscris en tant que</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((r) => (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-body text-sm font-semibold transition-all duration-300 ${
                          role === r.id
                            ? "border-coral bg-coral/10 text-coral-dark"
                            : "border-ivory-dark text-ink-soft hover:border-coral/40"
                        }`}
                      >
                        <r.icon size={16} /> {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <FormField label="Adresse e-mail" type="email" placeholder="fara.rakoto@mail.mg" icon={HiOutlineEnvelope} required className="mb-4" />

            <FormField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={HiOutlineLockClosed}
              required
              className="mb-2"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="shrink-0 text-ink-soft transition-colors hover:text-ink"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <HiOutlineEyeSlash size={16} /> : <HiOutlineEye size={16} />}
                </button>
              }
            />

            {mode === "login" && (
              <div className="mb-2 text-right">
                <button type="button" className="font-body text-xs font-medium text-coral-dark transition-colors hover:text-brick">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-coral py-3.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:pointer-events-none disabled:opacity-70"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
              ) : mode === "login" ? (
                <HiOutlineArrowRightOnRectangle size={16} />
              ) : (
                <HiOutlineUserPlus size={16} />
              )}
              {loading ? "Un instant…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-xs text-ink-soft">
            En continuant, tu acceptes les{" "}
            <button className="font-semibold text-coral-dark hover:text-brick">conditions d'utilisation</button> de la plateforme.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
