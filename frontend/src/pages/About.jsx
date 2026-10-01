export default function About() {
  return (
    <div>
      <section className="bg-vertfonce text-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-4xl font-bold">A propos de l'Agence Houda Immo</h1>
          <p className="mt-4 text-or italic font-display text-lg">
            Nous vous accompagnons dans chaque etape de votre projet immobilier au Senegal
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14 space-y-12">
        <div>
          <h2 className="font-display text-2xl font-bold text-vertfonce mb-3">Notre histoire</h2>
          <p className="text-vertfonce/80 leading-relaxed">
            Nee de la volonte de simplifier l'acces a l'immobilier au Senegal, l'Agence Houda Immo
            connecte particuliers et investisseurs aux meilleures opportunites du pays : terrains,
            villas, appartements, immeubles et projets d'envergure.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { chiffre: "+500", label: "Biens disponibles" },
            { chiffre: "+300", label: "Clients satisfaits" },
            { chiffre: "+5", label: "Ans d'experience" },
            { chiffre: "8", label: "Regions couvertes" },
          ].map((c) => (
            <div key={c.label} className="bg-vertfonce/5 rounded-xl p-6">
              <div className="text-3xl font-display font-bold text-or">{c.chiffre}</div>
              <div className="text-sm text-vertfonce/70 mt-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-vertfonce mb-3">Notre equipe</h2>
          <p className="text-vertfonce/80 leading-relaxed">
            Une equipe de conseillers, juristes et experts terrain repartis dans les principales
            regions du Senegal, disponibles pour vous accompagner de la recherche jusqu'a la
            signature.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-vertfonce mb-3">Nos valeurs</h2>
            <ul className="text-vertfonce/80 space-y-2 list-disc list-inside">
              <li>Transparence sur les prix et les documents</li>
              <li>Verification systematique des biens</li>
              <li>Accompagnement personnalise</li>
              <li>Ancrage local et connaissance du terrain</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-vertfonce mb-3">Nos zones d'activite</h2>
            <p className="text-vertfonce/80">
              Dakar, Thies, Saint-Louis, Ziguinchor, Kaolack, Diourbel, Louga, Fatick, Kolda,
              Tambacounda.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
