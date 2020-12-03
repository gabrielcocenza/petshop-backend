const Schema = require('mongoose').Schema
const model = require('mongoose').model
const uniqueValidator = require('mongoose-unique-validator')

const Supply = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: String,
    category: String
})

Supply.plugin(uniqueValidator)

module.exports = model('Supply', Supply)