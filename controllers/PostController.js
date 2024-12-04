const  Post  = require("../models/Post")
const User = require("../models/User")


const PostController = {
    async create(req,res){
        try {
            req.body.userId = req.user._id
            const newPost = await Post.create(req.body)
        res.status(201).send({message:"New post successfully created",newPost})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"There was a problem",error})
        } 
    },
    async update(req, res) {
        try {
            req.body.userId = req.user._id
          const post = await Post.findByIdAndUpdate(
            req.params._id, //id del post que quiero actualizar
            req.body,// el objeto con los datos a actualizar
            { new: true }// para que el post de la respuesta sea el actualizado
        )
          res.send({ message: "post successfully updated", post });
        } catch (error) {
          console.error(error);
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

async getAll(req, res) {
    try {
       const {page=1,limit=10} = req.query
       const posts = await Post.find()
       .populate("reviews.userId")
       .limit(limit)
       .skip((page - 1) * limit);
       res.send(posts)
    } catch (error) {
        console.error(error);
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
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },

    async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { reviews: { comment:req.body.comment, userId: req.user._id } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your review" });
        }
      }, 
      async like(req, res) {
        try {
          
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { likes: req.user._id } },
            { new: true }
          );
          
          await User.findByIdAndUpdate(
            req.user._id,
            { $push: { wishList: req.params._id } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your like" });
        }
      },

      async unLike(req, res) {
        try {
          
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $pull: { unlikes: req.user._id } },
            { new: true }
          );
          
          await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { wishList: req.params._id } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your like" });
        }
      },

}

module.exports = PostController