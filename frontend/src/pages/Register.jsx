import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", motDePasse: "" });
  const [erreur, setErreur] = useState("");

  const soumettre = async (e) => {
    e.preventDefault();
    try {
      await register(form.nom, form.email, form.telephone, form.motDePasse);
      navigate("/espace-client");
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="section-title text-center mb-6">Creer un compte</h1>
      <form onSubmit={soumettre} className="bg-white shadow rounded-xl p-6 space-y-3">
        {erreur && <p className="text-red-600 text-sm">{erreur}</p>}
        <input required placeholder="Nom complet" value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          className="w-full border rounded-lg px-3 py-2" />
        <input required type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg px-3 py-2" />
        <input placeholder="Telephone" value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className="w-full border rounded-lg px-3 py-2" />
        <input required type="password" placeholder="Mot de passe" value={form.motDePasse}
          onChange={(e) => setForm({ ...form, motDePasse: e.target.value })}
          className="w-full border rounded-lg px-3 py-2" />
        <button type="submit" className="btn-or w-full">S'inscrire</button>
        <p className="text-sm text-center text-vertfonce/60">
          Deja un compte ? <Link to="/connexion" className="text-or underline">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
