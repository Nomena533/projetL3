import React, { useEffect, useState } from "react";
import { getCour, getCourDetail } from "../api/courApi";
import { CourContext } from "../context/CourContext";
import useLoadState from "../hooks/useLoadState";

function CourProvider({ children }) {
  const [cours, setCours] = useState([]);
  const [cour, setCourDetail] = useState(null);
  const [courByProf, setCourByProf] = useState([]);
  const [courBrouillon, setCourBrouillon] = useState([]);
  const [courPublie, setCourPublie] = useState([]);
  const { loading, error, track } = useLoadState();

  useEffect(() => {
    // L'erreur est déjà exposée via `error` : on évite l'« unhandled rejection ».
    fetchCours().catch(() => {});
  }, []);

  // Relance l'erreur : l'appelant (page) peut afficher « Réessayer ».
  const fetchCours = () =>
    track(async () => {
      try {
        const response = await getCour();
        setCours(response.data.all);
        setCourByProf(response.data.byProf);
        setCourBrouillon(response.data.brouillon);
        setCourPublie(response.data.publie);

        console.log("Cours sélectionnés avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la récuperation des cours :",
          error.response?.data,
        );
        throw error;
      }
    });

  //   Récupération du cour par son ID (état de chargement géré par la page : l'id n'est pas connu ici)
  const fetchCourDetail = async (id) => {
    try {
      const response = await getCourDetail(id);
      setCourDetail(response.data);

      console.log("Détails du cour sélectionnés avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails cour :",
        error.response?.data,
      );
      throw error;
    }
  };

  return (
    <CourContext.Provider
      value={{
        cours,
        courBrouillon,
        courPublie,
        cour,
        courByProf,
        loading,
        error,
        fetchCours,
        fetchCourDetail,
        setCours,
        setCourBrouillon,
        setCourPublie,
      }}
    >
      {children}
    </CourContext.Provider>
  );
}

export default CourProvider;
