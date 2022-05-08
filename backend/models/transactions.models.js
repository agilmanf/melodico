const mongoose = require("mongoose");

const transactions = new mongoose.Schema({
  userID: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
    },
   purchaseDate: {
       type: Date,
       required: true,
   }


});

const Transaction = mongoose.model("Transaction", transactions);
module.exports = Transaction;