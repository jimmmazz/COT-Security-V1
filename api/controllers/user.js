const { User } = require('../models/users');
const { Schedule } = require('../models/schedule');
const Park = require('../models/parks');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.isSupervisor = (user) => {
  console.log(`${user.fname} is a supervisor`);
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({}, { password: 0 });
  try {
    console.log(users);
    return res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

exports.addUser = async (req, res, next) => {
  const userEmail = req.body.email.trim().toLowerCase();

  const isEmail = await User.findOne({ email: userEmail });
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
      console.log(req.body.assignments);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: userEmail,
        password: hash,
        supervisor: req.body.supervisor,
        // assignments: req.body.assignments,
      });

      try {
        await user.save();
        console.log(user);
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
  return res.status(200).json({
    message: 'User updated',
    userID: req.params.userID,
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.userID });
  if (user) {
    const deleteReturn = await User.deleteOne({ _id: req.params.userID });
    return res.status(200).json({
      message: 'User deleted',
      userID: req.params.userID,
      deleteReturn: deleteReturn,
    });
  } else {
    return res.status(404).json({
      message: 'User not found',
      userID: req.params.userID,
    });
  }
};

exports.userAssignment = async (req, res) => {
  const officer = req.params.assignment.toLowerCase();

  const date = new Date().toLocaleDateString(); // date logging in

  //find officer that logged in
  const officerLoggedIn = await Schedule.find({ officer: officer });

  // converting date to searchable string with NO time info
  officerLoggedIn.forEach((assignedOfficer) => {
    assignedOfficer.queryDate = assignedOfficer.date.toLocaleDateString();
  });
  // finding officer schedule for date logged in
  const officerRegionDate = officerLoggedIn.filter(
    (officer) => date.trim() === officer.queryDate.trim()
  );

  if (officerRegionDate.length !== 0) {
    //next extract region and populate view with parks from that region
    const scheduledRegion = officerRegionDate[0].region;

    const assignRegion = await Park.find({ parkRegion: scheduledRegion });

    res.redirect(`/parks/${assignRegion[0].parkRegion}`);
  } else {
    return res.json('No sechdule for this officer');
  }
};
