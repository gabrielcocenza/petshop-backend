const jwt = require('jsonwebtoken')
const { createError } = require('./errors')

const { MONGODB_URI, MONGODB_DB, JWT_SECRET } = process.env

if (!JWT_SECRET) {
    throw new Error(
        'Please define the JWT_SECRET environment variable inside .env.local'
    )
}

const createToken = (res, objectToSign) => {
    const newToken = jwt.sign(objectToSign, JWT_SECRET)
    res.setHeader('Authorization', newToken)
    return newToken
}

const JWTParser = (req, res) => {
    if (!req.headers.authorization) {
        throw createError(401, 'Needs Authentication')
    }

    const token = req.headers.authorization.split(' ').pop()
    return jwt.decode(token)
}

const lib = {
    createToken,
    JWTParser
}

module.exports = lib