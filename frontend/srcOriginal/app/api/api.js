import axios from "axios";

export const BASE_URL = "http://localhost:8000";

const API = axios.create({
    // URL de base de ton API laravel
    baseURL : `${BASE_URL}/api`,
});

// Intercepteur exécuté avant chaque requête
API.interceptors.request.use((config) => {

    // On récupère le token enregistré après le login
    const token = localStorage.getItem("token");

    // Si un token existe, on l'ajoute automatiquement dans le header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // On retourne la requête modifiée
    return config;
})

export default API;