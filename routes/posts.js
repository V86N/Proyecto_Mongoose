const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication, isAuthor } = require("../middlewares/authentication")
const router = express.Router()

router.post("/create", authentication, PostController.create)
router.delete("/id/:_id", authentication, isAuthor, PostController.delete)
router.get("/getByTitle/:title", PostController.getPostsByTitle)
router.get("/getAll", PostController.getAll)
router.put("/id/:_id", authentication, isAuthor, PostController.update)
router.get('/id/:_id', PostController.getById)

module.exports = router