const router = require("express").Router()
const ctrl = require("./history.ctrl")

router.post("/create", ctrl.create)
router.post("/delete", ctrl.delete)
router.post("/update", ctrl.update)

router.get("/get/:write", ctrl.get)
router.get("/get-detail/:id", ctrl.getDetail)

module.exports = router
