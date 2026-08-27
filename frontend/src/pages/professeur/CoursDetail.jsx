import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import {
  HiOutlineChevronLeft,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineSpeakerWave,
  HiOutlinePhoto,
  HiOutlineCheckCircle,
  HiOutlineXMark,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
// ⚠️ getCourById / deleteLecon sont attendus dans courApi.js — voir la note
// en bas de fichier si ces fonctions n'existent pas encore de ton côté.
import { getCourById } from "../../app/api/courApi";
import { deleteLecon } from "../../app/api/leconApi";

const RESOURCE_ICON = {
  video: HiOutlineVideoCamera,
  audio: HiOutlineSpeakerWave,
  pdf: HiOutlineDocumentText,
};

const RESOURCE_LABEL = {
  video: "Vidéo",
  audio: "Audio",
  pdf: "PDF",
};

export default function ProfCoursDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [cours, setCours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [alert, setAlert] = useState(location.state?.success || null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getCourById(id)
      .then((res) => {
        if (active) setCours(res.data);
      })
      .catch(() => {
        if (active) setError("Impossible de charger ce cours.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  async function handleDeleteLecon() {
    try {
      await deleteLecon(id, toDelete.id);
      setCours((c) => ({ ...c, lecons: c.lecons.filter((l) => l.id !== toDelete.id) }));
    } catch (err) {
      console.error("Erreur lors de la suppression de la leçon", err.response?.data);
    } finally {
      setToDelete(null);
    }
  }

  if (loading) {
    return <p className="font-body text-sm text-ink-soft">Chargement du cours…</p>;
  }

  if (error || !cours) {
    return (
      <div className="space-y-4">
        <p className="font-body text-sm text-brick">{error || "Cours introuvable."}</p>
        <Link to="/professeur/mescours" className="font-body text-sm font-semibold text-coral-dark hover:text-brick">
          ← Retour à mes cours
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <button
        onClick={() => navigate("/professeur/mescours")}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour à mes cours
      </button>

      {alert && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-body text-sm text-emerald-700">
          <HiOutlineCheckCircle size={18} className="mt-0.5 shrink-0" />
          <p className="flex-1">{alert}</p>
          <button onClick={() => setAlert(null)} aria-label="Fermer" className="shrink-0 opacity-70 hover:opacity-100">
            <HiOutlineXMark size={16} />
          </button>
        </div>
      )}

      {/* En-tête du cours */}
      <AnimatedSection className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
        <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
          <div className="flex aspect-video w-full items-center justify-center bg-ivory-dark/40 lg:aspect-auto lg:h-full">
            {cours.image ? (
              <img src={cours.image} alt={cours.titre} className="h-full w-full object-cover" />
            ) : (
              <HiOutlinePhoto size={28} className="text-ink-soft" />
            )}
          </div>
          <div className="space-y-4 p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
                  {cours.instrument?.name || cours.instrument || "Instrument"}
                </span>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{cours.titre}</h2>
              </div>
              <Link
                to={`/professeur/cours/${id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-xs font-semibold text-ink transition-colors hover:border-coral/40"
              >
                <HiOutlinePencilSquare size={14} /> Modifier
              </Link>
            </div>

            {cours.description && (
              <p className="font-body text-sm leading-relaxed text-ink-soft">{cours.description}</p>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-ink-soft">
              <span>
                <strong className="text-ink">Durée : </strong>
                {cours.duree || "—"}
              </span>
              <span>
                <strong className="text-ink">Prix : </strong>
                {cours.prix ? `${Number(cours.prix).toLocaleString("fr-FR")} Ar` : "—"}
              </span>
              <span>
                <strong className="text-ink">Leçons : </strong>
                {cours.lecons?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Leçons */}
      <AnimatedSection delay={80} className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">Leçons</h3>
          <Link
            to={`/professeur/cours/${id}/lecons/nouveau`}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark transition-colors hover:text-brick"
          >
            <HiPlus size={14} /> Ajouter une leçon
          </Link>
        </div>

        {cours.lecons?.length ? (
          <div className="space-y-3">
            {cours.lecons.map((l, index) => {
              const Icon = RESOURCE_ICON[l.type_ressource] || HiOutlineDocumentText;
              return (
                <div
                  key={l.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ivory-dark p-4 transition-colors duration-300 hover:border-coral/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 font-mono text-xs text-ink-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-body text-sm font-semibold text-ink">{l.titre}</p>
                      {l.description && (
                        <p className="truncate font-body text-xs text-ink-soft">{l.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-ivory-dark px-3 py-1 font-body text-xs text-ink-soft">
                      <Icon size={13} /> {RESOURCE_LABEL[l.type_ressource] || "Ressource"}
                    </span>
                    {l.duree && <span className="font-mono text-xs text-ink-soft">{l.duree}</span>}
                    <button
                      onClick={() => setToDelete(l)}
                      className="text-ink-soft transition-colors hover:text-brick"
                      aria-label="Supprimer la leçon"
                    >
                      <HiOutlineTrash size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-ivory-dark px-5 py-10 text-center font-body text-sm text-ink-soft">
            Ce cours n'a pas encore de leçon.{" "}
            <Link
              to={`/professeur/cours/${id}/lecons/nouveau`}
              className="font-semibold text-coral-dark hover:text-brick"
            >
              Ajoute la première →
            </Link>
          </p>
        )}
      </AnimatedSection>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Supprimer cette leçon ?">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">« {toDelete?.titre} »</span> sera définitivement supprimée. Cette
          action est irréversible.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setToDelete(null)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={handleDeleteLecon}
            className="flex-1 rounded-full bg-brick py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-brick/25 transition-all duration-300 hover:bg-brick-light"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
