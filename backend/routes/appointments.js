const express = require("express");
const Appointment = require("../models/Appointment");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/appointments -> un client prend rendez-vous (ouvert, sans compte requis)
router.post("/", async (req, res) => {
  try {
    const rdv = await Appointment.create(req.body);
    res.status(201).json(rdv);
  } catch (err) {
    res.status(400).json({ message: "Donnees invalides", detail: err.message });
  }
});

// GET /api/appointments -> liste (admin) ou "mes rendez-vous" (client)
router.get("/", protect, async (req, res) => {
  const filtre = req.user.role === "admin" ? {} : { client: req.user._id };
  const rdvs = await Appointment.find(filtre)
    .populate("property")
    .sort({ dateSouhaitee: 1 });
  res.json(rdvs);
});

// PUT /api/appointments/:id/statut -> mise a jour du statut (admin)
router.put("/:id/statut", protect, adminOnly, async (req, res) => {
  const rdv = await Appointment.findByIdAndUpdate(
    req.params.id,
    { statut: req.body.statut },
    { new: true }
  );
  if (!rdv) return res.status(404).json({ message: "Rendez-vous introuvable" });
  res.json(rdv);
});

module.exports = router;
