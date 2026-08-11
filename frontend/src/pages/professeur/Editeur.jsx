import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import {
  HiOutlineChevronLeft,
  HiOutlineTrash,
  HiOutlineVideoCamera,
  HiOutlineDocumentText,
  HiOutlineSpeakerWave,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import FormField from "../../components/FormField";
import Modal from "../../components/Modal";
import { NIVEAUX, INSTRUMENTS, MES_COURS } from "../../lib/mockProfData";

// Champ select stylé pour rester identique aux FormField (label mono, bordure
// ivory-dark → coral au focus) sans complexifier l'API de FormField, pensée
// pour les <input> simples.
function SelectField({ label, defaultValue, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</span>
      <select
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-ivory-dark bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors duration-300 focus:border-coral"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, defaultValue }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</span>
      <textarea
        rows={3}
        defaultValue={defaultValue}
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
  const existant = id ? MES_COURS.find((c) => String(c.id) === id) : null;

  const [lecons, setLecons] = useState([
    { id: 1, titre: "Accorder son valiha", video: true, pdf: true, audio: false },
    { id: 2, titre: "Premiers arpèges", video: true, pdf: false, audio: true },
  ]);
  const [publishOpen, setPublishOpen] = useState(false);

  function toggleLecon(leconId, key) {
    setLecons(lecons.map((l) => (l.id === leconId ? { ...l, [key]: !l[key] } : l)));
  }

  return (
    <div className="max-w-3xl space-y-6">
      <button
        onClick={() => navigate("/professeur/mescours")}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour à mes cours
      </button>

      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Éditeur de cours</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {existant ? "Modifier le cours" : "Nouveau cours"}
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={60} className="space-y-4 rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
        <FormField label="Titre du cours" defaultValue={existant?.titre || ""} placeholder="Ex. Valiha — Les fondamentaux" />
        <TextAreaField
          label="Description"
          defaultValue={
            existant
              ? "Un parcours pas à pas pour apprendre le valiha, de l'accordage aux premières mélodies."
              : ""
          }
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField label="Instrument" defaultValue={existant?.instrument || INSTRUMENTS[0]} options={INSTRUMENTS} />
          <SelectField label="Niveau" defaultValue={existant?.niveau || NIVEAUX[0]} options={NIVEAUX} />
          <FormField label="Prix (Ar)" defaultValue={existant?.prix || 45000} />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100} className="rounded-2xl border border-ivory-dark bg-white/70 p-6 sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Leçons</h3>
          <button
            onClick={() => setLecons([...lecons, { id: Date.now(), titre: "Nouvelle leçon", video: false, pdf: false, audio: false }])}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-coral-dark transition-colors hover:text-brick"
          >
            <HiPlus size={14} /> Ajouter une leçon
          </button>
        </div>

        <div className="space-y-3">
          {lecons.map((l) => (
            <div key={l.id} className="rounded-xl border border-ivory-dark p-4 transition-colors duration-300 hover:border-coral/30">
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
                      l[t.key] ? "border-coral bg-coral/10 text-coral-dark" : "border-ivory-dark text-ink-soft hover:border-coral/30"
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
          onClick={() => navigate("/professeur/mescours")}
          className="rounded-full border border-ivory-dark px-6 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:border-coral/40"
        >
          Enregistrer le brouillon
        </button>
      </AnimatedSection>

      <Modal open={publishOpen} onClose={() => setPublishOpen(false)} title="Publier ce cours ?">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          Le cours sera visible dans le catalogue et accessible aux élèves dès sa publication. Tu pourras toujours le
          modifier ensuite.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setPublishOpen(false)}
            className="flex-1 rounded-full border border-ivory-dark py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ivory-dark/40"
          >
            Annuler
          </button>
          <button
            onClick={() => navigate("/professeur/mescours")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coral py-2.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:bg-coral-dark"
          >
            <HiOutlineCheckCircle size={16} /> Publier
          </button>
        </div>
      </Modal>
    </div>
  );
}
