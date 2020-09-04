const { Schedule } = require('../models/schedule');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

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

exports.getSchedule = async (req, res, next) => {
  const scheduledDays = await Schedule.find({}).populate(
    'officer',
    '-password -__v'
  );
  const newSchedule = scheduledDays.map((scheduledDay, index) => {
    dateInfo = getDateInfo(scheduledDay.date);
    console.log(scheduledDay.date);
    return { scheduledDay, dateInfo };
  });

  return res.status(200).json({
    message: 'Daily schedules',
    newSchedule,
  });
};

exports.addSchedule = async (req, res, next) => {
  const region = req.body.region;
  const officerId = req.body.officer;
  const schedule = new Schedule({
    date: req.body.date,
    region: region.toLowerCase(),
    officer: officerId,
  });
  console.log(schedule._id);
  try {
    await schedule.save();
    await schedule.updateOne(
      { _id: schedule._id },
      { $push: { officer: 1234 } }
    );
    return res.status(200).json({
      message: 'Schedule was created',
      schedule: schedule,
      //used to populate schedule calendar
      dateBreakDown: getDateInfo(schedule.date),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

exports.patchSchedule = (req, res, next) => {
  return res.status(200).json({
    message: 'Schedule updated',
    scheduleID: req.params.scheduleID,
  });
};

function getDateInfo(date) {
  return {
    date: new Date(date).getDate(),
    month: months[new Date(date).getMonth()],
    year: new Date(date).getFullYear(),
  };
}
