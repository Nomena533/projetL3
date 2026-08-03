import React from "react";
import { Routes, Route } from "react-router-dom";
import Shell from "./components/Shell";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Catalogue from "./pages/Catalogue";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Progression from "./pages/Progression";
import Favoris from "./pages/Favoris";
import Messages from "./pages/Messages";
import Profil from "./pages/Profil";

export default function App() {
  return (
    <Routes>
      <Route path="/connexion" element={<AuthPage />} />

      {/* Shell = mise en page commune (sidebar + topbar) rendue autour de
          chaque page via <Outlet /> (voir components/Shell.jsx) */}
      <Route path="/" element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="cours/:id" element={<CourseDetail />} />
        <Route path="lecon" element={<LessonPlayer />} />
        <Route path="progression" element={<Progression />} />
        <Route path="favoris" element={<Favoris />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profil" element={<Profil />} />
      </Route>
    </Routes>
  );
}
