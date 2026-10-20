import { useCallback, useRef, useState } from "react";
import { getErrorMessage } from "../../lib/apiError";

/**
 * Suivi de chargement pour les providers.
 *
 *  - `loading` n'est vrai que tant que la PREMIÈRE récupération n'a pas abouti
 *    (ou pendant un « Réessayer » après une première erreur). Les rechargements
 *    en arrière-plan (après un ajout, une suppression…) ne déclenchent donc pas
 *    d'écran de chargement et ne démontent pas les pages.
 *  - `error` contient le message d'erreur tant que les données n'ont jamais été
 *    chargées. Une fois chargées, un rechargement raté garde les anciennes
 *    données (l'erreur est simplement relancée à l'appelant).
 *  - `track(fn)` exécute la récupération et RELANCE l'erreur : l'appelant décide
 *    quoi en faire.
 */
export default function useLoadState() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadedRef = useRef(false);

  const track = useCallback(async (fn) => {
    if (!loadedRef.current) {
      setLoading(true);
      setError(null);
    }
    try {
      const result = await fn();
      loadedRef.current = true;
      setError(null);
      return result;
    } catch (err) {
      if (!loadedRef.current) setError(getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, track };
}
