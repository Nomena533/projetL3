import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronDown, HiOutlineArrowRight } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { faqItems } from "../../lib/mockHomeData";

function FaqRow({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-ivory-dark">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium text-ink sm:text-lg">{item.q}</span>
        <HiOutlineChevronDown
          className={`shrink-0 text-coral-dark transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="pb-5 pr-8 font-body text-sm leading-relaxed text-ink-soft">{item.r}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Besoin d'aide ?</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Questions fréquentes
          </h1>
          <p className="mt-4 font-body text-ink-soft">
            Tout ce qu'il faut savoir avant de vous lancer sur Kalon'ny.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="mt-12 rounded-2xl border border-ivory-dark bg-white/50 px-6 sm:px-8">
          {faqItems.map((item, i) => (
            <FaqRow
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </AnimatedSection>

        <AnimatedSection delay={150} className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-ivory-dark/50 px-8 py-10 text-center">
          <h2 className="font-display text-xl font-semibold text-ink">Vous n'avez pas trouvé votre réponse ?</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-body text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
          >
            Contactez notre équipe <HiOutlineArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
