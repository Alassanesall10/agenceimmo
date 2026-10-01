import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SearchBar from "../components/SearchBar";

const typesRapides = [
  { value: "tout", label: "Tout", icone: "🏠" },
  { value: "immeuble", label: "Immeuble", icone: "🏢" },
  { value: "villa", label: "Villa", icone: "🏡" },
  { value: "appartement", label: "Appartement", icone: "🏘️" },
  { value: "terrain", label: "Terrains", icone: "📐" },
  { value: "champ", label: "Champ", icone: "🌾" },
];

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/properties/stats").then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(13,43,31,0.92) 0%, rgba(13,43,31,0.55) 55%, rgba(13,43,31,0.15) 100%), url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-32">
          <p className="text-or text-sm tracking-wide mb-3">— Le bon bien, au bon endroit</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
            Votre projet immobilier <span className="text-or">commence ici.</span>
          </h1>
          <p className="mt-5 max-w-xl text-white/85">
            Decouvrez des terrains, villas, appartements, immeubles et proprietes disponibles
            partout au Senegal.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/acheter" className="btn-or">Acheter →</Link>
            <Link to="/louer" className="btn-outline">Louer</Link>
          </div>
        </div>
      </section>

      {/* BARRE DE RECHERCHE */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <SearchBar />
      </section>

      {/* RECHERCHES RAPIDES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-14">
        <div className="flex items-center gap-2 text-vertfonce font-semibold mb-1">
          <span className="text-or">+</span> Recherches rapides
        </div>
        <p className="text-vertfonce/60 text-sm mb-4">Que recherchez-vous ?</p>
        <div className="flex flex-wrap gap-3">
          {typesRapides.map((t) => (
            <Link
              key={t.value}
              to={`/acheter?type=${t.value}`}
              className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm hover:border-or hover:text-or transition-colors"
            >
              <span>{t.icone}</span> {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* DECOUVRIR NOS BIENS */}
      <section className="bg-vertfonce text-white mt-16 py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-or mb-2">📍 Decouvrez nos biens au Senegal</div>
            <p className="text-white/80 mb-6">
              Que vous cherchiez a acheter, louer ou investir, nous avons le bien qu'il vous faut.
              Des terrains aux villas, en passant par les appartements et immeubles, notre
              selection repond a tous vos projets.
            </p>
            <p className="italic text-or/90 font-display">Investir aujourd'hui, construire demain</p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Terrains", type: "terrain", n: stats?.terrains },
              { label: "Villas", type: "villa", n: stats?.villas },
              { label: "Appartements", type: "appartement", n: stats?.appartements },
              { label: "Immeubles", type: "immeuble", n: stats?.immeubles },
              { label: "Champs", type: "champ", n: stats?.champs },
            ].map((c) => (
              <Link
                key={c.type}
                to={`/acheter?type=${c.type}`}
                className="bg-white text-vertfonce rounded-xl p-4 hover:-translate-y-1 transition-transform"
              >
                <div className="font-semibold">{c.label}</div>
                <div className="text-xs text-vertfonce/60">
                  {c.n != null ? `${c.n} biens` : "—"}
                </div>
              </Link>
            ))}
            <Link
              to="/terrains"
              className="bg-or text-vertfonce rounded-xl p-4 flex flex-col justify-center"
            >
              <div className="font-semibold">Partout au Senegal</div>
              <div className="text-xs">Voir sur la carte →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid sm:grid-cols-3 gap-8 text-center">
        {[
          { titre: "Securite des transactions", desc: "Vos donnees et vos transactions sont protegees" },
          { titre: "Accompagnement personnalise", desc: "Notre equipe est a votre ecoute" },
          { titre: "Biens verifies", desc: "Des annonces fiables et controlees" },
        ].map((e) => (
          <div key={e.titre}>
            <div className="text-or text-2xl mb-2">✓</div>
            <div className="font-semibold text-vertfonce">{e.titre}</div>
            <p className="text-sm text-vertfonce/60 mt-1">{e.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
