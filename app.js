import express from 'express';
import expressSession from 'express-session';
import mainRouter from './routes/mainRouter.js';
import dbPool from './database/pool.js';
import passport from 'passport';
import pgConnect from 'connect-pg-simple';
const pgSession = pgConnect(expressSession);

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('public'));

app.use(
  expressSession({
    store: new pgSession({ pool: dbPool }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      // secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  }),
);

import './config/passport.js';
app.use(passport.session());

app.use(mainRouter);

const port = process.env.APP_PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
