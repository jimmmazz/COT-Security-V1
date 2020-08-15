const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  region: { type: String, required: true },
  officer: { type: String, required: true }, //find out how and if needed to ref user DB
  queryDate: { type: String },
});

const scheduleModel = mongoose.model('Schedule', scheduleSchema);

module.exports = { Schedule: scheduleModel };
