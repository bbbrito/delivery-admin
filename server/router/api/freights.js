'use strict';

let router              = require('express').Router(),
    FreightController  = require('../../controller/FreightController');


router.get('/', FreightController.list);
router.get('/search', FreightController.search);
router.get('/:_id', FreightController.byId);
router.post('/', FreightController.create);
router.put('/:_id', FreightController.update);
router.delete('/:_id', FreightController.remove);

module.exports = router;
