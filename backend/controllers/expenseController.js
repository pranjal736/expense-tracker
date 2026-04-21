const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const expense = new Expense(req.body);
  const saved = await expense.save();
  res.json(saved);
};

exports.getExpenses = async (req, res) => {
  const userId = req.query.userId;   // 👈 GET USER
  const data = await Expense.find({ userId });  // 👈 FILTER
  res.json(data);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};