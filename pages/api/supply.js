
const { JWTParser } = require('../../util/jwt')
const User = require('../../db/user')
const Supply = require('../../db/supply')

require('../../db/mongodb')

module.exports = async (req, res) => {
    if(req.method === 'POST'){
        const jwt = JWTParser(req, res)
        if (jwt && jwt.admin) {
            const body = req.body
            const { name, description, price, stock } = body
            if ( !name || !description || !price || !stock ) {
                return res.status(409).send('Bad params. Name, description, price and stock are required fields')
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

    else if(req.method === 'PATCH'){
        const jwt = JWTParser(req, res)
        if (jwt && jwt.admin) {
            const body = req.body
            const { id } = body
            const productIsCreated = await Supply.findById(id)
            console.log(productIsCreated)
            if (!productIsCreated){
                res.status(400).send('Bad request. Product does not exist')
            }

            const sendData = {
                ...body
            }

            delete sendData._id

            console.log(sendData)
            await Supply.findByIdAndUpdate(id, sendData)
            return res.status(200).send('Product Updated')
        }
        else{
            return res.status(401).send('Forbidden. Not enough privilege')
        }
    }

    else if(req.method === 'DELETE'){
        const jwt = JWTParser(req, res)
        if (jwt && jwt.admin) {
            const body = req.body
            const { id } = body
            const productIsCreated = await Supply.findById(id)

            if (!productIsCreated){
                res.status(400).send('Bad request. Product does not exist')
            }

            await Supply.findByIdAndDelete(id)
            return res.status(200).send('Product Deleted')
        }
        else{
            return res.status(401).send('Forbidden. Not enough privilege')
        }
    }

    else if(req.method === 'GET'){
        const jwt = JWTParser(req, res)
        if (jwt) {

            const productIsCreated = await Supply.find({})
            return res.json(productIsCreated)
        }
        else{
            return res.status(401).send('Forbidden. Not enough privilege')
        }
    }
}