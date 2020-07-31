const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.isSupervisor = (user) => {
  console.log(user.fname);
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  try {
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.addUser = async (req, res, next) => {
  const isEmail = await User.findOne({ email: req.body.email });
  if (isEmail) {
    return res.status(409).json({
      message: 'Mail exist',
    });
  }

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hash,
        supervisor: req.body.supervisor,
      });

      try {
        await user.save();

        return res.status(200).json({
          message: 'User was created',
          user: user,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      }
    }
  });
};

exports.patchUser = (req, res, next) => {
  res.status(200).json({
    message: 'User updated',
    userID: req.params.userID,
  });
};
