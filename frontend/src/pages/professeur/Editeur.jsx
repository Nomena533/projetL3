import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineCheckCircle,
  HiOutlinePhoto,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
import Modal from "../../components/Modal";
import { getCourById, storeCour } from "../../app/api/courApi";
import { getInstrument } from "../../app/api/instrumentApi";
import useGetCour from "../../app/hooks/useGetCour";

// Champ select stylé
function SelectField({ label, name, value, onChange, options }) {
  const { id } = useParams();

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
        {options.map((instrument) => (
          <option key={instrument.id} value={instrument.id}>
            {instrument.name}
          </option>
        ))}
      </select>
    </label>
  );
}

// Champ d'import d'image avec aperçu
function ImageField({ label, name, defaultValue, onChange, onPreviewChange }) {
  const [preview, setPreview] = useState(defaultValue || null);
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onPreviewChange?.(url);
    }

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
                <HiOutlinePhoto size={15} />
                Changer l'image
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

// Champ textarea
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

export default function ProfEditeur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instrumentList, setInstrumentList] = useState([]);

  const { cour, fetchCourDetail} = useGetCour();

  useEffect(() => {
    fetchCourDetail(id);
  }, [id]);

  console.log("cour détail : ", cour);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Données du formulaire du cours
  const [form, setForm] = useState({
    instrument_id: "",
    titre: "",
    description: "",
    prix: "",
    image: null,
    duree: "",
  });

  // Récupération des instruments
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await getInstrument();

        setInstrumentList(response.data);
        console.log(instrumentList);
      } catch (error) {
        console.error("Erreur lors de la récupération des instruments", error);
      }
    };

    fetchInstruments();
  }, []);

  // Modification des champs texte/select
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Modification de l'image
  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  // Envoi du cours à Laravel
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
      console.log("Formulaire : ", form);
      console.log("Instrument sélectionné : ", form.instrument_id);
      const response = await storeCour(formData);

      console.log("Insertion réussie", response.data);

      // Après la création du cours,
      // retour vers la liste des cours
      navigate("/professeur/mescours", {
        state: {
          success: "Le cour a été crée avec succès !",
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'insertion", error.response?.data);
    }
  };

  const selectedInstrument = instrumentList.find(
    (i) => String(i.id) === String(form.instrument_id),
  );

  return (
    <div className="w-full space-y-6">
      {/* Retour vers la liste des cours */}
      <button
        onClick={() => navigate("/professeur/mescours")}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} />
        {/* Retour à mes cours { id ?  cour.titre : ""} */}
        Retour à mes cours
      </button>

      {/* Titre de la page */}
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Éditeur de cours
        </span>

        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {id ? "Modifier le cours" : "Nouveau cours"}
        </h2>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* Colonne principale : formulaire */}
        <div className="space-y-6">
          {/* Formulaire du cours */}
          <AnimatedSection
            delay={60}
            className="w-full rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
          >
            <div className="grid w-full gap-6 lg:grid-cols-[320px_1fr]">
              {/* Image */}
              <ImageField
                label="Image du cours"
                name="image"
                onChange={handleImageChange}
                onPreviewChange={setImagePreview}
              />

              {/* Ajout */}
              <div className="space-y-4">
                {/* Titre */}
                <FormField
                  label="Titre du cours"
                  placeholder="Ex. Valiha — Les fondamentaux"
                  name="titre"
                  value={form.titre}
                  onChange={handleChange}
                />               

                {/* Description */}
                <TextAreaField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />

                {/* Autres informations */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Instrument */}
                  <SelectField
                    label="Instrument"
                    options={instrumentList}
                    name="instrument_id"
                    value={form.instrument_id}
                    onChange={handleChange}
                  />

                  {/* Prix */}
                  <FormField
                    label="Prix (Ar)"
                    name="prix"
                    value={form.prix}
                    onChange={handleChange}
                  />

                  {/* Durée */}
                  <FormField
                    label="Durée du cours"
                    placeholder="Ex. 4h30"
                    name="duree"
                    value={form.duree}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Modification */}
              {/* <div className="space-y-4">
                Titre
                <FormField
                  label="Titre du cours"
                  placeholder="Ex. Valiha — Les fondamentaux"
                  name="titre"
                  value={id ? cour.titre : form.titre}
                  onChange={handleChange}
                />               

                Description
                <TextAreaField
                  label="Description"
                  name="description"
                  value={id ? cour.description : form.description}
                  onChange={handleChange}
                />

                Autres informations 
                <div className="grid gap-4 sm:grid-cols-3">
                  Instrument
                  <SelectField
                    label="Instrument"
                    options={instrumentList}
                    name="instrument_id"
                    value={id ? cour.instrument_id : form.instrument_id}
                    onChange={handleChange}
                  />

                  Prix
                  <FormField
                    label="Prix (Ar)"
                    name="prix"
                    value={id ? cour.prix : form.prix}
                    onChange={handleChange}
                  />

                  Durée
                  <FormField
                    label="Durée du cours"
                    placeholder="Ex. 4h30"
                    name="duree"
                    value={id ? cour.duree : form.duree}
                    onChange={handleChange}
                  />
                </div>
              </div>*/}
            </div>
          </AnimatedSection>

          {/* Info : les leçons se gèrent depuis la page de détail, une fois le cours créé */}
          <AnimatedSection
            delay={90}
            className="flex items-start gap-3 rounded-2xl border border-dashed border-coral/40 bg-coral/5 p-5"
          >
            <HiOutlineInformationCircle
              size={20}
              className="mt-0.5 shrink-0 text-coral-dark"
            />
            <p className="font-body text-sm leading-relaxed text-ink-soft">
              Ce formulaire crée uniquement les informations générales du cours.
              Une fois enregistré, tu pourras ajouter ses leçons (vidéo, PDF ou
              audio) depuis sa page de détail.
            </p>
          </AnimatedSection>

          {/* Bouton */}
          <AnimatedSection delay={120} className="flex flex-wrap gap-3">
            <button
              onClick={() => setConfirmOpen(true)}
              className="rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            >
              Enregistrer le brouillon
            </button>
          </AnimatedSection>
        </div>

        {/* Colonne latérale : aperçu de la fiche + conseils */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <AnimatedSection
            delay={80}
            className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 p-6"
          >
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Aperçu de la fiche
            </span>

            <div className="overflow-hidden rounded-xl border border-ivory-dark">
              <div className="flex aspect-video w-full items-center justify-center bg-ivory-dark/40">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Aperçu du cours"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <HiOutlinePhoto size={24} className="text-ink-soft" />
                )}
              </div>
              <div className="space-y-1.5 p-4">
                <p className="line-clamp-1 font-display text-sm font-semibold text-ink">
                  {form.titre || "Titre du cours"}
                </p>
                <p className="font-body text-xs text-ink-soft">
                  {selectedInstrument?.name || "Instrument"}
                  {form.duree && ` · ${form.duree}`}
                </p>
                <p className="font-mono text-sm text-coral-dark">
                  {form.prix
                    ? `${Number(form.prix).toLocaleString("fr-FR")} Ar`
                    : "Prix"}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={110}
            className="space-y-3 rounded-2xl border border-ivory-dark bg-white/70 p-6"
          >
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Conseils
            </span>
            <ul className="space-y-2.5 font-body text-xs leading-relaxed text-ink-soft">
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-coral" />
                Choisis un titre clair, avec l'instrument et le niveau visé.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-coral" />
                Une image lumineuse et nette donne davantage envie de
                s'inscrire.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-coral" />
                Indique la durée totale réelle du cours, pas seulement d'une
                leçon.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-coral" />
                Décris ce que l'élève saura faire une fois le cours terminé.
              </li>
            </ul>
          </AnimatedSection>
        </div>
      </div>

      {/* Confirmation d'enregistrement */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Enregistrer ce cours ?"
      >
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          Le cours sera créé avec les informations saisies. Tu pourras ensuite
          lui ajouter des leçons et le modifier à tout moment.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setConfirmOpen(false)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>

          <button
            onClick={handleSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coral py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:bg-coral-dark"
          >
            <HiOutlineCheckCircle size={16} />
            Enregistrer
          </button>
        </div>
      </Modal>
    </div>
  );
}
