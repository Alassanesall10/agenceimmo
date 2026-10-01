const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String },
    sujet: { type: String },
    message: { type: String, required: true },
    traite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
