const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const loginRoutes = require('./api/routes/login');
const userRoutes = require('./api/routes/users');
const parkRoutes = require('./api/routes/parks');
const checkRoutes = require('./api/routes/checks');
const scheduleRoutes = require('./api/routes/schedules');

//load config
dotenv.config({ path: './config/config.env' });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/parks', parkRoutes);
app.use('/checks', checkRoutes);
app.use('/schedules', scheduleRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
