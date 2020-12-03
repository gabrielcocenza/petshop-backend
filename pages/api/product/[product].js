
const Supply = require('../../../db/supply')
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

require('../../../db/mongodb')

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],

    })
)

module.exports = async (req, res) => {
    await cors(req, res)

    const {
        query: { product },
    } = req

    if (req.method === 'GET') {
        const productFind = await Supply.findById(product)
        return res.json(productFind)
    }
}
