import { useEffect, useState } from "react";
import api from "../services/api";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";
import PropertiesMap from "../components/PropertiesMap";

const categories = [
  { value: "terrain", label: "Parcelles residentielles" },
  { value: "terrain_commercial", label: "Terrains commerciaux" },
  { value: "terrain_industriel", label: "Terrains industriels" },
  { value: "champ", label: "Champs" },
  { value: "domaine", label: "Domaines" },
];

export default function Land() {
  const [filtres, setFiltres] = useState({});
  const [biens, setBiens] = useState([]);
  const [vue, setVue] = useState("liste");
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    setChargement(true);
    api
      .get("/properties", {
        params: {
          ...filtres,
          transaction: "vente",
          type: filtres.type || "terrain",
          limit: 50,
        },
      })
      .then((res) => setBiens(res.data.biens))
      .finally(() => setChargement(false));
  }, [filtres]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="section-title mb-1">Nos terrains et parcelles</h1>
      <p className="text-vertfonce/60 mb-6">
        Des terrains pour tous vos projets : residentiel, commercial, industriel, agricole
      </p>
      <p className="text-sm text-vertfonce/60 mb-6">
        Prix indicatifs en FCFA. Disponibilite et documents a confirmer aupres de l'agence.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setFiltres((p) => ({ ...p, type: c.value }))}
            className={`px-4 py-2 rounded-full text-sm border ${filtres.type === c.value ? "bg-vertfonce text-white" : ""}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <Filters filtres={filtres} setFiltres={setFiltres} types={categories} />

      <div className="flex items-center gap-2 mt-6 mb-4">
        <button
          onClick={() => setVue("liste")}
          className={`px-4 py-1.5 rounded-full text-sm border ${vue === "liste" ? "bg-or text-vertfonce border-or" : ""}`}
        >
          Vue liste
        </button>
        <button
          onClick={() => setVue("carte")}
          className={`px-4 py-1.5 rounded-full text-sm border ${vue === "carte" ? "bg-or text-vertfonce border-or" : ""}`}
        >
          Carte interactive
        </button>
      </div>

      {chargement ? (
        <p className="text-vertfonce/50">Chargement...</p>
      ) : vue === "carte" ? (
        <PropertiesMap biens={biens} />
      ) : biens.length === 0 ? (
        <p className="text-vertfonce/50">Aucun terrain ne correspond a votre recherche.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {biens.map((bien) => (
            <PropertyCard key={bien._id} bien={bien} />
          ))}
        </div>
      )}
    </div>
  );
}
