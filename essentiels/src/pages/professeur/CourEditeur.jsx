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
import { storeCour, updateCour } from "../../app/api/courApi";
import { getInstrument } from "../../app/api/instrumentApi";
import useGetCour from "../../app/hooks/useGetCour";
import { BASE_URL } from "../../app/api/api";
import { getLevel } from "../../app/api/levelApi";

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
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

// Champ d'import d'image avec aperçu
function ImageField({ label, name, defaultValue, onChange, onPreviewChange }) {
  const [preview, setPreview] = useState(defaultValue || null);

  useEffect(() => {
    setPreview(defaultValue || null);
  }, [defaultValue]);

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
        // onClick={() => inputRef.current?.click()}
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

export default function ProfCourEditeur() {
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const [instrumentList, setInstrumentList] = useState([]);
  const [levelList, setLevelList] = useState([]);

  const { cour, fetchCours, fetchCourDetail } = useGetCour();
  const [courDetail, setCourDetail] = useState(null)

  useEffect(() => {
    fetchCourDetail(id);
  }, [id]);

  useEffect(() => {
    if (cour !== null) {
      setCourDetail(cour.cour);
    }
  }, [cour]);

  console.log("cour détail : ", cour);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (courDetail) {
      setImagePreview(`${BASE_URL}/storage/${courDetail.image}`);
    }
  }, [courDetail]);

  // Données du formulaire du cours
  const [form, setForm] = useState({
    instrument_id: "",
    niveau_id: "",
    titre: "",
    description: "",
    // prix: "",
    image: null,
    duree: "",
  });

  // insères les donnés récupérer par cour et les ajoutes dans le const form
  // plus besoin de faire {id ? cour.nanana : form.nanana} dans le formulaire
  useEffect(() => {
    if (courDetail) {
      setForm({
        instrument_id: courDetail.instrument_id || "",
        niveau_id: courDetail.niveau_id || "",
        titre: courDetail.titre || "",
        description: courDetail.description || "",
        // prix: courDetail.prix || "",
        image: null,
        duree: courDetail.duree || "",
      });
      // setImagePreview(`${BASE_URL}/storage/${courDetail.image}`);
    }
  }, [courDetail]);

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
  
  // Récupération des niveaux
  useEffect(() => {
    const fetchNiveaux = async () => {
      try {
        const response = await getLevel();

        setLevelList(response.data);
        console.log("level : ",levelList);
      } catch (error) {
        console.error("Erreur lors de la récupération des Niveaux", error.response?.data);
      }
    };

    fetchNiveaux();
  }, []);

  // Modification des champs texte/select
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

  // Modification de l'image
  const handleImageChange = (e) => {
    setForm({
      ...form,
      /**
       * e.target.files[0] => même si l'user sélectionne une seul image, le navigateur fournit une collection de fichier
       *  => DONC , e.target.files[0] prend le premier fichier sélectionné
       */
      image:e.target.files[0]
    });
  };

  // handleSubmit : gère à la fois la modification et la création du cour
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("titre", form.titre);
    formData.append("instrument_id", form.instrument_id);
    formData.append("niveau_id", form.niveau_id);
    formData.append("description", form.description);
    // formData.append("prix", form.prix);
    formData.append("duree", form.duree);

    if (form.image) {
      formData.append("image", form.image);
    }

    console.log("form : ", form);

    try {
      let response;

      if (id) {
        // Modification

        // convertit un method post en put
        // nécessaire pour l'envoi de fichier avec multipart/formdata
        formData.append("_method", "PUT"); // n'est pas nécessaire si il n'y a pas d'envoi de fichier car dans courApi.js c'est déjà put, on ne convertit donc pas un post en put

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        response = await updateCour(id, formData);
      } else {
        // Ajout
        response = await storeCour(formData);
      }

      await fetchCours();
      console.log("Opération réussie", response.data);

      // Après la création du cours, retour vers la liste des cours
      navigate("/professeur/mescours", {
        state: {
          success: id
            ? "Le cour a été modifié avec succès !"
            : "Le cour a été crée avec succès !",
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'opération", error.response?.data);
    }
  };

  const selectedInstrument = instrumentList.find(
    (i) => String(i.id) === String(form.instrument_id),
  );

  const selectedNiveau= levelList.find(
    (n) => String(n.id) === String(form.niveau_id),
  );

  if (id && courDetail == null) {
    return (
      <p className="font-body text-sm text-ink-soft">Chargement du cours…</p>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Retour vers la liste des cours */}
      <button
        onClick={() => navigate("/professeur/mescours")}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} />
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
                defaultValue={imagePreview}
                onChange={handleImageChange}
                onPreviewChange={setImagePreview}
              />

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
                  {/* Niveau */}
                  <SelectField
                    label="Niveau"
                    options={levelList}
                    name="niveau_id"
                    value={form.niveau_id}
                    onChange={handleChange}
                  />
                  {/* Prix */}
                  {/* <FormField
                    label="Prix (Ar)"
                    name="prix"
                    value={form.prix}
                    onChange={handleChange}
                  /> */}
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
                  {form.titre || "Titre du cours"} - {selectedNiveau?.name || "Niveau"}
                </p>
                <p className="font-body text-xs text-ink-soft">
                  {selectedInstrument?.name || "Instrument"}
                  {form.duree && ` · ${form.duree}`}
                </p>
                {/* <p className="font-mono text-sm text-coral-dark">
                  {form.prix
                    ? `${Number(form.prix).toLocaleString("fr-FR")} Ar`
                    : "Prix"}
                </p> */}
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
