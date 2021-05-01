const mongoose = require("mongoose")
const User = require("./User")

mongoose.set("useCreateIndex", true)

const HistorySchema = mongoose.Schema({
  write: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  writeDate: {
    type: String,
    maxlength: 50,
  },
  useType: {
    type: Number,
  },
  payType: {
    type: Number,
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
