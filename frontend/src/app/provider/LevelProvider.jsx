import React, { useEffect, useState } from "react";
import { getLevel } from "../api/levelApi";
import { LevelContext } from "../context/Levelcontext";
import useLoadState from "../hooks/useLoadState";

function LevelProvider({ children }) {
  const [levels, setLevels] = useState([]);
  const { loading, error, track } = useLoadState();

  useEffect(() => {
    fecthLevels().catch(() => {});
  }, []);

  const fecthLevels = () =>
    track(async () => {
      try {
        const response = await getLevel();
        setLevels(response.data);
        console.log("Niveaux récupérés avec succès", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récuperation des niveaux :",
          error.response?.data,
        );
        throw error;
      }
    });

  return (
    <LevelContext.Provider value={{ levels, loading, error, fecthLevels }}>
      {children}
    </LevelContext.Provider>
  );
}

export default LevelProvider;
