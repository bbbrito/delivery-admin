'use strict';

let db = require('../config/Mongo');

module.exports = db.collection('orders');
