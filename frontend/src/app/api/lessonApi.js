import API from "./api";

export const storeLecon = (courId, data) => {
  return API.post(`/cour/${courId}/storeLesson`, data)
}

export const deleteLecon = (id) => {
  return API.delete(`/deleteLesson/${id}`);
}

export const getLeconDetail = (id) => {
  return API.get(`/getLessonDetail/${id}`);
}

export const updateLecon = (id, data) => {
  return API.put(`/updateLesson/${id}`, data);
}
