import { useParams, Link } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineCheckCircle,
  HiOutlinePlayCircle,
  HiOutlineLockClosed,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { NIVEAUX_PARCOURS, FORMATIONS_PAR_NIVEAU } from "../../lib/mockFormationData";

const TONE_BG = {
  coral: "bg-coral",
  amber: "bg-amber",
  brick: "bg-brick",
};

export default function FormationDetail() {
  const { niveauId } = useParams();
  const niveau = NIVEAUX_PARCOURS.find((n) => n.id === niveauId);

  // Niveau inconnu ou pas encore inscrit : on ne montre aucune donnée de
  // formation, seulement une invitation à s'inscrire.
  if (!niveau || !niveau.inscrit) {
    return (
      <div className="space-y-8">
        <Link
          to="/eleve/formation"
          className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
        >
          <HiOutlineChevronLeft size={13} /> Retour à mon parcours
        </Link>

        <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
          <HiOutlineLockClosed size={22} className="mx-auto text-ink-soft" />
          <p className="mt-3 font-body text-sm text-ink-soft">
            Tu n'es pas encore inscrit{niveau ? ` au niveau ${niveau.nom}` : " à ce niveau"}.
          </p>
          <Link
            to={`/inscription${niveau ? `?niveau=${niveau.id}` : ""}`}
            className="mt-4 inline-block font-body text-sm font-semibold text-coral-dark hover:text-brick"
          >
            S'inscrire à ce niveau →
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  const formations = FORMATIONS_PAR_NIVEAU[niveau.id] || [];

  return (
    <div className="space-y-8">
      <Link
        to="/eleve/formation"
        className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-coral-dark"
      >
        <HiOutlineChevronLeft size={13} /> Retour à mon parcours
      </Link>

      <AnimatedSection>
        <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Niveau {niveau.ordre}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{niveau.nom}</h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink-soft">{niveau.description}</p>
        <div className="mt-4 h-1.5 w-full max-w-md rounded-full bg-ivory-dark">
          <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${niveau.progression}%` }} />
        </div>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{niveau.progression}% terminé</p>
      </AnimatedSection>

      {formations.length === 0 ? (
        <AnimatedSection className="rounded-2xl border border-dashed border-ivory-dark py-16 text-center">
          <p className="font-body text-sm text-ink-soft">Aucun instrument n'a encore été rattaché à ce niveau.</p>
        </AnimatedSection>
      ) : (
        <div className="space-y-6">
          {formations.map((f, i) => (
            <AnimatedSection key={f.instrument} delay={i * 90} className="rounded-2xl border border-ivory-dark bg-white/60 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl ${TONE_BG[f.tone]}`}>
                    <span className="opacity-90">{f.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{f.instrument}</h3>
                    <p className="font-body text-sm text-ink-soft">avec {f.prof}</p>
                  </div>
                </div>
                <div className="min-w-[140px] flex-1 sm:flex-none sm:w-40">
                  <div className="h-1.5 w-full rounded-full bg-ivory-dark">
                    <div className="h-1.5 rounded-full bg-coral transition-all duration-500" style={{ width: `${f.progression}%` }} />
                  </div>
                  <p className="mt-1.5 text-right font-mono text-[11px] uppercase tracking-wide text-ink-soft">{f.progression}%</p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">Cours suivis</h4>
                  <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                    {f.cours.map((c) => (
                      <Link
                        key={c.id}
                        to={`/eleve/cours/${c.coursId}`}
                        className="flex items-center gap-2.5 px-4 py-3 transition-colors duration-200 hover:bg-ivory-dark/40"
                      >
                        {c.statut === "Terminé" ? (
                          <HiOutlineCheckCircle size={16} className="shrink-0 text-coral-dark" />
                        ) : (
                          <HiOutlinePlayCircle size={16} className="shrink-0 text-ink-soft" />
                        )}
                        <span className="flex-1 font-body text-sm text-ink">{c.titre}</span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{c.statut}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-soft">Exercices réalisés</h4>
                  <div className="divide-y divide-ivory-dark overflow-hidden rounded-xl border border-ivory-dark bg-ivory/40">
                    {f.exercices.map((e) => (
                      <div key={e.id} className="flex items-center gap-2.5 px-4 py-3">
                        <HiOutlineClipboardDocumentCheck size={16} className="shrink-0 text-coral-dark" />
                        <span className="flex-1 font-body text-sm text-ink">{e.titre}</span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{e.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
