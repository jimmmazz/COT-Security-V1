const express = require('express');
const router = express.Router();
const parksController = require('../controllers/parks');

router.get('/', parksController.getAllParks);

router.post('/', parksController.addPark);

router.patch('/:parkID', (req, res, next) => {
  res.status(200).json({
    message: 'Park was updated',
    parkID: req.params.parkID,
  });
});

module.exports = router;
