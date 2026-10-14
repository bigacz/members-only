import passport from 'passport';
import bcrypt from 'bcryptjs';
import db from '../database/queries.js';

function getRegister(req, res) {
  res.render('register');
}

async function postRegister(req, res) {
  const { email, password, firstname, lastname } = req.body;

  const hashedPassword = await bcrypt.hashSync(password, 10);

  await db.addUser(email, hashedPassword, firstname, lastname);
}

function getLogin(req, res) {
  return res.render('login');
}

const postLogin = [
  passport.authenticate('local'),
  (req, res, user) => {
    console.log();
    console.log(req.isAuthenticated());
  },
];

function getNewMessage(req, res) {
  return res.render('newMessage');
}

function postNewMessage(req, res) {
  //todo
}

export default {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  getNewMessage,
  postNewMessage,
};
