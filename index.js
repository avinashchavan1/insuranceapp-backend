const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema/Users.schema");
const Policy = require("./schema/Policy.schema");
const Users = require("./schema/Users.schema");
const PolicyRoutes = require("./routes/Policy.routes");
const connectionString =
  "mongodb+srv://avinash:KsDh99VXs8bPOW1g@cluster0.poa8o.mongodb.net/insuranceApp?retryWrites=true&w=majority";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(express.json());
app.use("/policy", PolicyRoutes);
app.get("*", function (req, res) {
  res.status(404).send([]);
});
mongoose.connect(connectionString).then(async () => {
  console.log("Connected");
  app.listen(process.env.PORT || 3000);
  //   const policy = await Policy.findOne({ id: 12347 }).populate("customer_id");
  //   console.log(policy);
});
