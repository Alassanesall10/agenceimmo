// Ajoute les terrains manquants et rafraichit leurs photos sans vider la base.
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Property = require("./models/Property");
const terrains = require("./data/terrains");

const run = async () => {
  await connectDB();

  let admin = await User.findOne({ role: "admin" });
  if (!admin) {
    admin = await User.create({
      nom: "Administrateur",
      email: "admin@senegalimmo.sn",
      motDePasse: "admin1234",
      role: "admin",
    });
  }

  const operations = terrains.map((terrain) => {
    const { photos, photoCredit, ...champsTerrain } = terrain;
    return {
      updateOne: {
        filter: { titre: terrain.titre },
        update: {
          $set: { photos, photoCredit },
          $setOnInsert: { ...champsTerrain, createdBy: admin._id },
        },
        upsert: true,
      },
    };
  });
  const imageDiamniadio = terrains.find((terrain) => terrain.ville === "Diamniadio");
  const imageSaly = terrains.find((terrain) => terrain.ville === "Saly");
  const imageInterieur = terrains.find((terrain) => terrain.region === "Kaolack");
  operations.push(
    ...[
      { titre: "Terrain residentiel", image: imageDiamniadio },
      { titre: "Parcelle projet Residence Les Palmiers", image: imageSaly },
      { titre: "Terrain agricole", image: imageInterieur },
    ].map(({ titre, image }) => ({
      updateOne: {
        filter: { titre },
        update: { $set: { photos: image.photos, photoCredit: image.photoCredit } },
      },
    }))
  );

  const resultat = await Property.bulkWrite(operations);
  console.log(
    `${resultat.upsertedCount} terrain(s) ajoute(s), ${resultat.modifiedCount} photo(s) actualisee(s).`
  );

  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
