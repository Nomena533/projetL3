import API from "./api";

export const storeLesson = (courId, data) => {
  return API.post(`/cour/${courId}/storeLesson`, data)
}

export const deleteLesson = (id) => {
  return API.delete(`/deleteLesson/${id}`);
}

export const getLessonDetail = (id) => {
  return API.get(`/getLessonDetail/${id}`);
}

export const getLessonByCour = (courId) => {
  return API.get(`/getLessonByCour/${courId}`);
}

export const updateLesson = (id, data) => {
  return API.put(`/updateLesson/${id}`, data);
}
