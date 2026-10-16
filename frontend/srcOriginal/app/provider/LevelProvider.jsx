import React, { useEffect, useState } from "react";
import { getLevel } from "../api/levelApi";
import { LevelContext } from "../context/Levelcontext";

function LevelProvider({ children }) {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fecthLevels();
  }, []);

  const fecthLevels = async () => {
    try {
      const response = await getLevel();
      setLevels(response.data);
      console.log("Niveaux récupérés avec succès", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récuperation des niveaux :",
        error.response?.data,
      );
    }
  };

  //   useEffect(() => {
  //       fetchCours();
  //     }, []);

  //     const fetchCours = async () => {
  //       try {
  //         const response = await getCour();
  //         setCours(response.data.all);
  //         setCourBrouillon(response.data.brouillon);

  //         console.log("Cours sélectionnés avec succès");
  //       } catch (error) {
  //         console.error(
  //           "Erreur lors de la récuperation des cours :",
  //           error.response?.data,
  //         );
  //       }
  //     };

  return (
    <LevelContext.Provider value={{ levels }}>{children}</LevelContext.Provider>
  );
}

export default LevelProvider;
