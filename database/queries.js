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

export default {
  getUserByEmail,
  getUserById,
  addUser,
};
