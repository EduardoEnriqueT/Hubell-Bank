const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transactions = new Schema({
    Creditor: String,
    Receipent: String,
    Amount: Number,
    Time: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Transactions", Transactions);