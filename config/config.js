const mongoose = require("mongoose");
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI




const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Data base successfully connected");
  } catch (error) {
    console.error(error);
    throw new Error("There was a problem trying to connect with data base");
  }
};

module.exports = {
  dbConnection,
};
