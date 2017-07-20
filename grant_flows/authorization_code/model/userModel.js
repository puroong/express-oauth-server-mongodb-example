const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('UserModel', userSchema)
