const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { addUserValidationRules, validate } = require('../middleware/validate');

const userController = require('../controllers/user');
const { validationResult } = require('express-validator');

router.get('/', userController.getAllUsers);

router.post('/', addUserValidationRules(), validate, userController.addUser);

router.patch('/:userID', checkAuth, userController.patchUser);

router.delete('/:userID', checkAuth, userController.deleteUser);

router.get('/:assignment', checkAuth, userController.userAssignment);

module.exports = router;
