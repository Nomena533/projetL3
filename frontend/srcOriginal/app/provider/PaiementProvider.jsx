import React, { useEffect, useState } from "react";
import { getLessonDetail } from "../api/lessonApi";
import { PaiementContext } from "../context/PaiementContext";
import { getPaiement } from "../api/paiementApi";

function PaiementProvider({children}) {
  const [paiementList, setPaiementList] = useState([]);
  const fetchPaiement = async () => {
    try {
      const response = await getPaiement();
      setPaiementList(response.data);

      console.log("Paiements récupérés avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des paiements :",
        error.response?.data,
      );
    }
  };

  useEffect(() => {
    fetchPaiement()
  }, [])
  
  return (
    <PaiementContext.Provider value={{ paiementList, fetchPaiement }}>
      {children}
    </PaiementContext.Provider>
  );
}

export default PaiementProvider;
