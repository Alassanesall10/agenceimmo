const express = require("express");
const Property = require("../models/Property");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET /api/properties  -> liste avec filtres + pagination
// query possibles: transaction, type, region, ville, prixMin, prixMax,
// surfaceMin, surfaceMax, chambres, titreFoncier, nouveaute, q, page, limit
router.get("/", async (req, res) => {
  try {
    const {
      transaction,
      type,
      region,
      ville,
      prixMin,
      prixMax,
      surfaceMin,
      surfaceMax,
      chambres,
      titreFoncier,
      nouveaute,
      statut,
      q,
      page = 1,
      limit = 12,
    } = req.query;

    const filtre = {};
    if (transaction) filtre.transaction = transaction;
    if (type && type !== "tout") filtre.type = type;
    if (region) filtre.region = region;
    if (ville) filtre.ville = new RegExp(ville, "i");
    if (chambres) filtre.chambres = { $gte: Number(chambres) };
    if (titreFoncier === "true") filtre["documents.titreFoncier"] = true;
    if (nouveaute === "true") filtre.nouveaute = true;
    if (statut) filtre.statut = statut;
    else filtre.statut = { $ne: "vendu" };

    if (prixMin || prixMax) {
      filtre.prix = {};
      if (prixMin) filtre.prix.$gte = Number(prixMin);
      if (prixMax) filtre.prix.$lte = Number(prixMax);
    }
    if (surfaceMin || surfaceMax) {
      filtre.surface = {};
      if (surfaceMin) filtre.surface.$gte = Number(surfaceMin);
      if (surfaceMax) filtre.surface.$lte = Number(surfaceMax);
    }
    if (q) {
      filtre.$text = { $search: q };
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Number(limit));

    const [biens, total] = await Promise.all([
      Property.find(filtre)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Property.countDocuments(filtre),
    ]);

    res.json({
      biens,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

// GET /api/properties/stats -> compteurs pour la home et l'admin
router.get("/stats", async (req, res) => {
  try {
    const [terrains, villas, appartements, immeubles, champs, vendus, loues, disponibles] =
      await Promise.all([
        Property.countDocuments({ type: "terrain" }),
        Property.countDocuments({ type: "villa" }),
        Property.countDocuments({ type: "appartement" }),
        Property.countDocuments({ type: "immeuble" }),
        Property.countDocuments({ type: "champ" }),
        Property.countDocuments({ statut: "vendu" }),
        Property.countDocuments({ statut: "loue" }),
        Property.countDocuments({ statut: "disponible" }),
      ]);
    res.json({ terrains, villas, appartements, immeubles, champs, vendus, loues, disponibles });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    const bien = await Property.findById(req.params.id).populate("projet");
    if (!bien) return res.status(404).json({ message: "Bien introuvable" });
    res.json(bien);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

// POST /api/properties -> creation (admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const bien = await Property.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(bien);
  } catch (err) {
    res.status(400).json({ message: "Donnees invalides", detail: err.message });
  }
});

// PUT /api/properties/:id -> modification (admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const bien = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bien) return res.status(404).json({ message: "Bien introuvable" });
    res.json(bien);
  } catch (err) {
    res.status(400).json({ message: "Donnees invalides", detail: err.message });
  }
});

// DELETE /api/properties/:id -> retrait (admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const bien = await Property.findByIdAndDelete(req.params.id);
    if (!bien) return res.status(404).json({ message: "Bien introuvable" });
    res.json({ message: "Bien supprime" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

module.exports = router;
