const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const cron = require('node-cron');
const remindrExporter = require('./exporter/exportRemindr');
const sleep = require('./utils/sleep');
const sendRemindrs = require('./mailer/mailer');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

cron.schedule('*/15 * * * *', async () => {
  console.log('Starting Remindr Send');
  // Export Data from DB to JSON
  await remindrExporter();
  // sleep for 30 seconds
  await sleep(30000);
  // Send Remindrs
  console.log('Sending Emails');
  await sendRemindrs();
  // sleep for 30 seconds
  await sleep(30000);
  console.log('Ending Remindr Send');

});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
