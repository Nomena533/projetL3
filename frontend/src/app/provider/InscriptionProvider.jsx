import React, { useEffect, useState } from "react";
import { InscriptionContext } from "../context/InscriptionContext";
import { getInscription } from "../api/inscriptionApi";
import useLoadState from "../hooks/useLoadState";

function InscriptionProvider({ children }) {
  const [inscriptions, setInscriptions] = useState([]);
  const { loading, error, track } = useLoadState();

  useEffect(() => {
    fetchInscriptions().catch(() => {});
  }, []);

  const fetchInscriptions = () =>
    track(async () => {
      try {
        const response = await getInscription();
        setInscriptions(response.data);

        console.log("Inscriptions sélectionnés avec succès", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récuperation des inscriptions :",
          error.response?.data,
        );
        throw error;
      }
    });

  return (
    <InscriptionContext.Provider
      value={{ inscriptions, loading, error, fetchInscriptions, setInscriptions }}
    >
      {children}
    </InscriptionContext.Provider>
  );
}

export default InscriptionProvider;
