import React, { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { Music, Menu, X, Search } from "../lib/icons";
import ValihaStrings from "./ValihaStrings";
import { NAV } from "../lib/mockData";

export default function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const current = NAV.find((n) => (n.end ? location.pathname === n.path : location.pathname.startsWith(n.path)));

  return (
    <div className="min-h-screen bg-stone-100 font-body flex">
      {/* Sidebar */}
      <aside
        className={`
        fixed md:static z-30 inset-y-0 left-0 w-64 bg-teal-950 text-stone-200 flex flex-col
        transform transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
      >
        <div className="px-6 py-6 flex items-center gap-2 border-b border-teal-900">
          <Music size={20} className="text-amber-400" />
          <span className="font-display text-lg text-stone-50">Kalon'ny</span>
          <button className="ml-auto md:hidden" onClick={() => setMobileOpen(false)}>
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
                  isActive ? "bg-teal-900 text-amber-400" : "text-stone-300 hover:bg-teal-900/60"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-teal-900">
          <ValihaStrings className="h-10 mb-4" count={18} tone="teal" />
          <div className="flex items-center gap-2 text-xs text-stone-400">Compte élève vérifié</div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-stone-50 border-b border-stone-200 px-4 md:px-8 py-4 flex items-center gap-4">
          <button className="md:hidden text-teal-950" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="font-display text-xl text-teal-950">{current?.label || "Kalon'ny"}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-stone-100 rounded-sm px-3 py-1.5 text-sm text-stone-500">
              <Search size={14} /> Rechercher…
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center font-display text-teal-950 text-sm">FR</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
