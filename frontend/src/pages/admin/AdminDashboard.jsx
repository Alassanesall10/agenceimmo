import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  const cartes = [
    { label: "Biens disponibles", valeur: stats?.biensDisponibles, to: "/admin/biens" },
    { label: "Biens vendus", valeur: stats?.biensVendus, to: "/admin/biens" },
    { label: "Biens loues", valeur: stats?.biensLoues, to: "/admin/biens" },
    { label: "Demandes clients", valeur: stats?.demandesClients, to: "/admin/messages" },
    { label: "Visites programmees", valeur: stats?.visitesProgrammees, to: "/admin/rendez-vous" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-vertfonce mb-1">Tableau de bord</h1>
      <p className="text-vertfonce/60 text-sm mb-6">Bonjour, Admin — Aujourd'hui {new Date().toLocaleDateString("fr-FR")}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cartes.map((c) => (
          <Link key={c.label} to={c.to} className="bg-white shadow rounded-xl p-5 hover:-translate-y-1 transition-transform">
            <div className="text-3xl font-display font-bold text-vertfonce">{c.valeur ?? "—"}</div>
            <div className="text-xs text-vertfonce/60 mt-1">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-vertfonce mb-3">Actions rapides</h2>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/admin/biens/nouveau" className="btn-or text-center">+ Ajouter un bien</Link>
            <Link to="/admin/projets" className="border rounded-full px-4 py-2 text-center">Publier un projet</Link>
            <Link to="/admin/rendez-vous" className="border rounded-full px-4 py-2 text-center">Gerer les rendez-vous</Link>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-vertfonce mb-3">Statistiques</h2>
          <p className="text-vertfonce/60 text-sm">
            Un module de statistiques detaillees (ventes par mois, biens les plus vus, taux de
            conversion) peut etre branche ici a partir des donnees de l'API.
          </p>
        </div>
      </div>
    </div>
  );
}
