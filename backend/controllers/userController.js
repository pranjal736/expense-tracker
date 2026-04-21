const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
exports.register = async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email
  });

  if (existingUser) {
    return res.json({ msg: "Already registered" });
  }

  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: hashed
  });

  await user.save();

  res.json({ msg: "User registered" });
};

// LOGIN
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.json({ msg: "Invalid password" });

  return res.json({ message: "Login successful" });
};