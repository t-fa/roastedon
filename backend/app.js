const express = require('express'),
  app = express(),
  connection = require('./dbcon.js'),
  cors = require('cors'),
  passport = require('passport'),
  shopsRouter = require('./routes/shopsRouter'),
  usersRouter = require('./routes/usersRouter.js');

app.use(cors()); // FIX THIS BEFORE DEPLOYING! USE A WHITE LIST!!!!!!!!!
app.use(passport.initialize());
app.use(passport.session());

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const port = 3001;

/*
 * Routes
 */
app.use('/shops', shopsRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
