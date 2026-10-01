import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const vide = {
  titre: "", transaction: "vente", type: "villa", prix: "", region: "", ville: "",
  quartier: "", surface: "", chambres: "", sallesDeBain: "", description: "",
  photos: "", documents: { titreFoncier: false }, nouveaute: false,
};

export default function AdminPropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(vide);
  const modification = Boolean(id);

  useEffect(() => {
    if (id) {
      api.get(`/properties/${id}`).then((res) =>
        setForm({ ...res.data, photos: (res.data.photos || []).join(", ") })
      );
    }
  }, [id]);

  const soumettre = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      prix: Number(form.prix),
      surface: form.surface ? Number(form.surface) : undefined,
      chambres: form.chambres !== "" ? Number(form.chambres) : undefined,
      sallesDeBain: form.sallesDeBain !== "" ? Number(form.sallesDeBain) : undefined,
      photos: form.photos ? form.photos.split(",").map((p) => p.trim()).filter(Boolean) : [],
    };
    if (modification) {
      await api.put(`/properties/${id}`, payload);
    } else {
      await api.post("/properties", payload);
    }
    navigate("/admin/biens");
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-vertfonce mb-6">
        {modification ? "Modifier le bien" : "Ajouter un bien"}
      </h1>
      <form onSubmit={soumettre} className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-4 text-sm max-w-4xl">
        <input required placeholder="Titre" value={form.titre}
          onChange={(e) => setForm({ ...form, titre: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2" />

        <select value={form.transaction} onChange={(e) => setForm({ ...form, transaction: e.target.value })} className="border rounded-lg px-3 py-2">
          <option value="vente">A vendre</option>
          <option value="location">A louer</option>
        </select>

        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="border rounded-lg px-3 py-2">
          {["villa","appartement","terrain","immeuble","champ","bureau","local_commercial","entrepot","restaurant","boutique"].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <input required type="number" placeholder="Prix (FCFA)" value={form.prix}
          onChange={(e) => setForm({ ...form, prix: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input required placeholder="Region" value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input required placeholder="Ville" value={form.ville}
          onChange={(e) => setForm({ ...form, ville: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input placeholder="Quartier" value={form.quartier}
          onChange={(e) => setForm({ ...form, quartier: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Surface (m²)" value={form.surface}
          onChange={(e) => setForm({ ...form, surface: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Chambres" value={form.chambres}
          onChange={(e) => setForm({ ...form, chambres: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Salles de bain" value={form.sallesDeBain}
          onChange={(e) => setForm({ ...form, sallesDeBain: e.target.value })}
          className="border rounded-lg px-3 py-2" />

        <textarea placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2" rows={4} />

        <input placeholder="URLs des photos, separees par des virgules" value={form.photos}
          onChange={(e) => setForm({ ...form, photos: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2" />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.documents?.titreFoncier}
            onChange={(e) => setForm({ ...form, documents: { ...form.documents, titreFoncier: e.target.checked } })} />
          Titre foncier disponible
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.nouveaute}
            onChange={(e) => setForm({ ...form, nouveaute: e.target.checked })} />
          Marquer comme nouveaute
        </label>

        <button type="submit" className="btn-or md:col-span-2">
          {modification ? "Enregistrer les modifications" : "Publier le bien"}
        </button>
      </form>
    </div>
  );
}
