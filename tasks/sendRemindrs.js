const remindrExporter = require('../exporter/exportRemindr');
const remindrMailer = require('../mailer/sendRemindrEmail');

// This task runs the Remindr Exporter then the Remindr Mailer
const sendRemindr = async () => {
  const remindrData = await remindrExporter();

  const mailer = await remindrMailer(remindrData);
  return;
}

sendRemindr();

module.exports = sendRemindr;