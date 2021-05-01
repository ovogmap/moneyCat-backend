const express = require("express");
const router = express.Router();
const auth = require("./auth");
const history = require("./history");

router.use("/auth", auth);
router.use("/history", history);

module.exports = router;
