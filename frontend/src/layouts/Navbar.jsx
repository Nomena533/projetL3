import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LogoVert } from "../components/Logo";
import { useAuth } from "../app/hooks/useAuth";
import { LogOut, Sun, Moon, Grid, Settings, User } from "../lib/icons";
import UserMenu from "../components/UserMenu";
import LanguageMenu from "../components/LanguageMenu";
import useDarkMode from "../app/hooks/useDarkMode";

// Fait correspondre le rôle de l'utilisateur connecté à la base des routes
// de son espace privé. ⚠️ À vérifier : les valeurs exactes renvoyées par
// useAuth().user.role dans votre implémentation (ici on suppose
// "eleve" / "professeur" / "admin").
const SPACE_BASE_PATH = {
  eleve: "/eleve",
  professeur: "/professeur",
  admin: "/administrateur",
};

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/formation", label: "Formation" },
  { to: "/professeurs", label: "Professeurs" },
  // { to: "/tarifs", label: "Tarifs" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de route
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const { user, logout } = useAuth();
  const [isDark, toggleDark] = useDarkMode();

  const handleLogout = async () => {
    await logout();
    navigate("/connexionCompte");
  };

  const initials = user
    ? `${user.firstname?.[0] || ""}${user.name?.[0] || ""}`.toUpperCase()
    : "?";

  const spaceBase = user ? SPACE_BASE_PATH[user.role] || "/eleve" : "/eleve";
  const userMenuItems = [
    { to: spaceBase, label: "Mon espace", icon: Grid },
    { to: `${spaceBase}/profil`, label: "Profil", icon: User },
    { to: `${spaceBase}/parametres`, label: "Paramètres", icon: Settings },
  ];

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 font-body text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-coral-dark" : "text-ink-soft hover:text-ink"
    } after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-coral after:rounded-full after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-ivory-dark)]"
          : "bg-ivory/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <LogoVert />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Navigation principale"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={linkClass}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <LanguageMenu />

          <button
            type="button"
            onClick={toggleDark}
            title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ivory-dark"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {user ? (
            <UserMenu
              initials={initials}
              displayName={`${user?.firstname || ""} ${user?.name || ""}`.trim()}
              subLabel={user?.email}
              items={userMenuItems}
              onLogout={handleLogout}
            />
          ) : (
            <div className="hidden items-center gap-3 lg:flex">
              <NavLink
                to="/connexionCompte"
                className="font-body text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Se connecter
              </NavLink>
              <NavLink
                to="/inscriptionCompte"
                className="rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/30"
              >
                Commencer
              </NavLink>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ivory-dark lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav
            className="flex flex-col gap-1 border-t border-ivory-dark bg-ivory px-5 pb-5 pt-3"
            aria-label="Navigation mobile"
          >
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 font-body text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-coral/10 text-coral-dark"
                      : "text-ink-soft hover:bg-ivory-dark"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-ivory-dark pt-3">
                {userMenuItems.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-body text-sm font-medium text-ink-soft hover:bg-ivory-dark"
                  >
                    <Icon size={16} className="text-ink-soft/70" />
                    {label}
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left font-body text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2 border-t border-ivory-dark pt-3">
                <NavLink
                  to="/connexionCompte"
                  className="rounded-lg px-3 py-2.5 text-center font-body text-sm font-medium text-ink-soft hover:bg-ivory-dark"
                >
                  Se connecter
                </NavLink>
                <NavLink
                  to="/inscriptionCompte"
                  className="rounded-full bg-coral px-3 py-2.5 text-center font-body text-sm font-semibold text-ivory"
                >
                  Commencer
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
