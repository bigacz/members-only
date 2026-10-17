import { matchedData, validationResult } from 'express-validator';
import { postMessageValidators } from './validators.js';
import db from '../database/queries.js';

const postMessage = [
  ...postMessageValidators,
  async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { title, message } = matchedData(req);

    await db.addMessage(req.user.user_id, title, message);

    return res.status(201).send();
  },
];

const deleteMessage = (req, res) => {
  //todo
};

const getMessages = (req, res) => {
  //todo
};

const getMessageNew = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('newMessage');
  } else {
    return res.render('notAuthorized');
  }
};

export default {
  postMessage,
  deleteMessage,

  getMessages,

  getMessageNew,
};
