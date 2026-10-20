import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../../lib/apiError";

/**
 * Exécute une action asynchrone (récupération OU envoi de données) en suivant
 * son état, pour l'afficher avec <ActionFeedback />.
 *
 *   const action = useAsyncAction();
 *
 *   action.run("Enregistrement du cours", async () => {
 *     await storeCour(formData);   // ← si ça lance une erreur : message + « Réessayer »
 *     navigate("/professeur/cours");
 *   });
 *
 *  - `run(label, fn, options)` mémorise (label, fn) : `retry()` relance exactement la même action.
 *  - `fn` doit contenir TOUT ce qui doit se produire en cas de succès (navigation,
 *    alerte, rechargement…) : le « Réessayer » rejoue donc le tout.
 *  - `options.onError(error)` : retourner `true` si la page a déjà géré l'erreur
 *    elle-même (ex. erreurs de validation 422 affichées sous les champs) → pas de
 *    bandeau d'erreur dans ce cas.
 *  - `options.errorMessage` : message de repli si l'API ne renvoie rien d'exploitable.
 *  - `run` retourne `true` si l'action a réussi, `false` sinon.
 */
export default function useAsyncAction({ initialPending = false, initialLabel = "" } = {}) {
  const [state, setState] = useState({
    pending: initialPending,
    label: initialLabel,
    error: null,
  });
  const lastRef = useRef(null);
  const mountedRef = useRef(true);
  const seqRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = useCallback(async (label, fn, options = {}) => {
    lastRef.current = { label, fn, options };
    const seq = ++seqRef.current;
    setState({ pending: true, label, error: null });

    try {
      await fn();
      if (mountedRef.current && seq === seqRef.current) {
        setState({ pending: false, label: "", error: null });
      }
      return true;
    } catch (err) {
      console.error(`[${label}]`, err?.response?.data || err);
      const handled = options.onError ? options.onError(err) === true : false;
      if (mountedRef.current && seq === seqRef.current) {
        setState({
          pending: false,
          label,
          error: handled ? null : getErrorMessage(err, options.errorMessage),
        });
      }
      return false;
    }
  }, []);

  const retry = useCallback(() => {
    if (!lastRef.current) return Promise.resolve(false);
    const { label, fn, options } = lastRef.current;
    return run(label, fn, options);
  }, [run]);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    run,
    retry,
    clearError,
    pending: state.pending,
    label: state.label,
    error: state.error,
  };
}
