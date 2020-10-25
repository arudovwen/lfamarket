var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',//smtp.gmail.com  //in place of service use host...
  secure: true,//true
  port: 465,//465
  auth: {
    user: 'successahon@gmail.com',
    pass: 'arudovwen'
  }, tls: {
    rejectUnauthorized: false
  }
});

transporter.sendEMail = function (mailRequest) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailRequest, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve("The message was sent!");
      }
    });
  });
}

module.exports = transporter;