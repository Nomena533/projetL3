import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import {
  HiOutlineChevronLeft,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXMark,
  HiOutlinePhoto,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Modal from "../../components/Modal";
import Pill from "../../components/Pill";
import FilterBar from "../../components/FilterBar";
// ⚠️ getCourDetail / deleteLecon sont attendus dans courApi.js — voir la note
// en bas de fichier si ces fonctions n'existent pas encore de ton côté.
import { getCourDetail } from "../../app/api/courApi";
import { deleteLecon } from "../../app/api/lessonApi";
import { BASE_URL } from "../../app/api/api";

export default function ProfCoursDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [cours, d] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [alert, setAlert] = useState(location.state?.success || null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourDetail = async () => {
      let active = true;
      setLoading(true);
      await getCourDetail(id)
        .then((response) => {
          if (active) d(response.data);
          console.log("Détails du cour sélectionnés avec succès");
        })
        .catch((error) => {
          if (active) setError("Impossible de charger ce cours.");
          console.error(
            "Erreur lors de la récupération des détails cour :",
            error.response?.data,
          );
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    };

    fetchCourDetail();
  }, [id]);

  useEffect(() => {
    if (location.state)
      navigate(location.pathname, { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleDeleteLecon = async (leconId) => {
    try {
      await deleteLecon(leconId);

      d((c) => ({
        ...c,
        lesson: c.lesson.filter((l) => l.id !== toDelete.id),
      }));

      setAlert("La leçon a été supprimé avec succès !");
    } catch (err) {
      console.error(
        "Erreur lors de la suppression de la leçon",
        err.response?.data,
      );
    } finally {
      setToDelete(null);
    }
  };

  const filteredLecons = useMemo(() => {
    if (!cours?.lesson) return [];
    if (!search) return cours.lesson;
    return cours.lesson.filter((l) =>
      (l.titre || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [cours, search]);

  if (loading) {
    return (
      <p className="font-body text-sm text-ink-soft">Chargement du cours…</p>
    );
  }

  if (error || !cours) {
    return (
      <div className="space-y-4">
        <p className="font-body text-sm text-brick">
          {error || "Cours introuvable."}
        </p>
        <Link
          to="/professeur/mescours"
          className="font-body text-sm font-semibold text-coral-dark hover:text-brick"
        >
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
          <button
            onClick={() => setAlert(null)}
            aria-label="Fermer"
            className="shrink-0 opacity-70 hover:opacity-100"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>
      )}

      {/* En-tête du cours */}
      <AnimatedSection className="overflow-hidden rounded-2xl border border-ivory-dark bg-white/70">
        <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
          <div className="flex aspect-video w-full items-center justify-center bg-ivory-dark/40 lg:aspect-auto lg:h-full">
            {cours.cour.image ? (
              <img
                src={`${BASE_URL}/storage/${cours.cour.image}`}
                alt={cours.cour.titre}
                className="h-full w-full object-cover"
              />
            ) : (
              <HiOutlinePhoto size={28} className="text-ink-soft" />
            )}
          </div>
          <div className="space-y-4 p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
                    {cours.cour.instrument?.name}
                  </span>
                  {cours.cour.statut && <Pill>{cours.cour.statut}</Pill>}
                </div>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {cours.cour.titre}
                </h2>
              </div>
              <Link
                to={`/professeur/cours/${id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ivory-dark px-4 py-2 font-body text-xs font-semibold text-ink transition-colors hover:border-coral/40"
              >
                <HiOutlinePencilSquare size={14} /> Modifier
              </Link>
            </div>

            {cours.cour.description && (
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                {cours.cour.description}
              </p>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-ink-soft">
              <span>
                <strong className="text-ink">Durée : </strong>
                {cours.cour.duree || "—"}
              </span>
              <span>
                <strong className="text-ink">Prix : </strong>
                {cours.cour.prix
                  ? `${Number(cours.cour.prix).toLocaleString("fr-FR")} Ar`
                  : "—"}
              </span>
              <span>
                <strong className="text-ink">Leçons : </strong>
                {cours.lesson?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Leçons */}
      <AnimatedSection
        delay={80}
        className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            Leçons
          </h3>
          <Link
            to={`/professeur/cours/${id}/lecons/nouveau`}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark transition-colors hover:text-brick"
          >
            <HiPlus size={14} /> Ajouter une leçon
          </Link>
        </div>

        {cours.lesson?.length > 0 && (
          <div className="mb-4">
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Rechercher une leçon…"
              resultCount={filteredLecons.length}
              totalCount={cours.lesson.length}
              hasActiveFilters={search !== ""}
              onReset={() => setSearch("")}
            />
          </div>
        )}

        {cours.lesson?.length ? (
          filteredLecons.length ? (
            <div className="space-y-3">
              {filteredLecons.map((l) => {
                const index = cours.lesson.findIndex((x) => x.id === l.id);
                const ressourceCount =
                  l.ressources_count ?? l.ressources?.length ?? 0;
                return (
                  <div
                    key={l.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ivory-dark p-4 transition-colors duration-300 hover:border-coral/30"
                  >
                    <Link
                      to={`/professeur/cours/${id}/lecons/${l.id}/details`}
                      className="flex min-w-0 flex-1 items-center gap-3"
                    >
                      <span className="shrink-0 font-mono text-xs text-ink-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-body text-sm font-semibold text-ink transition-colors hover:text-coral-dark">
                          {l.titre || "_"}
                        </p>
                        {l.description && (
                          <p className="truncate font-body text-xs text-ink-soft">
                            {l.description}
                          </p>
                        )}
                      </div>
                    </Link>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="flex items-center gap-1.5 rounded-full border border-ivory-dark px-3 py-1 font-body text-xs text-ink-soft">
                        <HiOutlineDocumentText size={13} />
                        {ressourceCount} ressource{ressourceCount > 1 ? "s" : ""}
                      </span>
                      {l.duree && (
                        <span className="font-mono text-xs text-ink-soft">
                          {l.duree}
                        </span>
                      )}
                      <Link
                        to={`/professeur/cours/${id}/lecons/${l.id}/details`}
                        className="text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label="Voir la leçon"
                      >
                        <HiOutlineEye size={17} />
                      </Link>
                      <Link
                        to={`/professeur/cours/${id}/lecons/${l.id}`}
                        className="text-ink-soft transition-colors hover:text-coral-dark"
                        aria-label="Modifier"
                      >
                        <HiOutlinePencilSquare size={17} />
                      </Link>
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
              Aucune leçon ne correspond à ta recherche.
            </p>
          )
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

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Supprimer cette leçon ?"
      >
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">« {toDelete?.titre} »</span>{" "}
          sera définitivement supprimée, ainsi que ses ressources. Cette action
          est irréversible.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setToDelete(null)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              handleDeleteLecon(toDelete?.id);
            }}
            className="flex-1 rounded-full bg-brick py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-brick/25 transition-all duration-300 hover:bg-brick-light"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}
