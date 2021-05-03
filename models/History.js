const mongoose = require("mongoose")
const User = require("./User")

const HistorySchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  writeDate: {
    type: String,
    maxlength: 50,
  },
  useType: {
    type: String,
  },
  payType: {
    type: String,
  },
  pay: {
    type: Number,
  },
  comment: {
    type: String,
    maxlength: 50,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const History = mongoose.model("History", HistorySchema)
module.exports = History
