const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
