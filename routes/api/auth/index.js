const router = require('express').Router()
const authMiddleware = require('../../../middlewares/auth')
const ctrl = require('./auth.ctrl.js')

router.post('/google/check', ctrl.googleCheck)
router.post('/google/login', ctrl.googleLogin)

router.use('/check-and-refresh', authMiddleware)
router.get('/check-and-refresh', ctrl.checkAndRefresh)

module.exports = router
