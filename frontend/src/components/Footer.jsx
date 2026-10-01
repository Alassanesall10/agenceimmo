import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-vertfonce-dark text-white/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 font-display text-white font-bold text-lg mb-2">
            <img src="/logo-agence-houda.svg" alt="" className="w-10 h-10" />
            Agence Houda Immo
          </div>
          <p>
            Votre partenaire immobilier au Senegal. Nous vous accompagnons dans chaque etape de
            votre projet.
          </p>
        </div>
        <div>
          <div className="text-or font-semibold mb-2">Navigation</div>
          <ul className="space-y-1">
            <li><Link to="/acheter" className="hover:text-or">Acheter</Link></li>
            <li><Link to="/louer" className="hover:text-or">Louer</Link></li>
            <li><Link to="/terrains" className="hover:text-or">Nos terrains</Link></li>
            <li><Link to="/projets" className="hover:text-or">Nos projets</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-or font-semibold mb-2">Entreprise</div>
          <ul className="space-y-1">
            <li><Link to="/a-propos" className="hover:text-or">A propos</Link></li>
            <li><Link to="/contact" className="hover:text-or">Contact</Link></li>
            <li><Link to="/connexion" className="hover:text-or">Espace client</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-or font-semibold mb-2">Contact</div>
          <ul className="space-y-1">
            <li>Dakar, Senegal</li>
            <li>+221 77 123 45 67</li>
            <li>contact@senegalimmo.sn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs">
        © {new Date().getFullYear()} Agence Houda Immo. Tous droits reserves.
      </div>
    </footer>
  );
}
