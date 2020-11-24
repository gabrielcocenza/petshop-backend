const Schema = require('mongoose').Schema
const model = require('mongoose').model
const uniqueValidator = require('mongoose-unique-validator')

const Supply = new Schema({
    title: String,
    price: Number,
    status: String,
    units: Number,
})

Supply.plugin(uniqueValidator)

module.exports = model('Supply', Supply)