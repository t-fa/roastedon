const authenticate = require('../authenticate'),
  bodyParser = require('body-parser'),
  connection = require('../dbcon.js'),
  express = require('express'),
  passport = require('passport');

const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(bodyParser.json());

usersRouter
  .route('/')
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

module.exports = usersRouter;
