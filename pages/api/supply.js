
const { JWTParser } = require('../../util/jwt')
const User = require('../../db/user')
const Supply = require('../../db/supply')

require('../../db/mongodb')

module.exports = async (req, res) => {
    if(req.method === 'POST'){
        const jwt = JWTParser(req, res)
        console.log(jwt)
        if (jwt && jwt.admin) {
            const body = req.body
            const { title, price, status, units } = body
            if (!title || !price || !status || !units) {
                return res.status(409).send('Bad params. Title, price, status and units are required fields')
            }

            else{
                const product = {
                    ...body,
                }
                const productCreated = await Supply.create(product)
                return res.status(200).send('product added')
            }

        }
        else{
            return res.status(400).send('Forbidden. Not enough privilege')
        }
    }

    else if(req.method === 'GET'){
        const jwt = JWTParser(req, res)
        console.log(jwt)
        if (jwt && jwt.admin) {
            res.status(200).send(`Hello Admin!`)
        }
        else{
            return res.status(401).send('Forbidden. Not enough privilege')
        }
    }
}