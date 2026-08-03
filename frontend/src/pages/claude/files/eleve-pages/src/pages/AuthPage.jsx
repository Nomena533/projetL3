import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music, LogIn, UserPlus, Mail, Lock } from "../lib/icons";
import ValihaStrings from "../components/ValihaStrings";
import Field from "../components/Field";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teal-950 font-body flex items-center justify-center px-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-stone-50 rounded-sm overflow-hidden shadow-2xl">
        <div className="hidden md:flex flex-col justify-between bg-teal-950 p-10 relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2 text-amber-400">
              <Music size={22} />
              <span className="font-display text-lg text-stone-50">Kalon'ny</span>
            </div>
            <p className="font-display italic text-2xl text-stone-100 mt-10 leading-snug">
              Chaque corde tressée
              <br />
              est une leçon apprise.
            </p>
            <p className="font-body text-sm text-stone-400 mt-4">
              Apprends un instrument avec de vrais professeurs, à ton rythme, où que tu sois à Madagascar.
            </p>
          </div>
          <ValihaStrings className="h-24" count={22} tone="amber" />
        </div>

        <div className="p-10">
          <div className="flex gap-6 border-b border-stone-200 mb-8">
            <button onClick={() => setMode("login")} className={`pb-3 text-sm font-medium font-body ${mode === "login" ? "text-teal-950 border-b-2 border-amber-600" : "text-stone-400"}`}>
              Se connecter
            </button>
            <button onClick={() => setMode("signup")} className={`pb-3 text-sm font-medium font-body ${mode === "signup" ? "text-teal-950 border-b-2 border-amber-600" : "text-stone-400"}`}>
              Créer un compte
            </button>
          </div>

          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Field label="Nom" placeholder="Rakoto" />
              <Field label="Prénom" placeholder="Fara" />
            </div>
          )}
          <Field label="Adresse e-mail" placeholder="fara.rakoto@mail.mg" icon={Mail} />
          <Field label="Mot de passe" placeholder="••••••••" icon={Lock} type="password" />

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-body font-medium text-sm py-3 rounded-sm flex items-center justify-center gap-2 transition-colors"
          >
            {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>

          <p className="text-xs text-stone-400 font-body mt-6 text-center">
            En continuant, tu acceptes les conditions d'utilisation de la plateforme.
          </p>
        </div>
      </div>
    </div>
  );
}
