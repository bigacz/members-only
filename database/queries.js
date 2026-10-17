import dbPool from './pool.js';

async function addUser(email, hashedPassword, firstname, lastname) {
  const query = await dbPool.query(
    `INSERT INTO users (email, hashed_password, firstname, lastname) 
    VALUES ($1, $2, $3, $4);`,
    [email, hashedPassword, firstname, lastname],
  );
}

async function getUserByEmail(email) {
  const query = await dbPool.query('SELECT * FROM users WHERE email=$1', [
    email,
  ]);

  return query.rows[0];
}

async function getUserById(userId) {
  const query = await dbPool.query('SELECT * FROM users WHERE user_id=$1', [
    userId,
  ]);

  return query.rows[0];
}

async function addMessage(userId, title, message_text) {
  const timestamp = new Date().valueOf();

  const query = await dbPool.query(
    'INSERT INTO messages(user_id, title, message_text, timestamp) VALUES($1, $2, $3, $4);',
    [userId, title, message_text, timestamp],
  );
}

export default {
  getUserByEmail,
  getUserById,
  addUser,
  addMessage,
};
