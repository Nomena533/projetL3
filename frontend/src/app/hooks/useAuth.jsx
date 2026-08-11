import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

// Hook personnalisé permmettant d'utiliser facilement le contexte dans les composants
export const useAuth = () => {
    // Récupère les value fournis par le AuthContext.Provider = AuthProvider 
    return useContext(AuthContext);
}