import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    // On récupère le token enregistré après le login
  const token = localStorage.getItem("token");

//   Aucun token = user non connecté
  if (!token) {
    return <Navigate to={"/connexion"} replace/>;
  }

  return children;
}
