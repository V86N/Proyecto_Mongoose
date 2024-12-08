const User = require("../models/User")
//const Post = require("../models/Post")
const jwt = require('jsonwebtoken')
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require ('bcryptjs');


const UserController = {
  async register(req, res) {
    try {
      if(!req.body.password) return res.status(400).send("Password must be filled")
      const password = bcrypt.hashSync(req.body.password,10)
      const user = await User.create({...req.body, password:password })
      res.status(201).send({ message: "User correctly registered", user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  },
  
  async login(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email,
        })
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        if (user.tokens.length > 4) user.tokens.shift();
        user.tokens.push(token);
        await user.save();
        res.send({ message: 'Welcome ' + user.name, token });
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
        
    }
},

async getInfo(req, res) {
  try {
    //const posts = await Post.find(req.user._id )
    const user = await User.findById(req.user._id)
    //.populate("posts.userId")
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "User not found",
    });
  }
},

async logout(req, res) {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { tokens: req.headers.authorization },
    });
    res.send({ message: "Logged out correctly" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "There was a problem trying to logout user",
    });
  }
},

async getUsersByName(req, res) {
  try{
     const users = await User.find({
      $text:{
          $search: req.params.name,
      },
     })
     res.send(users)
  }catch (error){
      console.log(error);
      }
  },

  async getById(req, res) {
    try {
        const user = await User.findById(req.params._id)
        res.send(user)
    } catch (error) {
        console.error(error);
    }
},

};

module.exports = UserController;