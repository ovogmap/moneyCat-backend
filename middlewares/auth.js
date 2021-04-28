const { decodeToken } = require('../lib/jwt')

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers['access-token'] || req.query.token

    if (!accessToken) {
      throw new Error('cannot signin')
    }

    const decoded = await decodeToken(accessToken) // 잘못된 token이면 err 발생

    req.decoded = decoded
    next()
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    })
  }
}

module.exports = authMiddleware
