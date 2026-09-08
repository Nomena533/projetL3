import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCheckCircle } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";

const SUJETS = ["Question sur un cours", "Devenir professeur", "Facturation & paiement", "Problème technique", "Autre"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", sujet: SUJETS[0], message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Intégration API à brancher ici (voir GUIDE_INSTALLATION.md)
    setSent(true);
  };

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.3fr]">
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Parlons musique</h1>
          <p className="mt-4 max-w-sm font-body text-ink-soft">
            Une question sur un cours, un souci technique, ou l'envie de rejoindre l'équipe pédagogique ?
            Écrivez-nous, nous répondons sous 24h ouvrées.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                <HiOutlineMail size={19} />
              </span>
              <div>
                <p className="font-body text-sm font-medium text-ink">bonjour@kalonny.mg</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Réponse sous 24h</p>
              </div>
            </li>
            <li className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                <HiOutlinePhone size={19} />
              </span>
              <div>
                <p className="font-body text-sm font-medium text-ink">+261 34 00 000 00</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Lun–Ven, 8h–17h</p>
              </div>
            </li>
            <li className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                <HiOutlineLocationMarker size={19} />
              </span>
              <div>
                <p className="font-body text-sm font-medium text-ink">Antananarivo, Madagascar</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Équipe basée à Analamanga</p>
              </div>
            </li>
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={120} className="rounded-[1.75rem] border border-ivory-dark bg-white/60 p-8 sm:p-10">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center animate-fade-in">
              <HiOutlineCheckCircle className="text-coral-dark" size={44} />
              <h2 className="font-display text-xl font-semibold text-ink">Message envoyé !</h2>
              <p className="max-w-xs font-body text-sm text-ink-soft">
                Merci {form.nom || ""}, notre équipe vous répondra très vite à {form.email || "votre adresse"}.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ nom: "", email: "", sujet: SUJETS[0], message: "" }); }}
                className="mt-3 font-body text-sm font-semibold text-coral-dark hover:text-brick"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-body text-sm font-medium text-ink">Nom complet</span>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder="Rindra Rakoto"
                    className="mt-1.5 w-full rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                  />
                </label>
                <label className="block">
                  <span className="font-body text-sm font-medium text-ink">Email</span>
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
              </div>

              <label className="block">
                <span className="font-body text-sm font-medium text-ink">Sujet</span>
                <select
                  name="sujet"
                  value={form.sujet}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                >
                  {SUJETS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="font-body text-sm font-medium text-ink">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Dites-nous en plus…"
                  className="mt-1.5 w-full resize-none rounded-xl border border-ivory-dark bg-ivory px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral"
                />
              </label>

              <button
                onClick={handleSubmit}
                className="w-full rounded-full bg-coral py-3.5 font-body text-sm font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
              >
                Envoyer le message
              </button>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
