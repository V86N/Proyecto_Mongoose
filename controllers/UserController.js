const User = require("../models/User")
const jwt = require('jsonwebtoken')
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require ('bcryptjs');


const UserController = {
  async register(req, res) {
    try {
      if(!req.body.password) return res.status(400).send("Rellena tu contraseña")
      const password = bcrypt.hashSync(req.body.password,10)
      const user = await User.create({...req.body, password:password })
      res.status(201).send({ message: "Usuario registrado con exito", user });
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
        res.send({ message: 'Bienvenid@ ' + user.name, token, user });
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
        
    }
},

async getInfo(req, res) {
  try {
    const posts = await Post.find({ author: req.user._id })
    const user = await User.findById(req.user._id)
    res.status(200).send(user,posts,);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Usuario no encontrado",
    });
  }
},

async getUsersByTitle(req, res) { 
  try{
     const users = await User.find({
      $text:{
          $search: req.params.title,
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


async logout(req, res) {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { tokens: req.headers.authorization },
    });
    res.send({ message: "Desconectado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Hubo un problema al intentar desconectar al usuario",
    });
  }
},







};

module.exports = UserController;