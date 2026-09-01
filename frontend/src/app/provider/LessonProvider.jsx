import React, { useState } from "react";
import { getLeconById } from "../api/lessonApi";
import { LessonContext } from "../context/LessonContext";

function LessonProvider({children}) {
  const [lessonDetail, setLessonDetail] = useState(null);
  const fetchLessonDetail = async (id) => {
    try {
      const response = await getLeconById(id);
      setLessonDetail(response.data);

      console.log("Détails du leçon sélectionnés avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du leçon :",
        error.response?.data,
      );
    }
  };
  return (
    <LessonContext.Provider value={{ lessonDetail, fetchLessonDetail }}>
      {children}
    </LessonContext.Provider>
  );
}

export default LessonProvider;
