import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const onglets = ["Mes favoris", "Mes visites", "Mes demandes", "Mes documents", "Mes alertes", "Mon profil"];

export default function ClientAccount() {
  const { user } = useAuth();
  const [onglet, setOnglet] = useState(onglets[0]);
  const [rdvs, setRdvs] = useState([]);
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    api.get("/appointments").then((res) => setRdvs(res.data)).catch(() => {});
    api.get("/favorites").then((res) => setFavoris(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="section-title mb-1">Mon compte</h1>
      <p className="text-vertfonce/60 mb-6">Bonjour, {user?.nom}</p>

      <div className="flex flex-wrap gap-2 border-b mb-6">
        {onglets.map((o) => (
          <button
            key={o}
            onClick={() => setOnglet(o)}
            className={`px-4 py-2 text-sm border-b-2 ${onglet === o ? "border-or text-or font-semibold" : "border-transparent text-vertfonce/60"}`}
          >
            {o}
          </button>
        ))}
      </div>

      {onglet === "Mes favoris" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {favoris.length ? favoris.map((f) => (
            <div key={f._id} className="bg-white shadow rounded-lg p-4">{f.titre}</div>
          )) : <p className="text-vertfonce/50">Aucun favori pour le moment.</p>}
        </div>
      )}

      {onglet === "Mes visites" && (
        <div className="space-y-3">
          {rdvs.length ? rdvs.map((r) => (
            <div key={r._id} className="bg-white shadow rounded-lg p-4 flex justify-between text-sm">
              <div>
                <div className="font-semibold">{r.property?.titre || "Bien"}</div>
                <div className="text-vertfonce/60">
                  {new Date(r.dateSouhaitee).toLocaleDateString("fr-FR")} a {r.heureSouhaitee}
                </div>
              </div>
              <span className="capitalize text-or">{r.statut.replace("_", " ")}</span>
            </div>
          )) : <p className="text-vertfonce/50">Aucun rendez-vous programme.</p>}
        </div>
      )}

      {onglet === "Mes demandes" && <p className="text-vertfonce/50">Vos demandes d'information apparaitront ici.</p>}
      {onglet === "Mes documents" && <p className="text-vertfonce/50">Vos documents partages par nos conseillers apparaitront ici.</p>}
      {onglet === "Mes alertes" && <p className="text-vertfonce/50">Configurez des alertes pour etre notifie des nouveaux biens.</p>}
      {onglet === "Mon profil" && (
        <div className="bg-white shadow rounded-lg p-6 text-sm space-y-2 max-w-md">
          <div><span className="text-vertfonce/50">Nom : </span>{user?.nom}</div>
          <div><span className="text-vertfonce/50">Email : </span>{user?.email}</div>
        </div>
      )}
    </div>
  );
}
