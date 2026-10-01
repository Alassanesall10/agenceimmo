import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const liens = [
  { to: "/", label: "Accueil" },
  { to: "/acheter", label: "Acheter" },
  { to: "/louer", label: "Louer" },
  { to: "/terrains", label: "Nos terrains" },
  { to: "/projets", label: "Nos projets" },
  { to: "/a-propos", label: "A propos" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-vertfonce text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-agence-houda.svg" alt="" className="w-11 h-11 shrink-0" />
          <div>
            <div className="font-display font-bold text-lg leading-none">Agence Houda Immo</div>
            <div className="text-[10px] tracking-wide text-white/60 leading-none">
              Terrains - Villas - Appartements - Immeubles
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {liens.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `pb-1 border-b-2 transition-colors ${
                  isActive ? "border-or text-or" : "border-transparent hover:text-or"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/favoris" title="Mes favoris" className="hover:text-or">
            ♥
          </Link>
          {user ? (
            <div className="relative group">
              <button className="hover:text-or">👤 {user.nom?.split(" ")[0]}</button>
              <div className="absolute right-0 mt-2 w-44 bg-white text-vertfonce rounded-lg shadow-lg hidden group-hover:block">
                <Link to="/espace-client" className="block px-4 py-2 hover:bg-gray-50">
                  Mon espace
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="block px-4 py-2 hover:bg-gray-50">
                    Back office
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                >
                  Se deconnecter
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/connexion"
              className="border border-white/40 rounded-full px-4 py-1.5 text-sm hover:bg-white hover:text-vertfonce transition-colors"
            >
              Se connecter / S'inscrire
            </Link>
          )}
          <button className="lg:hidden text-xl" onClick={() => setOuvert(!ouvert)}>
            ☰
          </button>
        </div>
      </div>

      {ouvert && (
        <nav className="lg:hidden flex flex-col bg-vertfonce-dark px-4 pb-4 gap-2 text-sm">
          {liens.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOuvert(false)} className="py-2 border-b border-white/10">
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
