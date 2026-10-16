import API from './api';

export const storeCour = (formData) => {
    return API.post("/storeCour", formData);
} 

export const updateCour = (id ,formData) => {
    // Doit être post lorsqu'il y a envoie de fichier
    return API.post(`/updateCour/${id}`, formData);
} 

export const updateStatutCour = (id, data) => {
    return API.put(`/updateStatutCour/${id}`, data);
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