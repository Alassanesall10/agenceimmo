import { useEffect, useState } from "react";
import api from "../../services/api";

const vide = {
  nom: "", presentation: "", region: "", ville: "", prixAPartirDe: "",
  nombreParcellesTotal: "", nombreParcellesDisponibles: "", avancement: 0,
};

export default function AdminProjects() {
  const [projets, setProjets] = useState([]);
  const [form, setForm] = useState(vide);

  const charger = () => api.get("/projects").then((res) => setProjets(res.data));
  useEffect(() => { charger(); }, []);

  const soumettre = async (e) => {
    e.preventDefault();
    await api.post("/projects", {
      ...form,
      prixAPartirDe: Number(form.prixAPartirDe),
      nombreParcellesTotal: Number(form.nombreParcellesTotal),
      nombreParcellesDisponibles: Number(form.nombreParcellesDisponibles),
      avancement: Number(form.avancement),
    });
    setForm(vide);
    charger();
  };

  const supprimer = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await api.delete(`/projects/${id}`);
    charger();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-vertfonce mb-6">Publier un projet</h1>

      <form onSubmit={soumettre} className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-4 text-sm mb-8">
        <input required placeholder="Nom du projet" value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2" />
        <input required placeholder="Region" value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input required placeholder="Ville" value={form.ville}
          onChange={(e) => setForm({ ...form, ville: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input required type="number" placeholder="Prix a partir de (FCFA)" value={form.prixAPartirDe}
          onChange={(e) => setForm({ ...form, prixAPartirDe: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Avancement (%)" value={form.avancement}
          onChange={(e) => setForm({ ...form, avancement: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Parcelles totales" value={form.nombreParcellesTotal}
          onChange={(e) => setForm({ ...form, nombreParcellesTotal: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Parcelles disponibles" value={form.nombreParcellesDisponibles}
          onChange={(e) => setForm({ ...form, nombreParcellesDisponibles: e.target.value })}
          className="border rounded-lg px-3 py-2" />
        <textarea placeholder="Presentation" value={form.presentation}
          onChange={(e) => setForm({ ...form, presentation: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2" rows={3} />
        <button type="submit" className="btn-or md:col-span-2">Publier le projet</button>
      </form>

      <div className="space-y-3">
        {projets.map((p) => (
          <div key={p._id} className="bg-white shadow rounded-xl p-4 flex justify-between items-center text-sm">
            <div>
              <div className="font-semibold">{p.nom}</div>
              <div className="text-vertfonce/60">{p.ville}, {p.region} — {p.avancement}%</div>
            </div>
            <button onClick={() => supprimer(p._id)} className="text-red-600">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}
