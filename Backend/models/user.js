const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
