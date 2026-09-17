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
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import StatCard from "../../components/StatCard";
import { NIVEAUX_PARCOURS, MODES_PAIEMENT } from "../../lib/mockFormationData";
import { useLevel } from "../../app/hooks/useLevel";
import { useEffect, useState } from "react";
import { useAuth } from "../../app/hooks/useAuth";
import { capitalize, formatDate } from "../../lib/formatFunction";
import { useUser } from "../../app/hooks/useUser";
import usePaiement from "../../app/hooks/usePaiement";
import { storePaiement } from "../../app/api/paiementApi";
import { Guitar } from "../../lib/icons";

// Modal de paiement pour un niveau donné, ouvert depuis la liste des niveaux.
// Reprend la logique de eleve/paiement.jsx (sélection de mois + mode de paiement)
// avec une règle en plus : les mois doivent être payés successivement.
function ModalPaiementNiveau({
  niveauModal,
  moisPayer,
  moisRestant,
  onClose,
  onConfirmerPaiement,
}) {
  const [moisSelectionnes, setMoisSelectionnes] = useState([]);
  const [mode, setMode] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const [confirme, setConfirme] = useState(false);
  // const [moisRestants, setMoisRestants] = useState([]);

  // Expliquer

  // moisPayer et moisRestant sont désormais des nombres (ex. moisPayer = 3
  // signifie que les mois 1, 2 et 3 sont payés, successivement).
  // Les mois restants sont donc simplement les mois moisPayer+1 à dureeMois.
  const moisRestants = Array.from(
    { length: moisRestant },
    (_, idx) => moisPayer + idx + 1,
  );

  // const moisRest = Array.from(
  //   { length: moisRestant },
  //   (_, idx) => moisPayer + idx + 1,
  // );

  // setMoisRestants(moisRest);

  console.log("moisRestants : ", moisRestants);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Même règle de succession que dans Paiement.jsx : cliquer sur un mois
  // sélectionne aussi tous les mois restants qui le précèdent ; le désélectionner
  // retire aussi ceux qui le suivent dans la sélection en cours.
  function toggleMois(mois) {
    setMoisSelectionnes((prev) => {
      if (prev.includes(mois)) return prev.filter((m) => m < mois);
      const index = moisRestants.indexOf(mois);
      return moisRestants.slice(0, index + 1);
    });
  }

  const total = moisSelectionnes.length * niveauModal.montantMensuel;

  const modesMobileMoney = MODES_PAIEMENT.filter(
    (m) => m.groupe === "mobile_money",
  );

  const modeCarte = MODES_PAIEMENT.find((m) => m.groupe === "carte");

  // A expliquer
  async function handlePayer() {
    if (moisSelectionnes.length === 0 || !mode) return;
    setEnCours(true);
    await onConfirmerPaiement(total, moisSelectionnes.length, mode);
    setEnCours(false);
    setMoisSelectionnes([]);
    setMode(null);
    setConfirme(true);
    setTimeout(() => setConfirme(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-ivory-dark bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
              Paiement
            </span>
            <h3 className="mt-1 font-display text-lg font-semibold text-ink">
              {capitalize(niveauModal.nom)}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-ink-soft transition-colors duration-200 hover:bg-ivory-dark/50 hover:text-ink"
            aria-label="Fermer"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          <HiOutlineClock size={13} /> {moisPayer} / {niveauModal.dureeMois}{" "}
          mois payés · {niveauModal.montantMensuel.toLocaleString("fr-MG")} Ar /
          mois
        </p>

        {confirme && (
          <p className="mt-2 flex items-center gap-1.5 font-body text-xs font-medium text-coral-dark">
            <HiOutlineCheckCircle size={14} /> Paiement enregistré.
          </p>
        )}

        {moisRestant === 0 ? (
          <p className="mt-4 font-body text-sm text-ink-soft">
            Tous les mois de ce niveau sont payés.
          </p>
        ) : (
          <>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              Mois restants ({moisRestant} / {niveauModal.dureeMois})
            </p>
            <p className="mt-1 font-body text-[11px] text-ink-soft/80">
              Les mois se paient dans l'ordre : sélectionner un mois inclut les
              mois précédents non payés.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {moisRestants.map((nombreMois) => (
                <button
                  key={nombreMois}
                  type="button"
                  onClick={() => toggleMois(nombreMois)}
                  className={`rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                    moisSelectionnes.includes(nombreMois)
                      ? "border-coral bg-coral text-ivory"
                      : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
                  }`}
                >
                  Mois {nombreMois}
                </button>
              ))}
            </div>

            {moisSelectionnes.length > 0 && (
              <>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Mode de paiement
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[...modesMobileMoney, modeCarte].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                        mode === m.id
                          ? "border-coral bg-coral text-ivory"
                          : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
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

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ivory-dark/30 px-4 py-3">
                  <p className="flex items-center gap-1.5 font-body text-sm text-ink">
                    <HiOutlineBanknotes size={16} />
                    {moisSelectionnes.length} mois ×{" "}
                    {niveauModal.montantMensuel.toLocaleString("fr-MG")} Ar ={" "}
                    <span className="font-semibold text-coral-dark">
                      {total.toLocaleString("fr-MG")} Ar
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={handlePayer}
                    disabled={!mode || enCours}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick disabled:opacity-60"
                  >
                    {enCours ? "Traitement…" : "Payer"}
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

const NIVEAUX_TERMINES = NIVEAUX_PARCOURS.filter(
  (n) => n.inscrit && n.progression >= 100,
).length;
const NIVEAU_ACTUEL = NIVEAUX_PARCOURS.find(
  (n) => n.inscrit && n.progression < 100,
);

export default function Formation() {
  const { levels } = useLevel();
  const { user } = useAuth();
  const { userListInscription, fetchUserListInscription } = useUser();
  const { paiementList, fetchPaiement } = usePaiement();

  // Niveau pour lequel le modal de paiement est ouvert (objet fusionné
  // id / nom / dureeMois / montantMensuel), ou null si fermé.
  const [niveauPaiementOuvert, setNiveauPaiementOuvert] = useState(null);

  useEffect(() => {
    fetchUserListInscription(user.id);
  }, [user]);

  const handleConfirmPaiement = async (
    inscriptionId,
    total,
    moisSelectionnes,
    mode,
  ) => {
    try {
      const data = {
        nombre_mois: moisSelectionnes,
        montant: total,
        mode_paiement: mode,
      };

      console.log("inscriptionId : ", inscriptionId);
      console.log("data : ", data);

      const response = await storePaiement(inscriptionId, data);
      console.log("Paiement effectué avec succès : ", response.data);

      await fetchPaiement();

      // Mise à jour immédiate du modal
      /*
      setNiveauPaiementOuvert((prev) => ({
        ...prev,
        moisPayer: prev.moisPayer + moisSelectionnes,
        moisRestant: prev.moisRestant - moisSelectionnes,
      }));
      */
      // Même résultat
      setNiveauPaiementOuvert({
        inscriptionId: niveauPaiementOuvert.inscriptionId,
        nom: niveauPaiementOuvert.nom,
        dureeMois: niveauPaiementOuvert.dureeMois,
        montantMensuel: niveauPaiementOuvert.montantMensuel,
        moisPayer: niveauPaiementOuvert.moisPayer + moisSelectionnes,
        moisRestant: niveauPaiementOuvert.moisRestant - moisSelectionnes,
      });
    } catch (err) {
      console.error("Erreur lors du paiement", err.response?.data);
      setErreur("Une erreur est survenue lors du paiement");
    }
  };

  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Formation
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Mon parcours
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">
          Ta progression à travers les 4 niveaux de la formation Kalon'ny, de
          l'initiation jusqu'au niveau avancé.
        </p>
      </AnimatedSection>

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-4">
        <StatCard
          icon={HiOutlineAcademicCap}
          label="Niveaux terminés"
          value={`${NIVEAUX_TERMINES} / ${NIVEAUX_PARCOURS.length}`}
        />
        <StatCard
          icon={HiOutlineClock}
          label="Niveau en cours"
          value={NIVEAU_ACTUEL ? NIVEAU_ACTUEL.nom : "Aucun"}
          delay={80}
        />
        <StatCard
          icon={HiOutlineMusicalNote}
          label="Niveaux avec inscription"
          value={userListInscription.length}
          delay={160}
        />
        <StatCard
          icon={Guitar}
          label="Instrument à apprendre"
          value={null}
          delay={160}
        />
      </section>

      {/* ---------- PARCOURS ---------- */}
      <section className="relative">
        {/* ligne verticale reliant les cartes */}
        <div
          className="absolute left-6 top-6 bottom-6 w-px bg-ivory-dark sm:left-7"
          aria-hidden="true"
        />

        <div className="space-y-5">
          {levels.map((n, i) => {
            const inscription = userListInscription.find(
              (inscription) => inscription.niveau_id === n.id,
            );
            const inscrit = inscription;

            console.log("inscription : ", inscription);

            let paiementNiveau;
            let moisPayer;
            let moisRestant;

            if (inscription) {
              paiementNiveau = paiementList.filter(
                (pl) => pl.inscription_id === inscription.id,
              );

              // reduce : permet de parcourir un tableau et de donner un résultat finale en une seul valeur => ici somme des nombre de mois
              // somme : stocke les éléments parcourus => ici nombre_mois
              moisPayer = paiementNiveau.reduce(
                (somme, paiement) => somme + parseInt(paiement.nombre_mois),
                0,
              );

              moisRestant =
                parseInt(inscription.level.duree.split(" ")[0]) - moisPayer;
            }

            return (
              <>
                <AnimatedSection
                  key={n.id}
                  delay={i * 90}
                  className="relative flex gap-4 sm:gap-5"
                >
                  {/* pastille d'étape */}
                  {/* <div
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-ivory font-display text-sm font-semibold shadow-md sm:h-14 sm:w-14 ${
                    termine
                      ? "bg-coral text-ivory"
                      : enCours
                        ? "bg-amber text-ink"
                        : "bg-ivory-dark text-ink-soft"
                  }`}
                >
                  {termine ? (
                    <HiOutlineCheckCircle size={20} />
                  ) : n.inscrit ? (
                    n.ordre
                  ) : (
                    <HiOutlineLockClosed size={17} />
                  )}
                </div> */}
                  <div
                    className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-ivory font-display text-sm font-semibold shadow-md sm:h-14 sm:w-14 ${
                      inscrit
                        ? "bg-amber text-ink"
                        : "bg-ivory-dark text-ink-soft"
                    }`}
                  >
                    {inscrit ? n.id : <HiOutlineLockClosed size={17} />}
                  </div>

                  {/* carte niveau */}
                  <div
                    className={`flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                      inscrit
                        ? "border-ivory-dark bg-white/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10"
                        : "border-dashed border-ivory-dark bg-ivory-dark/20"
                    }`}
                  >
                    <div
                      className={`flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                        inscrit
                          ? "border-ivory-dark bg-white/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brick/10"
                          : "border-dashed border-ivory-dark bg-ivory-dark/20"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-lg font-semibold text-ink">
                              {capitalize(n.name)}
                            </h3>
                            {/* Bloc pour présenter l'état du niveau : termine / enCours / aucunDesDeux */}
                            {/* <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                            termine
                              ? "bg-coral/10 text-coral-dark"
                              : enCours
                                ? "bg-amber/20 text-ink"
                                : "bg-ivory-dark text-ink-soft"
                          }`}
                        > */}
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide bg-coral/10 text-coral-dark`}
                            >
                              {/* {termine ? "Terminé" : enCours ? "En cours" : "Non commencé"} */}
                              "Terminé" / "En cours" / "Non commencé"
                            </span>
                          </div>
                          <p className="mt-1 font-body text-sm text-ink-soft">
                            {n.description}
                          </p>
                          <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                            <HiOutlineClock size={13} /> Durée : {n.duree}
                            {inscription && (
                              <span className="ml-2">
                                · Inscrit le{" "}
                                {formatDate(inscription.created_at)}{" "}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {inscrit ? (
                        <Link
                          to={`/eleve/formation/${n.name}`}
                          className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark transition-colors duration-300 hover:text-brick"
                        >
                          Voir le détail de ma formation
                          <HiOutlineArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      ) : n.id === 1 || n.id === 4 ? (
                        <Link
                          to={`/inscription?niveau=${n.name}`}
                          className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:text-coral-dark"
                        >
                          S'inscrire à ce niveau
                          <HiOutlineArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      ) : (
                        <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-soft/70">
                          <HiOutlineLockClosed size={14} />
                          Termine le niveau précédent pour débloquer
                          l'inscription
                        </span>
                      )}

                      {/* Statut de paiement du niveau + lien discret vers le modal de paiement */}
                      {inscrit && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-ivory-dark/60 pt-3">
                          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                            {moisPayer} / {n.duree} mois payés
                          </span>
                          {moisRestant > 0 ? (
                            <button
                              type="button"
                              onClick={() =>
                                setNiveauPaiementOuvert({
                                  inscriptionId: inscription.id,
                                  nom: n.name,
                                  dureeMois: n.duree,
                                  montantMensuel: n.prix_mensuel,
                                  moisPayer,
                                  moisRestant,
                                })
                              }
                              className="font-body text-xs font-medium text-ink-soft underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-coral-dark"
                            >
                              {moisRestant} mois restant
                              {moisRestant > 1 ? "s" : ""} · payer
                            </button>
                          ) : (
                            <span className="flex items-center gap-1 font-body text-xs font-medium text-coral-dark">
                              <HiOutlineCheckCircle size={12} /> À jour
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              </>
            );
          })}
        </div>
      </section>

      {niveauPaiementOuvert && (
        <ModalPaiementNiveau
          niveauModal={niveauPaiementOuvert}
          moisPayer={niveauPaiementOuvert.moisPayer}
          moisRestant={niveauPaiementOuvert.moisRestant}
          onClose={() => setNiveauPaiementOuvert(null)}
          onConfirmerPaiement={(total, moisSelectionnes, mode) =>
            handleConfirmPaiement(
              niveauPaiementOuvert.inscriptionId,
              total,
              moisSelectionnes,
              mode,
            )
          }
        />
      )}
    </div>
  );
}
