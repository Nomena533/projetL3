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
  HiOutlineMusicalNote,
  HiOutlineShieldCheck,
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

  const handleSubmit = async () => {
    console.log("modePaiement : ", modePaiement);

    if (!moisValide || !modePaiement) {
      setErreur(
        "Choisis un nombre de mois valide (entre 1 et " +
          niveau.duree +
          ") et un mode de paiement.",
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
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <AnimatedSection className="text-center">
        <p className="font-body text-xs font-medium text-coral-dark">
          Dernière étape
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Finalise ton inscription
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ink-soft">
          Choisis combien de mois régler aujourd'hui pour le niveau{" "}
          <span className="font-semibold text-ink">{niveau.name}</span>, le
          reste se gère ensuite depuis ton espace élève.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
        {/* Colonne gauche : formulaire */}
        <div className="space-y-6">
          {/* Inscription réalisée */}
          <AnimatedSection className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  Ton inscription
                </h3>
                <p className="mt-1 font-body text-sm text-ink-soft">
                  Niveau {niveau.name} · {formatAriary(niveau.prix_mensuel)} /
                  mois
                </p>
              </div>
              <span className="rounded-full bg-coral/10 px-3 py-1 font-body text-xs font-semibold text-coral-dark">
                {niveau.name}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-ivory-dark pt-4">
              <span className="flex items-center gap-1.5 font-body text-xs text-ink-soft">
                <HiOutlineClock size={14} /> Durée du niveau : {niveau.duree}
              </span>
              {instruments.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <HiOutlineMusicalNote size={14} className="text-ink-soft" />
                  {instruments.map((instrument) => (
                    <span
                      key={instrument}
                      className="rounded-full bg-ivory px-2.5 py-0.5 font-body text-xs text-ink-soft"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
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
              className="mt-5 block font-body text-xs font-medium text-ink-soft"
              htmlFor="nombreMois"
            >
              Nombre de mois à payer maintenant (max {niveau.duree})
            </label>
            <div className="mt-2 flex items-center gap-3">
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
                className="w-28 rounded-lg border border-ivory-dark bg-white px-3 py-2.5 font-body text-sm text-ink focus:border-coral focus:outline-none"
              />
              <span className="font-body text-sm text-ink-soft">
                {nombreMois > 1 ? "mois" : "mois"} ·{" "}
                {formatAriary(sousTotal)}
              </span>
            </div>
          </AnimatedSection>

          {/* Mode de paiement */}
          <AnimatedSection
            delay={160}
            className="rounded-2xl border border-ivory-dark bg-white/70 p-6"
          >
            <h3 className="font-display text-base font-semibold text-ink">
              Mode de paiement
            </h3>

            <p className="mt-4 flex items-center gap-1.5 font-body text-xs font-medium text-ink-soft">
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

            <p className="mt-5 flex items-center gap-1.5 font-body text-xs font-medium text-ink-soft">
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

            <p className="mt-5 flex items-center gap-1.5 border-t border-ivory-dark pt-4 font-body text-xs text-ink-soft">
              <HiOutlineShieldCheck size={14} className="text-coral-dark" />
              Paiement sécurisé, traité une seule fois par mensualité choisie.
            </p>
          </AnimatedSection>
        </div>

        {/* Colonne droite : récapitulatif, fixé à côté du formulaire */}
        <AnimatedSection
          delay={120}
          className="rounded-2xl border border-ivory-dark bg-white/70 p-6 lg:sticky lg:top-24"
        >
          <h3 className="flex items-center gap-1.5 font-display text-base font-semibold text-ink">
            <HiOutlineBanknotes size={18} /> Récapitulatif
          </h3>

          <dl className="mt-4 space-y-3 font-body text-sm">
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
            <div className="flex items-center justify-between border-t border-ivory-dark pt-3 text-base font-semibold">
              <dt className="text-ink">Total à payer</dt>
              <dd className="text-coral-dark">{formatAriary(total)}</dd>
            </div>
          </dl>

          <p className="mt-4 font-body text-xs text-ink-soft">
            Mode choisi :{" "}
            <span className="font-medium text-ink">
              {MODES_PAIEMENT.find((m) => m.id === modePaiement)?.nom ||
                "aucun pour l'instant"}
            </span>
          </p>

          {erreur && (
            <p className="mt-4 rounded-lg bg-brick/10 px-3 py-2 font-body text-xs font-medium text-brick">
              {erreur}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={enCours}
            className="group mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-coral px-5 py-3 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick disabled:opacity-60"
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
    </div>
  );
}
