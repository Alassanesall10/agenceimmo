import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const charger = () => api.get("/contact").then((res) => setMessages(res.data));
  useEffect(() => { charger(); }, []);

  const marquerTraite = async (id) => {
    await api.put(`/contact/${id}/traite`);
    charger();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-vertfonce mb-6">Messages de contact</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m._id} className="bg-white shadow rounded-xl p-4 text-sm">
            <div className="flex justify-between">
              <div className="font-semibold">{m.nom} — {m.email}</div>
              {!m.traite && (
                <button onClick={() => marquerTraite(m._id)} className="text-or text-xs">Marquer traite</button>
              )}
            </div>
            <div className="text-vertfonce/60 text-xs mt-1">{m.sujet}</div>
            <p className="mt-2 text-vertfonce/80">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-vertfonce/50">Aucun message pour le moment.</p>}
      </div>
    </div>
  );
}
