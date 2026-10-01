import { Link } from "react-router-dom";

const formaterPrix = (n) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export default function PropertyCard({ bien }) {
  return (
    <div className="card">
      <div className="relative h-44 bg-vertfonce/10">
        {bien.photos?.[0] ? (
          <img
            src={bien.photos[0]}
            alt={`Vue illustrative du Senegal pour ${bien.titre}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-vertfonce/40 text-sm">
            Photo a venir
          </div>
        )}
        {bien.nouveaute && (
          <span className="absolute top-2 left-2 bg-or text-vertfonce text-xs font-semibold px-2 py-1 rounded">
            Nouveau
          </span>
        )}
        <span className="absolute top-2 right-2 bg-vertfonce text-white text-xs px-2 py-1 rounded capitalize">
          {bien.transaction === "vente" ? "A vendre" : "A louer"}
        </span>
        {bien.photoCredit && (
          <div className="absolute bottom-0 inset-x-0 bg-black/65 px-2 py-1 text-[10px] text-white">
            Photo illustrative
          </div>
        )}
      </div>
      <div className="p-4">
        {bien.photoCredit && (
          <p className="mb-2 text-[10px] text-vertfonce/60">
            Photo illustrative ·{" "}
            <a href={bien.photoCredit.source} target="_blank" rel="noreferrer">
              {bien.photoCredit.auteur}
            </a>{" "}
            ·{" "}
            <a href={bien.photoCredit.lienLicence} target="_blank" rel="noreferrer" className="underline">
              Licence {bien.photoCredit.licence}
            </a>
          </p>
        )}
        <h3 className="font-semibold text-vertfonce truncate">{bien.titre}</h3>
        <p className="text-xs text-vertfonce/60 mt-1">
          {bien.quartier ? `${bien.quartier}, ` : ""}{bien.ville}{bien.region ? `, ${bien.region}` : ""}
        </p>
        <div className="flex items-center gap-3 text-xs text-vertfonce/70 mt-2">
          {bien.surface && <span>{bien.surface} m²</span>}
          {bien.chambres != null && <span>{bien.chambres} ch.</span>}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-vertfonce">
            {formaterPrix(bien.prix)}
            {bien.loyerPeriode ? `/${bien.loyerPeriode}` : ""}
          </span>
          <Link
            to={`/biens/${bien._id}`}
            className="text-xs bg-or hover:bg-or-dark text-vertfonce font-semibold px-3 py-1.5 rounded-full"
          >
            Voir le bien
          </Link>
        </div>
      </div>
    </div>
  );
}
