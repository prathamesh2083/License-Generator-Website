const nodemailer = require("nodemailer");

require("dotenv").config();
exports.RegistrationMailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "License Generator", // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      text: `${body}`, // plain text body
      html: "<h2>Registration successfull !! </h2>  <h2>Give a simple test and get License </h2> <h3>stay safe,stay healthy!!</h3>", // html body
    });
  } catch (err) {
    console.log(err);
  }
};
 exports.OtpMailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "License Generator", // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      text: `${body}`, // plain text body
      html: `<h3>Your otp for Registration is : <h1>${body}<h1> <h3>  `, // html body
    });
  } catch (err) {
    console.log(err);
  }
};

