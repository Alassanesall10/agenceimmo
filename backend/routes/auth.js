const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

const genererToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { nom, email, telephone, motDePasse } = req.body;
    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: "Nom, email et mot de passe requis" });
    }
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "Un compte existe deja avec cet email" });
    }
    const user = await User.create({ nom, email, telephone, motDePasse });
    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      token: genererToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparerMotDePasse(motDePasse))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    res.json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      token: genererToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

// GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
