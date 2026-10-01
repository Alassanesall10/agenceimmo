import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminAppointments() {
  const [rdvs, setRdvs] = useState([]);

  const charger = () => api.get("/appointments").then((res) => setRdvs(res.data));
  useEffect(() => { charger(); }, []);

  const maj = async (id, statut) => {
    await api.put(`/appointments/${id}/statut`, { statut });
    charger();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-vertfonce mb-6">Rendez-vous de visite</h1>
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-vertfonce text-white">
            <tr>
              <th className="text-left px-4 py-3">Client</th>
              <th className="text-left px-4 py-3">Bien</th>
              <th className="text-left px-4 py-3">Date / Heure</th>
              <th className="text-left px-4 py-3">Telephone</th>
              <th className="text-left px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {rdvs.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="px-4 py-3">{r.nom}</td>
                <td className="px-4 py-3">{r.property?.titre || "—"}</td>
                <td className="px-4 py-3">{new Date(r.dateSouhaitee).toLocaleDateString("fr-FR")} a {r.heureSouhaitee}</td>
                <td className="px-4 py-3">{r.telephone}</td>
                <td className="px-4 py-3">
                  <select value={r.statut} onChange={(e) => maj(r._id, e.target.value)} className="border rounded px-2 py-1 text-xs">
                    <option value="en_attente">En attente</option>
                    <option value="confirme">Confirme</option>
                    <option value="annule">Annule</option>
                    <option value="termine">Termine</option>
                  </select>
                </td>
              </tr>
            ))}
            {rdvs.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-vertfonce/50">Aucun rendez-vous.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
