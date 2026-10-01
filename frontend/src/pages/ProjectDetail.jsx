import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

const onglets = ["Presentation", "Localisation", "Plan de lotissement", "Parcelles disponibles", "Documents"];

export default function ProjectDetail() {
  const { id } = useParams();
  const [projet, setProjet] = useState(null);
  const [onglet, setOnglet] = useState(onglets[0]);

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => setProjet(res.data));
  }, [id]);

  if (!projet) return <div className="max-w-7xl mx-auto px-4 py-10">Chargement...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="h-72 rounded-2xl bg-vertfonce/10 mb-6 flex items-center justify-center text-vertfonce/40">
        {projet.photos?.[0] ? (
          <img src={projet.photos[0]} className="w-full h-full object-cover rounded-2xl" alt={projet.nom} />
        ) : (
          "Photos / vue drone du projet"
        )}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-vertfonce">{projet.nom}</h1>
          <p className="text-vertfonce/60">{projet.ville}, {projet.region}</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-or">Prendre rendez-vous</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 text-sm">
        {["Parcelles disponibles", "Avancement", "Prix a partir de"].map((label, i) => (
          <div key={label} className="bg-white shadow rounded-xl px-4 py-3">
            <div className="text-vertfonce/50 text-xs">{label}</div>
            <div className="font-semibold text-vertfonce">
              {i === 0 && `${projet.nombreParcellesDisponibles}/${projet.nombreParcellesTotal}`}
              {i === 1 && `${projet.avancement}%`}
              {i === 2 && `${new Intl.NumberFormat("fr-FR").format(projet.prixAPartirDe)} FCFA`}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-8 border-b">
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

      <div className="py-6">
        {onglet === "Presentation" && <p className="text-vertfonce/80 leading-relaxed">{projet.presentation}</p>}
        {onglet === "Localisation" && (
          <p className="text-vertfonce/80">
            Situe a {projet.ville}, {projet.region}. Une carte interactive complete est disponible
            depuis la page Nos terrains.
          </p>
        )}
        {onglet === "Plan de lotissement" && (
          <div className="h-64 bg-vertfonce/5 rounded-xl flex items-center justify-center text-vertfonce/40">
            Plan de lotissement (image / PDF)
          </div>
        )}
        {onglet === "Parcelles disponibles" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projet.parcelles?.length ? (
              projet.parcelles.map((p) => <PropertyCard key={p._id} bien={p} />)
            ) : (
              <p className="text-vertfonce/50">Aucune parcelle publiee pour ce projet.</p>
            )}
          </div>
        )}
        {onglet === "Documents" && (
          <p className="text-vertfonce/80 whitespace-pre-line">
            {projet.informationsJuridiques || "Informations juridiques disponibles sur demande."}
          </p>
        )}
      </div>

      {projet.contactCommercial?.nom && (
        <div className="bg-vertfonce text-white rounded-xl p-6 mt-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-or text-sm">Contact commercial</div>
            <div className="font-semibold">{projet.contactCommercial.nom}</div>
            <div className="text-white/70 text-sm">{projet.contactCommercial.telephone} · {projet.contactCommercial.email}</div>
          </div>
          <a href={`tel:${projet.contactCommercial.telephone}`} className="btn-or">Contacter le conseiller</a>
        </div>
      )}
    </div>
  );
}
