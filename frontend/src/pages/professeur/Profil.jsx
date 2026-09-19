import { useEffect, useState } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiOutlineCamera,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import SettingsSection from "../../components/SettingsSection";
import FormField from "../../components/FormField";
import { useAuth } from "../../app/hooks/useAuth";
import { updateProfile } from "../../app/api/authApi";
import { BASE_URL } from "../../app/api/api";

export default function ProfProfil() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(null);

  const initials = user
    ? `${user.firstname?.[0] || ""}${user.name?.[0] || ""}`.toUpperCase()
    : "?";

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        firstname: user.firstname || "",
        bio: user.bio || "",
        email: user.email || "",
        password: user.password || "",
        telephone: user.telephone || "",
        photo: null,
      });
    }
  }, [user]);

  console.log("form 1 : ", form)

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
      photo:e.target.files[0]
    });
  };

  const handleSave = async (e) => {
    console.log("tonga");
    e.preventDefault();
    // setSaved(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("firstname", form.firstname);
    formData.append("email", form.email);
    formData.append("telephone", form.telephone);
    formData.append("bio", form.bio);
    if (form.photo) {
      formData.append("photo", form.photo);
    }
    if (form.password) {
      formData.append("password", form.password);
    }

    console.log("form : ", form);
    return;

    try {
      // convertit un method post en put
      // nécessaire pour l'envoi de fichier avec multipart/formdata
      // n'est pas nécessaire si il n'y a pas d'envoi de fichier car dans courApi.js c'est déjà put, on ne convertit donc pas un post en put
      formData.append("_method", "PUT");
      const response = await updateProfile(formData);
      console.log("Modification profil réussie", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la modification du profil",
        error.response?.data,
      );
    } finally {
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          Mon compte
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Mon profil
        </h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Ces informations sont visibles par tes élèves sur ta fiche professeur.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={60}>
          <SettingsSection
            icon={HiOutlineUserCircle}
            title="Photo de profil"
            description="Une photo claire aide les élèves à te reconnaître."
          >
            <div className="flex items-center gap-4 py-5">
              {form?.photo ? (
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-coral/10 font-display text-lg text-coral-dark">
                  <img
                    src={`${BASE_URL}/storage/${form?.photo}`}
                    alt="photo de profil"
                    
                    srcset=""
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
                  <HiOutlineCamera size={16} />
                  Changer la photo
                </label>
                <input
                  id="professeur-profile-photo"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <button
                  type="button"
                  className="font-body text-xs font-medium text-ink-soft transition-colors hover:text-brick"
                >
                  Supprimer la photo
                </button>
              </div>
            </div>
          </SettingsSection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <SettingsSection
            icon={HiOutlineLockClosed}
            title="Sécurité"
            description="Modifie le mot de passe de ton compte."
          >
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <FormField
                label="Nouveau mot de passe"
                type="password"
                name="password"
                valud={form?.password}
                placeholder="••••••••"
              />
              <FormField
                label="Confirmer le mot de passe"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </SettingsSection>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={140}>
        <SettingsSection
          icon={HiOutlineIdentification}
          title="Informations personnelles"
          description="Ton identité et ta présentation publique."
        >
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <FormField
              label="Prénom"
              name="firstname"
              value={form?.firstname}
              onChange={handleChange}
              placeholder="Prénom"
            />
            <FormField
              label="Nom"
              name="name"
              value={form?.name}
              onChange={handleChange}
              placeholder="Nom"
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
              label="Téléphone"
              type="tel"
              name="telephone"
              value={form?.telephone}
              onChange={handleChange}
              placeholder="034 00 000 00"
            />
            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
                  Présentation publique
                </span>
              </label>
              <textarea
                rows={4}
                name="bio"
                onChange={handleChange}
                placeholder="Quelques lignes sur ton parcours et ta pédagogie…"
                className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
              >
                {form?.bio}
              </textarea>
            </div>
          </div>
        </SettingsSection>
      </AnimatedSection>

      <AnimatedSection delay={180}>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
        >
          {saved && <HiOutlineCheckCircle size={16} />}
          {saved ? "Profil enregistré" : "Enregistrer les modifications"}
        </button>
      </AnimatedSection>
    </div>
  );
}
