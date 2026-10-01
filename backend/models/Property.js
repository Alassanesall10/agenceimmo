const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    // vente | location
    transaction: { type: String, enum: ["vente", "location"], required: true },
    // villa, appartement, terrain, immeuble, champ, bureau, local_commercial, entrepot, restaurant, boutique
    type: { type: String, required: true },
    prix: { type: Number, required: true },
    loyerPeriode: { type: String, enum: ["mois", "an", null], default: null },
    region: { type: String, required: true },
    ville: { type: String, required: true },
    quartier: { type: String },
    surface: { type: Number },
    chambres: { type: Number },
    sallesDeBain: { type: Number },
    description: { type: String },
    caracteristiques: [{ type: String }],
    photoCredit: {
      auteur: { type: String },
      source: { type: String },
      licence: { type: String },
      lienLicence: { type: String },
    },
    documents: {
      titreFoncier: { type: Boolean, default: false },
      bailEmphyteotique: { type: Boolean, default: false },
      permisConstruire: { type: Boolean, default: false },
      autres: [{ type: String }],
    },
    photos: [{ type: String }],
    videos: [{ type: String }],
    vueDrone: [{ type: String }],
    localisation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    // Pour investisseurs pro
    investissement: {
      revenuLocatifEstime: { type: Number },
      nombreDeLots: { type: Number },
    },
    statut: {
      type: String,
      enum: ["disponible", "reserve", "vendu", "loue"],
      default: "disponible",
    },
    nouveaute: { type: Boolean, default: false },
    projet: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

PropertySchema.index({ titre: "text", ville: "text", region: "text" });

module.exports = mongoose.model("Property", PropertySchema);
