import React, { useEffect, useState } from "react";
import { PaiementContext } from "../context/PaiementContext";
import { getPaiement } from "../api/paiementApi";
import useLoadState from "../hooks/useLoadState";

function PaiementProvider({ children }) {
  const [paiementList, setPaiementList] = useState([]);
  const { loading, error, track } = useLoadState();

  const fetchPaiement = () =>
    track(async () => {
      try {
        const response = await getPaiement();
        setPaiementList(response.data);

        console.log("Paiements récupérés avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des paiements :",
          error.response?.data,
        );
        throw error;
      }
    });

  useEffect(() => {
    fetchPaiement().catch(() => {});
  }, []);

  return (
    <PaiementContext.Provider value={{ paiementList, loading, error, fetchPaiement }}>
      {children}
    </PaiementContext.Provider>
  );
}

export default PaiementProvider;
