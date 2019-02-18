'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/CustomerSchema');

let CourierRepository  = mongoose.model('Courier', schema);

module.exports = CourierRepository;
