'use strict';

let mongoose = require('../config/MongooseConfig');


let FreightSchema = mongoose.Schema({
  addressLocality: { type: String, trim: true, required: true },
  price: { type: Number, required: true }
});


module.exports = FreightSchema;
