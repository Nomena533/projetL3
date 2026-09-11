import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineDevicePhoneMobile,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineExclamationCircle,
} from "../../lib/icons";
import AnimatedSection from "../../components/AnimatedSection";
import { NIVEAUX_PARCOURS, MODES_PAIEMENT } from "../../lib/mockFormationData";

// TODO: remplacer par l'appel API réel, ex. paiementApi.creerPremierPaiement(payload)
async function envoyerPremierPaiement(payload) {
  console.log("Premier paiement envoyé à la BDD :", payload);
  return new Promise((resolve) => setTimeout(resolve, 700));
}

// Cette page n'est accessible qu'après une inscription : elle attend `niveau`
// (obligatoire) et éventuellement `instruments` dans l'URL, transmis par
// home/Inscription.jsx juste après la validation du formulaire d'inscription
// (ex. redirection vers /paiement?niveau=avance&instruments=valiha,kabosy).
export default function PaiementPublic() {
  const [searchParams] = useSearchParams();
  const niveauId = searchParams.get("niveau");
  const instrumentsParam = searchParams.get("instruments");
  const instruments = instrumentsParam ? instrumentsParam.split(",") : [];

  const niveau = NIVEAUX_PARCOURS.find((n) => n.id === niveauId);

  const [nombreMois, setNombreMois] = useState(1);
  const [modePaiement, setModePaiement] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const [termine, setTermine] = useState(false);
  const [erreur, setErreur] = useState("");

  // Garde-fou : pas de niveau valide/ouvert dans l'URL → pas de paiement possible.
  if (!niveau || !niveau.ouvertInscription) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <HiOutlineExclamationCircle className="mx-auto text-brick" size={36} />
        <p className="mt-3 font-body text-sm text-ink-soft">
          {niveau
            ? `Le niveau « ${niveau.nom} » n'est pas ouvert à l'inscription directe.`
            : "Aucune inscription trouvée. Le paiement n'est accessible qu'après avoir rempli le formulaire d'inscription à un niveau."}
        </p>
        <Link
          to="/formation"
          className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark hover:text-brick"
        >
          Voir les niveaux disponibles <HiOutlineArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const sousTotal = nombreMois * niveau.montantMensuel;
  const total = sousTotal + niveau.droitInscription;
  const moisValide = Number.isInteger(nombreMois) && nombreMois >= 1 && nombreMois <= niveau.dureeMois;

  const modesMobileMoney = MODES_PAIEMENT.filter((m) => m.groupe === "mobile_money");
  const modeCarte = MODES_PAIEMENT.find((m) => m.groupe === "carte");

  async function handleSubmit() {
    if (!moisValide || !modePaiement) {
      setErreur("Choisis un nombre de mois valide (entre 1 et " + niveau.dureeMois + ") et un mode de paiement.");
      return;
    }
    setErreur("");
    setEnCours(true);
    await envoyerPremierPaiement({
      niveau: niveau.id,
      instruments,
      nombreMois,
      montantMensuel: niveau.montantMensuel,
      droitInscription: niveau.droitInscription,
      total,
      modePaiement,
    });
    setEnCours(false);
    setTermine(true);
  }

  if (termine) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <HiOutlineCheckCircle className="mx-auto text-coral-dark" size={44} />
        <h2 className="font-display text-2xl font-semibold text-ink">Paiement enregistré</h2>
        <p className="font-body text-sm text-ink-soft">
          Ton inscription au niveau <span className="font-semibold text-ink">{niveau.nom}</span> est confirmée pour{" "}
          {nombreMois} mois. Tu pourras régler le reste depuis ton espace élève.
        </p>
        <Link
          to="/eleve/formation"
          className="group inline-flex items-center gap-1.5 rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick"
        >
          Accéder à mon espace élève
          <HiOutlineArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 sm:px-6">
      <AnimatedSection className="text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Paiement</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Finalise ton inscription</h1>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink-soft">
          Dernière étape avant de commencer : règle ton premier paiement pour le niveau {niveau.nom}.
        </p>
      </AnimatedSection>

      {/* Inscription réalisée */}
      <AnimatedSection className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
        <h3 className="font-display text-base font-semibold text-ink">Ton inscription</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-coral/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark">
            Niveau {niveau.nom}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft">
            <HiOutlineClock size={13} /> Durée totale du niveau : {niveau.dureeMois} mois
          </span>
          {instruments.length > 0 && (
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Instruments : {instruments.join(", ")}
            </span>
          )}
        </div>
      </AnimatedSection>

      {/* Mensualité */}
      <AnimatedSection delay={80} className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
        <h3 className="font-display text-base font-semibold text-ink">Mensualité</h3>
        <p className="mt-1 font-body text-sm text-ink-soft">
          Montant mensuel de ce niveau :{" "}
          <span className="font-semibold text-ink">{niveau.montantMensuel.toLocaleString("fr-MG")} Ar / mois</span>
        </p>

        <label className="mt-4 block font-mono text-[11px] uppercase tracking-wide text-ink-soft" htmlFor="nombreMois">
          Nombre de mois à payer maintenant (max {niveau.dureeMois})
        </label>
        <input
          id="nombreMois"
          type="number"
          min={1}
          max={niveau.dureeMois}
          value={nombreMois}
          onChange={(e) => {
            const val = Number(e.target.value);
            const borne = Number.isNaN(val) ? 1 : Math.min(Math.max(val, 1), niveau.dureeMois);
            setNombreMois(borne);
          }}
          className="mt-1.5 w-32 rounded-lg border border-ivory-dark bg-white px-3 py-2 font-body text-sm text-ink focus:border-coral focus:outline-none"
        />
      </AnimatedSection>

      {/* Mode de paiement */}
      <AnimatedSection delay={160} className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
        <h3 className="font-display text-base font-semibold text-ink">Mode de paiement</h3>

        <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          <HiOutlineDevicePhoneMobile size={14} /> Mobile Money
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {modesMobileMoney.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModePaiement(m.id)}
              className={`rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                modePaiement === m.id
                  ? "border-coral bg-coral text-ivory"
                  : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
              }`}
            >
              {m.nom}
            </button>
          ))}
        </div>

        <p className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          <HiOutlineCreditCard size={14} /> Carte bancaire
        </p>
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setModePaiement(modeCarte.id)}
            className={`rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors duration-200 ${
              modePaiement === modeCarte.id
                ? "border-coral bg-coral text-ivory"
                : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
            }`}
          >
            {modeCarte.nom}
          </button>
        </div>
      </AnimatedSection>

      {/* Récapitulatif */}
      <AnimatedSection delay={240} className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
        <h3 className="flex items-center gap-1.5 font-display text-base font-semibold text-ink">
          <HiOutlineBanknotes size={18} /> Récapitulatif
        </h3>
        <dl className="mt-3 space-y-2 font-body text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-soft">
              {nombreMois} mois × {niveau.montantMensuel.toLocaleString("fr-MG")} Ar
            </dt>
            <dd className="text-ink">{sousTotal.toLocaleString("fr-MG")} Ar</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-soft">Droit d'inscription au niveau</dt>
            <dd className="text-ink">{niveau.droitInscription.toLocaleString("fr-MG")} Ar</dd>
          </div>
          <div className="flex items-center justify-between border-t border-ivory-dark pt-2 font-semibold">
            <dt className="text-ink">Total à payer</dt>
            <dd className="text-coral-dark">{total.toLocaleString("fr-MG")} Ar</dd>
          </div>
        </dl>

        {erreur && <p className="mt-3 font-body text-xs font-medium text-brick">{erreur}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={enCours}
          className="group mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-coral px-5 py-3 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick disabled:opacity-60 sm:w-auto"
        >
          {enCours ? "Traitement…" : "Confirmer le paiement"}
          {!enCours && <HiOutlineArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />}
        </button>
      </AnimatedSection>
    </div>
  );
}
