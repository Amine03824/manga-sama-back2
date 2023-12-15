const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.MAIL_ACCOUNT_ADDRESS,
    pass: process.env.MAIL_ACCOUNT_PASSWORD
  }
});

// Log user and password for debugging purposes
console.log("Mail Account Address:", process.env.MAIL_ACCOUNT_ADDRESS);
console.log("Mail Account Password:", process.env.MAIL_ACCOUNT_PASSWORD);

module.exports = transporter;
