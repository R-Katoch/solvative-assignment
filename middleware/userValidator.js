const { check, validationResult } = require('express-validator');

const validateUserSignup = [
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('password').not().isEmpty().withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

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
      return res.status(422).json({ errors: allErrors.map((err) => err.msg) });
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
