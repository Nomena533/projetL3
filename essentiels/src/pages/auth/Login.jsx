import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { login } from "../../app/api/authApi";
import { useAuth } from "../../app/hooks/useAuth";


export default function Login() {
  const {setUser} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email : "",
    password : "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(form);

      console.log("Réponse.data : ", response.data);

      // Laravel renvoie le token Sanctum
      // const token = response.data.token;
      const {token,user} = response.data;

      // Sauvegarde le token pour les prochaines requêtes API
      localStorage.setItem("token", token);

      // const user = response.data.user;

      // Sauvegarde les information de l'user, JSON.stringify transforme l'objet user en text pour pouvoir le stocker
      localStorage.setItem("user", JSON.stringify(user))

      console.log("Connexion réussi : ", response.data);
      
      setUser(user);
      
      // Récupération du rôle
      const role = user.role;

      console.log(role);
      // Redirection selon role
      if (role === "eleve") {
        navigate("/eleve")
      } else if (role === "professeur") {
        navigate("/professeur")
      } else {
        navigate("/administrateur")
      }

      // const roleRoutes = {
      //   eleve:"/eleve",
      //   prefesseur:"/professeur",
      //   admin:"/administrateur"
      // }

      // const route = roleRoutes[role];

      // navigate(route || "/unauthorized");
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error.response?.data);
    }

  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ivory px-5 py-10 font-body sm:px-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-light/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-coral-light/30 blur-3xl"
        aria-hidden="true"
      />

      <Link
        to="/"
        className="absolute left-5 top-6 z-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-coral-dark sm:left-8 sm:top-8"
      >
        <HiOutlineArrowLeft size={13} /> Retour au site
      </Link>

      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-4xl shadow-2xl shadow-brick/20 md:grid md:grid-cols-2">
        {/* ---------- PANNEAU ÉDITORIAL ---------- */}
        <AnimatedSection className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-brick via-coral to-amber p-1 md:flex">
          <div className="flex h-full flex-col justify-between rounded-[1.85rem] bg-ink/90 p-10">
            <div>
              <span className="font-display text-lg font-semibold text-ivory">
                Kalon'ny
              </span>
              <p className="mt-10 font-display text-2xl italic leading-snug text-ivory">
                « Chaque corde tressée
                <br />
                est une leçon apprise. »
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-ivory/60">
                Apprends un instrument avec de vrais professeurs, à ton rythme,
                où que tu sois à Madagascar.
              </p>
            </div>

            <div>
              <ValihaMotif count={24} tone="amber" className="h-20" />
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-ink bg-linear-to-br from-coral to-amber"
                    />
                  ))}
                </div>
                <div>
                  <p className="flex items-center gap-1 font-body text-sm font-semibold text-ivory">
                    4.8 <HiStar className="text-amber" size={13} />
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ivory/50">
                    +1 000 élèves nous font confiance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ---------- FORMULAIRE ---------- */}
        <AnimatedSection delay={100} className="bg-white/90 p-8 sm:p-10">
          <div className="mb-8 flex gap-6 border-b border-ivory-dark">
            <NavLink
              to={"/connexionCompte"}
              className={({ isActive }) =>
                `relative pb-3 font-body text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                }`
              }
            >
              Se connecter
              <span
                className={({ isActive }) =>
                  `absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-coral transition-all duration-300 ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`
                }
              />
            </NavLink>
                
            <NavLink
              to={"/inscriptionCompte"}
              className={({ isActive }) =>
                `relative pb-3 font-body text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                }`
              }
            >
              Créer un compte
              <span
                className={({ isActive }) =>
                  `absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-coral transition-all duration-300 ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`
                }
              />
            </NavLink>
          </div>

          <form onSubmit={handleSubmit} key={"login"} className="animate-fade-in">
            <FormField
              label="Adresse e-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="fara.rakoto@mail.mg"
              icon={HiOutlineEnvelope}
              required
              className="mb-4"
            />

            <FormField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={HiOutlineLockClosed}
              required
              className="mb-2"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="shrink-0 text-ink-soft transition-colors hover:text-ink"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash size={16} />
                  ) : (
                    <HiOutlineEye size={16} />
                  )}
                </button>
              }
            />

            <div className="mb-2 text-right">
            <button
                type="button"
                className="font-body text-xs font-medium text-coral-dark transition-colors hover:text-brick"
            >
                Mot de passe oublié ?
            </button>
            </div>

            <button
              type="submit"
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-coral py-3.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:pointer-events-none disabled:opacity-70"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center font-body text-xs text-ink-soft">
            En continuant, tu acceptes les{" "}
            <button className="font-semibold text-coral-dark hover:text-brick">
              conditions d'utilisation
            </button>{" "}
            de la plateforme.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}