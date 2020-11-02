const mongoose = require("mongoose");

const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema(
    {
      user_id: String,
      username:String,
      plan:String,
      amount_paid: String,
      investment_id:String,
      endDate:String
      
    },
    { timestamps: true }
  )
);

module.exports = Invoice;
