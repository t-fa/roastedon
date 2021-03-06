const authenticate = require('../authenticate'),
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  config = require('../config'),
  connection = require('../dbcon.js'),
  cookieParser = require('cookie-parser'),
  email = require('../email'),
  express = require('express'),
  jwt = require('jsonwebtoken'),
  passport = require('passport');

const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(bodyParser.json());
usersRouter.use(cookieParser(config.secretKey));

usersRouter.route('/profile/:userId').get((req, res, next) => {
  connection.query(
    `SELECT id, username FROM users WHERE id = '${req.params.userId}'`,
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

usersRouter.route('/checkemail').post((req, res, next) => {
  connection.query(
    `SELECT email FROM users WHERE email = '${req.body.email}'`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      if (rows[0]) {
        res.json(false);
      } else {
        res.json(true);
      }
    }
  );
});

usersRouter.route('/checkusername').post((req, res, next) => {
  connection.query(
    `SELECT username FROM users WHERE username = '${req.body.username}'`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      if (rows[0]) {
        res.json(false);
      } else {
        res.json(true);
      }
    }
  );
});

usersRouter
  .route('/login')
  .get((req, res, next) => {
    if (req.signedCookies) {
      res.send(req.signedCookies);
    } else {
      res.send('No cookie');
    }
  })
  .post(passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({ id: req.user.id });
    res.cookie('token', token, { httpOnly: true, signed: true });
    res.cookie('id', req.user.id, { httpOnly: true, signed: true });
    res.cookie('verified', req.user.verified, { httpOnly: true, signed: true });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ token: token, id: req.user.id, verified: req.user.verified });
  });

usersRouter
  .route('/reset/:userId')
  .get(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `SELECT id, email, password, verified FROM users WHERE id = ${req.params.userId}`,
      (err, rows) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        let token = jwt.sign({ id: rows[0].id }, rows[0].password, {
          expiresIn: '30 minutes',
        });
        email.resetPass(rows[0].email, rows[0].id, token);
        res.json('Please check your email for a password reset link.');
      }
    );
  });

usersRouter
  .route('/register')
  .post((req, res, next) => {
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
              const token = authenticate.getToken({ id: results.insertId });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.cookie('token', token, { httpOnly: true, signed: true });
              res.cookie('verified', 0, {
                httpOnly: true,
                signed: true,
              });
              res.cookie('id', results.insertId, {
                httpOnly: true,
                signed: true,
              });
              res.json(results);
            }
          }
        );
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    // VERIFY TOKEN
    const userId = req.body.id;
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        connection.query(
          `UPDATE users SET password = '${hash}' WHERE id = '${userId}'`,
          (err) => {
            if (err) {
              console.log(err);
              return next(err);
            } else {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json('You have successfully updated your password.');
            }
          }
        );
      })
      .catch((err) => next(err));
  });

usersRouter
  .route('/verify/:userId')
  .get(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `SELECT id, email, password, verified FROM users WHERE id = ${req.params.userId}`,
      (err, rows) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (rows[0].verified === 1) {
          res.cookie('verified', 1, { httpOnly: true, signed: true });
          res.json('You have already verified your email.');
        } else {
          let token = jwt.sign({ id: rows[0].id }, rows[0].password, {
            expiresIn: '24h',
          });
          email.verifyAccount(rows[0].email, rows[0].id, token);
          res.json('Please check your email for a verification link.');
        }
      }
    );
  });

usersRouter
  .route('/verify/:userId/:jwt')
  .put(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `SELECT password FROM users WHERE id = ${req.params.userId}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        jwt.verify(req.params.jwt, result[0].password, (err) => {
          if (err) {
            res.json(err);
          } else {
            connection.query(
              `UPDATE users SET verified = 1 WHERE id = ${req.params.userId}`,
              (err) => {
                if (err) {
                  console.log(err);
                  return next(err);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.cookie('verified', 1, { httpOnly: true, signed: true });
                res.json('You have successfully verified your email. Thanks!');
              }
            );
          }
        });
      }
    );
  });

usersRouter.route('/logout').get((req, res, next) => {
  if (req.signedCookies) {
    res.clearCookie('token');
    res.clearCookie('id');
    res.clearCookie('verified');
    res.status(200);
    res.json('You have logged out successfully!');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 401;
    return next(err);
  }
});

usersRouter
  .route('/favorites/:userId')
  .get(authenticate.verifyUser, (req, res, next) => {
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
  .post(authenticate.verifyUser, (req, res, next) => {
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
  .delete(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `DELETE FROM favoriteShops WHERE userId = '${req.params.userId}' AND shopId = '${req.params.shopId}'`,
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.send('Removed from favorites!');
        }
      }
    );
  });

usersRouter.route('/ratings/:shopId').get((req, res, next) => {
  connection.query(
    `SELECT AVG(rating) FROM shopRating WHERE shopId = '${req.params.shopId}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
      }
    }
  );
});

usersRouter
  .route('/ratings/:shopId/:userId')
  .get((req, res, next) => {
    connection.query(
      `SELECT rating FROM shopRating WHERE userId = '${req.params.userId}' AND shopId = '${req.params.shopId}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `INSERT INTO shopRating (userId, shopId, rating) VALUES ('${req.params.userId}', '${req.params.shopId}', '${req.body.rating}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `UPDATE shopRating SET rating = '${req.body.rating}' WHERE userId = '${req.params.userId}' AND shopId = '${req.params.shopId}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  });

usersRouter
  .route('/comments/:shopId/')
  .get((req, res, next) => {
    connection.query(
      `SELECT id, userId, shopId, comment FROM shopComments WHERE shopId = '${req.params.shopId}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `INSERT INTO shopComments (userId, shopId, comment) VALUES ('${req.body.userId}', '${req.params.shopId}', '${req.body.comment}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  });

usersRouter
  .route('/comments/:commentId')
  .put(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `UPDATE shopComments SET comment = '${req.body.commentEdit}' WHERE id = '${req.body.id}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    connection.query(
      `DELETE FROM shopComments WHERE id = '${req.params.commentId}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        }
      }
    );
  });

usersRouter.route('/comments/:userId').get((req, res, next) => {
  connection.query(
    `SELECT comment FROM shopComments WHERE userId = '${req.params.userId}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
      }
    }
  );
});

module.exports = usersRouter;
