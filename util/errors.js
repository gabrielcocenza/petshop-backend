/*
  I created this module to be easier show to front-end if something goes wrong.
  Basically i surrounded all fetches with a try/catch, if some data is missing, or everyhing goes wrong we can create a `throw createError()`
  We need to improve and track MONGO errors
*/
const { send } = require('micro')

// A simple Error to indicate that we created it, is not an exception by Mong or syntax error
class CommonError extends Error {
}

const errorHandler = async (req, res, err) => {
  let dataToSend = []
  const setDataToSend = (...params) => { dataToSend = params }

  // if is our error
  if (err instanceof CommonError) {
    setDataToSend(res, err.statusCode, err.json)
  } else {
    setDataToSend(res, 500, 'Internal Server Error')
  }

  return send(...dataToSend)
}

// create the exception
const createError = (code, message, errorCode = undefined, data) => {
  const newErr = new CommonError(message)
  const errorJson = {
    code: errorCode,
    message,
    data
  }

  newErr.statusCode = code
  newErr.json = { error: errorJson, err: errorJson }

  return newErr
}

// surround the fetches
const handleErrors = fn => async (req, res) => {
  try {
    const response = await fn(req, res)
    send(res, 200, response)
  } catch (err) {
    console.error(err.stack)
    errorHandler(req, res, err)
  }
}

module.exports = {
  handleErrors,
  createError
}
