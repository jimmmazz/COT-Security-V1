const express = require('express');
const router = express.Router();
const schedleController = require('../controllers/schedules');

router.get('/', schedleController.getSchedule);

router.post('/', schedleController.addSchedule);

router.patch('/:scheduleID', schedleController.patchSchedule);

module.exports = router;
