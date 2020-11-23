const bcrypt = require('bcrypt')

const hashPassword = (pass) => {
  return bcrypt.hash(pass, 10)


module.exports = {
  hashPassword
}
