const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Parks were fetched',
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Park was created',
  });
});

router.patch('/:parkID', (req, res, next) => {
  res.status(200).json({
    message: 'Park was updated',
    parkID: req.params.parkID,
  });
});

module.exports = router;
