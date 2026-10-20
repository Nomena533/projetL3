import React, { useEffect, useState } from "react";
import { SoumissionContext } from "../context/SoumissionContext";
import { getSoumission } from "../api/soumissionApi";
import useLoadState from "../hooks/useLoadState";

function SoumissionProvider({ children }) {
  const [soumission, setSoumission] = useState([]);
  const { loading, error, track } = useLoadState();

  const fetchSoumission = () =>
    track(async () => {
      try {
        const response = await getSoumission();
        setSoumission(response.data);

        console.log("soumission récupérés avec succès", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des soumissions :",
          error.response?.data,
        );
        throw error;
      }
    });

  useEffect(() => {
    fetchSoumission().catch(() => {});
  }, []);

  return (
    <SoumissionContext.Provider
      value={{ soumission, loading, error, fetchSoumission }}
    >
      {children}
    </SoumissionContext.Provider>
  );
}

export default SoumissionProvider;
