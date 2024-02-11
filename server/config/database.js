const mongoose = require("mongoose");

require("dotenv").config();
const DB_URL = process.env.DB_URL;
function dbConnection() {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("Error in DB connection");
      console.log(err);
    });
}
module.exports = dbConnection;
