const monk = require("monk");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const db = monk(process.env.MONGO_URL);

console.log("[MONGO_URL]", process.env.MONGO_URL);

module.exports = db;