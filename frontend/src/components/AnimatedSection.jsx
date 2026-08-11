import { useEffect, useRef, useState } from "react";

/**
 * AnimatedSection — révèle son contenu (fade + translate) quand il entre dans
 * le viewport, via IntersectionObserver. S'appuie sur les classes `.reveal` /
 * `.is-visible` définies dans index.css.
 *
 * Polymorphe : `as={Link}` (ou toute autre balise/composant) permet de
 * réutiliser l'animation sur un lien, un bouton, une "aside", etc., comme sur
 * les cartes de cours et d'instruments du Home.
 *
 * NOTE : si ce composant existe déjà dans votre projet (utilisé par Home.jsx
 * et les autres pages publiques), NE L'ÉCRASEZ PAS — ignorez ce fichier et
 * réutilisez le vôtre. Il est fourni ici pour rendre ce livrable autonome.
 */
export default function AnimatedSection({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...props}
    >
      {children}
    </Tag>
  );
}
