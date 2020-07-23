const authenticate = require('../authenticate'),
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  connection = require('../dbcon.js'),
  express = require('express'),
  passport = require('passport');

const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(bodyParser.json());

usersRouter.route('/:userId').get((req, res, next) => {
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
  .post((req, res, next) => {
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
  .put((req, res, next) => {
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
  .post((req, res, next) => {
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
  .put((req, res, next) => {
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
  .delete((req, res, next) => {
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
