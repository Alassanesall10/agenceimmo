import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AppointmentModal from "../components/AppointmentModal";
import { useAuth } from "../context/AuthContext";

const formaterPrix = (n) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export default function PropertyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bien, setBien] = useState(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [favori, setFavori] = useState(false);
  const [galerieIndex, setGalerieIndex] = useState(0);

  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => setBien(res.data));
  }, [id]);

  const basculerFavori = async () => {
    if (!user) return alert("Connectez-vous pour ajouter ce bien a vos favoris.");
    await api.post(`/favorites/${id}`);
    setFavori(!favori);
  };

  if (!bien) return <div className="max-w-7xl mx-auto px-4 py-10">Chargement...</div>;

  const photos = bien.photos?.length ? bien.photos : [null];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Galerie */}
        <div className="lg:col-span-2">
          <div className="h-96 rounded-2xl bg-vertfonce/10 overflow-hidden flex items-center justify-center text-vertfonce/40">
            {photos[galerieIndex] ? (
              <img src={photos[galerieIndex]} className="w-full h-full object-cover" alt={bien.titre} />
            ) : (
              "Galerie photos / videos / vue drone"
            )}
          </div>
          {bien.photoCredit && (
            <p className="mt-2 text-xs text-vertfonce/60">
              Photo illustrative de la région, pas une vue de la parcelle. Crédit :{" "}
              <a className="underline" href={bien.photoCredit.source} target="_blank" rel="noreferrer">
                {bien.photoCredit.auteur}
              </a>
              {" · "}
              <a className="underline" href={bien.photoCredit.lienLicence} target="_blank" rel="noreferrer">
                {bien.photoCredit.licence}
              </a>
            </p>
          )}
          {photos.length > 1 && (
            <div className="flex gap-2 mt-3">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalerieIndex(i)}
                  className={`w-16 h-12 rounded-lg border ${i === galerieIndex ? "border-or" : "border-transparent"} bg-vertfonce/10`}
                />
              ))}
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold text-vertfonce mb-2">Description</h2>
            <p className="text-vertfonce/80 leading-relaxed">
              {bien.description || "Description a venir."}
            </p>
          </div>

          {bien.caracteristiques?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-vertfonce mb-2">Caracteristiques</h2>
              <div className="flex flex-wrap gap-2">
                {bien.caracteristiques.map((c) => (
                  <span key={c} className="bg-vertfonce/5 text-vertfonce px-3 py-1.5 rounded-full text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold text-vertfonce mb-2">Localisation</h2>
            <p className="text-vertfonce/70 text-sm">{bien.quartier ? `${bien.quartier}, ` : ""}{bien.ville}, {bien.region}</p>
            <div className="h-56 bg-vertfonce/5 rounded-xl mt-2 flex items-center justify-center text-vertfonce/40">
              Carte de localisation
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold text-vertfonce mb-2">Documents disponibles</h2>
            <ul className="text-sm text-vertfonce/80 space-y-1">
              <li>{bien.documents?.titreFoncier ? "✅" : "❌"} Titre foncier</li>
              <li>{bien.documents?.bailEmphyteotique ? "✅" : "❌"} Bail emphyteotique</li>
              <li>{bien.documents?.permisConstruire ? "✅" : "❌"} Permis de construire</li>
            </ul>
          </div>
        </div>

        {/* Informations / contact */}
        <div>
          <div className="bg-white shadow-lg rounded-xl p-6 sticky top-24">
            <h1 className="font-display text-2xl font-bold text-vertfonce">{bien.titre}</h1>
            <p className="text-vertfonce/60 text-sm mt-1">{bien.ville}, {bien.region}</p>
            <div className="text-2xl font-bold text-vertfonce mt-4">
              {formaterPrix(bien.prix)}{bien.loyerPeriode ? `/${bien.loyerPeriode}` : ""}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-vertfonce/70 mt-4">
              {bien.surface && <div>📐 {bien.surface} m²</div>}
              {bien.chambres != null && <div>🛏️ {bien.chambres} chambres</div>}
              {bien.sallesDeBain != null && <div>🚿 {bien.sallesDeBain} sdb</div>}
              <div className="capitalize">🏷️ {bien.type}</div>
            </div>

            {bien.investissement?.revenuLocatifEstime && (
              <div className="mt-4 bg-vertfonce/5 rounded-lg p-3 text-sm">
                <div>Revenu locatif estime: {formaterPrix(bien.investissement.revenuLocatifEstime)}/an</div>
                <div>Nombre de lots: {bien.investissement.nombreDeLots}</div>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button onClick={() => setModalOuvert(true)} className="btn-or flex-1">
                Prendre rendez-vous
              </button>
              <button onClick={basculerFavori} className="border rounded-full px-4">
                {favori ? "♥" : "♡"}
              </button>
            </div>

            <div className="mt-5 pt-5 border-t text-sm text-vertfonce/70">
              <div className="font-semibold text-vertfonce mb-1">Contacter un conseiller</div>
              <div>+221 77 123 45 67</div>
              <div>contact@senegalimmo.sn</div>
            </div>
          </div>
        </div>
      </div>

      {modalOuvert && (
        <AppointmentModal propertyId={bien._id} onClose={() => setModalOuvert(false)} />
      )}
    </div>
  );
}
