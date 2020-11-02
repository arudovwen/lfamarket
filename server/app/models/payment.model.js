const mongoose = require("mongoose");

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema(
    {
      user_id: String,
      username:String,
      plan:String,
      amount_paid: String,
      investment_id:String,
      verify: Boolean,
      
     
    },
    { timestamps: true }
  )
);

module.exports = Payment;
