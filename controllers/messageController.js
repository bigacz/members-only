import { matchedData, validationResult } from 'express-validator';
import {
  deleteMessageValidators,
  postMessageValidators,
} from './validators.js';
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

const deleteMessage = [
  ...deleteMessageValidators,
  async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }
    if (!req.user.is_admin) {
      return res.status(403).send('Forbidden');
    }

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { messageId } = matchedData(req);

    await db.deleteMessage(messageId);
    res.status(200).send('Succesfully deleted message');
  },
];

const getMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  const user = req.user;

  res.render('messageBoard', { messages, user });
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
