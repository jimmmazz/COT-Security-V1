const express = require('express');
const router = express.Router();
const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/check-auth');
const userContoller = require('../controllers/user');

router.get('/', userContoller.getAllUsers);

router.post('/', checkAuth, userContoller.addUser);

router.patch('/:userID', checkAuth, userContoller.patchUser);

module.exports = router;
