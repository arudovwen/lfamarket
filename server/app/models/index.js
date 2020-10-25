const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.payment = require("./payment.model");
db.investment = require("./investment.model");
db.proof = require('./proof.model');
db.referral = require('./referral.model');


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;