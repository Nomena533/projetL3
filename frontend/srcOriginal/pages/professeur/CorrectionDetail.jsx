import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineVideoCamera,
  HiOutlineSpeakerWave,
  HiOutlineDocumentText,
  HiOutlineArrowDownTray,
  HiOutlineUserCircle,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import Pill from "../../components/Pill";
import { SOUMISSIONS } from "../../lib/mockProfData";
import { BASE_URL } from "../../app/api/api";
import {
  getSoumissionMeta,
  guessSoumissionType,
} from "../../lib/soumissionMeta";
import { useSoumission } from "../../app/hooks/useSoumission";
import { formatDate } from "../../lib/formatFunction";
import { updateNoteSoumission } from "../../app/api/soumissionApi";

// Même logique d'icônes/libellés que dans eleve/LessonPlayer.jsx, adaptée au
// type de contenu qu'un élève peut soumettre (video / audio / document).
const CONTENT_ICON = {
  video: HiOutlineVideoCamera,
  audio: HiOutlineSpeakerWave,
  document: HiOutlineDocumentText,
};

const CONTENT_LABEL = {
  video: "Vidéo",
  audio: "Audio",
  document: "Document",
};

export default function CorrectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { soumission, fetchSoumission } = useSoumission();

  // NOTE : la liste s'appuie encore sur le mock SOUMISSIONS (fetchSoumission
  // de useSoumission n'est pas branché ici non plus, cf. remarque déjà
  // présente sur prof/Corrections.jsx) — à remplacer par un appel API
  // (ex. getSoumission(id)) une fois le back réellement disponible.
  const [items, setItems] = useState(SOUMISSIONS);

  const soumissionDetail = useMemo(
    () => soumission.find((s) => String(s.id) === String(id)),
    [soumission, id],
  );

  const [correctionForm, setCorrectionForm] = useState({
    note: soumissionDetail?.note || "",
    commentaire: soumissionDetail?.commentaire ?? "",
    statut:""
  });
  const [commentaire, setCommentaire] = useState(soumissionDetail?.commentaire ?? "");
  const [note, setNote] = useState(soumissionDetail?.note ?? "");
  const [saving, setSaving] = useState(false);

  const handleValider = async (e) => {
    e.preventDefault();
    if (!note) return;
    setSaving(true);

    try {
      const data = {
        commentaire : commentaire,
        note : note,
        statut : "corriger"
      };


      const response = await updateNoteSoumission(soumissionDetail?.id, data);
      console.log("Soumission corrigé avec succès", response.data);
      
      await fetchSoumission();

      navigate("/professeur/corrections", {
        state: {
          success: "Soumission corrigée avec succès !"
        },
      });
    } catch (error) {
      console.error("Erreur lors de la correction du soumission", error.response.data);
    } finally {
      setSaving(false);
    }

    // setItems([...items])
  };

  const niveauNom = soumissionDetail?.exercice?.lesson?.cour?.level?.name;
  const coursNom = soumissionDetail?.exercice?.lesson?.cour?.titre;
  const leconNom = soumissionDetail?.exercice?.lesson?.titre;
  const eleveNom = `${soumissionDetail?.eleve?.name} ${soumissionDetail?.eleve?.firstname}`;
  const eleveEmail = soumissionDetail?.eleve?.email;
  const eleveAvatar = soumissionDetail?.eleve?.photo;
  const eleveTelephone = soumissionDetail?.eleve?.telephone;

  if (!soumissionDetail) {
    return (
      <div className="space-y-4">
        <Link
          to="/professeur/corrections"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
        >
          <HiOutlineChevronLeft size={13} /> Retour aux corrections
        </Link>
        <p className="rounded-2xl border border-dashed border-ivory-dark px-5 py-12 text-center font-body text-sm text-ink-soft">
          Cette soumission est introuvable.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/professeur/corrections"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour aux corrections
      </Link>

      <AnimatedSection className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
            Espace professeur
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {soumissionDetail.exercice.titre}
          </h2>
        </div>
        <Pill>{soumissionDetail.statut}</Pill>
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Contenu envoyé par l'élève, lu directement sur la page selon son type */}
          <AnimatedSection delay={60} className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-ivory-dark bg-ink">
              {soumissionDetail.type === "video" && (
                <video
                  controls
                  className="aspect-video w-full bg-black"
                  src={`${BASE_URL}/storage/${soumissionDetail.fichier}`}
                >
                  Ton navigateur ne supporte pas la lecture vidéo.
                </video>
              )}

              {soumissionDetail.type === "audio" && (
                <div className="flex aspect-video flex-col items-center justify-center gap-4 p-8">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory/10 text-amber-light">
                    <HiOutlineSpeakerWave size={28} />
                  </span>
                  <audio
                    controls
                    className="w-full max-w-md"
                    src={`${BASE_URL}/storage/${soumissionDetail.fichier}`}
                  >
                    Ton navigateur ne supporte pas la lecture audio.
                  </audio>
                </div>
              )}

              {soumissionDetail.type === "document" && (
                <iframe
                  title={soumissionDetail.exercice}
                  src={`${BASE_URL}/storage/${soumissionDetail.fichier}`}
                  className="h-[70vh] w-full bg-white"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {CONTENT_LABEL[soumissionDetail.type] || "Contenu"} envoyé par l'élève
                </h3>
                {soumissionDetail.created_at && (
                  <p className="font-body text-xs text-ink-soft">
                    Soumis le {formatDate(soumissionDetail.created_at)}
                  </p>
                )}
              </div>
              {soumissionDetail.fichier && (
                <a
                  href={`${BASE_URL}/storage/${soumissionDetail.fichier}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ivory-dark px-4 py-2 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral/40 hover:text-coral-dark"
                >
                  <HiOutlineArrowDownTray size={15} /> Télécharger
                </a>
              )}
            </div>
          </AnimatedSection>

          {/* Description de la soumission (si l'élève en a laissé une) */}
          {soumissionDetail.description && (
            <AnimatedSection
              delay={100}
              className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
            >
              <h3 className="mb-2 font-display text-base font-semibold text-ink">
                Description de l'élève
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                {soumissionDetail.description}
              </p>
            </AnimatedSection>
          )}

          {/* Section commentaire + note */}
          <AnimatedSection
            delay={140}
            className="rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-6"
          >
            <h3 className="mb-4 font-display text-base font-semibold text-ink">
              Correction
            </h3>
            <form onSubmit={handleValider} className="space-y-4">
              <div>
                <label
                  htmlFor="correction-commentaire"
                  className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-ink-soft"
                >
                  Commentaire
                </label>
                <textarea
                  id="correction-commentaire"
                  rows={4}
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  placeholder="Un retour pour l'élève sur sa soumission…"
                  className="w-full resize-none rounded-xl border border-ivory-dark  px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink-soft/60 focus:border-coral/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label
                    htmlFor="correction-note"
                    className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wide text-ink-soft"
                  >
                    Note
                  </label>
                  <input
                    id="correction-note"
                    type="number"
                    min={0}
                    max={20}
                    placeholder="Note /20"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-28 rounded-full border border-ivory-dark bg-white/70 dark:bg-white/10 px-4 py-2 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!note || saving}
                  className="mt-5 rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {soumissionDetail.statut === "corriger"
                    ? "Mettre à jour la correction"
                    : "Valider la correction"}
                </button>

                <span className="mt-5 flex items-center gap-1.5 font-mono text-xs text-ink-soft">
                  {soumissionDetail.statut === "corriger" ? (
                    <>
                      <HiOutlineCheckCircle
                        size={15}
                        className="text-coral-dark"
                      />{" "}
                      Déjà corrigé
                    </>
                  ) : (
                    <>
                      <HiOutlineClock size={15} /> En attente de correction
                    </>
                  )}
                </span>
              </div>
            </form>
          </AnimatedSection>
        </div>

        <div className="space-y-6 lg:col-span-1">
          {/* Informations sur le contexte de la soumission */}
          <AnimatedSection
            delay={80}
            as="aside"
            className="rounded-2xl border border-ivory-dark bg-white/70 dark:bg-white/10 p-5"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Contexte
            </p>
            <div className="space-y-2 font-body text-sm text-ink">
              {niveauNom && (
                <p className="flex items-center gap-2">
                  <HiOutlineAcademicCap
                    size={15}
                    className="shrink-0 text-coral-dark"
                  />
                  {niveauNom}
                </p>
              )}
              {coursNom && (
                <p className="flex items-center gap-2">
                  <HiOutlineBookOpen
                    size={15}
                    className="shrink-0 text-coral-dark"
                  />
                  {coursNom}
                </p>
              )}
              {leconNom && (
                <p className="flex items-center gap-2 pl-1 text-ink-soft">
                  <HiOutlineChevronRight size={12} className="shrink-0" />
                  {leconNom}
                </p>
              )}
              {!niveauNom && !coursNom && !leconNom && (
                <p className="font-body text-xs text-ink-soft">
                  Contexte non renseigné.
                </p>
              )}
            </div>
          </AnimatedSection>

          {/* Informations sur l'élève */}
          <AnimatedSection
            delay={120}
            as="aside"
            className="rounded-2xl border border-ivory-dark bg-white/70 dark:bg-white/10 p-5"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Élève
            </p>
            <div className="flex items-center gap-3">
              {eleveAvatar ? (
                <img
                  src={`${BASE_URL}/storage/${eleveAvatar}`}
                  alt={eleveNom}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <HiOutlineUserCircle
                  size={36}
                  className="shrink-0 text-ink-soft"
                />
              )}
              <div className="min-w-0">
                <p className="truncate font-body text-sm font-semibold text-ink">
                  {eleveNom}
                </p>
                {eleveEmail && (
                  <p className="truncate font-body text-xs text-ink-soft">
                    {eleveEmail}
                  </p>
                )}
                {eleveTelephone && (
                  <p className="truncate font-body text-xs text-ink-soft">
                    {eleveTelephone}
                  </p>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
