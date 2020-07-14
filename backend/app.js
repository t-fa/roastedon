const express = require('express'),
  app = express(),
  connection = require('./dbcon.js'),
  cors = require('cors'),
  passport = require('passport'),
  shopsRouter = require('./routes/shopsRouter'),
  usersRouter = require('./routes/usersRouter.js');

app.use(cors()); // FIX THIS BEFORE DEPLOYING! USE A WHITE LIST!!!!!!!!!
app.use(passport.initialize());
app.use(passport.session());

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const port = 3001;

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
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    zipcode VARCHAR(255) NOT NULL,
    city VARCHAR (255) NOT NULL,
    state VARCHAR (255) NOT NULL,
    country VARCHAR (255) NOT NULL,
    phone VARCHAR (255),
    hours VARCHAR (255),
    image VARCHAR (255),
    PRIMARY KEY (id)
  )`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table shops created!');
  });
});

app.get('/createfavorites', (req, res) => {
  const sql = `
  CREATE TABLE favoriteShops (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    shopId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (shopId) REFERENCES shops (id)
  )`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table users created!');
  });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
