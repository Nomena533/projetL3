import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineCheckCircle } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
import { storeLecon, updateLecon } from "../../app/api/lessonApi";
import useLesson from "../../app/hooks/useLesson";

function TextAreaField({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <textarea
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
      />
    </label>
  );
}

export default function ProfLeconEditeur() {
  const { id: coursId, lessonId } = useParams();
  const navigate = useNavigate();

  const { lessonDetail, fetchLessonDetail } = useLesson();

  useEffect(() => {
    if (lessonId) fetchLessonDetail(lessonId);
  }, [lessonId]);

  const [form, setForm] = useState({
    titre: "",
    description: "",
    duree: "",
    cour_id: "",
  });

  useEffect(() => {
    if (lessonDetail) {
      setForm({
        titre: lessonDetail.titre,
        description: lessonDetail.description,
        duree: lessonDetail.duree,
        cour_id: lessonDetail.cour_id,
      });
    }
  }, [lessonDetail]);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = {
        ...form,
        cour_id: coursId,
      };

      let response;

      if (lessonId) {
        response = await updateLecon(lessonId, data);
      } else {
        response = await storeLecon(data);
      }

      console.log("Opération réussie", response.data);

      // Récupère l'id de la leçon créée/modifiée pour rediriger vers sa
      // page de détail, où on peut désormais ajouter/gérer ses ressources.
      const newLessonId = lessonId ?? response.data?.id ?? response.data?.lecon?.id;

      if (newLessonId) {
        navigate(`/professeur/cours/${coursId}/lecons/${newLessonId}/details`, {
          state: {
            success: lessonId
              ? "La leçon a été modifiée avec succès !"
              : "La leçon a été créée. Ajoute maintenant ses ressources.",
          },
        });
      } else {
        // Repli si l'id de la nouvelle leçon n'est pas disponible dans la réponse.
        navigate(`/professeur/cours/${coursId}/details`, {
          state: {
            success: lessonId
              ? "La leçon a été modifiée avec succès !"
              : "La leçon a été ajoutée avec succès !",
          },
        });
      }
    } catch (err) {
      console.error("Erreur lors de l'opération", err.response?.data);
      setError("Une erreur est survenue lors de l'enregistrement de la leçon.");
    }
  };

  if (lessonId && lessonDetail == null) {
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

      {lessonId ? (
        <AnimatedSection>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Modifier la leçon
          </h2>
        </AnimatedSection>
      ) : (
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
            Nouvelle leçon
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Ajouter une leçon
          </h2>
        </AnimatedSection>
      )}

      <AnimatedSection
        delay={60}
        className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
      >
        <FormField
          label="Titre de la leçon"
          placeholder="Ex. Accorder son valiha"
          name="titre"
          value={form.titre}
          onChange={handleChange}
        />

        <TextAreaField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="grid gap-4 sm:grid-cols-1">
          <FormField
            label="Durée"
            placeholder="Ex. 12min"
            name="duree"
            value={form.duree}
            onChange={handleChange}
          />
        </div>

        {!lessonId && (
          <p className="font-body text-xs text-ink-soft">
            Une fois la leçon enregistrée, tu pourras y ajouter ses ressources
            (vidéo, audio, PDF) depuis sa page de détail.
          </p>
        )}

        {error && <p className="font-body text-sm text-brick">{error}</p>}
      </AnimatedSection>

      <AnimatedSection delay={100} className="flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          <HiOutlineCheckCircle size={16} /> Enregistrer la leçon
        </button>
        <button
          onClick={() => navigate(`/professeur/cours/${coursId}/details`)}
          className="rounded-full border border-ivory-dark px-6 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
        >
          Annuler
        </button>
      </AnimatedSection>
    </div>
  );
}
