const Post = require("../models/Post")



const PostController = {
    async create(req,res){
        try {
            const newPost = await Post.create(req.body)
        res.status(201).send({message:"New post successfully created",newPost})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"There was a problem",error})
        } 
    }
}

module.exports = PostController