import React, { Children, useEffect, useState } from "react";
import { getCour, getCourById } from "../api/courApi";
import { CourContext } from "../context/CourContext";

function CourProvider({ children }) {
  const [cours, setCours] = useState([]);
  const [cour, setCourDetail] = useState(null);

  useEffect(() => {
    fetchCours();
  }, []);

  const fetchCours = async () => {
    try {
      const response = await getCour();
      setCours(response.data);

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
      const response = await getCourById(id);
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
      value={{ cours, cour, fetchCours, fetchCourDetail, setCours }}
    >
      {children}
    </CourContext.Provider>
  );
}

export default CourProvider;
