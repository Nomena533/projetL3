import { useEffect, useRef, useState } from "react";

/**
 * AnimatedSection — révèle son contenu (fondu + léger décalage vers le haut)
 * quand il entre dans le viewport. Basé sur IntersectionObserver natif :
 * aucune dépendance d'animation supplémentaire (pas de framer-motion).
 *
 * Props :
 *  - as        : balise HTML du conteneur (par défaut "div")
 *  - delay     : délai d'apparition en ms (pour orchestrer des cascades)
 *  - className : classes additionnelles
 */
export default function AnimatedSection({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
