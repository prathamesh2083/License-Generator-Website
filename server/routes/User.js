const express=require("express");
const { register, login, logout, sendOTP } = require("../controllers/UserControllers");
const { auth } = require("../middlewares/auth");
const router=express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/logout",auth,logout);
router.post("/sendotp",sendOTP);
module.exports=router;