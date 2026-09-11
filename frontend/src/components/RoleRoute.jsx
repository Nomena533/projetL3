import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

// Utilsant la logique token
/*
export default function RoleRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

//   Pas connecté
  if (!token) {
    return <Navigate to="/connexion" replace/>;
  }

//   Récupération de l'user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

//   Vérification du role
  if (user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace/>;
  } 

  return children
}
*/

// Utilisant useAtuh
export default function RoleRoute({ children, allowedRole }) {
  // Récupération de user
  const { user } = useAuth();

  const location = useLocation();
  console.log(location);

  // Pas connecté
  if (!user) {
    return (
      // Le state est aussi envoyé vers login
      <Navigate
        to="/connexionCompte"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  // Vérification du role (allowedRole = role qui est permis)
  if (user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
