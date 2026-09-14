import React, { Children, useEffect, useState } from "react";
import { getCour, getCourDetail } from "../api/courApi";
import { CourContext } from "../context/CourContext";

function CourProvider({ children }) {
  const [cours, setCours] = useState([]);
  const [cour, setCourDetail] = useState(null);
  const [courBrouillon, setCourBrouillon] = useState([]);
  const [courPublie, setCourPublie] = useState([]);

  useEffect(() => {
    fetchCours();
  }, []);

  const fetchCours = async () => {
    try {
      const response = await getCour();
      setCours(response.data.all);
      setCourBrouillon(response.data.brouillon);
      setCourPublie(response.data.publie);

      console.log("Cours sélectionnés avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la récuperation des cours :",
        error.response?.data,
      );
    }
  };

  //   Récupération du cour par son ID
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
    }
  };

  //   A implanter dans le composant car l'id n'est pas encore connu
  //   useEffect(() => {
  //     fetchCourDetail(id);
  //   }, [id]);

  return (
    <CourContext.Provider
      value={{ cours, courBrouillon, courPublie, cour, fetchCours, fetchCourDetail, setCours, setCourBrouillon, setCourPublie }}
    >
      {children}
    </CourContext.Provider>
  );
}

export default CourProvider;
