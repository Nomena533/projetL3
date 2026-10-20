// Extrait un message lisible depuis une erreur axios / Laravel.
// Ordre : message de l'API → première erreur de validation → erreur réseau → défaut.
export function getErrorMessage(error, fallback = "Une erreur est survenue.") {
  const data = error?.response?.data;

  if (data) {
    if (typeof data === "string" && data.trim() && data.length < 300) return data;
    if (typeof data.message === "string" && data.message.trim()) return data.message;
    if (data.errors && typeof data.errors === "object") {
      const first = Object.values(data.errors).flat()[0];
      if (typeof first === "string") return first;
    }
    if (typeof data.error === "string" && data.error.trim()) return data.error;
  }

  // Pas de réponse du serveur : coupure réseau, serveur éteint, CORS…
  if (error?.request && !error?.response) {
    return "Impossible de joindre le serveur. Vérifiez votre connexion internet.";
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
