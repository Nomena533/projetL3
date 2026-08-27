import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineCheckCircle, HiOutlineCloudArrowUp } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
// ⚠️ Fichier à créer côté app/api — voir leconApi.js fourni à part.
import { storeLecon } from "../../app/api/leconApi";

const RESSOURCES = [
  { value: "video", label: "Vidéo", accept: "video/*" },
  { value: "audio", label: "Audio", accept: "audio/*" },
  { value: "pdf", label: "PDF", accept: "application/pdf" },
];

function TextAreaField({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</span>
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
  const { id: coursId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titre: "",
    description: "",
    duree: "",
    type_ressource: "video",
  });
  const [fichier, setFichier] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTypeChange = (e) => {
    // On réinitialise le fichier choisi si on change de type de ressource,
    // pour éviter d'envoyer par exemple un .mp4 déclaré comme "pdf".
    setForm({ ...form, type_ressource: e.target.value });
    setFichier(null);
  };

  const handleFileChange = (e) => setFichier(e.target.files?.[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("titre", form.titre);
    formData.append("description", form.description);
    formData.append("duree", form.duree);
    formData.append("type_ressource", form.type_ressource);
    if (fichier) formData.append("ressource", fichier);

    try {
      const response = await storeLecon(coursId, formData);
      console.log("Leçon créée", response.data);

      navigate(`/professeur/cours/${coursId}/details`, {
        state: { success: "La leçon a été ajoutée avec succès !" },
      });
    } catch (err) {
      console.error("Erreur lors de l'insertion de la leçon", err.response?.data);
      setError("Une erreur est survenue lors de l'enregistrement de la leçon.");
    }
  };

  const activeType = RESSOURCES.find((r) => r.value === form.type_ressource);

  return (
    <div className="w-full space-y-6">
      <button
        onClick={() => navigate(`/professeur/cours/${coursId}/details`)}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour au cours
      </button>

      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Nouvelle leçon</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Ajouter une leçon</h2>
      </AnimatedSection>

      <AnimatedSection delay={60} className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
        <FormField
          label="Titre de la leçon"
          placeholder="Ex. Accorder son valiha"
          name="titre"
          value={form.titre}
          onChange={handleChange}
        />

        <TextAreaField label="Description" name="description" value={form.description} onChange={handleChange} />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Durée"
            placeholder="Ex. 12min"
            name="duree"
            value={form.duree}
            onChange={handleChange}
          />

          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
              Type de ressource
            </span>
            <select
              name="type_ressource"
              value={form.type_ressource}
              onChange={handleTypeChange}
              className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
            >
              {RESSOURCES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
            Fichier ({activeType?.label})
          </span>
          <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-ivory-dark bg-white/70 px-4 py-4">
            <HiOutlineCloudArrowUp size={20} className="shrink-0 text-ink-soft" />
            <input
              type="file"
              accept={activeType?.accept}
              onChange={handleFileChange}
              className="w-full font-body text-xs text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-coral/10 file:px-3 file:py-1.5 file:font-body file:text-xs file:font-semibold file:text-coral-dark hover:file:bg-coral/20"
            />
          </div>
        </label>

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
