const passport = require('passport'),
  db = require('./dbcon'),
  LocalStrategy = require('passport-local').Strategy;

exports.local = passport.use(
  new LocalStrategy(
    db.query(
      'SELECT id, username, password FROM users WHERE username = '[username],
      (err, result, next) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (result.rows.length > 0) {
          const first = result.rows[0];
        }
      }
    )
  )
);
