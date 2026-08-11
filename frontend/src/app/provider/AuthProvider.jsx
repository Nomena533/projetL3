import React, { useState } from 'react'
import { logout as logoutAPI } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

// Composant qui va fourinir les données à toutes l'app
export default function AuthProvider({children}) {
  // On initialise l'user connecté au chargement de l'app, on vérifie si l'user existe déjà dans localStorage 
  const [user, setUser] = useState(() => {
    // Récupère l'user sauvegardé après le login
    const savedUser = localStorage.getItem("user");

    // Transformation du text stocker par localStorage par JSON.parse en objet JS
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = async () => {
    try {
      // envoie une requête à Laravel
      await logoutAPI();
    } catch (error) {
      console.error("Erreur lors du logout : ", error);
    } finally {
      // Suppression du token d'authentification
      localStorage.removeItem("token");
      
      // Suppression des inforamtions de l'user
      localStorage.removeItem("user");

      // MAJ de l'état React, l'app consière maintenant qu'il n'y a pas d'user connecté
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{user, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
