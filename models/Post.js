const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your name"],
      },
    body:{
        type: String,
        required: [true, "Please complete the body"],
      }, 
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    reviews: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String,
        }],
    tokens: [], 

    likes: [{ type: ObjectId }],
}, 

{ timestamps: true });

PostSchema.index({
    title: "text",
  })

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;