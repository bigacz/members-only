import passport from 'passport';
import bcrypt from 'bcryptjs';
import db from '../database/queries.js';
import { body, matchedData, validationResult } from 'express-validator';
import {
  registerValidators,
  loginValidators,
  postJoinValidators,
} from './validators.js';

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

    try {
      await db.addUser(email, hashedPassword, firstname, lastname);
    } catch (error) {
      if (error.code) {
        res
          .status(400)
          .json({ errors: [{ msg: 'A user with this email already exists' }] });
        return;
      }
      console.error(error);
    }

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

const getJoin = [
  (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');

    res.render('join');
  },
];

const postJoin = [
  ...postJoinValidators,
  async (req, res) => {
    const result = validationResult(req);

    if (!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { code } = matchedData(req);

    if (code === process.env.MEMBER_CODE) {
      await db.grantMembership(req.user.user_id);
      return res.status(200).json({ permission: 'member' });
    }

    if (code === process.env.ADMIN_CODE) {
      await db.grantAdmin(req.user.user_id);
      return res.status(200).json({ permission: 'admin' });
    }

    res.status(400).json({ errors: [{ msg: 'Incorrect code' }] });
  },
];

export default {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  postLogout,

  getJoin,
  postJoin,
};
