const express = require("express");
const router = express.Router();
const User = require("../schema/Users.schema");
const Policy = require("../schema/Policy.schema");

router.get("/test", (req, res, next) => {
  res.json({ Message: "From Policy backend" }).status(200);
});

router.get("/userId/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findOne({ id: userId });

  const policy = await Policy.find({ customer_id: user._id }).populate(
    "customer_id"
  );
  console.log(policy.length);

  res.json(policy).status(200);
});

router.get("/policyId/:id", async (req, res, next) => {
  const policyId = req.params.id;
  const policy = await Policy.find({ id: policyId }).populate("customer_id");
  res.json(policy).status(200);
});
module.exports = router;
