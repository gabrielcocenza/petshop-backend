const jwt = require('jsonwebtoken')

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

const JWTParser = (req) => {
    if (!req.headers.authorization) {
        return null
    }

    const token = req.headers.authorization.split(' ').pop()
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    }
    catch(err) {
        return null
    }
}

const lib = {
    createToken,
    JWTParser
}

module.exports = lib