import { useMemo, useState } from "react";
import {
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineDevicePhoneMobile,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
} from "../../lib/icons";
import AnimatedSection from "../../components/AnimatedSection";
import { NIVEAUX_PARCOURS, MODES_PAIEMENT, MOIS_PAYES_PAR_NIVEAU } from "../../lib/mockFormationData";

// TODO: remplacer par l'appel API réel, ex. paiementApi.creerPaiement(payload)
async function envoyerPaiement(payload) {
  console.log("Paiement envoyé à la BDD :", payload);
  return new Promise((resolve) => setTimeout(resolve, 700));
}

export default function Paiement() {
  // Copie locale mutable du mock ; à remplacer par l'état renvoyé par l'API.
  const [moisPayesParNiveau, setMoisPayesParNiveau] = useState(() => ({ ...MOIS_PAYES_PAR_NIVEAU }));
  // Sélections en cours par niveau : { [niveauId]: { mois: number[], mode: string|null } }
  const [selections, setSelections] = useState({});
  const [enCours, setEnCours] = useState(null);
  const [confirmes, setConfirmes] = useState({});

  // Seuls les niveaux où l'élève est inscrit ET où il reste des mois non payés
  // (par rapport à la durée totale du niveau) apparaissent ici.
  const niveauxEnAttente = useMemo(
    () => NIVEAUX_PARCOURS.filter((n) => n.inscrit && (moisPayesParNiveau[n.id]?.length || 0) < n.dureeMois),
    [moisPayesParNiveau]
  );

  // Règle : l'écolage se paie mois par mois, dans l'ordre.
  // Cliquer sur un mois sélectionne automatiquement ce mois ET tous les mois
  // restants qui le précèdent (s'ils ne sont pas déjà sélectionnés).
  // Décliquer un mois retire ce mois ET tous ceux qui le suivent dans la sélection,
  // pour qu'on ne puisse jamais avoir un "trou" (ex. payer le mois 4 sans le mois 2 et 3).
  function toggleMois(niveauId, mois, moisRestants) {
    setSelections((prev) => {
      const courant = prev[niveauId]?.mois || [];
      let nouveauxMois;
      if (courant.includes(mois)) {
        nouveauxMois = courant.filter((m) => m < mois);
      } else {
        const index = moisRestants.indexOf(mois);
        nouveauxMois = moisRestants.slice(0, index + 1);
      }
      return { ...prev, [niveauId]: { ...prev[niveauId], mois: nouveauxMois } };
    });
  }

  function setMode(niveauId, mode) {
    setSelections((prev) => ({ ...prev, [niveauId]: { ...prev[niveauId], mode } }));
  }

  async function handlePayer(niveau) {
    const selection = selections[niveau.id] || { mois: [], mode: null };
    if (selection.mois.length === 0 || !selection.mode) return;

    setEnCours(niveau.id);
    await envoyerPaiement({
      niveau: niveau.id,
      mois: selection.mois,
      montantMensuel: niveau.montantMensuel,
      total: selection.mois.length * niveau.montantMensuel,
      modePaiement: selection.mode,
    });

    // Les mois payés sont retirés de la liste des mois restants.
    setMoisPayesParNiveau((prev) => ({
      ...prev,
      [niveau.id]: [...(prev[niveau.id] || []), ...selection.mois].sort((a, b) => a - b),
    }));
    setSelections((prev) => ({ ...prev, [niveau.id]: { mois: [], mode: null } }));
    setEnCours(null);
    setConfirmes((prev) => ({ ...prev, [niveau.id]: true }));
    setTimeout(() => setConfirmes((prev) => ({ ...prev, [niveau.id]: false })), 3000);
  }

  return (
    <div className="space-y-10">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Paiement</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Mes paiements</h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">
          Règle les mois restants de tes niveaux en cours, un ou plusieurs mois à la fois.
        </p>
      </AnimatedSection>

      {niveauxEnAttente.length === 0 ? (
        <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark bg-ivory-dark/20 p-8 text-center">
          <HiOutlineCheckCircle className="mx-auto text-coral-dark" size={32} />
          <p className="mt-2 font-body text-sm text-ink-soft">Tous tes paiements sont à jour. 🎉</p>
        </AnimatedSection>
      ) : (
        <div className="space-y-6">
          {niveauxEnAttente.map((niveau, i) => {
            const moisPayes = moisPayesParNiveau[niveau.id] || [];
            const moisRestants = Array.from({ length: niveau.dureeMois }, (_, idx) => idx + 1).filter(
              (m) => !moisPayes.includes(m)
            );
            const selection = selections[niveau.id] || { mois: [], mode: null };
            const total = selection.mois.length * niveau.montantMensuel;
            const modesMobileMoney = MODES_PAIEMENT.filter((m) => m.groupe === "mobile_money");
            const modeCarte = MODES_PAIEMENT.find((m) => m.groupe === "carte");

            return (
              <AnimatedSection key={niveau.id} delay={i * 90} className="rounded-2xl border border-ivory-dark bg-white/70 p-6">
                {/* En-tête niveau — mêmes informations que le paiement public, sans droit d'inscription */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{niveau.nom}</h3>
                  <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft">
                    <HiOutlineClock size={13} /> Durée totale : {niveau.dureeMois} mois
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                    {niveau.montantMensuel.toLocaleString("fr-MG")} Ar / mois
                  </span>
                </div>

                {confirmes[niveau.id] && (
                  <p className="mt-2 flex items-center gap-1.5 font-body text-xs font-medium text-coral-dark">
                    <HiOutlineCheckCircle size={14} /> Paiement enregistré.
                  </p>
                )}

                <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Mois restants à payer ({moisRestants.length} / {niveau.dureeMois})
                </p>
                <p className="mt-1 font-body text-[11px] text-ink-soft/80">
                  Les mois se paient dans l'ordre : sélectionner un mois inclut automatiquement les mois précédents non payés.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {moisRestants.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMois(niveau.id, m, moisRestants)}
                      className={`rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                        selection.mois.includes(m)
                          ? "border-coral bg-coral text-ivory"
                          : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
                      }`}
                    >
                      Mois {m}
                    </button>
                  ))}
                </div>

                {selection.mois.length > 0 && (
                  <>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">Mode de paiement</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[...modesMobileMoney, modeCarte].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMode(niveau.id, m.id)}
                          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-sm font-medium transition-colors duration-200 ${
                            selection.mode === m.id
                              ? "border-coral bg-coral text-ivory"
                              : "border-ivory-dark bg-white text-ink-soft hover:border-coral hover:text-coral-dark"
                          }`}
                        >
                          {m.groupe === "carte" ? <HiOutlineCreditCard size={13} /> : <HiOutlineDevicePhoneMobile size={13} />}
                          {m.nom}
                        </button>
                      ))}
                    </div>

                    {/* Récapitulatif — pas de droit d'inscription, déjà réglé au premier paiement */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ivory-dark/30 px-4 py-3">
                      <p className="flex items-center gap-1.5 font-body text-sm text-ink">
                        <HiOutlineBanknotes size={16} />
                        {selection.mois.length} mois × {niveau.montantMensuel.toLocaleString("fr-MG")} Ar ={" "}
                        <span className="font-semibold text-coral-dark">{total.toLocaleString("fr-MG")} Ar</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => handlePayer(niveau)}
                        disabled={!selection.mode || enCours === niveau.id}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-brick disabled:opacity-60"
                      >
                        {enCours === niveau.id ? "Traitement…" : "Payer"}
                        {enCours !== niveau.id && (
                          <HiOutlineArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </button>
                    </div>
                  </>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      )}
    </div>
  );
}
