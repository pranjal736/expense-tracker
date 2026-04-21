const router = require("express").Router();
const controller = require("../controllers/expenseController");

router.post("/", controller.addExpense);
router.get("/", controller.getExpenses);
router.delete("/:id", controller.deleteExpense);

module.exports = router;