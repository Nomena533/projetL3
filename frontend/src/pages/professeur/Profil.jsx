import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiOutlineCamera,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import AnimatedSection from "../../components/AnimatedSection";
import SettingsSection from "../../components/SettingsSection";
import FormField from "../../components/FormField";
import { useAuth } from "../../app/hooks/useAuth";
import { updateProfile } from "../../app/api/authApi";
import { BASE_URL } from "../../app/api/api";
import { useUser } from "../../app/hooks/useUser";
import {
  parseList,
  EMPTY_EXPERIENCE,
  EMPTY_PARCOURS,
} from "../../lib/profPortfolio";
import { useInstrument } from "../../app/hooks/useInstrument";
import Select from "react-select";
import { useLang } from "../../app/hooks/useLang";
import { ActionFeedback, DataGate } from "../../components/AsyncState";
import useAsyncAction from "../../app/hooks/useAsyncAction";

const INPUT_CLS =
  "w-full rounded-xl border border-ivory-dark bg-white/70 dark:bg-white/15 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral";

// Style du Select aligné sur INPUT_CLS (+ mode sombre)
const SELECT_CLASSNAMES = {
  control: ({ isFocused }) =>
    `w-full rounded-xl border bg-white/70 dark:bg-white/15 px-4 py-2 font-body text-sm text-ink transition-colors duration-300 ${
      isFocused ? "border-coral" : "border-ivory-dark"
    }`,
  valueContainer: () => "gap-1.5 py-0.5",
  placeholder: () => "text-ink-soft",
  input: () => "text-ink",
  multiValue: () =>
    "flex items-center gap-1 rounded-full bg-coral/10 dark:bg-coral/20 pl-2.5 pr-1 py-0.5",
  multiValueLabel: () => "text-xs font-semibold text-coral-dark",
  multiValueRemove: () =>
    "rounded-full p-0.5 text-coral-dark hover:bg-coral/20 hover:text-brick cursor-pointer",
  indicatorsContainer: () => "gap-1",
  clearIndicator: () => "p-1 text-ink-soft hover:text-brick cursor-pointer",
  dropdownIndicator: () => "p-1 text-ink-soft hover:text-coral cursor-pointer",
  indicatorSeparator: () => "hidden",
  menu: () =>
    "mt-2 overflow-hidden rounded-xl border border-ivory-dark bg-white dark:bg-zinc-900 shadow-lg",
  menuList: () => "max-h-60 overflow-y-auto p-1.5",
  option: ({ isFocused, isSelected }) =>
    `cursor-pointer rounded-lg px-3 py-2 font-body text-sm transition-colors ${
      isSelected
        ? "bg-coral text-ivory"
        : isFocused
          ? "bg-coral/10 dark:bg-white/10 text-ink"
          : "text-ink"
    }`,
  noOptionsMessage: () => "px-3 py-2 font-body text-sm text-ink-soft",
};

function ProfProfilContent() {
  const { t } = useLang();
  const { instruments } = useInstrument();
  const instrumentOptions = useMemo(
    () => (instruments ?? []).map((instrument) => ({
      value: instrument.id,
      label: instrument.name,
    })),
    [instruments],
  );
  const { user, setUser } = useAuth();
  // Après sauvegarde, recharge la liste partagée utilisée par la page publique du professeur.
  const { fetchUserList } = useUser();
  const [saved, setSaved] = useState(false);
  const [selectedInstrumentIds, setSelectedInstrumentIds] = useState(
    () => (user?.instruments ?? []).map((instrument) => instrument.id),
  );
  const [form, setForm] = useState(() => user ? {
    name: user.name || "",
    firstname: user.firstname || "",
    bio: user.bio || "",
    email: user.email || "",
    password: "",
    telephone: user.telephone || "",
    photo: null,
    // --- Portfolio (page publique detailProf) ---
    titre: user.titre || "",
    ville: user.ville || "",
    annees_experiences: user.annees_experiences || "",
    experiences: parseList(user.experiences).map((experience) => ({
      ...EMPTY_EXPERIENCE,
      ...experience,
      periode_debut: experience.periode_debut || "",
      periode_fin: experience.periode_fin || "",
    })),
    parcours: parseList(user.parcours).map((parcours) => ({
      ...EMPTY_PARCOURS,
      ...parcours,
      periode_debut: parcours.periode_debut || "",
      periode_fin: parcours.periode_fin || "",
    })),
  } : null);
  const [photoPreview, setPhotoPreview] = useState(
    () => user?.photo ? `${BASE_URL}/storage/${user.photo}` : null,
  );
  const photoObjectUrl = useRef(null);
  const photoInput = useRef(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // Enregistrement du profil (spinner plein écran + erreur avec « Réessayer »)
  const action = useAsyncAction();
  const saving = action.pending;
  const [errorMessage, setErrorMessage] = useState("");

  const initials = user
    ? `${user.firstname?.[0] || ""}${user.name?.[0] || ""}`.toUpperCase()
    : "?";

  // L'aperçu local est révoqué lorsque l'utilisateur quitte le formulaire.
  useEffect(() => {
    return () => {
      if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
    };
  }, []);

  // Les options restent contrôlées même si la liste des instruments arrive après le profil.
  const selection = instrumentOptions.filter((option) =>
    selectedInstrumentIds.includes(option.value),
  );

  // --- Listes dynamiques (expériences / parcours) ---
  const updateItem = (key, index, field, value) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].map((it, i) =>
        i === index ? { ...it, [field]: value } : it,
      ),
    }));
  const addItem = (key, empty) =>
    setForm((f) => ({ ...f, [key]: [...f[key], { ...empty }] }));
  const removeItem = (key, index) =>
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }));

  // Modification des champs texte/select
  const handleChange = (e) => {
    // La mise à jour fonctionnelle évite d'écraser une saisie si plusieurs champs changent rapidement.
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  // Modification de l'image
  const handleImageChange = (e) => {
    // Une nouvelle image annule une demande de suppression faite précédemment.
    const selectedPhoto = e.target.files?.[0] || null;
    if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
    photoObjectUrl.current = selectedPhoto ? URL.createObjectURL(selectedPhoto) : null;
    setForm((current) => ({ ...current, photo: selectedPhoto }));
    setPhotoPreview(photoObjectUrl.current);
    setRemovePhoto(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (saving) return;
    setSaved(false);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("firstname", form.firstname);
    formData.append("email", form.email);
    formData.append("telephone", form.telephone);
    formData.append("bio", form.bio);
    // Portfolio
    formData.append("titre", form.titre);
    formData.append("ville", form.ville);
    formData.append("annees_experiences", form.annees_experiences);
    formData.append(
      "instrument_ids",
      JSON.stringify(selectedInstrumentIds),
    );
    // On n'envoie que les lignes réellement remplies
    formData.append(
      "experiences",
      JSON.stringify(form.experiences.filter((experience) => experience.poste.trim())),
    );
    formData.append(
      "parcours",
      JSON.stringify(form.parcours.filter((parcours) => parcours.diplome.trim())),
    );
    if (form.photo) {
      formData.append("photo", form.photo);
    }
    if (removePhoto) {
      formData.append("remove_photo", "1");
    }
    if (form.password) {
      formData.append("password", form.password);
      formData.append("password_confirmation", passwordConfirmation);
    }

    return action.run("Enregistrement du profil", async () => {
      // Laravel reçoit les uploads multipart en POST et utilise ce champ pour router la requête comme un PUT.
      formData.append("_method", "PUT");
      const response = await updateProfile(formData);
      // Le serveur renvoie le profil enrichi : il met à jour le formulaire et le stockage de session.
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSelectedInstrumentIds((response.data.user.instruments ?? []).map((instrument) => instrument.id));
      setPhotoPreview(response.data.user.photo ? `${BASE_URL}/storage/${response.data.user.photo}` : null);
      if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
      photoObjectUrl.current = null;
      setForm((current) => ({ ...current, password: "", photo: null }));
      if (photoInput.current) photoInput.current.value = "";
      // Un échec du rechargement de la liste ne doit pas renvoyer le profil (« Réessayer »)
      await Promise.resolve(fetchUserList()).catch(() => {});
      setPasswordConfirmation("");
      setRemovePhoto(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    }, {
      errorMessage: t("La modification du profil a échoué. Réessaie."),
      // Erreurs de validation (422) : affichées dans le formulaire, comme avant.
      onError: (requestError) => {
        const validationMessages = requestError.response?.data?.errors;
        if (validationMessages) {
          setErrorMessage(Object.values(validationMessages).flat().join(" "));
          return true;
        }
        return false;
      },
    });
  };

  return (
    <div className="space-y-8">
      <ActionFeedback action={action} />
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{t("Mon compte")}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t("Mon profil")}</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">{t("Ces informations sont visibles par tes élèves sur ta fiche professeur.")}</p>
        {user?.id && (
          <Link
            to={`/professeurs/${user.id}`}
            className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark hover:text-brick"
          >
            <HiOutlineEye size={16} />{" "}{t("Voir ma fiche publique")}</Link>
        )}
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={60}>
          <SettingsSection
            icon={HiOutlineUserCircle}
            title={t("Photo de profil")}
            description={t("Une photo claire aide les élèves à te reconnaître.")}
          >
            <div className="flex items-center gap-4 py-5">
              {photoPreview ? (
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-coral/10 font-display text-lg text-coral-dark">
                  <img
                    src={photoPreview}
                    alt={t("photo de profil")}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-coral/10 font-display text-lg text-coral-dark">
                  {initials}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="professeur-profile-photo"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40"
                >
                  <HiOutlineCamera size={16} />{t("Changer la photo")}</label>
                <input
                  ref={photoInput}
                  id="professeur-profile-photo"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
                    photoObjectUrl.current = null;
                    setForm((current) => ({ ...current, photo: null }));
                    setPhotoPreview(null);
                    setRemovePhoto(true);
                  }}
                  className="font-body text-xs font-medium text-ink-soft transition-colors hover:text-brick"
                >{t("Supprimer la photo")}</button>
              </div>
            </div>
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <SettingsSection
            icon={HiOutlineLockClosed}
            title={t("Sécurité")}
            description={t("Modifie le mot de passe de ton compte.")}
          >
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <FormField
                label={t("Nouveau mot de passe")}
                type="password"
                name="password"
                value={form?.password ?? ""}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <FormField
                label={t("Confirmer le mot de passe")}
                type="password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                placeholder="••••••••"
              />
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      {/* Information personnel */}
      <AnimatedSection delay={140}>
        <SettingsSection
          icon={HiOutlineIdentification}
          title={t("Informations personnelles")}
          description={t("Ton identité et ta présentation publique.")}
        >
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <FormField
              label={t("Prénom")}
              name="firstname"
              value={form?.firstname}
              onChange={handleChange}
              placeholder={t("Prénom")}
            />
            <FormField
              label={t("Nom")}
              name="name"
              value={form?.name}
              onChange={handleChange}
              placeholder={t("Nom")}
            />
            <FormField
              label="E-mail"
              type="email"
              name="email"
              value={form?.email}
              onChange={handleChange}
              placeholder="email@exemple.com"
            />
            <FormField
              label={t("Téléphone")}
              type="tel"
              name="telephone"
              value={form?.telephone}
              onChange={handleChange}
              placeholder="034 00 000 00"
            />
            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{t("Présentation publique")}</span>
              </label>
              <textarea
                rows={4}
                name="bio"
                value={form?.bio ?? ""}
                onChange={handleChange}
                placeholder={t("Quelques lignes sur ton parcours et ta pédagogie…")}
                className={INPUT_CLS}
              />
            </div>
          </div>
        </SettingsSection>
      </AnimatedSection>

      {/* Présnetation professionnelle */}
      <AnimatedSection delay={160}>
        <SettingsSection
          icon={HiOutlineBriefcase}
          title={t("Présentation professionnelle")}
          description={t("Affichée en tête de ta fiche publique.")}
        >
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <FormField
              label={t("Titre / spécialité principale")}
              name="titre"
              value={form?.titre}
              onChange={handleChange}
              placeholder={t("Ex. Professeur de valiha")}
            />
            <FormField
              label={t("Ville")}
              name="ville"
              value={form?.ville}
              onChange={handleChange}
              placeholder={t("Antananarivo")}
            />
            <FormField
              label={t("Années d'expérience")}
              type="number"
              name="annees_experiences"
              value={form?.annees_experiences}
              onChange={handleChange}
              placeholder="10"
              min="1"
            />
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{t("Instruments enseignés")}</label>
              <Select
                isMulti
                unstyled
                options={instrumentOptions}
                value={selection}
                onChange={(selectedOptions) =>
                  setSelectedInstrumentIds((selectedOptions ?? []).map((option) => option.value))
                }
                placeholder={t("Séléctionner les instruments")}
                noOptionsMessage={() => t("Aucun instrument disponible")}
                // Le menu est rendu dans <body> : il n'est plus rogné par
                // l'overflow des sections ni recouvert par les blocs suivants
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                classNames={SELECT_CLASSNAMES}
              />
            </div>
          </div>
        </SettingsSection>
      </AnimatedSection>

      {/* Expériences */}
      <AnimatedSection delay={170}>
        <SettingsSection
          icon={HiOutlineBriefcase}
          title={t("Expériences")}
          description={t("Tes postes, scènes, enseignements et projets marquants.")}
        >
          <div className="space-y-4 py-5">
            {form?.experiences.map((exp, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-xl border border-ivory-dark p-4 sm:grid-cols-2"
              >
                <FormField
                  label={t("Poste / rôle")}
                  name={`exp-poste-${i}`}
                  value={exp.poste}
                  onChange={(e) =>
                    updateItem("experiences", i, "poste", e.target.value)
                  }
                  placeholder={t("Ex. Professeur de valiha")}
                />
                <FormField
                  label={t("Lieu / organisation")}
                  name={`exp-lieu-${i}`}
                  value={exp.lieu}
                  onChange={(e) =>
                    updateItem("experiences", i, "lieu", e.target.value)
                  }
                  placeholder={t("Ex. Conservatoire d'Antananarivo")}
                />
                <FormField
                  label={t("Période début")}
                  type="date"
                  name={`exp-periode-${i}`}
                  value={exp.periode_debut}
                  onChange={(e) =>
                    updateItem("experiences", i, "periode_debut", e.target.value)
                  }
                  placeholder="2018"
                />
                <FormField
                  label={t("Période fin")}
                  type="date"
                  name={`exp-periode-fin-${i}`}
                  value={exp.periode_fin}
                  onChange={(e) =>
                    updateItem("experiences", i, "periode_fin", e.target.value)
                  }
                  placeholder="2023"
                />
                <div className="sm:col-span-2">
                  <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{t("Description")}</span>
                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) =>
                      updateItem(
                        "experiences",
                        i,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder={t("Missions, réalisations…")}
                    className={INPUT_CLS}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("experiences", i)}
                  className="inline-flex items-center gap-1.5 justify-self-start font-body text-xs font-medium text-ink-soft transition-colors hover:text-brick"
                >
                  <HiOutlineTrash size={14} />{" "}{t("Supprimer")}</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem("experiences", EMPTY_EXPERIENCE)}
              className="inline-flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40"
            >
              <HiOutlinePlus size={16} />{" "}{t("Ajouter une expérience")}</button>
          </div>
        </SettingsSection>
      </AnimatedSection>

      {/* Parcours */}
      <AnimatedSection delay={175}>
        <SettingsSection
          icon={HiOutlineAcademicCap}
          title={t("Parcours")}
          description={t("Diplômes, formations et apprentissages.")}
        >
          <div className="space-y-4 py-5">
            {form?.parcours.map((p, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-xl border border-ivory-dark p-4 sm:grid-cols-2"
              >
                <FormField
                  label={t("Diplôme / formation")}
                  name={`parcours-diplome-${i}`}
                  value={p.diplome}
                  onChange={(e) =>
                    updateItem("parcours", i, "diplome", e.target.value)
                  }
                  placeholder={t("Ex. Licence en musicologie")}
                />
                <FormField
                  label={t("Établissement")}
                  name={`parcours-etab-${i}`}
                  value={p.etablissement}
                  onChange={(e) =>
                    updateItem("parcours", i, "etablissement", e.target.value)
                  }
                  placeholder={t("Ex. EGM")}
                />
                <FormField
                  label={t("Période début")}
                  type="date"
                  name={`parcours-periode-debut-${i}`}
                  value={p.periode_debut}
                  onChange={(e) =>
                    updateItem("parcours", i, "periode_debut", e.target.value)
                  }
                  placeholder="2012"
                />
                <FormField
                  label={t("Période fin")}
                  type="date"
                  name={`parcours-periode-fin-${i}`}
                  value={p.periode_fin}
                  onChange={(e) =>
                    updateItem("parcours", i, "periode_fin", e.target.value)
                  }
                  placeholder="2015"
                />
                <button
                  type="button"
                  onClick={() => removeItem("parcours", i)}
                  className="inline-flex items-center gap-1.5 self-end justify-self-start font-body text-xs font-medium text-ink-soft transition-colors hover:text-brick"
                >
                  <HiOutlineTrash size={14} />{" "}{t("Supprimer")}</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem("parcours", EMPTY_PARCOURS)}
              className="inline-flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40"
            >
              <HiOutlinePlus size={16} />{" "}{t("Ajouter une formation")}</button>
          </div>
        </SettingsSection>
      </AnimatedSection>

      <AnimatedSection delay={180}>
        {errorMessage && (
          <p role="alert" className="mb-4 font-body text-sm text-brick">
            {errorMessage}
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={saving || !form}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saving ? t("Enregistrement…") : saved ? t("Profil enregistré") : t("Enregistrer les modifications")}
        </button>
      </AnimatedSection>
    </div>
  );
}

export default function ProfProfil() {
  const instruments = useInstrument();

  return (
    <DataGate
      sources={[
        {
          label: "Chargement des instruments",
          loading: instruments.loading,
          error: instruments.error,
          retry: instruments.fecthInstruments,
        },
      ]}
    >
      <ProfProfilContent />
    </DataGate>
  );
}
