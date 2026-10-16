import React, { useEffect, useState } from "react";
import { InstrumentContext } from "../context/InstrumentContext";
import { getInstrument } from "../api/instrumentApi";

function InstrumentProvider({ children }) {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    fecthInstruments();
  }, []);

  const fecthInstruments = async () => {
    try {
      const response = await getInstrument();
      setInstruments(response.data);
      console.log("Instruments récupérés avec succès", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récuperation des instruments :",
        error.response?.data,
      );
    }
  };

  return (
    <InstrumentContext.Provider value={{ instruments, setInstruments }}>{children}</InstrumentContext.Provider>
  );
}

export default InstrumentProvider;
