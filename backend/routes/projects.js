const express = require("express");
const Project = require("../models/Project");
const Property = require("../models/Property");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const projets = await Project.find().sort({ createdAt: -1 });
  res.json(projets);
});

router.get("/:id", async (req, res) => {
  const projet = await Project.findById(req.params.id);
  if (!projet) return res.status(404).json({ message: "Projet introuvable" });
  const parcelles = await Property.find({ projet: projet._id });
  res.json({ ...projet.toObject(), parcelles });
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const projet = await Project.create(req.body);
    res.status(201).json(projet);
  } catch (err) {
    res.status(400).json({ message: "Donnees invalides", detail: err.message });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const projet = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!projet) return res.status(404).json({ message: "Projet introuvable" });
  res.json(projet);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  const projet = await Project.findByIdAndDelete(req.params.id);
  if (!projet) return res.status(404).json({ message: "Projet introuvable" });
  res.json({ message: "Projet supprime" });
});

module.exports = router;
