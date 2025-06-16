const express = require("express")
const authController = require("../Controllers/authController")
const router = express.Router()


router.route("/signup").get(authController.signUp)

router.route("/login").get(authController.login)

module.exports = router