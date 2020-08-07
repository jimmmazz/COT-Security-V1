const express = require('express');
const router = express.Router();
const schedleController = require('../controllers/schedules');

router.get('/', schedleController.getSchedule);

router.post('/', schedleController.addSchedule);

router.patch('/:scheduleID', (req, res, next) => {
  res.status(200).json({
    message: 'Schedule updated',
    scheduleID: req.params.scheduleID,
  });
});

module.exports = router;
