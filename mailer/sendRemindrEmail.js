const path = require('path');
const nodemailer = require('nodemailer');
const { readFromFile } = require('../utils/fsUtils');

require('dotenv').config({path: "../.env"});

const remindrMailer = async (remindrsObject) => {

  // const userData = await readFromFile(path.join(__dirname, '../exporter/jsonExport/remindrExport.json'));
  
  // const parsedData = await JSON.parse(userData);

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
    
    let info = await transporter.sendMail({
      from: `"Remindr App" <remindr.notification@gmail.com>`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: `${event}`, // Subject line
      text: "Subject Text", // plain text body
      html: `<b>${message}</b>`, // html body
    });
    }
  }

  return;

}

module.exports = remindrMailer;
