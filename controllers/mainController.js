import passport from 'passport';
import bcrypt from 'bcryptjs';
import db from '../database/queries.js';
import { body, matchedData, validationResult } from 'express-validator';
import { registerValidators, loginValidators } from './validators.js';

const getRegister = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.render('register');
};

const postRegister = [
  ...registerValidators,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    const { email, password, firstname, lastname } = matchedData(req);

    const hashedPassword = await bcrypt.hashSync(password, 10);

    await db.addUser(email, hashedPassword, firstname, lastname);

    res.status(201).send();
  },
];

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.render('login');
};

const postLogin = [
  ...loginValidators,
  async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  },
];

const postLogout = [
  (req, res) => {
    if (req.isAuthenticated()) {
      req.logout((error) => {
        if (error) {
          throw error;
        }
      });
      res.status(200).send('Logged out succesfully');
    } else {
      res.status(401).send(`Can't log out`);
    }
  },
];

export default {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  postLogout,
};
