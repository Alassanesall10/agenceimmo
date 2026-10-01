require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const projectRoutes = require("./routes/projects");
const favoriteRoutes = require("./routes/favorites");
const appointmentRoutes = require("./routes/appointments");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "API Senegal Immo en ligne" }));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Serveur demarre sur le port ${PORT}`));
});
