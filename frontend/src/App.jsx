import React from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/home/Home";
import About from "./pages/home/About";
import Contact from "./pages/home/Contact";
import Courses from "./pages/home/Courses";
import HomeCourseDetail from "./pages/home/HomeCourseDetail";
import Instructors from "./pages/home/Instructors";
import Pricing from "./pages/home/Pricing";
import FAQ from "./pages/home/FAQ";
import NotFound from "./pages/home/NotFound";

import Dashboard from "./pages/eleve/Dashboard";
import Catalogue from "./pages/eleve/Catalogue";
import CourseDetail from "./pages/eleve/CourseDetail";
import LessonPlayer from "./pages/eleve/LessonPlayer";
import Progression from "./pages/eleve/Progression";
import Favoris from "./pages/eleve/Favoris";
import Messages from "./pages/eleve/Messages";
import Profil from "./pages/eleve/Profil";
import Parametres from "./pages/eleve/Parametres";

import ProfDashboard from "./pages/professeur/Dashboard";
import ProfMesCours from "./pages/professeur/MesCours";
import ProfEditeur from "./pages/professeur/Editeur";
import ProfCorrections from "./pages/professeur/Corrections";
import ProfEleves from "./pages/professeur/Eleves";
import ProfMessages from "./pages/professeur/Messages";
// import ProfParametres from "./pages/professeur/Parametres";
import ProfParametres from "./pages/professeur/Parametres";
import ProfCoursDetail from "./pages/professeur/CoursDetail";
import ProfLeconEditeur from "./pages/professeur/LeconEditeur";
import ProfRessourceEditeur from "./pages/professeur/RessourceEditeur";
import ProfLeconDetail from "./pages/professeur/LeconDetail";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUtilisateurs from "./pages/admin/Utilisateurs";
import AdminValidation from "./pages/admin/Validation";
import AdminReferentiels from "./pages/admin/Referentiels";
import AdminPaiements from "./pages/admin/Paiements";
import AdminAvis from "./pages/admin/Avis";
import AdminParametres from "./pages/admin/Parametres";

import LayoutStudent from "./layouts/LayoutStudent";
import LayoutProf from "./layouts/LayoutProf";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";


/** Remonte en haut de page à chaque changement de route */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Ossature commune à toutes les pages publiques : Navbar + contenu + Footer */
function HomeLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route
          path="/profPage"
          element={<Navigate to="/professeur" replace />}
        />

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/cours" element={<Courses />} />
          <Route path="/cours/:id" element={<HomeCourseDetail />} />
          <Route path="/professeurs" element={<Instructors />} />
          <Route path="/tarifs" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/eleve"
          element={
            <RoleRoute allowedRole={"eleve"}>
              <LayoutStudent />
            </RoleRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="cours/:id" element={<CourseDetail />} />
          <Route path="lecon" element={<LessonPlayer />} />
          <Route path="progression" element={<Progression />} />
          <Route path="favoris" element={<Favoris />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profil" element={<Profil />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>

        <Route
          path="/professeur"
          element={
              <RoleRoute allowedRole={"professeur"}>
                <LayoutProf />
              </RoleRoute>
          }
        >
          <Route index element={<ProfDashboard />} />
          <Route path="mescours" element={<ProfMesCours />} />
          <Route path="cours/nouveau" element={<ProfEditeur />} />
          <Route path="cours/:id" element={<ProfEditeur />} />
          <Route path="corrections" element={<ProfCorrections />} />
          <Route path="eleves" element={<ProfEleves />} />
          <Route path="messages" element={<ProfMessages />} />
          <Route path="parametres" element={<ProfParametres />} />
          <Route path="cours/:id/details" element={<ProfCoursDetail />} />
          <Route path="cours/:id/lecons/nouveau" element={<ProfLeconEditeur />} />
          <Route path="cours/:id/lecons/:lessonId" element={<ProfLeconEditeur />} />
          <Route path="cours/:id/lecons/:lessonId/details" element={<ProfLeconDetail />} />
          <Route path="cours/:id/lecons/:lessonId/ressources/nouveau" element={<ProfRessourceEditeur />} />
          <Route path="cours/:id/lecons/:lessonId/ressources/resourceId" element={<ProfRessourceEditeur />} />
        </Route>

        <Route
          path="/administrateur"
          element={
              <RoleRoute allowedRole={"admin"}>
                <LayoutAdmin />
              </RoleRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="utilisateurs" element={<AdminUtilisateurs />} />
          <Route path="validation" element={<AdminValidation />} />
          <Route path="referentiels" element={<AdminReferentiels />} />
          <Route path="paiements" element={<AdminPaiements />} />
          <Route path="avis" element={<AdminAvis />} />
          <Route path="parametres" element={<AdminParametres />} />
        </Route>
      </Routes>
    // {/* </BrowserRouter> */}
  );
}
