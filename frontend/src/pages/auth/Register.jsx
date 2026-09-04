import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
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
import { register } from "../../app/api/authApi";
import { getRoles } from "../../app/api/roleApi";


const ROLES_ICONS = {
  professeur: HiOutlineMusicalNote,
  eleve: HiOutlineAcademicCap,
};

export default function Register() {
  // Liste des rôles récupérés depuis laravel
  const [roles, setRoles] = useState([]);

  // Le role séléctionné par l'user
  const [role, setRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Permet de rediriger l'utilisateur après une inscription réussi
  const navigate = useNavigate();

  // Données du formulaire
  const [Form, setForm] = useState({
    firstname: "",
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  // Récupération des roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Appel l'api http:://localhost:8000/api/getRoles
        const response = await getRoles();

        console.log("Response.data : ",response.data);

        // On adapte les données de Laravel
        // au format utilisé par notre interface.
        const formattedRoles = response.data.map((r) => ({
            id: r.id,
            label: r.name,
            icon: ROLES_ICONS[r.name]
        }));

        setRoles(formattedRoles);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles", error);
      }
    };

    fetchRoles();
  }, []);

  // Modification du formulaire
  const handleChange = (e) => {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };

    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setErrorMessage(null);

    if (!role) {
      alert("Veuillez sélectionner un rôle.");
      return;
    }
    try {
      const data = {
        ...Form,
        role_id : role
      }
      // Envoie des données à POST http:://localhost:8000/api/register
      const response = await register(data);

      console.log("Inscription réussie : ", response.data);

      // redirection après inscription
      navigate("/connexion");
    } catch (error) {
      const message = error.response?.data.errors;
      setErrorMessage({
        email : message.email,
        password : message.password
      });
      setError("Une erreur est survenue lors de l'inscription.");
      console.error("Erreur inscription : ", error.response?.data);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ivory px-5 py-10 font-body sm:px-8">
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
        className="relative z-10 mb-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineArrowLeft size={13} /> Retour au site
      </Link>

      <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-4xl shadow-2xl shadow-brick/20 md:grid-cols-2">
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
              to={"/connexion"}
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
              to={"/inscription"}
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

          <form
            onSubmit={handleSubmit}
            key={"register"}
            className="animate-fade-in"
          >
            <div className="mb-4 grid grid-cols-2 gap-3">
              <FormField
                label="Nom"
                placeholder="Rakoto"
                name="name"
                value={Form.name}
                onChange={handleChange}
                required
              />
              <FormField
                label="Prénom"
                placeholder="Fara"
                name="firstname"
                value={Form.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-5">
              <p className="mb-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
                Je m'inscris en tant que
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  // const Icon = ROLES_ICONS[r.name];

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

            <FormField
              label="Adresse e-mail"
              type="email"
              placeholder="fara.rakoto@mail.mg"
              name="email"
              value={Form.email}
              onChange={handleChange}
              icon={HiOutlineEnvelope}
              required
              className="mb-4"
            />

            <FormField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              value={Form.password}
              onChange={handleChange}
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

            {error && <p className="font-body text-sm text-brick">Erreur : {error}</p>}

            {errorMessage && (
              <div>
                <p className="font-body text-sm text-brick">Erreur : {errorMessage.email}</p>
                <p className="font-body text-sm text-brick">Erreur : {errorMessage.password}</p>
              </div>
            )}

            <button
              type="submit"
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-coral py-3.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:pointer-events-none disabled:opacity-70"
            >
                <HiOutlineUserPlus size={16} />
              Créer mon compte
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
