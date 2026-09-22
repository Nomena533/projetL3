import { useContext } from "react"
import { SoumissionContext } from "../context/SoumissionContext";

// Hook personnalisé permmettant d'utiliser facilement le contexte dans les composants
export const useSoumission = () => {
    // Récupère les value fournis par le AuthContext.Provider = AuthProvider 
    return useContext(SoumissionContext);
}