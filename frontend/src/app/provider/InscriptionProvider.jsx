import React, { useEffect, useState } from "react";
import { InscriptionContext } from "../context/InscriptionContext";
import { getInscription } from "../api/inscriptionApi";

function InscriptionProvider({ children }) {
  const [inscriptions, setInscriptions] = useState([]);


  useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async () => {
    try {
      const response = await getInscription();
      setInscriptions(response.data);

      console.log("Inscriptions sélectionnés avec succès", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récuperation des inscriptions :",
        error.response?.data,
      );
    }
  };

  return (
    <InscriptionContext.Provider
      value={{ inscriptions, fetchInscriptions, setInscriptions}}
    >
      {children}
    </InscriptionContext.Provider>
  );
}

export default InscriptionProvider;
