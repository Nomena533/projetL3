import { useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { COURS_A_VALIDER } from "../../lib/mockAdminData";
import useGetCour from "../../app/hooks/useGetCour";
import { updateStatutCour } from "../../app/api/courApi";

export default function AdminValidation() {
  const [items, setItems] = useState(COURS_A_VALIDER);
  const { cours, courBrouillon, setCours, setCourBrouillon, fetchCours } = useGetCour();
  const [alert, setAlert] = useState(location.state?.success || null);

  console.log(courBrouillon);

  const formatDate = (date) => {
    const formatted = new Date(date).toLocaleDateString('fr-FR', {
      day : 'numeric',
      month : 'long',
      year : 'numeric'
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  const handleSubmit = async (id, data) => {
    // event.preventDefault();
    // console.log(data.statut);
    // return;
    try {
      const response = await updateStatutCour(id, data);
      console.log("Statut modifié avec succès", response.data);

      // setCours(cours.filter((x) => x.id !== id));
      setCourBrouillon(courBrouillon.filter((x) => x.id !== id));

      setAlert("Statut modifié avec succès !");
    } catch (error) {
      console.error(
        "Erreur lors de la modification du statut",
        error.response?.data,
      );
    }
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Administration
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Validation des cours
        </h2>
      </AnimatedSection>

      {alert && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-body text-sm text-emerald-700">
          <HiOutlineCheckCircle size={18} className="mt-0.5 shrink-0" />
          <p className="flex-1">{alert}</p>
          <button
            onClick={() => setAlert(null)}
            aria-label="Fermer"
            className="shrink-0 opacity-70 hover:opacity-100"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>
      )}

      {courBrouillon.length === 0 ? (
        <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
          <HiOutlineClipboardDocumentCheck
            size={22}
            className="mx-auto text-ink-soft"
          />
          <p className="mt-3 font-body text-sm text-ink-soft">
            Aucun cours en attente de validation.
          </p>
        </AnimatedSection>
      ) : (
        <div className="space-y-3">
          {courBrouillon.map((c, i) => (
            <AnimatedSection
              key={c.id}
              delay={i * 80}
              className="flex flex-col gap-4 rounded-2xl border border-ivory-dark bg-white/60 p-5 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold text-ink">
                  {c.titre}
                </p>
                <p className="mt-0.5 font-body text-xs text-ink-soft">
                  {c.prof.name} {c.prof.firstname} · {c.instrument.name} ·
                  soumis le {formatDate(c.created_at)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleSubmit(c.id, {
                      instrument_id: c.instrument_id,
                      niveau_id: c.niveau_id,
                      titre: c.titre,
                      description: c.description,
                      prix: c.prix,
                      duree: c.duree,
                      statut: "publié",
                    });
                  }}
                  // onClick={() => setItems(courBrouillon.filter((x) => x.id !== c.id))}
                  className="flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-xs font-semibold text-ivory shadow-md shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
                >
                  <HiOutlineCheckCircle size={15} /> Valider
                </button>
                <button
                  onClick={() => {
                    handleSubmit(c.id, {
                      instrument_id: c.instrument_id,
                      niveau_id: c.niveau_id,
                      titre: c.titre,
                      description: c.description,
                      prix: c.prix,
                      duree: c.duree,
                      statut: "refusé",
                    });
                  }}
                  // onClick={() => setItems(courBrouillon.filter((x) => x.id !== c.id))}
                  className="flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-xs font-semibold text-ink transition-all duration-300 hover:border-brick/40 hover:text-brick"
                >
                  <HiOutlineXCircle size={15} /> Refuser
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
