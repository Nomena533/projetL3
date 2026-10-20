import React, { useState } from "react";
import { getLessonDetail } from "../api/lessonApi";
import { LessonContext } from "../context/LessonContext";

function LessonProvider({children}) {
  const [lessonDetail, setLessonDetail] = useState(null);

  // L'id n'est connu que dans la page : l'état de chargement / d'erreur y est géré
  // (useAsyncAction). L'erreur est donc relancée à l'appelant.
  const fetchLessonDetail = async (id) => {
    try {
      const response = await getLessonDetail(id);
      setLessonDetail(response.data);

      console.log("Détails du leçon sélectionnés avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du leçon :",
        error.response?.data,
      );
      throw error;
    }
  };
  return (
    <LessonContext.Provider value={{ lessonDetail, fetchLessonDetail }}>
      {children}
    </LessonContext.Provider>
  );
}

export default LessonProvider;
