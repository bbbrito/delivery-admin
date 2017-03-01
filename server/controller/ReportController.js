'use strict';

let debug = require('debug')('delivery-admin:controller:postalcode');
let repository = require('../repository/ReportRepository');

let ReportController = {
  total: function(request, response, next) {
    let pipeline = [
      {
        $group:{
          _id: { month: { $month: "$delivery.date" }, year: { $year: "$delivery.date" } },
          total: { $sum: "$payment.total" }
        },
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

  sales: function(request, response, next) {
    let tzOffset = -3;
    let start = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);

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
          "_id": {
            "$add": [
                { "$subtract": [
                    { "$add": [
                        { "$subtract": [ "$delivery.date", new Date(0) ] },
                        tzOffset * 1000 * 60 * 60
                    ]},
                    { "$mod": [
                        { "$add": [
                            { "$subtract": [ "$delivery.date", new Date(0) ] },
                            tzOffset * 1000 * 60 * 60
                        ]},
                        1000 * 60 * 60 * 24
                    ]}
                ]},
                new Date(0)
            ]
          },
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

module.exports = ReportController;
