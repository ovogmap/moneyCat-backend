const jwt = require('jsonwebtoken')
const User = require('../../../models/User')

const generateJWT = (config, secret) => {
  const options = {
    // expiresIn: '7d',
    issuer: 'hyo-sun',
    subject: 'userInfo',
  }

  return jwt.sign(config, secret, options)
}

exports.register = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(400).json({ success: false, message: '실패!' })
  }
}
