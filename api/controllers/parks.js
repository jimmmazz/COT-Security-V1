const Park = require('../models/parks');
const mongoose = require('mongoose');

exports.getAllParks = async (req, res) => {
  console.log('get all Parks');

  const parks = await Park.find({}, { __v: 0 });

  res.status(200).json({
    message: 'Parks were fetched',
    parks: parks,
  });
};

exports.getRegionParks = async (req, res) => {
  region = req.params.assignment;
  console.log('region ' + region);

  const parks = await Park.find({ parkRegion: region }, { __v: 0 });

  res.render('assignedRegion.ejs', { assignment: parks });
  // res.status(200).json({
  //   message: 'Parks were fetched',
  //   parks: parks,
  // });
};

exports.addPark = async (req, res, next) => {
  const isPark = await Park.findOne({ name: req.body.parkName });
  if (isPark) {
    return res.status(409).json({
      message: 'Park exist',
    });
  }

  const parkName = req.body.parkName;
  const parkRegion = req.body.parkRegion;

  const park = new Park({
    _id: new mongoose.Types.ObjectId(),
    parkName: parkName.toLowerCase(),
    parkRegion: parkRegion.toLowerCase(),
  });

  try {
    await park.save();
    console.log(park);
    return res.status(200).json({
      message: 'Park was created',
      park: park,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};
