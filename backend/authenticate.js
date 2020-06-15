const db = require('./dbcon'),
  bcrypt = require('bcrypt'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.query(
    `SELECT id, username FROM users WHERE id = '${id}'`,
    (err, results) => {
      if (err) {
        console.log('Error when selecting user on session deserialize', err);
        return cb(err);
      }

      cb(null, results.rows[0]);
    }
  );
});

exports.local = passport.use(
  new LocalStrategy((username, password, done) => {
    db.query(
      `SELECT id, username, password FROM users WHERE username = '${username}'`,
      (err, result, next) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (result.rows.length > 0) {
          const first = result.rows[0];
          bcrypt.compare(password, first.password, (err, res) => {
            if (res) {
              done(null, { id: first.id, username: first.username });
            } else {
              done(null, false);
            }
          });
        } else {
          done(null, false);
        }
      }
    );
  })
);
