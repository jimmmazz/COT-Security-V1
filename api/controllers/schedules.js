const { Schedule } = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.getSchedule = async (req, res, next) => {
  const scheduledDays = await Schedule.find({});
  return res.status(200).json({
    message: 'Daily schedules',
    scheduledDays,
  });
};

exports.addSchedule = async (req, res, next) => {
  const schedule = new Schedule({
    date: req.body.date,
    region: req.body.region,
    officer: req.body.officer,
  });

  const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  try {
    await schedule.save();
    return res.status(200).json({
      message: 'Schedule was created',
      schedule: schedule,
      //used to populate schedule calendar
      dateBreakDown: {
        date: new Date(req.body.date).getDate(),
        month: months[new Date(req.body.date).getMonth()],
        year: new Date(req.body.date).getFullYear(),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};
