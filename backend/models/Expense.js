const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  userId: String   // 👈 ADD THIS LINE
});

module.exports = mongoose.model("Expense", expenseSchema);