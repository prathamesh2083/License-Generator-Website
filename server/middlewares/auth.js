const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req, res,next) => {
  try {
   
     const token =
       req.cookies.token || req.header("Authorisation").replace("Bearer ", "");
    if (!token ) {
      return res.status(500).json({
        success: false,
        message: "Token not found",
      });
    }
    // decode the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
