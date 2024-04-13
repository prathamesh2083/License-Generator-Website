const express=require("express");
const { register, login, logout, sendOTP,checkResult, getdata } = require("../controllers/UserControllers");
const { auth } = require("../middlewares/auth");
const router=express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/sendotp",sendOTP);
router.post("/getdata",auth,getdata);
router.post("/checkResult",auth,checkResult);


module.exports=router;