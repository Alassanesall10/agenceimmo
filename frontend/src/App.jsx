import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Land from "./pages/Land";
import Commercial from "./pages/Commercial";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import ClientAccount from "./pages/ClientAccount";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminPropertyForm from "./pages/admin/AdminPropertyForm";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminMessages from "./pages/admin/AdminMessages";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acheter" element={<Buy />} />
          <Route path="/louer" element={<Rent />} />
          <Route path="/terrains" element={<Land />} />
          <Route path="/immeubles-commercial" element={<Commercial />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/projets/:id" element={<ProjectDetail />} />
          <Route path="/biens/:id" element={<PropertyDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />

          <Route path="/favoris" element={
            <ProtectedRoute><Favorites /></ProtectedRoute>
          } />
          <Route path="/espace-client" element={
            <ProtectedRoute><ClientAccount /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="biens" element={<AdminProperties />} />
            <Route path="biens/nouveau" element={<AdminPropertyForm />} />
            <Route path="biens/:id" element={<AdminPropertyForm />} />
            <Route path="projets" element={<AdminProjects />} />
            <Route path="rendez-vous" element={<AdminAppointments />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>

          <Route path="*" element={<div className="max-w-3xl mx-auto px-4 py-20 text-center">Page introuvable.</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
