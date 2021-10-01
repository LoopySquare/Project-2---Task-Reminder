const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// const api = require ('./routes/index.js');
const mysql = require('mysql2');

const sequelize = require('./config/connection');
const { request } = require('http');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const PORT = process.env.PORT || 3001;
const app = express();
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
// connect to the database
const db = mysql.createConnection(
  {
    host:'localhost',
    user:'root',
    password:'',
    database: 'user_db',
  },
);


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
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',function(req,res){
  res.render('index');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
