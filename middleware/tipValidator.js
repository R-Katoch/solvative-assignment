const { check, validationResult } = require('express-validator');

const validateCalculateTip = [
  check('place')
    .trim()
    .not().isEmpty()
    .withMessage('Place cannot be empty'),

  check('totalAmount')
    .not().isEmpty().withMessage('Total amount cannot be empty')
    .isNumeric()
    .withMessage('Total amount must be a number'),

  check('tipPercentage')
    .not().isEmpty().withMessage('Tip percentage cannot be empty')
    .isNumeric()
    .withMessage('Tip percentage must be a number')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Tip percentage must be between 0 and 100'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const validateGetTip = [
  check('startDate')
    .not().isEmpty().withMessage('Start date cannot be empty')
    .isISO8601()
    .withMessage('Start date must be in the format YYYY-MM-DD')
    .toDate(),

  check('endDate')
    .not().isEmpty().withMessage('End date cannot be empty')
    .isISO8601()
    .withMessage('End date must be in the format YYYY-MM-DD')
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCalculateTip,
  validateGetTip,
};
