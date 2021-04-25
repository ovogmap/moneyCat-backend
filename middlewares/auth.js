// const jwt = require('jsonwebtoken')

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers['x-access-token'] || req.query.token
//     let decoded = null

//     if (!token) {
//       throw new Error('cannot signin')
//     }

//     decoded = jwt.verify(token, 'secret') // 잘못된 token이면 err 발생

//     req.decoded = decoded
//     next()
//   } catch (err) {
//     res.status(403).json({
//       success: false,
//       message: err.message,
//     })
//   }
// }

// module.exports = authMiddleware
