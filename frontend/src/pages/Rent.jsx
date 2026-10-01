import { useEffect, useState } from "react";
import api from "../services/api";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";

const categories = [
  { value: "appartement", label: "Appartements" },
  { value: "villa", label: "Villas" },
  { value: "bureau", label: "Bureaux" },
  { value: "local_commercial", label: "Locaux commerciaux" },
  { value: "entrepot", label: "Entrepots" },
  { value: "immeuble", label: "Immeubles" },
];

export default function Rent() {
  const [filtres, setFiltres] = useState({});
  const [biens, setBiens] = useState([]);
  const [total, setTotal] = useState(0);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    setChargement(true);
    api
      .get("/properties", { params: { ...filtres, transaction: "location" } })
      .then((res) => {
        setBiens(res.data.biens);
        setTotal(res.data.total);
      })
      .finally(() => setChargement(false));
  }, [filtres]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="section-title mb-1">Tous nos biens a la location</h1>
      <p className="text-vertfonce/60 mb-6">Des logements et locaux pour tous vos besoins</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFiltres((p) => ({ ...p, type: undefined }))}
          className={`px-4 py-2 rounded-full text-sm border ${!filtres.type ? "bg-vertfonce text-white" : ""}`}
        >
          Tout
        </button>
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

      <div className="mt-6 mb-4 text-sm text-vertfonce/60">{total} bien(s) a louer</div>

      {chargement ? (
        <p className="text-vertfonce/50">Chargement...</p>
      ) : biens.length === 0 ? (
        <p className="text-vertfonce/50">Aucun bien ne correspond a votre recherche.</p>
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
