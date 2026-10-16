import { useContext } from "react"
import { InstrumentContext } from "../context/InstrumentContext";

// Hook personnalisé permmettant d'utiliser facilement le contexte dans les composants
export const useInstrument = () => {
    // Récupère les value fournis par le AuthContext.Provider = AuthProvider 
    return useContext(InstrumentContext);
}