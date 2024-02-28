const mongoose=require("mongoose");

const {OtpMailSender}=require("../utils/mailsender");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:10
    }
});
async function sendVerificationEmail(email, otp) {
  try {
    console.log("in otp model ",otp,email);
    const mailResponse = await OtpMailSender(
      email,
      "License Generator  ",
      otp
    );
    console.log("otp sent successfully");
  } catch (err) {
    console.log("error at otp sending mail");
    console.log(err);
  }
}

OTPSchema.pre("save", async function () {
  await sendVerificationEmail(this.email, this.otp);
});
module.exports=mongoose.model("OTP",OTPSchema);