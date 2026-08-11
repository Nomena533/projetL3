import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

/* Polices auto-hébergées via @fontsource : les fichiers .woff2 sont copiés
   dans node_modules puis embarqués par Vite au build. Aucun appel réseau
   externe n'est effectué, le site fonctionne donc hors connexion. */
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

import "./index.css";
import App from "./App";
import AuthProvider from "./app/provider/AuthProvider";
// import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* AuthProvider englobe toute l'application, tous les composants enfants peuvent accéder à user, logout, setUser */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
