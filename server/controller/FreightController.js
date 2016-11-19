'use strict';

let bluebird = require('bluebird');
let debug = require('debug')('delivery-admin:controller:Freight');
let repository = require('../repository/FreightRepository');
const PER_PAGE = 10;

let FreightController = {
  list: function(request, response, next) {
    let query = {};
    let attr = request.query.attr;
    let page = parseInt(request.query.page || 1, 10);
    let size = parseInt(request.query.size || PER_PAGE, 10);

    if (request.query.q) {
      let search = new RegExp(request.query.q, 'i');
      query = {
        $or: [
          { name: search }
        ]
      };
    }
    debug('query', query);

    bluebird.all([
      repository.find(query).limit(size).skip(size * (page - 1)),
      repository.count(query)
    ])
    .then(function(results) {
      let result = results[0];
      let count = results[1];
      let data = {
        items: result,
        _metadata: {
          size: (result || []).length,
          total: count,
          perPage: size,
          page: page
        }
      };
      if (attr === 'items') {
        data = data.items;
      }

      response.json(data);
    })
    .catch(next);
  },
  search: function(request, response, next) {
    let locality = request.query.locality;

    if (!locality) {
      let err = new Error('locality param not defined');
      err.status = 400;
      return next(err);
    }
    let query = locality.split(',').map(i => {
      return { addressLocality: i }
    });

    repository.findOne({ $or: query })
    .then(function(result) {
      if (!result) {
        let err = new Error('freight not found');
        err.status = 404;
        throw err;
      }
      return result;
    })
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
  },
  byId: function(request, response, next) {
    let _id = request.params._id;
    repository.findOne({ _id: _id })
    .then(function(result) {
      if (!result) {
        let err = new Error('freight not found');
        err.status = 404;
        throw err;
      }
      return result;
    })
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
  },
  create: function(request, response, next) {
    let freight = new repository(request.body);
    freight.save()
      .then(function(result) {
        response.status(201).json(result);
      })
      .catch(function(err) {
        err.status = 422;
        next(err);
      });
  },
  update: function(request, response, next) {
    let _id = request.params._id;
    repository.update({ _id: _id }, { $set: request.body })
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
  },
  remove: function(request, response, next) {
    let _id = request.params._id;
    repository.remove({ _id: _id })
    .then(function(result) {
      response.sendStatus(204);
    })
    .catch(next);
  }
};

module.exports = FreightController;
