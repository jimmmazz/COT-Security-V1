const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { addUserValidationRules, validate } = require('../middleware/validate');

const userContoller = require('../controllers/user');
const { validationResult } = require('express-validator');

router.get('/', userContoller.getAllUsers);

router.post('/', addUserValidationRules(), validate, userContoller.addUser);

router.patch('/:userID', checkAuth, userContoller.patchUser);

router.delete('/:userID', checkAuth, userContoller.deleteUser);

module.exports = router;
