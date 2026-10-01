import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

// Icone personnalisee couleur or pour les marqueurs
const icone = new Icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42">
        <path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="#c9a227"/>
        <circle cx="15" cy="15" r="6" fill="#0d2b1f"/>
      </svg>`
    ),
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38],
});

const CENTRE_SENEGAL = [14.4974, -14.4524];

export default function PropertiesMap({ biens }) {
  const avecCoordonnees = biens.filter((b) => b.localisation?.lat && b.localisation?.lng);

  return (
    <MapContainer
      center={CENTRE_SENEGAL}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {avecCoordonnees.map((bien) => (
        <Marker
          key={bien._id}
          position={[bien.localisation.lat, bien.localisation.lng]}
          icon={icone}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{bien.titre}</div>
              <div className="text-xs text-vertfonce/60">{bien.quartier ? `${bien.quartier}, ` : ""}{bien.ville}, {bien.region}</div>
              <div className="font-bold mt-1">
                {new Intl.NumberFormat("fr-FR").format(bien.prix)} FCFA
              </div>
              <Link to={`/biens/${bien._id}`} className="text-or underline text-xs">
                Voir le bien
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
