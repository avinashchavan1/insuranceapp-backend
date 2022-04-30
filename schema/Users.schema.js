const mongoose = require("mongoose");

const schema = mongoose.Schema;
const userSchema = new schema({
  id: { type: String, required: true },
  gender: { type: String, required: true },
  income: { type: String, required: true },
  region: { type: String, required: true },
  marital_status: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
