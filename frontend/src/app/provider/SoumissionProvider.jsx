import React, { useEffect, useState } from "react";
import { SoumissionContext } from "../context/SoumissionContext";
import { getSoumission } from "../api/soumissionApi";

function SoumissionProvider({ children }) {
  const [soumission, setSoumission] = useState([]);
  
  const fetchSoumission = async () => {
    try {
      const response = await getSoumission();
      setSoumission(response.data);

      console.log(
        "soumission récupérés avec succès",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des soumissions :",
        error.response?.data,
      );
    }
  };

  useEffect(() => {
    fetchSoumission();
  }, []);

  return (
    <SoumissionContext.Provider
      value={{ soumission, fetchSoumission }}
    >
      {children}
    </SoumissionContext.Provider>
  );
}

export default SoumissionProvider;
