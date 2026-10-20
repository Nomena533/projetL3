import { useEffect } from "react";
import { HiOutlineArrowPath, HiOutlineExclamationTriangle, HiOutlineXMark } from "react-icons/hi2";
import { useLang } from "../app/hooks/useLang";

/* -------------------------------------------------------------------------- */
/*  Spinner                                                                   */
/* -------------------------------------------------------------------------- */

// Spinner à double anneau (corail + ambre en contre-rotation) avec un point central qui pulse.
export function Spinner({ size = 64, className = "" }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full border-4 border-coral/15" />
      <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-coral border-r-coral/50" />
      <span
        className="absolute inset-[20%] animate-spin rounded-full border-[3px] border-transparent border-b-amber border-l-amber/50"
        style={{ animationDirection: "reverse", animationDuration: "1.3s" }}
      />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral-dark" />
    </span>
  );
}

// Trois points animés après le libellé : « Chargement des cours… »
function Dots() {
  return (
    <span className="ml-0.5 inline-flex gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-1 w-1 animate-bounce rounded-full bg-coral-dark"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Écran de chargement plein écran                                           */
/* -------------------------------------------------------------------------- */

/**
 * Chargement plein écran avec le nom de l'action en cours.
 *  - variant="fetch"  : fond opaque (récupération de données).
 *  - variant="submit" : fond translucide + flou, la page reste visible derrière (envoi de données).
 */
export function LoadingScreen({ label, variant = "fetch" }) {
  const { t } = useLang();

  // Empêche le défilement de la page derrière l'écran de chargement.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const backdrop =
    variant === "submit" ? "bg-ink/40 backdrop-blur-sm" : "bg-ivory";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 ${backdrop}`}
    >
      <div className="flex max-w-sm flex-col items-center gap-5 rounded-3xl border border-ivory-dark bg-ivory px-10 py-9 text-center shadow-xl animate-fade-in">
        <Spinner size={72} />
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {label ? t(label) : t("Chargement")}
            <Dots />
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            {t("Veuillez patienter")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Erreur + bouton Réessayer                                                 */
/* -------------------------------------------------------------------------- */

/**
 *  - variant="page"   : bloc centré qui remplace le contenu de la page (récupération échouée).
 *  - variant="banner" : bandeau compact à placer au-dessus d'un formulaire / d'une liste (envoi échoué).
 */
export function ErrorRetry({ title, message, onRetry, onClose, variant = "page" }) {
  const { t } = useLang();

  const retryButton = onRetry && (
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral px-4 py-2 font-body text-sm font-semibold text-ivory transition-colors hover:bg-coral-dark"
    >
      <HiOutlineArrowPath size={14} /> {t("Réessayer")}
    </button>
  );

  if (variant === "banner") {
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-brick/40 bg-brick/5 px-5 py-4 animate-fade-in"
      >
        <HiOutlineExclamationTriangle size={20} className="shrink-0 text-brick" />
        <div className="min-w-0 flex-1">
          {title && <p className="font-body text-sm font-semibold text-ink">{t(title)}</p>}
          <p className="font-body text-sm text-brick">{message ? t(message) : t("Une erreur est survenue.")}</p>
        </div>
        {retryButton}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t("Fermer")}
            className="shrink-0 text-ink-soft transition-colors hover:text-ink"
          >
            <HiOutlineXMark size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div
        role="alert"
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-brick/40 bg-brick/5 px-8 py-9 text-center animate-fade-in"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick/10 text-brick">
          <HiOutlineExclamationTriangle size={28} />
        </span>
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {title ? t(title) : t("Une erreur est survenue")}
          </p>
          <p className="mt-1.5 font-body text-sm text-brick">
            {message ? t(message) : t("Une erreur est survenue.")}
          </p>
        </div>
        {retryButton}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  <ActionFeedback /> : à brancher sur useAsyncAction()                      */
/* -------------------------------------------------------------------------- */

/**
 *  <ActionFeedback action={action} />                  → envoi : spinner plein écran translucide + bandeau d'erreur
 *  <ActionFeedback action={action} variant="fetch" />  → récupération : spinner plein écran + bloc d'erreur
 */
export function ActionFeedback({ action, variant = "submit", title }) {
  const { t } = useLang();
  if (!action) return null;

  if (action.pending) {
    return <LoadingScreen label={action.label} variant={variant} />;
  }

  if (action.error) {
    return (
      <ErrorRetry
        variant={variant === "fetch" ? "page" : "banner"}
        title={title || (action.label ? `${t(action.label)} : ${t("échec")}` : undefined)}
        message={action.error}
        onRetry={action.retry}
        onClose={variant === "fetch" ? undefined : action.clearError}
      />
    );
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*  <DataGate /> : données fournies par les providers                         */
/* -------------------------------------------------------------------------- */

/**
 * Affiche un chargement plein écran tant qu'une source charge, ou l'erreur avec
 * « Réessayer » si l'une d'elles a échoué. Sinon affiche les enfants.
 *
 *   <DataGate sources={[
 *     { label: "Chargement des cours", loading, error, retry: fetchCours },
 *   ]}>
 *     <MaPage />
 *   </DataGate>
 */
export function DataGate({ sources, children }) {
  const { t } = useLang();
  const loadingSource = sources.find((s) => s.loading);
  const failed = sources.filter((s) => s.error && !s.loading);

  if (loadingSource) return <LoadingScreen label={loadingSource.label} />;

  if (failed.length > 0) {
    const retryAll = () => {
      failed.forEach((s) => {
        Promise.resolve(s.retry?.()).catch(() => {});
      });
    };
    return (
      <ErrorRetry
        title={failed[0].label ? `${t(failed[0].label)} : ${t("échec")}` : undefined}
        message={failed[0].error}
        onRetry={retryAll}
      />
    );
  }

  return children;
}
