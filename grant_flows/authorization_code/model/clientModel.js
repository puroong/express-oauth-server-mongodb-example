const mongoose = require('mongoose')
const Schema = mongoose.Schema

let clientSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  secret: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['confidential', 'public'],
    default: 'confidential'
  },
  redirectUris: {
    type: Array,
    required: true
  },
  grants: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('ClientModel', clientSchema)
