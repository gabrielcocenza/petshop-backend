const Schema = require('mongoose').Schema
const model = require('mongoose').model
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
})

User.plugin(uniqueValidator)

module.exports = model('User', User)