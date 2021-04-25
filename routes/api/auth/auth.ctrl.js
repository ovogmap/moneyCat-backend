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

exports.googleCheck = async (req, res) => {
  try {
    const { access_token: accessToken } = req.body
    const profile = await User.getGoogleProfile(accessToken)

    const socialAccount = await User.findOne({
      provider: 'google',
      socialId: profile.socialId,
    })

    res.send({
      exists: !!socialAccount,
    })
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    })
  }
}

exports.googleLogin = async (req, res) => {
  try {
    const { access_token: accessToken } = req.body
    const profile = await User.getGoogleProfile(accessToken)
    res.send(profile)
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    })
  }
}
