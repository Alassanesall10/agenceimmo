import { useState } from "react";
import api from "../services/api";

export default function AppointmentModal({ propertyId, onClose }) {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    dateSouhaitee: "",
    heureSouhaitee: "",
    message: "",
  });
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState("");

  const soumettre = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments", { ...form, property: propertyId });
      setEnvoye(true);
    } catch (err) {
      setErreur("Une erreur est survenue, veuillez reessayer.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-vertfonce/50">
          ×
        </button>
        <h3 className="font-display text-xl font-bold text-vertfonce mb-1">
          Vous souhaitez visiter ce bien ?
        </h3>
        {envoye ? (
          <p className="text-green-700 mt-4">
            Votre demande a bien ete envoyee. Un conseiller vous contactera rapidement pour
            confirmer le rendez-vous.
          </p>
        ) : (
          <form onSubmit={soumettre} className="mt-4 space-y-3 text-sm">
            <input required placeholder="Nom complet" value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="w-full border rounded-lg px-3 py-2" />
            <input required placeholder="Telephone" value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className="w-full border rounded-lg px-3 py-2" />
            <input type="email" placeholder="Email (optionnel)" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-lg px-3 py-2" />
            <div className="flex gap-3">
              <input required type="date" value={form.dateSouhaitee}
                onChange={(e) => setForm({ ...form, dateSouhaitee: e.target.value })}
                className="w-1/2 border rounded-lg px-3 py-2" />
              <input required type="time" value={form.heureSouhaitee}
                onChange={(e) => setForm({ ...form, heureSouhaitee: e.target.value })}
                className="w-1/2 border rounded-lg px-3 py-2" />
            </div>
            <textarea placeholder="Message (optionnel)" value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border rounded-lg px-3 py-2" rows={3} />
            {erreur && <p className="text-red-600 text-xs">{erreur}</p>}
            <button type="submit" className="btn-or w-full">Confirmer ma demande de visite</button>
          </form>
        )}
      </div>
    </div>
  );
}
