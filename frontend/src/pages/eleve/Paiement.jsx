import { useEffect, useState } from "react";
import {
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineDevicePhoneMobile,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
} from "../../lib/icons";
import { HiOutlineExclamationTriangle, HiOutlineArrowPath } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ChampsCarte, { useChampsCarte } from "../../components/ChampsCarte";
import { MODES_PAIEMENT } from "../../lib/mockFormationData";
import { useLevel } from "../../app/hooks/useLevel";
import { useAuth } from "../../app/hooks/useAuth";
import { useUser } from "../../app/hooks/useUser";
import usePaiement from "../../app/hooks/usePaiement";
import { storePaiement } from "../../app/api/paiementApi";
import { capitalize, formatAriary, formatDate } from "../../lib/formatFunction";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback, DataGate } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";
import { parseDureeMois, resumePaiements, statutPaiement } from "../../lib/parcoursUtils";

const MODES_MOBILE_MONEY = MODES_PAIEMENT.filter((m) => m.groupe === "mobile_money");
const MODE_CARTE = MODES_PAIEMENT.find((m) => m.groupe === "carte");

const BADGE_STATUT = {
  valide: { label: "Validé", classe: "bg-coral/15 text-coral-dark" },
  en_attente: { label: "En attente de validation", classe: "bg-amber/20 text-ink" },
  refuse: { label: "Refusé", classe: "bg-brick/10 text-brick" },
};

// Carte de règlement d'un niveau. Le succès n'est affiché qu'après confirmation
// effective de l'API ; en cas d'échec, la sélection est conservée pour réessayer.
function CarteNiveauPaiement({ item, delay, onPayer }) {
  const { t } = useLang();
  const { inscription, niveau, dureeMois, resume, montantMensuel, instruments } = item;

  const [mois, setMois] = useState([]);
  const [mode, setMode] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const [resultat, setResultat] = useState(null); // { ok, message }
  const carte = useChampsCarte(mode === MODE_CARTE?.id);

  // Les mois à payer suivent les mois validés ET ceux en attente de validation.
  const moisRestants = Array.from(
    { length: resume.moisRestants },
    (_, idx) => resume.moisValides + resume.moisEnAttente + idx + 1,
  );
  const total = mois.length * montantMensuel;

  // Règle : l'écolage se paie mois par mois, dans l'ordre. Sélectionner un mois inclut
  // les précédents ; désélectionner retire aussi les suivants (jamais de « trou »).
  function toggleMois(m) {
    setResultat(null);
    setMois((prev) =>
      prev.includes(m) ? prev.filter((x) => x < m) : moisRestants.slice(0, moisRestants.indexOf(m) + 1),
    );
  }

  async function handlePayer() {
    if (enCours || mois.length === 0 || !mode || !carte.valide) return;
    setEnCours(true);
    setResultat(null);
    const r = await onPayer(inscription.id, {
      nombre_mois: mois.length,
      montant: total,
      mode_paiement: mode,
      description: t("Paiement par tranche"),
      ...(mode === MODE_CARTE?.id ? carte.donnees() : {}),
    });
    setEnCours(false);
    setResultat(r);
    if (r.ok) {
      setMois([]);
      setMode(null);
      carte.reset();
    }
  }

  return (
    <AnimatedSection delay={delay} className="rounded-2xl border border-ivory-dark bg-white/70 p-6 dark:bg-white/10">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-lg font-semibold text-ink">{capitalize(niveau.name)}</h3>
        <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft">
          <HiOutlineClock size={13} /> {t("Durée totale : {{dureeMois}} mois", { dureeMois })}
        </span>
        <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
          {t("{{v0}} Ar / mois", { v0: montantMensuel.toLocaleString("fr-MG") })}
        </span>
      </div>

      {resume.moisEnAttente > 0 && (
        <p className="mt-2 flex items-center gap-1.5 font-body text-xs font-medium text-ink">
          <HiOutlineClock size={14} />
          {t("{{n}} mois en attente de validation", { n: resume.moisEnAttente })}
        </p>
      )}

      <div aria-live="polite">
        {resultat?.ok && (
          <p className="mt-2 flex items-center gap-1.5 font-body text-xs font-medium text-coral-dark">
            <HiOutlineCheckCircle size={14} /> {t("Paiement enregistré")} —{" "}
            {t("Son statut est visible dans l'historique de tes paiements.")}
          </p>
        )}
        {resultat && !resultat.ok && (
          <p role="alert" className="mt-2 flex items-start gap-1.5 font-body text-xs font-medium text-brick">
            <HiOutlineExclamationTriangle size={14} className="mt-0.5 shrink-0" />
            {t("Le paiement n'a pas été enregistré")} — {resultat.message}
          </p>
        )}
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {t("Mois restants à payer ({{length}} / {{dureeMois}})", { length: moisRestants.length, dureeMois })}
      </p>
      <p className="mt-1 font-body text-[11px] text-ink-soft/80">
        {t("Les mois se paient dans l'ordre : sélectionner un mois inclut automatiquement les mois précédents non payés.")}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {moisRestants.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => toggleMois(m)}
            aria-pressed={mois.includes(m)}
            className={`rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
              mois.includes(m)
                ? "border-coral bg-coral text-ivory"
                : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
            }`}
          >
            {t("Mois {{m}}", { m })}
          </button>
        ))}
      </div>

      {mois.length > 0 && (
        <>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{t("Mode de paiement")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[...MODES_MOBILE_MONEY, MODE_CARTE].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setMode(m.id);
                  setResultat(null);
                }}
                aria-pressed={mode === m.id}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                  mode === m.id
                    ? "border-coral bg-coral text-ivory"
                    : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
                }`}
              >
                {m.groupe === "carte" ? <HiOutlineCreditCard size={13} /> : <HiOutlineDevicePhoneMobile size={13} />}
                {m.nom}
              </button>
            ))}
          </div>

          {mode === MODE_CARTE?.id && <ChampsCarte champs={carte} idPrefix={`carte-${inscription.id}`} />}

          {/* Récapitulatif — pas de droit d'inscription, déjà réglé au premier paiement */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ivory-dark/30 px-4 py-3">
            <p className="flex items-center gap-1.5 font-body text-sm text-ink">
              <HiOutlineBanknotes size={16} />
              {t("{{length}} mois × {{v0}} Ar =", { length: mois.length, v0: montantMensuel.toLocaleString("fr-MG") })}{" "}
              <span className="font-semibold text-coral-dark">{t("{{v0}} Ar", { v0: total.toLocaleString("fr-MG") })}</span>
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
                <HiOutlineArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          </div>
        </>
      )}
      {instruments.length > 1 && (
        <p className="mt-3 font-body text-[11px] text-ink-soft/80">
          {t("{{v0}} × {{length}} instruments = {{total}} / mois", {
            v0: formatAriary(niveau.prix_mensuel ?? 0),
            length: instruments.length,
            total: formatAriary(montantMensuel),
          })}
        </p>
      )}
    </AnimatedSection>
  );
}

function PaiementContent() {
  const { t } = useLang();
  const { levels } = useLevel();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription } = useUser();
  const { paiementList, fetchPaiement } = usePaiement();

  // Chargement (plein écran + erreur « Réessayer ») et envoi d'un paiement (spinner plein écran)
  const load = useAsyncAction({ initialPending: !!user, initialLabel: "Chargement des paiements" });
  const envoi = useAsyncAction();

  const charger = () => {
    if (!user) return;
    return load.run("Chargement des paiements", () => Promise.all([fetchUserListInscription(user.id), fetchPaiement()]));
  };

  useEffect(() => {
    charger();
  }, [user]);

  // Appel réel à l'API. Jamais de succès simulé : { ok: true } uniquement si l'API a répondu.
  async function envoyerPaiement(inscriptionId, payload) {
    // Le message d'erreur est affiché dans la fenêtre de paiement (qui reste ouverte) :
    // l'utilisateur peut y relancer le paiement.
    let resultat = { ok: false, message: t("Une erreur est survenue lors du paiement") };

    await envoi.run(
      "Envoi du paiement",
      async () => {
        await storePaiement(inscriptionId, payload);
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
  }

  // Inscriptions démarrées, avec leur résumé de paiement.
  const items = userListInscription
    .filter((i) => i.date_debut)
    .map((inscription) => {
      const niveau =
        levels.find((l) => l.id === inscription.niveau_id) ?? inscription.level ?? {};
      const dureeMois = parseDureeMois(inscription.level?.duree ?? niveau.duree);
      const paiements = (paiementList ?? []).filter((p) => p.inscription_id === inscription.id);
      const instruments = inscription.instruments ?? [];
      return {
        inscription,
        niveau,
        dureeMois,
        resume: resumePaiements(paiements, dureeMois),
        instruments,
        montantMensuel: (niveau.prix_mensuel ?? 0) * Math.max(1, instruments.length),
      };
    });

  const aRegler = items.filter((i) => i.resume.moisRestants > 0);
  const moisEnAttenteTotal = items.reduce((s, i) => s + i.resume.moisEnAttente, 0);

  // Historique : tous les paiements de l'élève, du plus récent au plus ancien.
  const niveauParInscription = new Map(
    userListInscription.map((i) => [i.id, i.level?.name ?? ""]),
  );
  const historique = (paiementList ?? [])
    .filter((p) => niveauParInscription.has(p.inscription_id))
    .sort(
      (a, b) =>
        new Date(b.created_at ?? b.date_paiement ?? 0) - new Date(a.created_at ?? a.date_paiement ?? 0),
    );

  return (
    <div className="space-y-10">
      <ActionFeedback action={envoi} />
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Paiement")}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Mes paiements")}</h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">
          {t("Règle les mois restants de tes niveaux en cours, un ou plusieurs mois à la fois.")}
        </p>
      </AnimatedSection>

      {load.pending || load.error ? (
        <ActionFeedback action={load} variant="fetch" />
      ) : (
        <>
          {items.length === 0 ? (
            <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark bg-ivory-dark/20 p-8 text-center">
              <p className="font-body text-sm text-ink-soft">
                {t("Aucun niveau en cours : tes paiements apparaîtront ici dès l'activation de ton inscription.")}
              </p>
            </AnimatedSection>
          ) : aRegler.length === 0 ? (
            <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark bg-ivory-dark/20 p-8 text-center">
              {moisEnAttenteTotal > 0 ? (
                <>
                  <HiOutlineClock className="mx-auto text-ink-soft" size={32} />
                  <p className="mt-2 font-body text-sm text-ink-soft">
                    {t("Tous les mois sont réglés ; {{n}} mois attendent encore leur validation.", { n: moisEnAttenteTotal })}
                  </p>
                </>
              ) : (
                <>
                  <HiOutlineCheckCircle className="mx-auto text-coral-dark" size={32} />
                  <p className="mt-2 font-body text-sm text-ink-soft">{t("Tous tes paiements sont à jour. 🎉")}</p>
                </>
              )}
            </AnimatedSection>
          ) : (
            <div className="space-y-6">
              {aRegler.map((item, i) => (
                <CarteNiveauPaiement
                  key={item.inscription.id}
                  item={item}
                  delay={i * 90}
                  onPayer={envoyerPaiement}
                />
              ))}
            </div>
          )}

          {/* ---------- HISTORIQUE ---------- */}
          <section>
            <AnimatedSection>
              <h3 className="mb-4 font-display text-lg font-semibold text-ink">{t("Historique des paiements")}</h3>
            </AnimatedSection>
            {historique.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ivory-dark p-6 text-center font-body text-sm text-ink-soft">
                {t("Aucun paiement enregistré pour le moment.")}
              </p>
            ) : (
              <ul className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10">
                {historique.map((p) => {
                  const statut = statutPaiement(p);
                  const badge = BADGE_STATUT[statut];
                  const mode = MODES_PAIEMENT.find((m) => m.id === p.mode_paiement)?.nom ?? p.mode_paiement;
                  const nombre = parseInt(p.nombre_mois, 10) || 0;
                  return (
                    <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-3.5">
                      <div className="min-w-[8rem] flex-1">
                        <p className="font-body text-sm font-semibold text-ink">
                          {capitalize(niveauParInscription.get(p.inscription_id))}
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                          {formatDate(p.created_at ?? p.date_paiement)}
                          {nombre > 0 && ` · ${t("{{n}} mois", { n: nombre })}`}
                          {mode && ` · ${mode}`}
                        </p>
                        {p.reference && (
                          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft/80">
                            {t("Réf. {{ref}}", { ref: p.reference })}
                          </p>
                        )}
                      </div>
                      {p.montant != null && (
                        <span className="font-body text-sm font-semibold text-ink">{formatAriary(p.montant)}</span>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${badge.classe}`}
                      >
                        {t(badge.label)}
                      </span>
                      {statut === "valide" && p.recu_url && (
                        <a
                          href={p.recu_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-body text-xs font-semibold text-coral-dark hover:text-brick"
                        >
                          {t("Reçu")}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default function Paiement() {
  const niveaux = useLevel();

  return (
    <DataGate
      sources={[
        {
          label: "Chargement des niveaux",
          loading: niveaux.loading,
          error: niveaux.error,
          retry: niveaux.fecthLevels,
        },
      ]}
    >
      <PaiementContent />
    </DataGate>
  );
}
