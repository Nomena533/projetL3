import { useMemo, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import { Th, Td } from "../../components/Table";
import { updateStatutPaiement } from "../../app/api/paiementApi";
import { formatAriary } from "../../lib/mockAdminData";
import usePaiement from "../../app/hooks/usePaiement";
import { useUser } from "../../app/hooks/useUser";
import { useLevel } from "../../app/hooks/useLevel";
import { capitalize } from "../../lib/formatFunction";
import { ChevronDown } from "../../lib/icons";

const STATUTS_PAIEMENT = ["validé", "En attente", "Échoué"];

const STATUT_STYLES = {
  validé: "border-coral/40 bg-coral/10 text-coral-dark",
  "en attente": "border-amber/40 bg-amber/10 text-ink",
  échoué: "border-brick/40 bg-brick/10 text-brick",
};

function styleStatut(statut) {
  return STATUT_STYLES[statut] || "border-ivory-dark bg-white text-ink-soft";
}

export default function AdminPaiements() {
  const { paiementList } = usePaiement();
  const { userList } = useUser();
  const { levels } = useLevel();
  console.log(paiementList);

  // Overlay optimiste : statut affiché par id de paiement, en attendant que
  // paiementList soit rafraîchi depuis l'API. paiementList reste la source de
  // vérité pour tout le reste (montant, mode, élève, niveau…).
  const [statutsLocaux, setStatutsLocaux] = useState({});

  console.log("statutsLocaux initial : ", statutsLocaux);
  // Contient l'ID du paiement en cour de modification
  const [updatingId, setUpdatingId] = useState(null);
  console.log("updatingId : ", updatingId);
  const [error, setError] = useState(null);

  // Pour ce paiement, utilise d'abord le statut local. S'il n'existe pas, utilise le statut provenant de l'API
  const statutDe = (p) => statutsLocaux[p.id] ?? p.statut;

  const handleStatutChange = async (paiement, data) => {
    console.log("statut : ", data.statut);

    const ancienStatut = statutDe(paiement);
    setError(null);
    setStatutsLocaux((prev) => ({
      ...prev,
      [paiement.id]: data.statut,
    }));

    console.log("statutsLocaux après séléction : ", statutsLocaux);
    // return;

    setUpdatingId(paiement.id);

    try {
      const response = await updateStatutPaiement(paiement.id, data);
      console.log("MAJ statut paiement effectué", response.data);
    } catch (requestError) {
      setStatutsLocaux((prev) => ({
        ...prev,
        [paiement.id]: ancienStatut,
      }));
      setError("Le statut du paiement n'a pas pu être modifié.");
      console.error(
        "Erreur lors de la modification du statut du paiement",
        requestError.response?.data,
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Un paiement est-il en attente de validation ? (comparaison insensible à la casse)
  const estEnAttente = (p) => statutDe(p).toLowerCase() === "en attente";

  // Regroupement des paiements par élève, trié par nom d'élève. Dans chaque
  // groupe, les paiements "en attente" remontent en premier pour attirer
  // l'attention de l'administrateur sur ce qui reste à valider.
  const groupesParEleve = useMemo(() => {
    const groupes = new Map();

    paiementList.forEach((p) => {
      const eleve = userList.find((e) => e.id === p.inscription?.user_id);
      const cle = eleve?.id ?? "inconnu";

      if (!groupes.has(cle)) {
        groupes.set(cle, { eleve, paiements: [] });
      }
      groupes.get(cle).paiements.push(p);
    });

    return Array.from(groupes.values())
      .map((groupe) => ({
        ...groupe,
        paiements: [...groupe.paiements].sort(
          (a, b) => Number(estEnAttente(b)) - Number(estEnAttente(a)),
        ),
      }))
      .sort((a, b) => (a.eleve?.name || "").localeCompare(b.eleve?.name || ""));
  }, [paiementList, userList, statutsLocaux]);

  // Accordéon : un groupe est ouvert par défaut s'il contient un paiement en
  // attente de validation, sinon fermé. `overrides` ne stocke que les
  // groupes que l'administrateur a explicitement ouverts/fermés lui-même,
  // pour ne jamais forcer une réouverture après une action manuelle.
  const [overrides, setOverrides] = useState({});

  const estOuvert = (cle, aDesPaiementsEnAttente) =>
    overrides[cle] ?? aDesPaiementsEnAttente;

  const toggleGroupe = (cle, aDesPaiementsEnAttente) => {
    setOverrides((prev) => ({
      ...prev,
      [cle]: !estOuvert(cle, aDesPaiementsEnAttente),
    }));
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Administration
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Paiements
        </h2>
      </AnimatedSection>

      {error && (
        <p role="alert" className="font-body text-sm text-brick">
          {error}
        </p>
      )}

      <div className="space-y-5">
        {groupesParEleve.map(({ eleve, paiements }, index) => {
          const cle = eleve?.id ?? "inconnu";
          const total = paiements.reduce(
            (somme, p) => somme + parseFloat(p.montant || 0),
            0,
          );
          const nbEnAttente = paiements.filter((p) =>
            estEnAttente(p),
          ).length;
          const ouvert = estOuvert(cle, nbEnAttente > 0);

          return (
            <AnimatedSection
              key={cle}
              delay={index * 60}
              className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70"
            >
              {/* En-tête de groupe : élève + récapitulatif — déclenche l'accordéon */}
              <button
                type="button"
                onClick={() => toggleGroupe(cle, nbEnAttente > 0)}
                aria-expanded={ouvert}
                className="flex w-full flex-wrap items-center justify-between gap-2 border-b border-ivory-dark bg-ivory-dark/20 px-5 py-3 text-left transition-colors duration-200 hover:bg-ivory-dark/30"
              >
                <div className="flex items-center gap-3">
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-ink-soft transition-transform duration-300 ${
                      ouvert ? "rotate-180" : ""
                    }`}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-sm font-semibold text-ink">
                        {eleve
                          ? `${eleve.name} ${eleve.firstname}`
                          : "Élève inconnu"}
                      </h3>
                      {nbEnAttente > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/20 px-2 py-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
                            <span>{nbEnAttente}</span> en attente
                          </span>
                      )}
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      {paiements.length} paiement
                      {paiements.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-sm font-semibold text-coral-dark">
                  {formatAriary(total)}
                </span>
              </button>

              {/* Panneau dépliable (transition fluide via grid-rows) */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  ouvert ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-ivory-dark">
                        <tr>
                          <Th>Niveau</Th>
                          <Th>Montant</Th>
                          <Th>Description</Th>
                          <Th>Mode</Th>
                          <Th>Statut</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ivory-dark">
                        {paiements.map((p) => {
                          const niveau = levels.find(
                            (l) => l.id === p.inscription?.niveau_id,
                          );
                          const statut = statutDe(p);

                          const options = STATUTS_PAIEMENT.includes(statut)
                            ? STATUTS_PAIEMENT
                            : [statut, ...STATUTS_PAIEMENT];

                          return (
                            <tr
                              key={p.id}
                              className={`transition-colors duration-200 hover:bg-ivory-dark/30 ${
                                estEnAttente(p) ? "bg-amber/5" : ""
                              }`}
                            >
                              <Td>
                                <span className="flex items-center gap-1.5">
                                  {estEnAttente(p) && (
                                    <span
                                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                                      title="Nouveau paiement à valider"
                                    />
                                  )}
                                  {niveau ? capitalize(niveau.name) : "—"}
                                </span>
                              </Td>
                              <Td className="font-mono">
                                {formatAriary(p.montant)}
                              </Td>
                              <Td>{p.description || "_"}</Td>
                              <Td>{p.mode_paiement}</Td>
                              <Td>
                                <select
                                  value={statut}
                                  disabled={statut !== "en attente"}
                                  onChange={(e) =>
                                    handleStatutChange(p, {
                                      inscription_id: p.inscription_id,
                                      nombre_mois: p.nombre_mois,
                                      montant: p.montant,
                                      mode_paiement: p.mode_paiement,
                                      statut: e.target.value,
                                    })
                                  }
                                  aria-label={`Modifier le statut du paiement ${p.id}`}
                                  className={`rounded-full border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide outline-none transition-colors duration-200 focus:border-coral disabled:cursor-wait disabled:opacity-60 
                                    ${styleStatut(statut)} 
                                    ${
                                      statut !== "en attente"
                                        ? "disabled:cursor-not-allowed"
                                        : "cursor-pointer"
                                    }
                                  `}
                                >
                                  {options.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </Td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}

        {groupesParEleve.length === 0 && (
          <p className="font-body text-sm text-ink-soft">
            Aucun paiement pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
