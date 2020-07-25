const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Checks were fetched',
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Check was created',
  });
});

router.patch('/:checkID', (req, res, next) => {
  res.status(200).json({
    message: 'Check was updated',
    checkID: req.params.checkID,
  });
});

module.exports = router;
