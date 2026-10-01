import { useState } from "react";
import { useNavigate } from "react-router-dom";

const regions = [
  "Dakar", "Thies", "Saint-Louis", "Ziguinchor", "Kaolack",
  "Diourbel", "Louga", "Fatick", "Kolda", "Tambacounda",
  "Matam", "Kaffrine", "Sedhiou", "Kedougou",
];

export default function SearchBar() {
  const navigate = useNavigate();
  const [localisation, setLocalisation] = useState("");
  const [surfaceMin, setSurfaceMin] = useState("");
  const [surfaceMax, setSurfaceMax] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  const rechercher = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (localisation) params.set("region", localisation);
    if (surfaceMin) params.set("surfaceMin", surfaceMin);
    if (surfaceMax) params.set("surfaceMax", surfaceMax);
    if (budgetMin) params.set("prixMin", budgetMin);
    if (budgetMax) params.set("prixMax", budgetMax);
    navigate(`/acheter?${params.toString()}`);
  };

  return (
    <form
      onSubmit={rechercher}
      className="bg-vertfonce/95 rounded-2xl p-5 md:p-6 shadow-2xl grid md:grid-cols-4 gap-4 items-end"
    >
      <div className="md:col-span-4 flex items-center gap-2 text-white font-semibold text-lg mb-1">
        <span className="text-or">📍</span> Trouver votre terrain au Senegal
      </div>
      <div>
        <label className="text-white/70 text-xs">Localisation</label>
        <select
          value={localisation}
          onChange={(e) => setLocalisation(e.target.value)}
          className="w-full mt-1 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Choisissez une region ou une ville</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-white/70 text-xs">Superficie (m²)</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            placeholder="Min"
            value={surfaceMin}
            onChange={(e) => setSurfaceMin(e.target.value)}
            className="w-1/2 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={surfaceMax}
            onChange={(e) => setSurfaceMax(e.target.value)}
            className="w-1/2 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-white/70 text-xs">Budget (FCFA)</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            placeholder="Min"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            className="w-1/2 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            className="w-1/2 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>
      <button type="submit" className="btn-or h-fit">🔍 Rechercher</button>
    </form>
  );
}
