const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const {authentication} = require("../middlewares/authentication")

router.post("/", UserController.register)
router.post("/login",UserController.login)
router.delete("/logout",authentication,UserController.logout)
router.get("/getInfo", authentication, UserController.getInfo)
router.get("/getUsersByName/:name",UserController.getUsersByName)
router.get("/id/:_id", UserController.getById)

module.exports = router