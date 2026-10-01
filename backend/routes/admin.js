const express = require("express");
const Property = require("../models/Property");
const Appointment = require("../models/Appointment");
const ContactMessage = require("../models/ContactMessage");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET /api/admin/dashboard -> chiffres cles du tableau de bord
router.get("/dashboard", protect, adminOnly, async (req, res) => {
  const [biensDisponibles, biensVendus, biensLoues, demandesClients, visitesProgrammees] =
    await Promise.all([
      Property.countDocuments({ statut: "disponible" }),
      Property.countDocuments({ statut: "vendu" }),
      Property.countDocuments({ statut: "loue" }),
      ContactMessage.countDocuments({ traite: false }),
      Appointment.countDocuments({ statut: { $in: ["en_attente", "confirme"] } }),
    ]);

  res.json({
    biensDisponibles,
    biensVendus,
    biensLoues,
    demandesClients,
    visitesProgrammees,
  });
});

module.exports = router;
