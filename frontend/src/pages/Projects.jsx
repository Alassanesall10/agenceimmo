import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Projects() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjets(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="section-title mb-1">Nos projets</h1>
      <p className="text-vertfonce/60 mb-8">Des projets immobiliers de qualite, sur des emplacements strategiques</p>

      <div className="grid md:grid-cols-2 gap-8">
        {projets.map((p) => (
          <div key={p._id} className="card">
            <div className="h-52 bg-vertfonce/10">
              {p.photos?.[0] ? (
                <img src={p.photos[0]} alt={p.nom} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-vertfonce/40">
                  Photo du projet
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold text-vertfonce">{p.nom}</h3>
              <p className="text-sm text-vertfonce/60 mt-1">{p.ville}, {p.region}</p>
              <div className="flex items-center gap-4 text-sm mt-3 text-vertfonce/70">
                <span>Parcelles disponibles: {p.nombreParcellesDisponibles}/{p.nombreParcellesTotal}</span>
                <span>Prix a partir de {new Intl.NumberFormat("fr-FR").format(p.prixAPartirDe)} FCFA</span>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-vertfonce/10 rounded-full overflow-hidden">
                  <div className="h-full bg-or" style={{ width: `${p.avancement}%` }} />
                </div>
                <span className="text-xs text-vertfonce/50">Avancement: {p.avancement}%</span>
              </div>
              <Link to={`/projets/${p._id}`} className="btn-or inline-block mt-4">
                Decouvrir le projet
              </Link>
            </div>
          </div>
        ))}
        {projets.length === 0 && (
          <p className="text-vertfonce/50">Aucun projet publie pour le moment.</p>
        )}
      </div>
    </div>
  );
}
