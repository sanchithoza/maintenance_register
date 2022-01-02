const nodemailer = require('nodemailer');
const sendmail = (to,subject,message,done)=>{
let transporter = nodemailer.createTransport({
  host: "request-ssa.xyz",
  port: 587,
  secure: false, 
    auth: {
      user: "maintenance@request-ssa.xyz",
      pass: "maintenance@ssa",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "maintenance@request-ssa.xyz",
    to: to,
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      return console.log(error);
      done();
    }
    console.log("email sent succcessfully");
    done();
  });
}
module.exports = sendmail;