import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import {
  HiOutlineChevronLeft,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineSpeakerWave,
  HiOutlineCheckCircle,
  HiOutlineXMark,
  HiOutlineFolderOpen,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import FilterBar from "../../components/FilterBar";
import useLesson from "../../app/hooks/useLesson";
import {
  getRessourcesByLecon,
  deleteRessource,
} from "../../app/api/ressourceApi";
import { BASE_URL } from "../../app/api/api";

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

const TYPE_OPTIONS = [
  { value: "video", label: "Vidéo" },
  { value: "audio", label: "Audio" },
  { value: "pdf", label: "PDF" },
];

export default function ProfLeconDetail() {
  const { id: coursId, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { lessonDetail, fetchLessonDetail } = useLesson();

  const [ressources, setRessources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [alert, setAlert] = useState(location.state?.success || null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchLessonDetail(lessonId);
  }, [lessonId]);

  const fetchRessources = async () => {
    setLoading(true);
    try {
      const response = await getRessourcesByLecon(lessonId);
      setRessources(response.data);
    } catch (err) {
      setError("Impossible de charger les ressources de cette leçon.");
      console.error(
        "Erreur lors de la récupération des ressources :",
        err.response?.data,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRessources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleDeleteRessource = async (ressourceId) => {
    try {
      await deleteRessource(ressourceId);
      setRessources((list) => list.filter((r) => r.id !== ressourceId));
      setAlert("La ressource a été supprimée avec succès !");
    } catch (err) {
      console.error(
        "Erreur lors de la suppression de la ressource",
        err.response?.data,
      );
    } finally {
      setToDelete(null);
    }
  };

  const filteredRessources = useMemo(() => {
    return ressources.filter((r) => {
      const matchSearch = search
        ? (r.titre || "").toLowerCase().includes(search.toLowerCase())
        : true;
      const matchType = typeFilter ? r.type === typeFilter : true;
      return matchSearch && matchType;
    });
  }, [ressources, search, typeFilter]);

  const hasActiveFilters = search !== "" || typeFilter !== "";

  if (lessonDetail === undefined || lessonDetail === null) {
    return (
      <p className="font-body text-sm text-ink-soft">Chargement de la leçon…</p>
    );
  }

  return (
    <div className="w-full space-y-6">
      <button
        onClick={() => navigate(`/professeur/cours/${coursId}/details`)}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour au cours
      </button>

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

      {/* En-tête de la leçon */}
      <AnimatedSection className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
              Leçon
            </span>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {lessonDetail.titre || "_"}
            </h2>
          </div>
          <Link
            to={`/professeur/cours/${coursId}/lecons/${lessonId}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-xs font-semibold text-ink transition-colors hover:border-coral/40"
          >
            <HiOutlinePencilSquare size={14} /> Modifier la leçon
          </Link>
        </div>

        {lessonDetail.description && (
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
            {lessonDetail.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-ink-soft">
          <span>
            <strong className="text-ink">Durée : </strong>
            {lessonDetail.duree || "—"}
          </span>
          <span>
            <strong className="text-ink">Ressources : </strong>
            {ressources.length}
          </span>
        </div>
      </AnimatedSection>

      {/* Ressources */}
      <AnimatedSection
        delay={80}
        className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            Ressources
          </h3>
          <Link
            to={`/professeur/cours/${coursId}/lecons/${lessonId}/ressources/nouveau`}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark transition-colors hover:text-brick"
          >
            <HiPlus size={14} /> Ajouter des ressources
          </Link>
        </div>

        {ressources.length > 0 && (
          <div className="mb-4">
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Rechercher une ressource…"
              filters={[
                {
                  name: "type",
                  label: "Tous les types",
                  value: typeFilter,
                  onChange: setTypeFilter,
                  options: TYPE_OPTIONS,
                },
              ]}
              resultCount={filteredRessources.length}
              totalCount={ressources.length}
              hasActiveFilters={hasActiveFilters}
              onReset={() => {
                setSearch("");
                setTypeFilter("");
              }}
            />
          </div>
        )}

        {loading ? (
          <p className="font-body text-sm text-ink-soft">
            Chargement des ressources…
          </p>
        ) : error ? (
          <p className="font-body text-sm text-brick">{error}</p>
        ) : ressources.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ivory-dark px-5 py-10 text-center font-body text-sm text-ink-soft">
            Cette leçon n'a pas encore de ressource.{" "}
            <Link
              to={`/professeur/cours/${coursId}/lecons/${lessonId}/ressources/nouveau`}
              className="font-semibold text-coral-dark hover:text-brick"
            >
              Ajoute la première →
            </Link>
          </p>
        ) : filteredRessources.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ivory-dark px-5 py-10 text-center font-body text-sm text-ink-soft">
            Aucune ressource ne correspond à ta recherche.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredRessources.map((r) => {
              const Icon = RESOURCE_ICON[r.type] || HiOutlineFolderOpen;
              return (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ivory-dark p-4 transition-colors duration-300 hover:border-coral/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-body text-sm font-semibold text-ink">
                        {r.titre || "_"}
                      </p>
                      <p className="font-body text-xs text-ink-soft">
                        {RESOURCE_LABEL[r.type] || "Ressource"}
                        {r.duree && ` · ${r.duree}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {r.fichier && (
                      <a
                        href={`${BASE_URL}/storage/${r.fichier}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label="Voir le fichier"
                      >
                        <HiOutlineArrowDownTray size={16} />
                      </a>
                    )}
                    <Link
                      to={`/professeur/cours/${coursId}/lecons/${lessonId}/ressources/${r.id}`}
                      className="text-ink-soft transition-colors hover:text-coral-dark"
                      aria-label="Modifier la ressource"
                    >
                      <HiOutlinePencilSquare size={17} />
                    </Link>
                    <button
                      onClick={() => setToDelete(r)}
                      className="text-ink-soft transition-colors hover:text-brick"
                      aria-label="Supprimer la ressource"
                    >
                      <HiOutlineTrash size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AnimatedSection>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Supprimer cette ressource ?"
      >
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">« {toDelete?.titre} »</span>{" "}
          sera définitivement supprimée. Cette action est irréversible.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setToDelete(null)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => handleDeleteRessource(toDelete?.id)}
            className="flex-1 rounded-full bg-brick py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-brick/25 transition-all duration-300 hover:bg-brick-light"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
