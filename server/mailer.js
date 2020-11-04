var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.lfamarket.co.za',//smtp.gmail.com 
  secure: true,//true
  port: 465,//465
  auth: {
    user: 'payment@lfamarket.co.za',
    pass: 'lfamarket96'
  }
  , 
  tls: {
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