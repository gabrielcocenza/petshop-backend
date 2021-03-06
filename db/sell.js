const Schema = require('mongoose').Schema
const model = require('mongoose').model
const { models } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Sell = new Schema({
    userId: {
        type: String,
        required: true,
    },
    bill: [
        {
            name: String,
            productId: String,
            quantity: Number,
            price: Number
        }
    ],
    creditCard: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true,
    }

})

Sell.plugin(uniqueValidator)

module.exports = models['Sell'] || model('Sell', Sell)