require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));
  

app.use("/users", require("./routes/userRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));