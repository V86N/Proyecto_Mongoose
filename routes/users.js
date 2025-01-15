const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const {authentication} = require("../middlewares/authentication")

router.post("/", UserController.register)
router.post("/login",UserController.login)
router.delete("/logout",authentication,UserController.logout)
router.get("/getInfo", authentication, UserController.getInfo)
router.get("/getByTitle/:title", UserController.getUsersByTitle)
router.get('/id/:_id', UserController.getById)


module.exports = router