// ⚠️ Fichier gabarit : adapte l'import ci-dessous au client axios déjà utilisé
// dans courApi.js / instrumentApi.js (nom de fichier et chemin peuvent différer).
// import axiosClient from "./axiosClient";

import API from "./api";

// // Crée une leçon rattachée à un cours.
export const storeLecon = (coursId, formData) => {
  return API.post(`/cours/${coursId}/lecons`, formData)
}
  // axiosClient.post(`/cours/${coursId}/lecons`, formData, {
  //   headers: { "Content-Type": "multipart/form-data" },
// });

// // Supprime une leçon d'un cours.
export const deleteLecon = (coursId, leconId) => {
  return API.delete(`/cours/${coursId}/lecons/${leconId}`);
}
