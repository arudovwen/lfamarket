const mongoose = require('mongoose');
const { schema } = require('./user.model');


const Proof = mongoose.model(
    "Proof", new mongoose.Schema({
        user_id: String,
        username:String,
        plan:String,
        amount_paid: String,
        investment_id:String,
        url:String,
        verified:Boolean,
        status:String,
        startDate:String,
        endDate:String,
        earning:String
    }, 
    { timestamps: true })
)
module.exports = Proof