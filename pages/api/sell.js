
const { JWTParser } = require('../../util/jwt')
const Sell = require('../../db/sell')
const Supply = require('../../db/supply')

require('../../db/mongodb')
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
    })
)

export default async function handler (req, res) {
    await cors(req, res)
    if(req.method === 'POST'){
        const jwt = JWTParser(req, res)
        if (jwt) {
            const userId = jwt.id
            const body = req.body
            const { bill, creditCard, totalPrice } = body
            if ( !userId ||  !bill || !creditCard || !totalPrice ) {
                return res.status(409).send('Bad params. Bill, creditCard and total_price are required fields')
            }

            else{
                const supplyStatus = await checkSupply(bill, res)
                if(supplyStatus[0]){
                    await updateSupply(bill)
                    console.log('supply updated')
                    const sell = {
                        ...body,
                    }
                    sell.userId = userId
                    await Sell.create(sell)
                    console.log('sell created')
                    return res.status(200).send('Purchase concluded')
                }
                else{
                    return res.status(400).send(supplyStatus[1])
                }
            }

        }
        else{
            return res.status(400).send('Forbidden. Not enough privilege')
        }
    }

    else if(req.method === 'GET'){
        const jwt = JWTParser(req, res)
        if (jwt) {
            const userId = jwt.id
            const userPurchases = await Sell.find({userId: userId})
            return res.json(userPurchases)
        }
        else{
            return res.status(400).send('Forbidden. Not enough privilege')
        }
    }
}


async function checkSupply(bill, res){
    let msg = ''
    for(billItem in bill){
        const product = await Supply.findById(bill[billItem].productId)
        if (!product){
            supplyStatus = false
            msg = 'Bad request. Product with id ' + bill[billItem].productId + ' does not exist'
            return [false, msg]
        }

        if(bill[billItem].quantity > product.stock){
            msg = 'Bad request. Order of product: ' + bill[billItem].productId + ' bigger than stock '
            msg += 'Current stock is ' + product.stock
            return [false, msg]
        }

        if(product.stock == 0){
            msg = 'Bad request. Stock of product: ' + bill[billItem].productId + ' is over'
            return [false, msg]
        }
    }
    return [true, msg]
}


async function updateSupply(bill){
    for(billItem in bill){
        const id = bill[billItem].productId
        const product = await Supply.findById(id)

        await Supply.findByIdAndUpdate(id, {
            stock: product.stock - bill[billItem].quantity,
            sold: product.sold + bill[billItem].quantity
        })
    }
}
