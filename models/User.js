const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please complete your name"],
      },
    
    email:{ 
        type: String,
    match: [/.+\@.+\..+/, "invalid email"],
    required: [true, "Please complet your email"],
  },
    password:  {
        type: String,
        required: [true, "Please complete your password"],
      },
    birthday: {
        type: Date,
        required: [true, "Please complete your birthday"],
      },
    tokens:[],
    
    wishList: [{ type: ObjectId, ref: 'Post' }],

}, { timestamps: true });

UserSchema.index({
  title: "text",
})

UserSchema.methods.toJSON = function() {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
}


const User = mongoose.model('User', UserSchema);

module.exports = User;