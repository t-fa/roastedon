const authenticate = require('../authenticate'),
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  connection = require('../dbcon.js'),
  express = require('express');

const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(bodyParser.json());

usersRouter
  .route('/login')
  .get((req, res, next) => {
    connection.query(
      'SELECT id, username, password FROM users',
      (err, rows) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
      }
    );
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.send('ok!');
  });

usersRouter.route('/register').post((req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const saltRounds = 10;
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      connection.query(
        `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}')`,
        (err, results) => {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(results);
          }
        }
      );
    })
    .catch((err) => next(err));
});

usersRouter.route('/logout').get((req, res) => {});

module.exports = usersRouter;
