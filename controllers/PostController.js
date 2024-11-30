const Post = require("../models/Post")



const PostController = {
    async create(req,res){
        try {
            const newPost = await Post.create(req.body)
        res.status(201).send({message:"New post successfully created",newProduct})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"There was a problem",error})
        } 
    },


async delete(req, res) { //Preguntar si es correcto borrar un post por id
    try {
        const post = await Post.findByIdAndDelete(req.params._id)
        res.send({ message: 'Post deleted', post })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'there was a problem trying to remove the post'})
    }
},

async getPostsByTitle(req, res) { //Las publicaciones tienen título??
    try{
       const posts = await Post.find({
        $text:{
            $search: req.params.title,
        },
       }) 
       res.send(posts)

    }catch (error){
        console.log(error);
        }
    },

}

module.exports = PostController