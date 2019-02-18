'use strict';

let mongoose = require('../config/MongooseConfig');


let CourierSchema = mongoose.Schema({
  givenName: { type: String, trim: true, required: true }
});


module.exports = CourierSchema;
