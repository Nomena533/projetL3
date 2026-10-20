import { useState } from "react";
import { Link } from "react-router-dom";
import { HiStar, HiOutlineUsers, HiOutlineArrowRight } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { teachers, instruments } from "../../lib/mockHomeData";
import { useUser } from "../../app/hooks/useUser";
import { useLang } from "../../app/hooks/useLang";
import { DataGate } from "../../components/AsyncState";

const AVATAR_BG = { coral: "bg-coral", amber: "bg-amber", brick: "bg-brick" };

function InstructorsContent() {
  const { t: tl } = useLang();
  const {userList} = useUser();
  const prof = userList.filter((u) => u.role_id === 3);

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">{tl("L'équipe pédagogique")}</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">{tl("Nos professeurs, votre progression")}</h1>
          <p className="mt-4 font-body text-ink-soft">{tl("Chaque professeur est sélectionné pour son niveau musical et sa capacité à transmettre, pas seulement à jouer.")}</p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prof.map((t, i) => (
            <AnimatedSection
              key={t.id}
              delay={Math.min(i, 6) * 70}
              className="group rounded-2xl border border-ivory-dark bg-white/60 dark:bg-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
            >
              <div className="flex items-start justify-between">
                <div className={`grid h-16 w-16 place-items-center rounded-full font-display text-xl font-semibold text-ivory bg-brick`}>
                  {`${t.firstname?.[0] || ""}${t.name?.[0] || ""}`.toUpperCase()}
                </div>
                <span className="flex items-center gap-1 rounded-full bg-amber/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-light">
                  <HiStar className="text-amber" size={13} /> {t.note}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink dark:text-">{t.firstname} {t.name}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft ">{t?.bio ? t?.bio : tl("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, voluptate.")}</p>
              <div className="mt-5 flex items-center justify-between border-t border-ivory-dark pt-4">
                <span className="flex items-center gap-1.5 font-body text-sm text-ink-soft">
                  <HiOutlineUsers size={15} />{" "}{tl("élèves", { eleves: t.eleves })}</span>
                <Link
                  to={`/professeurs/${t.id}`}
                  className="inline-flex items-center gap-1 font-body text-sm font-semibold text-coral-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-brick"
                >{tl("Voir le portfolio")}{" "}<HiOutlineArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={150} className="mt-16 flex flex-col items-center gap-4 rounded-4xl bg-ivory-dark/50 px-8 py-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">{tl("Vous êtes musicien et pédagogue ?")}</h2>
          <p className="max-w-md font-body text-sm text-ink-soft">{tl("Rejoignez le corps professoral de Kalon'ny et partagez votre savoir avec des élèves motivés partout à Madagascar.")}</p>
          <Link to="/inscriptionCompte" className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark">{tl("Postuler comme professeur")}{" "}<HiOutlineArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Instructors() {
  const users = useUser();

  return (
    <DataGate
      sources={[
        {
          label: "Chargement des professeurs",
          loading: users.loading,
          error: users.error,
          retry: users.fetchUserList,
        },
      ]}
    >
      <InstructorsContent />
    </DataGate>
  );
}
