const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
  parkName: { type: String, require: true },
  parkRegion: { type: String, require: true },
});

module.exports = mongoose.model('Park', parkSchema);
