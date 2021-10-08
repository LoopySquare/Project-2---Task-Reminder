const remindrExporter = require('../exporter/exportRemindr');
const remindrMailer = require('../mailer/sendRemindrEmail');

// This task runs the Remindr Exporter then the Remindr Mailer
const sendRemindr = async () => {
  const exporter = await remindrExporter();
  const mailer = await remindrMailer();
  return;
}

sendRemindr();