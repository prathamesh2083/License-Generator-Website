const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");
const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    trim: true,
  },
  password: {
    type: "String",
    required: true,
    trim: true,
  },
  birthDate: {
    type: "String",
   
  },
  email: {
    type: "String",
    required: true,
    trim: true,
  },
  address: {
    type: "String",
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  gender: {
    type: "String",
    required: true,
    trim: true,
  },
  age: {
    type: Number,
  },
  profileImage: {
    type: "String",
    required: true,
  },
  licenseImage: {
    type: "String",
  },
});
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Welcome to License Generator",
      otp
    );
    console.log("Email sent successfully");
  } catch (err) {
    console.log("error at sending mail");
    console.log(err);
  }
}
userSchema.post("save", async function () {
  await sendVerificationEmail(this.email, this.otp);
  
});
module.exports = mongoose.model("User", userSchema);
