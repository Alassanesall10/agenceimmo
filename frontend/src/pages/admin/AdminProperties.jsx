import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function AdminProperties() {
  const [biens, setBiens] = useState([]);

  const charger = () => api.get("/properties", { params: { limit: 50 } }).then((res) => setBiens(res.data.biens));

  useEffect(() => { charger(); }, []);

  const supprimer = async (id) => {
    if (!confirm("Retirer definitivement ce bien ?")) return;
    await api.delete(`/properties/${id}`);
    charger();
  };

  const changerStatut = async (id, statut) => {
    await api.put(`/properties/${id}`, { statut });
    charger();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-vertfonce">Gerer les biens</h1>
        <Link to="/admin/biens/nouveau" className="btn-or">+ Ajouter un bien</Link>
      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-vertfonce text-white">
            <tr>
              <th className="text-left px-4 py-3">Titre</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Prix</th>
              <th className="text-left px-4 py-3">Ville</th>
              <th className="text-left px-4 py-3">Statut</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {biens.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="px-4 py-3">{b.titre}</td>
                <td className="px-4 py-3 capitalize">{b.type}</td>
                <td className="px-4 py-3">{new Intl.NumberFormat("fr-FR").format(b.prix)} FCFA</td>
                <td className="px-4 py-3">{b.ville}</td>
                <td className="px-4 py-3">
                  <select
                    value={b.statut}
                    onChange={(e) => changerStatut(b._id, e.target.value)}
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="reserve">Reserve</option>
                    <option value="vendu">Vendu</option>
                    <option value="loue">Loue</option>
                  </select>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <Link to={`/admin/biens/${b._id}`} className="text-or">Modifier</Link>
                  <button onClick={() => supprimer(b._id)} className="text-red-600">Retirer</button>
                </td>
              </tr>
            ))}
            {biens.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-vertfonce/50">Aucun bien pour le moment.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
