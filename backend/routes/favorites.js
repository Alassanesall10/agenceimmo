const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// GET /api/favorites -> favoris de l'utilisateur connecte
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("favoris");
  res.json(user.favoris);
});

// POST /api/favorites/:propertyId -> ajouter/retirer (toggle)
router.post("/:propertyId", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const { propertyId } = req.params;
  const dejaFavori = user.favoris.some((id) => id.toString() === propertyId);

  if (dejaFavori) {
    user.favoris = user.favoris.filter((id) => id.toString() !== propertyId);
  } else {
    user.favoris.push(propertyId);
  }
  await user.save();
  res.json({ favoris: user.favoris, ajoute: !dejaFavori });
});

module.exports = router;
