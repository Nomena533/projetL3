import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXMark,
  HiOutlinePhoto,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import Pill from "../../components/Pill";
import { Th, Td } from "../../components/Table";
import { MES_COURS, formatAriary } from "../../lib/mockProfData";
import useGetCour from "../../app/hooks/useGetCour";
import { BASE_URL } from "../../app/api/api";
import { deleteCour } from "../../app/api/courApi";
import { X } from "../../lib/icons";

// Bandeau d'alerte succès/erreur affiché après une action (ex. création d'un
// cours). Se ferme automatiquement après quelques secondes, ou manuellement.
function Alert({ type = "success", message, onClose }) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-5 py-4 font-body text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-brick/30 bg-brick/10 text-brick"
      }`}
    >
      {isSuccess ? (
        <HiOutlineCheckCircle size={18} className="mt-0.5 shrink-0" />
      ) : (
        <HiOutlineExclamationTriangle size={18} className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
      >
        <HiOutlineXMark size={16} />
      </button>
    </div>
  );
}

export default function ProfMesCours() {
  const location = useLocation();
  const navigate = useNavigate();

  // const [cours, setCours] = useState(MES_COURS);
  const [toDelete, setToDelete] = useState(null);

  const { cours, setCours, fetchCours } = useGetCour();

  const handleDelete = async (id) => {
    try {
      const response = await deleteCour(id);

      // Met à jour immédiatement la liste React
      await fetchCours();

      // Ferme le modal après la suppression réussie
      setToDelete(null);

      // Affiche directement l'alerte
      setAlert({
        type: "success",
        message: "Le cours a été supprimé avec succès !",
      });

      console.log(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du cours",
        error.response?.data,
      );

      setAlert({
        type: "error",
        message: "Une erreur est survenue lors de la suppression du cours.",
      });
    }
  };

  const [alert, setAlert] = useState(
    location.state?.success
      ? { type: "success", message: location.state.success }
      : location.state?.error
        ? { type: "error", message: location.state.error }
        : null,
  );

  // Nettoie le state de navigation pour ne pas réafficher l'alerte si
  // l'utilisateur revient sur cette page (F5, retour navigateur…).
  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-fermeture de l'alerte après quelques secondes.
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  console.log("liste des cours : ", cours);

  return (
    <div className="space-y-6">
      <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {/* {cours} */}
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
            Espace professeur
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Mes cours
          </h2>
        </div>
        <Link
          to="/professeur/cours/nouveau"
          className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          <HiPlus size={16} /> Créer un cours
        </Link>
      </AnimatedSection>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <AnimatedSection
        delay={80}
        className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-ivory-dark">
              <tr>
                <Th>Cours</Th>
                <Th>Instrument</Th>
                {/* <Th>Niveau</Th> */}
                <Th>Durée</Th>
                <Th>Élèves</Th>
                <Th>Statut</Th>
                <Th>Prix</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {cours.map((c) => (
                <tr
                  key={c.id}
                  className="transition-colors duration-200 hover:bg-ivory-dark/30"
                >
                  <Td>
                    <Link
                      to={`/professeur/cours/${c.id}/details`}
                      className="flex items-center gap-3 group"
                    >
                      <span className="flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ivory-dark bg-ivory-dark/40">
                        {c.image ? (
                          <img
                            src={`${BASE_URL}/storage/${c.image}`}
                            alt={c.titre}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <HiOutlinePhoto size={16} className="text-ink-soft" />
                        )}
                      </span>
                      <span className="font-semibold text-ink transition-colors group-hover:text-coral-dark">
                        {c.titre}
                      </span>
                    </Link>
                  </Td>
                  <Td>{c.instrument.name || "—"}</Td>
                  {/* <Td>{c.niveau || "—"}</Td> */}
                  <Td>{c.duree || "—"}</Td>
                  <Td>{c.eleves ?? 0}</Td>
                  <Td>
                    <Pill>{c.statut}</Pill>
                  </Td>
                  <Td className="font-mono">{formatAriary(c.prix)}</Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/professeur/cours/${c.id}/details`}
                        className="text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label="Voir le détail"
                      >
                        <HiOutlineEye size={17} />
                      </Link>
                      <Link
                        to={`/professeur/cours/${c.id}`}
                        className="text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label="Modifier"
                      >
                        <HiOutlinePencilSquare size={17} />
                      </Link>
                      <button
                        onClick={() => setToDelete(c)}
                        className="text-ink-soft transition-colors hover:text-brick"
                        aria-label="Supprimer"
                      >
                        <HiOutlineTrash size={17} />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cours.length === 0 && (
          <p className="px-5 py-12 text-center font-body text-sm text-ink-soft">
            Tu n'as pas encore publié de cours.{" "}
            <Link
              to="/professeur/cours/nouveau"
              className="font-semibold text-coral-dark hover:text-brick"
            >
              Crée le premier →
            </Link>
          </p>
        )}
      </AnimatedSection>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Supprimer ce cours ?"
      >
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">« {toDelete?.titre} »</span>{" "}
          sera définitivement supprimé, ainsi que ses leçons. Les élèves déjà
          inscrits perdront l'accès au contenu. Cette action est irréversible.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setToDelete(null)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => { handleDelete(toDelete?.id) }}
            className="flex-1 rounded-full bg-brick py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-brick/25 transition-all duration-300 hover:bg-brick-light"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
