const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const bodyParser=require("body-parser");
const dbConnection = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
require("dotenv").config();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT;
dbConnection(); // DB connection
cloudinaryConnect();
app.use(cookieParser());
// app.use(bodyParser.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
const router = require("./routes/User");
app.use("/v1", router); // mounting /v1 to all routes
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("<h1>Running <h1>");
});
