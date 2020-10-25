const mongoose = require("mongoose");

const Investment = mongoose.model(
  "Investment",
  new mongoose.Schema(
    {
      user_id: String,
      username:String,
      plan: String,
      amount: String,
      duration: String,
      start: String,
      end: String,
      status: String,
      payment_id: String,
    },
    { timestamps: true }
  )
);

module.exports = Investment;
