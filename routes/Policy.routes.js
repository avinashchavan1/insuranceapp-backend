const express = require("express");
const router = express.Router();
const User = require("../schema/Users.schema");
const Policy = require("../schema/Policy.schema");
const moment = require("moment");
router.get("/test", (req, res, next) => {
  res.json({ Message: "From Policy backend" }).status(200);
});

moment.createFromInputFallback = function (config) {
  // unreliable string magic, or
  config._d = new Date(config._i);
};

router.get("/userId/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findOne({ id: userId });
  if (user === null) {
    return res.status(400).json({ message: "User not found" });
  }
  const policy = await Policy.find({ customer_id: user._id }).populate(
    "customer_id"
  );
  console.log("Number of Policies :", policy.length);
  res.json(policy).status(200);
});

router.get("/policyId/:id", async (req, res, next) => {
  const policyId = req.params.id;
  const policy = await Policy.find({ id: policyId }).populate("customer_id");
  res.json(policy).status(200);
});

router.get("/policies/:region", async (req, res, next) => {
  const region = req.params.region;
  const regionMap = {
    east: "East",
    west: "West",
    north: "North",
    south: "South",
  };
  let policy;

  policy = await Policy.find().populate("customer_id");
  if (region !== "all") {
    policy = policy.map((element) => {
      if (element.customer_id.region === regionMap[region]) {
        return element;
      }
    });
  }

  policy = policy.map((element) => {
    if (element?.date_of_purchase) {
      return moment(element.date_of_purchase).format("MM-YYYY");
    }
  });

  const counts = {};
  for (const element of policy) {
    counts[element] = counts[element] ? counts[element] + 1 : 1;
  }
  if (counts["undefined"]) {
    delete counts["undefined"];
  }
  const countData = [];
  for (const key in counts) {
    countData.push({ Date: key, scales: counts[key] });
  }
  res.status(200).json(countData);
});

router.post("/update", async (req, res, next) => {
  const policyDetails = req.body;
  console.log(policyDetails);
  const policy = await Policy.findOne({ id: policyDetails.id }).populate(
    "customer_id"
  );
  if (policy === null) {
    return res.status(400).json({ message: "Policy not found" });
  }
  if (policy.date_of_purchase !== policyDetails.date_of_purchase) {
    return res
      .status(400)
      .json({ message: "Modification Restricted : Date of Purchase" });
  }
  if (policyDetails.premium > 1000000) {
    return res.status(400).json({ message: "Premium is too high" });
  }
  const user = await User.findOne({ id: policyDetails.customer_id.id });
  policy.customer_id = user;
  policy.id = policyDetails.id;
  policy.date_of_purchase = policyDetails.date_of_purchase;
  policy.vechile_segment = policyDetails.vechile_segment;
  policy.fuel = policyDetails.fuel;
  policy.premium = policyDetails.premium;
  policy.bodily_injury_liability = policyDetails.bodily_injury_liability;
  policy.personal_injury_protection = policyDetails.personal_injury_protection;
  policy.property_damage_liability = policyDetails.property_damage_liability;
  policy.collision = policyDetails.collision;
  policy.comprehensive = policyDetails.comprehensive;
  console.log(user);
  await policy
    .save()
    .then((result) => res.status(200).json(policy))
    .catch((err) =>
      res.status(400).json({ message: "Couldnt update policy", message: err })
    );
});

module.exports = router;
