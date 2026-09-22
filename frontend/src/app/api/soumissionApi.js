import API from "./api";

export const storeSoumission = (exerciceId, formData) => {
    return API.post(`/exercice/${exerciceId}/storeSoumission`, formData);
}

export const getSoumission = () => {
    return API.get(`/getSoumission`);
}