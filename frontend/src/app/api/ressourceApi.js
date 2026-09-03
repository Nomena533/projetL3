import axios from "axios";
import { BASE_URL } from "./api";

// ⚠️ À ADAPTER : ce fichier suppose un client axios dédié, comme les autres
// fichiers de app/api/. Si courApi.js / lessonApi.js utilisent déjà une
// instance axios centralisée (avec baseURL + intercepteur du token
// Sanctum), remplace le bloc ci-dessous par un import de cette même
// instance pour rester cohérent (gestion du token, des erreurs 401, etc.).
const client = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Liste des ressources d'une leçon
export const getRessourcesByLecon = (leconId) =>
  client.get(`/lecons/${leconId}/ressources`);

// Détail d'une ressource (pour l'édition)
export const getRessourceById = (id) => client.get(`/ressources/${id}`);

// Ajout d'une ou plusieurs ressources en une seule requête.
// `formData` est construit côté RessourceEditeur.jsx avec des champs
// répétés : ressources[0][fichier], ressources[0][type], ressources[0][titre], …
export const storeRessources = (leconId, formData) =>
  client.post(`/lecons/${leconId}/ressources`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Modification d'une ressource existante (titre, type, ou remplacement du fichier)
export const updateRessource = (id, formData) => {
  formData.append("_method", "PUT");
  return client.post(`/ressources/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteRessource = (id) => client.delete(`/ressources/${id}`);
