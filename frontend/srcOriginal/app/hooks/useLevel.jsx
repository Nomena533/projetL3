import { useContext } from "react"
import { LevelContext } from "../context/Levelcontext";

// Hook personnalisé permmettant d'utiliser facilement le contexte dans les composants
export const useLevel = () => {
    // Récupère les value fournis par le AuthContext.Provider = AuthProvider 
    return useContext(LevelContext);
}