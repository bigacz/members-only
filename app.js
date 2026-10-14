import express from 'express';
import expressSession from 'express-session';
import pgConnect from 'connect-pg-simple';
import mainRouter from './routes/mainRouter.js';
import dbPool from './database/pool.js';
import db from './database/queries.js';
import bcrypt from 'bcryptjs';

const pgSession = pgConnect(expressSession);

const store = new pgSession({
  pool: dbPool,
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.urlencoded());
app.use(express.json());

app.use(
  expressSession({
    store: store,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      // secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  }),
);

import passport from 'passport';
import LocalStrategy from 'passport-local';

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

app.use(mainRouter);

const port = process.env.APP_PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
