const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  supervisor: { type: String, required: true },
  phonenumber: { type: Number },
});

// const scheduleSchema = mongoose.Schema({
//   date: { type: Date, default: Date.now },
//   region: { type: String, required: true },
//   officer: { type: String, required: true }, //find out how and if needed to ref user DB
// });

const userModel = mongoose.model('User', userSchema);
// const scheduleModel = mongoose.model('Schedule', scheduleSchema);

module.exports = { User: userModel };
// , Schedule: scheduleModel -> add to line above and uncomment to have multiple schema in one file
