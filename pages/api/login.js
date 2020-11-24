
const bcrypt = require('bcrypt')
const JWT = require('../../util/jwt')

const User = require('../../db/user')

const { createError } = require('../../util/errors')

require('../../db/mongodb')

module.exports = async (req, res) => {
    if(req.method === 'POST'){
        const body = req.body
        const { email, password } = body

        if (!email || !password) {
            return res.status(409).send('Bad params. Email and password are required fields')
        }

        const user = await User.findOne({ email })
        if (!user){
            return res.status(400).send('Forbidden. Wrong login or password')
        }

        const isUser = await bcrypt.compare(password, user.password)
        if (!isUser){
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
