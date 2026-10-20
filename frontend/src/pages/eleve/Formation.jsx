import { Link } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineMusicalNote,
  HiOutlineXMark,
  HiOutlineCreditCard,
  HiOutlineDevicePhoneMobile,
  HiOutlineBanknotes,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import StatCard from "../../components/StatCard";
import ChampsCarte, { useChampsCarte } from "../../components/ChampsCarte";
import { MODES_PAIEMENT } from "../../lib/mockFormationData";
import { useLevel } from "../../app/hooks/useLevel";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../app/hooks/useAuth";
import { capitalize, formatAriary, formatDate } from "../../lib/formatFunction";
import { useUser } from "../../app/hooks/useUser";
import usePaiement from "../../app/hooks/usePaiement";
import { storePaiement } from "../../app/api/paiementApi";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback, DataGate } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";
import {
  ETATS_NIVEAU,
  LIBELLE_ACTION_NIVEAU,
  calculProgression,
  getEtatNiveau,
  lireExamen,
  parseDureeMois,
  resumePaiements,
} from "../../lib/parcoursUtils";

// Modal de paiement pour un niveau donné, ouvert depuis la liste des niveaux.
// Règle : les mois se paient successivement. Un paiement "en attente" de validation
// n'est jamais compté comme validé, mais ses mois ne peuvent pas être repayés.
// Le succès n'est affiché qu'après confirmation effective de l'API.
function ModalPaiementNiveau({ niveauModal, onClose, onConfirmerPaiement }) {
  const { t } = useLang();
  const { moisPayer, moisEnAttente, moisRestant, dureeMois } = niveauModal;

  const [moisSelectionnes, setMoisSelectionnes] = useState([]);
  const [mode, setMode] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const [confirme, setConfirme] = useState(false);
  const [erreur, setErreur] = useState(null);
  const boutonFermerRef = useRef(null);

  // Mois à payer : à la suite des mois déjà validés ET des mois en attente.
  const moisRestants = Array.from(
    { length: moisRestant },
    (_, idx) => moisPayer + moisEnAttente + idx + 1,
  );

  useEffect(() => {
    boutonFermerRef.current?.focus();
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Cliquer sur un mois sélectionne aussi tous les mois restants qui le précèdent ;
  // le désélectionner retire aussi ceux qui le suivent.
  function toggleMois(mois) {
    setErreur(null);
    setMoisSelectionnes((prev) => {
      if (prev.includes(mois)) return prev.filter((m) => m < mois);
      const index = moisRestants.indexOf(mois);
      return moisRestants.slice(0, index + 1);
    });
  }

  const montantMensuelAvecInstrument =
    niveauModal.montantMensuel * Math.max(1, niveauModal.instruments.length);
  const total = moisSelectionnes.length * montantMensuelAvecInstrument;

  const modesMobileMoney = MODES_PAIEMENT.filter((m) => m.groupe === "mobile_money");
  const modeCarte = MODES_PAIEMENT.find((m) => m.groupe === "carte");
  const paiementParCarte = mode === modeCarte?.id;
  const carte = useChampsCarte(paiementParCarte);

  async function handlePayer() {
    if (enCours || moisSelectionnes.length === 0 || !mode || !carte.valide) return;
    setEnCours(true);
    setErreur(null);
    const resultat = await onConfirmerPaiement(
      total,
      moisSelectionnes.length,
      mode,
      paiementParCarte ? carte.donnees() : {},
    );
    setEnCours(false);

    if (resultat?.ok) {
      setMoisSelectionnes([]);
      setMode(null);
      carte.reset();
      setConfirme(true);
    } else {
      // Rien n'a été enregistré : on garde la sélection pour pouvoir réessayer.
      setConfirme(false);
      setErreur(resultat?.message || t("Une erreur est survenue lors du paiement"));
    }
  }

  const pct = (mois) =>
    dureeMois > 0 ? Math.min(100, Math.round((mois / dureeMois) * 100)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-paiement-titre"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-ivory-dark bg-ivory shadow-2xl shadow-ink/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------- EN-TÊTE ---------- */}
        <div className="flex items-start justify-between gap-3 px-6 pb-5 pt-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-coral-dark">
              <HiOutlineBanknotes size={12} />{" "}
              {t("Paiement")}
            </span>
            <h3
              id="modal-paiement-titre"
              className="mt-2 font-display text-xl font-semibold text-ink"
            >
              {capitalize(niveauModal.nom)}
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 font-body text-sm text-ink-soft">
              {t("Instruments :")}{" "}
              {niveauModal.instruments.map((instrument) => (
                <span
                  key={instrument.id}
                  className="rounded-full bg-ivory-dark/50 px-2.5 py-0.5 font-body text-xs text-ink-soft"
                >
                  {instrument.name}
                </span>
              ))}
            </p>
          </div>
          <button
            ref={boutonFermerRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-ink-soft transition-colors duration-200 hover:bg-ivory-dark/50 hover:text-ink"
            aria-label={t("Fermer")}
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        {/* ---------- RÉSULTAT DE LA DERNIÈRE TENTATIVE ---------- */}
        {confirme && (
          <div
            role="status"
            className="mx-6 mb-5 flex items-center gap-3 rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3.5 shadow-sm animate-fade-in"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-sm">
              <HiOutlineCheckCircle size={20} />
            </span>
            <div>
              <p className="font-body text-sm font-bold text-emerald-700">
                {t("Paiement enregistré")}
              </p>
              <p className="font-body text-xs text-emerald-600">
                {t("Son statut est visible dans l'historique de tes paiements.")}
              </p>
            </div>
          </div>
        )}

        {erreur && (
          <div
            role="alert"
            className="mx-6 mb-5 flex items-start gap-3 rounded-xl border-2 border-brick/40 bg-brick/5 px-4 py-3.5"
          >
            <HiOutlineExclamationTriangle size={20} className="mt-0.5 shrink-0 text-brick" />
            <div>
              <p className="font-body text-sm font-bold text-brick">
                {t("Le paiement n'a pas été enregistré")}
              </p>
              <p className="font-body text-xs text-ink-soft">{erreur}</p>
            </div>
          </div>
        )}

        <hr className="border-ivory-dark" />

        {/* ---------- SUIVI DE LA PROGRESSION DE PAIEMENT ---------- */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            <span className="flex items-center gap-1.5">
              <HiOutlineClock size={13} />{" "}
              {t("Progression du paiement")}
            </span>
            <span className="font-semibold text-ink">
              {t("{{moisPayer}} / {{dureeMois}} mois", { moisPayer, dureeMois })}
            </span>
          </div>
          <div
            className="mt-2.5 flex h-2 w-full overflow-hidden rounded-full bg-ivory-dark"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={dureeMois}
            aria-valuenow={moisPayer}
          >
            <div
              className="h-full bg-linear-to-r from-amber to-coral transition-all duration-500"
              style={{ width: `${pct(moisPayer)}%` }}
            />
            {moisEnAttente > 0 && (
              <div
                className="h-full bg-amber/50 transition-all duration-500"
                style={{ width: `${pct(moisEnAttente)}%` }}
              />
            )}
          </div>
          {moisEnAttente > 0 && (
            <p className="mt-1.5 font-body text-[11px] font-medium text-ink">
              {t("{{n}} mois en attente de validation", { n: moisEnAttente })}
            </p>
          )}
          <p className="mt-1.5 font-body text-[11px] text-ink-soft/80">
            {t(
              niveauModal.instruments.length > 1
                ? "{{v0}} × {{length}} instruments = {{total}} / mois"
                : "{{v0}} × {{length}} instrument = {{total}} / mois",
              {
                v0: formatAriary(niveauModal.montantMensuel),
                length: Math.max(1, niveauModal.instruments.length),
                total: formatAriary(montantMensuelAvecInstrument),
              },
            )}
          </p>
        </div>

        {moisRestant === 0 ? (
          <div className="px-6 pb-6">
            <hr className="mb-4 border-ivory-dark" />
            <p
              className={`flex items-center gap-2 rounded-xl px-4 py-3.5 font-body text-sm font-medium ${
                moisEnAttente > 0
                  ? "bg-amber/15 text-ink"
                  : "bg-coral/5 text-coral-dark"
              }`}
            >
              {moisEnAttente > 0 ? (
                <HiOutlineClock size={16} />
              ) : (
                <HiOutlineCheckCircle size={16} />
              )}{" "}
              {moisEnAttente > 0
                ? t("Tous les mois sont réglés ; certains attendent encore leur validation.")
                : t("Tous les mois de ce niveau sont payés.")}
            </p>
          </div>
        ) : (
          <>
            <hr className="border-ivory-dark" />

            {/* ---------- SÉLECTION DES MOIS ---------- */}
            <div className="px-6 py-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                {t("Mois restants ({{moisRestant}} / {{dureeMois}})", { moisRestant, dureeMois })}
              </p>
              <p className="mt-1 font-body text-[11px] text-ink-soft/80">
                {t("Les mois se paient dans l'ordre : sélectionner un mois inclut les mois précédents non payés.")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {moisRestants.map((nombreMois) => (
                  <button
                    key={nombreMois}
                    type="button"
                    onClick={() => toggleMois(nombreMois)}
                    aria-pressed={moisSelectionnes.includes(nombreMois)}
                    className={`rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                      moisSelectionnes.includes(nombreMois)
                        ? "border-coral bg-coral text-ivory"
                        : "border-ivory-dark text-ink-soft hover:border-coral hover:text-coral-dark"
                    }`}
                  >
                    {t("Mois {{nombreMois}}", { nombreMois })}
                  </button>
                ))}
              </div>
            </div>

            {/* ---------- MODE DE PAIEMENT ---------- */}
            {moisSelectionnes.length > 0 && (
              <>
                <hr className="border-ivory-dark" />
                <div className="px-6 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    {t("Mode de paiement")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[...modesMobileMoney, modeCarte].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMode(m.id);
                          setErreur(null);
                        }}
                        aria-pressed={mode === m.id}
                        className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                          mode === m.id
                            ? "border-coral bg-coral text-ivory"
                            : "border-ivory-dark text-ink-soft hover:border-coral hover:text-coral-dark"
                        }`}
                      >
                        {m.groupe === "carte" ? (
                          <HiOutlineCreditCard size={13} />
                        ) : (
                          <HiOutlineDevicePhoneMobile size={13} />
                        )}
                        {m.nom}
                      </button>
                    ))}
                  </div>

                  {paiementParCarte && (
                    <ChampsCarte champs={carte} idPrefix="carte-modal" />
                  )}
                </div>
              </>
            )}

            {/* ---------- TOTAL + VALIDATION ---------- */}
            {moisSelectionnes.length > 0 && (
              <>
                <hr className="border-ivory-dark" />
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-2xl bg-ivory-dark/30 px-6 py-4">
                  <p className="flex items-center gap-1.5 font-body text-sm text-ink">
                    <HiOutlineBanknotes size={16} />
                    {t("{{length}} mois × {{v0}} =", {
                      length: moisSelectionnes.length,
                      v0: formatAriary(montantMensuelAvecInstrument),
                    })}{" "}
                    <span className="font-semibold text-coral-dark">{formatAriary(total)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handlePayer}
                    disabled={!mode || enCours || !carte.valide}
                    aria-busy={enCours}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {enCours ? t("Traitement…") : t("Payer")}
                    {!enCours && (
                      <HiOutlineArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Styles par état pédagogique du niveau (le paiement est affiché à part).
const STYLE_CARTE = {
  non_commence: "border-dashed border-ivory-dark bg-ivory-dark/20",
  en_attente:
    "border-amber/50 bg-amber/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber/10",
  en_cours:
    "border-ivory-dark bg-white/70 dark:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10",
  examen_a_passer:
    "border-coral/50 bg-coral/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/10",
  resultat_attendu:
    "border-amber/50 bg-amber/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber/10",
  reussi:
    "border-coral/50 bg-coral/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/10",
  rattrapage:
    "border-brick/40 bg-brick/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10",
};

const STYLE_PASTILLE = {
  non_commence: "bg-ivory-dark text-ink-soft",
  en_attente: "bg-ink-soft text-ivory-dark animate-pulse",
  en_cours: "bg-amber text-ink",
  examen_a_passer: "bg-coral text-ivory ring-4 ring-coral/20",
  resultat_attendu: "bg-amber text-ink ring-4 ring-amber/20",
  reussi: "bg-coral text-ivory ring-4 ring-coral/20",
  rattrapage: "bg-brick text-ivory",
};

function FormationContent() {
  const { t } = useLang();
  const { levels } = useLevel();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription } = useUser();
  const { paiementList, fetchPaiement } = usePaiement();

  // Inscription dont le modal de paiement est ouvert (ou null). Les valeurs du modal
  // sont recalculées à chaque rendu à partir des données de l'API.
  const [inscriptionPaiementId, setInscriptionPaiementId] = useState(null);
  // Chargement (plein écran + erreur « Réessayer ») et envoi d'un paiement (spinner plein écran)
  const load = useAsyncAction({ initialPending: !!user, initialLabel: "Chargement du parcours" });
  const envoi = useAsyncAction();

  const charger = () => {
    if (!user) return;
    return load.run("Chargement du parcours", () => fetchUserListInscription(user.id));
  };

  useEffect(() => {
    charger();
  }, [user]);

  const handleConfirmPaiement = async (
    inscriptionId,
    total,
    nombreMois,
    mode,
    donneesCarte,
  ) => {
    // Le message d'erreur est affiché dans la fenêtre de paiement (qui reste ouverte) :
    // l'utilisateur peut y relancer le paiement.
    let resultat = { ok: false, message: t("Une erreur est survenue lors du paiement") };

    await envoi.run(
      "Envoi du paiement",
      async () => {
        await storePaiement(inscriptionId, {
          nombre_mois: nombreMois,
          montant: total,
          mode_paiement: mode,
          description: t("Paiement par tranche"),
          ...(mode === "carte" ? donneesCarte : {}),
        });
        resultat = { ok: true };
      },
      {
        onError: (err) => {
          resultat = {
            ok: false,
            message: err.response?.data?.message || t("Une erreur est survenue lors du paiement"),
          };
          return true;
        },
      },
    );

    // Un échec du rafraîchissement ne doit pas être présenté comme un échec du paiement.
    if (resultat.ok) {
      try {
        await fetchPaiement();
      } catch (err) {
        console.error("Rafraîchissement des paiements impossible", err);
      }
    }
    return resultat;
  };

  const inscritQuelquePart = userListInscription.length > 0;

  const niveaux = levels.map((niveau) => {
    const inscription =
      userListInscription.find((i) => i.niveau_id === niveau.id) ?? null;
    const dureeMois = parseDureeMois(inscription?.level?.duree ?? niveau.duree);
    const paiements = (paiementList ?? []).filter(
      (p) => p.inscription_id === inscription?.id,
    );
    const resume = resumePaiements(paiements, dureeMois);
    const progression = calculProgression(inscription?.date_debut, dureeMois);
    const examen = lireExamen(inscription);
    const etat = getEtatNiveau(inscription, progression, examen);
    const demarre = Boolean(inscription?.date_debut);
    const instruments = inscription?.instruments ?? [];

    // Inscription possible uniquement tant que l'élève n'est inscrit nulle part.
    const ouvertInscription =
      !inscritQuelquePart && (niveau.name === "initiation" || niveau.name === "avance");

    return {
      niveau,
      inscription,
      dureeMois,
      resume,
      progression,
      examen,
      etat,
      demarre,
      instruments,
      montantMensuel: (niveau.prix_mensuel ?? 0) * Math.max(1, instruments.length),
      ouvertInscription,
    };
  });

  const niveauxReussis = niveaux.filter((n) => n.etat === "reussi");
  const niveauCourant = niveaux.find((n) => n.inscription && n.etat !== "reussi");
  const parcoursComplet =
    niveaux.length > 0 && niveaux.every((n) => n.etat === "reussi");

  // ---------- Prochaine étape recommandée ----------
  let prochaine = null;
  if (niveauCourant) {
    const nom = capitalize(niveauCourant.niveau.name);
    const lien = `/eleve/formation/${niveauCourant.niveau.name}`;
    const modeles = {
      en_attente: {
        titre: t("Inscription en cours de validation"),
        texte: t("Ton niveau {{nom}} sera accessible dès que ton inscription sera validée.", { nom }),
      },
      en_cours: {
        titre: t("Continue ton niveau {{nom}}", { nom }),
        texte: t("Mois {{moisActuel}} sur {{dureeMois}}.", {
          moisActuel: niveauCourant.progression.moisActuel,
          dureeMois: niveauCourant.dureeMois,
        }),
        lien,
      },
      examen_a_passer: {
        titre: t("Prépare ton examen de passage"),
        texte: t("Tu as terminé la durée du niveau {{nom}}. Consulte les conditions et les consignes de l'examen.", { nom }),
        lien,
      },
      resultat_attendu: {
        titre: t("Ton résultat est en attente de publication"),
        texte: t("Ta copie a été remise. Le résultat apparaîtra dès sa publication officielle."),
        lien,
      },
      rattrapage: {
        titre: t("Prépare ton rattrapage"),
        texte: t("Tes progrès sont conservés. Consulte les commentaires de ton professeur pour te préparer."),
        lien,
      },
    };
    prochaine = modeles[niveauCourant.etat] ?? null;
  } else if (parcoursComplet) {
    prochaine = {
      titre: t("Parcours complété, bravo !"),
      texte: t("Tu as validé tous les niveaux de la formation."),
    };
  } else {
    const ouvert = niveaux.find((n) => n.ouvertInscription);
    if (ouvert) {
      prochaine = {
        titre: t("Choisis ton niveau de départ"),
        texte: t("Tu n'es encore inscrit à aucun niveau."),
        lien: `/inscription?niveau=${ouvert.niveau.name}`,
        libelleLien: t("S'inscrire à ce niveau"),
      };
    }
  }

  const peutPayer = niveauCourant?.demarre && niveauCourant.resume.moisRestants > 0;

  // Niveau dont le modal est ouvert, recalculé depuis les données fraîches.
  const niveauModalSource = niveaux.find(
    (n) => n.inscription?.id === inscriptionPaiementId,
  );
  const niveauModal = niveauModalSource
    ? {
        inscriptionId: niveauModalSource.inscription.id,
        nom: niveauModalSource.niveau.name,
        dureeMois: niveauModalSource.dureeMois,
        montantMensuel: niveauModalSource.niveau.prix_mensuel ?? 0,
        moisPayer: niveauModalSource.resume.moisValides,
        moisEnAttente: niveauModalSource.resume.moisEnAttente,
        moisRestant: niveauModalSource.resume.moisRestants,
        instruments: niveauModalSource.instruments,
      }
    : null;

  const ouvrirPaiement = (n) => setInscriptionPaiementId(n.inscription.id);

  return (
    <div className="space-y-10">
      <ActionFeedback action={envoi} />
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          {t("Formation")}
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("Mon parcours")}
        </h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          {t("Ta progression à travers les 4 niveaux de la formation, de l'initiation jusqu'au niveau avancé.")}
        </p>
      </AnimatedSection>

      {load.pending || load.error ? (
        <ActionFeedback action={load} variant="fetch" />
      ) : levels.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
          {t("Aucun niveau disponible pour le moment.")}
        </p>
      ) : (
        <>
          {/* ---------- PROCHAINE ÉTAPE ---------- */}
          {prochaine && (
            <AnimatedSection className="rounded-2xl border border-coral/30 bg-coral/5 p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-coral-dark">
                {t("Prochaine étape")}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
                {prochaine.titre}
              </h3>
              <p className="mt-1 max-w-2xl font-body text-sm text-ink-soft">
                {prochaine.texte}
              </p>
              {(prochaine.lien || peutPayer) && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {prochaine.lien && (
                    <Link
                      to={prochaine.lien}
                      className="group inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick"
                    >
                      {prochaine.libelleLien ||
                        t(LIBELLE_ACTION_NIVEAU[niveauCourant?.etat] || "Voir le détail de ma formation")}
                      <HiOutlineArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                  {peutPayer && (
                    <button
                      type="button"
                      onClick={() => ouvrirPaiement(niveauCourant)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ivory-dark bg-white/70 px-4 py-2 font-body text-sm font-semibold text-ink transition-colors hover:border-coral/40 hover:text-coral-dark dark:bg-white/10"
                    >
                      {t("Payer {{moisRestant}} mois", {
                        moisRestant: niveauCourant.resume.moisRestants,
                      })}
                    </button>
                  )}
                </div>
              )}
            </AnimatedSection>
          )}

          {/* ---------- STATS ---------- */}
          <section className="grid gap-5 sm:grid-cols-3">
            <StatCard
              icon={HiOutlineAcademicCap}
              label={t("Niveaux terminés")}
              value={`${niveauxReussis.length} / ${levels.length}`}
            />
            <StatCard
              icon={HiOutlineClock}
              label={t("Niveau en cours")}
              value={
                niveauCourant && niveauCourant.demarre
                  ? capitalize(niveauCourant.niveau.name)
                  : t("Aucun")
              }
              delay={80}
            />
            <StatCard
              icon={HiOutlineMusicalNote}
              label={t("Niveaux avec inscription")}
              value={userListInscription.length}
              delay={160}
            />
          </section>

          {/* ---------- PARCOURS ---------- */}
          <section className="relative">
            <div
              className="absolute bottom-6 left-6 top-6 w-px bg-ivory-dark sm:left-7"
              aria-hidden="true"
            />

            <div className="space-y-5">
              {niveaux.map((n, i) => {
                const meta = ETATS_NIVEAU[n.etat];
                const { resume } = n;
                const lienAction = `/eleve/formation/${n.niveau.name}`;
                const pctPaye =
                  n.dureeMois > 0
                    ? Math.min(100, Math.round((resume.moisValides / n.dureeMois) * 100))
                    : 0;
                const pctAttente =
                  n.dureeMois > 0
                    ? Math.min(100 - pctPaye, Math.round((resume.moisEnAttente / n.dureeMois) * 100))
                    : 0;

                return (
                  <AnimatedSection
                    key={n.niveau.id}
                    delay={i * 90}
                    className="relative flex gap-4 sm:gap-5"
                  >
                    {/* pastille d'étape */}
                    <div
                      className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-ivory font-display text-sm font-semibold shadow-md transition-all duration-300 sm:h-14 sm:w-14 ${STYLE_PASTILLE[n.etat]}`}
                    >
                      {n.etat === "reussi" ? (
                        <HiOutlineCheckCircle size={20} />
                      ) : n.etat === "non_commence" || n.etat === "en_attente" ? (
                        <HiOutlineLockClosed size={17} />
                      ) : (
                        n.niveau.id
                      )}
                    </div>

                    {/* carte niveau */}
                    <div
                      className={`flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${STYLE_CARTE[n.etat]}`}
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
                        {/* ---------- Colonne gauche : détails du niveau ---------- */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-semibold text-ink">
                              {capitalize(n.niveau.name)}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${meta.badge}`}
                            >
                              {t(meta.label)}
                            </span>
                          </div>
                          <p className="mt-1 font-body text-sm text-ink-soft">
                            {t(n.niveau.description)}
                          </p>
                          <p className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                            <HiOutlineClock size={13} />{" "}
                            {t("Durée : {{duree}}", { duree: n.niveau.duree })}
                            {n.demarre && (
                              <span className="ml-2">
                                {t("· Inscrit le {{v0}}", {
                                  v0: formatDate(n.inscription.date_debut),
                                })}
                              </span>
                            )}
                          </p>

                          {/* Avancement dans le temps */}
                          {n.demarre && (
                            <div className="mt-3 max-w-sm">
                              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                                <span>
                                  {t("Mois {{moisActuel}} sur {{dureeMois}}", {
                                    moisActuel: n.progression.moisActuel,
                                    dureeMois: n.dureeMois,
                                  })}
                                </span>
                                <span className="font-semibold text-ink">
                                  {Math.round(n.progression.avancement)}%
                                </span>
                              </div>
                              <div
                                className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ivory-dark"
                                role="progressbar"
                                aria-label={t("Progression du niveau")}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(n.progression.avancement)}
                              >
                                <div
                                  className="h-full rounded-full bg-coral transition-all duration-500"
                                  style={{ width: `${n.progression.avancement}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Action principale selon l'état */}
                          {n.demarre ? (
                            <Link
                              to={lienAction}
                              className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors duration-300 hover:text-brick"
                            >
                              {t(LIBELLE_ACTION_NIVEAU[n.etat])}
                              <HiOutlineArrowRight
                                size={14}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </Link>
                          ) : n.etat === "en_attente" ? (
                            <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-soft/70">
                              <HiOutlineLockClosed size={14} />
                              {t("En attente de validation")}
                            </span>
                          ) : n.ouvertInscription ? (
                            <Link
                              to={`/inscription?niveau=${n.niveau.name}`}
                              className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:text-coral-dark"
                            >
                              {t("S'inscrire à ce niveau")}
                              <HiOutlineArrowRight
                                size={14}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </Link>
                          ) : (
                            <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-soft/70">
                              <HiOutlineLockClosed size={14} />
                              {t("Termine le niveau précédent pour débloquer l'inscription")}
                            </span>
                          )}
                        </div>

                        {/* ---------- Colonne droite : paiement ---------- */}
                        {n.demarre && (
                          <div className="flex flex-col justify-center gap-2.5 border-t border-ivory-dark/60 pt-4 lg:w-60 lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                              <span>{t("Paiement")}</span>
                              <span className="font-semibold text-ink">
                                {t("{{moisPayer}} / {{duree}} mois", {
                                  moisPayer: resume.moisValides,
                                  duree: n.dureeMois,
                                })}
                              </span>
                            </div>

                            <div
                              className="flex h-1.5 w-full overflow-hidden rounded-full bg-ivory-dark"
                              role="progressbar"
                              aria-label={t("Progression du paiement")}
                              aria-valuemin={0}
                              aria-valuemax={n.dureeMois}
                              aria-valuenow={resume.moisValides}
                            >
                              <div
                                className="h-full bg-linear-to-r from-amber to-coral transition-all duration-500"
                                style={{ width: `${pctPaye}%` }}
                              />
                              {pctAttente > 0 && (
                                <div
                                  className="h-full bg-amber/50 transition-all duration-500"
                                  style={{ width: `${pctAttente}%` }}
                                />
                              )}
                            </div>

                            {resume.moisEnAttente > 0 && (
                              <p className="font-body text-[11px] font-medium text-ink">
                                {t("{{n}} mois en attente de validation", {
                                  n: resume.moisEnAttente,
                                })}
                              </p>
                            )}

                            {resume.moisRestants > 0 ? (
                              <>
                                <p className="font-body text-xs text-ink-soft">
                                  {t(
                                    resume.moisRestants > 1
                                      ? "{{v0}} Ar × {{moisRestant}} mois restants"
                                      : "{{v0}} Ar × {{moisRestant}} mois restant",
                                    {
                                      v0: n.montantMensuel.toLocaleString("fr-MG"),
                                      moisRestant: resume.moisRestants,
                                    },
                                  )}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => ouvrirPaiement(n)}
                                  className="group mt-0.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-xs font-semibold text-ivory shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brick hover:shadow-md"
                                >
                                  {t("Payer {{moisRestant}} mois", {
                                    moisRestant: resume.moisRestants,
                                  })}
                                  <HiOutlineArrowRight
                                    size={13}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                  />
                                </button>
                              </>
                            ) : resume.moisEnAttente > 0 ? (
                              <span className="mt-0.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-amber/20 px-4 py-2 font-body text-xs font-semibold text-ink">
                                <HiOutlineClock size={13} />{" "}
                                {t("Validation en cours")}
                              </span>
                            ) : (
                              <span className="mt-0.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-coral/10 px-4 py-2 font-body text-xs font-semibold text-coral-dark">
                                <HiOutlineCheckCircle size={13} />{" "}
                                {t("Paiement à jour")}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </section>
        </>
      )}

      {niveauModal && (
        <ModalPaiementNiveau
          niveauModal={niveauModal}
          onClose={() => setInscriptionPaiementId(null)}
          onConfirmerPaiement={(total, nombreMois, mode, donneesCarte) =>
            handleConfirmPaiement(
              niveauModal.inscriptionId,
              total,
              nombreMois,
              mode,
              donneesCarte,
            )
          }
        />
      )}
    </div>
  );
}

export default function Formation() {
  const niveaux = useLevel();
  const paiements = usePaiement();

  return (
    <DataGate
      sources={[
        {
          label: "Chargement des niveaux",
          loading: niveaux.loading,
          error: niveaux.error,
          retry: niveaux.fecthLevels,
        },
        {
          label: "Chargement des paiements",
          loading: paiements.loading,
          error: paiements.error,
          retry: paiements.fetchPaiement,
        },
      ]}
    >
      <FormationContent />
    </DataGate>
  );
}
