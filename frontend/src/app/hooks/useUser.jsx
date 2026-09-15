import { useContext } from "react"
import { UserContext } from "../context/UserContext";

// Hook personnalisé permmettant d'utiliser facilement le contexte dans les composants
export const useUser = () => {
    // Récupère les value fournis par le AuthContext.Provider = AuthProvider 
    return useContext(UserContext);
}