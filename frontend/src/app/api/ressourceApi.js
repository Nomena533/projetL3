import API from "./api";


export const getRessourceByLecon = (lessonId) => {
  return API.get(`/lesson/${lessonId}/resource`)
};

export const getRessourceById = (id) => {
  return API.get(`/getResourceDetail/${id}`)
};

export const storeRessource = (leconId, formData) => {
  return API.post(`/lesson/${leconId}/storeResource`, formData)
};
  
export const updateRessource = (id, formData) => {
  formData.append("_method", "PUT");
  return API.post(`/updateResource/${id}`, formData);
};

export const deleteRessource = (id) => {
  return API.delete(`/deleteResource/${id}`)
};
