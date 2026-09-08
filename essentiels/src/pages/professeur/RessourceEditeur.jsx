import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineCheckCircle,
  HiOutlineCloudArrowUp,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineSpeakerWave,
  HiOutlineTrash,
  HiOutlineFolderOpen,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
import {
  getRessourceById,
  storeRessource,
  updateRessource,
} from "../../app/api/ressourceApi";
import { BASE_URL } from "../../app/api/api";

const RESSOURCES = [
  { value: "video", label: "Vidéo", accept: "video/*" },
  { value: "audio", label: "Audio", accept: "audio/*" },
  { value: "pdf", label: "PDF", accept: "application/pdf" },
];

const RESOURCE_ICON = {
  video: HiOutlineVideoCamera,
  audio: HiOutlineSpeakerWave,
  pdf: HiOutlineDocumentText,
};

// Chaque fichier sélectionné reçoit un identifiant temporaire unique
let localIdCounter = 0;
const nextLocalId = () => `staged-${++localIdCounter}`;

// Devine le type de ressource (video/audio/pdf) à partir du MIME type,
// avec repli sur l'extension du fichier si le navigateur ne le fournit pas.
function guessType(file) {
  // Vérifie le type de fichier par l'attribut type={} ou le type MIME
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type === "application/pdf") return "pdf";

  // Vérifie l'extension du fichier
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (["mp4", "mov", "webm", "mkv", "avi"].includes(extension)) return "video";
  if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return "audio";
  if (extension === "pdf") return "pdf";
  return "pdf";
}

// Nom de fichier sans extension, utilisé comme titre par défaut
function fileNameWithoutExt(name) {
  const idx = name.lastIndexOf(".");
  return idx > 0 ? name.slice(0, idx) : name;
}

// Champ select stylé, aligné sur le pattern déjà utilisé dans Editeur.jsx
function SelectField({ label, value, onChange, options, compact }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border border-ivory-dark bg-white/70 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral ${
          compact ? "px-3 py-2" : "px-4 py-3"
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ProfRessourceEditeur() {
  const { id: coursId, lessonId, resourceId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Décide entre le mode modif et ajout en fonction de ce que retourne le Boolean(resourceId)
  const isEditMode = Boolean(resourceId); // => true si le resourceId est passé depuis l'url

  // ----- Mode ajout multiple (création) -----
  // staged contient les fichiers sélectionnés avant leur envoi au backend.
  const [staged, setStaged] = useState([]); // [{ localId, file, type, titre }]

  

  // Exécutée lorsque l'utilisateur sélectionne ou dépose des fichiers.
  const handleFilesSelected = (fileList) => {
    console.log("filelist : ", fileList);

    const files = Array.from(fileList || []); // Array.form() transforme fileList en tableau JS

    console.log("files", files);

    // S'il n'y pas de fichier sélctionnée, la fonction s'arrête
    if (!files.length) return;

    // Ajoute les nouveaux fichiers aux fichiers déjà présents
    setStaged((prev) => [
      // prev représente l'ancien contenu de staged (les anciens localId, file, type, titre)
      ...prev,

      // le ... réunisse le tableau, c-a-d, le tableau contenu dans prev + le nouveau ajouter par files.map()
      ...files.map((file) => ({   
        localId: nextLocalId(),
        file,
        type: guessType(file),
        titre: fileNameWithoutExt(file.name),
      })),
    ]);

    
  };

  console.log("staged : ", staged);

  // Modifier temporairement une ressource
  const updateStaged = (localId, patch) => {
    setStaged((prev) =>
      prev.map((s) => (s.localId === localId ? { ...s, ...patch } : s)),
    );
  };

  // Supprimer une ressource temporaire
  const removeStaged = (localId) => {
    // filter() crée un nouveau tableau sans l'élément sélectionné.
    setStaged((prev) => prev.filter((s) => s.localId !== localId));
  };

  // ----- Mode édition (une seule ressource) -----
  const [editForm, setEditForm] = useState({ titre: "", type: "video" }); // Contient les informations textuelles de la ressource
  const [editFile, setEditFile] = useState(null); // Contient un nouveau fichier si le professeur veut remplacer le fichier actuel.
  const [currentFichier, setCurrentFichier] = useState(null); // Contient le nom ou chemin du fichier déjà enregistré.
  const [loadingRessource, setLoadingRessource] = useState(isEditMode); // permet d'afficher le message de chargement

  // Récupération des détails de la ressource
  useEffect(() => {
    // Vérifie si on n'est en mode modification, sioui, on continue, sinon, la fonction s'arrête
    if (!isEditMode) return;

    let active = true;
    getRessourceById(resourceId)
      .then((response) => {
        if (!active) return;
        const r = response.data;

        // Affichage des données textuels
        setEditForm({
          titre: r.titre,
          type: r.type,
        });

        // Affichage du fichier
        setCurrentFichier(r.fichier || null);
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la récupération de la ressource",
          err.response?.data,
        );
      })
      .finally(() => {
        if (active) setLoadingRessource(false);
      });
    return () => {
      active = false;
    };
  }, [isEditMode, resourceId]);

  console.log("EditForm : " ,editForm)

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // envoie les données
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Pour modification
    if (isEditMode) {
      const formData = new FormData();
      formData.append("titre", editForm.titre);
      formData.append("type", editForm.type);
      if (editFile) formData.append("fichier", editFile);

      setSubmitting(true);
      try {
        await updateRessource(resourceId, formData);
        navigate(`/professeur/cours/${coursId}/lecons/${lessonId}/details`, {
          state: { success: "La ressource a été modifiée avec succès !" },
        });
      } catch (err) {
        console.error("Erreur lors de la modification", err.response?.data);
        setError("Une erreur est survenue lors de l'enregistrement.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (staged.length === 0) {
      setError("Ajoute au moins un fichier avant d'enregistrer.");
      return;
    }

    const formData = new FormData();
    staged.forEach((s, i) => {
      formData.append(`ressources[${i}][fichier]`, s.file);
      formData.append(`ressources[${i}][type]`, s.type);
      formData.append(`ressources[${i}][titre]`, s.titre);
    });


    setSubmitting(true);
    try {
      await storeRessource(lessonId, formData);
      navigate(`/professeur/cours/${coursId}/lecons/${lessonId}/details`, {
        state: {
          success:
            staged.length > 1
              ? "Les ressources ont été ajoutées avec succès !"
              : "La ressource a été ajoutée avec succès !",
        },
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout", err.response?.data);
      setError("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditMode && loadingRessource) {
    return (
      <p className="font-body text-sm text-ink-soft">
        Chargement de la ressource…
      </p>
    );
  }

  return (
    <div className="w-full space-y-6">
      <button
        onClick={() =>
          navigate(`/professeur/cours/${coursId}/lecons/${lessonId}/details`)
        }
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour à la leçon
      </button>

      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
          {isEditMode ? "Modifier la ressource" : "Nouvelles ressources"}
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {isEditMode ? "Modifier la ressource" : "Ajouter des ressources"}
        </h2>
      </AnimatedSection>

      {isEditMode ? (
        // ---------------------------------------------------------------
        // MODE ÉDITION : une seule ressource
        // ---------------------------------------------------------------
        <AnimatedSection
          delay={60}
          className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
        >
          <FormField
            label="Titre de la ressource"
            placeholder="Ex. Démonstration — position des mains"
            name="titre"
            value={editForm.titre}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, titre: e.target.value }))
            }
          />

          <SelectField
            label="Type de ressource"
            value={editForm.type}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, type: e.target.value }))
            }
            options={RESSOURCES}
          />

          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">
              Fichier {currentFichier && !editFile && "(remplacer)"}
            </span>
            {currentFichier && !editFile && (
              <a
                href={`${BASE_URL}/storage/${currentFichier}`}
                target="_blank"
                rel="noreferrer"
                className="mb-2 inline-block font-body text-xs text-coral-dark hover:text-brick"
              >
                Voir le fichier actuel →
              </a>
            )}
            <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-ivory-dark bg-white/70 px-4 py-4">
              <HiOutlineCloudArrowUp
                size={20}
                className="shrink-0 text-ink-soft"
              />
              <input
                type="file"
                accept={
                  RESSOURCES.find((r) => r.value === editForm.type)?.accept
                }
                onChange={(e) => {
                  setEditFile(e.target.files?.[0] || null)
                }}
                className="w-full font-body text-xs text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-coral/10 file:px-3 file:py-1.5 file:font-body file:text-xs file:font-semibold file:text-coral-dark hover:file:bg-coral/20"
              />
            </div>
          </label>

          {error && <p className="font-body text-sm text-brick">{error}</p>}
        </AnimatedSection>
      ) : (
        // ---------------------------------------------------------------
        // MODE CRÉATION : ajout multiple
        // ---------------------------------------------------------------
        <>
          <AnimatedSection delay={60}>
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesSelected(e.dataTransfer.files);
              }}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-ivory-dark bg-white/70 px-6 py-10 text-center transition-colors duration-300 hover:border-coral/50"
            >
              <HiOutlineCloudArrowUp size={26} className="text-ink-soft" />
              <p className="font-body text-sm font-semibold text-ink">
                Glisse tes fichiers ici, ou clique pour parcourir
              </p>
              <p className="font-body text-xs text-ink-soft">
                Vidéo, audio ou PDF — plusieurs fichiers à la fois
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="video/*,audio/*,application/pdf"
                onChange={(e) => {
                  handleFilesSelected(e.target.files);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </div>
          </AnimatedSection>

          {staged.length > 0 && (
            <AnimatedSection
              delay={90}
              className="space-y-3 rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7"
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-ink">
                  {staged.length} fichier{staged.length > 1 ? "s" : ""} prêt
                  {staged.length > 1 ? "s" : ""}
                </h3>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark transition-colors hover:text-brick"
                >
                  + Ajouter d'autres fichiers
                </button>
              </div>

              {staged.map((s) => {
                const Icon = RESOURCE_ICON[s.type] || HiOutlineFolderOpen;
                return (
                  <div
                    key={s.localId}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-ivory-dark p-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral/10 text-coral-dark">
                      <Icon size={15} />
                    </span>
                    <input
                      value={s.titre}
                      onChange={(e) =>
                        updateStaged(s.localId, { titre: e.target.value })
                      }
                      placeholder="Titre de la ressource"
                      className="min-w-40 flex-1 rounded-lg border border-ivory-dark bg-white/80 px-3 py-2 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
                    />
                    <div className="w-32 shrink-0">
                      <SelectField
                        value={s.type}
                        onChange={(e) =>
                          updateStaged(s.localId, { type: e.target.value })
                        }
                        options={RESSOURCES}
                        compact
                      />
                    </div>
                    <span className="shrink-0 truncate font-mono text-[11px] text-ink-soft max-w-35">
                      {s.file.name}
                    </span>
                    <button
                      onClick={() => removeStaged(s.localId)}
                      className="shrink-0 text-ink-soft transition-colors hover:text-brick"
                      aria-label="Retirer ce fichier"
                    >
                      <HiOutlineTrash size={15} />
                    </button>
                  </div>
                );
              })}
            </AnimatedSection>
          )}

          {error && <p className="font-body text-sm text-brick">{error}</p>}
        </>
      )}

      <AnimatedSection delay={120} className="flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <HiOutlineCheckCircle size={16} />
          {submitting
            ? "Enregistrement…"
            : isEditMode
              ? "Enregistrer les modifications"
              : "Enregistrer les ressources"}
        </button>
        <button
          onClick={() =>
            navigate(`/professeur/cours/${coursId}/lecons/${lessonId}/details`)
          }
          className="rounded-full border border-ivory-dark px-6 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
        >
          Annuler
        </button>
      </AnimatedSection>
    </div>
  );
}
