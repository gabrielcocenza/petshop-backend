const Schema = require('mongoose').Schema
const model = require('mongoose').model
const uniqueValidator = require('mongoose-unique-validator')

const Sell = new Schema({
    userId: {
        type: String,
        required: true,
    },
    bill: [
        {
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

module.exports = model('Sell', Sell)