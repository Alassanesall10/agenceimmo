import { useEffect, useState } from "react";
import api from "../services/api";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";

const categories = [
  { value: "immeuble", label: "Immeuble residentiel" },
  { value: "immeuble_commercial", label: "Immeuble commercial" },
  { value: "bureau", label: "Bureaux" },
  { value: "entrepot", label: "Entrepots" },
  { value: "restaurant", label: "Restaurant" },
  { value: "boutique", label: "Boutiques" },
  { value: "local_industriel", label: "Locaux industriels" },
];

export default function Commercial() {
  const [filtres, setFiltres] = useState({});
  const [biens, setBiens] = useState([]);

  useEffect(() => {
    api.get("/properties", { params: filtres }).then((res) => setBiens(res.data.biens));
  }, [filtres]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-1">
        <span className="bg-or text-vertfonce text-xs font-semibold px-3 py-1 rounded-full">
          Investisseurs professionnels
        </span>
      </div>
      <h1 className="section-title mb-1">Immeubles et locaux commerciaux</h1>
      <p className="text-vertfonce/60 mb-6">Les opportunites d'investissement pour les professionnels</p>

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {biens.map((bien) => (
          <div key={bien._id}>
            <PropertyCard bien={bien} />
            {bien.investissement?.revenuLocatifEstime && (
              <div className="text-xs text-vertfonce/60 mt-1 px-1">
                Revenu locatif estime: {new Intl.NumberFormat("fr-FR").format(bien.investissement.revenuLocatifEstime)} FCFA/an
                {bien.investissement.nombreDeLots ? ` · ${bien.investissement.nombreDeLots} lots` : ""}
              </div>
            )}
          </div>
        ))}
        {biens.length === 0 && <p className="text-vertfonce/50">Aucun bien correspondant.</p>}
      </div>
    </div>
  );
}
