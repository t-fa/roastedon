const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  connection = require('./dbcon.js'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  port = 3000,
  session = require('express-session'),
  ;

app.use(bodyParser({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/users', (req, res) => {
  const context = {};
  connection.query('SELECT * FROM users', function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});

app.get('/create', (req, res) => {
  const sql = `
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Table created!');
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
