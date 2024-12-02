const User = require("../models/User")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys.js')
const bcrypt = require ('bcryptjs');


const UserController = {
  async register(req, res) {
    try {
      const password = bcrypt.hashSync(req.body.password,10)
      const user = await User.create({...req.body, password:password })
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
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
        res.send({ message: 'Bienvenid@ ' + user.name, token });
    } catch (error) {
        console.error(error);
    }
},


};

module.exports = UserController;