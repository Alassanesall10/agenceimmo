export default function Filters({ filtres, setFiltres, types = [], champsSupplementaires }) {
  const majChamp = (champ) => (e) =>
    setFiltres((prev) => ({ ...prev, [champ]: e.target.value }));

  return (
    <div className="bg-white rounded-xl shadow p-4 grid md:grid-cols-6 gap-3 items-end text-sm">
      <div>
        <label className="text-vertfonce/60 text-xs">Type de bien</label>
        <select value={filtres.type || ""} onChange={majChamp("type")} className="w-full mt-1 border rounded-lg px-2 py-2">
          <option value="">Tous</option>
          {types.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-vertfonce/60 text-xs">Region</label>
        <select value={filtres.region || ""} onChange={majChamp("region")} className="w-full mt-1 border rounded-lg px-2 py-2">
          <option value="">Toutes les regions</option>
          {["Dakar","Thies","Saint-Louis","Ziguinchor","Kaolack","Diourbel","Louga","Fatick","Kolda","Tambacounda","Matam","Kaffrine","Sedhiou","Kedougou"].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-vertfonce/60 text-xs">Ville</label>
        <input value={filtres.ville || ""} onChange={majChamp("ville")} placeholder="Toutes les villes" className="w-full mt-1 border rounded-lg px-2 py-2" />
      </div>
      <div>
        <label className="text-vertfonce/60 text-xs">Prix min</label>
        <input type="number" value={filtres.prixMin || ""} onChange={majChamp("prixMin")} className="w-full mt-1 border rounded-lg px-2 py-2" />
      </div>
      <div>
        <label className="text-vertfonce/60 text-xs">Prix max</label>
        <input type="number" value={filtres.prixMax || ""} onChange={majChamp("prixMax")} className="w-full mt-1 border rounded-lg px-2 py-2" />
      </div>
      <div>
        <label className="text-vertfonce/60 text-xs">Chambres (min)</label>
        <input type="number" value={filtres.chambres || ""} onChange={majChamp("chambres")} className="w-full mt-1 border rounded-lg px-2 py-2" />
      </div>
      <div>
        <label className="text-vertfonce/60 text-xs">Surface min (m²)</label>
        <input type="number" value={filtres.surfaceMin || ""} onChange={majChamp("surfaceMin")} className="w-full mt-1 border rounded-lg px-2 py-2" />
      </div>
      {champsSupplementaires}
      <label className="flex items-center gap-2 text-vertfonce/70">
        <input
          type="checkbox"
          checked={filtres.titreFoncier === "true"}
          onChange={(e) => setFiltres((prev) => ({ ...prev, titreFoncier: e.target.checked ? "true" : "" }))}
        />
        Titre foncier / document
      </label>
      <label className="flex items-center gap-2 text-vertfonce/70">
        <input
          type="checkbox"
          checked={filtres.nouveaute === "true"}
          onChange={(e) => setFiltres((prev) => ({ ...prev, nouveaute: e.target.checked ? "true" : "" }))}
        />
        Nouveaute
      </label>
      <button
        onClick={() => setFiltres({})}
        className="text-xs underline text-vertfonce/60 justify-self-start"
      >
        Reinitialiser les filtres
      </button>
    </div>
  );
}
