const { check, validationResult } = require('express-validator');

const upload = require('../config/multerConfig');

const validateUserSignup = [
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),

  // After standard checks, handle file validation manually if needed
  (req, res, next) => {
    // Check for file manually since it's not part of req.body
    if (!req.file) {
      req.errors = req.errors || [];
      req.errors.push({ msg: 'Profile picture cannot be empty' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty() || req.errors) {
      const allErrors = errors.array().concat(req.errors || []);
      return res.status(422).json({ errors: allErrors });
    }
    next();
  },
];

const validateUserLogin = [
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUserSignup,
  validateUserLogin,
};
