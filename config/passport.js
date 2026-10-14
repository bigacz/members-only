import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from './database/queries.js';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await db.getUserByEmail(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        const isCorrect = await bcrypt.compare(password, user.hashed_password);

        if (isCorrect) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect email or password' });
        }
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((userId, done) => {
  const user = db.getUserById(userId);

  done(null, user);
});
