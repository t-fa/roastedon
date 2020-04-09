const express = require('express'),
  app = express(),
  port = 3000,
  connection = require('./dbcon.js'),
  bodyParser = require('body-parser');

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/', (req, res) => {
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
