const Schema = require('mongoose').Schema
const model = require('mongoose').model
const { models } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const User = new Schema({
  admin: {
    type: Boolean,
    default: false
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  birthdate: Date,
  phone: String
})

User.plugin(uniqueValidator)

module.exports = models['User'] || model('User', User)