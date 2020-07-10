const bodyParser = require('body-parser'),
  connection = require('../dbcon.js'),
  express = require('express');

const shopsRouter = express.Router();
shopsRouter.use(bodyParser.urlencoded({ extended: true }));
shopsRouter.use(bodyParser.json());

shopsRouter
  .route('/')
  .get((req, res) => {
    const zipcode = req.query.zipcode;
    connection.query(
      `SELECT id, name, address1, address2, zipcode, city, state, phone, hours, image
       FROM shops WHERE zipcode = '${zipcode}'`,
      (err, rows, next) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.json(rows);
        }
      }
    );
  })
  .post((req, res, next) => {
    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const zipcode = req.body.zipcode;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    connection.query(
      `INSERT INTO shops (name, address1, address2, zipcode, city, state, country) 
      VALUES ('${name}', '${address1}', '${address2}', '${zipcode}', '${city}', 
      '${state}', '${country}')`,
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
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /shops');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /shops');
  });

shopsRouter
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id;
    connection.query(
      `SELECT id, name, address1, address2, zipcode, city, state, phone, hours, image
    FROM shops WHERE id = '${id}'`,
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
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /shops/${req.params.id}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /shops/${req.params.id}`);
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /shops/${req.params.id}`);
  });

module.exports = shopsRouter;
