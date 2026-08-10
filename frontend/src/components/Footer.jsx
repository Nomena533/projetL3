import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Logo from "./Logo";
import ValihaMotif from "./ValihaMotif";

const COLUMNS = [
  {
    title: "Plateforme",
    links: [
      { to: "/cours", label: "Catalogue de cours" },
      { to: "/professeurs", label: "Nos professeurs" },
      { to: "/tarifs", label: "Tarifs & abonnements" },
      { to: "/a-propos", label: "À propos de Kalon'ny" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { to: "/faq", label: "Questions fréquentes" },
      { to: "/contact", label: "Nous contacter" },
      { to: "/inscription", label: "Devenir professeur" },
      { to: "/connexion", label: "Se connecter" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <ValihaMotif count={40} tone="amber" className="absolute inset-x-0 top-0 opacity-20" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ivory/70">
              L'école de musique en ligne pensée pour Madagascar : valiha, kabosy, guitare, piano
              et bien plus, avec de vrais professeurs.
            </p>
            <div className="mt-5 flex gap-3">
              {[FaFacebook, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-ivory/10 text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral"
                  aria-label="Réseau social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold tracking-wide text-amber-light">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="font-body text-sm text-ivory/70 transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-amber-light">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 font-body text-sm text-ivory/70">
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-coral-light" size={17} />
                Antananarivo, Madagascar
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="shrink-0 text-coral-light" size={17} />
                +261 34 00 000 00
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineMail className="shrink-0 text-coral-light" size={17} />
                bonjour@kalonny.mg
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-ivory/50">
            © {new Date().getFullYear()} Kalon'ny. Tous droits réservés.
          </p>
          <p className="font-mono text-xs text-ivory/50">
            Paiement via Mvola · Orange Money · Airtel Money
          </p>
        </div>
      </div>
    </footer>
  );
}
