import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

export default function Favorites() {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    api.get("/favorites").then((res) => setFavoris(res.data)).catch(() => setFavoris([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="section-title mb-6">Mes favoris</h1>
      {favoris.length === 0 ? (
        <p className="text-vertfonce/50">
          Vous n'avez pas encore de bien favori. Parcourez nos biens et cliquez sur ♡ pour les
          sauvegarder ici.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris.map((bien) => (
            <PropertyCard key={bien._id} bien={bien} />
          ))}
        </div>
      )}
    </div>
  );
}
