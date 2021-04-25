const router = require('express').Router()
const ctrl = require('./auth.ctrl.js')

router.post('/google/check', ctrl.googleCheck)
router.post('/google/login', ctrl.googleLogin)

module.exports = router
