import { Link } from "react-router-dom";
import { HiOutlineCheck, HiOutlineArrowRight } from "react-icons/hi";
import AnimatedSection from "../../components/AnimatedSection";
import { pricingPlans, paymentMethods } from "../../lib/mockHomeData";

function formatAriary(n) {
  return n === 0 ? "0 Ar" : new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

export default function Pricing() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-coral-dark">Tarifs</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Un abonnement pour chaque ambition
          </h1>
          <p className="mt-4 font-body text-ink-soft">
            Sans engagement, résiliable à tout moment. Tous les prix sont en Ariary.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <AnimatedSection
              key={plan.id}
              delay={i * 100}
              className={`relative flex flex-col rounded-[1.75rem] border p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.mis_en_avant
                  ? "border-transparent bg-linear-to-b from-brick to-coral text-ivory shadow-2xl shadow-coral/30 lg:-translate-y-3"
                  : "border-ivory-dark bg-white/60 text-ink hover:shadow-lg hover:shadow-brick/10"
              }`}
            >
              {plan.mis_en_avant && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink">
                  Le plus choisi
                </span>
              )}
              <h2 className={`font-display text-xl font-semibold ${plan.mis_en_avant ? "text-ivory" : "text-ink"}`}>
                {plan.nom}
              </h2>
              <p className={`mt-1.5 font-body text-sm ${plan.mis_en_avant ? "text-ivory/75" : "text-ink-soft"}`}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-3xl font-semibold">{formatAriary(plan.prix)}</span>
                <span className={`font-body text-sm ${plan.mis_en_avant ? "text-ivory/70" : "text-ink-soft"}`}>
                  {plan.periode}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.avantages.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 font-body text-sm">
                    <HiOutlineCheck className={`mt-0.5 shrink-0 ${plan.mis_en_avant ? "text-amber-light" : "text-coral-dark"}`} size={17} />
                    <span className={plan.mis_en_avant ? "text-ivory/90" : "text-ink-soft"}>{a}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/inscription"
                className={`mt-8 block rounded-full py-3 text-center font-body text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.mis_en_avant
                    ? "bg-ivory text-brick hover:shadow-lg"
                    : "bg-ink text-ivory hover:bg-coral-dark"
                }`}
              >
                {plan.cta}
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200} className="mt-16 flex flex-col items-center gap-5 rounded-4xl border border-ivory-dark bg-white/50 px-8 py-10 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-coral-dark">Paiement local</p>
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((m) => (
              <span key={m.id} className="rounded-full border border-ivory-dark bg-ivory px-5 py-2.5 font-body text-sm font-medium text-ink">
                {m.nom}
              </span>
            ))}
          </div>
          <p className="max-w-md font-body text-sm text-ink-soft">
            Réglez en toute simplicité depuis votre téléphone, sans carte bancaire nécessaire.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={250} className="mt-10 text-center">
          <p className="font-body text-sm text-ink-soft">
            Des questions sur nos tarifs ?{" "}
            <Link to="/faq" className="inline-flex items-center gap-1 font-semibold text-coral-dark hover:text-brick">
              Consultez la FAQ <HiOutlineArrowRight size={13} />
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
