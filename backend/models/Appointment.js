const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    nom: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String },
    dateSouhaitee: { type: Date, required: true },
    heureSouhaitee: { type: String, required: true },
    message: { type: String },
    statut: {
      type: String,
      enum: ["en_attente", "confirme", "annule", "termine"],
      default: "en_attente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
