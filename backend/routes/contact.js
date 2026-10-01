const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const msg = await ContactMessage.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ message: "Donnees invalides", detail: err.message });
  }
});

router.get("/", protect, adminOnly, async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.put("/:id/traite", protect, adminOnly, async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { traite: true },
    { new: true }
  );
  res.json(msg);
});

module.exports = router;
