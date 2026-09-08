import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { useAuth } from "../../app/hooks/useAuth";
import { useLevel } from "../../app/hooks/useLevel";
import { useInstrument } from "../../app/hooks/useInstrument";

function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export default function Inscription() {
  const [params] = useSearchParams();
  const niveauName = params.get("niveau") || "initiation";
  const [niveau, setNiveau] = useState(null);

  const { user } = useAuth();

  const [form, setForm] = useState({
    nom: user.name,
    prenom: user.firstname,
    email: user.email,
    telephone: "",
  });

  const { levels } = useLevel();
  // "instruments" = catalogue complet récupéré depuis la BDD (via le Provider).
  // Ne pas confondre avec la sélection de l'utilisateur, qui est gérée séparément.
  const { instruments } = useInstrument();

  useEffect(() => {
    if (levels && levels.length > 0) {
      const found =
        levels.find((level) => level.name === niveauName) || levels[0];
      setNiveau(found);
    }
  }, [levels, niveauName]);

  // Ids des instruments choisis par l'utilisateur dans le formulaire.
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleInstrument = (id) =>
    setSelectedInstruments((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    );

  const nombreInstruments = selectedInstruments.length;
  // Montant = nombre d'instruments sélectionnés × prix du niveau
  const montantTotal = useMemo(
    () => nombreInstruments * (niveau?.prix || 0),
    [nombreInstruments, niveau],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreInstruments === 0) return;
    // Intégration API à brancher ici : POST /api/inscriptions
    // (nom, prenom, email, telephone, niveau: niveau.id, instruments: selectedInstruments)
    setSent(true);
  };

  if (!niveau) {
    return (
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.3fr]">
          <AnimatedSection>
            <p className="font-body text-sm text-ink-soft">Chargement …</p>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.3fr]">
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
            Inscription
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Rejoins la formation
          </h1>
          <p className="mt-4 max-w-sm font-body text-ink-soft">
            Choisis le ou les instruments que tu veux apprendre. Ton parcours
            démarre dès validation de ton inscription.
          </p>

          <div className="mt-10 space-y-4 rounded-2xl border border-ivory-dark bg-white/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">
              Formation concernée
            </p>
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                <HiOutlineAcademicCap size={19} />
              </span>
              <div>
                <p className="font-body text-sm font-semibold text-ink">
                  Niveau {niveau.name}
                </p>
                <p className="font-body text-xs text-ink-soft">
                  {niveau.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                <HiOutlineClock size={19} />
              </span>
              <div>
                <p className="font-body text-sm font-semibold text-ink">
                  Durée : {niveau.duree}
                </p>
                <p className="font-body text-xs text-ink-soft">
                  {formatAriary(niveau.prix)} par instrument
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          delay={120}
          className="rounded-[1.75rem] border border-ivory-dark bg-white/60 p-8 sm:p-10"
        >
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center animate-fade-in">
              <HiOutlineCheckCircle className="text-coral-dark" size={44} />
              <h2 className="font-display text-xl font-semibold text-ink">
                Inscription envoyée !
              </h2>
              <p className="max-w-sm font-body text-sm text-ink-soft">
                Merci {form.prenom || ""}, ton inscription au niveau{" "}
                {niveau.name} pour {nombreInstruments} instrument
                {nombreInstruments > 1 ? "s" : ""} ({formatAriary(montantTotal)}
                ) a bien été enregistrée. Un e-mail de confirmation arrive à{" "}
                {form.email || "ton adresse"}.
              </p>
              <Link
                to="/"
                className="mt-3 font-body text-sm font-semibold text-coral-dark hover:text-brick"
              >
                Retour à l'accueil
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations élève */}
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Tes informations
                </h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-body text-sm font-medium text-ink">
                      Nom
                    </span>
                    <input
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      required
                      placeholder="Rakoto"
                      className="mt-1.5 w-full rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                    />
                  </label>
                  <label className="block">
                    <span className="font-body text-sm font-medium text-ink">
                      Prénom
                    </span>
                    <input
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      required
                      placeholder="Fara"
                      className="mt-1.5 w-full rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                    />
                  </label>
                  <label className="block">
                    <span className="font-body text-sm font-medium text-ink">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="vous@email.com"
                      className="mt-1.5 w-full rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                    />
                  </label>
                  <label className="block">
                    <span className="font-body text-sm font-medium text-ink">
                      Téléphone
                    </span>
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      required
                      placeholder="+261 34 00 000 00"
                      className="mt-1.5 w-full rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                    />
                  </label>
                </div>
              </div>

              {/* Choix des instruments */}
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Instruments à apprendre
                </h2>
                <p className="mt-1 font-body text-xs text-ink-soft">
                  Choix multiple possible.
                </p>
                {/* Liste verticale scrollable : reste lisible même si la liste
                    d'instruments s'agrandit une fois branchée sur la BDD. */}
                <div className="mt-4 max-h-72 divide-y divide-ivory-dark overflow-y-auto rounded-2xl border border-ivory-dark bg-ivory">
                  {instruments.map((instr) => {
                    const selected = selectedInstruments.includes(instr.id);
                    return (
                      <button
                        type="button"
                        key={instr.id}
                        onClick={() => toggleInstrument(instr.id)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                          selected ? "bg-coral/10" : "hover:bg-ivory-dark/40"
                        }`}
                      >
                        <span className="text-xl"></span>
                        <span className="flex-1 font-body text-sm font-medium text-ink">
                          {instr.name}
                        </span>
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                            selected
                              ? "border-coral bg-coral text-ivory"
                              : "border-ivory-dark bg-white text-transparent"
                          }`}
                        >
                          <HiOutlineCheckCircle size={14} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Récapitulatif automatique */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-linear-to-br from-brick via-coral-dark to-coral p-5 text-ivory">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ivory/70">
                    Instruments sélectionnés
                  </p>
                  <p className="font-display text-lg font-semibold">
                    {nombreInstruments}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ivory/70">
                    Montant total
                  </p>
                  <p className="font-display text-lg font-semibold">
                    {formatAriary(montantTotal)}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={nombreInstruments === 0}
                className="w-full rounded-full bg-coral py-3.5 font-body text-sm font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {nombreInstruments === 0
                  ? "Sélectionne au moins un instrument"
                  : "Confirmer mon inscription"}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
