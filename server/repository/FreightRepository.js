'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/FreightSchema');

let FreightRepository  = mongoose.model('Freight', schema);

module.exports = FreightRepository;
