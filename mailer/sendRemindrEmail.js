const nodemailer = require('nodemailer');
const notificationEmailTemplate = require("./notifcationEmailTemplate")
require('dotenv').config({path: "../.env"});

const remindrMailer = async (remindrsObject) => {


  // Checks if any Data was exported, if object is empty, end
  if(remindrsObject[0] === undefined){
    return;

  } else {  

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      },
    });
    
    for (let i = 0; i < remindrsObject.length; i++) {

    const event = remindrsObject[i].event_name;
    const toEmail = remindrsObject[i].user.email;
    const message = remindrsObject[i].content;
    const firstName = remindrsObject[i].user.first_name;

    const messageHTML = notificationEmailTemplate(firstName,message)

    let info = await transporter.sendMail({
      from: `"Remindr App" <remindr.notification@gmail.com>`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: `${event}`, // Subject line
      text: "Subject Text", // plain text body
      html: `${messageHTML}`
    });
    }
  }

  return;

}

module.exports = remindrMailer;
