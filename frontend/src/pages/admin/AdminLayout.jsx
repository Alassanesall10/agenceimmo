import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const liens = [
  { to: "/admin", label: "Tableau de bord", end: true },
  { to: "/admin/biens", label: "Biens" },
  { to: "/admin/projets", label: "Projets" },
  { to: "/admin/rendez-vous", label: "Rendez-vous" },
  { to: "/admin/messages", label: "Messages" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-56 bg-vertfonce text-white flex-shrink-0 p-4 hidden md:block">
        <div className="text-xs text-white/50 mb-4">Bonjour, {user?.nom}</div>
        <nav className="flex flex-col gap-1 text-sm">
          {liens.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg ${isActive ? "bg-or text-vertfonce font-semibold" : "hover:bg-white/10"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button onClick={logout} className="text-left px-3 py-2 rounded-lg hover:bg-white/10 text-red-300 mt-4">
            Se deconnecter
          </button>
          <Link to="/" className="px-3 py-2 rounded-lg hover:bg-white/10 text-white/60">
            ← Retour au site
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-vertfonce/5">
        <Outlet />
      </main>
    </div>
  );
}
