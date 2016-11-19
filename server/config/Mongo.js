'use strict';

let mongojs  = require('mongojs'),
    debug     = require('debug')('delivery-admin:config:mongo'),
    config    = require('config');

function _connection(vars) {
  let username  = vars.MONGO_USERNAME || config.get('mongo.username'),
      password  = vars.MONGO_PASSWORD || config.get('mongo.password'),
      host      = vars.MONGO_HOST     || config.get('mongo.host'),
      port      = vars.MONGO_PORT     || config.get('mongo.port'),
      database  = vars.MONGO_DATABASE || config.get('mongo.database'),

      auth = username ? /* istanbul ignore next */ username + ':' + password + '@' : '';

  return 'mongodb://' + auth + host + ':' + port + '/' + database;
}


let db = mongojs(_connection(process.env));
/* istanbul ignore next */
db.on('error', function(err) {
  debug(err);
});

db.once('open', function (callback) {
  debug('connected to mongodb');
});

module.exports = db;
