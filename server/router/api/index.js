'use strict';

let router = require('express').Router();

router.get('/', function(request, response, next) {
  response.send('PONG');
})
router.use('/customers', require('./customers'));
router.use('/freights', require('./freights'));
router.use('/orders', require('./orders'));
router.use('/postalcodes', require('./postalcodes'));
router.use('/products', require('./products'));
router.use('/referencePoints', require('./referencePoints'));
router.use('/reports', require('./reports'));

module.exports = router;
