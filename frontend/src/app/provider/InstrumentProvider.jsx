import React, { useEffect, useState } from "react";
import { InstrumentContext } from "../context/InstrumentContext";
import { getInstrument } from "../api/instrumentApi";
import useLoadState from "../hooks/useLoadState";

function InstrumentProvider({ children }) {
  const [instruments, setInstruments] = useState([]);
  const { loading, error, track } = useLoadState();

  useEffect(() => {
    fecthInstruments().catch(() => {});
  }, []);

  const fecthInstruments = () =>
    track(async () => {
      try {
        const response = await getInstrument();
        setInstruments(response.data);
        console.log("Instruments récupérés avec succès", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récuperation des instruments :",
          error.response?.data,
        );
        throw error;
      }
    });

  return (
    <InstrumentContext.Provider
      value={{ instruments, setInstruments, loading, error, fecthInstruments }}
    >
      {children}
    </InstrumentContext.Provider>
  );
}

export default InstrumentProvider;
