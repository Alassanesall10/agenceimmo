const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifie qu'un token JWT valide est present
const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-motDePasse");
      if (!req.user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalide ou expire" });
    }
  }

  return res.status(401).json({ message: "Non autorise, token manquant" });
};

// Reserve aux administrateurs
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Acces reserve aux administrateurs" });
};

module.exports = { protect, adminOnly };
