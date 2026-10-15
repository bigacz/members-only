import passport from 'passport';
import bcrypt from 'bcryptjs';
import db from '../database/queries.js';
import { body, matchedData, validationResult } from 'express-validator';
import { registerValidators } from './validators.js';
import { response } from 'express';

const getRegister = (req, res) => {
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
  return res.render('login');
};

const postLogin = [
  passport.authenticate('local'),
  (req, res, user) => {
    console.log();
    console.log(req.isAuthenticated());
  },
];

const getNewMessage = (req, res) => {
  return res.render('newMessage');
};

const postNewMessage = (req, res) => {
  //todo
};

export default {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  getNewMessage,
  postNewMessage,
};
