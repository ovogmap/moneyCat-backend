const { generateJWT } = require('../../../lib/jwt')
const User = require('../../../models/User')

exports.googleCheck = async (req, res) => {
  const { access_token: accessToken } = req.body
  try {
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
  const { access_token: accessToken } = req.body
  try {
    const profile = await User.getGoogleProfile(accessToken)

    const user = await User.findOne({
      provider: 'google',
      socialId: profile.socialId,
    })

    if (user) {
      console.log('있는 유저')
      const accessToken = await generateJWT(
        {
          subject: 'accessToken',
          email: user.email,
          name: user.name,
        },
        {
          expiresIn: '15d',
        },
      )
      res.send({
        success: true,
        user,
        access_token: accessToken,
      })
    } else {
      console.log('없는 유저')
      const user = new User()
      user.email = profile.email
      user.name = profile.displayName
      user.photoURL = profile.photo
      user.provider = 'google'
      user.socialId = profile.socialId
      user.save()

      const accessToken = await generateJWT(
        {
          subject: 'accessToken',
          email: user.email,
          name: user.name,
        },
        {
          expiresIn: '15d',
        },
      )

      res.send({
        success: true,
        user,
        access_token: accessToken,
      })
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}
