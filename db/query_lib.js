const mysql = require('mysql2');
require('dotenv').config();

// Creating our connection string function
const db = mysql.createConnection({
  host: 'localhost',
  // user: process.env.DB_USER,
  user: 'root',
  // password: process.env.DB_PASS,
  password: 'BigMiike60!',
  // database: process.env.DB_NAME
  database: 'user_db'
});

class DBQuery {
  constructor(db){
    this.db = db;
  }

  exportMessages(data) {
    const values = [data.am_pm]
    return this.db
      .promise()
      .query(
        `SELECT u.first_name,
               u.last_name,
               u.email,
               m.event_name,
               m.content,
               m.send_time
        FROM message m
        INNER JOIN user u
        ON m.user_id = u.id
        WHERE m.send_date = CURRENT_DATE
        AND m.am_pm = ?`,
        values
        );
  }

}

module.exports = new DBQuery(db);