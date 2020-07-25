const express = require('express');
const router = express.Router();
const User = require('../models/users');
const mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await user.save();

    res.status(200).json({
      message: 'User was created',
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.patch('/:userID', (req, res, next) => {
  res.status(200).json({
    message: 'User updated',
    userID: req.params.userID,
  });
});

module.exports = router;
