import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineCheckCircle } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
import { storeLesson, updateLesson } from "../../app/api/lessonApi";
import {
  getExerciceByLesson,
  storeExercice,
  updateExercice,
} from "../../app/api/exerciceApi";
import useLesson from "../../app/hooks/useLesson";
import { useLang } from "../../app/hooks/useLang";

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
        className="w-full rounded-xl border border-ivory-dark bg-white/70 dark:bg-white/10 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
      />
    </label>
  );
}

// Formulaire "affichage seul" pour l'exercice : il ne gère ni chargement ni
// soumission lui-même. Son état (form / onChange) est piloté par le parent
// pour pouvoir être enregistré en même temps que la leçon, en un seul clic,
// tout en restant visuellement un formulaire à part.
function ExerciceEditeur({ isEditing, form, onChange }) {
  const { t } = useLang();
  return (
    <AnimatedSection
      delay={120}
      className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 dark:bg-white/10 p-6 sm:p-7"
    >
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Exercice")}</span>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">
          {isEditing ? t("Modifier l'exercice") : t("Ajouter un exercice")}
        </h3>
        <p className="mt-1 font-body text-xs text-ink-soft">{t("Facultatif : laisse les champs vides si cette leçon n'a pas d'exercice à corriger.")}</p>
      </div>

      <FormField
        label={t("Titre de l'exercice")}
        placeholder={t("Ex. Rejoue la mélodie du morceau")}
        name="titre"
        value={form.titre}
        onChange={onChange}
      />

      <TextAreaField
        label={t("Description")}
        name="description"
        value={form.description}
        onChange={onChange}
      />
    </AnimatedSection>
  );
}

export default function ProfLeconEditeur() {
  const { t } = useLang();
  const { id: courId, lessonId } = useParams();
  const navigate = useNavigate();

  const { lessonDetail, fetchLessonDetail } = useLesson();

  useEffect(() => {
    if (lessonId) fetchLessonDetail(lessonId);
  }, [lessonId]);

  const [form, setForm] = useState({
    titre: "",
    description: "",
    duree: "",
  });

  useEffect(() => {
    if (lessonId && lessonDetail) {
      setForm({
        titre: lessonDetail.lesson.titre,
        description: lessonDetail.lesson.description,
        duree: lessonDetail.lesson.duree,
        cour_id: lessonDetail.lesson.cour_id,
      });
    }
  }, [lessonDetail]);

  const [exerciceForm, setExerciceForm] = useState({
    titre: "",
    description: "",
  });

  // id de l'exercice existant, s'il y en a déjà un pour cette leçon
  // (permet de choisir entre storeExercice et updateExercice).
  const [existingExerciceId, setExistingExerciceId] = useState(null);

  useEffect(() => {
    if (!lessonId) return;

    const fetchExercice = async () => {
      try {
        const response = await getExerciceByLesson(lessonId);

        const exercice = response.data[0];

        if (exercice) {
          setExistingExerciceId(exercice.id);
          setExerciceForm({
            titre: exercice.titre || "",
            description: exercice.description || "",
          });
        }
      } catch (err) {
        console.error(
          t("Erreur lors de la récupération de l'exercice :"),
          err.response?.data,
        );
      }
    };
    fetchExercice();
  }, [lessonId]);

  const handleChangeExercice = (e) => {
    setExerciceForm({
      ...exerciceForm,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const data = {
        ...form,
      };

      // console.log("data : ", data);
      // return;

      // enregistrement de la lesson
      let lessonResponse;
      if (lessonId) {
        lessonResponse = await updateLesson(lessonId, data);
      } else {
        lessonResponse = await storeLesson(courId, data);
      }

      const finalLessonId = lessonResponse.data.lesson.id;

      // 2. Enregistrer l'exercice avec ce même id_lecon, seulement si le
      //    professeur a renseigné au moins un titre (l'exercice est facultatif).
      // if (finalLessonId && exerciceForm.titre.trim() !== "") {
      //   if (existingExerciceId) {
      //     await updateExercice(existingExerciceId, exerciceForm);
      //   } else {
      //     await storeExercice(finalLessonId, exerciceForm);
      //   }
      // }

      console.log("exerciceForm : " , exerciceForm);
      // enregistrement de l'exercice
      if (existingExerciceId) {
        await updateExercice(existingExerciceId, exerciceForm);
      } else {
        await storeExercice(finalLessonId, exerciceForm);
      }

      console.log("Opération réussie", lessonResponse.data);

      navigate(
        `/professeur/cours/${courId}/lecons/${finalLessonId}/details`,
        {
          state: {
            success: lessonId
              ? t("La leçon a été modifiée avec succès !")
              : t("La leçon (et son exercice) a été créée avec succès !"),
          },
        },
      );

      // if (finalLessonId) {
      //   navigate(
      //     `/professeur/cours/${courId}/lecons/${finalLessonId}/details`,
      //     {
      //       state: {
      //         success: lessonId
      //           ? "La leçon a été modifiée avec succès !"
      //           : "La leçon (et son exercice) a été créée avec succès !",
      //       },
      //     },
      //   );
      // } else {
      //   // Repli si l'id de la nouvelle leçon n'est pas disponible dans la réponse.
      //   navigate(`/professeur/cours/${courId}/details`, {
      //     state: {
      //       success: lessonId
      //         ? "La leçon a été modifiée avec succès !"
      //         : "La leçon a été ajoutée avec succès !",
      //     },
      //   });
      // }

    } catch (err) {
      console.error("Erreur lors de l'opération", err.response?.data);
      setError(t("Une erreur est survenue lors de l'enregistrement de la leçon."));
    } finally {
      setSaving(false);
    }
  };

  if (lessonId && lessonDetail == null) {
    return (
      <p className="font-body text-sm text-ink-soft">{t("Chargement de la leçon…")}</p>
    );
  }

  return (
    <div className="w-full space-y-6">
      <button
        onClick={() => navigate(`/professeur/cours/${courId}/details`)}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} />{" "}{t("Retour au cours")}</button>

      {lessonId ? (
        <AnimatedSection>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Modifier la leçon")}</h2>
        </AnimatedSection>
      ) : (
        <AnimatedSection>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Nouvelle leçon")}</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Ajouter une leçon")}</h2>
        </AnimatedSection>
      )}

      {/* Formulaire 1 : la leçon */}
      <AnimatedSection
        delay={60}
        className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 dark:bg-white/10 p-6 sm:p-7"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Leçon")}</span>
          <h3 className="mt-1 font-display text-lg font-semibold text-ink">{t("Informations de la leçon")}</h3>
        </div>

        <FormField
          label={t("Titre de la leçon")}
          placeholder={t("Ex. Accorder son valiha")}
          name="titre"
          value={form.titre}
          onChange={handleChange}
        />

        <TextAreaField
          label={t("Description")}
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="grid gap-4 sm:grid-cols-1">
          <FormField
            label={t("Durée")}
            placeholder={t("Ex. 12min")}
            name="duree"
            value={form.duree}
            onChange={handleChange}
          />
        </div>

        {!lessonId && (
          <p className="font-body text-xs text-ink-soft">{t("Une fois la leçon enregistrée, tu pourras y ajouter ses ressources (vidéo, audio, PDF) depuis sa page de détail.")}</p>
        )}

        {error && <p className="font-body text-sm text-brick">{error}</p>}
      </AnimatedSection>

      {/* Formulaire 2 : l'exercice rattaché à cette leçon.
          Toujours visible (même en création) : il est enregistré en même
          temps que la leçon lors du clic sur "Enregistrer". */}
      <ExerciceEditeur
        isEditing={!!existingExerciceId}
        form={exerciceForm}
        onChange={handleChangeExercice}
      />

      <AnimatedSection delay={140} className="flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <HiOutlineCheckCircle size={16} />
          {saving ? t("Enregistrement…") : t("Enregistrer la leçon et l'exercice")}
        </button>
        <button
          onClick={() => navigate(`/professeur/cours/${courId}/details`)}
          className="rounded-full border border-ivory-dark px-6 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
        >{t("Annuler")}</button>
      </AnimatedSection>
    </div>
  );
}
