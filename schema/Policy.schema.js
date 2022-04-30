const mongoose = require("mongoose");

const schema = mongoose.Schema;
const policySchema = new schema({
  id: { type: Number, required: true },
  date_of_purchase: { type: String, required: true },
  customer_id: { type: schema.Types.ObjectId, ref: "User", required: true },
  vechile_segment: { type: String, required: true },
  fuel: { type: String, required: true },
  premium: { type: Number, required: true },
  bodily_injury_liability: { type: Number, required: true },
  personal_injury_protection: { type: Number, required: true },
  property_damage_liability: { type: Number, required: true },
  collision: { type: Number, required: true },
  comprehensive: { type: Number, required: true },
});

module.exports = mongoose.model("Policy", policySchema);
