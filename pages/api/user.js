const User = require('../../db/user.js')
const bcrypt = require('bcrypt')
const { JWTParser } = require('../../util/jwt')

import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
const saltRounds = 10;

require('../../db/mongodb')

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Authorization'],

    })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    if (req.method === 'POST') {
        const body = req.body
        const { email, password } = body
        if (!email || !password) {
            return res.status(409).send('Bad params. Email and password are required fields')
        }

        const userIsCreated = await User.exists({ email: email })

        if (userIsCreated) {
            return res.status(409).send('User Already Exist')
        }

        const salt = bcrypt.genSaltSync(saltRounds)
        const passwordHashed = bcrypt.hashSync(password, salt)
        const user = {
            ...body,
            password: passwordHashed
        }

        const userCreated = await User.create(user)
        delete userCreated.password
        return res.status(200).send('ok')
    }

    else if (req.method === 'GET') {
        const jwt = JWTParser(req, res)
        if (jwt) {
            const result = await User.findById(jwt.id)
            let user = result.toObject();
            delete user.password
            return res.json(user)
        }
        else {
            return res.status(401).send('User not logged')
        }
    }

    else {
        res.status(400).send(`Method not allowed!`)
    }
}
