var express = require('express');
var router = express.Router();
var exchangeRates = require('../model/currencyDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET convert page */
router.get('/convert', function(req, res, next) {
  var query = req.query;


  //Get dollar amount and exchange rate
  var amount = req.query.amount;
  var curr_one = req.query.curr_one;
  var to_from = req.query.to_from;
  var curr_two = req.query.curr_two;
  var converted;

  exchangeRates(curr_one, curr_two, function(err, exchangeRates) {

    if (err) { next(err); }
    else {

      console.log('TODO do math here')
      console.log(exchangeRates)
      if (to_from == 'to') {
        converted = Math.round(((amount * exchangeRates[curr_one]) / exchangeRates[curr_two]) * 100) / 100;
      } else {
        converted = Math.round(((amount / exchangeRates[curr_one]) * exchangeRates[curr_two]) * 100) / 100;
      }

      res.render('results', {
        amount: amount,
        curr_one: curr_one,
        curr_two: curr_two,
        converted: converted
      });

    }
  });
})

router.get('/about', function(req, res, next) {
  res.render('about', {
    name: 'Mark VanGerpen',
    description: 'This is a web page built by Mark VanGerpen.'
  })
})

module.exports = router;
