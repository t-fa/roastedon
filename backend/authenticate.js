const bcrypt = require('bcrypt'),
  connection = require('./dbcon'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

exports.local = passport.use(
  new LocalStrategy((username, password, done) => {
    connection.query(
      `SELECT id, username, password FROM users WHERE username = '${username}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (result.length > 0) {
          const first = result[0];
          // bcrypt.compareSync(password, first.password, (err, res) => {
          // *****TEMPORARY SOLUTION UNTIL WE USE BCRYPT TO HASH
          if (password === first.password) {
            return done(null, { id: first.id, username: first.username });
            // if (err) {
            //   return done(err, false);
            // }
            // // password matches
            // if (res) {
            //   return done(null, { id: first.id, username: first.username });
            // }
            // // password doesn't match
            // else {
            //   return done(null, false);
            // }
          } else {
            // TEMPORARY - DELETE ONCE PROPER HASHING IS DONE
            return done(null, false);
          }
        }
        // no match
        else {
          return done(null, false);
        }
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  connection.query(
    `SELECT id, username FROM users WHERE id = '${id}'`,
    (err, results) => {
      if (err) {
        console.log('Error when selecting user on session deserialize', err);
        return done(err);
      }
      done(null, results[0]);
    }
  );
});

exports.verifyUser = passport.authenticate('local');
