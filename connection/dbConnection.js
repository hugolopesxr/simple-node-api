const mongoose = require("mongoose");
require('dotenv').config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.STRING_CONEXAO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology:true
     });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Connection failure!", err);
  }
};



// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Connection error:"));
// db.on("open", () => {
//   console.log("Connected with MongoDB");
// })

module.exports = {connect}
