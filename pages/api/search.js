const Supply = require('../../db/supply.js')

require('../../db/mongodb')
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],

    })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    if (req.method === 'POST') {
        const body = req.body
        const { search } = body
        const products = await Supply.find(
            {"$or": [
                {"description":  {"$regex": search, "$options": "i" } },
                {"name":  {"$regex": search, "$options": "i" } }
            ]}
        )
        return res.json(products)
    }
}