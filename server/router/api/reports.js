'use strict';

let router              = require('express').Router(),
    ReportController    = require('../../controller/ReportController');


router.get('/sales', ReportController.sales);
router.get('/total', ReportController.total);
router.get('/byProduct', ReportController.byProduct);


module.exports = router;
