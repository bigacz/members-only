import express from 'express';
import expressSession from 'express-session';
import { Pool } from 'pg';
import pgConnect from 'connect-pg-simple';
import mainRouter from './routes/mainRouter.js';

process.loadEnvFile('./.env');

const pgPool = new Pool({ connectionString: process.env.PG_CONNECTION_STRING });

const pgSession = pgConnect(expressSession);

const store = new pgSession({
  pool: pgPool,
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

app.use(mainRouter);

const port = process.env.APP_PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
