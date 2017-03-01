'use strict';

let debug = require('debug')('delivery-admin:controller:postalcode');
let repository = require('../repository/ReportRepository');

let tzOffset = -3;

let ReportController = {
  total: function(request, response, next) {
    var start = new Date();
    start.setMonth(start.getMonth() - 3);
    start.setDate(1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);

    let pipeline = [
      {
        "$match": { "delivery.date": { "$gte": start } }
      },
      {
        $group:{
          _id: _getIdGroup(),
          total: { $sum: "$payment.total" }
        },
      },
      {
        $group: {
          _id: { month: { $month: "$_id" }, year: { $year: "$_id" } },
          total: { $sum: "$total" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, }
      }
    ];

    repository.aggregate(pipeline, function(err, result) {
      if (err) {
        return next(err);
      }

      response.json(result);
    });
  },

  byProduct: function(request, response, next) {
    let pipeline = [
      { $unwind: '$items' },
      { $group: { _id: '$items.name', count: { $sum: '$items.quantity' } } },
      { $sort: { 'count': -1 } }
    ];

    repository.aggregate(pipeline, function(err, result) {
      if (err) {
        return next(err);
      }

      response.json(result);
    });
  },

  sales: function(request, response, next) {
    let start = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8);

    let end = new Date();
    end.setDate(end.getDate() + 1);
    end.setHours(0);
    end.setMinutes(0);
    end.setSeconds(0);
    end.setMilliseconds(0);

    let pipeline = [{
        "$match": { "delivery.date": { "$gte": start, "$lte": end } }
      },
      {
        "$group": {
          "_id": _getIdGroup(),
          "paymentTotal": { "$sum": "$payment.total" },
          "count": { "$sum": 1 }
        }
      },
      {
        "$sort": { "_id": 1 }
      }
    ];

    debug('pipeline', JSON.stringify(pipeline));

    repository.aggregate(pipeline, function(err, result) {
      if (err) {
        return next(err);
      }

      response.json(result);
    });
  }
};

function _getIdGroup() {
  return {
    "$add": [{
      "$subtract": [{
          "$add": [
            { "$subtract": [ "$delivery.date", new Date(0) ] },
            tzOffset * 1000 * 60 * 60
          ]}, {
          "$mod": [{
            "$add": [
              { "$subtract": [ "$delivery.date", new Date(0) ] },
              tzOffset * 1000 * 60 * 60
            ]},
            1000 * 60 * 60 * 24
          ]
        }]
      },
      new Date(0)
    ]
  };
}

module.exports = ReportController;
