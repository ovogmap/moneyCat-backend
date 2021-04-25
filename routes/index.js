const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'index',
  })
})

router.post('/', (req, res) => {
  res.status(200).json(req.body)
})

module.exports = router
