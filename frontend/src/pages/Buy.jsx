import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";

const types = [
  { value: "villa", label: "Villa" },
  { value: "appartement", label: "Appartement" },
  { value: "terrain", label: "Terrain" },
  { value: "immeuble", label: "Immeuble" },
  { value: "champ", label: "Champ" },
];

export default function Buy() {
  const [searchParams] = useSearchParams();
  const [filtres, setFiltres] = useState(Object.fromEntries(searchParams));
  const [biens, setBiens] = useState([]);
  const [total, setTotal] = useState(0);
  const [chargement, setChargement] = useState(true);
  const [tri, setTri] = useState("recent");

  useEffect(() => {
    setChargement(true);
    api
      .get("/properties", { params: { ...filtres, transaction: "vente" } })
      .then((res) => {
        setBiens(res.data.biens);
        setTotal(res.data.total);
      })
      .finally(() => setChargement(false));
  }, [filtres]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="section-title mb-1">Tous nos biens a vendre</h1>
      <p className="text-vertfonce/60 mb-6">Trouvez le bien qui correspond a votre projet</p>

      <Filters filtres={filtres} setFiltres={setFiltres} types={types} />

      <div className="flex items-center justify-between mt-6 mb-4">
        <span className="text-sm text-vertfonce/60">{total} bien(s) trouve(s)</span>
        <select value={tri} onChange={(e) => setTri(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm">
          <option value="recent">Trier par plus recent</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix decroissant</option>
        </select>
      </div>

      {chargement ? (
        <p className="text-vertfonce/50">Chargement des biens...</p>
      ) : biens.length === 0 ? (
        <p className="text-vertfonce/50">Aucun bien ne correspond a votre recherche.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...biens]
            .sort((a, b) =>
              tri === "prix-asc" ? a.prix - b.prix : tri === "prix-desc" ? b.prix - a.prix : 0
            )
            .map((bien) => (
              <PropertyCard key={bien._id} bien={bien} />
            ))}
        </div>
      )}
    </div>
  );
}
