const router = require('express').Router()
const ctrl = require('./auth.ctrl.js')

router.post('/register', ctrl.register)

module.exports = router
