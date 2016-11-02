'use strict';

let router              = require('express').Router(),
    ReportController    = require('../../controller/ReportController');


router.get('/sales', ReportController.sales);


module.exports = router;
