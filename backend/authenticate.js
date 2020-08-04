const bcrypt = require('bcrypt'),
  config = require('./config'),
  connection = require('./dbcon'),
  cookieParser = require('cookie-parser'),
  ExtractJwt = require('passport-jwt').ExtractJwt,
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  JwtStrategy = require('passport-jwt').Strategy,
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
          bcrypt.compare(password, first.password, (err, res) => {
            if (err) {
              return done(err, false);
            }
            // password matches
            if (res) {
              return done(null, { id: first.id, username: first.username });
            }
            // password doesn't match
            else {
              return done(null, false);
            }
          });
          // no match
        } else {
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

exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, { expiresIn: '7 days' });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT payload:', jwt_payload);
    connection.query(
      `SELECT id FROM users WHERE id = '${jwt_payload.id}'`,
      (err, user) => {
        if (err) {
          console.log(err);
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
  })
);

exports.verifyUser = passport.authenticate('jwt', { session: false });
