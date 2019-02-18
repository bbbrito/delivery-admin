'use strict';

const router             = require('express').Router();
const CourierController  = require('../../controller/CourierController');


router.get('/', CourierController.list);
router.get('/:_id', CourierController.byId);
router.post('/', CourierController.create);
router.put('/:_id', CourierController.update);
router.delete('/:_id', CourierController.remove);

module.exports = router;
