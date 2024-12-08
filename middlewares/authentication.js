const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const Post = require("../models/Post.js")

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'You are not authorised' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a token problem' })
    }
}

const isAuthor = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'This post its not yours' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem' })
    }
}
module.exports = { authentication, isAuthor }