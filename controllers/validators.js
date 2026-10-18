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

const loginValidators = [
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
];

const postMessageValidators = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 40 })
    .withMessage('Title must be between 3 and 40 characters')
    .escape(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 3, max: 400 })
    .withMessage('Message must be between 3 and 400 characters')
    .escape(),
];

const deleteMessageValidators = [
  body('messageId')
    .trim()
    .notEmpty()
    .withMessage('Message id cannot be empty')
    .isInt()
    .withMessage('Message id must be an integer')
    .escape(),
];

const postJoinValidators = [
  body('code').trim().notEmpty().withMessage('Code cannot be empty').escape(),
];

export {
  registerValidators,
  loginValidators,
  postMessageValidators,
  deleteMessageValidators,
  postJoinValidators,
};
