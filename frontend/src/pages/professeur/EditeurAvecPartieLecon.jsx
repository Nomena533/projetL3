import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import {
  HiOutlineChevronLeft,
  HiOutlineTrash,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineSpeakerWave,
  HiOutlineCheckCircle,
  HiOutlinePhoto,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
import Modal from "../../components/Modal";
import { NIVEAUX, INSTRUMENTS } from "../../lib/mockProfData";
import { storeCour } from "../../app/api/courApi";

// Champ select stylé pour rester identique aux FormField (label mono, bordure
// ivory-dark → coral au focus) sans complexifier l'API de FormField, pensée
// pour les <input> simples.
function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

// Champ d'import d'image avec aperçu, dans le même esprit visuel que les
// autres champs (label mono, bordure ivory-dark → coral au survol/focus).
function ImageField({ label, name, defaultValue, onChange }) {
  const [preview, setPreview] = useState(defaultValue || null);
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    // Remonte l'événement (donc e.target.files) au parent, qui appelle
    // handleImageChange pour stocker le vrai fichier dans form.image.
    onChange?.(e);
  }

  return (
    <label className="block h-full">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <div
        onClick={() => inputRef.current?.click()}
        className="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-ivory-dark bg-white/70 transition-colors duration-300 hover:border-coral/50 lg:h-[calc(100%-1.75rem)]"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Aperçu de l'image du cours"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/50 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-ivory">
                <HiOutlinePhoto size={15} /> Changer l'image
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-ink-soft">
            <HiOutlinePhoto size={22} />
            <span className="text-center font-body text-xs">
              Cliquer pour importer une image
            </span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </label>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <textarea
        rows={3}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
      />
    </label>
  );
}

const TOGGLES = [
  { key: "video", label: "Vidéo", icon: HiOutlineVideoCamera },
  { key: "pdf", label: "PDF", icon: HiOutlineDocumentText },
  { key: "audio", label: "Audio", icon: HiOutlineSpeakerWave },
];

export default function ProfEditeur() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Liste des instruments disponibles, récupérée depuis Laravel pour remplir le select.
  const [instrumentList, setInstrumentList] = useState([]);

  // L'instrument sélectionné par l'utilisateur dans le formulaire, pour filtrer les leçons disponibles.
  const [instrument, setInstrument] = useState("");
  const [publishOpen, setPublishOpen] = useState(false);

  const [lecons, setLecons] = useState([
    { id: 1, titre: "Accorder son valiha", video: true, pdf: true, audio: false },
    { id: 2, titre: "Premiers arpèges", video: true, pdf: false, audio: true },
  ]);

  // useState renvoie un tableau [valeur, setter] → il faut le déstructurer
  // avec des crochets [] et non des accolades {}.
  const [form, setForm] = useState({
    instrument_id: "",
    niveau: "",
    titre: "",
    description: "",
    prix: "",
    image: null,
    duree: "",
  })

  const handleChange = (e) => {
    setForm({
      /**
       * ...form : spread operator => reprends tous les propriétés actuellement présentes dans form
       */
      ...form,
      // e.target : représente l'élément HTML qui a déclenché l'évènement => ici <input/>
      [e.target.name]:e.target.value,// remplace la valeur dans form{prof_id, etc} par la valeur saisi par l'user
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      /**
       * e.target.files[0] => même si l'user sélectionne une seul image, le navigateur fournit une collection de fichier
       *  => DONC , e.target.files[0] prend le premier fichier sélectionné
       */
      image:e.target.files[0]
    })
  };

  // Récupère les données du formulaire et les envois à Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("titre", form.titre);
    formData.append("instrument_id", form.instrument_id);
    formData.append("description", form.description);
    formData.append("prix", form.prix);
    formData.append("duree", form.duree);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
  
      const response = await storeCour(formData);

      console.log("Insertion réussi",response.data);
      navigate("/professeur/mescours");
      
    } catch (error) {
      console.error("Erreur lors de l'insertion",error)
    }

  }
  function toggleLecon(leconId, key) {
    setLecons(
      lecons.map((l) => (l.id === leconId ? { ...l, [key]: !l[key] } : l)),
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

      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Éditeur de cours
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {id ? "Modifier le cours" : "Nouveau cours"}
        </h2>
      </AnimatedSection>

      <AnimatedSection
        delay={60}
        className="w-full rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
      >
        <div className="grid w-full gap-6 lg:grid-cols-[320px_1fr]">
          <ImageField label="Image du cours" name="image" onChange={handleImageChange} />

          <div className="space-y-4">
            <FormField
              label="Titre du cours"
              placeholder="Ex. Valiha — Les fondamentaux"
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
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SelectField
                label="Instrument"
                options={INSTRUMENTS}
                name="instrument_id"
                value={form.instrument_id}
                onChange={handleChange}
                />
              {/* <SelectField
                label="Niveau"
                options={NIVEAUX}
                name="niveau"
                value={form.niveau}
                onChange={handleChange}
                /> */}
              <FormField
                label="Prix (Ar)"
                name="prix"
                value={form.prix}
                onChange={handleChange}
                />
              <FormField
                label="Durée du cours"
                placeholder="Ex. 4h30"
                name="duree"
                value={form.duree}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        delay={100}
        className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">
            Leçons
          </h3>
          <button
            onClick={() =>
              setLecons([
                ...lecons,
                {
                  id: Date.now(),
                  titre: "Nouvelle leçon",
                  video: false,
                  pdf: false,
                  audio: false,
                },
              ])
            }
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark transition-colors hover:text-brick"
          >
            <HiPlus size={14} /> Ajouter une leçon
          </button>
        </div>

        <div className="space-y-3">
          {lecons.map((l) => (
            <div
              key={l.id}
              className="rounded-xl border border-ivory-dark p-4 transition-colors duration-300 hover:border-coral/30"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  defaultValue={l.titre}
                  className="min-w-0 flex-1 border-b border-transparent bg-transparent font-body text-sm font-semibold text-ink outline-none transition-colors focus:border-coral"
                />
                <button
                  onClick={() => setLecons(lecons.filter((x) => x.id !== l.id))}
                  className="shrink-0 text-ink-soft transition-colors hover:text-brick"
                  aria-label="Supprimer la leçon"
                >
                  <HiOutlineTrash size={15} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOGGLES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => toggleLecon(l.id, t.key)}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-xs font-medium transition-all duration-300 ${
                      l[t.key]
                        ? "border-coral bg-coral/10 text-coral-dark"
                        : "border-ivory-dark text-ink-soft hover:border-coral/30"
                    }`}
                  >
                    <t.icon size={13} /> {t.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={140} className="flex flex-wrap gap-3">
        <button
          onClick={() => setPublishOpen(true)}
          className="rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          Publier le cours
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-full border border-ivory-dark px-6 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
        >
          Enregistrer le brouillon
        </button>
      </AnimatedSection>

      <Modal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        title="Publier ce cours ?"
      >
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          Le cours sera visible dans le catalogue et accessible aux élèves dès
          sa publication. Tu pourras toujours le modifier ensuite.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setPublishOpen(false)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coral py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:bg-coral-dark"
          >
            <HiOutlineCheckCircle size={16} /> Publier
          </button>
        </div>
      </Modal>
    </div>
  );
}
