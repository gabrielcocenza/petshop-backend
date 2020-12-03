
const bcrypt = require('bcrypt')
const JWT = require('../../util/jwt')

const User = require('../../db/user.js')

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

export default async function handler(req, res) {
    await cors(req, res)
    if (req.method === 'POST') {
        const body = req.body
        const { email, password } = body

        if (!email || !password) {
            return res.status(409).send('Bad params. Email and password are required fields')
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send('Forbidden. Wrong login or password')
        }

        const isUser = await bcrypt.compare(password, user.password)
        if (!isUser) {
            return res.status(400).send('Forbidden. Wrong login or password')
        }

        const dataToToken = {
            email,
            id: user._id,
            admin: user.admin
        }

        JWT.createToken(res, dataToToken)
        return res.status(200).send('Successful Login')
    }
}
