const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  supervisor: { type: String },
});

module.exports = mongoose.model('User', userSchema);
