const jwt = require('jsonwebtoken')

const { SECRET } = process.env

exports.generateJWT = async (config, options) => {
  if (!SECRET) {
    throw new Error('SECRET Environment Variable is not set')
  }

  const promise = new Promise((resolve, reject) => {
    jwt.sign(config, SECRET, options, (error, token) => {
      if (error) {
        reject(error)
        return
      }
      if (!token) {
        reject(new Error('Failed to generate token'))
      }
      resolve(token)
    })
  })

  return promise
  // const options = {
  //   expiresIn: '15d',
  // }

  // return jwt.sign(config, secret, options)
}

exports.decodeToken = async (token) => {
  if (!SECRET) {
    throw new Error('SECRET Environment Variable is not set')
  }

  const promise = new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        reject(error)
        return
      }
      if (!decoded) {
        reject(new Error('Token is empty'))
        return
      }
      resolve(decoded)
    })
  })

  return promise
}
