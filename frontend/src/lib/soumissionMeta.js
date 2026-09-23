// Lit le chemin niveau / cours / leçon et l'utilisateur quelle que soit la forme
// des données (mock plat actuel ou objets imbriqués renvoyés par l'API).
// Extrait de prof/Corrections.jsx pour être partagé avec prof/CorrectionDetail.jsx.
export function getSoumissionMeta(s) {
  const lecon = s.lecon ?? s.exercice?.lecon ?? null;
  const cours = s.cours ?? lecon?.cours ?? s.exercice?.lecon?.cours ?? null;
  const niveau = s.niveau ?? cours?.niveau ?? null;

  const niveauNom = typeof niveau === "string" ? niveau : niveau?.nom;
  const coursNom = typeof cours === "string" ? cours : cours?.titre ?? cours?.nom;
  const leconNom = typeof lecon === "string" ? lecon : lecon?.titre;

  const utilisateur = s.utilisateur ?? (typeof s.eleve === "object" ? s.eleve : null);
  const eleveNom =
    typeof s.eleve === "string"
      ? s.eleve
      : `${utilisateur?.prenom ?? ""} ${utilisateur?.nom ?? ""}`.trim() || "Élève inconnu";
  const eleveEmail = utilisateur?.email;
  const eleveAvatar = utilisateur?.photo;
  const eleveTelephone = utilisateur?.telephone;

  return {
    niveauNom,
    coursNom,
    leconNom,
    eleveNom,
    eleveEmail,
    eleveAvatar,
    eleveTelephone,
  };
}

// Devine le type de contenu envoyé par l'élève (video/audio/document) à partir
// du champ `type` de la soumission, avec repli sur l'extension du fichier si
// absent. Reprend la logique de guessType() dans eleve/LessonPlayer.jsx afin
// que la lecture du contenu soit cohérente entre l'élève et le professeur.
export function guessSoumissionType(s) {
  if (s.type) return s.type;
  const fichier = s.fichier || "";
  const extension = fichier.split(".").pop()?.toLowerCase();
  if (["mp4", "mov", "webm", "mkv", "avi"].includes(extension)) return "video";
  if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return "audio";
  return "document";
}
