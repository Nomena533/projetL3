import API from './api';

export const storeCour = (formData) => {
    return API.post("/storeCour", formData);
} 

export const updateCour = (formData) => {
    return API.post("/updateCour", formData);
} 

export const deleteCour = (formData) => {
    return API.post("/deleteCour", formData);
} 

export const getCour = () => {
    return API.get("/getCour");
} 

export const getCourById = (id) => {
    return API.get(`/getCourDetail/${id}`);
} 