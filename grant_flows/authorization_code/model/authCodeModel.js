const mongoose = require('mongoose')
const Schema = mongoose.Schema

let authCodeSchema = new Schema({
  authorizationCode: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  redirectUri: {
    type: String,
    required: true
  },
  scope: {
    type: Object,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('authCodeModel', authCodeSchema)
