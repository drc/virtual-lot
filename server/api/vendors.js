const express = require("express");
const db = require("../db/connection");
const vendors = db.get("vendors");
vendors.createIndex("name");

const router = express.Router();

// get vendors
router.get("/", async (req, res) => {
  res.json(await vendors.find({}));
});

// get one vendor
router.get("/:id", async (req, res) => {
  res.json(await vendors.findOne({ _id: req.params.id }));
});

// add vendor
router.post("/", async (req, res, next) => {
  const existingVendor = await vendors.findOne({ name: req.body.name });
  if (existingVendor) {
    const error = new Error(`${existingVendor.name} already exists`);
    res.status(409);
    next(error);
  } else {
    await vendors.insert({
      name: req.body.name,
      createdAt: new Date(),
    });
    res.status(201).send();
  }
});

// edit vendor
router.put("/:id", async (req, res) => {
  await vendors.update(
    {
      _id: req.params.id,
    },
    { $set: { name: req.body.name } }
  );
  res.status(201).json(await vendors.findOne({ _id: req.params.id }));
});

// delete vendor

module.exports = router;
