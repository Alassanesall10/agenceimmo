const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    presentation: { type: String },
    region: { type: String, required: true },
    ville: { type: String, required: true },
    localisation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    planLotissement: { type: String },
    prixAPartirDe: { type: Number },
    nombreParcellesTotal: { type: Number },
    nombreParcellesDisponibles: { type: Number },
    avancement: { type: Number, min: 0, max: 100, default: 0 },
    photos: [{ type: String }],
    videos: [{ type: String }],
    vueDrone: [{ type: String }],
    informationsJuridiques: { type: String },
    contactCommercial: {
      nom: { type: String },
      telephone: { type: String },
      email: { type: String },
    },
    statut: {
      type: String,
      enum: ["en_cours", "termine", "a_venir"],
      default: "en_cours",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
