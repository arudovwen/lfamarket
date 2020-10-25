const mongoose = require('mongoose');

const Referral = mongoose.model(
    "Referral", new mongoose.Schema({
        username:String,
        referral: [],
      
    }, 
    { timestamps: true })
)

module.exports = Referral