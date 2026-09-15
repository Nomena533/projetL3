import API from './api';

export const storePaiement = (inscriptionId ,data) => {
    return API.post(`/inscription/${inscriptionId}/storePaiement`, data);
} 

export const updateStatutPaiement = (id, data) => {
    return API.put(`/updateStatutPaiement/${id}`, data);
} 

export const getPaiementDetail = (id) => {
    return API.get(`/getPaiementDetail/${id}`);
} 