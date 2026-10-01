import { useState } from "react";
import api from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  const soumettre = async (e) => {
    e.preventDefault();
    await api.post("/contact", form);
    setEnvoye(true);
    setForm({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
      <h1 className="section-title mb-8 text-center">Contactez-nous</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4 text-vertfonce/80">
          <div className="flex items-center gap-3"><span className="text-or text-xl">📞</span> +221 77 123 45 67</div>
          <div className="flex items-center gap-3"><span className="text-or text-xl">💬</span> WhatsApp : +221 77 123 45 67</div>
          <div className="flex items-center gap-3"><span className="text-or text-xl">✉️</span> contact@senegalimmo.sn</div>
          <div className="flex items-center gap-3"><span className="text-or text-xl">📍</span> Dakar, Senegal</div>
          <div className="flex items-center gap-3"><span className="text-or text-xl">🕒</span> Lun - Sam : 8h - 19h</div>
          <div className="h-56 bg-vertfonce/5 rounded-xl mt-4 flex items-center justify-center text-vertfonce/40">
            Google Maps
          </div>
        </div>

        <form onSubmit={soumettre} className="bg-white shadow rounded-xl p-6 space-y-3 text-sm">
          {envoye && <p className="text-green-700">Votre message a bien ete envoye. Merci !</p>}
          <input required placeholder="Nom complet" value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="w-full border rounded-lg px-3 py-2" />
          <input required type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg px-3 py-2" />
          <input placeholder="Telephone" value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
            className="w-full border rounded-lg px-3 py-2" />
          <input placeholder="Sujet" value={form.sujet}
            onChange={(e) => setForm({ ...form, sujet: e.target.value })}
            className="w-full border rounded-lg px-3 py-2" />
          <textarea required rows={4} placeholder="Votre message" value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border rounded-lg px-3 py-2" />
          <button type="submit" className="btn-or w-full">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
