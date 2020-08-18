const express = require("express");
const mongodb = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const router = express.Router();

// get vendors
router.get("/", async (req, res) => {
  const vendors = await loadVendorsCollection();
  res.send(await vendors.find({}).toArray());
});

// add vendor
router.post("/", async (req, res) => {
  const vendors = await loadVendorsCollection();
  await vendors.insertOne({
    name: req.body.name,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// edit vendor
router.put("/:id", async (req, res) => {
  const vendors = await loadVendorsCollection();
  const updateBody = { name: req.body.name };
  //   res.status(200).send({ id: req.params.id });
  await vendors.updateOne(
    {
      _id: new mongodb.ObjectID(req.params.id),
    },
    {
      $set: { "name": req.body.name },
    }
  );
  res.status(201).send(await vendors.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray());
});

// delete vendor

async function loadVendorsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.db("virtual-lot").collection("vendors");
}

module.exports = router;
