const authenticate = require('../authenticate'),
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  connection = require('../dbcon.js'),
  express = require('express'),
  passport = require('passport');

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
  .post(passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({ id: req.user.id });
    console.log(token);
    console.log(req.user);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      token: token,
      id: req.user.id,
      status: 'Success!',
    });
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

usersRouter.route('/logout').get((req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 401;
    return next(err);
  }
});

module.exports = usersRouter;
