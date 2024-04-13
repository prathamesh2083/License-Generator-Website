const User = require("../models/User");
const bcrypt = require("bcrypt");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGen = require("otp-generator");
const Result=require("../models/Result");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function uploadFileToCloudinary(file, folder, quality) {
  let options = { folder };
  options.quality = quality;
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.sendOTP  =async (req,res)=>  {
  try {
    const email=req.body;
    let otp = otpGen.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    const payload = { email, otp };
    console.log("at send otp ",email,otp);
    const sendotp = await OTP.create(payload);
    return res.status(200).json({
      success: true,
      otp:otp,
      message: "otp sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "otp sent unsuccessfull",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, address, birthDate, phone, gender, password,otp } =
      req.body;
    const profileImage = req.files.profileImage;
    const already_exist = await User.findOne({ email: email });
   if (already_exist) {
     return res.status(500).json({
       success: false,
       data: null,
       message: "Email id already exist",
     });
   }
    if(phone.length!=10){
      res.status(500).json({
         success:false,
         message:"Invalid phone number"
      });
    }
    
    const resentotp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
    if(resentotp!=otp){
      res.status(500).json({
        success:false,
        message:"Enter Correct OTP"
      })
    };
    console.log(name, email, address, birthDate, phone, gender, password);
    console.log(profileImage);

    // validation
    const supportedTypes = ["jpg", "png", "jpeg"];

    const currentType = profileImage.name.split(".")[1].toLowerCase();
    if (true) {
      

      
      
      const response = await uploadFileToCloudinary(profileImage, "prathamesh");
      console.log(response.secure_url);
      let hashpass;
      try {
        hashpass = await bcrypt.hash(password, 10);
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "error in hasing password",
        });
      }
      let bdate = birthDate.toString();
      

      const newuser = new User({
        name,
        password: hashpass,
        email,
        address,
        birthDate: bdate,
        phone,
        gender,
        profileImage: response.secure_url,
      });
      // console.log(newuser);
      await newuser
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            data: newuser,
            message: "Registration Successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            data: err,
            message: "Registration Failed",
          });
        });
    } else {
      return res.status(500).json({
        success: false,
        message: "Select image of type jpg , jpeg or png",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    let finduser = await User.findOne({ email });

    if (finduser) {
      const hashedpass = finduser.password;

      const ismatch = bcrypt.compareSync(password, hashedpass);
      if (ismatch) {
        // create jwt token
        const payload = {
          name: finduser.name,
          email: finduser.email,
          id: finduser._id,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        finduser = finduser.toObject();
        finduser.token = token;
        finduser.password = undefined;

        const options = {
          expires: new Date(Date.now() + 24 * 3 * 60 * 60 * 10000),
          httpOnly: true,
        };
        req.user = finduser;
        console.log(req.user);

        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          finduser,
          message: "user login successfull",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "wrong password",
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "error in logout at route page",
    });
  }
};
exports.checkResult = async (req, res) => {
  try {
     const {correct,attempted,total,percentage,email}=req.body;
    
     
     const result=await Result.create({
      email:email,
      attempted,
      correct,
      status:percentage>=70?true:false
      
     });
     
    return res.status(200).json({
      success:true,
      data:result,
      message:"Test submitted successfully"
     })
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      
      message: "Test submitted failed",
    });
  }
};



exports.getdata = async (req, res) => {
  try {
     const email=req.user.email;
    console.log("called : ",email);
     
     const result=await User.findOne({
      email:email
      
     });
     console.log("result ",result);
    return res.status(200).json({
      success:true,
      data:result,
      message:"data fetched successfully"
     })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      
      message: "error in data fetching",
    });
  }
};



