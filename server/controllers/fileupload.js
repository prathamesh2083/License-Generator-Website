const { express } = require("express");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
async function uploadFileToCloudinary(file, folder, quality) {
  let options = { folder };
  options.quality = quality;
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.file;
    console.log(file);
    // validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const currentType = file.name.split(".")[1].toLowerCase();
    if (supportedTypes.includes(currentType)) {
      const response = await uploadFileToCloudinary(file, "prathamesh");
      const addedfile = new File({
        name,
        tags,
        email,
        imageUrl: response.secure_url,
      });
      const rs = await addedfile
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: "file uploaded successfully",
          });
        })
        .catch(() => {
          res.status(200).json({
            success: false,
            message: "file uploaded fail",
          });
        });
    } else {
      return res.json({
        success: false,
        message: "file type not supported",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
