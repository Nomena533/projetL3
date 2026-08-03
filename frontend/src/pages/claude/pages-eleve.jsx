import React, { useState } from "react";
import {
  Music, Search, Heart, MessageCircle, User, LayoutDashboard, Award,
  PlayCircle, Download, CheckCircle2, Star, Clock, ChevronRight, LogIn,
  UserPlus, Lock, Mail, BookOpen, FileText, Headphones, Video, Menu, X,
  TrendingUp, Send, Filter, ShieldCheck, ChevronLeft, GraduationCap
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fonts: Fraunces (display), Inter (body), IBM Plex Mono (utility)   */
/* ------------------------------------------------------------------ */
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

/* ------------------------------------------------------------------ */
/* Signature element: "cordes de valiha" — decorative string motif    */
/* referencing the valiha, Madagascar's iconic bamboo tube zither.    */
/* ------------------------------------------------------------------ */
const ValihaStrings = ({ className = "", count = 14, tone = "amber" }) => {
  const colors = {
    amber: "bg-amber-500/70",
    stone: "bg-stone-400/40",
    teal: "bg-teal-400/30",
  };
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const h = 40 + Math.round(30 * Math.abs(Math.sin(i * 1.3)));
        return (
          <div
            key={i}
            className={`w-[2px] ${colors[tone]} rounded-full`}
            style={{ height: `${h}%` }}
          />
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */
const COURSES = [
  { id: 1, titre: "Valiha — Les bases du tressage sonore", prof: "Rado Andrianasolo", instrument: "Valiha", niveau: "Débutant", prix: 45000, note: 4.8, avis: 62, duree: "6h20", img: "amber" },
  { id: 2, titre: "Piano classique, du solfège au clavier", prof: "Hery Rakoto", instrument: "Piano", niveau: "Débutant", prix: 60000, note: 4.6, avis: 118, duree: "9h05", img: "stone" },
  { id: 3, titre: "Guitare acoustique — chansons malgaches", prof: "Nirina Rasoanaivo", instrument: "Guitare", niveau: "Intermédiaire", prix: 52000, note: 4.9, avis: 84, duree: "7h40", img: "orange" },
  { id: 4, titre: "Violon — technique d'archet avancée", prof: "Solo Ramanantsoa", instrument: "Violon", niveau: "Avancé", prix: 70000, note: 4.7, avis: 39, duree: "10h15", img: "teal" },
  { id: 5, titre: "Kabosy — rythmes traditionnels du Sud", prof: "Tojo Randria", instrument: "Kabosy", niveau: "Débutant", prix: 38000, note: 4.5, avis: 27, duree: "5h10", img: "amber" },
  { id: 6, titre: "Chant lyrique — pose de voix", prof: "Voahangy Rasolofo", instrument: "Chant", niveau: "Intermédiaire", prix: 55000, note: 4.8, avis: 71, duree: "8h30", img: "stone" },
];

const LECONS = [
  { id: 1, titre: "Accorder son valiha", duree: "12 min", fait: true },
  { id: 2, titre: "Position des mains et posture", duree: "18 min", fait: true },
  { id: 3, titre: "Premiers arpèges", duree: "24 min", fait: true },
  { id: 4, titre: "Jouer une mélodie traditionnelle", duree: "30 min", fait: false },
  { id: 5, titre: "Improvisation guidée", duree: "22 min", fait: false },
];

const MESSAGES = [
  { id: 1, prof: "Rado Andrianasolo", extrait: "Bravo pour l'exercice 3, ta tenue de rythme s'améliore.", lu: false, heure: "09:14" },
  { id: 2, prof: "Nirina Rasoanaivo", extrait: "N'oublie pas d'envoyer ta vidéo avant vendredi.", lu: true, heure: "Hier" },
  { id: 3, prof: "Hery Rakoto", extrait: "Voici la partition corrigée en pièce jointe.", lu: true, heure: "Lun." },
];

const NAV = [
  { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { key: "catalogue", label: "Cours", icon: BookOpen },
  { key: "progression", label: "Progression & certificats", icon: Award },
  { key: "favoris", label: "Favoris", icon: Heart },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "profil", label: "Mon profil", icon: User },
];

const badge = { amber: "bg-amber-100 text-amber-800", stone: "bg-stone-200 text-stone-700", orange: "bg-orange-100 text-orange-800", teal: "bg-teal-100 text-teal-800" };
const swatch = { amber: "bg-amber-200", stone: "bg-stone-300", orange: "bg-orange-200", teal: "bg-teal-200" };

/* ------------------------------------------------------------------ */
/* Auth page                                                          */
/* ------------------------------------------------------------------ */
function AuthPage({ onEnter }) {
  const [mode, setMode] = useState("login");
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
              Chaque corde tressée<br />est une leçon apprise.
            </p>
            <p className="font-body text-sm text-stone-400 mt-4">
              Apprends un instrument avec de vrais professeurs, à ton rythme, où que tu sois à Madagascar.
            </p>
          </div>
          <ValihaStrings className="h-24" count={22} tone="amber" />
        </div>

        <div className="p-10">
          <div className="flex gap-6 border-b border-stone-200 mb-8">
            <button onClick={() => setMode("login")} className={`pb-3 text-sm font-medium font-body ${mode === "login" ? "text-teal-950 border-b-2 border-amber-600" : "text-stone-400"}`}>Se connecter</button>
            <button onClick={() => setMode("signup")} className={`pb-3 text-sm font-medium font-body ${mode === "signup" ? "text-teal-950 border-b-2 border-amber-600" : "text-stone-400"}`}>Créer un compte</button>
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
            onClick={onEnter}
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

const Field = ({ label, placeholder, icon: Icon, type = "text" }) => (
  <label className="block mb-3">
    <span className="text-xs font-body font-medium text-stone-500">{label}</span>
    <div className="mt-1 flex items-center border border-stone-300 rounded-sm px-3 py-2 focus-within:border-amber-600">
      {Icon && <Icon size={15} className="text-stone-400 mr-2" />}
      <input type={type} placeholder={placeholder} className="w-full text-sm font-body outline-none bg-transparent text-teal-950" />
    </div>
  </label>
);

/* ------------------------------------------------------------------ */
/* Shell: sidebar + topbar                                            */
/* ------------------------------------------------------------------ */
function Shell({ page, setPage, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-stone-100 font-body flex">
      {/* Sidebar */}
      <aside className={`
        fixed md:static z-30 inset-y-0 left-0 w-64 bg-teal-950 text-stone-200 flex flex-col
        transform transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="px-6 py-6 flex items-center gap-2 border-b border-teal-900">
          <Music size={20} className="text-amber-400" />
          <span className="font-display text-lg text-stone-50">Kalon'ny</span>
          <button className="ml-auto md:hidden" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setPage(key); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors
                ${page === key ? "bg-teal-900 text-amber-400" : "text-stone-300 hover:bg-teal-900/60"}`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-teal-900">
          <ValihaStrings className="h-10 mb-4" count={18} tone="teal" />
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            Compte élève vérifié
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-stone-50 border-b border-stone-200 px-4 md:px-8 py-4 flex items-center gap-4">
          <button className="md:hidden text-teal-950" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <h1 className="font-display text-xl text-teal-950">{NAV.find(n => n.key === page)?.label || "Kalon'ny"}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-stone-100 rounded-sm px-3 py-1.5 text-sm text-stone-500">
              <Search size={14} /> Rechercher…
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center font-display text-teal-950 text-sm">FR</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                          */
/* ------------------------------------------------------------------ */
function Dashboard({ goTo }) {
  return (
    <div className="space-y-8">
      <section className="bg-teal-950 rounded-sm p-8 relative overflow-hidden">
        <p className="text-amber-400 text-xs font-mono tracking-wide">BONJOUR FARA</p>
        <h2 className="font-display text-2xl md:text-3xl text-stone-50 mt-2 max-w-md">
          Tu as tenu 12 jours d'affilée. Continue de tresser tes progrès.
        </h2>
        <button onClick={() => goTo("lecon")} className="mt-6 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-5 py-2.5 rounded-sm inline-flex items-center gap-2">
          Reprendre ma leçon <ChevronRight size={15} />
        </button>
        <ValihaStrings className="absolute right-6 top-0 h-full w-32 opacity-60" count={20} tone="amber" />
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Clock} label="Temps d'écoute cette semaine" value="4h 20" />
        <StatCard icon={TrendingUp} label="Progression globale" value="68%" />
        <StatCard icon={Award} label="Certificats obtenus" value="1" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-teal-950">Mes cours en cours</h3>
          <button onClick={() => goTo("catalogue")} className="text-xs font-mono text-amber-700">VOIR LE CATALOGUE →</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {COURSES.slice(0, 2).map(c => (
            <button key={c.id} onClick={() => goTo("detail")} className="text-left bg-white border border-stone-200 rounded-sm p-4 flex gap-4 hover:border-amber-600 transition-colors">
              <div className={`w-16 h-16 rounded-sm shrink-0 ${swatch[c.img]}`} />
              <div className="min-w-0">
                <p className="font-body text-sm font-semibold text-teal-950 truncate">{c.titre}</p>
                <p className="text-xs text-stone-500 mt-0.5">{c.prof}</p>
                <div className="w-full h-1.5 bg-stone-200 rounded-full mt-3">
                  <div className="h-1.5 bg-amber-600 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-stone-200 rounded-sm p-5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"><Icon size={18} className="text-amber-700" /></div>
    <div>
      <p className="font-mono text-xl text-teal-950">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Catalogue (recherche + filtre)                                     */
/* ------------------------------------------------------------------ */
function Catalogue({ goTo }) {
  const [q, setQ] = useState("");
  const [niveau, setNiveau] = useState("Tous");
  const niveaux = ["Tous", "Débutant", "Intermédiaire", "Avancé"];
  const filtered = COURSES.filter(c =>
    c.titre.toLowerCase().includes(q.toLowerCase()) &&
    (niveau === "Tous" || c.niveau === niveau)
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-stone-300 rounded-sm px-3 py-2.5">
          <Search size={16} className="text-stone-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un cours, un instrument, un professeur…" className="w-full text-sm outline-none bg-transparent text-teal-950" />
        </div>
        <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-sm px-3 py-2.5">
          <Filter size={15} className="text-stone-400" />
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className="text-sm outline-none bg-transparent text-teal-950">
            {niveaux.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => (
          <button key={c.id} onClick={() => goTo("detail")} className="text-left bg-white border border-stone-200 rounded-sm overflow-hidden hover:border-amber-600 hover:shadow-md transition-all">
            <div className={`h-28 ${swatch[c.img]} flex items-center justify-center`}>
              <Music size={28} className="text-teal-950/40" />
            </div>
            <div className="p-4">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${badge[c.img]}`}>{c.niveau.toUpperCase()}</span>
              <p className="font-body text-sm font-semibold text-teal-950 mt-2 leading-snug">{c.titre}</p>
              <p className="text-xs text-stone-500 mt-1">{c.prof} · {c.instrument}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-stone-500">
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-500" /> {c.note} ({c.avis})</span>
                <span className="font-mono text-teal-950">{c.prix.toLocaleString()} Ar</span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-sm text-stone-500 col-span-full">Aucun cours ne correspond à ta recherche.</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Détail d'un cours                                                  */
/* ------------------------------------------------------------------ */
function CourseDetail({ goTo }) {
  const c = COURSES[0];
  const [fav, setFav] = useState(false);
  return (
    <div className="space-y-6">
      <button onClick={() => goTo("catalogue")} className="text-xs font-mono text-stone-500 flex items-center gap-1"><ChevronLeft size={13} /> RETOUR AU CATALOGUE</button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className={`h-56 rounded-sm ${swatch[c.img]} flex items-center justify-center`}>
            <Music size={40} className="text-teal-950/40" />
          </div>
          <div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${badge[c.img]}`}>{c.niveau.toUpperCase()}</span>
            <h2 className="font-display text-2xl text-teal-950 mt-2">{c.titre}</h2>
            <p className="text-sm text-stone-500 mt-1">Par {c.prof} · {c.duree} de contenu · {LECONS.length} leçons</p>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Un parcours pas à pas pour apprendre le valiha, de l'accordage aux premières mélodies traditionnelles,
            avec des retours personnalisés de ton professeur à chaque exercice envoyé.
          </p>

          <div>
            <h3 className="font-display text-lg text-teal-950 mb-3">Contenu du cours</h3>
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-sm">
              {LECONS.map(l => (
                <button key={l.id} onClick={() => goTo("lecon")} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-50">
                  {l.fait ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <PlayCircle size={16} className="text-stone-400 shrink-0" />}
                  <span className="text-sm text-teal-950 flex-1">{l.titre}</span>
                  <span className="text-xs font-mono text-stone-400">{l.duree}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-teal-950 mb-3">Avis des élèves</h3>
            <div className="bg-white border border-stone-200 rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="text-amber-500 fill-amber-500" />)}
                <span className="text-xs text-stone-500">Tsiory, il y a 3 jours</span>
              </div>
              <p className="text-sm text-stone-600">Professeur patient, les vidéos sont claires et le rythme est parfait pour un vrai débutant.</p>
              <label className="flex items-center gap-2 mt-4 text-xs text-stone-500">
                Laisser une note :
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-stone-300" />)}
              </label>
            </div>
          </div>
        </div>

        <aside className="bg-white border border-stone-200 rounded-sm p-5 h-fit sticky top-4">
          <p className="font-mono text-2xl text-teal-950">{c.prix.toLocaleString()} Ar</p>
          <button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-3 rounded-sm">Acheter ce cours</button>
          <button onClick={() => setFav(!fav)} className="w-full mt-2 border border-stone-300 text-sm font-medium py-3 rounded-sm flex items-center justify-center gap-2 text-teal-950">
            <Heart size={15} className={fav ? "fill-orange-600 text-orange-600" : "text-stone-400"} />
            {fav ? "Dans mes favoris" : "Ajouter aux favoris"}
          </button>
          <div className="mt-5 space-y-2 text-xs text-stone-500">
            <p className="flex items-center gap-2"><Video size={13} /> Leçons vidéo téléchargeables</p>
            <p className="flex items-center gap-2"><FileText size={13} /> Partitions PDF incluses</p>
            <p className="flex items-center gap-2"><Headphones size={13} /> Pistes audio d'accompagnement</p>
            <p className="flex items-center gap-2"><Award size={13} /> Certificat à la fin du parcours</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lecteur de leçon                                                   */
/* ------------------------------------------------------------------ */
function LessonPlayer({ goTo }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video bg-teal-950 rounded-sm flex items-center justify-center relative overflow-hidden">
          <PlayCircle size={52} className="text-amber-400" />
          <ValihaStrings className="absolute bottom-0 left-0 h-8 w-full opacity-30" count={40} tone="amber" />
        </div>
        <div>
          <h2 className="font-display text-xl text-teal-950">Jouer une mélodie traditionnelle</h2>
          <p className="text-sm text-stone-500 mt-1">Leçon 4 sur 5 · 30 min</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 text-sm border border-stone-300 px-4 py-2 rounded-sm text-teal-950"><Download size={14} /> Partition PDF</button>
          <button className="flex items-center gap-2 text-sm border border-stone-300 px-4 py-2 rounded-sm text-teal-950"><Headphones size={14} /> Piste audio</button>
        </div>
        <div className="bg-white border border-stone-200 rounded-sm p-5">
          <h3 className="font-display text-base text-teal-950 mb-2">Exercice</h3>
          <p className="text-sm text-stone-600 mb-3">Enregistre-toi en train de jouer la mélodie, puis envoie ton fichier pour correction.</p>
          <button className="text-sm bg-teal-950 text-stone-50 px-4 py-2 rounded-sm">Déposer mon fichier</button>
        </div>
      </div>

      <aside className="bg-white border border-stone-200 rounded-sm p-4 h-fit">
        <p className="text-xs font-mono text-stone-400 mb-3">PLAN DU COURS</p>
        <div className="space-y-1">
          {LECONS.map(l => (
            <button key={l.id} onClick={() => goTo("lecon")} className={`w-full flex items-center gap-2 px-2 py-2 rounded-sm text-left text-sm ${l.titre === "Jouer une mélodie traditionnelle" ? "bg-amber-50 text-amber-800" : "text-teal-950 hover:bg-stone-50"}`}>
              {l.fait ? <CheckCircle2 size={14} className="text-emerald-600" /> : <PlayCircle size={14} className="text-stone-400" />}
              {l.titre}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progression & certificats                                          */
/* ------------------------------------------------------------------ */
function Progression() {
  return (
    <div className="space-y-8">
      <section className="grid sm:grid-cols-2 gap-5">
        {COURSES.slice(0, 2).map((c, i) => (
          <div key={c.id} className="bg-white border border-stone-200 rounded-sm p-5">
            <p className="font-body text-sm font-semibold text-teal-950">{c.titre}</p>
            <p className="text-xs text-stone-500 mt-0.5">{c.prof}</p>
            <div className="w-full h-2 bg-stone-200 rounded-full mt-4">
              <div className="h-2 bg-amber-600 rounded-full" style={{ width: i === 0 ? "60%" : "30%" }} />
            </div>
            <p className="text-xs font-mono text-stone-500 mt-2">{i === 0 ? "60%" : "30%"} terminé</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="font-display text-lg text-teal-950 mb-3">Mes certificats</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-teal-950 rounded-sm p-5 text-stone-50 relative overflow-hidden">
            <Award size={22} className="text-amber-400" />
            <p className="font-display text-lg mt-3">Piano classique — niveau débutant</p>
            <p className="text-xs text-stone-400 mt-1">Obtenu le 14 mars 2026</p>
            <ValihaStrings className="absolute right-4 top-4 h-16 w-16 opacity-40" count={12} tone="amber" />
          </div>
          <div className="border border-dashed border-stone-300 rounded-sm p-5 flex flex-col items-center justify-center text-center text-stone-400">
            <GraduationCap size={22} />
            <p className="text-xs mt-2">Termine le cours de Valiha pour débloquer ton prochain certificat</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Favoris                                                            */
/* ------------------------------------------------------------------ */
function Favoris({ goTo }) {
  const favs = COURSES.slice(2, 5);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {favs.map(c => (
        <div key={c.id} className="bg-white border border-stone-200 rounded-sm overflow-hidden">
          <div className={`h-24 ${swatch[c.img]}`} />
          <div className="p-4">
            <p className="font-body text-sm font-semibold text-teal-950 leading-snug">{c.titre}</p>
            <p className="text-xs text-stone-500 mt-1">{c.prof}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="font-mono text-xs text-teal-950">{c.prix.toLocaleString()} Ar</span>
              <button onClick={() => goTo("detail")} className="text-xs font-mono text-amber-700">VOIR →</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Messages                                                           */
/* ------------------------------------------------------------------ */
function Messages() {
  const [active, setActive] = useState(MESSAGES[0]);
  return (
    <div className="grid md:grid-cols-3 gap-0 bg-white border border-stone-200 rounded-sm overflow-hidden" style={{ minHeight: "480px" }}>
      <div className="border-r border-stone-200 divide-y divide-stone-100">
        {MESSAGES.map(m => (
          <button key={m.id} onClick={() => setActive(m)} className={`w-full text-left px-4 py-3 ${active.id === m.id ? "bg-amber-50" : "hover:bg-stone-50"}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-teal-950">{m.prof}</p>
              {!m.lu && <span className="w-2 h-2 rounded-full bg-orange-600" />}
            </div>
            <p className="text-xs text-stone-500 truncate mt-0.5">{m.extrait}</p>
            <p className="text-[10px] font-mono text-stone-400 mt-1">{m.heure}</p>
          </button>
        ))}
      </div>
      <div className="md:col-span-2 flex flex-col">
        <div className="px-5 py-3 border-b border-stone-200">
          <p className="text-sm font-semibold text-teal-950">{active.prof}</p>
          <p className="text-xs text-stone-500">Professeur · Valiha</p>
        </div>
        <div className="flex-1 p-5 space-y-3">
          <div className="bg-stone-100 text-sm text-teal-950 rounded-sm px-4 py-2 max-w-xs">{active.extrait}</div>
        </div>
        <div className="p-4 border-t border-stone-200 flex items-center gap-2">
          <input placeholder="Écrire un message…" className="flex-1 text-sm border border-stone-300 rounded-sm px-3 py-2 outline-none" />
          <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-sm p-2.5"><Send size={15} /></button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Profil                                                             */
/* ------------------------------------------------------------------ */
function Profil() {
  return (
    <div className="max-w-xl bg-white border border-stone-200 rounded-sm p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center font-display text-2xl text-teal-950">FR</div>
        <div>
          <p className="font-display text-lg text-teal-950">Fara Rakoto</p>
          <p className="text-xs text-stone-500">Élève depuis février 2026</p>
        </div>
      </div>
      <Field label="Nom complet" placeholder="Fara Rakoto" />
      <Field label="E-mail" placeholder="fara.rakoto@mail.mg" icon={Mail} />
      <Field label="Téléphone" placeholder="+261 34 00 000 00" />
      <button className="bg-teal-950 text-stone-50 text-sm font-medium px-5 py-2.5 rounded-sm">Enregistrer les modifications</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [entered, setEntered] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!entered) return (<><FontImport /><AuthPage onEnter={() => setEntered(true)} /></>);

  const pages = {
    dashboard: <Dashboard goTo={setPage} />,
    catalogue: <Catalogue goTo={setPage} />,
    detail: <CourseDetail goTo={setPage} />,
    lecon: <LessonPlayer goTo={setPage} />,
    progression: <Progression />,
    favoris: <Favoris goTo={setPage} />,
    messages: <Messages />,
    profil: <Profil />,
  };

  return (
    <>
      <FontImport />
      <Shell page={page} setPage={setPage}>{pages[page]}</Shell>
    </>
  );
}
