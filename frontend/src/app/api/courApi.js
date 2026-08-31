import API from './api';

export const storeCour = (formData) => {
    return API.post("/storeCour", formData);
} 

export const updateCour = (id ,formData) => {
    // Doit être post lorsqu'il ya envoie de fichier
    return API.post(`/updateCour/${id}`, formData);
} 

export const deleteCour = (id) => {
    return API.delete(`/deleteCour/${id}`);
} 

export const getCour = () => {
    return API.get("/getCour");
} 

export const getCourById = (id) => {
    return API.get(`/getCourDetail/${id}`);
} 