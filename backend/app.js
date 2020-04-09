const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  connection = require('./dbcon.js'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  passport = require('passport'),
  port = 3001,
  session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); // FIX THIS BEFORE DEPLOYING! USE A WHITE LIST!!!!!!!!!

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

app.get('/shops', (req, res) => {
  const context = {};
  connection.query('SELECT * FROM shops', function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});

app.post('/shops', (req, res) => {
  const context = {};
  const zip = req.body.zipcode;
  connection.query(`SELECT * FROM shops WHERE zipcode = ${zip}`, function (
    err,
    rows
  ) {
    if (err) {
      console.log(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});

app.get('/createusers', (req, res) => {
  const sql = `
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Table users created!');
  });
});

app.get('/createcoffee', (req, res) => {
  const sql = `
  CREATE TABLE shops (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    zipcode VARCHAR(255) NOT NULL,
    city VARCHAR (255) NOT NULL,
    state VARCHAR (255) NOT NULL,
    phone VARCHAR (255),
    hours VARCHAR (255),
    image VARCHAR (255)
  )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Table shops created!');
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
