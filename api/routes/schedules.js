const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Schedules were fetched',
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Schedule was created',
  });
});

router.patch('/:scheduleID', (req, res, next) => {
  res.status(200).json({
    message: 'Schedule updated',
    scheduleID: req.params.scheduleID,
  });
});

module.exports = router;
