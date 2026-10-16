import { useEffect, useState } from "react";

const STORAGE_KEY = "kalonny-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Bascule le mode sombre / clair du site public. Repose sur la classe
 * "dark" ajoutée sur <html>, à faire correspondre avec la directive
 * Tailwind v4 @custom-variant dark (&:where(.dark, .dark *)) déjà utilisée
 * dans index.css pour l'espace élève/prof/admin.
 *
 * Retourne [isDark, toggle].
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, () => setIsDark((v) => !v)];
}
