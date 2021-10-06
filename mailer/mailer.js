const nodemailer = require('nodemailer');
require('dotenv').config();
const { readFromFile } = require('../utils/fsUtils');

const main = async () => {

  const userData = await readFromFile('../exporter/jsonExport/remindrExport.json')
  
  const parsedData = await JSON.parse(userData)
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
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

  for (let i = 0; i < parsedData.length; i++) {
    const event = parsedData[i].event_name;
    const toEmail = parsedData[i].user.email;
    const message = parsedData[i].content;

    let info = await transporter.sendMail({
      from: `"Remindr App" <remindr.notification@gmail.com>`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: `${event}`, // Subject line
      text: "Subject Text", // plain text body
      html: `<b>${message}</b>`, // html body
    });

  }
}

main()
