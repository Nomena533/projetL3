import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlinePlay, HiStar } from "react-icons/hi";
import { HiOutlineDevicePhoneMobile, HiOutlineAcademicCap, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";
import { instruments, courses, teachers, testimonials } from "../../lib/mockHomeData";

const STEPS = [
  { icon: HiOutlineAcademicCap, titre: "Choisissez votre instrument", texte: "Valiha, kabosy, piano, guitare, chant ou batterie : trouvez le cours adapté à votre niveau." },
  { icon: HiOutlineDevicePhoneMobile, titre: "Apprenez à votre rythme", texte: "Vidéos, PDF et audio accessibles à tout moment, sur mobile comme sur ordinateur." },
  { icon: HiOutlineChatBubbleLeftRight, titre: "Échangez avec un vrai professeur", texte: "Posez vos questions, recevez des corrections et suivez votre progression pas à pas." },
];

// Maps statiques : Tailwind doit voir les noms de classes complets en clair
// dans le code source pour les générer (les gabarits dynamiques `bg-${x}` sont ignorés).
const AVATAR_BG = { coral: "bg-coral", amber: "bg-amber", brick: "bg-brick" };
const CARD_BG = { coral: "bg-coral/90", amber: "bg-amber/90", brick: "bg-brick/90" };

function formatAriary(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-light/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-coral-light/30 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-brick/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-brick">
              Fa mbola misy ny mozika malagasy
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Apprenez la musique,
              <span className="relative inline-block px-1 text-coral"> à la malgache.</span>
            </h1>
            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-ink-soft">
              Kalon'ny réunit de vrais professeurs et un parcours guidé pour apprendre le valiha,
              le kabosy, le piano, la guitare, le chant ou la batterie — où que vous soyez à Madagascar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/cours"
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-body text-sm font-semibold text-ivory shadow-lg shadow-coral/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
              >
                Explorer les cours
                <HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button className="group inline-flex items-center gap-2.5 font-body text-sm font-semibold text-ink transition-colors hover:text-coral-dark">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory-dark transition-colors duration-300 group-hover:bg-coral group-hover:text-ivory">
                  <HiOutlinePlay size={16} />
                </span>
                Voir la présentation
              </button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ivory-dark pt-6">
              {[
                ["6", "instruments"],
                ["1 000+", "élèves actifs"],
                ["4.8/5", "note moyenne"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-semibold text-ink">{n}</dt>
                  <dd className="font-mono text-xs uppercase tracking-wide text-ink-soft">{l}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>

          <AnimatedSection delay={150} className="relative">
            <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brick via-coral to-amber p-1 shadow-2xl shadow-brick/20">
              <div className="rounded-[1.85rem] bg-ink/90 p-8 sm:p-10">
                <ValihaMotif count={26} tone="amber" className="h-24" />
                <p className="mt-6 font-display text-xl italic leading-snug text-ivory">
                  « Le valiha, ce n'est pas qu'un instrument. C'est une voix qu'on transmet. »
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-amber-light">
                  — Njaka Rakotondrabe, professeur
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-8 w-8 rounded-full border-2 border-white bg-linear-to-br from-coral to-amber" />
                ))}
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-ink">+1 000 élèves</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">nous font confiance</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- INSTRUMENTS ---------- */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Nos instruments</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Six voies pour faire chanter la musique malgache
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {instruments.map((instr, i) => (
              <AnimatedSection
                key={instr.id}
                delay={i * 80}
                as={Link}
                to={`/cours?instrument=${instr.id}`}
                className="group block rounded-2xl border border-ivory-dark bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10"
              >
                <span className="text-3xl">{instr.emoji}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink group-hover:text-coral-dark">
                  {instr.nom}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{instr.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-coral-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Voir les cours <HiOutlineArrowRight size={14} />
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COMMENT ÇA MARCHE ---------- */}
      <section className="bg-ivory-dark/50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Le parcours</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Comment ça marche</h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <AnimatedSection key={step.titre} delay={i * 120} className="relative">
                <span className="font-mono text-5xl font-light text-coral/20">0{i + 1}</span>
                <div className="mt-3 grid h-12 w-12 place-items-center rounded-xl bg-coral/10 text-coral-dark">
                  <step.icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.titre}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{step.texte}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COURS À LA UNE ---------- */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Cours populaires</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">À la une cette semaine</h2>
            </div>
            <Link to="/cours" className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-coral-dark hover:text-brick">
              Tout le catalogue <HiOutlineArrowRight size={15} />
            </Link>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((c, i) => (
              <AnimatedSection
                key={c.id}
                delay={i * 100}
                as={Link}
                to={`/cours/${c.id}`}
                className="group block overflow-hidden rounded-2xl border border-ivory-dark bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brick/10"
              >
                <div className={`flex h-36 items-center justify-center relative overflow-hidden ${CARD_BG[teachers.find((t) => t.nom === c.prof)?.photoBg || "coral"]}`}>
                  <span className="font-display text-4xl text-ivory/90">{instruments.find((x) => x.nom === c.instrument)?.emoji}</span>
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
                    {c.niveau}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{c.instrument}</p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-ink group-hover:text-coral-dark">{c.titre}</h3>
                  <p className="mt-1 font-body text-sm text-ink-soft">avec {c.prof}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ivory-dark pt-4">
                    <span className="flex items-center gap-1 font-body text-sm text-ink-soft">
                      <HiStar className="text-amber" size={15} /> {c.note}
                    </span>
                    <span className="font-mono text-sm font-semibold text-ink">{formatAriary(c.prix)}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROFESSEURS ---------- */}
      <section className="bg-ink px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-light">Nos professeurs</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ivory sm:text-4xl">
              Appris par des passionnés, transmis avec exigence
            </h2>
          </AnimatedSection>

          <div className="mt-12 flex gap-5 overflow-x-auto pb-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {teachers.map((t, i) => (
              <AnimatedSection
                key={t.id}
                delay={i * 80}
                className="w-64 shrink-0 rounded-2xl bg-ivory/[0.06] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-ivory/10"
              >
                <div className={`h-14 w-14 rounded-full grid place-items-center font-display text-lg font-semibold text-ivory ${AVATAR_BG[t.photoBg]}`}>
                  {t.nom.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ivory">{t.nom}</h3>
                <p className="font-mono text-[11px] uppercase tracking-wide text-amber-light">{t.instrument}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-ivory/60">{t.bio}</p>
                <p className="mt-4 flex items-center gap-1 font-body text-sm text-ivory/70">
                  <HiStar className="text-amber" size={14} /> {t.note} · {t.eleves} élèves
                </p>
              </AnimatedSection>
            ))}
          </div>
          <Link to="/professeurs" className="mt-8 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-amber-light hover:text-ivory">
            Voir tous les professeurs <HiOutlineArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ---------- TÉMOIGNAGES ---------- */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Témoignages</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Ce que disent nos élèves</h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 100} className="rounded-2xl border border-ivory-dark bg-white/60 p-6">
                <div className="flex gap-0.5 text-amber">
                  {Array.from({ length: 5 }).map((_, s) => <HiStar key={s} size={15} />)}
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-ink-soft">« {t.texte} »</p>
                <p className="mt-5 font-display text-sm font-semibold text-ink">{t.nom}</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-coral-dark">{t.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="px-5 pb-24 sm:px-8">
        <AnimatedSection className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-linear-to-br from-brick via-coral-dark to-coral px-8 py-16 text-center sm:px-16">
          <h2 className="font-display text-3xl font-semibold text-ivory sm:text-4xl">
            Prêt à faire vos premiers accords ?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-ivory/80">
            Rejoignez plus de 1 000 élèves malgaches qui apprennent la musique à leur rythme, avec de vrais professeurs.
          </p>
          <Link
            to="/inscription"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-3.5 font-body text-sm font-semibold text-brick shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Créer mon compte gratuit <HiOutlineArrowRight />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
