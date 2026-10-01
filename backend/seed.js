// Script de demonstration : remplit la base avec des donnees d'exemple
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Property = require("./models/Property");
const Project = require("./models/Project");
const terrains = require("./data/terrains");

const run = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Property.deleteMany({}),
    Project.deleteMany({}),
  ]);

  const admin = await User.create({
    nom: "Administrateur",
    email: "admin@senegalimmo.sn",
    motDePasse: "admin1234",
    role: "admin",
  });

  const projet = await Project.create({
    nom: "Residence Les Palmiers",
    presentation:
      "Un cadre de vie moderne et securise, a quelques minutes de la mer, avec des villas et appartements.",
    region: "Thies",
    ville: "Saly",
    localisation: { lat: 14.4547, lng: -17.0203 },
    prixAPartirDe: 35000000,
    nombreParcellesTotal: 50,
    nombreParcellesDisponibles: 24,
    avancement: 60,
    statut: "en_cours",
    contactCommercial: {
      nom: "Awa Diop",
      telephone: "+221 77 123 45 67",
      email: "commercial@senegalimmo.sn",
    },
  });

  const imageDiamniadio = terrains.find((terrain) => terrain.ville === "Diamniadio");
  const imageSaly = terrains.find((terrain) => terrain.ville === "Saly");
  const imageInterieur = terrains.find((terrain) => terrain.region === "Kaolack");

  await Property.insertMany([
    {
      titre: "Villa moderne avec vue mer",
      transaction: "vente",
      type: "villa",
      prix: 850000000,
      region: "Dakar",
      ville: "Almadies",
      surface: 300,
      chambres: 4,
      sallesDeBain: 3,
      description:
        "Magnifique villa moderne situee aux Almadies, offrant une vue imprenable sur l'ocean et des espaces de vie lumineux.",
      caracteristiques: ["Piscine", "Securite 24h/24", "Garage", "Jardin"],
      documents: { titreFoncier: true },
      photos: [],
      statut: "disponible",
      nouveaute: true,
      createdBy: admin._id,
    },
    {
      titre: "Terrain residentiel",
      transaction: "vente",
      type: "terrain",
      prix: 45000000,
      region: "Dakar",
      ville: "Diamniadio",
      surface: 1000,
      photos: imageDiamniadio.photos,
      photoCredit: imageDiamniadio.photoCredit,
      documents: { titreFoncier: true },
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Appartement 3 pieces",
      transaction: "vente",
      type: "appartement",
      prix: 320000000,
      region: "Dakar",
      ville: "Plateau",
      surface: 150,
      chambres: 3,
      sallesDeBain: 2,
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Appartement meuble a louer",
      transaction: "location",
      type: "appartement",
      prix: 600000,
      loyerPeriode: "mois",
      region: "Dakar",
      ville: "Dakar",
      surface: 120,
      chambres: 2,
      sallesDeBain: 1,
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Villa a louer",
      transaction: "location",
      type: "villa",
      prix: 1200000,
      loyerPeriode: "mois",
      region: "Thies",
      ville: "Saly",
      surface: 250,
      chambres: 4,
      sallesDeBain: 3,
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Bureau a louer",
      transaction: "location",
      type: "bureau",
      prix: 800000,
      loyerPeriode: "mois",
      region: "Dakar",
      ville: "Plateau",
      surface: 100,
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Immeuble commercial",
      transaction: "vente",
      type: "immeuble",
      prix: 1200000000,
      region: "Thies",
      ville: "Thies Centre",
      surface: 400,
      chambres: 8,
      statut: "disponible",
      investissement: { revenuLocatifEstime: 8500000, nombreDeLots: 6 },
      createdBy: admin._id,
    },
    {
      titre: "Terrain agricole",
      transaction: "vente",
      type: "champ",
      prix: 80000000,
      region: "Kaolack",
      ville: "Kaolack",
      surface: 100000,
      photos: imageInterieur.photos,
      photoCredit: imageInterieur.photoCredit,
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Villa avec piscine",
      transaction: "vente",
      type: "villa",
      prix: 650000000,
      region: "Thies",
      ville: "Saly",
      surface: 400,
      chambres: 5,
      sallesDeBain: 4,
      statut: "disponible",
      createdBy: admin._id,
    },
    {
      titre: "Parcelle projet Residence Les Palmiers",
      transaction: "vente",
      type: "terrain",
      prix: 35000000,
      region: "Thies",
      ville: "Saly",
      surface: 500,
      photos: imageSaly.photos,
      photoCredit: imageSaly.photoCredit,
      documents: { titreFoncier: true },
      statut: "disponible",
      projet: projet._id,
      createdBy: admin._id,
    },
    ...terrains.map((t) => ({ ...t, createdBy: admin._id })),
  ]);

  console.log("Base de donnees initialisee avec succes.");
  console.log("Connexion admin : admin@senegalimmo.sn / admin1234");
  if (process.env.KEEP_MONGO_OPEN !== "1") {
    mongoose.connection.close();
  }
};

if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = run;
