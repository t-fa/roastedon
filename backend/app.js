const express = require('express');
const app = express();
const port = 3000;
const connection = require('dbcon.js');

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/search', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
