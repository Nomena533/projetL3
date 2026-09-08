import API from './api';

export const storeInscription = (niveauId ,data) => {
    return API.post(`/niveau/${niveauId}/storeInscription`, data);
} 

export const updateStatutInscription = (id, data) => {
    return API.put(`/updateStatutInscription/${id}`, data);
} 

export const deleteCour = (id) => {
    return API.delete(`/deleteCour/${id}`);
} 

export const getCour = () => {
    return API.get("/getCour");
} 

export const getCourDetail = (id) => {
    return API.get(`/getCourDetail/${id}`);
} 