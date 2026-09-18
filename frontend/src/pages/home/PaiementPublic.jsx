import { useEffect, useState } from "react";
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
import { useLevel } from "../../app/hooks/useLevel";
import { formatAriary } from "../../lib/mockStudentData";
import { storePaiement } from "../../app/api/paiementApi";

// Cette page n'est accessible qu'après une inscription : elle attend `niveau`
// (obligatoire) et éventuellement `instruments` dans l'URL, transmis par
// home/Inscription.jsx juste après la validation du formulaire d'inscription
// (ex. redirection vers /paiement?niveau=avance&instruments=valiha,kabosy).
export default function PaiementPublic() {
  const [searchParams] = useSearchParams();
  const niveauName = searchParams.get("niveau");
  const instrumentsParam = searchParams.get("instruments");
  const inscriptionId = searchParams.get("inscriptionId");
  const instruments = instrumentsParam ? instrumentsParam.split(",") : [];

  const [nombreMois, setNombreMois] = useState(1);
  const [modePaiement, setModePaiement] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const [termine, setTermine] = useState(false);
  const [erreur, setErreur] = useState("");

  // Champs carte bancaire, affichés uniquement si le mode "carte" est choisi.
  const [numeroCarte, setNumeroCarte] = useState("");
  const [expirationCarte, setExpirationCarte] = useState("");
  const [cvvCarte, setCvvCarte] = useState("");

  const [niveau, setNiveau] = useState([]);

  const { levels } = useLevel();

  console.log("levels : ", levels);

  useEffect(() => {
    if (levels && levels.length > 0) {
      const found =
        // filter retourne un tableau
        // levels.filter((level) => level.name === niveauName) || levels[0];

        // find retouren un objet
        levels.find((level) => level.name === niveauName) || levels[0];
      setNiveau(found);
    }
  }, [levels, niveauName]);

  const sousTotal = nombreMois * niveau.prix_mensuel;
  const total = sousTotal + parseFloat(niveau.droit_inscription);

  const moisValide =
        Number.isInteger(nombreMois) &&
        nombreMois >= 1;

  const modesMobileMoney = MODES_PAIEMENT.filter(
    (m) => m.groupe === "mobile_money",
  );
  const modeCarte = MODES_PAIEMENT.find((m) => m.groupe === "carte");
  const paiementParCarte = modePaiement === modeCarte?.id;

  // Formatage "1234 5678 9012 3456" au fil de la saisie, 19 chiffres max.
  function handleNumeroCarteChange(e) {
    const chiffres = e.target.value.replace(/\D/g, "").slice(0, 19);
    setNumeroCarte(chiffres.replace(/(.{4})/g, "$1 ").trim());
  }

  // Formatage "MM/AA" au fil de la saisie.
  function handleExpirationChange(e) {
    const chiffres = e.target.value.replace(/\D/g, "").slice(0, 4);
    setExpirationCarte(
      chiffres.length > 2
        ? `${chiffres.slice(0, 2)}/${chiffres.slice(2)}`
        : chiffres,
    );
  }

  function handleCvvChange(e) {
    setCvvCarte(e.target.value.replace(/\D/g, "").slice(0, 4));
  }

  // Carte valide uniquement si ce mode est choisi ; sinon la vérification est ignorée.
  const carteValide =
    !paiementParCarte ||
    (numeroCarte.replace(/\s/g, "").length >= 13 &&
      /^\d{2}\/\d{2}$/.test(expirationCarte) &&
      cvvCarte.length >= 3);

  const handleSubmit = async () => {
    console.log("modePaiement : ", modePaiement);

    if (!moisValide || !modePaiement || !carteValide) {
      setErreur(
        !moisValide || !modePaiement
          ? "Choisis un nombre de mois valide (entre 1 et " +
              niveau.duree +
              ") et un mode de paiement."
          : "Vérifie les informations de ta carte bancaire (numéro, expiration, CVV).",
      );
      return;
    }

    setErreur("");
    setEnCours(true);

    try {
      const data = {
        nombre_mois: nombreMois,
        montant: total,
        mode_paiement: modePaiement,
        description: "Premier paiement",
        // Remarque sécurité : en production, ces champs ne doivent jamais transiter
        // ni être stockés tels quels côté serveur — passer par un prestataire de
        // paiement (tokenisation) plutôt que d'envoyer le PAN en clair.
        ...(paiementParCarte && {
          numero_carte: numeroCarte.replace(/\s/g, ""),
          expiration_carte: expirationCarte,
          cvv_carte: cvvCarte,
        }),
      };

      const response = await storePaiement(inscriptionId, data);
      console.log("Paiement effectué avec succès : ", response.data);
    } catch (err) {
      console.error("Erreur lors du paiement", err.response?.data);
      setErreur("Une erreur est survenue lors du paiement");
    } finally {
      setEnCours(false);
      setTermine(true);
    }
  };

  // Garde-fou : pas de niveau valide/ouvert dans l'URL → pas de paiement possible.
  if (!niveau) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <HiOutlineExclamationCircle className="mx-auto text-brick" size={36} />
        <p className="mt-3 font-body text-sm text-ink-soft">
          {`Le niveau « ${niveau.name} » n'est pas ouvert à l'inscription directe.`}
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

  if (termine) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <HiOutlineCheckCircle className="mx-auto text-coral-dark" size={44} />
        <h2 className="font-display text-2xl font-semibold text-ink">
          Paiement enregistré
        </h2>
        <p className="font-body text-sm text-ink-soft">
          Ton inscription au niveau{" "}
          <span className="font-semibold text-ink">{niveau.name}</span> est
          confirmée pour {nombreMois} mois. Tu pourras régler le reste depuis
          ton espace élève.
        </p>
        <Link
          to="/eleve/formation"
          className="group inline-flex items-center gap-1.5 rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick"
        >
          Accéder à mon espace élève
          <HiOutlineArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 sm:px-6">
      <input type="hidden" name="description" value="Premier paiement" readOnly />
      <AnimatedSection className="text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Paiement
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Finalise ton inscription
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink-soft">
          Dernière étape avant de commencer : règle ton premier paiement pour le
          niveau {niveau.name}.
        </p>
      </AnimatedSection>

      {/* Inscription réalisée */}
      <AnimatedSection className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
        <h3 className="font-display text-base font-semibold text-ink">
          Ton inscription
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-coral/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark">
            Niveau {niveau.name}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft">
            <HiOutlineClock size={13} /> Durée totale du niveau : {niveau.duree}
          </span>
          {instruments.length > 0 && (
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Instruments : {instruments.join(", ")}
            </span>
          )}
        </div>
      </AnimatedSection>

      {/* Mensualité */}
      <AnimatedSection
        delay={80}
        className="rounded-2xl border border-ivory-dark bg-white/70 p-6"
      >
        <h3 className="font-display text-base font-semibold text-ink">
          Mensualité
        </h3>
        <p className="mt-1 font-body text-sm text-ink-soft">
          Montant mensuel de ce niveau :{" "}
          <span className="font-semibold text-ink">
            {formatAriary(niveau.prix_mensuel)} / mois
          </span>
        </p>

        <label
          className="mt-4 block font-mono text-[11px] uppercase tracking-wide text-ink-soft"
          htmlFor="nombreMois"
        >
          Nombre de mois à payer maintenant (max {niveau.duree})
        </label>
        <input
          id="nombreMois"
          type="number"
          min={1}
          max={niveau.duree}
          value={nombreMois}
          onChange={(e) => {
            const val = Number(e.target.value);
            const borne = Number.isNaN(val)
              ? 1
              : Math.min(Math.max(val, 1), niveau.duree.split(" ")[0]);
            setNombreMois(borne);
          }}
          className="mt-1.5 w-32 rounded-lg border border-ivory-dark bg-white px-3 py-2 font-body text-sm text-ink focus:border-coral focus:outline-none"
        />
      </AnimatedSection>

      {/* Mode de paiement */}
      <AnimatedSection
        delay={160}
        className="rounded-2xl border border-ivory-dark bg-white/70 p-6"
      >
        <h3 className="font-display text-base font-semibold text-ink">
          Mode de paiement
        </h3>

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

        {/* Champs carte bancaire, affichés uniquement pour ce mode */}
        {paiementParCarte && (
          <div className="mt-4 grid gap-3 rounded-xl border border-ivory-dark bg-ivory-dark/20 p-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft"
                htmlFor="numeroCarte"
              >
                Numéro de carte
              </label>
              <input
                id="numeroCarte"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                value={numeroCarte}
                onChange={handleNumeroCarteChange}
                className="mt-1.5 w-full rounded-lg border border-ivory-dark bg-white px-3 py-2 font-body text-sm text-ink focus:border-coral focus:outline-none"
              />
            </div>
            <div>
              <label
                className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft"
                htmlFor="expirationCarte"
              >
                Expiration (MM/AA)
              </label>
              <input
                id="expirationCarte"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/AA"
                value={expirationCarte}
                onChange={handleExpirationChange}
                className="mt-1.5 w-full rounded-lg border border-ivory-dark bg-white px-3 py-2 font-body text-sm text-ink focus:border-coral focus:outline-none"
              />
            </div>
            <div>
              <label
                className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft"
                htmlFor="cvvCarte"
              >
                CVV
              </label>
              <input
                id="cvvCarte"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="•••"
                value={cvvCarte}
                onChange={handleCvvChange}
                className="mt-1.5 w-full rounded-lg border border-ivory-dark bg-white px-3 py-2 font-body text-sm text-ink focus:border-coral focus:outline-none"
              />
            </div>
          </div>
        )}
      </AnimatedSection>

      {/* Récapitulatif */}
      <AnimatedSection
        delay={240}
        className="rounded-2xl border border-ivory-dark bg-white/70 p-6"
      >
        <h3 className="flex items-center gap-1.5 font-display text-base font-semibold text-ink">
          <HiOutlineBanknotes size={18} /> Récapitulatif
        </h3>
        <dl className="mt-3 space-y-2 font-body text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-soft">
              {nombreMois} mois × {formatAriary(niveau.prix_mensuel)}
            </dt>
            <dd className="text-ink">{formatAriary(sousTotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-soft">Droit d'inscription au niveau</dt>
            <dd className="text-ink">
              {formatAriary(niveau.droit_inscription)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-ivory-dark pt-2 font-semibold">
            <dt className="text-ink">Total à payer</dt>
            <dd className="text-coral-dark">{formatAriary(total)}</dd>
          </div>
        </dl>

        {erreur && (
          <p className="mt-3 font-body text-xs font-medium text-brick">
            {erreur}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={enCours}
          className="group mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-coral px-5 py-3 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick disabled:opacity-60 sm:w-auto"
        >
          {enCours ? "Traitement…" : "Confirmer le paiement"}
          {!enCours && (
            <HiOutlineArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>
      </AnimatedSection>
    </div>
  );
}
