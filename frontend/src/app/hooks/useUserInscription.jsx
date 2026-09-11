import { useContext } from "react"
import { UserInscriptionContext } from "../context/UserInscriptionContext";

// Hook personnalisé permmettant d'utiliser facilement le contexte dans les composants
export const useUserInscription = () => {
    // Récupère les value fournis par le AuthContext.Provider = AuthProvider 
    return useContext(UserInscriptionContext);
}