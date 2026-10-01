require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");

(async () => {
  console.log("Demarrage de MongoDB en memoire (deploiement local)...");
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri("senegal_immo");
  process.env.KEEP_MONGO_OPEN = "1";

  const seed = require("./seed");
  await seed();

  require("./server");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
