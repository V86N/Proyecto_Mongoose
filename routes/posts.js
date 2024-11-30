const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.post("/create", PostController.create)
router.delete("/id/:_id", PostController.delete)
router.get("/getByTitle/:title", PostController.getPostsByTitle)


module.exports = router