import API from "./api";


export const storeExercice = (lessonId, data) => {
  return API.post(`/lesson/${lessonId}/storeExercice`, data);
};

export const getExerciceByLesson = (lessonId) => {
  return API.get(`/getExerciceByLesson/${lessonId}`);
}

export const updateExercice = (id, data) => {
  return API.put(`/updateExercice/${id}`, data);
}
/*
export const deleteLesson = (id) => {
  return API.delete(`/deleteLesson/${id}`);
}

export const getLessonDetail = (id) => {
  return API.get(`/getLessonDetail/${id}`);
}
*/
