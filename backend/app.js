const usersRouter = require('./routes/usersRouter.js');

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  connection = require('./dbcon.js'),
  cors = require('cors'),
  passport = require('passport'),
  shopsRouter = require('./routes/shopsRouter');

app.use(cors()); // FIX THIS BEFORE DEPLOYING! USE A WHITE LIST!!!!!!!!!
app.use(passport.initialize());
app.use(passport.session());

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const port = 3001;
app.set('port', port);

/*
 * Routes
 */
app.use('/shops', shopsRouter);
app.use('/users', usersRouter);

app.get('/createusers', (req, res) => {
  const sql = `
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`;
  connection.query(sql, (err, result) => {
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
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table shops created!');
  });
});

app.listen(() =>
  console.log(`Example app listening at http://localhost:${app.get('port')}`)
);
