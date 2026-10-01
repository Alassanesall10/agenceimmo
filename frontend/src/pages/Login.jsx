import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  const soumettre = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, motDePasse);
      navigate(data.role === "admin" ? "/admin" : "/espace-client");
    } catch (err) {
      setErreur("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="section-title text-center mb-6">Se connecter</h1>
      <form onSubmit={soumettre} className="bg-white shadow rounded-xl p-6 space-y-3">
        {erreur && <p className="text-red-600 text-sm">{erreur}</p>}
        <input required type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2" />
        <input required type="password" placeholder="Mot de passe" value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full border rounded-lg px-3 py-2" />
        <button type="submit" className="btn-or w-full">Se connecter</button>
        <p className="text-sm text-center text-vertfonce/60">
          Pas encore de compte ? <Link to="/inscription" className="text-or underline">S'inscrire</Link>
        </p>
        <p className="text-xs text-center text-vertfonce/40">
          Admin de demo : admin@senegalimmo.sn / admin1234
        </p>
      </form>
    </div>
  );
}
