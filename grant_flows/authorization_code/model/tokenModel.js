const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tokenSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  accessTokenExpiresAt: {
    type: Date,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  refreshTokenExpiresAt: {
    type: Date,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  client: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model('TokenModel', tokenSchema)
