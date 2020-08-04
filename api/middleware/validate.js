const { body, validationResult } = require('express-validator');

const addUserValidationRules = () => {
  return [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8, max: 30 }).escape(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  addUserValidationRules,
  validate,
};
