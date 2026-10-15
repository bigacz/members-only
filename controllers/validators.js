import { body } from 'express-validator';

const registerValidators = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email')
    .isLength({
      min: 3,
      max: 254,
    })
    .withMessage('Email must be 3 and 254 characters')
    .escape(),
  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('Firstname is required')
    .isLength({
      min: 3,
      max: 254,
    })
    .withMessage('Firstname field must be between 3 and 30 characters')
    .escape(),
  body('lastname')
    .trim()
    .notEmpty()
    .withMessage('Lastname is required')
    .isLength({
      min: 3,
      max: 254,
    })
    .withMessage('Lastname field must be between 3 and 30 characters')
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({
      min: 3,
      max: 254,
    })
    .withMessage('Password field must be between 3 and 30 characters')
    .escape(),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Password confirmation is required')
    .isLength({
      min: 3,
      max: 254,
    })
    .withMessage('Password must be between 3 and 30 characters')
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords must match'),
];

export { registerValidators };
