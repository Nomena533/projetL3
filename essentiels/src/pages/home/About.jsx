import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineHeart, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import ValihaMotif from "../../components/ValihaMotif";

const VALEURS = [
  { icon: HiOutlineHeart, titre: "Transmission", texte: "Chaque cours est pensé comme un passage de témoin entre le professeur et l'élève, à l'image de la tradition orale malgache." },
  { icon: HiOutlineGlobeAlt, titre: "Accessibilité", texte: "Des prix en Ariary, des paiements mobiles locaux et une plateforme légère pour fonctionner partout, même avec une connexion limitée." },
  { icon: HiOutlineSparkles, titre: "Exigence", texte: "Des professeurs sélectionnés pour leur pédagogie autant que pour leur talent, avec un vrai suivi de progression." },
];

const CHIFFRES = [
  ["2024", "année de lancement"],
  ["6", "instruments enseignés"],
  ["1 000+", "élèves actifs"],
  ["40+", "professeurs partenaires"],
];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Notre histoire</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Faire vivre la musique malgache, une leçon à la fois
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Kalon'ny — « la voix, le style » en malgache — est né d'un constat simple : apprendre
              un instrument à Madagascar signifie trop souvent devoir choisir entre un conservatoire
              lointain et l'autodidaxie. Nous avons voulu un entre-deux fidèle à la tradition, porté
              par de vrais professeurs, et pensé pour le pays.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-5 sm:px-8">
        <AnimatedSection className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-ink px-8 py-14 text-center">
          <ValihaMotif count={32} tone="amber" className="mx-auto h-16" />
          <p className="mx-auto mt-8 max-w-xl font-display text-xl italic leading-snug text-ivory">
            « Le nom Kalon'ny porte notre ambition : que chaque élève trouve sa propre voix,
            dans le respect de l'instrument qu'il choisit d'apprendre. »
          </p>
        </AnimatedSection>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Nos valeurs</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Ce qui guide chaque cours</h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALEURS.map((v, i) => (
              <AnimatedSection
                key={v.titre}
                delay={i * 120}
                className="rounded-2xl border border-ivory-dark bg-white/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-coral/10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-coral/10 text-coral-dark">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.titre}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{v.texte}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-dark/50 px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {CHIFFRES.map(([n, l], i) => (
            <AnimatedSection key={l} delay={i * 100} className="text-center">
              <p className="font-display text-3xl font-semibold text-brick sm:text-4xl">{n}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{l}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <AnimatedSection className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-4xl border border-ivory-dark bg-white/60 px-8 py-14 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink">Envie de rejoindre l'aventure ?</h2>
          <p className="max-w-md font-body text-ink-soft">
            Que vous soyez élève curieux ou professeur passionné, Kalon'ny se construit avec vous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/inscription" className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark">
              Devenir élève <HiOutlineArrowRight />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-ivory-dark">
              Devenir professeur
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
