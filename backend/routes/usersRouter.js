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

usersRouter.route('/logout').get((req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 401;
    return next(err);
  }
});

usersRouter.route('/favorites/:userId').get((req, res, next) => {
  connection.query(
    `SELECT id, userId, shopId FROM favoriteShops WHERE userId = ${req.params.userId}`,
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
});

usersRouter
  .route('/favorites/:userId/:shopId')
  .get((req, res, next) => {
    connection.query(
      `SELECT id, userId, shopId FROM favoriteShops WHERE userId = '${req.params.userId}' AND shopId = '${req.params.shopId}'`,
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
  .post((req, res, next) => {
    connection.query(
      `INSERT INTO favoriteShops (userId, shopId) VALUES ('${req.body.userId}', '${req.body.shopId}')`,
      (err, rows) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(rows);
        }
      }
    );
  })
  .delete((req, res, next) => {
    connection.query(
      `DELETE FROM favoriteShops WHERE userId = '${req.params.userId}' AND shopId = '${req.params.shopId}'`,
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json('Removed from favorites!');
        }
      }
    );
  });

module.exports = usersRouter;
