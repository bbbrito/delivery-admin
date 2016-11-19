'use strict';

let mongoose = require('../config/MongooseConfig');


let ProductSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  type: { type: String },
  price: { type: Number, required: true },
  gift: { type: Boolean }
});


module.exports = ProductSchema;
