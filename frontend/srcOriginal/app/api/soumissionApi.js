import API from "./api";

export const storeSoumission = (exerciceId, formData) => {
    return API.post(`/exercice/${exerciceId}/storeSoumission`, formData);
}

export const getSoumission = () => {
    return API.get(`/getSoumission`);
}

// patch modifie seulement les valeurs envoyé sans touché au reste dans la BDD contrairement à put qui modifie tout les valeurs dans la BDD
export const updateNoteSoumission = (id, data) => {
    return API.patch(`/updateNoteSoumission/${id}`, data);
}