import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import { useUser } from "../../app/hooks/useUser";
import { BASE_URL } from "../../app/api/api";
import { parseList, parseSpecialites } from "../../lib/profPortfolio";

function Timeline({ items, renderItem, empty }) {
  if (items.length === 0) {
    return <p className="mt-6 font-body text-sm text-ink-soft">{empty}</p>;
  }
  return (
    <ol className="mt-6 space-y-7 border-l border-ivory-dark pl-6">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-7.75 top-1.5 h-2.5 w-2.5 rounded-full bg-coral ring-4 ring-ivory" />
          {renderItem(item)}
        </li>
      ))}
    </ol>
  );
}

export default function DetailProf() {
  const { id } = useParams();
  const { userList } = useUser();

  const prof = userList.find((u) => String(u.id) === String(id));

  if (!prof) {
    return (
      <section className="px-5 py-24 text-center sm:px-8">
        <p className="font-body text-ink-soft">
          {userList.length === 0
            ? "Chargement…"
            : "Ce professeur est introuvable."}
        </p>
        <Link
          to="/professeurs"
          className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark hover:text-brick"
        >
          <HiOutlineArrowLeft size={15} /> Retour aux professeurs
        </Link>
      </section>
    );
  }

  const initials = `${prof.firstname?.[0] || ""}${prof.name?.[0] || ""}`.toUpperCase();
  const experiences = parseList(prof.experiences);
  const parcours = parseList(prof.parcours);
  const specialites = parseSpecialites(prof.specialites);

  return (
    <section className="px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/professeurs"
          className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink-soft transition-colors hover:text-coral-dark"
        >
          <HiOutlineArrowLeft size={15} /> Tous les professeurs
        </Link>

        {/* ---------- EN-TÊTE ---------- */}
        <AnimatedSection className="mt-6 rounded-4xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-8 sm:p-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {prof.photo ? (
              <img
                src={`${BASE_URL}/storage/${prof.photo}`}
                alt={`${prof.firstname} ${prof.name}`}
                className="h-28 w-28 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-coral font-display text-3xl font-semibold text-ivory">
                {initials}
              </div>
            )}

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">
                {prof.titre || "Professeur"}
              </span>
              <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                {prof.firstname} {prof.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-body text-sm text-ink-soft">
                {prof.ville && (
                  <span className="inline-flex items-center gap-1.5">
                    <HiOutlineMapPin size={15} /> {prof.ville}
                  </span>
                )}
                {prof.annees_experience && (
                  <span className="inline-flex items-center gap-1.5">
                    <HiOutlineClock size={15} /> {prof.annees_experience} ans
                    d'expérience
                  </span>
                )}
              </div>

              {specialites.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {specialites.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-coral/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-coral-dark"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-3">
            {/* ---------- À PROPOS ---------- */}
            <AnimatedSection delay={60}>
              <h2 className="font-display text-xl font-semibold text-ink">
                À propos
              </h2>
              <p className="mt-3 whitespace-pre-line font-body text-sm leading-relaxed text-ink-soft">
                {prof.bio || "Ce professeur n'a pas encore rédigé sa présentation."}
              </p>
            </AnimatedSection>
          </div>
          
          <div className="space-y-8 lg:col-span-2">
            {/* ---------- EXPÉRIENCES ---------- */}
            <AnimatedSection delay={100}>
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <HiOutlineBriefcase className="text-coral-dark" size={20} />
                Expériences
              </h2>
              <Timeline
                items={experiences}
                empty="Aucune expérience renseignée pour le moment."
                renderItem={(e) => (
                  <>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {e.poste}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wide text-coral-dark">
                      {[e.lieu, e.periode].filter(Boolean).join(" · ")}
                    </p>
                    {e.description && (
                      <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                        {e.description}
                      </p>
                    )}
                  </>
                )}
              />
            </AnimatedSection>
          </div>

          <div className="space-y-8">
            {/* ---------- PARCOURS ---------- */}
            <AnimatedSection delay={140}>
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <HiOutlineAcademicCap className="text-coral-dark" size={20} />
                Parcours
              </h2>
              <Timeline
                items={parcours}
                empty="Aucun parcours renseigné pour le moment."
                renderItem={(p) => (
                  <>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {p.diplome}
                    </h3>
                    <p className="font-body text-sm text-ink-soft">
                      {p.etablissement}
                    </p>
                    {p.periode && (
                      <p className="font-mono text-xs uppercase tracking-wide text-coral-dark">
                        {p.periode}
                      </p>
                    )}
                  </>
                )}
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
