import React, { useState } from "react";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Music,
  Menu,
  X,
  Search,
  LogOut,
  Mail,
  Settings,
  User,
} from "../lib/icons";
import ValihaStrings from "../components/ValihaStrings";
import { NAV } from "../lib/mockStudentData";
import { useAuth } from "../app/hooks/useAuth";
import { LogoBlanc } from "../components/Logo";
import UserMenu from "../components/UserMenu";
import IconLinkBadge from "../components/IconLinkBadge";
import NotificationBell from "../components/NotificationBell";
import useUnreadCounts from "../app/hooks/useUnreadCounts";
import { useNotification } from "../app/hooks/useNotification";
import {
  markAllNotificationAsRead,
  markNotificationAsRead,
} from "../app/api/notificationApi";

export default function LayoutStudent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const current = NAV.find((n) =>
    n.end ? location.pathname === n.path : location.pathname.startsWith(n.path),
  );

  // Récupération de l'user + fonction de déconnexion depuis le context global
  const { user, logout } = useAuth();
  console.log("userLayout : ", user);
  const handleLogout = async () => {
    await logout();
    // pas nécessaire, redirection déja faite par components/RoleRoute.jsx
    // navigate("/");
  };

  const { unreadMessages } = useUnreadCounts();

  const { unreadNotification, unreadCount, fetchNotification } =
    useNotification();
  console.log("unreadNotification : ", unreadNotification);

  const handleMarkAsRead = async (id) => {
    console.log("id : ", id);
    // return;
    try {
      await markNotificationAsRead(id);
      await fetchNotification();
    } catch (error) {
      console.error("Erreur lors de MAJ read_at", error.response?.data);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllNotificationAsRead();
      await fetchNotification();
    } catch (error) {
      console.error("Erreur lors de MAJ read_at", error.response?.data);
    }
  };
  const initials = user
    ? `${user.firstname?.[0] || ""}${user.name?.[0] || ""}`.toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-ivory font-body flex">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 h-screen w-64 overflow-y-auto bg-teal-950 dark:bg-ivory-dark text-stone-200 flex flex-col transform transition-transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-6 py-6 flex items-center justify-center gap-2 border-b border-teal-900">
          <LogoBlanc />
          <button
            className="ml-auto md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                  isActive
                    ? "bg-teal-900 text-amber-400"
                    : "text-stone-300 hover:bg-teal-900/60"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-teal-900 space-y-4">
          <ValihaStrings className="h-10" count={18} tone="teal" />

          {/* Utilisateur connecté */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-amber-200 flex items-center justify-center font-display text-teal-950 text-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-stone-100 truncate">
                {user?.firstname} {user?.name}
              </p>
              <p className="text-xs text-stone-400 truncate">
                {user?.email || "Compte élève vérifié"}
              </p>
            </div>
          </div>

          {/* Déconnexion */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-stone-300 hover:bg-teal-900/60 hover:text-amber-400 transition-colors"
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <header className="bg-stone-50 dark:bg-ivory-dark/90 border-b border-stone-200 dark:border-ivory-dark/20 px-4 md:px-8 py-4 flex items-center gap-4">
          <button
            className="md:hidden text-teal-950"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h1 className="font-display text-xl text-teal-950 dark:text-ink">
            {current?.label || "Kalon'ny"}
          </h1>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-stone-100 dark rounded-sm px-3 py-1.5 text-sm text-stone-500">
              <Search size={14} /> Rechercher…
            </div>
            <IconLinkBadge
              to="/eleve/messages"
              icon={Mail}
              count={unreadMessages}
              label="Messages"
            />
            <NotificationBell
              count={unreadCount}
              items={unreadNotification}
              markAll={handleMarkAll}
              markAsRead={(id) => handleMarkAsRead(id)}
            />
            <UserMenu
              initials={initials}
              displayName={
                `${user?.firstname || ""} ${user?.name || ""}`.trim() ||
                (role === "prof" ? "Professeur" : "Administrateur")
              }
              subLabel={
                user?.email ||
                (role === "prof"
                  ? "Compte professeur vérifié"
                  : "Accès administrateur")
              }
              items={[
                { to: "/eleve/profil", label: "Profil", icon: User },
                {
                  to: "/eleve/parametres",
                  label: "Paramètres",
                  icon: Settings,
                },
              ]}
              onLogout={handleLogout}
            />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
