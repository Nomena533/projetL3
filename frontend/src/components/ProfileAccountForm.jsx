import { useEffect, useRef, useState } from "react";
import {
  HiOutlineCamera,
  HiOutlineCheckCircle,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useAuth } from "../app/hooks/useAuth";
import { updateProfile } from "../app/api/authApi";
import { BASE_URL } from "../app/api/api";
import AnimatedSection from "./AnimatedSection";
import FormField from "./FormField";
import SettingsSection from "./SettingsSection";
import { useLang } from "../app/hooks/useLang";

// Ce formulaire commun permet aux élèves et aux administrateurs d'enregistrer les champs partagés.
export default function ProfileAccountForm({ description, roleLabel, showBio = false }) {
  const { t } = useLang();
  const { user, setUser } = useAuth();
  console.log("user : ", user);
  
  const [form, setForm] = useState(() => user ? {
    firstname: user.firstname || "",
    name: user.name || "",
    email: user.email || "",
    telephone: user.telephone || "",
    bio: user.bio || "",
    password: "",
  } : null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoObjectUrl = useRef(null);
  const photoInput = useRef(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Les champs sont contrôlés par React pour envoyer les valeurs réellement éditées.
  useEffect(() => () => {
    if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
  }, []);

  // L'aperçu d'un fichier local est libéré quand le fichier change ou que le composant disparaît.
  const displayedPhoto = photoPreview || (!removePhoto && user?.photo
    ? `${BASE_URL}/storage/${user.photo}`
    : null);
  const initials = user
    ? `${user.firstname?.[0] || ""}${user.name?.[0] || ""}`.toUpperCase()
    : "?";

  // Envoie le formulaire multipart, puis remplace aussi l'utilisateur en mémoire après succès.
  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "password" || value) data.append(key, value);
    });
    if (form.password) data.append("password_confirmation", passwordConfirmation);
    if (photo) data.append("photo", photo);
    if (removePhoto) data.append("remove_photo", "1");
    data.append("_method", "PUT");

    try {
      const response = await updateProfile(data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
      photoObjectUrl.current = null;
      setPhoto(null);
      setPhotoPreview(null);
      if (photoInput.current) photoInput.current.value = "";
      setRemovePhoto(false);
      setPasswordConfirmation("");
      setForm((current) => ({ ...current, password: "" }));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (requestError) {
      const validationMessages = requestError.response?.data?.errors;
      setError(
        validationMessages
          ? Object.values(validationMessages).flat().join(" ")
          : requestError.response?.data?.message ||
              t("La modification du profil a échoué. Réessaie."),
      );
    } finally {
      setSaving(false);
    }
  }

  if (!form) return null;

  return (
    <form className="space-y-8" onSubmit={handleSave}>
      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={60}>
          <SettingsSection
            icon={HiOutlineUserCircle}
            title={t("Photo de profil")}
            description={t("Choisis une image claire ou retire la photo actuelle.")}
          >
            <div className="flex items-center gap-4 py-5">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-coral/10 font-display text-lg text-coral-dark">
                {displayedPhoto ? (
                  <img src={displayedPhoto} alt={t("Photo du profil")} className="h-full w-full object-cover" />
                ) : initials}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="account-profile-photo"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink hover:border-coral/40"
                >
                  <HiOutlineCamera size={16} />{t("Changer la photo")}</label>
                <input
                  ref={photoInput}
                  id="account-profile-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) => {
                    const selectedPhoto = event.target.files?.[0] || null;
                    if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
                    photoObjectUrl.current = selectedPhoto ? URL.createObjectURL(selectedPhoto) : null;
                    setPhoto(selectedPhoto);
                    setPhotoPreview(photoObjectUrl.current);
                    setRemovePhoto(false);
                  }}
                />
                {user?.photo && (
                  <button
                    type="button"
                    onClick={() => {
                      if (photoObjectUrl.current) URL.revokeObjectURL(photoObjectUrl.current);
                      photoObjectUrl.current = null;
                      setPhoto(null);
                      setPhotoPreview(null);
                      setRemovePhoto(true);
                    }}
                    className="text-left font-body text-xs font-medium text-ink-soft hover:text-brick"
                  >{t("Supprimer la photo")}</button>
                )}
              </div>
            </div>
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <SettingsSection
            icon={HiOutlineLockClosed}
            title={t("Sécurité")}
            description={t("Laisse ces champs vides pour conserver ton mot de passe actuel.")}
          >
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <FormField
                label={t("Nouveau mot de passe")}
                name="password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
                autoComplete="new-password"
                placeholder={t("8 caractères minimum")}
              />
              <FormField
                label={t("Confirmer le mot de passe")}
                type="password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                autoComplete="new-password"
                placeholder={t("Confirmer le mot de passe")}
              />
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={140}>
        <SettingsSection
          icon={HiOutlineIdentification}
          title={t("Informations personnelles")}
          description={description}
        >
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            {[
              [t("Prénom"), "firstname", "text", t("Prénom")],
              [t("Nom"), "name", "text", t("Nom")],
              ["E-mail", "email", "email", "email@exemple.com"],
              [t("Téléphone"), "telephone", "tel", "034 00 000 00"],
            ].map(([label, name, type, placeholder]) => (
              <FormField
                key={name}
                label={label}
                name={name}
                type={type}
                // value={form[name]}
                value={form[name]}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [name]: event.target.value }))
                }
                placeholder={placeholder}
                autoComplete={name === "email" ? "email" : name}
              />
            ))}
            {showBio && (
              <label className="sm:col-span-2">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{t("Présentation publique")}</span>
                <textarea
                  rows={4}
                  name="bio"
                  value={form.bio}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, bio: event.target.value }))
                  }
                  placeholder={t("Quelques lignes sur toi…")}
                  className="w-full rounded-xl border border-ivory-dark bg-white/70 dark:bg-white/15 px-4 py-3 font-body text-sm text-ink outline-none focus:border-coral"
                />
              </label>
            )}
          </div>
          {roleLabel && (
            <div className="border-t border-ivory-dark py-4 font-body text-sm text-ink-soft">{t("Rôle : {{roleLabel}}", { roleLabel })}</div>
          )}
        </SettingsSection>
      </AnimatedSection>

      {error && <p role="alert" className="font-body text-sm text-brick">{error}</p>}
      <AnimatedSection delay={180}>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all hover:bg-coral-dark disabled:cursor-wait disabled:opacity-60"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saving ? t("Enregistrement…") : saved ? t("Profil enregistré") : t("Enregistrer les modifications")}
        </button>
      </AnimatedSection>
    </form>
  );
}
